# --- Serve stage -------------------------------------------------------------
# Pinned by digest for supply-chain integrity (tag: nginx:alpine)
FROM nginx:alpine@sha256:8b1e78743a03dbb2c95171cc58639fef29abc8816598e27fb910ed2e621e589a

# Pull in Alpine security fixes published after the base image was built
RUN apk upgrade --no-cache

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY . /usr/share/nginx/html

EXPOSE 80

# Use 127.0.0.1 (not localhost): busybox wget resolves localhost to ::1 first,
# and nginx only listens on IPv4 here, so localhost would get "connection refused".
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -q -O /dev/null http://127.0.0.1/ || exit 1
