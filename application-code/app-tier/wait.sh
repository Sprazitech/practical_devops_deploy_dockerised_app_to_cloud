
#!/bin/bash
set -e

echo " Waiting for MySQL (${DB_HOST}:${DB_PORT}) to be ready..."

# Debugging — print env vars (useful for testing)
echo "Using DB_USER=${DB_USER}, DB_NAME=${DB_NAME}"

# Keep trying until MySQL accepts connections using the provided credentials
until mysql -h"${DB_HOST}" -P"${DB_PORT}" -u"${DB_USER}" -p"${DB_PASSWORD}" -e "SELECT 1;" &> /dev/null
do
  echo "   MySQL is unavailable at ${DB_HOST}:${DB_PORT} - waiting 5s..."
  sleep 5
done

echo " MySQL is up - starting backend server!"
npm start
