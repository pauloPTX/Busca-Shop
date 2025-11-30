@echo off
echo ========================================
echo   Iniciando Frontend - Busca Shop
echo ========================================
echo.

echo Verificando Node.js...
node -v
if errorlevel 1 (
    echo ERRO: Node.js nao encontrado!
    echo Instale o Node.js 16 ou superior
    pause
    exit /b 1
)

echo.
echo Instalando dependencias...
call npm install

if errorlevel 1 (
    echo ERRO: Falha ao instalar dependencias!
    pause
    exit /b 1
)

echo.
echo Iniciando servidor de desenvolvimento...
echo Frontend estara disponivel em: http://localhost:5173
echo.
call npm run dev

pause
