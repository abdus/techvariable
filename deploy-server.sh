#!/bin/bash

git checkout deploy-server
mv server/* ./
yarn
yarn start
