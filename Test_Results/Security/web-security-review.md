# Web Frontend Security Review

Score: 72/100 (Low Risk)

- Critical: 0
- High: 0
- Medium: 0
- Low: 14

## Findings
- **[Low] PII stored in localStorage** — Auth state tokens and profile hints are stored in browser storage without TTL. (public/login.html, public/signup.html)
- **[Low] No session timeout on the web app** — The frontend lacks an explicit idle timeout or renewal control. (public/home.html, public/dashboard.html)
- **[Low] Missing CSP meta tag** — The landing pages do not declare a restrictive content security policy. (public/index.html)
- **[Low] No X-Frame-Options header guidance** — The app does not document frame protection for embedding scenarios. (public/dashboard.html)
- **[Low] Hardcoded base URL in client markup** — The client relies on a hardcoded API target that can drift across environments. (public/login.html)
- **[Low] Verbose console logging in auth flows** — Client-side error metadata may expose implementation details in the browser console. (public/signup.html)
- **[Low] Minimal client-side validation for sign-up** — The UI does not enforce password strength or field-level constraints consistently. (public/signup.html)
- **[Low] External font and asset loading** — Third-party assets introduce supply chain exposure and tracking concerns. (public/index.html)
- **[Low] No explicit HTTPS-only guidance** — The frontend does not advertise secure-only cookie or transport expectations. (public/home.html)
- **[Low] Missing form focus management** — Auth pages can improve focus handling for keyboard and assistive tech users. (public/login.html)
- **[Low] No session refresh feedback** — The UI does not communicate stale session states to users. (public/dashboard.html)
- **[Low] No request timeout hints** — Client requests do not include explicit timeout contracts or retry boundaries. (public/login.html)
- **[Low] Limited security telemetry** — The frontend lacks a structured mechanism to record blocked or suspicious client events. (public/home.html)
- **[Low] Legacy browser support assumptions** — The app may rely on older browser behaviors for authentication UI flows. (public/index.html)
