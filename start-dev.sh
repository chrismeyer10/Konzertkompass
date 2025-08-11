#!/usr/bin/env bash
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

if [ -f "$SCRIPT_DIR/.env" ]; then
  # shellcheck disable=SC1091
  source "$SCRIPT_DIR/.env"
fi

if [ -z "$NG_APP_GOOGLE_CLIENT_ID" ]; then
  echo "NG_APP_GOOGLE_CLIENT_ID is not set. Create a .env file or export it before running this script." >&2
  exit 1
fi

cd "$SCRIPT_DIR/frontend"

npm install

npm start
