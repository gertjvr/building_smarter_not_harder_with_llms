# Building Smarter, Not Harder with LLMs

Reveal.js presentation about leveraging Large Language Models effectively.

Now powered by Vite with hot reloading and external slide files (mirrors the structure of `reveal-slide-vite`).

## Getting Started

### Prerequisites

- Node.js 18+ (LTS recommended)
- pnpm / npm / yarn
- Modern browser

### Running the Presentation

Install dependencies and start dev server (with HMR):

```bash
```text
project/
├── assets/
│   ├── images/
│   └── js/
│       └── main.js
├── slides/
│   ├── 01-intro/                # Opening, context & shift
│   │   ├── 01-title.html
│   │   ├── 02-agenda.html
│   │   ├── 03-shift.html
│   │   ├── 04-ai-collab.html
│   │   └── 05-loop.html
│   ├── 02-process/              # Specification & planning workflow
│   │   ├── 01-idea-honing.html
│   │   ├── 02-blueprint.html
│   │   └── 03-micro-waterfall.html
│   ├── 03-examples/             # Concrete examples
│   │   ├── 01-example-watch.html
│   │   └── 02-example-client.html
│   ├── 04-practices/            # Roles & defensive practices
│   │   ├── 01-strategic-engineer.html
│   │   ├── 02-defensive.html
│   │   └── 03-habits.html
│   ├── 05-standards/            # Standards & enforcement
│   │   ├── 01-standards.html
│   │   └── 02-ci-enforcement.html
│   └── 06-wrap/                 # Conclusion
│       ├── 01-bringing-it-together.html
│       └── 02-questions.html
├── index.html                   # Template with slide injection
├── slides-loader.js             # Recursively loads & injects slides
├── vite.config.js               # Vite + watch plugin
├── package.json
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

## Features Included

- Vite dev server + HMR for slides
- External slide files (HTML/Markdown) auto-injected
- Syntax highlighting (highlight.js / monokai)
- Speaker notes (`S` key)
- Hash routing + history + slide numbers
- Mobile/touch support
- Easy theme switching

## Project Structure

```
project/
├── assets/
│   ├── images/              # Slide images
│   └── js/
│       └── main.js          # Reveal initialization
├── slides/                  # External slide files (html/md)
├── index.html               # Template with slide injection
├── slides-loader.js         # Recursively loads slide content
├── vite.config.js           # Vite configuration + watch plugin
├── package.json
└── README.md
```

## Technical Details

- **Build Tool**: Vite 5
- **Reveal.js**: 5.x
- **Plugins**: Markdown, Highlight, Notes
- **Loader**: Custom `slides-loader.js` injecting content via `vite-plugin-html`
- **HMR**: Custom watch plugin triggers full reload on slide edits

## License

MIT (see `package.json`).