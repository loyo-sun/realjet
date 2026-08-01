#!/bin/zsh

set -u

handle_error() {
  local status=$?
  echo ""
  echo "本地预览启动失败（错误码：${status}）。"
  echo "请保留此窗口并检查上方错误信息。"
  read "?按回车键关闭窗口。"
  exit "$status"
}

trap handle_error ZERR

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

PREVIEW_PORT=5173
while lsof -nP -iTCP:"$PREVIEW_PORT" -sTCP:LISTEN >/dev/null 2>&1; do
  (( PREVIEW_PORT += 1 ))
  if (( PREVIEW_PORT > 5183 )); then
    echo "5173–5183 端口均被占用，请关闭旧的本地预览后重试。"
    exit 1
  fi
done

echo "正在启动瑞捷机械英文官网与多语言落地页本地预览……"
echo "使用端口：${PREVIEW_PORT}"
echo "官网首页：http://127.0.0.1:${PREVIEW_PORT}/"
echo "Insights：http://127.0.0.1:${PREVIEW_PORT}/insights/"
echo "英文落地页：http://127.0.0.1:${PREVIEW_PORT}/marketing/precast-beam-factory/en/"
echo "停止预览时，请在此窗口按 Control + C。"

OPEN_ARGS=(--open /)
if [[ "${REALJET_NO_OPEN:-0}" == "1" ]]; then
  OPEN_ARGS=()
fi

npm run dev -- --host 127.0.0.1 --port "$PREVIEW_PORT" --strictPort "${OPEN_ARGS[@]}"
