#!/bin/bash
# Build script for bilingual Quarto website
# This script builds both Chinese and English versions and copies resources

echo "Building Chinese version..."
cd zh
quarto render
if [ $? -ne 0 ]; then
    echo "Error building Chinese version"
    cd ..
    exit 1
fi
cd ..

echo ""
echo "Building English version..."
cd en
quarto render
if [ $? -ne 0 ]; then
    echo "Error building English version"
    cd ..
    exit 1
fi
cd ..

echo ""
echo "Copying resources to docs directory..."
cp -r assets docs/
cp -r images docs/
cp -r pdf docs/

echo ""
echo "================================"
echo "Build completed successfully!"
echo "================================"
echo ""
echo "Output directories:"
echo "  Chinese: docs/zh/"
echo "  English: docs/en/"
echo ""
echo "To view locally, run:"
echo "  quarto preview docs/zh"
echo "  quarto preview docs/en"
echo ""
