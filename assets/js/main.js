import Reveal from 'reveal.js';
import RevealMarkdown from 'reveal.js/plugin/markdown/markdown.esm.js';
import RevealHighlight from 'reveal.js/plugin/highlight/highlight.esm.js';
import RevealNotes from 'reveal.js/plugin/notes/notes.esm.js';
import RevealMultiplex from './multiplex.js';
import RevealSpeakerNotes from './speaker-notes.js';
import RevealCountdown from './countdown.js';

import 'reveal.js/dist/reveal.css';
import 'reveal.js/dist/theme/white.css';
import 'highlight.js/styles/monokai.css';

const deck = new Reveal();

deck.initialize({
  hash: true,
  slideNumber: true,
  history: true,
  progress: true,
  transition: 'slide',
  
  multiplex: {
    enabled: true
  },
  
  notes: true,
  
  plugins: [
    RevealMarkdown, 
    RevealHighlight, 
    RevealNotes, 
    RevealMultiplex(),
    RevealSpeakerNotes(),
    RevealCountdown()
  ]
});
