@echo off
:: update web-ext
call npm update -g web-ext

echo Exit Code is %errorlevel%
if "%ERRORLEVEL%" == "1" exit /B 1

:: run web-ext
web-ext -s "src" run --firefox-binary "C:\Program Files\Firefox Developer Edition\firefox.exe"
REM web-ext -s "src" run --firefox-binary "C:\Program Files\Mozilla Firefox\firefox.exe"
REM web-ext -s "src" run --firefox-binary "C:\Program Files (x86)\Mozilla Firefox Beta\firefox.exe"