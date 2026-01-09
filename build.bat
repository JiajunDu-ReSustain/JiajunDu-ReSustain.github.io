@echo off
REM Build script for bilingual Quarto website
REM This script builds both Chinese and English versions and copies resources

echo Building Chinese version...
cd zh
call quarto render
if errorlevel 1 (
    echo Error building Chinese version
    cd ..
    exit /b 1
)
cd ..

echo.
echo Building English version...
cd en
call quarto render
if errorlevel 1 (
    echo Error building English version
    cd ..
    exit /b 1
)
cd ..

echo.
echo Copying resources to docs directory...
xcopy /E /I /Y assets docs\assets >nul
xcopy /E /I /Y images docs\images >nul
xcopy /E /I /Y pdf docs\pdf >nul

echo.
echo ================================
echo Build completed successfully!
echo ================================
echo.
echo Output directories:
echo   Chinese: docs\zh\
echo   English: docs\en\
echo.
echo To view locally, run:
echo   quarto preview docs\zh
echo   quarto preview docs\en
echo.
