# Building Smarter, Not Harder with LLMs

A RevealJS presentation about leveraging Large Language Models effectively.

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (optional, but recommended for full functionality)

### Running the Presentation

#### Option 1: Using pnpm (Recommended)
For the best development experience with automatic dependency management:

```bash
# Install dependencies
pnpm install

# Start the development server on port 3000
pnpm dev
```

Then open your browser and navigate to `http://localhost:3000`

#### Option 2: Direct File Access
Simply open `index.html` in your web browser by double-clicking the file.

#### Option 3: Other Local Web Servers
For alternative setups to avoid potential CORS issues:

```bash
# Using Python 3
python -m http.server 8000

# Using Python 2
python -m SimpleHTTPServer 8000

# Using Node.js (if you have http-server installed)
npx http-server

# Using PHP
php -S localhost:8000
```

Then open your browser and navigate to `http://localhost:8000`

## Presentation Controls

- **Space** or **Arrow Keys**: Navigate between slides
- **ESC**: Overview mode
- **F**: Fullscreen mode
- **S**: Speaker notes (if available)
- **B**: Blank screen
- **?**: Help with keyboard shortcuts

## Customization

### Changing Themes
The presentation uses the "black" theme by default. You can change it by modifying line 11 in `index.html`:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reveal.js@4.6.1/dist/theme/[THEME_NAME].css" id="theme">
```

Available themes:
- black (default)
- white
- league
- beige
- sky
- night
- serif
- simple
- solarized
- blood
- moon

### Adding Content
- Edit the slides within the `<div class="slides">` section in `index.html`
- Use `<section>` for each slide
- Use nested `<section>` elements for vertical slide navigation
- Add `class="fragment"` to elements for step-by-step reveals

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

- Responsive design
- Slide transitions and animations
- Fragment animations for step-by-step reveals
- Syntax highlighting for code blocks
- Speaker notes support
- Keyboard navigation
- Touch/swipe support for mobile devices
- Overview mode
- Fullscreen support

## Content Structure

The presentation includes the following sections:

1. **Title Slide**: Introduction and presentation title
2. **Agenda**: Overview of topics covered
3. **What are LLMs?**: Introduction to Large Language Models
4. **Working Smarter**: Key principles for effective LLM usage
5. **Practical Applications**: Real-world use cases
6. **Best Practices**: Guidelines for optimal implementation
7. **Common Pitfalls**: What to avoid when using LLMs
8. **Future Considerations**: Looking ahead
9. **Key Takeaways**: Summary of main points
10. **Questions**: Closing slide

## Technical Details

- **RevealJS Version**: 4.6.1
- **Dependencies**: Loaded via CDN for easy setup
- **Plugins**: Markdown, Highlight, and Notes plugins included
- **Theme**: Black theme with custom fragment styling

## License

This presentation template is free to use and modify for your needs.