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
  // NEAT GRADIENT INITIALIZATION (@firecms/neat)
  // ==========================================================================
  const gradientCanvas = document.getElementById("gradient");
  if (gradientCanvas && typeof neat !== "undefined" && neat.NeatGradient) {
    // Disable watermark render and click listeners
    neat.NeatGradient.prototype._renderWatermark = function () {};
    neat.NeatGradient.prototype._initWatermark = function () {};

    const config = {
      colors: [
        { color: '#000000', enabled: true },
        { color: '#000000', enabled: true },
        { color: '#000000', enabled: true },
        { color: '#5D5AFF', enabled: true },
        { color: '#1D2CC8', enabled: true },
        { color: '#A8E6CF', enabled: false },
      ],
      speed: 2.5,
      horizontalPressure: 4,
      verticalPressure: 3,
      waveFrequencyX: 0,
      waveFrequencyY: 0,
      waveAmplitude: 0,
      secondaryWaveEnabled: false,
      secondaryWaveFrequencyX: 3,
      secondaryWaveFrequencyY: 3,
      secondaryWaveAmplitude: 5,
      secondaryWaveSpeed: 0.6,
      secondaryWaveAngle: 1,
      shadows: 2,
      highlights: 7,
      colorBrightness: 1,
      colorSaturation: 8,
      wireframe: false,
      antialias: false,
      colorBlending: 5,
      backgroundColor: '#FF0000',
      backgroundAlpha: 1,
      grainScale: 0,
      grainSparsity: 0,
      grainIntensity: 0,
      grainSpeed: 0,
      resolution: 0.5,
      yOffset: 50,
      yOffsetWaveMultiplier: 1.5,
      yOffsetColorMultiplier: 1.8,
      yOffsetFlowMultiplier: 2,
      flowDistortionA: 0.4,
      flowDistortionB: 3,
      flowScale: 3.3,
      flowEase: 0.53,
      flowEnabled: false,
      enableProceduralTexture: false,
      transparentTextureVoid: false,
      textureMode: 'bitmap',
      bakeEdgeSoftness: 1,
      textureVoidLikelihood: 0.06,
      textureVoidWidthMin: 10,
      textureVoidWidthMax: 500,
      textureBandDensity: 0.8,
      textureColorBlending: 0.06,
      textureSeed: 333,
      textureEase: 0.75,
      proceduralBackgroundColor: '#003FFF',
      textureShapeTriangles: 20,
      textureShapeCircles: 15,
      textureShapeBars: 15,
      textureShapeSquiggles: 10,
      domainWarpEnabled: false,
      domainWarpIntensity: 0,
      domainWarpScale: 3,
      vignetteIntensity: 0,
      vignetteRadius: 0.8,
      fresnelEnabled: false,
      fresnelPower: 2,
      fresnelIntensity: 0.5,
      fresnelColor: '#FFFFFF',
      iridescenceEnabled: false,
      iridescenceIntensity: 0.5,
      iridescenceSpeed: 1,
      prismEdgeEnabled: false,
      prismEdgeIntensity: 0.5,
      prismEdgeThinness: 3,
      prismEdgeSpread: 1,
      prismEdgeSpeed: 0.5,
      prismEdgeRipple: 1,
      bloomIntensity: 0,
      bloomThreshold: 0.7,
      chromaticAberration: 0,
      shapeType: 'plane',
      shapeRotationX: 0,
      shapeRotationY: 0,
      shapeRotationZ: 0,
      shapeAutoRotateSpeedX: 0,
      shapeAutoRotateSpeedY: 0,
      sphereRadius: 15,
      torusRadius: 15,
      torusTube: 5,
      cylinderRadius: 10,
      cylinderHeight: 40,
      planeBend: 0,
      planeTwist: 0,
      silhouetteFade: 0.25,
      cylinderFade: 0.08,
      ribbonFade: 0.05,
      flatShading: true,
      cameraLock: true,
      cameraX: 0,
      cameraY: 0,
      cameraZ: 0,
      cameraRotationX: 0,
      cameraRotationY: 0,
      cameraRotationZ: 0,
      cameraZoom: 1,
    };

    const gradient = new neat.NeatGradient({
      ref: gradientCanvas,
      ...config
    });

    // React to scroll
    window.addEventListener("scroll", () => {
      gradient.yOffset = window.scrollY;
    }, { passive: true });
  }

  // ==========================================================================
  // [COMMENT 16]: Clean scroll-synced comparison controller
  // Synchronizes the center hairline pip and active editorial row states with viewport scroll.
  // Zero glow, zero colored telemetry, smooth performance.
  // ==========================================================================
  function initComparisonFlightdeck() {
    const compSection = document.getElementById('comparison');
    const syncStage = document.getElementById('compSyncStage');
    const dividerPip = document.getElementById('dividerScrollPip');
    const rows = document.querySelectorAll('.comp-pair-row');

    if (!compSection || !syncStage || !rows.length) return;

    let activeIndex = 0;
    let isTicking = false;

    function updateComparisonSync() {
      const stageRect = syncStage.getBoundingClientRect();
      const viewportMid = window.innerHeight * 0.5;

      // Calculate progress of scroll through comparison stage (0% to 100%)
      const stageHeight = stageRect.height;
      if (stageHeight > 0) {
        const currentPos = viewportMid - stageRect.top;
        const progress = Math.max(0, Math.min(1, currentPos / stageHeight));
        if (dividerPip) {
          dividerPip.style.top = `${progress * 100}%`;
        }
      }

      // Find the pair row closest to viewport center
      let closestIndex = 0;
      let minDistance = Infinity;

      rows.forEach((row, idx) => {
        const rowRect = row.getBoundingClientRect();
        const rowCenter = rowRect.top + (rowRect.height * 0.5);
        const dist = Math.abs(rowCenter - viewportMid);

        if (dist < minDistance) {
          minDistance = dist;
          closestIndex = idx;
        }
      });

      if (closestIndex !== activeIndex) {
        activeIndex = closestIndex;
        rows.forEach((row, idx) => {
          if (idx === activeIndex) {
            row.classList.add('is-active');
          } else {
            row.classList.remove('is-active');
          }
        });
      }

      isTicking = false;
    }

    window.addEventListener('scroll', () => {
      if (!isTicking) {
        requestAnimationFrame(updateComparisonSync);
        isTicking = true;
      }
    }, { passive: true });

    // Initial check on load
    updateComparisonSync();
  }

  initComparisonFlightdeck();

});

