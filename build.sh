#!/bin/bash

## ts to js
bun build  index.ts --outfile dist/index.esm.js --format esm
bun build  index.ts --outfile dist/index.js     --format cjs

