#!/bin/bash

rm -rf chrome-ext
mkdir chrome-ext
cp -r firefox-ext/* chrome-ext
cp chrome-manifest.json chrome-ext
cd chrome-ext
rm manifest.json
mv chrome-manifest.json manifest.json

