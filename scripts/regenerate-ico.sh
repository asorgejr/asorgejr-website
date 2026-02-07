#!/usr/bin/env bash

THIS_DIR=$(dirname "$0")
ROOT_DIR=$(dirname "${THIS_DIR}")

# Regenerate the favicon.ico file from the favicons/ directory

# Convert the icon.svg file to ICO format
convert -background transparent "${ROOT_DIR}/public/favicon/icon.svg" -define icon:auto-resize=64,32,24,16 "${ROOT_DIR}/public/favicon/favicon.ico"
