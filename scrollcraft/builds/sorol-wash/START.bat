@echo off
cd /d "%~dp0"
start "" http://localhost:4500
node "../../../scroll-craft/plugins/nateherk-design/skills/scroll-craft/scripts/serve.mjs" --root . --port 4500
