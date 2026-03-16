#!/bin/bash
set -e

echo "=== Post-merge setup ==="

echo "Installing dependencies..."
npm install --prefer-offline --no-audit --no-fund 2>&1

echo "=== Post-merge setup complete ==="
