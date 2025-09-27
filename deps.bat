@echo off
setlocal enabledelayedexpansion

REM clone or update
if not exist easy-email-editor (
  git clone https://github.com/zalify/easy-email-editor.git
) else (
  cd easy-email-editor
  git fetch origin
  git reset --hard origin/master
  git pull
  cd ..
)

REM build subpackages
for %%D in (easy-email-core easy-email-editor easy-email-extensions) do (
  pushd easy-email-editor\packages\%%D
  echo ==== building %%D ====
  call npm install --force --legacy-peer-deps
  call npm run build
  popd
)

REM back to project root
cd %~dp0

REM add local subpackages
yarn add easy-email-core@file:easy-email-editor/packages/easy-email-core
yarn add easy-email-core@file:easy-email-editor/packages/easy-email-editor
yarn add easy-email-core@file:easy-email-editor/packages/easy-email-extensions

endlocal
echo done
