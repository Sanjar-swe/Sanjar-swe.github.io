#!/usr/bin/env bash
# Publish the built site to the gh-pages branch that GitHub Pages serves.
#
# Source lives on main; only dist/public goes to gh-pages. A detached worktree
# keeps the working tree untouched, so an interrupted deploy cannot leave the
# checkout on the wrong branch.
set -euo pipefail

cd "$(dirname "$0")/.."

pnpm build

WORKTREE="$(mktemp -d)"
trap 'git worktree remove --force "$WORKTREE" 2>/dev/null || true; rm -rf "$WORKTREE"' EXIT

if git show-ref --verify --quiet refs/heads/gh-pages; then
  git worktree add "$WORKTREE" gh-pages
else
  git worktree add --detach "$WORKTREE"
  git -C "$WORKTREE" checkout --orphan gh-pages
  git -C "$WORKTREE" rm -rf . >/dev/null 2>&1 || true
fi

# Wipe the old build, keeping .git and the Pages control files.
find "$WORKTREE" -mindepth 1 -maxdepth 1 ! -name .git ! -name CNAME -exec rm -rf {} +
cp -r dist/public/. "$WORKTREE"/

# Stops Pages from running the output through Jekyll, which would swallow any
# path starting with an underscore.
touch "$WORKTREE/.nojekyll"

git -C "$WORKTREE" add -A
if git -C "$WORKTREE" diff --cached --quiet; then
  echo "deploy: no changes to publish"
  exit 0
fi
git -C "$WORKTREE" commit -q -m "deploy: $(date -u +%Y-%m-%dT%H:%MZ) from $(git rev-parse --short HEAD)"
git -C "$WORKTREE" push -q origin gh-pages
echo "deploy: published to gh-pages"
