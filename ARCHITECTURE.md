# Bilingual Website Architecture

## Directory Structure

```
JiajunDu-ReSustain.github.io/
│
├── Source Files (Edit these)
│   ├── zh/                          # Chinese source
│   │   ├── _quarto.yml              # Chinese config
│   │   ├── index.qmd                # Homepage
│   │   ├── about.qmd                # About page
│   │   └── publications.qmd         # Publications
│   │
│   ├── en/                          # English source
│   │   ├── _quarto.yml              # English config
│   │   ├── index.qmd                # Homepage
│   │   ├── about.qmd                # About page
│   │   └── publications.qmd         # Publications
│   │
│   ├── assets/
│   │   └── lang-switch.js           # Language switcher
│   ├── images/                      # Images
│   ├── pdf/                         # PDFs
│   └── styles.scss                  # Styles
│
├── Output Files (Generated, served by GitHub Pages)
│   └── docs/
│       ├── index.html               # Root redirect
│       ├── assets/                  # (copied)
│       ├── images/                  # (copied)
│       ├── pdf/                     # (copied)
│       │
│       ├── zh/                      # Chinese output
│       │   ├── index.html
│       │   ├── about.html
│       │   ├── publications.html
│       │   └── site_libs/
│       │
│       └── en/                      # English output
│           ├── index.html
│           ├── about.html
│           ├── publications.html
│           └── site_libs/
│
└── Build & Documentation
    ├── build.bat                    # Windows build
    ├── build.sh                     # Linux/Mac build
    ├── BUILD_GUIDE.md
    ├── GIT_WORKFLOW.md
    ├── IMPLEMENTATION_SUMMARY.md
    ├── QUICK_REFERENCE.md
    ├── CHECKLIST.md
    └── readme.md
```

## Build Flow

```
Source Files                Build Process              Output
────────────                ─────────────              ──────

zh/*.qmd     ─┐            
             ├─→  cd zh && quarto render  ─→  docs/zh/*.html
zh/_quarto.yml┘                                  

en/*.qmd     ─┐            
             ├─→  cd en && quarto render  ─→  docs/en/*.html
en/_quarto.yml┘                                  

assets/      ─┐
images/      ├─→  Copy resources         ─→  docs/assets/
pdf/         ┘                                docs/images/
                                              docs/pdf/
```

## URL Routing

```
GitHub Pages URL Structure:

https://JiajunDu-ReSustain.github.io/
│
├─ /                      → docs/index.html (auto-detect & redirect)
│                            ├─ Browser lang = zh → /zh/
│                            └─ Browser lang = en → /en/
│
├─ /zh/                   → docs/zh/ (Chinese site)
│  ├─ /zh/index.html      → Homepage
│  ├─ /zh/about.html      → About
│  └─ /zh/publications.html → Publications
│
└─ /en/                   → docs/en/ (English site)
   ├─ /en/index.html      → Homepage
   ├─ /en/about.html      → About
   └─ /en/publications.html → Publications
```

## Language Switcher Logic

```
User visits page
     ↓
JavaScript detects URL path
     ↓
   /zh/  ───────────────→  Show "EN" button
     ↓                           ↓
   Current URL            Replace /zh/ → /en/
     ↓                           ↓
/zh/about.html          Target: /en/about.html
     ↓                           ↓
User clicks "EN"         Navigate to /en/about.html
                                 ↓
                         Show "中文" button


User visits page
     ↓
JavaScript detects URL path
     ↓
   /en/  ───────────────→  Show "中文" button
     ↓                           ↓
   Current URL            Replace /en/ → /zh/
     ↓                           ↓
/en/publications.html   Target: /zh/publications.html
     ↓                           ↓
User clicks "中文"       Navigate to /zh/publications.html
                                 ↓
                         Show "EN" button
```

## Page Template

```html
<!DOCTYPE html>
<html lang="zh|en">
<head>
    <!-- Quarto meta tags, styles -->
</head>
<body>
    <header>
        <nav class="navbar">
            <a href="index.html">主页|Home</a>
            <a href="publications.html">学术成果|Publications</a>
            <a href="about.html">关于|About</a>
            
            <!-- Language switcher added here by JavaScript -->
            <a href="../en/page.html" id="language-switcher">EN</a>
        </nav>
    </header>
    
    <main>
        <!-- Page content -->
    </main>
    
    <footer>
        <!-- Footer content -->
    </footer>
    
    <!-- Language switcher script -->
    <script src="../assets/lang-switch.js"></script>
</body>
</html>
```

## Configuration Cascade

```
Global Config             Language Config           Output
─────────────             ───────────────           ──────

_quarto.yml               zh/_quarto.yml            docs/zh/
(Shared settings)   +     (Chinese navbar,    →    - Chinese HTML
- theme                   output-dir,               - Chinese nav labels
- toc                     favicon,                  - lang="zh"
- footer template         lang: zh)                 - Search in Chinese

_quarto.yml               en/_quarto.yml            docs/en/
(Shared settings)   +     (English navbar,    →    - English HTML
- theme                   output-dir,               - English nav labels  
- toc                     favicon,                  - lang="en"
- footer template         lang: en)                 - Search in English
```

## User Experience Flow

```
First Visit:
  User → https://JiajunDu-ReSustain.github.io/
       → Auto-detect language (JavaScript)
       → Redirect to /zh/ or /en/

Navigation:
  User on /zh/index.html
       → Clicks "学术成果"
       → Goes to /zh/publications.html
       → Sees "EN" button in navbar

Language Switch:
  User on /zh/publications.html
       → Clicks "EN" button
       → JavaScript: /zh/publications.html → /en/publications.html
       → Goes to /en/publications.html
       → Now sees "中文" button in navbar

Page Not Found Fallback:
  User on /zh/special-page.html
       → Clicks "EN" button
       → JavaScript: /zh/special-page.html → /en/special-page.html
       → Page doesn't exist
       → Falls back to /en/index.html
```

## Deployment Pipeline

```
Local Development          Version Control         GitHub Pages
─────────────────          ───────────────         ────────────

1. Edit zh/*.qmd           3. git add .            5. GitHub receives push
   Edit en/*.qmd              git commit -m "..."     ↓
   ↓                          git push              6. Serves docs/ folder
                              ↓                        ↓
2. Run build.bat          4. Push to GitHub       7. Site live at:
   ↓                          ↓                       https://...github.io/
   Generates docs/zh/         Repository updated      ├─ /zh/
   Generates docs/en/         ↓                       └─ /en/
   Copies resources           Includes docs/
```

This architecture provides:
- ✅ Complete separation of languages
- ✅ Consistent URL structure
- ✅ Seamless language switching
- ✅ Static site (no server required)
- ✅ Easy maintenance
- ✅ Scalable to add more languages
