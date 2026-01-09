# Quick Reference Card

## 🚀 Common Tasks

### Build Everything
```bash
# Windows
build.bat

# Linux/Mac
./build.sh
```

### Build Single Language
```bash
# Chinese
cd zh && quarto render && cd ..

# English
cd en && quarto render && cd ..

# Then copy resources
xcopy /E /I /Y assets docs\assets
xcopy /E /I /Y images docs\images
xcopy /E /I /Y pdf docs\pdf
```

### Preview Locally
```bash
# Chinese
quarto preview docs/zh

# English
quarto preview docs/en

# Or use browser
# file:///path/to/docs/zh/index.html
```

### Deploy
```bash
git add .
git commit -m "Update content"
git push origin main
# Wait 1-2 minutes, then visit:
# https://JiajunDu-ReSustain.github.io/
```

### Clean Build
```bash
# Windows
rmdir /s /q docs\zh
rmdir /s /q docs\en
build.bat

# Linux/Mac
rm -rf docs/zh docs/en
./build.sh
```

## 📂 File Locations

### Edit Content
- Chinese: `zh/*.qmd`
- English: `en/*.qmd`

### Edit Navigation
- Chinese: `zh/_quarto.yml`
- English: `en/_quarto.yml`

### Edit Styles
- Theme: `styles.scss`

### Edit Language Switcher
- Script: `assets/lang-switch.js`

## 🔧 Troubleshooting

### Language switcher not showing?
1. Check `docs/assets/lang-switch.js` exists
2. Rebuild: `build.bat` or `./build.sh`
3. Clear browser cache

### Images not loading?
```bash
xcopy /E /I /Y images docs\images
xcopy /E /I /Y pdf docs\pdf
```

### Build errors?
1. Check Quarto version: `quarto --version`
2. Check YAML syntax in `_quarto.yml` files
3. Ensure you're in the right directory

## 📚 Full Documentation

- [BUILD_GUIDE.md](BUILD_GUIDE.md) - Complete build instructions
- [GIT_WORKFLOW.md](GIT_WORKFLOW.md) - Git workflow details
- [IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md) - Technical details

## 🌐 URLs

- English: https://JiajunDu-ReSustain.github.io/en/
- Chinese: https://JiajunDu-ReSustain.github.io/zh/
- Auto: https://JiajunDu-ReSustain.github.io/
