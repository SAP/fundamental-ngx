#!/bin/bash

set -o nounset
set -o errexit

echo "//registry.npmjs.org/:username=${NPM_USERNAME}" > ~/.npmrc
echo "//registry.npmjs.org/:email=${NPM_EMAIL}" >> ~/.npmrc
echo "//registry.npmjs.org/:_authToken=${AUTH_TOKEN}" >> ~/.npmrc
