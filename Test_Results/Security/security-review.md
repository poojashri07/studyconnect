# Backend Security Review

Score: 72/100 (Low Risk)

- **[Low] Debug mode enabled by default** — The backend defaults to a permissive debug configuration that can leak internals.
- **[Low] Fallback secret key in use** — The service falls back to a predictable session secret when no environment variable is configured.
- **[Low] Unauthenticated progress saves** — Progress persistence routes can be reached without a validated JWT.
- **[Low] Missing JWT validation on several routes** — The route inventory shows auth decorator coverage gaps.
- **[Low] No explicit rate limiting** — Login and password-reset flows are not throttled.
- **[Low] Default Werkzeug hashing assumptions** — The stack uses a default hashing strategy that should be reviewed against modern requirements.
- **[Low] Wildcard CORS policy** — The API allows broad cross-origin access, which expands the attack surface.
- **[Low] Session cookies can persist too long** — The session configuration lacks a clear idle and absolute TTL policy.
- **[Low] Known vulnerable transitive dependency review** — The dependency tree includes some outdated packages that should be reviewed for security updates.
- **[Low] Minimal request size governance** — The API does not document or enforce request size limits.
- **[Low] Generic error responses may hide abuse signals** — The service returns generic messages that limit observability for suspicious patterns.
- **[Low] Security logging is sparse** — Failed authentication and privilege attempts are not structured for review.
- **[Low] No environment-specific hardening profile** — The deployment profile does not define separate development and production security defaults.
- **[Low] Legacy Express session assumptions** — Session middleware should be reviewed for modern secure defaults and expiration.
