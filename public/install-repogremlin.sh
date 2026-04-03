#!/usr/bin/env bash
set -euo pipefail

REPO_URL=${REPO_URL:-https://github.com/Raghaverma/repogremlin.git}
CRATE_PATH=${CRATE_PATH:-rust/crates/rusty-claude-cli}
INSTALL_ARGS=${INSTALL_ARGS:-}

info() {
    printf "[repo-gremlin installer] %s\n" "$1"
}

ensure_cargo() {
    if ! command -v cargo >/dev/null 2>&1; then
        cat <<'EOF'
Cargo is required but not installed.
Install Rust (https://rustup.rs) and re-run this script, for example:
    curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
EOF
        exit 1
    fi
}

info "Installing RepoGremlin CLI from $REPO_URL"
ensure_cargo

info "Running: cargo install --git $REPO_URL --path $CRATE_PATH $INSTALL_ARGS"
cargo install --git "$REPO_URL" --path "$CRATE_PATH" $INSTALL_ARGS

info "Success! Run 'claw analyze' (and the other repo-gremlin commands) to build the workspace map."
