# Bilingual Quarto Website Build Guide

## Overview

This website uses Quarto profiles to generate bilingual (Chinese/English) content.

## Directory Structure

```
.
├── zh/                  # Chinese content
│   ├── index.qmd
│   ├── about.qmd
│   └── publications.qmd
├── en/                  # English content
│   ├── index.qmd
│   ├── about.qmd
│   └── publications.qmd
├── assets/
│   └── lang-switch.js   # Language switcher script
├── _quarto.yml          # Shared configuration
├── _quarto-zh.yml       # Chinese profile
└── _quarto-en.yml       # English profile
```

## Building the Site

### Build Chinese version:
```bash
cd zh
quarto render
cd ..
```

This will render all files in `zh/` to `docs/zh/`

### Build English version:
```bash
cd en
quarto render
cd ..
```

This will render all files in `en/` to `docs/en/`

### Build both versions (recommended):
```bash
cd zh && quarto render && cd ..
cd en && quarto render && cd ..
```

### Copy resources to docs (run after building):
```bash
# Windows
xcopy /E /I /Y assets docs\assets
xcopy /E /I /Y images docs\images
xcopy /E /I /Y pdf docs\pdf

# Linux/Mac
cp -r assets docs/
cp -r images docs/
cp -r pdf docs/
```

## Language Switcher

The language switcher is implemented via `assets/lang-switch.js`:

- Automatically detects current language from URL path (`/zh/` or `/en/`)
- Shows "EN" on Chinese pages, "中文" on English pages
- Maps corresponding pages (e.g., `/zh/about.html` ↔ `/en/about.html`)
- Falls back to homepage if counterpart page doesn't exist
- Displays in top-right corner of navbar

## GitHub Pages Deployment

1. Build both language versions
2. Commit the entire `docs/` directory
3. Configure GitHub Pages to serve from `docs/` folder
4. Access the site at:
   - English: `https://JiajunDu-ReSustain.github.io/en/`
   - Chinese: `https://JiajunDu-ReSustain.github.io/zh/`

## Adding New Pages

1. Create corresponding `.qmd` files in both `zh/` and `en/` directories
2. Use the same filename in both languages (e.g., `contact.qmd`)
3. Add navigation entries to both `_quarto-zh.yml` and `_quarto-en.yml`
4. The language switcher will automatically handle the new pages

## Configuration Files

- **_quarto.yml**: Shared settings (theme, toc, footer)
- **_quarto-zh.yml**: Chinese-specific settings (navbar labels, output directory)
- **_quarto-en.yml**: English-specific settings (navbar labels, output directory)
