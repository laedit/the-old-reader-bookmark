@echo off
:: update web-ext
call npm update -g web-ext

echo Exit Code is %errorlevel%
if "%ERRORLEVEL%" == "1" exit /B 1

:: run web-ext
web-ext -s "src - Web-Ext" run -firefox-binary "C:\Program Files\Firefox Developer Edition\firefox.exe"