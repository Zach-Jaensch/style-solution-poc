#!/bin/bash

set -e

command=$1
script_dir=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" &>/dev/null && pwd)
root_dir=$(cd "$script_dir/.." && pwd)

docker run --rm --network host \
    -v "$root_dir:/repo" \
    -w /repo \
    -e CC_TEST_REPORTER_ID \
    -e BUILDKITE_COMMIT \
    -e BUILDKITE_BRANCH \
    -e BUILDKITE_STEP_ID \
    -e GITHUB_TOKEN="$(aws secretsmanager get-secret-value --secret-id buildkite_agent/frontend_reactor_read_only_github_token --region us-east-2 --output text --query SecretString)" \
    303305260587.dkr.ecr.us-east-1.amazonaws.com/safetyculture/node:20-builder-bookworm \
    /bin/bash \
    -c " \
      corepack enable
      pnpm config set store-dir .pnpm-store
      pnpm config set \"//npm.pkg.github.com/:_authToken\" \"$\{GITHUB_TOKEN\}\"
      pnpm install
      $command \
    "
