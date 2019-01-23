@echo off

dir test.js > NUL 2>&1

if "%errorlevel%" == "0" (
  del /Q /F test.js
)

echo Generating parser...
call canopy ../lib/language.peg

echo Running parser...
node ..\bin\structural test.h

if "%errorlevel%" == "0" (
  echo Running result...
  node test-it.js
)