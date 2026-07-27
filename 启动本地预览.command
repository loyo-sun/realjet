#!/bin/zsh

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$SCRIPT_DIR"

BUNDLED_NODE_BIN="/Users/chingsun/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin"

if [[ -x "$BUNDLED_NODE_BIN/node" ]]; then
  export PATH="$BUNDLED_NODE_BIN:$PATH"
elif command -v node >/dev/null 2>&1; then
  NODE_MAJOR="$(node -p 'Number(process.versions.node.split(".")[0])')"
  if (( NODE_MAJOR < 20 )); then
    echo "需要 Node.js 20 或更高版本，推荐 Node.js 22。"
    echo "请先升级 Node.js，然后重新双击此文件。"
    read "?按回车键关闭窗口。"
    exit 1
  fi
else
  echo "没有找到 Node.js。请先安装 Node.js 22。"
  read "?按回车键关闭窗口。"
  exit 1
fi

if [[ ! -d "node_modules" ]]; then
  echo "首次启动，正在安装页面依赖……"
  npm install
fi

echo "正在启动瑞捷机械网站本地预览……"
echo "停止预览时，请在此窗口按 Control + C。"

npm run dev -- --host 127.0.0.1 --open /
