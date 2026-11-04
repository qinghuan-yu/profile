@echo off
setlocal
chcp 65001 >nul
cd /d "%~dp0"
title Rhine Lab / Qing-UU
where node >nul 2>nul
if errorlevel 1 goto missing_node
if exist "node_modules" goto build
call npm ci
if errorlevel 1 goto failed
:build
call npm run build
if errorlevel 1 goto failed
set "HOST=127.0.0.1"
set "PORT=4199"
echo.
echo Open http://localhost:4199/ in your browser.
echo Keep this window open. Press Ctrl+C to stop.
call npm start
if errorlevel 1 goto failed
exit /b 0
:missing_node
echo Please install Node.js 24 or newer from https://nodejs.org/
:failed
pause
exit /b 1
