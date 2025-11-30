@echo off
echo ========================================
echo   Iniciando Backend - Busca Shop
echo ========================================
echo.

cd backend

echo Verificando Java...
java -version
if errorlevel 1 (
    echo ERRO: Java nao encontrado!
    echo Instale o Java 17 ou superior
    pause
    exit /b 1
)

echo.
echo Compilando projeto...
call mvn clean install

if errorlevel 1 (
    echo ERRO: Falha na compilacao!
    pause
    exit /b 1
)

echo.
echo Iniciando servidor Spring Boot...
echo Backend estara disponivel em: http://localhost:8080/api
echo.
call mvn spring-boot:run

pause
