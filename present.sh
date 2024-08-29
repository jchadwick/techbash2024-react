#!/bin/sh
npm ci
npm start

mkdir -p react-app
rm -rf react-app/*
code react-app

open https://www.jesschadwick.com/techbash2024-react/