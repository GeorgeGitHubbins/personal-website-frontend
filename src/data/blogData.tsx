import React from 'react';

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: 'Web Dev' | 'AI & Automation' | 'Cloud' | 'Systems Eng';
  tags: string[];
  contentText: string; // Plain text version for searching and reading time calculation
  content: React.ReactNode;
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'google-sites-to-react',
    title: 'From Google Sites to React: Why I Migrated My Personal Brand',
    excerpt: 'How and why I moved my portfolio from a drag-and-drop Google Sites page to a fully customized, autonomous React and TypeScript platform hosted on AWS S3.',
    date: '2026-05-15',
    category: 'Web Dev',
    tags: ['React', 'Web Performance', 'TypeScript', 'SEO'],
    contentText: `From Google Sites to React: Why I Migrated My Personal Brand. For several years, my online portfolio lived on Google Sites. It was simple, free, and incredibly easy to maintain. However, as my career evolved and my interest in modern web engineering, interactive interfaces, and autonomous systems grew, the limitations of standard drag-and-drop web builders became glaringly obvious. The limitations of Google Sites included: No custom JavaScript. You cannot implement complex interactions like physics-based Canvas animations or draggable timelines. Styling restrictions. You are locked into predefined, blocky layouts that lack the premium, responsive polish of custom CSS variables and glassmorphic designs. No programmatic control. You cannot run background crawlers, fetch dynamic API data (like live GitHub activity), or implement client-side NLP search algorithms. Lack of AI agent-friendly setup. A closed platform like Google Sites cannot be autonomously updated by an LLM-driven development agent like Gemini CLI.
The Migration Choice: React, TypeScript, and Vite.
To solve these constraints, I decided to build a high-performance, single-page application (SPA) from scratch. Here's why I chose this stack:
1. React (Vite): Provides rapid compilation, hot module reloading, and a component-driven structure that is easy for human developers and autonomous agents to maintain.
2. TypeScript: Ensures strict type-checking, preventing runtime errors and providing self-documenting code structures.
3. Vanilla CSS: While CSS-in-JS and utility libraries (like Tailwind) are popular, Vanilla CSS using modern CSS variables is lightweight, lightning-fast, and highly LLM-friendly, enabling seamless visual refactorings.
The Result: High Performance & Complete Freedom.
By moving to React, I was able to implement:
- An Interactive Systems Node Graph simulation.
- A fully searchable Career Assistant.
- Smooth theme toggles and a fluid reading progress bar.
- Perfect Lighthouse scores and clean, structured SEO metadata.
In subsequent posts, I'll share how I keep this site self-improving and how I host it for practically zero cost.`,
    content: (
      <article className="blog-post-body">
        <p>For several years, my online portfolio lived on Google Sites. It was simple, free, and incredibly easy to maintain. However, as my career evolved and my interest in modern web engineering, interactive interfaces, and autonomous systems grew, the limitations of standard drag-and-drop web builders became glaringly obvious.</p>
        
        <h2>The Core Bottlenecks of Google Sites</h2>
        <p>While Google Sites is an excellent tool for quick wikis or basic landing pages, it falls short for engineering portfolios due to three main factors:</p>
        <ul>
          <li><strong>No Custom JavaScript:</strong> You cannot implement complex, stateful interactions like physics-based Canvas animations, draggable timelines, or client-side searching.</li>
          <li><strong>Styling Restrictions:</strong> You are locked into predefined, blocky templates that lack the premium, responsive polish of custom CSS variables, custom media queries, and glassmorphic designs.</li>
          <li><strong>No Programmatic Control:</strong> You cannot run background tasks, fetch dynamic API data (like live GitHub activity), or implement client-side NLP search algorithms.</li>
          <li><strong>No AI-Agent Integration:</strong> A closed platform cannot be autonomously analyzed, tested, or updated by an LLM-driven development agent.</li>
        </ul>

        <blockquote>
          "As an engineer, your personal website shouldn't just list your projects; it should be one of your projects."
        </blockquote>

        <h2>The Migration Choice: React, TypeScript, and Vite</h2>
        <p>To solve these constraints, I decided to build a high-performance, single-page application (SPA) from scratch. Here is why I chose this specific stack:</p>
        
        <h3>1. React & Vite</h3>
        <p>Vite provides rapid compilation and hot module reloading. React's component-driven architecture makes it highly modular, which is ideal for both human developers and autonomous agents to read and maintain. Components like the Career Assistant or the Timeline can be engineered as isolated, testable modules.</p>

        <h3>2. TypeScript</h3>
        <p>TypeScript ensures strict type-checking, eliminating large classes of runtime errors. For autonomous tools like Gemini CLI, a typed codebase serves as a guardrail, ensuring changes respect existing data schemas and interface signatures.</p>

        <h3>3. Vanilla CSS</h3>
        <p>While CSS-in-JS and utility libraries (like Tailwind) have their place, modern Vanilla CSS with CSS variables is lightweight, lightning-fast, and highly readable. Keeping styles in <code>App.css</code> using predefined variables makes it extremely easy for AI models to implement cohesive visual refactorings without bloating the bundle size.</p>

        <h2>The Result: Complete Freedom</h2>
        <p>By moving to a custom React architecture, I succeeded in transforming a passive resume into an interactive engineering playground. The site now hosts:</p>
        <ul>
          <li>An <strong>Interactive Systems Node Graph</strong> simulation in the Playground.</li>
          <li>A fully searchable <strong>Chat Assistant</strong> with keyword matching and simulated typing.</li>
          <li>An <strong>Interactive Work Timeline</strong>.</li>
          <li>Smooth dark-mode transitions, a visual reading progress bar, and perfect Lighthouse performance scores.</li>
        </ul>
        <p>This codebase is now living proof of a modern, component-driven web application, engineered for continuous, autonomous evolution.</p>
      </article>
    )
  },
  {
    slug: 'automating-personal-website',
    title: 'Automating a Personal Website with Gemini CLI and GitHub Actions',
    excerpt: 'A deep dive into how Gemini CLI runs on a daily cron job to autonomously read my TODO list, implement features, write tests, and deploy changes.',
    date: '2026-05-28',
    category: 'AI & Automation',
    tags: ['AI Agents', 'CI/CD', 'GitHub Actions', 'Automation'],
    contentText: `Automating a Personal Website with Gemini CLI and GitHub Actions. What if your website could improve itself while you sleep? That is the core premise of this website's autonomous evolution workflow. By combining Gemini CLI with GitHub Actions, this portfolio is set up to periodically analyze its own backlog, plan new features, write high-quality code and unit tests, verify the code against a local test suite, and deploy the production bundle to AWS S3.
How the Autonomous Loop Works:
1. Cron Trigger: A GitHub Action workflow runs on a daily schedule (04:00 UTC).
2. Context Loading: The workflow spins up a runner, installs Node.js, and checks out the repository. It loads GEMINI.md (which contains the repo rules, style guidelines, and tech stack choices) and TODO.md (the roadmap).
3. Strategic Decisions: The autonomous Gemini CLI agent analyzes the TODO.md backlog. It selects a high-priority task or identifies a valuable performance, UI, or accessibility improvement.
4. Planning & Execution: The agent plans its approach, modifies the codebase using surgical file-editing tools, and creates new files (such as Vitest unit tests).
5. Verification: The agent runs npm run lint and npm test. If any check fails, the agent reads the terminal output, diagnoses the root cause, and implements a fix.
6. Deployment: Once everything is verified, the agent updates TODO.md (marking the task as completed) and commits the changes. The commit triggers the AWS deployment workflow.
Key Safety and Quality Guardrails:
To ensure the AI agent behaves safely and respects my brand, several rules are established:
- Never touch the primary domain (georgegittins.com) without explicit permission; iterate on ai.georgegittins.com first.
- Strict cost controls: Avoid third-party server-side API dependencies.
- Unit testing: All core components must have tests, and changes must not break existing ones.
This workflow proves that personal portfolios do not have to be stale, forgotten pages; they can be living repositories of continuous, AI-augmented engineering.`,
    content: (
      <article className="blog-post-body">
        <p>What if your website could improve itself while you sleep? That is the core premise behind this portfolio's autonomous evolution workflow. By combining the power of Gemini CLI with GitHub Actions, this website is set up to periodically analyze its own backlog, plan new features, write high-quality code, run a unit test suite, and prepare changes for deployment.</p>

        <h2>The Autonomous Loop Architecture</h2>
        <p>The daily self-improvement cycle is orchestrated entirely through a serverless CI/CD pipeline. Here is how the loop operates step-by-step:</p>
        
        <div className="blog-code-container">
          <pre><code>{`+-------------------+      +------------------+      +------------------+
| GitHub Action     | ---> | Gemini CLI       | ---> | Reads GEMINI.md  |
| Daily Cron (04:00)|      | Autonomous Mode  |      | & TODO.md        |
+-------------------+      +------------------+      +------------------+
                                                              |
                                                              v
+-------------------+      +------------------+      +------------------+
| Push Commit       | <--- | Self-Correct &   | <--- | Implements Code  |
| Triggering Deploy |      | Run npm test     |      | & Writes Tests   |
+-------------------+      +------------------+      +------------------+`}</code></pre>
        </div>

        <ol>
          <li><strong>Cron Trigger:</strong> A GitHub Action workflow runs on a scheduled cron job (every 3 days at 04:00 UTC).</li>
          <li><strong>Context Loading:</strong> The workflow spins up a lightweight Linux runner, installs Node.js dependencies, and checks out the repository. It feeds the repo structure, <code>GEMINI.md</code> (system instructions/rules), and <code>TODO.md</code> (the product backlog) into the context.</li>
          <li><strong>Strategic Task Selection:</strong> The autonomous agent parses <code>TODO.md</code>. It evaluates unfinished tasks, selects a high-priority feature, or identifies a clear performance, accessibility, or visual improvement.</li>
          <li><strong>Planning & Implementation:</strong> The agent constructs an execution plan. It uses file-writing and editing tools to implement the changes and write corresponding Vitest unit tests.</li>
          <li><strong>Rigorous Verification:</strong> The agent executes <code>npm run lint</code>, <code>npm run build</code>, and <code>npm test</code>. If a test fails or a linter throws an error, the agent intercepts the output, diagnoses the failure, and iterates on the code until it compiles and passes cleanly.</li>
          <li><strong>Atomic Commit:</strong> Once verified, the agent updates <code>TODO.md</code> (moving the completed task to the "Completed" section), writes a structured, descriptive commit message, and commits the code.</li>
        </ol>

        <h2>Safety & Quality Guardrails</h2>
        <p>Entrusting a production codebase to an AI agent requires ironclad guardrails to prevent broken deployments or styling regressions:</p>
        <ul>
          <li><strong>Sandbox Isolation:</strong> The build process is completely isolated. Changes are deployed to <code>ai.georgegittins.com</code> first, keeping the legacy resume page untouched.</li>
          <li><strong>Cost Mandate:</strong> The agent is restricted from adding any paid SaaS or premium cloud resources. Every feature must be "Forever Free"—accomplished via static pre-indexing or client-side execution.</li>
          <li><strong>No Hidden Logic:</strong> Hacks, type-assertions, or warning-suppressions are strictly banned. The agent must solve issues using clean, idiomatic TypeScript and standard CSS.</li>
        </ul>

        <h2>The Future of Web Development</h2>
        <p>This workflow highlights a paradigm shift. AI is transitioning from an interactive "Copilot" in the editor to an independent, asynchronous "Agent" that collaborates on a codebase. By maintaining strict coding guidelines and test coverage, we establish a robust environment where humans and AI agents can seamlessly co-author software.</p>
      </article>
    )
  },
  {
    slug: 'serverless-portfolio-aws',
    title: 'Building a Serverless Portfolio on AWS: S3, CloudFront, and Route 53',
    excerpt: 'A step-by-step guide to hosting a fast, secure, and forever-free React website on AWS using serverless static hosting.',
    date: '2026-06-10',
    category: 'Cloud',
    tags: ['AWS', 'CloudFront', 'S3', 'Serverless', 'DevOps'],
    contentText: `Building a Serverless Portfolio on AWS: S3, CloudFront, and Route 53. Personal websites should be fast, highly available, secure, and above all, cheap to run. Traditional server hosting or virtual private servers (VPS) require constant patch management and incur recurring monthly charges. By leveraging AWS serverless static web hosting, I built an architecture that costs less than $0.50 a month, delivers sub-second page loads globally, and requires zero infrastructure maintenance.
The Architecture:
1. Amazon S3 (Simple Storage Service): Acts as the origin. The compiled React production bundle (HTML, JS, CSS, WebP images) is uploaded to an S3 bucket configured for static website hosting.
2. Amazon CloudFront (CDN): Serves as the global content delivery network. CloudFront caches the files at edge locations worldwide, drastically reducing latency and providing SSL (HTTPS) protection via AWS Certificate Manager (ACM).
3. Amazon Route 53 (DNS): Manages the custom domain name resolution, routing traffic directly to the closest CloudFront edge location.
Solving the Single-Page Application (SPA) Routing Problem on Static Hosts:
When deploying a React app with client-side routing (like react-router-dom) to a static host like S3, you run into a major issue. If a user visits the homepage and clicks on /experience, React Router handles the transition smoothly. But if the user refreshes the page or types ai.georgegittins.com/experience directly into the browser, S3 looks for a folder named experience or a file named experience in the bucket. Since that file does not exist, S3 returns a 404 Error.
The CloudFront Solution:
To solve this cleanly without running a server, we configure a Custom Error Response in CloudFront:
- Error Code: 404 (Not Found)
- Response Page Path: /index.html
- HTTP Response Code: 200 (OK)
When a direct request returns a 404, CloudFront serves index.html instead, with a 200 OK status. React Router then parses the URL path and renders the correct page seamlessly.
By utilizing S3, CloudFront, and Route 53, we achieve a modern serverless deployment that scales infinitely and remains forever free within the AWS Free Tier.`,
    content: (
      <article className="blog-post-body">
        <p>Personal websites should be fast, highly available, secure, and above all, inexpensive to run. Traditional virtual private servers (VPS) require constant operating system patches and incur recurring monthly fees, even when traffic is low. By leveraging AWS serverless infrastructure, I established a static hosting architecture that costs next to nothing, scales dynamically, and requires zero upkeep.</p>

        <h2>The Serverless Infrastructure Stack</h2>
        <p>The architecture consists of three core AWS services acting in unison to deliver the website to users globally:</p>
        
        <h3>1. Storage: Amazon S3</h3>
        <p>The compiled production build of the React app (consisting of static HTML, CSS, compressed WebP assets, and JS chunks) is stored in an Amazon S3 bucket. S3 provides 99.999999999% durability and is optimized for serving static content without running any persistent virtual machine instances.</p>

        <h3>2. Delivery: Amazon CloudFront</h3>
        <p>While S3 can host websites directly, it does not natively support HTTPS using custom domains, and serving content from a single geographic region is slow for international visitors. Amazon CloudFront (AWS's global CDN) caches the static files at edge locations worldwide. It handles SSL/TLS handshakes using a free wildcard certificate from AWS Certificate Manager (ACM), guaranteeing secure HTTPS traffic.</p>

        <h3>3. Domain Management: Amazon Route 53</h3>
        <p>Route 53 acts as the highly available Domain Name System (DNS) service. It maps requests for <code>ai.georgegittins.com</code> directly to the CloudFront distribution using efficient alias records, ensuring sub-millisecond DNS lookups.</p>

        <h2>Solving the SPA Routing Problem</h2>
        <p>When hosting a Single-Page Application (SPA) that utilizes client-side routing (e.g., React Router) on static web storage, you will immediately encounter a hurdle. If a user lands on the homepage (<code>/</code>) and clicks "Work Experience," React Router intercepts the click and changes the view to <code>/experience</code>. This works flawlessly.</p>
        <p>However, if the user presses refresh, or directly visits <code>https://ai.georgegittins.com/experience</code>, the browser sends a request directly to the host. S3 looks for an object named <code>experience</code> or a folder containing <code>index.html</code>. Because it is an SPA, no such file exists, and S3 returns a <strong>404 Not Found</strong> error.</p>

        <h3>The CloudFront Error Document Trick</h3>
        <p>We solve this cleanly and serverlessly by configuring a <strong>Custom Error Response</strong> inside our CloudFront distribution:</p>
        <div className="blog-code-container">
          <pre><code>{`Custom Error Page Configuration:
------------------------------------------
HTTP Error Code:             404 (Not Found)
Error Caching Minimum TTL:   0 seconds
Customize Error Response:    Yes
Response Page Path:          /index.html
HTTP Response Code:          200 (OK)`}</code></pre>
        </div>
        <p>When a visitor direct-loads a deep path, S3 throws a 404. CloudFront intercepts this 404, fetches <code>/index.html</code> instead, and returns it with an <strong>HTTP 200 OK</strong> status. Once the browser loads <code>index.html</code>, the bundled React Router script executes, parses the browser's current URL path, and dynamically renders the Work Experience view without the user ever noticing a redirection occurred.</p>

        <h2>Benefits of Going Serverless</h2>
        <p>This deployment strategy provides massive advantages:</p>
        <ul>
          <li><strong>Zero Maintenance:</strong> No servers to patch, secure, or reboot.</li>
          <li><strong>Vastly Better Performance:</strong> Global caching at CloudFront edges yields TTFB (Time to First Byte) of under 20ms.</li>
          <li><strong>Unbeatable Cost:</strong> AWS offers generous Free Tier limits (1TB free data transfer out per month for CloudFront). The total monthly operational cost for this site sits well below $0.50 (consisting entirely of minor Route 53 hosted-zone and DNS query fees).</li>
        </ul>
      </article>
    )
  },
  {
    slug: 'data-driven-systems-engineering',
    title: 'Data-Driven Decisions in Systems Engineering: A Case Study',
    excerpt: 'How systems thinking, requirements analysis, and interactive data visualization help solve complex engineering trade-offs.',
    date: '2026-06-22',
    category: 'Systems Eng',
    tags: ['Systems Engineering', 'Data Visualization', 'Complexity', 'Modeling'],
    contentText: `Data-Driven Decisions in Systems Engineering: A Case Study. Systems Engineering is the discipline of designing and managing complex systems over their life cycles. In modern aerospace, healthcare, and software systems, engineering decisions can no longer rely on intuition or static documents. Complex systems are characterized by emergent behavior, interdependencies, and multi-stakeholder trade-offs that require dynamic, data-driven modeling.
The Challenge: Managing Emergence and Complexity.
When engineering a complex system (such as an autonomous vehicle or a hospital workflow), components interact in non-linear ways. A small change in a subsystem's weight, communication delay, or sensor precision can cause unexpected failure modes at the system level. 
Applying Data-Driven Methodologies:
To handle this complexity, engineers must adopt systems thinking and use data-driven methodologies:
1. Requirements Traceability Matrix: Using relational databases to link stakeholder needs to physical parts, software parameters, and testing criteria.
2. Parametric Trade Studies: Constructing mathematical models that map variables (e.g., cost, weight, latency, efficiency) to evaluate different architectural designs on a pareto front.
3. Node Graph Visualizations: Modeling systems as interconnected network nodes. This visual approach represents dependency mapping, feedback loops, and critical failure paths.
Interactive Demonstration: The Systems Node Graph.
To explore these concepts visually, I built an Interactive Systems Node Graph inside the Playground page. It uses a physics-based, multi-body simulation to model a complex system. Nodes represent sub-systems (such as Power, Sensors, Control, Actuators) and links represent informational and physical flows. Users can add, drag, and connect nodes to observe how forces distribute and how disruptions cascade through the network in real time.
Conclusion:
Systems engineering is moving away from static documents toward living, data-driven digital twins. Interactive visual graphs and quantitative models are crucial tools for modern systems engineers to navigate complexity and make robust decisions.`,
    content: (
      <article className="blog-post-body">
        <p>Systems Engineering is the interdisciplinary branch of engineering that focuses on how to design and manage complex systems over their life cycles. In modern aerospace, supply chains, and software networks, engineering decisions can no longer rely on intuition or isolated static documents. Complex systems are characterized by emergent behavior, subtle feedback loops, and multi-stakeholder trade-offs that demand dynamic, data-driven modeling.</p>

        <h2>The Challenge of System Complexity</h2>
        <p>In complex systems engineering, a "system" is more than the sum of its parts. Individual components interact in non-linear ways, giving rise to <em>emergent behaviors</em>. A minor change in a subsystem's communication latency, thermal output, or power draw can trigger cascading failures across the entire architecture. For example, in an autonomous driving system, a minor camera frame delay can cause a critical breakdown in sensor fusion and brake actuation.</p>

        <h2>Applying Data-Driven Methodologies</h2>
        <p>To navigate system complexity, we must employ structured, quantitative systems thinking. Three methodologies form the foundation of this approach:</p>
        
        <h3>1. Requirements Traceability & Relational Mapping</h3>
        <p>Rather than managing specifications in static word documents, modern systems engineering utilizes relational databases. Every stakeholder requirement is programmatically linked to specific software classes, mechanical components, and validation tests. If a requirement changes, we can instantly trace which files and parts are impacted.</p>

        <h3>2. Parametric Trade Studies & Pareto Frontiers</h3>
        <p>Designing complex systems involves balancing conflicting criteria (e.g., weight vs. battery capacity, cost vs. computational power). By writing parametric models, we can simulate thousands of potential system configurations. Plotting these designs on a <strong>Pareto Frontier</strong> allows engineers to make objective, data-driven selections of optimal design trade-offs.</p>

        <h3>3. Network Topology & Graph Theory</h3>
        <p>A system is, fundamentally, a network. Modeling dependencies, information flows, and physical constraints as a directed graph enables us to apply network science. We can compute metrics like <em>centrality</em> (identifying single points of failure) and simulate <em>cascade dynamics</em> (observing how a localized failure ripples through the network).</p>

        <h2>Interactive Visualization: The Systems Node Graph</h2>
        <p>To explore these principles visually, I engineered an <strong>Interactive Systems Node Graph</strong> simulation in this website's <strong>Playground</strong>. It uses a physics-based, multi-body simulation rendered on an HTML5 Canvas:</p>
        <ul>
          <li><strong>Dynamic Forces:</strong> Nodes represent system modules (e.g., Power, Navigation, Comms, Control) and repel each other using electrostatic force while links act as spring-like constraints.</li>
          <li><strong>Cascading Failures:</strong> Users can trigger a failure in a specific node and watch as the disruption spreads dynamically to dependent subsystems based on connection strengths.</li>
          <li><strong>Real-time Physics:</strong> Supports dragging, adding, and linking nodes to model custom system architectures on the fly.</li>
        </ul>
        <p>By interacting with the simulation, users can intuitively feel how forces distribute and how network topology impacts overall system resilience.</p>

        <h2>Conclusion</h2>
        <p>The future of systems engineering lies in moving away from static paper documents toward living, digital models. Incorporating interactive data visualizations and parametric simulations is vital for designing the next generation of resilient, high-performance systems.</p>
      </article>
    )
  },
  {
    slug: 'future-ai-powered-development',
    title: 'The Future of AI-Powered Development: My Experience with Gemini CLI',
    excerpt: 'Reflecting on the capabilities of autonomous AI agents in software engineering and the paradigm shift from copilot tools to independent agents.',
    date: '2026-06-30',
    category: 'AI & Automation',
    tags: ['AI Agents', 'LLMs', 'Future of Work', 'Software Engineering'],
    contentText: `The Future of AI-Powered Development: My Experience with Gemini CLI. Software engineering is experiencing a major transition. We are moving from tab-completion autocomplete and interactive chat helpers (Copilots) to fully autonomous, context-aware software engineering agents. My experience using Gemini CLI to co-develop and autonomously maintain this personal website has provided firsthand insight into how this paradigm shift will shape the future of coding.
Understanding the Shift: Copilots vs. Agents.
A Copilot is reactive. It waits for you to type code and suggests the next few words, or answers isolated questions in a chat sidebar. The human still coordinates the file creation, handles compilation failures, runs tests, and manages git commits.
An Agent is proactive. Given a high-level task (e.g., "Implement a search filter for the Projects page"), an agent:
- Searches the codebase to understand surrounding styles, dependencies, and imports.
- Formulates an architectural plan.
- Writes or modifies multiple files.
- Executes tests and debugs compilation errors in a self-correcting loop.
- Prepares git commits with accurate commit messages.
How Humans and Agents Collaborate:
The key to successful agent-human collaboration is establishing strong, explicit guidelines. On this project, the GEMINI.md file acts as the "Standard Operating Procedure" for the agent. It specifies the tech stack, preferred styling conventions, routing constraints, and verification mandates. When the agent wakes up, it reads this file and aligns its behavior to match.
Conclusion:
Autonomous agents will not replace developers; they will elevate them. By taking over routine maintenance, test writing, refactoring, and dependency updates, agents free up human developers to focus on high-level architecture, user experience, and strategic product decisions. This personal website is a living testament to that collaborative future.`,
    content: (
      <article className="blog-post-body">
        <p>Software engineering is undergoing its most significant transition since the advent of high-level programming languages. We are moving rapidly past the era of reactive autocomplete suggestions and code-explaining chat sidebars into the age of fully autonomous, context-aware software engineering agents. My experience using Gemini CLI to co-author and autonomously maintain this personal website has provided firsthand insight into this paradigm shift.</p>

        <h2>Understanding the Shift: Copilots vs. Agents</h2>
        <p>To grasp the future of programming, we must distinguish between standard AI helpers and agentic workflows:</p>
        
        <table>
          <thead>
            <tr>
              <th>Feature</th>
              <th>AI Copilots (Reactive)</th>
              <th>AI Agents (Proactive)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Execution Scope</strong></td>
              <td>Single-line completion or single-file chat answers.</td>
              <td>Multi-file refactorings, file creation, and project-wide modifications.</td>
            </tr>
            <tr>
              <td><strong>Workflow</strong></td>
              <td>Human prompts, AI generates, human copies/pastes.</td>
              <td>Human defines goal, AI plans, writes, compiles, and tests.</td>
            </tr>
            <tr>
              <td><strong>Self-Correction</strong></td>
              <td>Human must copy compiler errors back into AI prompt.</td>
              <td>AI runs tests, parses CLI errors, and automatically iterates on its code.</td>
            </tr>
            <tr>
              <td><strong>Context</strong></td>
              <td>Limited to currently active tab or short prompt history.</td>
              <td>Deep repository-wide indexing, respecting project instructions.</td>
            </tr>
          </tbody>
        </table>

        <h2>The Anatomy of Self-Correction</h2>
        <p>The most impressive capability of an engineering agent is its capacity to debug. During the development of this site, I witnessed the Gemini CLI agent make minor syntax errors or run into TS compilation type-mismatches. Rather than giving up or outputting broken code, the agent:</p>
        <ol>
          <li>Read the output of <code>npm run build</code> and identified the exact line of the TypeScript compiler error.</li>
          <li>Analyzed the type definitions in adjacent files to locate the type mismatch.</li>
          <li>Used file replacement tools to refactor the broken interface.</li>
          <li>Re-ran the build to verify the error was resolved.</li>
        </ol>
        <p>This self-correcting loop is a game-changer, transforming AI from a passive assistant into an active, independent debugger.</p>

        <h2>How Humans and Agents Collaborate</h2>
        <p>The key to successful agent-human collaboration is establishing clear, explicit constraints. Just as you onboard a human junior engineer, you must provide the AI agent with a robust "Standard Operating Procedure."</p>
        <p>On this website, the <code>GEMINI.md</code> file acts as the system instructions. It defines our architectural decisions, code styles (such as preferring Vanilla CSS over styling libraries to keep bundles lean), testing frameworks, and safety guidelines. When the agent is invoked, it reads this file first and strictly aligns its output with my project standards.</p>

        <h2>The Future: Human as Architect</h2>
        <p>Autonomous agents will not replace developers; they will elevate them. By taking over routine maintenance, writing unit tests, implementing standard features, and maintaining infrastructure, agents free up human engineers to focus on what matters most: high-level architecture, creative UX design, security modeling, and strategic product innovation. This website is a living, breathing proof-of-concept of that collaborative future.</p>
      </article>
    )
  }
];
