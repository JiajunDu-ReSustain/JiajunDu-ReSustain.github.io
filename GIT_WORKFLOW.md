# Git Workflow for Bilingual Site

## What to Commit

### Always commit:
- ✅ Source files: `zh/*.qmd`, `en/*.qmd`
- ✅ Configuration: `*_quarto.yml`, `zh/_quarto.yml`, `en/_quarto.yml`
- ✅ Assets: `assets/`, `images/`, `pdf/`
- ✅ Styles: `styles.scss`
- ✅ Build scripts: `build.bat`, `build.sh`
- ✅ Documentation: `*.md` files
- ✅ **Rendered output: `docs/**`** (required for GitHub Pages!)

### Build artifacts that ARE committed:
- ✅ `docs/zh/` - Chinese rendered HTML
- ✅ `docs/en/` - English rendered HTML
- ✅ `docs/assets/` - JavaScript files
- ✅ `docs/images/` - Image files
- ✅ `docs/pdf/` - PDF files
- ✅ `docs/index.html` - Root redirect page

## Typical Workflow

### 1. Make changes to source files
```bash
# Edit files in zh/ or en/
code zh/index.qmd
code en/index.qmd
```

### 2. Build the site
```bash
# Windows
build.bat

# Linux/Mac
./build.sh
```

### 3. Test locally
```bash
# Preview Chinese version
quarto preview docs/zh

# Preview English version
quarto preview docs/en

# Or open in browser
# file:///path/to/docs/zh/index.html
# file:///path/to/docs/en/index.html
```

### 4. Commit everything
```bash
git add .
git commit -m "Update content and rebuild site"
git push origin main
```

### 5. Verify on GitHub Pages
- Wait 1-2 minutes for GitHub Pages to update
- Visit: https://JiajunDu-ReSustain.github.io/

## Important Notes

### Why commit docs/?
GitHub Pages serves directly from the `docs/` folder, so we must commit the rendered HTML files.

### When to rebuild?
Rebuild whenever you:
- Change any `.qmd` content file
- Update `_quarto.yml` configuration
- Modify `styles.scss`
- Add/remove pages
- Update `assets/lang-switch.js`

### Quick rebuild for one language
```bash
# Chinese only
cd zh && quarto render && cd ..
xcopy /E /I /Y assets docs\assets
xcopy /E /I /Y images docs\images
xcopy /E /I /Y pdf docs\pdf

# English only
cd en && quarto render && cd ..
xcopy /E /I /Y assets docs\assets
xcopy /E /I /Y images docs\images
xcopy /E /I /Y pdf docs\pdf
```

### Cleaning build artifacts
If you need to do a clean rebuild:
```bash
# Windows
rmdir /s /q docs\zh
rmdir /s /q docs\en
build.bat

# Linux/Mac
rm -rf docs/zh docs/en
./build.sh
```

## GitHub Pages Configuration

Make sure GitHub Pages is configured to serve from:
- **Branch**: `main`
- **Folder**: `/docs`

This can be configured in:
Repository Settings → Pages → Build and deployment
