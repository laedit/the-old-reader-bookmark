@echo off
:: update web-ext
call npm update -g web-ext

echo web-ext update exit code is %errorlevel%
if "%ERRORLEVEL%" == "1" exit /B 1

:: run web-ext
if [%1]==[] (
    web-ext -s "src" run --firefox-binary "C:\Program Files\Firefox Developer Edition\firefox.exe" %2
)

if [%1]==[current] (
    web-ext -s "src" run --firefox-binary "C:\Program Files\Mozilla Firefox\firefox.exe" %2
)

if [%1]==[beta] (
    web-ext -s "src" run --firefox-binary "C:\Program Files (x86)\Mozilla Firefox Beta\firefox.exe" %2
)
