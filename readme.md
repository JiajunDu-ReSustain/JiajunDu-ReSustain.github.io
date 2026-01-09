# Jiajun Du's Personal Academic Website

[![Quarto](https://img.shields.io/badge/Made%20with-Quarto-blue.svg)](https://quarto.org/)
[![GitHub Pages](https://img.shields.io/badge/Hosted%20on-GitHub%20Pages-green.svg)](https://pages.github.com/)

A bilingual (Chinese/English) academic website built with Quarto and hosted on GitHub Pages.

## 🌐 Live Site

- **English**: [https://JiajunDu-ReSustain.github.io/en/](https://JiajunDu-ReSustain.github.io/en/)
- **Chinese**: [https://JiajunDu-ReSustain.github.io/zh/](https://JiajunDu-ReSustain.github.io/zh/)
- **Auto-detect**: [https://JiajunDu-ReSustain.github.io/](https://JiajunDu-ReSustain.github.io/)

## ✨ Features

- 🌍 **Bilingual Support**: Full Chinese and English versions
- 🔄 **Language Switcher**: Automatic page-to-page language switching
- 🎨 **Modern UI**: Clean, professional academic design
- 📱 **Responsive**: Works on all devices
- 🚀 **Fast**: Static HTML for optimal performance
- 🔍 **Searchable**: Built-in search for each language
- 📄 **PDF Support**: Direct access to publications

## 🛠️ Technology Stack

- **Static Site Generator**: [Quarto](https://quarto.org/)
- **Hosting**: GitHub Pages
- **Language Switcher**: Vanilla JavaScript (no dependencies)
- **Styling**: Custom SCSS with Bootstrap

## 📁 Project Structure

```
.
├── zh/                  # Chinese content
├── en/                  # English content
├── docs/                # Rendered output (served by GitHub Pages)
│   ├── zh/             # Chinese HTML
│   ├── en/             # English HTML
│   └── index.html      # Root redirect
├── assets/              # JavaScript files
├── images/              # Images and icons
├── pdf/                 # Publication PDFs
└── build.bat/sh         # Build scripts
```

## 🚀 Quick Start

### Prerequisites

- [Quarto](https://quarto.org/docs/get-started/) 1.8 or higher

### Building the Site

**Windows:**
```bash
build.bat
```

**Linux/Mac:**
```bash
chmod +x build.sh
./build.sh
```

**Manual build:**
```bash
cd zh && quarto render && cd ..
cd en && quarto render && cd ..
xcopy /E /I /Y assets docs\assets
xcopy /E /I /Y images docs\images
xcopy /E /I /Y pdf docs\pdf
```

### Local Preview

```bash
# Preview Chinese version
quarto preview docs/zh

# Preview English version
quarto preview docs/en
```

## 📖 Documentation

- **[BUILD_GUIDE.md](BUILD_GUIDE.md)** - Detailed build instructions
- **[GIT_WORKFLOW.md](GIT_WORKFLOW.md)** - Git workflow and deployment
- **[IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md)** - Implementation details

## 🔧 Adding New Content

1. Create `.qmd` files in both `zh/` and `en/` directories
2. Add navigation entries to `zh/_quarto.yml` and `en/_quarto.yml`
3. Run the build script
4. Commit and push

The language switcher will automatically handle the new pages!

## 📝 License

See [LICENSE](LICENSE) file for details.

## 👤 Author

**Jiajun Du**
- Email: jiajundu@tongji.edu.cn
- GitHub: [@JiajunDu-ReSustain](https://github.com/JiajunDu-ReSustain)
- Google Scholar: [Profile](https://scholar.google.com/citations?user=R41lYV0AAAAJ&hl)

## 🙏 Acknowledgments

- Built with [Quarto](https://quarto.org/)
- Hosted on [GitHub Pages](https://pages.github.com/)
- Inspired by modern academic websites