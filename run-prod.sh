#!/usr/bin/env bash
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR/frontend"

# Install dependencies
npm ci

# Production build
npm run build -- --configuration production

# Serve static files
npx serve -l "${PORT:-8080}" dist/frontend
