#!/bin/bash

set -e
trap "kill 0" EXIT

USE_YARN=1

if ! command -v node; then
  echo "node executable can't be found. exiting..."
  exit 1
fi

if command -v yarn; then
  echo "command yarn found"
  USE_YARN=0
elif ! command -v npm; then
  echo "either install npm or yarn to continue"
  exit 1
fi

echo "starting local development server..."

if [ USE_YARN ]; then
  cd server && yarn
  yarn
  yarn dev &

  sleep 2 # just to be sure that client starts after server

  cd ../client
  yarn
  yarn dev &
else
  cd server && yarn
  npm install
  npm run dev &

  sleep 2

  cd ../client
  npm install
  yarn dev &
fi

wait
