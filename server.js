require("dotenv").config()

const express = require("express")
const mongoose = require("mongoose")
const session = require("express-session")
const MongoStore = require("connect-mongo")
const bcrypt = require("bcrypt")
const cors = require("cors")
const http = require("http")
const { Server } = require("socket.io")

const User = require("./models/User")

const app = express()
const server = http.createServer(app)

const io = new Server(server, { cors: { origin: "*" } })

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))

const memoryUsers = []

async function findUserByUsername(username) {
  if (mongoose.connection.readyState === 1) {
    return User.findOne({ username: username.trim() })
  }

  return memoryUsers.find(user => user.username === username.trim())
}

async function createUserRecord(userData) {
  if (mongoose.connection.readyState === 1) {
    const user = new User(userData)
    await user.save()
    return user
  }

  memoryUsers.push(userData)
  return userData
}

mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/studyconnect")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ MongoDB Error:", err))

const sessionStore = process.env.MONGO_URI ? MongoStore.create({ mongoUrl: process.env.MONGO_URI }) : undefined

app.use(session({
  secret: process.env.SESSION_SECRET || "studyconnect-secret",
  resave: false,
  saveUninitialized: false,
  store: sessionStore
}))

/* ── AUTH ROUTES ── */

app.post("/register", async (req, res) => {
  const { username, password, interest } = req.body
  try {
    const trimmedUsername = username.trim()
    const exists = await findUserByUsername(trimmedUsername)
    if (exists) return res.json({ success: false, message: "Username already taken" })
    const hashedPassword = await bcrypt.hash(password, 10)
    await createUserRecord({ username: trimmedUsername, password: hashedPassword, interest })
    res.json({ success: true, message: "Account created!" })
  } catch (err) {
    res.json({ success: false, message: "Registration error" })
  }
})

app.post("/login", async (req, res) => {
  const { username, password } = req.body
  try {
    const user = await findUserByUsername(username)
    if (!user) return res.json({ success: false, message: "User not found" })
    const match = await bcrypt.compare(password, user.password)
    if (!match) return res.json({ success: false, message: "Incorrect password" })
    req.session.user = { username: user.username, interest: user.interest }
    res.json({ success: true, username: user.username, interest: user.interest })
  } catch (err) {
    res.json({ success: false, message: "Server error" })
  }
})

app.post("/logout", (req, res) => {
  req.session.destroy()
  res.json({ success: true })
})

/* ── SOCKET.IO ── */

let onlineUsers = 0
let waitingUsers = {}   // interest → socket

io.on("connection", (socket) => {
  onlineUsers++
  io.emit("online-count", onlineUsers)

  /* ── MATCH ── */
  socket.on("find-partner", (interest) => {
    const key = interest || "Random"
    const isOpenMatch = key === "Random" || key === "Quick Doubt"

    const tryMatch = (partnerKey) => {
      if (waitingUsers[partnerKey] && waitingUsers[partnerKey].id !== socket.id) {
        const partner = waitingUsers[partnerKey]
        delete waitingUsers[partnerKey]
        const room = "room-" + Date.now()
        socket.join(room)
        partner.join(room)
        socket.emit("matched", { room, initiator: true })
        partner.emit("matched", { room, initiator: false })
        return true
      }
      return false
    }

    if (isOpenMatch) {
      const anyKey = Object.keys(waitingUsers).find(k => waitingUsers[k].id !== socket.id)
      if (anyKey && tryMatch(anyKey)) return
    } else {
      if (tryMatch("Random")) return
      if (tryMatch("Quick Doubt")) return
      if (tryMatch(key)) return
    }

    waitingUsers[key] = socket
    socket.emit("waiting")
  })

  /* ── CHAT ── */
  socket.on("chat", (data) => {
    socket.to(data.room).emit("chat", data.message)
  })

  /* ── WEBRTC SIGNALING ── */
  socket.on("offer", (data) => socket.to(data.room).emit("offer", data.offer))
  socket.on("answer", (data) => socket.to(data.room).emit("answer", data.answer))
  socket.on("ice-candidate", (data) => socket.to(data.room).emit("ice-candidate", data.candidate))

  /* ── WHITEBOARD ── */
  socket.on("draw", (data) => socket.to(data.room).emit("draw", data))
  socket.on("clear-board", (data) => socket.to(data.room).emit("clear-board"))

  /* ── SKIP ── */
  socket.on("skip", (room) => {
    socket.leave(room)
    socket.emit("partner-left")
  })

  /* ── DISCONNECT ── */
  socket.on("disconnect", () => {
    onlineUsers = Math.max(0, onlineUsers - 1)
    io.emit("online-count", onlineUsers)
    // remove from waiting
    for (const key in waitingUsers) {
      if (waitingUsers[key].id === socket.id) delete waitingUsers[key]
    }
  })
})

const PORT = process.env.PORT || 5000
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`))
