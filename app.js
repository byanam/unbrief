/**
 * UNBRIEF — CLEAN, PRISTINE INTERACTION ENGINE
 * Powers interactive proposal preview, live telemetry streams, pricing toggle, FAQ accordions, and demo modal.
 */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================================================
  // [COMMENT 01]: Enterprise proposal scenarios mapping client inputs to Good/Better/Best scopes
  // ==========================================================================
  const scenarios = {
    dtc: {
      dealTitle: "Proposal #482 — Lumina DTC Rebrand",
      meta: "Client Input: Sarah (Founder, Lumina DTC)",
      rawText: `"Hey guys! We need to redo our entire Shopify store before Black Friday. 
Our CEO wants it to feel like Apple meets Glossier. We also need TikTok videos produced, 
an AI shopping widget, and maybe an affiliate portal? Budget is around $40k-50k. 
Can we get a full proposal by tomorrow morning?"`,
      // [COMMENT 02]: Automated profit leak detector identifying unbilled video production and uncapped revisions
      traps: [
        "Scope Creep Trap: Video production bundled into web build",
        "Timeline Ambiguity: Black Friday freeze window not specified",
        "Technical Debt: Custom AI widget requires unstated API dependencies"
      ],
      proposal: {
        title: "Lumina DTC — Shopify Plus Enterprise Migration & Rebrand",
        meta: "Scoped in 7.4 seconds · Calibrated to Agency Day Rate ($1,250/day)",
        tiers: [
          {
            name: "Core",
            price: "$38,500",
            summary: "Core UX/UI + Custom Shopify Theme (14-day turnaround)",
            active: false
          },
          {
            name: "Recommended",
            price: "$48,000",
            summary: "Custom Storefront + CRO Architecture + VIP Checkout Sprint",
            active: true
          },
          {
            name: "Flagship",
            price: "$64,500",
            summary: "Headless Shopify + AI Recommendation Engine + Creative Suite",
            active: false
          }
        ],
        outOfScope: [
          "TikTok Video Production (Billed as add-on: $7,500 for 12 videos)",
          "Third-party app subscriptions (Klaviyo, Yotpo, Gorgias)",
          "Max 2 revision rounds included per milestone; extra rounds at $165/hr"
        ]
      }
    },
    b2b: {
      dealTitle: "Proposal #483 — Dataview Analytics SaaS",
      meta: "Client Input: David (VP Product, Dataview)",
      rawText: `"Looking to overhaul our core analytics dashboard. Need Figma prototypes 
and production React code. 45 distinct views, role-based access control, export to CSV/PDF, 
and SOC2 compliance audit trails. We need kickoff in 2 weeks. What would this cost?"`,
      traps: [
        "Uncapped Screen Count: 45 views without clear layout hierarchy",
        "Compliance Risk: SOC2 audit trails require backend architecture sign-off",
        "Design vs Dev: Client expects full React integration under a design budget"
      ],
      proposal: {
        title: "Dataview — Enterprise SaaS Design System & React Architecture",
        meta: "Scoped in 8.1 seconds · Calibrated to Engineering Rate Card ($175/hr)",
        tiers: [
          {
            name: "Design System",
            price: "$45,000",
            summary: "Complete Figma Design System + 15 Core Analytics Views",
            active: false
          },
          {
            name: "Recommended",
            price: "$85,000",
            summary: "All 45 Views + Production React/TypeScript Components + Storybook",
            active: true
          },
          {
            name: "Enterprise",
            price: "$118,000",
            summary: "Design System + React Code + SOC2 Compliance Support + Full QA",
            active: false
          }
        ],
        outOfScope: [
          "Legacy SQL database refactoring (available at $185/hr T&M)",
          "Third-party penetration testing vendor fees",
          "Milestone signoff required within 3 business days to maintain 8-week timeline"
        ]
      }
    },
    fintech: {
      dealTitle: "Proposal #484 — PayBridge Growth Retainer",
      meta: "Client Input: Marcus (COO, PayBridge Global)",
      rawText: `"We need ongoing design and dev fire-support. Probably 1 Senior Designer 
and 1 Full-Stack Dev on call. Rapid marketing experiments, landing page testing, 
and in-app onboarding flows. Can we do a fixed monthly retainer with 48h turnaround?"`,
      traps: [
        "Always-On Expectation: 'On-call' wording risks weekend/night demands",
        "Undefined Velocity: No sprint velocity point limits stated",
        "Tech Stack Sprawl: In-app flows require native iOS/Android skills"
      ],
      proposal: {
        title: "PayBridge Global — Agile Growth & Conversion Retainer",
        meta: "Scoped in 6.9 seconds · Calibrated to Pod Day Rate ($2,100/day)",
        tiers: [
          {
            name: "Sprint",
            price: "$9,500 / mo",
            summary: "1 Dedicated Senior Designer (80 hrs/mo) · 3-day turnaround SLA",
            active: false
          },
          {
            name: "Recommended",
            price: "$14,000 / mo",
            summary: "1 Senior Product Designer + 1 Front-End Dev (160 hrs total) · 48h SLA",
            active: true
          },
          {
            name: "Full Pod",
            price: "$22,500 / mo",
            summary: "Full Pod: Lead Strategist + 2 Designers + 2 Devs (320 hrs) · 24h SLA",
            active: false
          }
        ],
        outOfScope: [
          "Unused monthly hours do not roll over (standard agency SLA)",
          "Weekend or off-hours emergency deployments billed at 1.5x surge rate",
          "Native Swift / Kotlin mobile app development"
        ]
      }
    }
  };

  let currentScenarioKey = "dtc";
  let currentMode = "proposal"; // "raw" or "proposal"

  // [COMMENT 03]: Safe DOM null-guards protecting legacy hero preview components
  const workbenchContent = document.getElementById("workbenchContent");
  const scenarioMeta = document.getElementById("scenarioMeta");
  const previewDealTitle = document.getElementById("previewDealTitle");
  const scenarioButtons = document.querySelectorAll(".scenario-pill-btn");
  const modeRawBtn = document.getElementById("modeRaw");
  const modeProposalBtn = document.getElementById("modeProposal");

  if (workbenchContent && scenarioMeta) {
    function renderPreview() {
      const sc = scenarios[currentScenarioKey];
      scenarioMeta.textContent = sc.meta;
      if (previewDealTitle) {
        previewDealTitle.textContent = sc.dealTitle;
      }

      if (currentMode === "raw") {
        workbenchContent.innerHTML = `
          <div class="raw-dump-box">
            <div class="raw-dump-title">Client Raw Ingest // Unstructured Brief</div>
            <p class="raw-dump-quote">${sc.rawText.replace(/\n/g, '<br/>')}</p>
            <div class="risk-alert-box">
              <div class="risk-alert-header">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4M12 17h.01"/></svg>
                <span>Unbrief Risk Scanner: 3 Profit Leaks Detected</span>
              </div>
              ${sc.traps.map(trap => `
                <div class="risk-leak-line">
                  <span style="color: var(--accent-blue); font-weight: bold;">✕</span>
                  <span>${trap}</span>
                </div>
              `).join('')}
            </div>
          </div>
        `;
      } else {
        const p = sc.proposal;
        workbenchContent.innerHTML = `
          <div class="scoped-proposal-box">
            <div>
              <div class="proposal-meta-heading">${p.title}</div>
              <div class="proposal-meta-sub">${p.meta}</div>
            </div>

            <div class="proposal-tiers-row">
              ${p.tiers.map(t => `
                <div class="clean-tier-item ${t.active ? 'active' : ''}">
                  <div class="clean-tier-label">${t.name}</div>
                  <div class="clean-tier-price">${t.price}</div>
                  <div class="clean-tier-desc">${t.summary}</div>
                </div>
              `).join('')}
            </div>

            <div class="clean-boundaries-box">
              <div class="clean-boundaries-header">Contractual Scope Guardrails (Prevents Creep)</div>
              <div class="clean-boundaries-list">
                ${p.outOfScope.map(clause => `
                  <div>• ${clause}</div>
                `).join('')}
              </div>
            </div>
          </div>
        `;
      }
    }

    // Scenario Tab click handlers
    scenarioButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        scenarioButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        currentScenarioKey = btn.getAttribute("data-scenario");
        renderPreview();
      });
    });

    // Mode Switch handlers
    if (modeRawBtn && modeProposalBtn) {
      modeRawBtn.addEventListener("click", () => {
        currentMode = "raw";
        modeRawBtn.classList.add("active");
        modeProposalBtn.classList.remove("active");
        renderPreview();
      });

      modeProposalBtn.addEventListener("click", () => {
        currentMode = "proposal";
        modeProposalBtn.classList.add("active");
        modeRawBtn.classList.remove("active");
        renderPreview();
      });
    }

    // Initial render
    renderPreview();
  }

  // ==========================================================================
  // [COMMENT 04]: High-fidelity terminal payloads simulating raw ingestion and AST brief parsing
  // ==========================================================================
  const stepInspectorData = [
    {
      tag: "STEP 01 // RAW INGEST STREAM",
      code: `// INTAKE: RAW CLIENT EMAIL & AUDIO TRANSCRIPT
const rawPayload = {
  source: "Fireflies.ai / 42-min Zoom Discovery Call",
  client: "Sarah Jenkins (Founder, Lumina DTC)",
  sentiment: "Urgent (BFCM deadline)",
  extractedBudget: "$40,000 - $50,000",
  statedNeeds: [
    "Complete Shopify Plus redesign",
    "TikTok ad creative bundle",
    "AI product recommender"
  ]
};

// RUNNING AMBIGUITY SCAN...
>> Ambiguity Index: 4.8 / 10 (HIGH RISK DETECTED)
>> Missing: Revision round caps, asset delivery dates
>> Flag: Video production bundled without rate specification`
    },
    {
      tag: "STEP 02 // AI SCOPING & PRICING ENGINE",
      code: `// MAPPING AGAINST AGENCY RATE CARD (Day Rate: $1,250)
const pricingEngine = Unbrief.generateArchitecture({
  models: ["Good", "Better", "Best"],
  marginThreshold: 0.58, // 58% Target Gross Margin
  scopeCreepDefense: true
});

>> Generated Tier 1 (Core):        $38,500 [Target: 60% Margin]
>> Generated Tier 2 (Recommended): $48,000 [Target: 64% Margin]
>> Generated Tier 3 (Flagship):    $64,500 [Target: 68% Margin]

// GENERATING SCOPE BOUNDARIES:
- Out of scope: Custom video production ($7,500 bolt-on)
- Revisions: 2 rounds max per sprint; $165/hr thereafter`
    },
    {
      tag: "STEP 03 // CLIENT PRESENTATION & E-SIGN",
      code: `// PACKAGING BESPOKE INTERACTIVE PROPOSAL
const proposalPackage = {
  url: "https://proposals.apexcreative.com/lumina-dtc",
  cname: "proposals.youragency.com",
  analytics: "Real-time client view & scroll tracking enabled",
  eSignProvider: "Unbrief Legally Binding Signatures (Audit Log #89211)",
  clientExperience: "Clean, responsive, zero-AI watermarks"
};

>> Status: READY TO SEND IN 7.8 MINUTES
>> Outcome: First Responder Advantage Activated (74% Close Rate)`
    }
  ];

  const stepCards = document.querySelectorAll(".step-clean-card");
  const inspectorStepTag = document.getElementById("inspectorStepTag");
  const inspectorCode = document.getElementById("inspectorCode");
  const terminalBox = document.querySelector(".terminal-clean-box");

  let terminalStreamTimer = null;

  // [COMMENT 05]: High-velocity chunked typewriter streaming for command line telemetry log
  function streamTerminalCode(fullCode) {
    if (!inspectorCode) return;
    if (terminalStreamTimer) clearTimeout(terminalStreamTimer);

    inspectorCode.textContent = "";
    let charIdx = 0;
    const len = fullCode.length;

    function step() {
      // Fast chunked streaming simulates high-velocity CLI compiler output
      const chunk = Math.min(3, len - charIdx);
      inspectorCode.textContent += fullCode.substr(charIdx, chunk);
      charIdx += chunk;

      if (charIdx < len) {
        terminalStreamTimer = setTimeout(step, 9);
      }
    }

    step();
  }

  // [COMMENT 06]: How It Works tab controller synchronizing step active indicators with code views
  function setStepInspector(stepIndex, stream = false) {
    if (!inspectorStepTag || !inspectorCode) return;
    stepCards.forEach((card, idx) => {
      card.classList.toggle("active", idx === stepIndex);
    });
    const data = stepInspectorData[stepIndex];
    inspectorStepTag.textContent = data.tag;
    if (stream) {
      streamTerminalCode(data.code);
    } else {
      inspectorCode.textContent = data.code;
    }
  }

  stepCards.forEach((card, idx) => {
    card.addEventListener("click", () => {
      setStepInspector(idx, true);
    });
  });

  setStepInspector(0, false);

  // [COMMENT 07]: IntersectionObserver triggering automatic terminal compilation upon viewport entry
  if (terminalBox && ('IntersectionObserver' in window)) {
    const termObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !terminalBox.dataset.hasStreamed) {
          terminalBox.dataset.hasStreamed = "true";
          setStepInspector(0, true);
          termObserver.unobserve(terminalBox);
        }
      });
    }, { threshold: 0.25 });
    termObserver.observe(terminalBox);
  }

  // ==========================================================================
  // [COMMENT 08]: Commercial pricing switcher computing 20% annual discount and 2 months free
  // ==========================================================================
  let isAnnualPricing = true;
  const btnMonthly = document.getElementById("btnMonthly");
  const btnAnnual = document.getElementById("btnAnnual");
  const priceBoutique = document.getElementById("priceBoutique");
  const priceGrowth = document.getElementById("priceGrowth");
  const priceScale = document.getElementById("priceScale");
  const periodBoutique = document.getElementById("periodBoutique");
  const periodGrowth = document.getElementById("periodGrowth");
  const periodScale = document.getElementById("periodScale");

  function updatePricing() {
    if (isAnnualPricing) {
      btnAnnual.classList.add("active");
      btnMonthly.classList.remove("active");

      priceBoutique.textContent = "$39";
      periodBoutique.textContent = "/ month, billed annually";

      priceGrowth.textContent = "$95";
      periodGrowth.textContent = "/ month, billed annually";

      priceScale.textContent = "$199";
      periodScale.textContent = "/ month, billed annually";
    } else {
      btnMonthly.classList.add("active");
      btnAnnual.classList.remove("active");

      priceBoutique.textContent = "$49";
      periodBoutique.textContent = "/ month, billed monthly";

      priceGrowth.textContent = "$119";
      periodGrowth.textContent = "/ month, billed monthly";

      priceScale.textContent = "$249";
      periodScale.textContent = "/ month, billed monthly";
    }
  }

  btnMonthly.addEventListener("click", () => {
    isAnnualPricing = false;
    updatePricing();
  });

  btnAnnual.addEventListener("click", () => {
    isAnnualPricing = true;
    updatePricing();
  });

  // ==========================================================================
  // [COMMENT 09]: Accordion controller managing single-expanded state for FAQ items
  // ==========================================================================
  const faqItems = document.querySelectorAll(".faq-clean-item");

  faqItems.forEach(item => {
    const triggerBtn = item.querySelector(".faq-trigger");
    triggerBtn.addEventListener("click", () => {
      const isOpen = item.classList.contains("active");
      faqItems.forEach(i => i.classList.remove("active"));
      if (!isOpen) {
        item.classList.add("active");
      }
    });
  });

  // ==========================================================================
  // [COMMENT 10]: Operator diagnostic reservation modal managing body scroll locking and ESC key listener
  // ==========================================================================
  const demoModal = document.getElementById("demoModal");
  const closeDemoModalBtn = document.getElementById("closeDemoModal");
  const openDemoBtns = document.querySelectorAll(".open-demo-btn");
  const demoForm = document.getElementById("demoForm");
  const modalFormContainer = document.getElementById("modalFormContainer");
  const modalConfirmedContainer = document.getElementById("modalConfirmedContainer");
  const closeConfirmedBtn = document.getElementById("closeConfirmedBtn");
  const confirmedDetails = document.getElementById("confirmedDetails");

  function openModal() {
    demoModal.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    demoModal.classList.remove("open");
    document.body.style.overflow = "";
    setTimeout(() => {
      modalFormContainer.style.display = "block";
      modalConfirmedContainer.style.display = "none";
    }, 200);
  }

  openDemoBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      openModal();
    });
  });

  closeDemoModalBtn.addEventListener("click", closeModal);
  closeConfirmedBtn.addEventListener("click", closeModal);

  demoModal.addEventListener("click", (e) => {
    if (e.target === demoModal) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && demoModal.classList.contains("open")) {
      closeModal();
    }
  });

  // [COMMENT 11]: Demo submission pipeline simulating confirmation dispatch and Zoom coordinates
  demoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("demoName").value.trim() || "Agency Leader";
    const email = document.getElementById("demoEmail").value.trim() || "your email";
    const slotSelect = document.getElementById("demoSlot");
    const slotText = slotSelect.options[slotSelect.selectedIndex].text;

    const submitBtn = document.getElementById("demoSubmitBtn");
    submitBtn.innerHTML = `<span>Reserving Diagnostic...</span>`;
    submitBtn.style.opacity = "0.7";
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.innerHTML = `<span>Confirm 15-Min Live Diagnostic</span>`;
      submitBtn.style.opacity = "1";
      submitBtn.disabled = false;

      modalFormContainer.style.display = "none";
      modalConfirmedContainer.style.display = "block";
      confirmedDetails.textContent = `Thanks, ${name}! We've reserved your 15-minute live diagnostic for ${slotText}. An invitation with private Zoom coordinates has been sent to ${email}.`;
    }, 400);
  });

  // ==========================================================================
  // [COMMENT 12]: Progressive scroll reveal observer with fallback for disabled JS
  // Strictly excludes the hero section so the hero loads instantly without motion.
  // ==========================================================================
  function initScrollReveal() {
    const revealElements = document.querySelectorAll('.scroll-reveal, .scroll-reveal-scale');
    if (!revealElements.length) return;

    // Enable animation CSS now that JavaScript is confirmed running
    document.documentElement.classList.add('js-reveal-active');

    // [COMMENT 13]: Viewport proximity threshold calibrator (vh * 0.7) preventing premature lower-section reveals
    const vh = window.innerHeight || document.documentElement.clientHeight;
    revealElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top <= vh * 0.7) {
        el.classList.add('is-revealed');
        const counters = el.querySelectorAll('.stat-counter');
        counters.forEach(counter => {
          if (!counter.dataset.animated) {
            counter.dataset.animated = "true";
            animateCounter(counter);
          }
        });
      }
    });

    if (!('IntersectionObserver' in window)) {
      revealElements.forEach(el => el.classList.add('is-revealed'));
      return;
    }

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');

          // Trigger dynamic number count-up for any stat-counter elements within this card
          const counters = entry.target.querySelectorAll('.stat-counter');
          counters.forEach(counter => {
            if (!counter.dataset.animated) {
              counter.dataset.animated = "true";
              animateCounter(counter);
            }
          });

          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.12
    });

    revealElements.forEach(el => {
      if (!el.classList.contains('is-revealed')) {
        revealObserver.observe(el);
      }
    });
  }

  // [COMMENT 14]: Numerical count-up easing function (1 - (1 - progress)^3) for trust KPIs
  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'), 10);
    if (isNaN(target)) return;

    const duration = 1200; // ms
    const startTime = performance.now();

    function update(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Smooth cubic-out easing curve
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(ease * target);
      el.textContent = current;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = target;
      }
    }

    requestAnimationFrame(update);
  }

  // ==========================================================================
  // [COMMENT 15]: Interactive terminal CLI streaming retained for second section (How It Works)
  // All heading typing animations removed across pages per user specifications.
  // ==========================================================================
  initScrollReveal();

  // Footer waitlist & newsletter subscription pipeline
  const refSubForm = document.getElementById("refSubForm");
  if (refSubForm) {
    refSubForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const subBtn = refSubForm.querySelector(".ref-sub-btn span");
      const input = refSubForm.querySelector(".ref-sub-input");
      if (subBtn) subBtn.textContent = "SUBSCRIBED";
      if (input) {
        input.value = "";
        input.placeholder = "Added to waitlist";
        input.disabled = true;
      }
    });
  }

  // ==========================================================================
  // SHADERGRADIENT INTEGRATION (ruucm/shadergradient)
  // Real-time 3D simplex noise displaced WebGL gradient mesh
  // ==========================================================================
  initShaderGradient();

  function initShaderGradient() {
    const canvas = document.getElementById("shadergradientCanvas");
    if (!canvas || typeof THREE === "undefined") return;

    const wrapper = canvas.parentElement;
    if (!wrapper) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      wrapper.clientWidth / wrapper.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 5.5);

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(wrapper.clientWidth, wrapper.clientHeight);
    } catch (err) {
      console.warn("WebGL not supported, falling back to CSS gradient:", err);
      return;
    }

    // Exact noise & vertex deformation algorithms from ruucm/shadergradient
    const vertexShader = `
      vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
      vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
      vec3 fade(vec3 t) { return t*t*t*(t*(t*6.0-15.0)+10.0); }

      float cnoise(vec3 P) {
        vec3 Pi0 = floor(P);
        vec3 Pi1 = Pi0 + vec3(1.0);
        Pi0 = mod289(Pi0);
        Pi1 = mod289(Pi1);
        vec3 Pf0 = fract(P);
        vec3 Pf1 = Pf0 - vec3(1.0);
        vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
        vec4 iy = vec4(Pi0.yy, Pi1.yy);
        vec4 iz0 = Pi0.zzzz;
        vec4 iz1 = Pi1.zzzz;

        vec4 ixy = permute(permute(ix) + iy);
        vec4 ixy0 = permute(ixy + iz0);
        vec4 ixy1 = permute(ixy + iz1);

        vec4 gx0 = ixy0 * (1.0 / 7.0);
        vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;
        gx0 = fract(gx0);
        vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
        vec4 sz0 = step(gz0, vec4(0.0));
        gx0 -= sz0 * (step(0.0, gx0) - 0.5);
        gy0 -= sz0 * (step(0.0, gy0) - 0.5);

        vec4 gx1 = ixy1 * (1.0 / 7.0);
        vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;
        gx1 = fract(gx1);
        vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
        vec4 sz1 = step(gz1, vec4(0.0));
        gx1 -= sz1 * (step(0.0, gx1) - 0.5);
        gy1 -= sz1 * (step(0.0, gy1) - 0.5);

        vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
        vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
        vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
        vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
        vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
        vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
        vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
        vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);

        vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
        g000 *= norm0.x;
        g010 *= norm0.y;
        g100 *= norm0.z;
        g110 *= norm0.w;
        vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
        g001 *= norm1.x;
        g011 *= norm1.y;
        g101 *= norm1.z;
        g111 *= norm1.w;

        float n000 = dot(g000, Pf0);
        float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
        float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
        float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
        float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
        float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
        float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
        float n111 = dot(g111, Pf1);

        vec3 fade_xyz = fade(Pf0);
        vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
        vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
        float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x); 
        return 2.2 * n_xyz;
      }

      uniform float uTime;
      uniform float uSpeed;
      uniform float uNoiseDensity;
      uniform float uNoiseStrength;

      varying vec3 vPos;
      varying vec2 vUv;

      void main() {
        vUv = uv;
        float t = uTime * uSpeed;
        vec3 noisePos = 0.45 * position * uNoiseDensity;
        float distortion = 0.75 * cnoise(noisePos + t);
        vec3 pos = position + normal * distortion * uNoiseStrength;
        vPos = pos;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `;

    const fragmentShader = `
      uniform vec3 uColor1;
      uniform vec3 uColor2;
      uniform vec3 uColor3;

      varying vec3 vPos;
      varying vec2 vUv;

      void main() {
        // Multi-axis chromatic blend (ruucm/shadergradient specification)
        float blendX = smoothstep(-4.5, 4.5, vPos.x);
        vec3 c12 = mix(uColor1, uColor2, blendX);

        // Smooth vertical transition so bottom stays pristine dark obsidian
        float blendY = smoothstep(-2.0, 3.5, vPos.y);
        vec3 finalColor = mix(uColor3, c12, blendY);

        gl_FragColor = vec4(finalColor, 1.0);
      }
    `;

    const uniforms = {
      uTime: { value: 0 },
      uSpeed: { value: 0.28 },
      uNoiseDensity: { value: 1.15 },
      uNoiseStrength: { value: 1.9 },
      uColor1: { value: new THREE.Color("#1d4ed8") }, // Website royal blue
      uColor2: { value: new THREE.Color("#17007D") }, // Deep midnight navy (Figma reference)
      uColor3: { value: new THREE.Color("#000000") }, // Pure obsidian black
    };

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      wireframe: false,
      transparent: true,
    });

    const geometry = new THREE.PlaneGeometry(16, 12, 120, 120);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.x = -0.45;
    mesh.rotation.z = -0.15;
    mesh.position.y = 0.4;
    scene.add(mesh);

    let isVisible = true;
    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      }, { threshold: 0.05 });
      observer.observe(wrapper);
    }

    const clock = new THREE.Clock();
    let animationFrameId;

    function animate() {
      animationFrameId = requestAnimationFrame(animate);
      if (!isVisible) return;
      const elapsedTime = clock.getElapsedTime();
      uniforms.uTime.value = elapsedTime;
      renderer.render(scene, camera);
    }
    animate();

    function onResize() {
      if (!wrapper || !renderer) return;
      const w = wrapper.clientWidth;
      const h = wrapper.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }
    window.addEventListener("resize", onResize, { passive: true });
  }

});

