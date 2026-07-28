# StudyConnect Test Plan

## Overview
This document contains a complete set of 300 unique test cases for the StudyConnect application, organized into:
- Functional Testing
- UI/UX Testing
- Validation Testing
- Unit Testing
- Deployment / Release / Deployable Status Testing

Each section includes a summary and the individual test cases needed for a thorough quality assessment.

---

## Summary
- Total test cases: 300
- Functional cases: 100
- UI/UX cases: 80
- Validation cases: 60
- Unit cases: 40
- Deployment / Release cases: 20

### Key readiness indicators
- Critical user flows covered: sign up, login, match flow, video/chat/whiteboard, logout
- UI/UX checks covered: responsiveness, navigation clarity, user feedback, state awareness
- Validation checks covered: required fields, invalid input handling, session state, security boundaries
- Unit coverage targeted: core auth helpers, route response handling, socket logic, state update functions
- Deployment readiness: app startup, environment variables, CI workflow, load test, security scan, artifact generation

---

## Functional Test Cases (100)

1. Sign up with valid username, password, and interest.
2. Sign up with a username that already exists.
3. Sign up with empty username.
4. Sign up with empty password.
5. Sign up with missing interest.
6. Sign up with excessively long username.
7. Sign up with special characters in username.
8. Sign up with weak password and observe validation behavior.
9. Login with valid username and password.
10. Login with valid username and invalid password.
11. Login with non-existent username.
12. Login with empty username.
13. Login with empty password.
14. Logout after successful login.
15. Access dashboard without login and verify redirect or denial.
16. Access home page after login and verify the username is displayed.
17. Register multiple users sequentially and verify persistence.
18. Create a new session and verify session cookie is set.
19. Destroy session after logout and confirm access blocked.
20. Use "Random Match" and verify waiting indicator appears.
21. Use "Quick Doubt" and verify waiting indicator appears.
22. Select a subject card and verify the selection state changes.
23. Select a subject then start a match and verify matchmaking request is sent.
24. Match with another user and verify matched event arrives.
25. Verify partner matched flow for initiator and receiver roles.
26. Send a chat message and verify partner receives it.
27. Receive a partner chat message and verify it appears in UI.
28. Send an offer signal and verify it is forwarded to the partner.
29. Send an answer signal and verify it is forwarded to the partner.
30. Send ICE candidate and verify partner receives it.
31. Draw on the whiteboard and verify partner sees strokes.
32. Clear the whiteboard and verify partner's board clears.
33. Skip partner and verify room leave behavior.
34. Verify online user count updates on connect.
35. Verify online user count updates on disconnect.
36. Verify waiting user removal when disconnected.
37. Start screen share and verify the control toggles state.
38. Mute mic and verify microphone state changes.
39. Toggle camera off and verify video preview or control changes.
40. Toggle speaker off and verify speaker state updates.
41. Validate chat input and send message on Enter.
42. Verify manual logout button ends session.
43. Confirm user name initials display in user avatar.
44. Confirm status badge displays connecting / connected states.
45. Verify that homepage call-to-action buttons navigate correctly.
46. Verify dashboard navigation remains stable when user changes subject.
47. Validate live online count on the home screen updates from socket.
48. Verify subject chip updates when changing subject in dashboard.
49. Validate partner skip button navigates back to waiting state or home.
50. Match two users in the same interest and verify room assignment.
51. Match a user with open match options and verify any other waiting user can join.
52. Verify match search falls back from specific subject to random / quick doubt if no partner.
53. Verify the chat tab opens and remains active while switching tabs.
54. Verify the whiteboard tab opens and board interactions are accessible.
55. Verify video element is present for remote and local video.
56. Verify the waiting overlay is hidden after match success.
57. Verify the waiting overlay displays correct progress text.
58. Verify login page loads without errors.
59. Verify signup page loads without errors.
60. Verify home page loads quickly and displays welcome text.
61. Verify study topic cards are clickable and visually selected.
62. Verify default subject label is displayed on dashboard when no selection exists.
63. Verify matching request with no subject selected still works using random mode.
64. Verify the app supports multiple concurrent sessions in separate browsers.
65. Verify the `sessionStorage` user object is used correctly on client side.
66. Verify server returns JSON success responses for auth routes.
67. Verify server returns `success: false` for invalid auth.
68. Verify server handles malformed JSON request bodies gracefully.
69. Verify route `/register` handles duplicate username gracefully.
70. Verify route `/login` does not expose password in response.
71. Verify session store initialization does not fail when Mongo is unavailable.
72. Verify app static files are served from `/public`.
73. Verify socket connection is accepted for authenticated users.
74. Verify socket connection can still connect for unauthenticated pages if required.
75. Verify the socket server emits `online-count` updates immediately.
76. Verify the server does not match a user with themselves.
77. Verify partner events are only sent to the room participants.
78. Verify `skipPartner()` triggers `partner-left` event to the skipped user.
79. Verify the partner received `partner-left` when the other user leaves.
80. Verify chat messages are not accepted when the room is invalid.
81. Verify whiteboard draw events include coordinate data.
82. Verify `offer`, `answer`, and `ice-candidate` events are correctly relayed.
83. Verify user can still log out from the dashboard.
84. Verify after logout, socket session state is cleared.
85. Verify UI buttons are disabled when the app is not ready.
86. Verify page title changes on dashboard and sign in/out pages.
87. Verify the app recovers from a sudden disconnect and reconnects if prompted.
88. Verify the app can start a new match after ending the previous session.
89. Verify the user profile interest persists between sessions.
90. Verify the login form can be submitted with the Enter key.
91. Verify the signup form can be submitted with the Enter key.
92. Verify the app does not leak internal server error details to the browser.
93. Verify user session cookies are invalidated after logout.
94. Verify the server can handle repeated register requests in quick succession.
95. Verify the server can handle repeated login requests in quick succession.
96. Verify data persistence is intact after restarting the server.
97. Verify the session store works with MongoDB when `MONGO_URI` is set.
98. Verify the in-memory fallback persists new users when MongoDB is unavailable.
99. Verify the login route uses `bcrypt.compare` to validate credentials.
100. Verify the signup route uses `bcrypt.hash` before saving passwords.

---

## UI/UX Test Cases (80)

1. Verify the landing page hero copy is readable on desktop.
2. Verify the landing page hero copy is readable on mobile.
3. Verify the landing page CTA buttons are visible and tappable on mobile.
4. Verify the signup page layout adapts to narrow viewports.
5. Verify the login page layout adapts to narrow viewports.
6. Verify the dashboard layout scales on large screens.
7. Verify the dashboard layout scales on tablet screens.
8. Verify buttons have visible hover and focus styles.
9. Verify input fields have clear label associations.
10. Verify error text is easy to read on dark backgrounds.
11. Verify form fields have a sufficient hit target size.
12. Verify the top navigation remains accessible on scroll.
13. Verify the online count badge is visible and meaningful.
14. Verify subject cards show selected state clearly.
15. Verify the selected subject is highlighted with color and border.
16. Verify disabled buttons look different from active buttons.
17. Verify chat UI uses clear sender/receiver distinction.
18. Verify the whiteboard controls are discoverable.
19. Verify the waiting overlay clearly indicates progress.
20. Verify the user avatar contains initials or placeholder.
21. Verify logout button is easy to locate.
22. Verify the match state transitions smoothly.
23. Verify icon labels explain control meaning.
24. Verify tooltips / titles appear for actionable buttons.
25. Verify the feedback text changes after form submission.
26. Verify success messages are visually distinct from errors.
27. Verify the dashboard uses enough contrast for text.
28. Verify the login page includes a link to signup.
29. Verify the signup page includes a link to login.
30. Verify the signup form groups fields logically.
31. Verify keyboard navigation can focus all buttons and inputs.
32. Verify the page does not trap keyboard focus.
33. Verify responsive spacing works at 320px width.
34. Verify responsive spacing works at 768px width.
35. Verify responsive spacing works at 1440px width.
36. Verify the app uses consistent branding colors and fonts.
37. Verify the page does not overflow horizontally.
38. Verify the form input placeholders are descriptive.
39. Verify the server response messages are presented to the user.
40. Verify invalid login errors remain visible until corrected.
41. Verify the signup success message is shown after registration.
42. Verify timed feedback is not removed too quickly.
43. Verify the subject selection experience is intuitive.
44. Verify the random / quick doubt cards explain behavior clearly.
45. Verify the whiteboard control icons are aligned and spaced.
46. Verify the video and local preview frames are sized appropriately.
47. Verify the waiting overlay text is centered and readable.
48. Verify the user can return to home after logout.
49. Verify the dashboard greeting is personal and accurate.
50. Verify the match flow is clear with a progress indicator.
51. Verify the app indicates when the connection is lost.
52. Verify the user can identify the active tab in the side panel.
53. Verify actions are consistent across pages.
54. Verify buttons use clear action text or icons.
55. Verify error states are still visible on dark mode styling.
56. Verify success states are still visible on dark mode styling.
57. Verify the home page welcome copy is not truncated on mobile.
58. Verify the page background does not distract from content.
59. Verify field labels remain visible when input is filled.
60. Verify the side panel sections on dashboard are readable.
61. Verify the topbar icons have accessible sizes.
62. Verify the subject selection screen is easy to read.
63. Verify the app header remains visible on scroll.
64. Verify the whiteboard controls are easy to use on touch devices.
65. Verify the chat input is visible above the keyboard on mobile.
66. Verify the page shows a clear logo and brand identity.
67. Verify interactive cards respond to hover or tap.
68. Verify the UI does not require more than two clicks for primary actions.
69. Verify the signup flow feels consistent across devices.
70. Verify the login flow feels consistent across devices.
71. Verify the dashboard provides visible feedback on selected subject.
72. Verify the retry or restart call to action appears when a session ends.
73. Verify the username field is correctly focused on page load.
74. Verify the primary action button is the most visually prominent.
75. Verify the app does not hide important status information.
76. Verify the in-app text is free from obvious grammatical issues.
77. Verify the modal / overlay text is clear and concise.
78. Verify all clickable UI elements have at least 44x44px tap targets.
79. Verify whiteboard controls are displayed with clear grouping.
80. Verify chat history area is scrollable and readable.

---

## Validation Test Cases (60)

1. Verify registration requires a username.
2. Verify registration requires a password.
3. Verify registration requires an interest.
4. Verify login requires a username.
5. Verify login requires a password.
6. Verify username trims whitespace before validation.
7. Verify empty username does not create user.
8. Verify password shorter than 6 characters is rejected.
9. Verify username longer than 30 characters is rejected.
10. Verify invalid characters in username are rejected.
11. Verify password with spaces is accepted or rejected consistently per rule.
12. Verify the backend rejects a missing request body.
13. Verify the backend rejects malformed JSON bodies.
14. Verify duplicate username returns a clear validation message.
15. Verify invalid login returns a clear validation message.
16. Verify logout cannot be performed without a session.
17. Verify session cookie is validated on protected actions.
18. Verify route returns 400-style response for invalid input.
19. Verify signup input is sanitized for whitespace.
20. Verify signup input is sanitized for basic injection patterns.
21. Verify login input is sanitized for basic injection patterns.
22. Verify the interest field accepts only expected values.
23. Verify `/register` does not accept missing fields silently.
24. Verify `/login` does not accept missing fields silently.
25. Verify session store rejects invalid session IDs.
26. Verify dashboard state does not break with stale sessionStorage.
27. Verify client-side validation prevents empty form submission.
28. Verify server rejects requests with invalid HTTP methods.
29. Verify repeated register requests throttle or handle gracefully.
30. Verify invalid JSON does not crash the server.
31. Verify the app rejects unauthorized socket events from an unauthenticated client.
32. Verify chat messages are validated for non-empty content.
33. Verify whiteboard data is validated before emit.
34. Verify room join events are validated for existence.
35. Verify `skip` events validate the room parameter.
36. Verify `offer` events validate the offer payload.
37. Verify `answer` events validate the answer payload.
38. Verify `ice-candidate` events validate the candidate payload.
39. Verify `draw` events validate the expected shape data.
40. Verify `clear-board` events validate the expected room.
41. Verify the app handles invalid socket event payload gracefully.
42. Verify the app handles invalid room names gracefully.
43. Verify session destroy returns a success response even with expired session.
44. Verify login response does not leak user password.
45. Verify signup response does not leak user password.
46. Verify input validation errors map to user-facing text.
47. Verify successful signup returns `success: true`.
48. Verify successful login returns `success: true` and user details.
49. Verify the app does not accept reserved or empty interest values.
50. Verify the app can handle an empty online count value safely.
51. Verify local storage / session storage data is validated before use.
52. Verify client redirect does not happen on invalid route state.
53. Verify the app validates the target URL for load test integration.
54. Verify the app does not allow JavaScript injection in username fields.
55. Verify server validation prevents unauthorized route access.
56. Verify route handlers properly catch exceptions and return JSON.
57. Verify socket handlers properly catch and ignore invalid data.
58. Verify any asynchronous errors are surfaced as testable failure paths.
59. Verify the app’s route middleware handles missing cookies safely.
60. Verify the app’s request handlers never return raw stack traces.

---

## Unit Test Cases (40)

1. Test `findUserByUsername()` returns a user when the user exists in MongoDB.
2. Test `findUserByUsername()` returns undefined for unknown username.
3. Test `createUserRecord()` saves a user to MongoDB successfully.
4. Test `createUserRecord()` adds a user to memory fallback when Mongo is unavailable.
5. Test `bcrypt.hash()` is used in registration logic.
6. Test `bcrypt.compare()` is used in login logic.
7. Test login route returns success object on correct credentials.
8. Test login route returns failure object on incorrect credentials.
9. Test register route returns failure object on duplicate usernames.
10. Test register route returns success object on valid input.
11. Test logout route destroys session successfully.
12. Test session middleware sets a cookie when session starts.
13. Test session middleware does not create sessions for anonymous reads.
14. Test socket `find-partner` selects a waiting partner correctly.
15. Test socket `find-partner` does not match a user with itself.
16. Test socket `chat` event forwards payload to the room.
17. Test socket `offer` event forwards payload to the room.
18. Test socket `answer` event forwards payload to the room.
19. Test socket `ice-candidate` event forwards payload to the room.
20. Test socket `draw` event forwards payload to the room.
21. Test socket `clear-board` event forwards payload to the room.
22. Test socket disconnect decrements online user count.
23. Test socket disconnect removes user from waiting queue.
24. Test `onlineUsers` increments on connect.
25. Test `onlineUsers` does not become negative after disconnect.
26. Test route handlers return JSON content type.
27. Test server bootstraps successfully with `process.env.PORT` set.
28. Test static file middleware serves the `/public` folder.
29. Test app instance can be created without database connectivity.
30. Test `/register` validation rejects missing input fields.
31. Test `/login` validation rejects missing input fields.
32. Test server log output includes MongoDB connected success.
33. Test server handles a MongoDB connection failure without crashing.
34. Test `sessionStore` creation is skipped when no `MONGO_URI` is configured.
35. Test `memoryUsers` fallback persists session data.
36. Test `findUserByUsername()` trimmed input behavior.
37. Test `createUserRecord()` preserves `interest` values.
38. Test API route handlers do not mutate request body values.
39. Test server sends `online-count` events at least once after connect.
40. Test server uses `connect-mongo` store only when `MONGO_URI` exists.

---

## Deployment / Release / Deployable Status Test Cases (20)

1. Verify the application starts successfully with `npm start`.
2. Verify the application starts successfully with `npm run dev`.
3. Verify `NODE_ENV=production` does not break startup.
4. Verify `PORT` environment variable overrides the default port.
5. Verify `MONGO_URI` environment variable is respected.
6. Verify `SESSION_SECRET` environment variable is respected.
7. Verify the server serves static assets from `/public`.
8. Verify GitHub Actions workflow `load-test.yml` can run successfully.
9. Verify GitHub Actions workflow `selenium.yml` can run successfully.
10. Verify GitHub Actions workflow `security-review.yml` can run successfully.
11. Verify the load test returns expected RPS and latency boundaries.
12. Verify the app can start when MongoDB is unavailable and fallback is used.
13. Verify dependency installation completes with `npm ci`.
14. Verify report artifacts are generated in CI for Selenium and load tests.
15. Verify environment variables are not hard-coded in source control.
16. Verify application logs do not expose sensitive secrets in CI.
17. Verify the repository includes a working `.github/workflows` set.
18. Verify build and deployment readiness for both local and CI environments.
19. Verify the app passes smoke tests on the home, signup, login, and dashboard routes.
20. Verify app health checks can detect startup and runtime failures.

---

## Deployable Status Summary

The StudyConnect application is currently organized into a deployable Node.js app with the following status points:

- App startup is verified via `npm start`.
- The project includes GitHub Actions workflows for Selenium E2E, security review, and load testing.
- The app supports environment configuration for `PORT`, `MONGO_URI`, and `SESSION_SECRET`.
- Static assets are served from `/public`, which is required for deployable static hosting behind Node.
- Key functional routes and socket flows are identified for automation and regression coverage.
- The current repo structure supports CI-driven validation, security reporting, and load-based performance checks.

### Recommended deployable readiness tasks

- Add automated unit and integration tests to the `tests/` folder to convert this plan into executable coverage.
- Add a CI artifact upload step for load-test and Selenium reports.
- Add a pre-deployment smoke test stage that validates `/`, `/login`, and `/dashboard` after startup.
- Add a target performance threshold for the load test, e.g. `>= 1000 RPS` and `avg < 250ms`.

---

## Notes

This test plan is designed to be directly usable for manual QA, scripted automation, or test-case import into a test management tool.
- Use the functional section for story-based and flow-based coverage.
- Use the UI/UX section for visual, interaction, and responsiveness validation.
- Use the validation section for security and input correctness.
- Use the unit section to create developer-level code tests.
- Use the deployment section to ensure production readiness.
