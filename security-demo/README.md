# Security scanner demo

These intentionally vulnerable examples are for comparing security scanners.
`vulnerable-routes.js` contains command injection and reflected cross-site
scripting examples. The router is not mounted by the application; do not
deploy it or use it as a template.

`example.env` contains a fictional PostgreSQL connection string for secret
scanning. The `.invalid` hostname is reserved and the password is not a real
credential. GitHub's generic secret detection must be enabled to detect
PostgreSQL connection strings, and scanners may filter fictitious values.
