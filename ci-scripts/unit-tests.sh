#!/usr/bin/env bash
set -e
set -o pipefail

echo "-----"
echo "Running unit tests and code coverage for fundamental-ngx"
exec 5>&1
output=$(ng test fundamental-ngx --watch=false --code-coverage --browsers=ChromeHeadless | tee /dev/fd/5)
coverage=$(echo $output | grep -i "does not meet global threshold" || true)
if [[ -n "$coverage" ]]; then
    echo "Error: Tests did not meet coverage expectations"
    exit 1
fi

