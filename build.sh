#!/usr/bin/env bash

cd /c/react/opinionated

rm -f -r build builddev buildstg buildprd

yarn build:dev && cp -r build builddev

yarn build:stg && cp -r build buildstg

yarn build:prd && cp -r build buildprd

