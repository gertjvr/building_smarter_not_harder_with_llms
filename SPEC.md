# Building Smarter, Not Harder With LLMs - Full Talk Script

---

## Slide-by-Slide Flow & Speaker Notes

### 01-01: Title Slide

**Opening (deliver deliberately):**

- "Good afternoon everyone." (Pause, smile, make eye contact with different sections.)
- "I know it's been a long day — second last talk before we head off." (Light chuckle / empathy moment.)
- "Yes, I did attend the vibe coding session this morning… and this talk is definitely *not* that."
- Contrast: Not about letting AI freestyle the codebase into oblivion; about building smarter, not harder.
- Credit Harper Reed's recent blog posts for inspiring the framing: shift from hand‑crafting every line toward orchestration + guardrails.

Frame the through‑line: AI as collaborator → rapid planning loops → micro waterfall cycles → strategic engineer role → hyper‑defensive guardrails → enforceable standards.

Engagement:

- Ask: "Quick show of hands — who's used AI to write *any* code in the last month?" 
- React proportionally (if most: "Great, we'll sharpen that workflow"; if few: "Perfect—this will accelerate your on‑ramp.")

Transition to agenda.

### 01-02: Agenda

Purpose: give audience mental roadmap of shift → workflow → safety → role → validation → interaction.

- Inspiration & shift: credit Harper Reed; framing of rapid planning upfront replacing ad‑hoc hacking.
- AI as collaborator: reject "vibe coding"; partnership & orchestration language.
- Planning trio: Idea Honing (Q&A) → Spec (developer‑ready) → Blueprint (chunked prompt plan).
- Micro waterfall & parallel agents: plan → build → review loops; concurrent feature/docs/tests agents = throughput.
- Guardrails: hyper‑defensive habits (static analysis, selective formal verification, meaningful coverage, frequent commits, pruning noise) + AI‑readable standards (house rules loaded first).
- Strategic Engineer: human moves to shaping prompts, tests, architecture, product alignment—enabled by guardrails.
- Real-world examples: validation of the complete framework through concrete implementations.
- Discussion / Q&A: invite workflows, bottlenecks, success/failure stories.

Anchor line: "Fast code is useless without control."

Transition: Dive into Idea Honing to show first collaborative planning phase.

### 01-03: The Shift

Bridge from agenda to collaboration mindset (Harper Reed inspiration).

Fundamental shift in developer role:

- Old model: deep "flow state" coding, disappearing into the editor for hours.
- New model: strategic orchestration — directing multiple AI agents, maintaining quality, focusing on product outcomes.

Reinforce contrast: not about simply generating code blobs; definitely not about "vibe coding" where AI freestyles without structure.

It's about deliberate, structured, strategic building with AI as active partner.

Transition: Let's define what this partnership actually looks like in practice.

### 01-04: AI as Collaborator

Core message: AI shifts from tool to *active collaborator*; we orchestrate.

Contrast first: not just firing prompts for blobs of code, not laissez‑faire "vibe coding".

Define partnership cycle: you shape intent & constraints → AI proposes / implements → automated checks + you review → refine → next micro loop.

Tie to loop: Idea Honing (Q&A) → Spec → Blueprint (prompt plan) → Execute (sequential code generation) → Review.

Roles: Human = product sense, risk spotting, test design, architectural coherence. AI = rapid boilerplate + iterative change + parallel tasks (feature, docs, tests).

Emphasize control: speed without drifting because planning & guardrails bound each loop.

Transition: We'll zoom into Idea Honing next.

### 01-05: Rapid Planning Loop

**Bullets:**

- Idea Honing → Specification
- Blueprint → Chunked Prompt Plan
- Execute → Review (tests / refine)
- Full planning in a few minutes

**Phases:**

1. **Idea Honing → Specification:** one‑question‑at‑a‑time interrogation yields developer‑ready spec (requirements, architecture, data, errors, testing).
2. **Blueprint → Prompt Plan:** reasoning model (not code yet) breaks spec into safe, incremental, integrated steps; produces prompts + checklist.
3. **Execute → Review:** code‑gen model implements each prompt sequentially; automated tests + static analysis + human spot checks close the loop.

**Micro waterfall:** distinct Plan / Build / Review phases but rapid, repeatable cycles.

**Concurrency hook:** multiple agents can run off the same blueprint (feature, docs, tests) without losing coherence.

**Emphasize speed:** in a few minutes to go from raw idea to actionable blueprint enables live planning in meetings / pairing.

**Transition:** Next we deep dive Idea Honing mechanics, then show prompts that drive specification & blueprint.

---

## Process Deep Dive

### 02-01: Idea Honing

Idea Honing:

- We resist the urge to code; we *interrogate* the idea.
- Prompt: AI asks exactly one clarifying question at a time – forces depth, prevents premature assumptions.
- Outcome: a developer‑ready spec covering requirements, architecture choices, data handling, error strategy, testing plan.
- Benefit: shifts human effort to judgement & completeness instead of manual boilerplate.
- Emphasize: This Q&A loop is fast but exhaustive; creates shared mental model before a single line is generated.

Segue: Once spec is stabilized, we hand it to a reasoning model for blueprinting.

### 02-02: Idea Prompt (Show actual prompt)

**Demo the concrete prompt that drives idea honing.**

### 02-03: Specification Prompt (Show actual prompt)

**Reinforce culmination of idea honing:** converting exploratory Q&A into a *structured* artifact.

**Remind audience:** ask for explicit inclusion of: business & functional requirements, non‑functionals, architecture rationale, data shapes & lifecycle, error taxonomy/handling, security/privacy notes, observability hooks, and testing strategy.

**Key message:** Rich, *concise* spec lowers hallucination risk in later steps and becomes reusable context.

### 02-05: Blueprint

**Blueprint phase (full talk: "reasoning AI creates detailed blueprint"):**

- Use a *reasoning* model (not yet code‑gen) to transform spec into a staged implementation plan.
- Criteria for each chunk: small enough for safe review + rollback; meaningful forward progress; test visibility early.
- Instruct AI to *iterate* on chunk sizing (second pass to shrink/merge until right‑sized).
- Deliverables: ordered list of steps, rationale per step, explicit prompts for code‑gen model, and a resumable checklist.
- Benefit: eliminates big leaps; reduces orphaned code; supports concurrent agents.

**Transition:** Show concrete prompt used to elicit this plan.

### 02-06: Plan Prompt (Show actual prompt)

**Clarify intent:** This prompt asks the model to first *reason & design*, then compress into executable prompts.

**Emphasize instructions:** iterate on step sizing; enforce sequential integration (no dangling artifacts); embed testing focus early.

**Tie to talk:** planning yields a reusable "prompt plan" enabling safe acceleration.

### 02-07: Micro Waterfall

**Micro Waterfall (from talk: "carefully defining a spec, generating the code, then reviewing it"):**

1. **Plan** (spec + blueprint) – deterministic scaffold.
2. **Build** (code‑gen executes each prepared prompt sequentially).
3. **Review** (tests + static analysis + human spot checks) → adjust → next loop.

**Feels iterative yet phases are intentionally *distinct* to reduce drift.**

**Parallelism:** spawn agents—feature implementation, documentation synthesis (implementation guide), test enhancement—driven off same plan → "concurrency on steroids".

**Stress control:** speed without losing architectural coherence or quality.

**Transition:** Human role shifts because code materializes faster.

---

## Role Evolution

### 04-01: Strategic Engineer

Role evolution (full talk: shift from "code as craft" / deep flow to orchestration):

- Strategic Engineer is product manager + architect + quality assurance tester + developer.
- Shaping prompts: distill intent & constraints; short precise prompts can outperform verbose walls.
- Defining tests: codify expectations so AI can self‑verify (bots test their own output).
- Maintaining quality: enforce structure, readability, performance, security hygiene while velocity spikes.
- Handling edge cases: anticipate failure modes / data anomalies LLM may overlook.

Mindset change: embrace context switching (AI working = your thinking window). Flow ≠ hours of typing; flow = steering multiple autonomous efforts.

Audience prod: "Who still hand‑writes routine CRUD? What higher‑leverage activity could replace that time?"

Transition: Now let's see this complete framework—process + guardrails + strategic role—in action through real examples

---

## Guardrails & Standards

### 05-01: Hyper-Defensive Coding

**Guardrails motivation (talk: "potential for quality to nosedive if left unchecked"):**

**Bullets:**

- Static analysis
- Formal verification
- Extensive coverage

**Hyper‑defensive posture compensates for volume & speed of AI output.**

- **Static analysis:** immediate structural & type issues before runtime.
- **Formal verification (selective):** critical paths / invariants (e.g., financial calc, auth flows) → mathematical assurance.
- **Extensive coverage:** behavior net; focus on *meaningful* scenarios & edge boundaries, not trivial loops.

**Principle:** assume AI will occasionally introduce subtle regressions; design systems to surface them fast.

**Transition:** translate principles into daily habits.

### 05-02: Practical Habits

**Practical habits (talk highlights):**

**Bullets:**

- Frequent commits (rollback points)
- Prune pointless tests
- Comprehensive documentation
- Control through planning

**Details:**

- **Frequent commits:** treat as checkpoints; rapid rollback when an agent "goes sideways".
- **Prune pointless tests:** AI loves to over‑generate trivial assertions; keep suite fast & signal‑rich.
- **Comprehensive documentation:** generate implementation guides; feed back as context for subsequent agent passes (compounding clarity).
- **Control via planning:** blueprint = change budget + alignment artifact; prevents getting "over your skis".
- **Add:** Use CI to auto‑enforce lint, type, test, security scans—bots gate bots.

**Segue:** Beyond habits, encode standards so AI *starts* aligned.

### 05-04: AI-Readable Standards

**AI‑readable standards (talk section "Enforceable Project Standards"):**

**Bullets:**

- Tech stack
- Coding style
- Testing approach
- Run & test commands

**Purpose:** living contract for humans + preloadable context for AI.

**Contents:** tech stack constraints; formatting & style conventions; testing philosophy (types of tests + coverage priorities); canonical run/build/test commands; security / error handling patterns.

**Workflow:** generate initial drafts *from* existing codebase → refine → store as discrete files.

**Usage:** inject into first prompt before any generation ("house rules").

**Benefits:** faster onboarding, reduced style drift, higher first‑try accuracy from models.

**Transition:** Wrap by reconnecting pillars (Plan × AI × Guardrails) before discussion.

---

## Wrap up

### 06-01: Bringing It Together

**Synthesis (talk conclusion themes):**

**Pillars:** (1) Detailed planning artifacts (spec + blueprint) (2) Guardrails & defensive automation (3) Enforceable standards.

**Core line:** "Fast code is useless without control."

**Reframe AI:** an "infinite junior engineer" executing well‑shaped intent; human value migrates to product resonance & strategic clarity.

**Implication:** differentiation shifts from elegance of handcrafted code to user impact & experience.

**Encourage:** treat each loop as a 15‑minute micro waterfall cycle—plan with precision, execute with leverage, review with rigor.

**Set up final invite to discuss audience workflows & challenges adopting this.**

**Transition:** open Q&A / discussion slide.

### 06-02: Discussion

**Closing script:**

- "So: a rapid 'new waterfall'—spec → blueprint → code → review—on hyperdrive."
- "Our creativity isn't diminished; it's redirected to choosing *what* and *why*, not just *how*."
- Tie back to opening contrast (vibe coding vs strategic orchestration).
- Prompt discussion: What parts of this loop are you already doing? Where does it break in your org (culture, tooling, trust)?
- Invite sharing of successes / horror stories (AI regressions caught—or missed—by guardrails).
- Thank audience sincerely; encourage experimentation with small internal pilot using standards + blueprint approach.

**End:** "Thank you."

---

## Full Narrative Script

Good afternoon everyone.

[PAUSE, smile, make eye contact]

I know it's been a long day — second last talk before we all head off.

[light chuckle]

And yes… I did attend the vibe coding session this morning after the keynote. Well… this talk isn't that. This talk is about building smarter, not harder — and definitely not about vibe coding or letting the AI freestyle your codebase into oblivion.

This talk is inspired by the insightful experiences shared in Harper Reed's recent blog posts, which highlight a profound shift in how we approach software development.

We'll look at how AI can become a powerful collaborator, transforming our traditional roles and demanding a new focus on strategic thinking and effective guardrails.

## AI as Collaborators: Your New Development Partner

The core idea here is to view AI tools not as replacements, but as active collaborators in the development process. This isn't about simply generating code — and it's certainly not about vibe coding — it's about a dynamic partnership that redefines our interaction with the codebase and with each other.

Harper Reed's approach to using LLMs for software development is built on discrete, iterative loops: first, brainstorming and defining a specification, then planning out the implementation, and finally, executing the code generation. This process moves incredibly quickly, with the initial planning taking perhaps as little as 15 minutes.

## The Planning Phase: A New Kind of Blueprint

Let's dive into how AI acts as a collaborator, especially during the critical planning phase. This is where we lay the foundation for building smarter.

You start with idea honing. Instead of jumping straight into code, you describe your idea to AI and let it ask one question at a time. It builds on your answers, digging into every relevant detail, until you have a complete, developer-ready specification. This output includes crucial elements like requirements, architecture choices, data handling, error strategies, and testing plans, providing a solid foundation.

Once you have this detailed specification, you pass it to a reasoning AI to create a detailed blueprint. This AI drafts a step-by-step plan, breaking the project into small, iterative chunks. It reviews and refines these chunks to ensure they are small enough for safe implementation (with or without strong testing, depending on your approach), yet substantial enough to move the project forward incrementally. The goal is for the AI to generate a series of clear prompts that a code-generation AI can use to implement each step in a sequential, integrated manner, prioritising best practices and avoiding sudden jumps in complexity. This collaborative planning results in a detailed prompt plan and a checklist to track progress, which can even be used by code generation tools to maintain state across sessions.

This iterative, AI-assisted planning nudges us towards what has been described as "micro waterfall cycles": carefully defining a spec, generating the code, and then reviewing it. It's iterative in practice, but involves distinct phases of planning, execution, and review. What's truly powerful is the ability to spin up multiple AI agents concurrently – one building a feature, another handling documentation, and a third focusing on test coverage, leading to "concurrency on steroids".

## Guardrails and Defensive Coding: Ensuring Quality and Control

With AI doing more of the heavy lifting, the question of code quality naturally arises. There's a potential for quality to "nosedive" if left unchecked. This brings us to a crucial point: the absolute necessity of defensive coding practices and effective guardrails for our AI tools.

The sources strongly advocate for a push towards "hyper-defensive coding". This means implementing:

**Static analysis:** Tools that analyse code without executing it, catching errors early.

**Formal verification:** Rigorous mathematical methods to prove code correctness.

**Extensive test coverage:** Ensuring every part of the codebase is thoroughly tested.

The emphasis shifts so that if an AI-based agent does introduce an issue, it's caught quickly. We now have an unprecedented need for top-notch Continuous Integration/Continuous Delivery (CI/CD) pipelines and rigorous checks. Testing, including test-driven development (TDD), becomes less about methodical stepping through code ourselves and more about letting the bots verify themselves.

Practically, this translates into several key habits:

**Frequent Commits:** Adopt a "checkpoint" workflow by committing often. AI can introduce issues as quickly as it solves them, so frequent commits provide easy rollback points.

**Pruning Tests:** While AI loves to test everything, including basic functionality like loop behaviour, you need to stay vigilant and prune pointless tests to keep your pipeline lean and efficient.

**Comprehensive Documentation:** Actively document everything. You can even have the AI generate extensive "Implementation Guides." These guides not only help you understand the system but also serve as valuable context for the AI itself on subsequent passes, improving its performance.

**Leveraging Planning for Control:** The initial planning step, as discussed earlier, is a critical guardrail. It provides a detailed blueprint and documentation that helps you stay in control and avoid getting "over your skis" – a common feeling when working with rapidly generating AI. Testing further supports this, helping to keep things "good, and tight".

## Enforceable Project Standards: AI-Readable Guidelines

Another layer of control comes from establishing AI-readable project standards — essentially a set of files or rules that clearly define:

- The tech stack
- Coding style and formatting
- Testing approach and coverage expectations
- Commands to run, build, and test the solution

These guidelines act as both a living contract for human developers and as a promptable context for AI tools. By loading these into the AI before any code generation, you're giving it the "house rules" so it knows what's acceptable and what isn't.

Here's where it gets interesting:

- The AI can generate these files automatically from an existing codebase.
- This is particularly useful for onboarding new developers or when standardising across multiple projects.
- In practice, it's like giving the AI a checklist of "how we do things here" before it writes a single line of code.

## The Evolving Role: From Pure Developer to Strategic Engineer

This shift inevitably changes the role of the human developer. The traditional "code as craft" mindset, where we sought deep "flow states" to sculpt logic, is being challenged. LLMs can now pump out features in minutes, and our focus is moving away from the minute details of hand-coding.

Instead, we are moving towards becoming strategic engineers — individuals who can orchestrate multiple AI tools, maintain a vigilant eye on code quality, and design new systems that are scalable. Their role encompasses elements of a product manager, architect, quality assurance specialist, and developer.

In this new paradigm, your value lies in:

**Shaping the prompts:** Clearly articulating the vision and requirements for the AI. Even short, clear prompts can sometimes outperform elaborate instructions.

**Defining the tests:** Ensuring the AI's output is rigorously validated.

**Maintaining quality:** Overseeing the overall integrity of the codebase.

**Handling edge cases:** Addressing scenarios that the LLM might not predict.

This also means adapting our working style. The intense, heads-down flow state might become less central. Instead, AI coding allows for context-switching, enabling productivity even when juggling multiple tasks or personal commitments. While the current workflows are often described as "single player mode," limiting team collaboration with AI tools, they significantly accelerate individual code generation. This creates "downtime" while the AI processes, which can be leveraged for other strategic thinking or even just a break.

## Conclusion

The world of software development is undoubtedly shifting rapidly. Our familiar assumptions about coding, craft, and the flow state are becoming quaint. However, this doesn't diminish our creativity; it merely redefines it.

Building smarter, not harder, with LLMs means embracing strategic orchestration: knowing what to build, how to precisely describe it to the AI, and how to prevent it from becoming a "dumpster fire". The LLM effectively acts as an "infinite junior engineer", ready to execute on your well-defined plans.

The ultimate differentiator in this new landscape won't be how elegantly the code is written, but rather how well the resulting product resonates with users. This means our focus increasingly shifts from pure engineering to design and product problems.

So, welcome to this new era of development – a "new waterfall" done in rapid cycles, where AI is our powerful partner, and our code pipeline is on hyperdrive. It's a weird, wonderful, and sometimes terrifying dance, but it's one we're all going to have to learn.

Thank you.
