#!/bin/bash
set -euo pipefail

mkdir -p build
rollup -c
cd build
../../builder-base64.sh nim.js
