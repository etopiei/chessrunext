#!/bin/bash

# Remove previous ext if it exists
rm -rf chrome-ext

# Copy extension code over
mkdir chrome-ext
cp -r firefox-ext/* chrome-ext

# Move the chrome specific manifest into the bundle
cp chrome-manifest.json chrome-ext

# Remove firefox manifest
cd chrome-ext
rm manifest.json

# Rename manifest to be compatible
mv chrome-manifest.json manifest.json

# Add the icon to the extension
cp ../chrome.png icon.png

# Now zip it up
cd ..
zip chessrun-chrome.zip chrome-ext/*

