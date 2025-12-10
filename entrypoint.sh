#!/bin/sh

echo "Generating env-config.js..."

cat <<EOF > /usr/share/nginx/html/env-config.js
window._env_ = {
    VITE_API_URL: "${VITE_API_URL}",
    VITE_APP_NAME: "${VITE_APP_NAME}",
    VITE_ENV: "${VITE_ENV}",
    VITE_VERSION: "${VITE_VERSION}",
    VITE_RECAPTCHA_SITE_KEY: "${VITE_RECAPTCHA_SITE_KEY}"
};
EOF

echo "env-config.js content:"
cat /usr/share/nginx/html/env-config.js

echo "Starting Nginx..."
exec nginx -g "daemon off;"
