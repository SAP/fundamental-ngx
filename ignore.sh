#!/bin/sh

git log -1 --pretty=%B | grep dependabot
