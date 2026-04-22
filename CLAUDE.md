# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A bilingual (Chinese/English) personal academic website for Jiajun Du, built with [Quarto](https://quarto.org/) and hosted on GitHub Pages.

- **Live URLs**: Root (auto-detect), `/zh/` (Chinese), `/en/` (English)
- **Site generator**: Quarto (static site, renders `.qmd` → `.html`)
- **No Node.js / npm / package.json** — only Quarto and shell commands

## Key Commands

```bash
# Build both languages and copy resources (recommended):
./build.sh          # Linux/Mac (Git Bash on Windows)
build.bat           # Windows CMD

# Build a single language:
cd zh && quarto render   # Chinese → docs/zh/
cd en && quarto render   # English → docs/en/

# Local preview:
quarto preview docs/zh   # Preview Chinese
quarto preview docs/en   # Preview English
```

After building, resources (`assets/`, `images/`, `pdf/`) are copied into `docs/` by the build scripts.

## Architecture

### Source vs Output

| Source (edit these) | Output (generated) |
|---|---|
| `zh/*.qmd`, `zh/_quarto.yml` | `docs/zh/*.html` |
| `en/*.qmd`, `en/_quarto.yml` | `docs/en/*.html` |
| `assets/lang-switch.js` | `docs/assets/lang-switch.js` (copied) |
| `images/`, `pdf/` | `docs/images/`, `docs/pdf/` (copied) |
| `styles.scss` | (used by Quarto at render time) |

### Configuration Cascade

- `_quarto.yml` — shared settings (theme, TOC, footer template, `output-dir: docs`)
- `zh/_quarto.yml` — Chinese-specific (lang: zh, Chinese navbar labels, `output-dir: ../docs/zh`)
- `en/_quarto.yml` — English-specific (lang: en, English navbar labels, `output-dir: ../docs/en`)

Each language subdirectory is rendered as an independent Quarto project. The root `_quarto.yml` is NOT used when rendering from within `zh/` or `en/`.

### Language Switcher

`assets/lang-switch.js` runs in the browser and swaps `/zh/` ↔ `/en/` in the current URL path. It injects a language toggle button into the navbar. If the target page doesn't exist in the other language, it falls back to that language's index page.

### Root Redirect

`docs/index.html` detects the browser language and redirects to `/zh/` or `/en/`.

## Adding New Pages

1. Create the `.qmd` file in **both** `zh/` and `en/` directories (content can differ per language)
2. Add navigation entries to the corresponding `zh/_quarto.yml` and `en/_quarto.yml` under `website.navbar.right`
3. Run `build.sh` or `build.bat`
4. Commit and push (the `docs/` directory is served by GitHub Pages)

## Git / Deployment

- The `docs/` directory is committed to the repo (not gitignored) — GitHub Pages serves from `docs/` on the `main` branch
- `.gitignore` excludes `.quarto/`, `.Rproj.user`, `.Rhistory`, `.RData`, `.Ruserdata`, `.DS_Store`, and `*.quarto_ipynb`
- Workflow: edit source → build → commit everything → push

## Notes

- Root-level `index.qmd` and `publications.qmd` are legacy files; active content lives in `zh/` and `en/` subdirectories
- The `.nojekyll` file (root and `docs/`) disables Jekyll processing on GitHub Pages
- Styles are defined in `styles.scss` at the repo root; referenced via relative path from each language config
