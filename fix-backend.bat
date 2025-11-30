@echo off
cd backend
echo Limpando e recompilando backend...
call mvn clean install -DskipTests
echo.
echo Backend recompilado! Agora rode: npm run dev
pause
