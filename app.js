/**
 * UNBRIEF STUDIO ENGINE — AWWWARDS RUNTIME INTERACTIONS
 * Drives interactive scoping artifact, telemetry streams, commercial tier switcher, studio case file accordions, and demo modal.
 */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================================================
  // 1. SCOPING ARTIFACT DATA & ENGINE
  // ==========================================================================
  const scenarios = {
    dtc: {
      title: "Shopify Plus Rebrand ($48,000)",
      meta: "CLIENT TRANSMISSION: Sarah (Founder, Lumina DTC)",
      rawText: `"Hey guys! We need to redo our entire Shopify store before Black Friday. 
Our CEO wants it to feel like Apple meets Glossier. We also need TikTok videos produced, 
an AI shopping widget, and maybe an affiliate portal? Budget is around $40k-50k. 
Can we get a full proposal by tomorrow morning?"`,
      traps: [
        "Scope Creep Trap: Video production bundled into web build",
        "Timeline Ambiguity: Black Friday freeze window not specified",
        "Technical Debt: Custom AI widget requires unstated API dependencies"
      ],
      proposal: {
        title: "LUMINA DTC // SHOPIFY PLUS ENTERPRISE MIGRATION & REBRAND",
        meta: "Scoped in 7.4 seconds · Calibrated to Agency Day Rate ($1,250/day)",
        status: "APPROVED FOR SIGNATURE",
        tiers: [
          {
            name: "TIER 01 / CORE",
            price: "$38,500",
            summary: "Core UX/UI + Custom Shopify Theme (14-day turnaround)",
            popular: false
          },
          {
            name: "TIER 02 / RECOMMENDED",
            price: "$48,000",
            summary: "Custom Storefront + CRO Architecture + VIP Checkout Sprint",
            popular: true
          },
          {
            name: "TIER 03 / FLAGSHIP",
            price: "$64,500",
            summary: "Headless Shopify + AI Recommendation Engine + Creative Suite",
            popular: false
          }
        ],
        outOfScope: [
          "TikTok Video Production (Add-on: $7,500 for 12 videos)",
          "Third-party app subscriptions (Klaviyo, Yotpo, Gorgias)",
          "Max 2 revision rounds included per milestone; extra rounds billed at $165/hr"
        ]
      }
    },
    b2b: {
      title: "B2B SaaS Web App Revamp ($85,000)",
      meta: "CLIENT TRANSMISSION: David (VP Product, Dataview Analytics)",
      rawText: `"Looking to overhaul our core analytics dashboard. Need Figma prototypes 
and production React code. 45 distinct views, role-based access control, export to CSV/PDF, 
and SOC2 compliance audit trails. We need kickoff in 2 weeks. What would this cost?"`,
      traps: [
        "Uncapped Screen Count: 45 views without clear layout hierarchy",
        "Compliance Risk: SOC2 audit trails require backend architecture sign-off",
        "Design vs Dev: Client expects full React integration under a design budget"
      ],
      proposal: {
        title: "DATAVIEW // ENTERPRISE SAAS DESIGN SYSTEM & REACT CODE",
        meta: "Scoped in 8.1 seconds · Calibrated to Engineering Rate Card ($175/hr)",
        status: "SCOPED & MARGIN PROTECTED",
        tiers: [
          {
            name: "TIER 01 / PROTOTYPE",
            price: "$45,000",
            summary: "Complete Figma Design System + 15 Core Analytics Views",
            popular: false
          },
          {
            name: "TIER 02 / RECOMMENDED",
            price: "$85,000",
            summary: "All 45 Views + Production React/TypeScript Components + Storybook",
            popular: true
          },
          {
            name: "TIER 03 / ENTERPRISE",
            price: "$118,000",
            summary: "Design System + React Code + SOC2 Compliance Audit Support + QA",
            popular: false
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
      title: "Fintech Growth Retainer ($14,000/mo)",
      meta: "CLIENT TRANSMISSION: Marcus (COO, PayBridge Global)",
      rawText: `"We need ongoing design and dev fire-support. Probably 1 Senior Designer 
and 1 Full-Stack Dev on call. Rapid marketing experiments, landing page testing, 
and in-app onboarding flows. Can we do a fixed monthly retainer with 48h turnaround?"`,
      traps: [
        "Always-On Expectation: 'On-call' wording risks weekend/night demands",
        "Undefined Velocity: No sprint velocity point limits stated",
        "Tech Stack Sprawl: In-app flows require native iOS/Android skills"
      ],
      proposal: {
        title: "PAYBRIDGE GLOBAL // AGILE GROWTH & RETENTION DESIGN RETAINER",
        meta: "Scoped in 6.9 seconds · Calibrated to Pod Day Rate ($2,100/day)",
        status: "MARGIN LOCKED RETAINER",
        tiers: [
          {
            name: "TIER 01 / SPRINT",
            price: "$9,500 / mo",
            summary: "1 Dedicated Senior Designer (80 hrs/mo) · 3-day turnaround SLA",
            popular: false
          },
          {
            name: "TIER 02 / RECOMMENDED",
            price: "$14,000 / mo",
            summary: "1 Senior Product Designer + 1 Front-End Dev (160 hrs total) · 48h SLA",
            popular: true
          },
          {
            name: "TIER 03 / POD",
            price: "$22,500 / mo",
            summary: "Full Pod: Lead Strategist + 2 Designers + 2 Devs (320 hrs) · 24h SLA",
            popular: false
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

  const workbenchContent = document.getElementById("workbenchContent");
  const scenarioMeta = document.getElementById("scenarioMeta");
  const scenarioButtons = document.querySelectorAll(".scenario-btn");
  const modeRawBtn = document.getElementById("modeRaw");
  const modeProposalBtn = document.getElementById("modeProposal");

  function renderArtifact() {
    const sc = scenarios[currentScenarioKey];
    scenarioMeta.textContent = sc.meta;

    if (currentMode === "raw") {
      workbenchContent.innerHTML = `
        <div class="raw-intake-sheet">
          <div style="font-size: 0.65rem; color: var(--text-muted); margin-bottom: 0.75rem; text-transform: uppercase;">
            INCOMING UNSTRUCTURED TRANSMISSION // RAW BRIEF
          </div>
          <p class="raw-client-quote font-mono">${sc.rawText.replace(/\n/g, '<br/>')}</p>
          <div class="risk-scanner-box">
            <div class="risk-scanner-header">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4M12 17h.01"/></svg>
              <span>Unbrief AI Risk Scanner: 3 Profit Leaks Detected</span>
            </div>
            ${sc.traps.map(trap => `
              <div class="risk-leak-item">
                <span style="color: var(--accent-red); font-weight: bold;">✕</span>
                <span>${trap}</span>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    } else {
      const p = sc.proposal;
      workbenchContent.innerHTML = `
        <div class="proposal-artifact-sheet">
          <div class="artifact-header-row">
            <div>
              <div class="artifact-deal-title">${p.title}</div>
              <div class="artifact-deal-sub">${p.meta}</div>
            </div>
            <span class="deal-status-seal">${p.status}</span>
          </div>

          <div class="architecture-tier-grid">
            ${p.tiers.map(t => `
              <div class="arch-tier-card ${t.popular ? 'recommended' : ''}">
                <div class="arch-tier-label">${t.name}</div>
                <div class="arch-tier-price">${t.price}</div>
                <div class="arch-tier-detail">${t.summary}</div>
              </div>
            `).join('')}
          </div>

          <div class="boundaries-card">
            <div class="boundaries-header">Contractual Scope Guardrails (Prevents Creep)</div>
            <div class="boundaries-list">
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
      renderArtifact();
    });
  });

  // Mode Switch handlers
  modeRawBtn.addEventListener("click", () => {
    currentMode = "raw";
    modeRawBtn.classList.add("active");
    modeProposalBtn.classList.remove("active");
    renderArtifact();
  });

  modeProposalBtn.addEventListener("click", () => {
    currentMode = "proposal";
    modeProposalBtn.classList.add("active");
    modeRawBtn.classList.remove("active");
    renderArtifact();
  });

  // Initial render of artifact
  renderArtifact();

  // ==========================================================================
  // 2. HOW IT WORKS INTERACTIVE STEP TELEMETRY
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

  const protocolCards = document.querySelectorAll(".protocol-step-card");
  const inspectorStepTag = document.getElementById("inspectorStepTag");
  const inspectorCode = document.getElementById("inspectorCode");

  function setStepInspector(stepIndex) {
    protocolCards.forEach((card, idx) => {
      card.classList.toggle("active", idx === stepIndex);
    });
    const data = stepInspectorData[stepIndex];
    inspectorStepTag.textContent = data.tag;
    inspectorCode.textContent = data.code;
  }

  protocolCards.forEach((card, idx) => {
    card.addEventListener("click", () => {
      setStepInspector(idx);
    });
  });

  setStepInspector(0);

  // ==========================================================================
  // 3. PRICING MONTHLY / ANNUAL SWITCH
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
  // 4. FAQ ACCORDION INTERACTION (STUDIO CASE FILES)
  // ==========================================================================
  const faqBoxes = document.querySelectorAll(".faq-accordion-box");

  faqBoxes.forEach(box => {
    const triggerBtn = box.querySelector(".faq-toggle-trigger");
    triggerBtn.addEventListener("click", () => {
      const isOpen = box.classList.contains("active");
      faqBoxes.forEach(b => b.classList.remove("active"));
      if (!isOpen) {
        box.classList.add("active");
      }
    });
  });

  // ==========================================================================
  // 5. 15-MINUTE OPERATOR DEMO MODAL
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
    }, 250);
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
      confirmedDetails.textContent = `Thanks, ${name}! We've reserved your 15-minute live diagnostic for ${slotText}. An invitation with private Zoom coordinates has been dispatched to ${email}.`;
    }, 450);
  });

});
