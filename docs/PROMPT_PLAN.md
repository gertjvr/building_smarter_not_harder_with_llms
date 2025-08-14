# Prompt Plan for Building Smarter, Not Harder with LLMs

This document provides a comprehensive set of prompts to generate the entire presentation, including slides and images, using AI. Each section follows the presentation structure, with dedicated prompts for text content and image generation.

## Table of Contents

1. [Introduction Section](#1-introduction-section)
2. [Process Section](#2-process-section)
3. [Strategic Engineer Section](#3-strategic-engineer-section)
4. [Examples Section](#4-examples-section)
5. [Guardrails Section](#5-guardrails-section)
6. [Wrap-Up Section](#6-wrap-up-section)

---

## 1. Introduction Section

### 1.1 Title Slide

**Slide Content Prompt:**

```prompt
Create a title slide for a technical presentation with the following:
- Title: "Building Smarter, Not Harder with LLMs"
- Subtitle: "Strategic Orchestration, Not Vibe Coding" 
- Modern, clean design with a subtle tech/AI theme
```

**Image Generation Prompt:**

```prompt
Create a modern, minimalist title image for a presentation titled "Building Smarter, Not Harder with LLMs". 
Include a subtle visual representation of collaboration between humans and AI. 
Style: Clean, professional, with a blue and white color scheme. 
No text in the image.
```

### 1.2 Agenda Slide

**Slide Content Prompt:**
```
Create an agenda slide for a technical presentation with the following bullet points appearing one by one (fragments):
- Inspiration & shift (Harper Reed)
- AI as collaborator (mindset)
- Idea Honing → Spec → Blueprint
- Micro waterfall & parallel agents
- Guardrails: hyper-defensive + standards
- Strategic Engineer role
- Real-world examples
- Discussion / Q&A
```

**No image needed for this slide**

### 1.3 Shift Quote Slide

**Slide Content Prompt:**
```
Create a slide with a quote about the fundamental shift in the developer role when working with AI.
The quote should highlight the transition from deep "flow state" coding to strategic orchestration with AI.
Include speaker notes that contrast the old model (flow state) with the new model (orchestration).
```

**Image Generation Prompt:**
```
Create a visual representation of a paradigm shift in software development. 
Show a transition from a developer in deep "flow state" coding (left side) to a developer as an orchestrator directing multiple AI systems (right side).
Style: Modern, conceptual, professional infographic with clear visual storytelling.
Use subtle blue tones. No text overlay needed.
```

### 1.4 AI as Collaborator Slide

**Slide Content Prompt:**
```
Create a slide titled "AI as Collaborator" with these bullet points appearing one by one:
- Not just code gen
- Not "vibe coding"
- Structured partnership
- Iterative loop: Idea → Spec → Blueprint → Execute
- You: intent/tests • AI: accelerate/integrate

Include speaker notes that define the partnership cycle and emphasize control.
```

**Image Generation Prompt:**
```
Two figures (human and AI) in a circular dance/partnership, with arrows showing iterative flow between them. 
Human figure emanating "intent/constraints" while AI figure shows "code/integration".
Background suggests velocity/movement but controlled. 
Style: modern, clean diagram.
```

### 1.5 Rapid Planning Loop Slide

**Slide Content Prompt:**
```
Create a slide titled "Rapid Planning Loop" with these bullet points appearing one by one:
- Idea Honing → Specification
- Blueprint → Chunked Prompt Plan
- Execute → Review (tests / refine)

Add a fragment at the end stating: "Full planning often in a few minutes."

Include speaker notes that explain each step and emphasize the speed of the process.
```

**Image Generation Prompt:**
```
A sleek spiral or circular diagram showing 3 phases: "Idea Honing" (lightbulb + question marks), "Blueprint" (architectural plan/grid), "Execute" (gear/code symbols). 
Center shows "15 min" timer. 
Arrows suggest rapid iteration. 
Style: modern infographic, energetic but controlled.
```

---

## 2. Process Section

### 2.1 Idea Honing Prompt Slide

**Slide Content Prompt:**
```
Create a slide showing an example of an "Idea Honing Prompt" with the following text:

Ask me one question at a time so we can develop a thorough, step-by-step spec for this idea.
Each question should build on my previous answers, and our end goal is to have a detailed specification I can hand off to a developer. Let's do this iteratively and dig into every relevant detail. Remember, only one question at a time.

Here's the idea: 
<IDEA>

Design it to look like a chat interface or prompt card.
```

**Image Generation Prompt:**
```
A clean chat interface mockup showing the idea honing prompt in action. 
Shows human input at bottom, AI asking thoughtful questions above. 
Visual emphasis on "one question at a time" concept. 
Style: modern UI, friendly but professional.
```

### 2.2 Specification Prompt Slide

**Slide Content Prompt:**
```
Create a slide showing an example of a "Specification Prompt" with the following text:

Act as a software architect and create a detailed specification document based on our discussion so far.
The spec should include:
1. Overview and requirements
2. Architecture & components
3. Data structures & interfaces 
4. Error handling strategy
5. Testing approach
6. Implementation considerations

Present this as a professional specification document that could be given to a developer.

Design it to look like a document template.
```

**Image Generation Prompt:**
```
A professional specification document template with sections for requirements, architecture, data structures, error handling, and testing. 
Include visual elements like diagrams or flowcharts to represent software architecture.
Style: clean, technical document with professional formatting.
```

### 2.3 Idea Honing Process Slide

**Slide Content Prompt:**
```
Create a slide titled "Idea Honing" with these bullet points appearing one by one:
- Describe idea; AI asks one question at a time
- Outputs developer-ready specification
- Requirements, architecture, data, errors, testing

Include speaker notes explaining how this approach shifts human effort to judgment and completeness.
```

**Image Generation Prompt:**
```
A rough, sketchy lightbulb transforming through a series of focused question marks into a polished, detailed blueprint/document. 
Shows progression from vague idea to structured specification. 
Style: hand-drawn to digital transformation, suggesting refinement through questioning.
```

### 2.4 Blueprint Slide

**Slide Content Prompt:**
```
Create a slide titled "Blueprint" that explains the concept of creating a blueprint or prompt plan before coding.
Include bullet points about:
- Breaking down the specification into manageable steps
- Creating a sequence of prompts for implementation
- Planning for incremental validation

Include speaker notes emphasizing that this planning stage is where strategy happens.
```

**Image Generation Prompt:**
```
An architectural blueprint with code structure overlaid, showing a systematic breakdown of a complex project into manageable components. 
Include visual elements that represent planning, structure, and organization.
Style: technical blueprint with digital elements, blue/white color scheme.
```

### 2.5 Plan Prompt Slide

**Slide Content Prompt:**
```
Create a slide showing an example of a "Plan Prompt" with the following text:

Based on the specification, create a detailed implementation plan. Break down the entire project into a series of steps that:
1. Start with core functionality then expand
2. Can be implemented incrementally with verification at each step
3. Include specific prompts I can use for each implementation step
4. Consider dependencies between components
5. Include validation checkpoints

Structure this as a sequential plan with clear implementation prompts for each step.

Design it to look like a planning document with steps.
```

**Image Generation Prompt:**
```
A visual representation of a software implementation plan with sequential steps, checkpoints, and dependencies.
Show a flow from initial setup through core functionality to complete implementation.
Style: modern project management visualization with clear structure and progression.
```

### 2.6 Micro-Waterfall Slide

**Slide Content Prompt:**
```
Create a slide titled "Micro-Waterfall" that explains the concept of rapid mini-waterfall cycles.
Include bullet points about:
- Plan → Build → Review cycles
- Each cycle measured in minutes, not weeks
- Multiple agents working from same blueprint
- Feature + Tests + Docs in parallel

Include speaker notes explaining how this differs from traditional waterfall.
```

**Image Generation Prompt:**
```
A diagram showing multiple small waterfall cycles (Plan→Build→Review) in rapid succession, with multiple parallel streams.
Show how these micro-cycles create fast progress while maintaining structure.
Style: modern infographic with flow elements and parallel tracks, professional and clean.
```

---

## 3. Strategic Engineer Section

### 3.1 Strategic Engineer Role Slide

**Slide Content Prompt:**
```
Create a slide titled "Strategic Engineer" that explains the evolved role of a developer working with AI.
Include bullet points about:
- Architect → orchestrate → validate
- Time shifting from typing code to strategic decisions
- Focus on business value, not implementation details
- Parallel workstreams (features, tests, docs)
- Hyper-defensive error anticipation

Include speaker notes exploring this evolution from programmer to orchestrator.
```

**Image Generation Prompt:**
```
A visual representation of the evolution of a software engineer from code implementer to strategic orchestrator.
Show the engineer at the center of multiple streams (architecture, features, tests, documentation) with AI assistance.
Style: professional illustration with focus on human strategic oversight, modern and clean.
```

---

## 4. Examples Section

### 4.1 Watch Example Slide

**Slide Content Prompt:**
```
Create a slide titled "Example: Smart Watch Feature" showing a real-world example of using the planning process for a smartwatch feature.
Include bullet points showing:
- Initial idea: health metric tracking
- Questions revealed edge cases and priorities
- Blueprint created parallel implementation streams
- End result: 10x development speed

Include speaker notes with specific details about this case study.
```

**Image Generation Prompt:**
```
A modern smartwatch interface showing health metrics with blueprint/planning elements visible in the background.
Visually represent the connection between planning and final product.
Style: modern product development visualization combining concept and implementation.
```

### 4.2 Client Example Slide

**Slide Content Prompt:**
```
Create a slide titled "Example: Client Dashboard" showing another real-world example of this process.
Include bullet points showing:
- Complex data integration challenge
- Blueprint identified critical dependency sequence
- Parallel agents for API + UI + tests
- Result: 3-day implementation vs 2-week estimate

Include speaker notes with specific details about this case study.
```

**Image Generation Prompt:**
```
A business dashboard interface with multiple data visualizations, showing blueprint elements and implementation streams.
Visually represent how planning led to efficient parallel development.
Style: professional business application interface with development overlay elements.
```

---

## 5. Guardrails Section

### 5.1 Defensive Programming Slide

**Slide Content Prompt:**
```
Create a slide titled "Defensive Programming" explaining how to implement guardrails when working with AI.
Include bullet points about:
- Hyper-defensive error handling
- Explicit type checking everywhere
- Validate inputs/outputs at module boundaries
- Test against the unexpected
- Think like an adversary

Include speaker notes explaining why defensive programming is even more important with AI.
```

**Image Generation Prompt:**
```
A security-themed visualization showing code with multiple layers of protection and validation.
Include visual elements representing checks, validations, and safeguards in code.
Style: technical security illustration with protective layers around core functionality.
```

### 5.2 Good Habits Slide

**Slide Content Prompt:**
```
Create a slide titled "Good Habits" listing best practices when working with AI.
Include bullet points about:
- Review every line of generated code
- Run full test suite after each change
- Look for sneaky side effects
- Challenge the AI on assumptions
- Verify security implications
- Demand idiomatic, maintainable code

Include speaker notes expanding on each habit with examples.
```

**Image Generation Prompt:**
```
A visual representation of good development habits when working with AI.
Show a developer reviewing code with various checkpoints and verification methods.
Style: instructional illustration with clear visual representation of best practices.
```

### 5.3 CI Enforcement Slide

**Slide Content Prompt:**
```
Create a slide titled "CI Enforcement" explaining how to use continuous integration to enforce standards.
Include bullet points about:
- Automated checks for AI-generated code
- Complexity and security scanning
- Static analysis rules
- Contract tests at boundaries
- Peer review requirements

Include speaker notes about building a safety net for AI collaboration.
```

**Image Generation Prompt:**
```
A continuous integration pipeline visualization with special emphasis on validation stages for AI-generated code.
Show automated checks, security scanning, and verification steps.
Style: technical pipeline diagram with clear process flow and security checkpoints.
```

### 5.4 Standards Slide

**Slide Content Prompt:**
```
Create a slide titled "Standards" explaining the importance of clear standards when working with AI.
Include bullet points about:
- Explicit coding standards document
- Example-based style guide
- Architecture decision records (ADRs)
- Clear boundaries for AI contribution
- Team-specific templates

Include speaker notes about how standards create guardrails for AI.
```

**Image Generation Prompt:**
```
A visual representation of coding standards and documentation with AI-specific elements.
Show a stylized guide/rulebook with code samples and architecture patterns.
Style: technical documentation illustration with clear structure and organization elements.
```

---

## 6. Wrap-Up Section

### 6.1 Bringing It Together Slide

**Slide Content Prompt:**
```
Create a slide titled "Bringing It Together" that summarizes the key takeaways.
Include bullet points about:
- Strategic shift: from coder to orchestrator
- Rapid planning loop: idea → spec → blueprint → code
- Parallel implementation with multiple agents
- Hyper-defensive guardrails and standards
- Result: 5-10x development acceleration

Include speaker notes that synthesize these concepts into a coherent approach.
```

**Image Generation Prompt:**
```
A comprehensive visual summary of the entire presentation flow - from strategic planning through implementation to guardrails.
Show the complete cycle with emphasis on speed, quality, and structure.
Style: professional infographic that ties together all key concepts from the presentation.
```

### 6.2 Discussion Slide

**Slide Content Prompt:**
```
Create a slide titled "Discussion" for the Q&A portion of the presentation.
Include prompts such as:
- What workflows have you tried with AI?
- Where do you see the biggest opportunities?
- What concerns do you have about this approach?
- How could this fit with your current development process?

Include speaker notes with potential questions to pose to the audience.
```

**Image Generation Prompt:**
```
A conversation-themed visual showing multiple perspectives and dialogue around AI-assisted development.
Include elements representing questions, discussion, and collaborative thinking.
Style: engaging and interactive illustration encouraging audience participation.
```

---

## Image Generation Settings

For consistent results across all presentation images:

1. **Style Consistency:**
   - Modern, clean, professional look
   - Blue and white color scheme as primary palette
   - Consistent line weights and design elements

2. **Technical Quality:**
   - High resolution (minimum 1200px wide)
   - 16:9 aspect ratio preferred
   - PNG format with transparent background when possible

3. **Content Guidelines:**
   - Minimal or no text in images (text belongs in slide content)
   - Visual concepts should be clear without requiring explanation
   - Avoid busy backgrounds that compete with foreground elements

---

## Implementation Process

1. **Generate Images First:**
   - Use the image generation prompts to create all visual assets
   - Save in `public/img/` directory with appropriate naming (e.g., `slide-01.png`)

2. **Create Slide Content:**
   - Use the slide content prompts to generate HTML/markdown for each slide
   - Place in the appropriate section folders in `slides/`

3. **Review and Refine:**
   - Check for consistency across all slides
   - Ensure images and content work together
   - Adjust timing and transitions

4. **Add Speaker Notes:**
   - Incorporate detailed speaker notes from prompts
   - Ensure they provide comprehensive guidance for presentation delivery

---

## Testing the Presentation

- Run locally with `pnpm dev`
- Test speaker notes view (press `S`)
- Verify all images load correctly
- Check that fragments appear in the right order
- Test on different screen sizes

---

## Deployment

- Build with `pnpm build`
- Deploy to GitHub Pages with the GitHub Action workflow
- The presentation will be available at https://gertjvr.github.io/building_smarter_not_harder_with_llms/
