# Development Guidelines

## Project Overview
This is a RevealJS presentation project titled "Building Smarter, Not Harder with LLMs". The project uses CDN-loaded dependencies for simplicity and requires minimal local setup.

## Build/Configuration Instructions

### Prerequisites
- Node.js (for package management and development server)
- pnpm for dependency management

### Setup Process
1. **Install Dependencies**:
   ```bash
   pnpm install
   ```

2. **Start Development Server**:
   ```bash
   pnpm dev
   ```
   - Server will attempt to use port 3000, but will automatically select another port if occupied
   - The server output will show the actual URL to access the presentation

### Project Structure
- `index.html`: Main presentation file
- `package.json`: Dependencies and scripts configuration
- `README.md`: Comprehensive documentation
- `pnpm-lock.yaml`: Lock file for consistent dependency versions

### Dependencies
- **serve**: Static file server for development (version ^14.2.1)
- **reveal.js**: Local development dependency (version ^5.2.1)
- **RevealJS**: Loaded via CDN (version 4.6.1)

## Testing Information

### Test Configuration
Testing assumes the development server is running on port 3000 (or the auto-selected port shown in server output). Tests use `curl` to validate:
- Server responsiveness and HTTP status codes
- HTML content delivery and structure
- Required RevealJS elements and dependencies
- Slide content and navigation structure
- CDN resource loading

### Running Tests
```bash
# Start the dev server first (required for testing)
pnpm dev

# In a separate terminal, run HTTP-based tests
curl -s http://localhost:3000 | grep -q "Building Smarter, Not Harder" && echo "✅ PASS: Title found" || echo "❌ FAIL: Title missing"
curl -s http://localhost:3000 | grep -q "Reveal.initialize" && echo "✅ PASS: RevealJS loaded" || echo "❌ FAIL: RevealJS missing"
curl -s http://localhost:3000 | grep -q "class=\"fragment\"" && echo "✅ PASS: Fragment animations found" || echo "❌ FAIL: No fragments"
curl -I http://localhost:3000 | grep -q "200 OK" && echo "✅ PASS: Server responding" || echo "❌ FAIL: Server error"
```

Expected output should show:
- ✅ PASS: Title found
- ✅ PASS: RevealJS loaded
- ✅ PASS: Fragment animations found
- ✅ PASS: Server responding

### Adding New Tests
To extend the test suite:

1. **Create curl-based tests**: Add new HTTP requests to validate specific content
2. **Test Examples**:
   ```bash
   # Example: Test for specific slide content
   curl -s http://localhost:3000 | grep -q "Your Content Here" && echo "✅ PASS: Content found" || echo "❌ FAIL: Content missing"
   
   # Example: Test for theme configuration
   curl -s http://localhost:3000 | grep -q "theme/black.css" && echo "✅ PASS: Black theme configured" || echo "❌ FAIL: Theme missing"
   
   # Example: Test server performance
   curl -w "%{time_total}\n" -o /dev/null -s http://localhost:3000 | awk '{if($1 < 1.0) print "✅ PASS: Fast response time"; else print "❌ FAIL: Slow response"}'
   ```

3. **Running Custom Tests**: Execute curl commands while dev server is running

### Test Best Practices
- Always ensure the development server is running before testing
- Use HTTP status codes to verify server health
- Test both content existence and server responsiveness
- Validate CDN resource loading through HTML inspection
- Check for proper CORS headers and content delivery

## Development Information

### Code Style & Structure

#### HTML Structure Guidelines
- Use semantic `<section>` elements for each slide
- Nested `<section>` elements create vertical slide navigation
- Apply `class="fragment"` for step-by-step reveals
- Keep slide content concise and visually appealing

#### RevealJS Configuration
Current configuration in `index.html`:
```javascript
Reveal.initialize({
    hash: true,
    transition: 'slide',
    transitionSpeed: 'default',
    backgroundTransition: 'fade',
    plugins: [ RevealMarkdown, RevealHighlight, RevealNotes ]
});
```

### Theme Customization
- Default theme: Black
- Theme location: CDN (`https://cdn.jsdelivr.net/npm/reveal.js@4.6.1/dist/theme/black.css`)
- Custom styling: Inline styles in `<head>` for fragment opacity
- Available themes: black, white, league, beige, sky, night, serif, simple, solarized, blood, moon

### Debugging Tips

#### Common Issues & Solutions
1. **Port Already in Use**: The serve package automatically selects an available port
2. **CORS Issues**: Always use a local server instead of opening HTML directly
3. **CDN Loading**: Check network connectivity if RevealJS assets fail to load
4. **Fragment Animations**: Verify `class="fragment"` syntax and custom CSS

#### Development Workflow
1. Edit slides in `index.html`
2. Use browser dev tools to inspect RevealJS functionality
3. Test navigation with arrow keys, space, and ESC
4. Use speaker notes (`S` key) for presentation mode
5. Run tests after significant changes

#### Performance Considerations
- All dependencies loaded via CDN (no local bundling required)
- Minimal custom CSS keeps load times fast
- Fragment animations are optimized with custom opacity styling

### Speaker Notes
Add speaker notes using:
```html
<section>
    <h2>Slide Title</h2>
    <p>Slide content</p>
    <aside class="notes">
        Speaker notes here - visible only in speaker mode (press 'S')
    </aside>
</section>
```

### Presentation Controls Reference
- **Space/Arrow Keys**: Navigate slides
- **ESC**: Overview mode
- **F**: Fullscreen
- **S**: Speaker notes
- **B**: Blank screen
- **?**: Help menu

### Version Information
- **RevealJS**: 4.6.1 (CDN)
- **Node Package**: serve ^14.2.1
- **Plugins**: Markdown, Highlight, Notes (all via CDN)

---

*Last updated: 2025-08-08*