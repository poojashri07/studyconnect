// Use the local server when running on localhost; otherwise use the deployed API.
const isLocalHost = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
window.API_BASE_URL = isLocalHost ? "http://localhost:5000" : "https://studyconnect-api.onrender.com"
