@echo off
set NVM_VERSION=1.1.12
set NODE_VERSION=20.10.0
set NVM_URL=https://github.com/coreybutler/nvm-windows/releases/download/%NVM_VERSION%/nvm-setup.zip

REM nvm、Node.js、npmがインストールされているかチェック
nvm -v >nul 2>&1
if %errorlevel% neq 0 goto install_nvm
node -v >nul 2>&1
if %errorlevel% neq 0 goto install_node
npm -v >nul 2>&1
if %errorlevel% neq 0 goto install_npm

:install_nvm
REM nvm-setup.zipのダウンロードと解凍
echo Downloading nvm-setup.zip...
powershell -Command "(New-Object Net.WebClient).DownloadFile('%NVM_URL%', 'nvm-setup.zip')"
mkdir nvm
powershell -command "Add-Type -A 'System.IO.Compression.FileSystem'; [IO.Compression.ZipFile]::ExtractToDirectory('nvm-setup.zip', 'nvm');"

REM nvm-windowsのインストール
echo Installing nvm-windows...
cd nvm
nvm-setup.exe

:install_node
REM node.jsのインストール
echo Installing Node.js...
nvm install %NODE_VERSION%
nvm use %NODE_VERSION%

:install_npm
REM npmのインストール
echo Installing npm...
npm -v >nul 2>&1
if %errorlevel% neq 0 goto end
echo Installation completed.

:end
