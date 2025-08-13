# Building Smarter, Not Harder with LLMs

Reveal.js presentation about leveraging Large Language Models effectively.

Now powered by Vite with hot reloading and external slide files (mirrors the structure of `reveal-slide-vite`).

## Getting Started

### Prerequisites

- Node.js 18+ (LTS recommended)
- pnpm
- Modern browser

### Running the Presentation

Install dependencies and start dev server (with HMR):

```bash
```text
project/
├── assets/
│   ├── css/
│   │   ├── chatgpt-prompt.css
│   │   └── revealjs.css
│   └── js/
│       └── main.js
├── public/
│   └── img/                     # Slide images (copied to build)
├── slides/
│   ├── 01-intro/                # Opening, context & shift
│   │   ├── 01-title.html
│   │   ├── 02-agenda.html
│   │   ├── 03-shift.html
│   │   ├── 04-ai-collab.html
│   │   └── 05-loop.html
│   ├── 02-process/              # Specification & planning workflow
│   │   ├── 01-idea-honing.html
│   │   ├── 02-idea-prompt.html
│   │   ├── 03-spec-prompt.html
│   │   ├── 05-blueprint.html
│   │   ├── 06-plan-prompt.html
│   │   └── 07-micro-waterfall.html
│   ├── 04-strategic-engineer/   # Role evolution
│   │   └── 01-strategic-engineer.html
│   ├── 05-examples/             # Concrete examples
│   │   ├── 01-example-watch.html
│   │   └── 02-example-client.html
│   ├── 05-guardrails/           # Defensive practices & standards
│   │   ├── 01-defensive.html
│   │   ├── 02-habits.html
│   │   └── 04-standards.html
│   └── 06-wrap/                 # Conclusion
│       ├── 01-bringing-it-together.html
│       └── 02-discussion.html
├── dist/                        # Build output
├── index.html                   # Template with slide injection
├── slides-loader.js             # Recursively loads & injects slides
├── vite.config.js               # Vite + watch plugin
├── package.json
├── SPEC.md                      # Full talk script & speaker notes
└── README.md
```

Update the theme import in `assets/js/main.js` (currently `white.css`). Any theme from `reveal.js/dist/theme/` can be imported, e.g.:

```js
import 'reveal.js/dist/theme/black.css';
```

### Adding Content (External Slides)

- Add new `.html` (or `.md`) files inside the `slides/` directory.
- Files are recursively discovered and injected into `index.html` at build/dev time.
- Use `<section>` per slide (nested sections = vertical stacks).
- Use `data-markdown` + `<textarea data-template>` to write Markdown.
- Use `class="fragment"` for stepwise reveals.

### Adding Speaker Notes

Add speaker notes using the `<aside class="notes">` element within any slide:

```html
<section>
    <h2>Slide Title</h2>
    <p>Slide content</p>
    <aside class="notes">
        These are speaker notes that will only be visible in speaker mode.
    </aside>
</section>
```

## Deployment

### GitHub Pages

This presentation is automatically built and deployed to GitHub Pages using GitHub Actions. The workflow:

1. **Triggers**: On push to `main`/`master` branch
2. **Build**: Uses pnpm to install dependencies and run `vite build`
3. **Deploy**: Uploads the `dist/` folder to GitHub Pages

**Setup Requirements:**

1. Enable GitHub Pages in repository settings
2. Set source to "GitHub Actions"
3. Push to main branch to trigger deployment

The presentation will be available at: `https://[username].github.io/[repository-name]/`

### Manual Deployment

You can also deploy manually using the included script:

```bash
pnpm run deploy
```

This builds the project and pushes the `dist/` folder to the `gh-pages` branch.

## Features Included

- Vite dev server + HMR for slides
- External slide files (HTML/Markdown) auto-injected
- Syntax highlighting (highlight.js / monokai)
- Speaker notes (`S` key)
- Hash routing + history + slide numbers
- Mobile/touch support
- Easy theme switching
- Automated GitHub Pages deployment

## Project Structure

```text
project/
├── assets/
│   ├── css/                     # Custom styles
│   │   ├── chatgpt-prompt.css   # Prompt component styling
│   │   └── revealjs.css         # Reveal.js customizations
│   └── js/
│       └── main.js              # Reveal initialization
├── public/
│   └── img/                     # Slide images (served statically)
├── slides/                      # External slide files (html/md)
│   ├── 01-intro/                # Introduction section
│   ├── 02-process/              # Planning & blueprint process
│   ├── 04-strategic-engineer/   # Role evolution
│   ├── 05-examples/             # Real-world examples  
│   ├── 05-guardrails/           # Safety & standards
│   └── 06-wrap/                 # Conclusion & discussion
├── dist/                        # Build output directory
├── index.html                   # Template with slide injection
├── slides-loader.js             # Recursively loads slide content
├── vite.config.js               # Vite configuration + watch plugin
├── package.json                 # Dependencies & scripts
├── TALK.md                      # Complete talk script & speaker notes
└── README.md
```

## Technical Details

- **Build Tool**: Vite 5
- **Reveal.js**: 5.x
- **Plugins**: Markdown, Highlight, Notes
- **Loader**: Custom `slides-loader.js` injecting content via `vite-plugin-html`
- **HMR**: Custom watch plugin triggers full reload on slide edits

## License

MIT see `package.json`
