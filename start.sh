#!/bin/sh
git checkout -f main && git clean -df
npm ci
npm start