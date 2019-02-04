@echo off

set file=structures

dir %file%.js > NUL 2>&1

if "%errorlevel%" == "0" (
  del /Q /F %file%.js
)

echo Generating parser...
call canopy ../lib/language.peg

echo Running parser...
node ..\bin\structural %file%.h

if "%errorlevel%" == "0" (
  echo Running result...
  node test-it.js
)