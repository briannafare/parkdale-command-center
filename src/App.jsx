import React, { useState, useEffect, useMemo, useCallback } from "react";

// ─── TOOL DEFINITIONS ───
const TOOLS = {
  manual: { name: "Manual / Phone", color: "#6B7B8D", icon: "📞", link: null },
  perplexity: { name: "Perplexity Computer", color: "#4A90D9", icon: "🔍", link: "https://perplexity.ai" },
  claude: { name: "Claude", color: "#D4855A", icon: "🧠", link: "https://claude.ai" },
  claudeCode: { name: "Claude Code", color: "#7C6DC7", icon: "💻", link: "https://claude.ai/code" },
  manus: { name: "Manus", color: "#E8894A", icon: "🤖", link: "https://manus.im" },
  n8n: { name: "n8n", color: "#D4A853", icon: "⚡", link: "https://brilindley.app.n8n.cloud" },
  ghl: { name: "GoHighLevel", color: "#4A90D9", icon: "📊", link: "https://app.gohighlevel.com" },
  customGpt: { name: "Custom GPTs", color: "#D4A020", icon: "🗣️", link: "https://chat.openai.com" },
  claudeSkills: { name: "Claude Skills", color: "#9B7FCC", icon: "📄", link: "https://claude.ai" },
  instantly: { name: "Instantly", color: "#5BA4CF", icon: "✉️", link: "https://instantly.ai" },
  maketai: { name: "Maket.ai", color: "#C77986", icon: "🏗️", link: "https://maket.ai" },
  foyrneo: { name: "Foyr Neo", color: "#CC8A7E", icon: "🎨", link: "https://foyr.com" },
  vercel: { name: "Vercel", color: "#4A5568", icon: "▲", link: "https://vercel.com" },
  indiegogo: { name: "Indiegogo", color: "#C75B5B", icon: "🚀", link: "https://indiegogo.com" },
  heygen: { name: "HeyGen", color: "#7B8AD4", icon: "🎬", link: "https://heygen.com" },
  elevenlabs: { name: "ElevenLabs", color: "#5DB89E", icon: "🔊", link: "https://elevenlabs.io" },
};

// ─── TASK DEFINITIONS ───
const TASKS = [
  // ── PHASE 1: Pre-Launch Foundation (Weeks 1-3) ──
  {
    id: "p1-01", phase: 1, title: "STR Permit Verification",
    description: "Call Hood River County Community Development at (541) 387-6840. Verify STR permit availability, current cap status (50 permits in unincorporated areas), 180-day residency requirement, occupancy formula (2/bedroom + 2), and any pending regulatory changes.",
    tools: ["manual"],
    dependencies: [],
    critical: true,
    usedFor: "Proves the property CAN legally operate as an STR — the #1 campaign-killer if unresolved. Permit data validates tier structure pricing (P1-04), kills the biggest backer objection in campaign copy (P1-05), and becomes a credibility anchor in the pitch deck (P2-01).",
    appliedTo: [
      { task: "p1-04", how: "Permit cap & occupancy data directly inform max guest capacity per tier and validate the whole STR business model" },
      { task: "p1-05", how: "FAQ section uses permit confirmation to pre-handle 'what if you can't get a permit?' objection" },
      { task: "p2-01", how: "Pitch deck includes regulatory clearance as a de-risking element for $10K+ prospects" }
    ],
    dataIn: [],
    dataOut: [
      { label: "Permit status confirmation", format: "Notes / verbal", dest: ["p1-04"] },
      { label: "Cap data & compliance reqs", format: "Notes document", dest: ["p1-04", "p1-05"] }
    ],
    prompt: `PHONE CALL SCRIPT — Hood River County Community Development\n\nHi, my name is Brianna Lindley. I own a property in the Parkdale area — unincorporated Hood River County — and I am exploring the process for obtaining a short-term rental permit.\n\nI have a few specific questions:\n\n1. PERMIT AVAILABILITY: How many STR permits have been issued out of the 50-permit cap for unincorporated areas? Are permits currently available?\n\n2. RESIDENCY REQUIREMENT: Can you confirm the 180-day residency requirement? Does the property need to be my primary residence, or does any owner occupancy within 180 days qualify?\n\n3. OCCUPANCY FORMULA: I understand the formula is 2 persons per bedroom plus 2. For a 5-bedroom property, that would be 12 guests max — is that correct?\n\n4. PENDING CHANGES: Are there any pending ordinance changes, moratoriums, or county commission discussions that could affect STR permits in unincorporated areas?\n\n5. APPLICATION TIMELINE: What is the typical processing time from application to permit issuance?\n\n6. TAX OBLIGATIONS: Can you confirm the Hood River County transient lodging tax rate (8%) and point me to the Oregon state TLT (1.5%) filing process?\n\nCould you also email me any relevant application forms or documentation? My email is [YOUR EMAIL].\n\nThank you for your time.\n\nOBJECTIVE: Get definitive yes/no on permit availability, confirm all compliance requirements, and document everything so it can be cited in campaign materials as verified regulatory clearance.`,
    subtasks: ["Call (541) 387-6840", "Ask about current permit cap fill rate", "Confirm 180-day residency rule", "Ask about pending STR regulation changes", "Get occupancy formula confirmation", "Document everything in Google Doc"]
  },
  {
    id: "p1-02", phase: 1, title: "Competitive Intelligence Sweep",
    description: "Research every luxury retreat/boutique hotel crowdfunding campaign on Indiegogo & Kickstarter from the last 3 years. Extract: funding goal, amount raised, backers, avg pledge, tier structure, duration, rewards vs equity model.",
    tools: ["perplexity"],
    dependencies: [],
    critical: false,
    usedFor: "Sets your tier pricing against real market data so you're not guessing. Competitor tier patterns feed directly into V3 tier design (P1-04), success/failure analysis informs campaign narrative positioning (P1-05), and the full dataset is reviewed during the Model Council stress-test (P2-07).",
    appliedTo: [
      { task: "p1-04", how: "Competitor tier structures and avg pledge amounts set guardrails for your own tier pricing — what worked and what flopped" },
      { task: "p1-05", how: "Campaign copy differentiates against competitor positioning — what makes Parkdale better than campaigns that came before" },
      { task: "p2-07", how: "Raw data included in the stress-test package so Model Council can validate your tiers against the competitive landscape" }
    ],
    dataIn: [],
    dataOut: [
      { label: "Competitor campaign spreadsheet", format: "CSV / Google Sheet", dest: ["p1-04", "p2-07"] },
      { label: "Success pattern analysis", format: "Report document", dest: ["p1-04", "p1-05"] }
    ],
    prompt: "Research every luxury retreat or boutique hotel crowdfunding campaign on Indiegogo and Kickstarter from the last 3 years. For each, compile: funding goal, amount raised, number of backers, average pledge amount, tier structure, campaign duration, and whether they used rewards-based or equity model. Deliver as a structured spreadsheet with a summary analysis of what the most successful campaigns had in common.",
    subtasks: []
  },
  {
    id: "p1-03", phase: 1, title: "Market Validation Package",
    description: "Comprehensive market analysis for luxury STR properties in Hood River Valley / Parkdale. Nightly rates, occupancy by season, competing luxury properties within 30mi, RevPAR, tourism growth trends for Gorge + Mt Hood corridor.",
    tools: ["perplexity"],
    dependencies: [],
    critical: false,
    usedFor: "The hard numbers that justify your $1,000+/night luxury positioning to every backer. Feeds tier pricing validation (P1-04), gives the campaign page concrete market claims (P1-05), anchors the pitch deck's market opportunity slide (P2-01), and becomes the baseline for ongoing monitoring during the live campaign (P3-05).",
    appliedTo: [
      { task: "p1-04", how: "Comparable nightly rates and occupancy data validate that tier reward values (stays at $X/night) are based on real market pricing, not inflated" },
      { task: "p1-05", how: "Campaign copy cites tourism growth, Gorge/Mt Hood corridor demand, and RevPAR to build the 'why this location' business case" },
      { task: "p2-01", how: "Pitch deck market opportunity section uses this data for charts showing growth trends, comparable rates, and revenue potential" },
      { task: "p3-05", how: "Becomes the baseline against which weekly competitive pricing scans are compared — are rates holding, rising, or shifting?" }
    ],
    dataIn: [],
    dataOut: [
      { label: "Market analysis report", format: "Report + data tables", dest: ["p1-04", "p1-05", "p2-01"] },
      { label: "Comparable property rates", format: "Spreadsheet", dest: ["p1-04"] }
    ],
    prompt: "Create a comprehensive market analysis for luxury short-term rental properties in the Hood River Valley / Parkdale, Oregon area. Include: current average nightly rates for luxury properties (5+ bedrooms), occupancy rates by season, competing luxury properties within 30 miles, average revenue per available room, tourism growth trends for the Columbia River Gorge and Mt. Hood corridor, and any regulatory changes affecting STR permits in Hood River County in the past 2 years. Include data sources and dates for all figures.",
    subtasks: []
  },
  {
    id: "p1-04", phase: 1, title: "Finalize V3 Tier Structure",
    description: "Rebuild tier ladder anchored in $1,500-$10,000 core range with clear value-exceeds-contribution. Legacy/patron tiers at $25K-$50K with multi-year recurring benefits. Drop $100K-$250K unless specific prospect exists.",
    tools: ["claude"],
    dependencies: ["p1-01", "p1-02", "p1-03"],
    critical: true,
    usedFor: "The backbone of everything backer-facing. This tier structure flows into every piece of content and tool that touches a backer: campaign page copy (P1-05), landing page tier cards (P1-07), pitch deck (P2-01), the Copywriter GPT knowledge base (P2-03), every email sequence (P2-04), and the AI concierge bot (P2-06).",
    appliedTo: [
      { task: "p1-05", how: "Tier descriptions become the core of campaign page — each tier needs copy that sells the experience" },
      { task: "p1-07", how: "Landing page tier preview cards show pricing, value, and availability from this structure" },
      { task: "p2-01", how: "Pitch deck tier comparison table and value proposition slides come directly from this" },
      { task: "p2-03", how: "Campaign Copywriter GPT is pre-loaded with tier details so every generated post references accurate pricing" },
      { task: "p2-04", how: "Email sequences are tier-segmented ($1.5K-$5K, $5K-$10K, $25K+) based on this structure" },
      { task: "p2-06", how: "AI concierge recommends tiers to backers based on budget, group size, and travel style using this data" }
    ],
    dataIn: [
      { label: "Permit confirmation", from: "p1-01", format: "Notes" },
      { label: "Competitor tier data", from: "p1-02", format: "Spreadsheet" },
      { label: "Market rate data", from: "p1-03", format: "Report" }
    ],
    dataOut: [
      { label: "V3 tier ladder document", format: ".docx / Markdown", dest: ["p1-05", "p1-07", "p2-01", "p2-03", "p2-04", "p2-06"] }
    ],
    prompt: `CLAUDE PROMPT — V3 Tier Structure Design\n\nContext: I am building a rewards-based crowdfunding campaign on Indiegogo for a luxury retreat renovation in Parkdale, Oregon. The property is a 3,500 sq ft home with 5 bedrooms (each with en-suite bath), gourmet chef kitchen, planned pool and hot tub. Stretch goal adds 3-4 hillside bedrooms.\n\nPricing basis: $1,000+/night for full-property buyouts, $300+/night per room. This is a luxury property in the Hood River Valley between Hood River and Mt. Hood.\n\nV2 PROBLEM: Ultra-high tiers ($50K-$250K) delivered tangible value far below backer contribution — functioning as philanthropy, not value-for-value crowdfunding. This kills credibility if those tiers sit empty.\n\nHere is my competitive intelligence data: [PASTE P1-02 COMPETITOR SPREADSHEET]\nHere is my market validation data: [PASTE P1-03 MARKET REPORT]\nHere is my permit/compliance info: [PASTE P1-01 NOTES]\n\nDesign a V3 tier structure with these constraints:\n\n1. CORE TIERS ($1,500-$10,000): 4-6 tiers where retail value of stays + experiences CLEARLY exceeds the contribution price. Backers should feel like they are getting a deal, not donating. Show the math for each tier.\n\n2. LEGACY/PATRON TIERS ($25,000-$50,000): 1-2 tiers max, justified by MULTI-YEAR recurring benefits (annual stays, lifetime discount, naming rights, Founders Dinner Series) — not one-time stays. Be transparent that these include a patronage premium.\n\n3. DROP $100K-$250K TIERS entirely unless I tell you there is a specific known prospect.\n\n4. Every tier should bundle curated local experiences (wine tours, rafting, guided hikes) as BONUSES, not individually priced add-ons.\n\n5. Use DATE-BATCHED FULFILLMENT — pre-scheduled windows, not open-ended date selection that creates coordination nightmares.\n\n6. Target 25-60 total backers, not hundreds of small pledges.\n\nFor each tier, provide: Tier name, Price, What they get (stays, experiences, perks), Retail value calculation, Number of slots available, Fulfillment window.\n\nOBJECTIVE: A tier ladder where every level passes the smell test — backers look at it and think 'this is a great deal' at the core tiers, and 'this is worth it for the long-term relationship' at the legacy tiers.`,
    subtasks: ["Review V2 gaps (ultra-high tier value problem)", "Map competitor tier patterns from intel sweep", "Set core tiers ($1,500-$10,000) with retail value analysis", "Design legacy/patron tiers ($25K-$50K)", "Value test every tier: does what they get justify what they pay?", "Document final structure"]
  },
  {
    id: "p1-05", phase: 1, title: "Write Campaign Narrative & Page Copy",
    description: "Full campaign page content: hero story, vision narrative, 'Why Parkdale' emotional hook, tier descriptions that sell experiences, FAQ section, and all backer-facing copy. Voice-clone from Bri's existing writing.",
    tools: ["claude"],
    dependencies: ["p1-04"],
    critical: true,
    usedFor: "Every backer-facing word. This copy appears on the pre-launch landing page (P1-07), becomes the pitch deck narrative (P2-01), trains the Campaign Copywriter GPT so all generated content matches your voice (P2-03), sets the tone for every email sequence (P2-04), and loads into the AI concierge as its knowledge base (P2-06).",
    appliedTo: [
      { task: "p1-07", how: "Hero section, tier preview text, FAQ, and social proof sections pull directly from this copy" },
      { task: "p2-01", how: "Pitch deck narrative slides use the vision story and 'Why Parkdale' hook" },
      { task: "p2-03", how: "Voice profile extracted here becomes the Copywriter GPT personality — every generated piece sounds like you" },
      { task: "p2-04", how: "Email sequences mirror the campaign page voice and messaging hierarchy" },
      { task: "p2-06", how: "AI concierge system prompt is built from this copy — it speaks as the campaign" },
      { task: "p2-08", how: "Episodic content series inherit the narrative arc and voice established here" }
    ],
    dataIn: [
      { label: "V3 tier structure", from: "p1-04", format: "Document" },
      { label: "Market validation data", from: "p1-03", format: "Report" },
      { label: "Permit/compliance info", from: "p1-01", format: "Notes" }
    ],
    dataOut: [
      { label: "Campaign page copy", format: "Markdown / Google Doc", dest: ["p1-07", "p2-01", "p2-03", "p2-06"] },
      { label: "FAQ content", format: "Markdown", dest: ["p1-07", "p2-06"] },
      { label: "Voice profile", format: "Claude memory / document", dest: ["p2-03", "p2-04"] }
    ],
    prompt: `CLAUDE PROMPT — Campaign Narrative & Full Page Copy\n\nStep 1 — VOICE CLONING: I am going to paste 3-5 pieces of my best writing below. Analyze my voice: sentence structure, vocabulary level, tone, humor style, how I open and close, recurring patterns. Extract a voice profile document I can reuse.\n\n[PASTE YOUR BEST WRITING SAMPLES HERE]\n\nStep 2 — Write the full Indiegogo campaign page in my voice. Use these sections:\n\nA. HERO SECTION: Opening hook that makes someone stop scrolling. What is this? Why should they care? What is the emotional promise?\n\nB. THE VISION: What does this property become? Paint the picture — 5 bedrooms each with en-suite, gourmet chef kitchen, pool, hot tub, nestled between Hood River and Mt. Hood. Make them feel it.\n\nC. WHY PARKDALE: The location story. Columbia River Gorge, Mt. Hood, wine country, rafting, hiking — but frame it as why THIS specific spot is special, not a tourism brochure. Use data from the market validation report: [PASTE P1-03 KEY STATS]\n\nD. THE EXPERIENCE: What does a stay actually look like? Walk them through arrival to departure. Curated local experiences — wine tours, guided hikes, river rafting. Make it visceral.\n\nE. TIER DESCRIPTIONS: For each tier from the V3 structure [PASTE P1-04 TIERS], write copy that sells the EXPERIENCE, not a bullet list of amenities. Each tier description should make the reader think 'I want that.'\n\nF. WHY CROWDFUNDING: Why this model? What does their pledge make possible that would not happen otherwise? Be honest — this is not charity, it is early access to something exceptional.\n\nG. ABOUT THE TEAM: Credibility section. Who are you, why should they trust you, what is your track record.\n\nH. FULFILLMENT TIMELINE: When does construction happen, when do backers get their stays, how does date-batched fulfillment work.\n\nI. FAQ SECTION: Write 15-20 FAQs that pre-handle every objection. Use permit data from P1-01: [PASTE PERMIT NOTES]. Address: permit risk, construction overruns, when stays happen, refund policy, property management, what happens if campaign does not fully fund.\n\nJ. SOCIAL PROOF / TRUST: Testimonials placeholder section, local business partnerships, any existing validation.\n\nOBJECTIVE: Complete, publish-ready campaign page copy that sounds like me, sells the experience, pre-handles objections, and makes someone want to back this at the highest tier they can afford.`,
    subtasks: ["Collect 3-5 pieces of Bri's best writing for voice cloning", "Extract voice profile", "Write hero story / vision narrative", "Write 'Why Parkdale' emotional section", "Write tier descriptions (experience-first, not amenity lists)", "Write FAQ section (objection pre-handling)", "Write social proof / trust section"]
  },
  {
    id: "p1-06", phase: 1, title: "Build Prospect Lists",
    description: "Research publicly visible individuals in luxury hospitality investment, campaign creators who raised $100K+, and Pacific NW travel influencers. Build CRM-ready contact spreadsheet from public signals only.",
    tools: ["manus"],
    dependencies: [],
    critical: false,
    usedFor: "Your outreach targets for the entire campaign. These CSVs get imported into Instantly via n8n for 4 separate cold outreach campaigns (P2-05) targeting investors, influencers, campaign creators, and local business partners. Refreshed mid-campaign (P3-07) to keep the pipeline flowing.",
    appliedTo: [
      { task: "p2-05", how: "CSVs are imported into Instantly via n8n — each segment becomes its own campaign with tailored sequences" },
      { task: "p3-07", how: "Initial lists serve as the baseline; Manus runs again mid-campaign to find fresh prospects and dedupes against these" }
    ],
    dataIn: [],
    dataOut: [
      { label: "Investor prospect list", format: "CSV with names, profiles, focus areas", dest: ["p2-05"] },
      { label: "Creator/influencer prospect list", format: "CSV with platform, followers, contact", dest: ["p2-05"] }
    ],
    prompt: "Research publicly visible individuals in the luxury hospitality investment space. Focus on: angel investors and syndicate members who've funded boutique hotels or luxury STR projects, hospitality VCs with Pacific Northwest focus, real estate investors who publicly discuss STR portfolios. Also find 50 travel bloggers, Instagram influencers, and YouTube creators who focus on PNW luxury travel, Oregon wine country, Mt. Hood, or boutique hotel reviews. Compile into CRM-ready spreadsheets.",
    subtasks: []
  },
  {
    id: "p1-07", phase: 1, title: "Build Pre-Launch Landing Page",
    description: "React + Tailwind landing page: email capture (webhook to n8n), countdown timer, property renders/photos, tier preview with pricing, social proof section. Deploy to Vercel on custom domain.",
    tools: ["claudeCode", "vercel"],
    dependencies: ["p1-05", "p1-04"],
    critical: false,
    usedFor: "Your pre-launch email capture machine. Every form submission hits an n8n webhook that creates a tagged GHL contact (P1-08), feeding the nurture sequence (P1-09) that warms these people into primed, day-one backers when the campaign goes live (P3-02).",
    appliedTo: [
      { task: "p1-08", how: "Form submissions send JSON payloads (name, email, source) to n8n webhook for CRM ingestion" },
      { task: "p1-09", how: "Contacts captured here become the pre-launch audience that receives the nurture drip and launch-day email" }
    ],
    dataIn: [
      { label: "Campaign copy", from: "p1-05", format: "Markdown" },
      { label: "V3 tier structure", from: "p1-04", format: "Document" },
      { label: "Property renders", from: "p1-11", format: "PNG/JPG files" }
    ],
    dataOut: [
      { label: "Deployed landing page URL", format: "URL", dest: ["p1-08"] },
      { label: "Webhook endpoint for form", format: "URL (n8n)", dest: ["p1-08"] }
    ],
    prompt: `CLAUDE CODE PROMPT — Pre-Launch Landing Page\n\nBuild a pre-launch landing page for a luxury retreat crowdfunding campaign. Tech stack: Vite + React + TypeScript + Tailwind CSS. Deploy to Vercel.\n\nDESIGN DIRECTION: Luxury, editorial feel. Dark/moody hero with property renders, clean typography, generous whitespace. NOT a generic crowdfunding template — this should feel like a high-end hospitality brand.\n\nSECTIONS:\n1. HERO: Full-bleed property render background, campaign title, one-line hook, countdown timer to launch date, email capture CTA\n2. PROPERTY GALLERY: Grid/carousel of 3D renders (exterior, interior, amenities) — images will be provided as static assets\n3. TIER PREVIEW: 3-4 cards showing tier names, price points, and key benefits (not full descriptions). 'Be the first to know' framing\n4. WHY PARKDALE: Brief location pitch with key stats (tourism growth, comparable rates)\n5. EMAIL CAPTURE: Form at bottom — name, email. Sends POST to n8n webhook URL: [WEBHOOK_URL]. Payload: {name, email, source: 'landing-page', timestamp}\n6. FOOTER: Social links, contact email\n\nTECHNICAL REQUIREMENTS:\n- Responsive (mobile-first)\n- Countdown timer counts down to [LAUNCH_DATE]\n- Form validates email before submission\n- Success state after form submit (no page reload)\n- SEO meta tags for social sharing\n- Fast load time — optimize images, lazy load below fold\n\nDeploy to Vercel when complete. Provide the deployment URL.\n\nOBJECTIVE: A polished landing page that captures emails from high-intent prospects before the campaign goes live, and looks premium enough to justify $1,000+/night positioning.`,
    subtasks: ["Set up Vite + React + Tailwind project", "Build hero section with countdown", "Build property gallery section", "Build tier preview cards", "Build email capture form with webhook", "Build social proof section", "Deploy to Vercel", "Set up custom domain"]
  },
  {
    id: "p1-08", phase: 1, title: "Set Up Lead Capture to GHL Sync",
    description: "n8n workflow: Webhook receives form submission from landing page, creates/updates contact in GHL, adds to Google Sheet backup, tags by source, triggers nurture sequence.",
    tools: ["n8n", "ghl"],
    dependencies: ["p1-07"],
    critical: false,
    usedFor: "The plumbing that connects your landing page to your CRM. Every form submission becomes a tagged GHL contact entering the pre-launch nurture sequence (P1-09). This same workflow pattern scales to handle backer comms during the live campaign (P3-01).",
    appliedTo: [
      { task: "p1-09", how: "Tagged contacts auto-enter the nurture sequence — welcome email fires immediately, then timed drip begins" },
      { task: "p3-01", how: "This workflow becomes the template for the full backer communication orchestrator activated at launch" }
    ],
    dataIn: [
      { label: "Form submission webhook", from: "p1-07", format: "JSON payload (name, email, source)" }
    ],
    dataOut: [
      { label: "GHL contacts (tagged)", format: "CRM records", dest: ["p1-09"] },
      { label: "Lead backup sheet", format: "Google Sheet rows", dest: [] }
    ],
    prompt: `N8N WORKFLOW DESIGN — Lead Capture to GHL Sync\n\nBuild this workflow in n8n at brilindley.app.n8n.cloud:\n\nTRIGGER: Webhook node\n- Method: POST\n- Path: /parkdale-lead-capture\n- Expected payload: { name: string, email: string, source: string, timestamp: string }\n\nNODE 2: GHL Create/Update Contact\n- API: GoHighLevel contacts endpoint\n- Match on email (update if exists, create if new)\n- Set fields: firstName, email, source, tags: ['Pre-Launch Interest', source value]\n- Add to pipeline: 'Parkdale Pre-Launch'\n\nNODE 3: Google Sheets Append\n- Sheet: 'Parkdale Lead Backup' in Google Drive\n- Columns: Name, Email, Source, Timestamp, GHL Contact ID\n- Purpose: Backup in case GHL has issues\n\nNODE 4: IF condition — check source value\n- If source = 'landing-page' → trigger GHL pre-launch nurture sequence\n- If source = 'referral' → tag with referrer info and trigger referral sequence\n- Default → trigger general welcome sequence\n\nERROR HANDLING: Add error branch that sends Slack notification if any node fails.\n\nTEST: After building, test with 3 sample payloads (landing-page, referral, direct) and verify contacts appear correctly in GHL with proper tags and pipeline stage.\n\nOBJECTIVE: Every form submission from the landing page automatically creates a tagged, pipeline-assigned contact in GHL and triggers the appropriate nurture sequence — zero manual work.`,
    subtasks: ["Create n8n webhook node", "Add GHL create/update contact node", "Add Google Sheets append node", "Add source tagging logic", "Add trigger to GHL nurture sequence", "Test end-to-end with landing page form"]
  },
  {
    id: "p1-09", phase: 1, title: "Build Pre-Launch Nurture Sequence",
    description: "GHL automated email sequence: Welcome email then Meet the Property (2 days) then Early Bird Advantage tier preview (5 days) then Launch day WE'RE LIVE with campaign link.",
    tools: ["ghl"],
    dependencies: ["p1-08"],
    critical: false,
    usedFor: "Warms cold signups into primed backers. This pre-launch audience is the first to get the launch notification on day one (P3-02) — your highest-conversion segment because they've already been nurtured through 3 emails building anticipation.",
    appliedTo: [
      { task: "p3-02", how: "The warmed segment from this sequence receives launch notification immediately, driving day-one pledge velocity" }
    ],
    dataIn: [
      { label: "Tagged contacts", from: "p1-08", format: "GHL CRM pipeline" }
    ],
    dataOut: [
      { label: "Warmed pre-launch audience", format: "GHL segment", dest: ["p3-02"] }
    ],
    prompt: `GHL WORKFLOW DESIGN — Pre-Launch Nurture Sequence\n\nBuild in GoHighLevel Workflows:\n\nTRIGGER: Contact enters 'Parkdale Pre-Launch' pipeline, stage: 'New Lead'\n\nEMAIL 1 — IMMEDIATE: Welcome / You Are In\n- Subject: You are on the list — here is what is coming\n- Content: Thank them for early interest, tease what the property will be (brief), tell them they will get first access when the campaign launches, set expectation for next email in 2 days\n- Move to stage: 'Welcomed'\n\nWAIT: 2 days\n\nEMAIL 2 — Meet the Property\n- Subject: [A/B test 2 subject lines]\n- Content: Property story — 5 bedrooms, chef kitchen, pool, Mt. Hood views. Include 2-3 render images. Focus on the EXPERIENCE of being there. End with 'in 3 days I will show you how to lock in your stay at founder pricing'\n- Move to stage: 'Property Introduced'\n\nWAIT: 3 days\n\nEMAIL 3 — Early Bird Advantage\n- Subject: [A/B test 2 subject lines]\n- Content: Preview tier structure — show 2-3 tiers with pricing and what they get. Emphasize limited availability and founder-only pricing. Create anticipation for launch day. End with exact launch date and time.\n- Move to stage: 'Tier Previewed'\n\nWAIT: Until launch day (use date-based trigger)\n\nEMAIL 4 — WE ARE LIVE\n- Subject: The campaign is live — your early access starts now\n- Content: Direct link to Indiegogo campaign page. Remind them of the tier they previewed. Create urgency — early tiers are limited. Clear single CTA button to campaign page.\n- Move to stage: 'Launch Notified'\n\nFor ALL emails: Use voice profile from P1-05, include unsubscribe, track opens/clicks.\n\nOBJECTIVE: Warm cold email signups into primed, day-one backers through a 4-email sequence that builds anticipation and desire, so when the campaign goes live, this segment converts immediately.`,
    subtasks: ["Create Pre-Launch Interest pipeline in GHL", "Write welcome email", "Write Meet the Property email", "Write Early Bird Advantage email", "Write launch day email", "Set up automation triggers and delays", "Test full sequence"]
  },
  {
    id: "p1-10", phase: 1, title: "Resolve Rendering Tool Selection",
    description: "Evaluate Maket.ai vs Foyr Neo for converting existing architectural PDFs to 3D renders. Test both with a sample from the plan set. Criteria: accuracy of PDF-to-3D conversion, render quality, turnaround time, cost.",
    tools: ["maketai", "foyrneo"],
    dependencies: [],
    critical: false,
    usedFor: "Gates the entire visual pipeline. Whichever tool wins this evaluation produces every 3D render for the campaign (P1-11) — the images on your landing page, in your pitch deck, on the Indiegogo page, and across all social content.",
    appliedTo: [
      { task: "p1-11", how: "Selected tool is used for the full render production pipeline — all exterior, interior, and amenity renders" }
    ],
    dataIn: [
      { label: "Architectural PDF plan set", format: "PDF (elevations, floor plans, kitchen, foundation, etc.)" }
    ],
    dataOut: [
      { label: "Selected rendering tool", format: "Decision document", dest: ["p1-11"] },
      { label: "Test renders", format: "PNG/JPG", dest: ["p1-11"] }
    ],
    prompt: `RENDERING TOOL EVALUATION — Maket.ai vs Foyr Neo\n\nOBJECTIVE: Determine which tool produces the best 3D renders from your existing architectural PDF plan set for use in the crowdfunding campaign.\n\nTEST PROTOCOL:\n\n1. SELECT TEST FILE: Pick one page from your architectural PDF set — ideally the main floor plan or a front elevation that has the most detail.\n\n2. MAKET.AI TEST:\n- Upload the test PDF to Maket.ai\n- Attempt to generate: one exterior 3D render, one interior room render\n- Note: upload process ease, conversion accuracy (does the 3D model match your plans?), render quality at output, time from upload to final render, cost per render\n\n3. FOYR NEO TEST:\n- Upload the same test PDF to Foyr Neo\n- Generate the same two renders (exterior + interior)\n- Note the same criteria: ease, accuracy, quality, time, cost\n\n4. EVALUATION MATRIX — Score each 1-5:\n| Criteria | Maket.ai | Foyr Neo |\n|----------|----------|----------|\n| PDF-to-3D conversion accuracy | | |\n| Render photorealism quality | | |\n| Ease of use / learning curve | | |\n| Time to final render | | |\n| Cost per render | | |\n| Ability to customize materials/lighting | | |\n| Export resolution options | | |\n\n5. DECISION: Select the tool with the highest total score. Document your rationale. If scores are close, weight render quality and accuracy highest — these images need to make backers feel the property.\n\nDELIVERABLE: Decision document with test renders attached, evaluation matrix, and selected tool with rationale.`,
    subtasks: ["Upload sample PDF to Maket.ai — test conversion", "Upload sample PDF to Foyr Neo — test conversion", "Compare: accuracy, render quality, speed, cost", "Document decision with rationale", "Select primary tool"]
  },
  {
    id: "p1-11", phase: 1, title: "Generate Campaign Visual Renders",
    description: "Produce full set of 3D renders from architectural PDFs: exterior views (multiple angles), interior room-by-room, kitchen detail, pool/hot tub area, deck views, hillside expansion concept. Optimize for campaign page and pitch deck.",
    tools: ["maketai"],
    dependencies: ["p1-10"],
    critical: false,
    usedFor: "The images that make backers feel the property before it exists. Exterior and interior renders go on the pre-launch landing page gallery (P1-07), throughout the pitch deck (P2-01), into the AI concierge visual library (P2-06), and across all social/email content during the entire campaign.",
    appliedTo: [
      { task: "p1-07", how: "Property gallery section on landing page showcases exterior angles, interior rooms, and amenity renders" },
      { task: "p2-01", how: "Pitch deck uses renders for the property vision slides — backers need to see what they're buying into" },
      { task: "p2-06", how: "AI concierge can reference and describe renders when backers ask about specific rooms, amenities, or views" }
    ],
    dataIn: [
      { label: "Full architectural PDF set", format: "PDF" },
      { label: "Selected rendering tool", from: "p1-10", format: "Decision" }
    ],
    dataOut: [
      { label: "Exterior render set", format: "PNG/JPG (high-res)", dest: ["p1-07", "p2-01", "p2-06"] },
      { label: "Interior render set", format: "PNG/JPG (high-res)", dest: ["p1-07", "p2-01"] },
      { label: "Amenity renders (pool, kitchen, deck)", format: "PNG/JPG", dest: ["p1-07", "p2-01"] }
    ],
    prompt: `RENDERING PRODUCTION — Full Campaign Visual Set\n\nUsing the tool selected in P1-10, produce the following renders from the architectural PDF plan set. For each render, aim for photorealistic quality with warm, inviting lighting that says 'luxury retreat.'\n\nEXTERIOR RENDERS (4 minimum):\n1. Front approach view — the 'hero shot' showing the full property as you would see it arriving\n2. Rear/deck view — showing outdoor living space, pool area, mountain backdrop\n3. Side angle showing the property nestled into the landscape\n4. Aerial/bird's eye view showing the full property footprint and surrounding forest\n\nINTERIOR RENDERS (7 minimum):\n5. Main living area — open concept, natural light, mountain views through windows\n6. Master bedroom with en-suite bath — luxury feel\n7. Second bedroom — show variety in room design\n8. Gourmet chef kitchen — the showpiece, detailed with high-end finishes\n9. Kitchen detail shot — island/counter workspace closeup\n10. Common bathroom — en-suite detail\n11. Open concept dining/gathering space\n\nAMENITY RENDERS (3 minimum):\n12. Pool and hot tub area — outdoor luxury, mountain backdrop\n13. Deck/outdoor entertaining space\n14. Hillside expansion concept — stretch goal visual showing 3-4 additional bedrooms built into the forested hillside\n\nEXPORT SPECIFICATIONS:\n- Web-optimized: 1920x1080px, compressed for fast page load\n- Print/pitch-quality: 3840x2160px minimum, uncompressed\n- Format: PNG with transparency where useful, JPG for hero shots\n\nOBJECTIVE: A complete visual library that lets backers tour the property before it exists. These images are the emotional engine of the entire campaign — they appear on the landing page, pitch deck, campaign page, and all marketing materials.`,
    subtasks: ["Process floor plans through selected tool", "Generate exterior renders (4+ angles)", "Generate interior room renders (5 bedrooms + common areas)", "Generate kitchen detail renders", "Generate pool/hot tub area renders", "Generate deck and outdoor space renders", "Generate hillside expansion concept render (stretch goal visual)", "Export all at web-optimized + print-quality resolutions"]
  },
  // ── PHASE 2: Campaign Preparation (Weeks 3-5) ──
  {
    id: "p2-01", phase: 2, title: "Create Pitch Deck for Anchor Backers",
    description: "Professional .pptx deck for private outreach to $10K+ prospects. Includes: vision, market opportunity, property renders, tier structure, team credibility, fulfillment timeline, FAQ.",
    tools: ["claudeSkills"],
    dependencies: ["p1-04", "p1-05", "p1-11", "p1-03"],
    critical: true,
    usedFor: "Your weapon for private high-dollar outreach. Gets attached to investor cold emails in Instantly (P2-05), customized per prospect in the Anchor Backer Close workflow, and included in the Model Council stress-test (P2-07) to validate it convinces before it ships.",
    appliedTo: [
      { task: "p2-05", how: "Investor outreach campaign in Instantly includes a PDF link to this deck — centerpiece of the pitch" },
      { task: "p2-07", how: "Full deck included in stress-test package so Model Council evaluates whether it is persuasive enough for $10K+ asks" }
    ],
    dataIn: [
      { label: "V3 tier structure", from: "p1-04", format: "Document" },
      { label: "Campaign narrative", from: "p1-05", format: "Copy" },
      { label: "3D renders", from: "p1-11", format: "PNG/JPG" },
      { label: "Market validation data", from: "p1-03", format: "Report" }
    ],
    dataOut: [{ label: "Pitch deck (.pptx)", format: ".pptx file", dest: ["p2-05", "p2-07"] }],
    prompt: `CLAUDE SKILLS PROMPT — Anchor Backer Pitch Deck (.pptx)\n\nCreate a professional pitch deck (.pptx) for private outreach to potential $10K+ backers in the Parkdale luxury retreat crowdfunding campaign.\n\nSLIDE STRUCTURE:\n\n1. TITLE SLIDE: 'Parkdale Retreat — Founders Opportunity' / luxury aesthetic\n2. THE VISION: What this property becomes — one powerful image + 3 sentences\n3. THE PROPERTY: Floor plan overview, key specs (3,500 sq ft, 5 BR/5 BA, chef kitchen, pool, hot tub)\n4. LOCATION STORY: Why Parkdale / Hood River Valley — Columbia Gorge, Mt. Hood, wine country, outdoor recreation\n5. MARKET OPPORTUNITY: Chart showing luxury STR market growth, comparable nightly rates, tourism trends [USE P1-03 DATA]\n6. REVENUE POTENTIAL: Projected revenue at $1,000+/night, occupancy scenarios, comparable property performance\n7. THE EXPERIENCE: What a stay looks like — curated wine tours, guided hikes, river rafting, chef dinners\n8. FOUNDERS TIER STRUCTURE: Table showing all tiers with pricing, what backers get, and retail value [USE P1-04 TIERS]\n9. YOUR TIER RECOMMENDATION: Highlight the $7,500-$10,000 sweet spot with clear value-exceeds-price math\n10. FULFILLMENT TIMELINE: Construction phases, when backers get their stays, date-batched scheduling\n11. WHY CROWDFUNDING: What their pledge makes possible, why this model vs traditional financing\n12. REGULATORY CLEARANCE: STR permit status confirmed, compliance details [USE P1-01 DATA]\n13. ABOUT US: Team credibility, background, why we will deliver\n14. THE ASK: Clear CTA — 'Join as a Founding Backer' with tier options and next steps\n15. CONTACT: Direct contact info for follow-up conversation\n\nInsert property renders from P1-11 throughout. Use market data charts from P1-03. Keep text minimal on slides — this deck supports a conversation, it does not replace one.\n\nOBJECTIVE: A deck compelling enough that someone reading it without you in the room would still consider pledging $10K+.`,
    subtasks: ["Outline deck structure (12-15 slides)", "Write slide copy", "Insert property renders", "Add market data charts", "Add tier comparison table", "Add fulfillment timeline", "Review and polish"]
  },
  {
    id: "p2-02", phase: 2, title: "Backer Objection War Room",
    description: "Identify top 20 reasons someone would NOT back this campaign. Build counter-argument matrix. Convert each counter into FAQ copy, campaign page content, or video pitch talking points.",
    tools: ["claude"],
    dependencies: ["p1-04", "p1-05"],
    critical: false,
    usedFor: "Pre-kills backer hesitation before it costs you pledges. Counter-arguments strengthen the AI concierge FAQ handling (P2-06), add objection-defusing content to email sequences (P2-04), and become your video pitch talking points for personal outreach.",
    appliedTo: [
      { task: "p2-04", how: "Email sequences weave in objection-handling — e.g., worried about delays? here is our plan..." },
      { task: "p2-06", how: "AI concierge uses the counter-argument matrix to answer tough backer questions convincingly in real-time" }
    ],
    dataIn: [
      { label: "V3 tier structure", from: "p1-04", format: "Document" },
      { label: "Campaign copy", from: "p1-05", format: "Document" }
    ],
    dataOut: [
      { label: "Objection counter-matrix", format: "Spreadsheet / document", dest: ["p2-06", "p2-04"] },
      { label: "Video pitch talking points", format: "Document", dest: [] }
    ],
    prompt: `CLAUDE PROMPT — Backer Objection War Room\n\nI need you to play devil's advocate against my crowdfunding campaign. You are a skeptical potential backer with $10,000 to spend and 100 other things you could do with it.\n\nHere is my campaign: [PASTE CAMPAIGN PAGE COPY FROM P1-05]\nHere is my tier structure: [PASTE V3 TIERS FROM P1-04]\nHere is my permit status: [PASTE P1-01 NOTES]\n\nStep 1: Generate the top 20 reasons someone would NOT back this campaign. Think like a skeptic — financial risk, trust issues, timing concerns, value questions, competitive alternatives, regulatory risk, personal objections. Be brutally honest.\n\nStep 2: For each objection, write a counter-argument that would actually satisfy a skeptic (not a hand-wave). Back it with specific data, evidence, or structural decisions we have made.\n\nStep 3: Categorize each objection + counter into one of three buckets:\n- FAQ: Goes on the campaign page FAQ section\n- PAGE COPY: Should be woven into the main campaign narrative\n- VIDEO TALKING POINT: Best addressed verbally in the pitch video\n\nStep 4: For the top 5 most dangerous objections (the ones most likely to kill a pledge), write the exact copy that would appear on the campaign page to pre-handle them.\n\nOBJECTIVE: A complete objection-counter matrix that eliminates every reason someone would hesitate to back this campaign. No backer should encounter a concern that we have not already addressed.`,
    subtasks: ["Brainstorm 20 objections", "Write counter-argument for each", "Categorize: FAQ, page copy, or video talking point", "Integrate FAQ items into campaign copy", "Prepare video script notes"]
  },
  {
    id: "p2-03", phase: 2, title: "Build Campaign Copywriter GPT",
    description: "Custom GPT pre-loaded with voice profile, campaign narrative, property details, tier structure, and backer personas. For rapid social posts, email subjects, ad copy, captions — all on-brand without re-explaining context.",
    tools: ["customGpt"],
    dependencies: ["p1-05", "p1-04"],
    critical: false,
    usedFor: "Your content factory during the live campaign. Powers the rapid daily social content generation machine (P3-04) — tier spotlights, local experience features, milestone celebrations, caption ideas — all on-brand without re-briefing context every single time.",
    appliedTo: [
      { task: "p3-04", how: "This GPT is the engine behind daily social content — prompt it with 'tier spotlight for $5K tier' and it outputs on-brand copy instantly" }
    ],
    dataIn: [
      { label: "Voice profile", from: "p1-05", format: "Document" },
      { label: "Campaign narrative & copy", from: "p1-05", format: "Documents" },
      { label: "Tier structure", from: "p1-04", format: "Document" }
    ],
    dataOut: [{ label: "Configured Custom GPT", format: "ChatGPT GPT URL", dest: ["p3-04"] }],
    prompt: `CUSTOM GPT SYSTEM PROMPT — Parkdale Campaign Copywriter\n\nCreate a Custom GPT in ChatGPT with this configuration:\n\nNAME: Parkdale Campaign Copywriter\n\nDESCRIPTION: Generates on-brand social posts, email subject lines, ad copy, captions, and campaign content for the Parkdale luxury retreat crowdfunding campaign.\n\nSYSTEM PROMPT:\n---\nYou are the copywriter for a luxury retreat crowdfunding campaign in Parkdale, Oregon. You write in the voice of the campaign founder — [PASTE VOICE PROFILE FROM P1-05].\n\nKey facts you always know:\n- Property: 3,500 sq ft, 5 BR/5 BA, gourmet chef kitchen, pool, hot tub, between Hood River and Mt. Hood\n- Campaign platform: Indiegogo\n- Tiers: [PASTE V3 TIER SUMMARY FROM P1-04]\n- Location highlights: Columbia River Gorge, Mt. Hood, wine country, world-class outdoor recreation\n- Positioning: Luxury ($1,000+/night), experiential, exclusive access\n\nRules:\n- Never sound like a generic crowdfunding template\n- Always sell the EXPERIENCE, not the amenities\n- Use scarcity and exclusivity naturally (limited tiers, founding access)\n- Keep social posts under 280 characters unless asked otherwise\n- Email subject lines: 6-10 words, curiosity-driven, no clickbait\n- Ad copy: hook in first line, benefit in second, CTA in third\n- Never use: 'exciting opportunity', 'dream getaway', 'once in a lifetime', or any cliche\n---\n\nKNOWLEDGE FILES TO UPLOAD:\n1. Voice profile document (from P1-05)\n2. Campaign page copy (from P1-05)\n3. V3 tier structure (from P1-04)\n4. Backer persona descriptions\n\nTEST PROMPTS (run all 10 to validate):\n1. 'Write a tier spotlight post for the $5,000 tier'\n2. 'Write 5 email subject lines for launch day'\n3. 'Write an Instagram caption for a property render photo'\n4. 'Write a Facebook ad for the $1,500 tier targeting Pacific NW travelers'\n5. 'Write a tweet announcing we hit 50% of our funding goal'\n6. 'Write a campaign update about construction starting'\n7. 'Write a DM response to someone asking about the $25K tier'\n8. 'Write 3 LinkedIn post variants about the campaign for my personal profile'\n9. 'Write a caption for a photo of the Hood River valley'\n10. 'Write a scarcity post — only 3 slots left at the $7,500 tier'\n\nOBJECTIVE: A GPT that produces on-brand campaign content instantly without needing to re-explain context every time. Test output should sound like you, not like ChatGPT.`,
    subtasks: ["Create GPT in ChatGPT", "Upload voice profile as knowledge", "Upload campaign copy and tier docs", "Write system prompt with brand guidelines", "Add backer persona descriptions", "Test with 10 sample content requests", "Refine system prompt based on outputs"]
  },
  {
    id: "p2-04", phase: 2, title: "Write All Email Sequences",
    description: "Complete email sequence set: Pre-launch warm-up (4 emails), Launch day (2 emails), Mid-campaign momentum (weekly), Final 48-hour urgency (3 emails). Tier-segmented variants for $1.5K-$5K, $5K-$10K, and $25K+ segments.",
    tools: ["claude"],
    dependencies: ["p1-04", "p1-05"],
    critical: true,
    usedFor: "The automated conversion engine across every phase. Pre-launch emails load into the GHL nurture sequence (P1-09), outreach sequences go into Instantly campaigns (P2-05), mid-campaign emails fire through GHL on launch (P3-02), and the final-push urgency emails power the scarcity close (P4-01, P4-02).",
    appliedTo: [
      { task: "p1-09", how: "Pre-launch warm-up sequence (4 emails) loads directly into GHL automation" },
      { task: "p2-05", how: "Cold outreach email variants load into 4 separate Instantly campaigns" },
      { task: "p3-02", how: "Launch-day and mid-campaign sequences activate when GHL nurture goes live" },
      { task: "p4-02", how: "Final 48-hour urgency sequence loads into GHL for the scarcity close" }
    ],
    dataIn: [
      { label: "V3 tier structure", from: "p1-04", format: "Document" },
      { label: "Campaign narrative & voice", from: "p1-05", format: "Documents" },
      { label: "Objection counters", from: "p2-02", format: "Matrix" }
    ],
    dataOut: [
      { label: "Pre-launch email sequence", format: "Copy docs (4 emails)", dest: ["p1-09"] },
      { label: "Launch + mid-campaign sequences", format: "Copy docs", dest: ["p2-05", "p3-02"] },
      { label: "Final push sequence", format: "Copy docs (3 emails)", dest: ["p4-01", "p4-02"] }
    ],
    prompt: `CLAUDE PROMPT — Complete Email Sequence Package\n\nWrite every email for the Parkdale crowdfunding campaign across all phases. Use my voice profile: [PASTE VOICE PROFILE FROM P1-05]\n\nSEQUENCE 1 — PRE-LAUNCH WARM-UP (4 emails, for GHL nurture in P1-09):\n- Email 1: Welcome / you are on the list (immediate after signup)\n- Email 2: Meet the Property (day 2) — renders, vision, experience\n- Email 3: Early Bird Advantage (day 5) — tier preview, founder pricing\n- Email 4: WE ARE LIVE (launch day) — direct campaign link, urgency\n\nSEQUENCE 2 — LAUNCH DAY (2 emails):\n- Email 1: To pre-launch list (variant of Email 4 above with more urgency)\n- Email 2: To new subscribers who joined on launch day (different framing)\n\nSEQUENCE 3 — MID-CAMPAIGN MOMENTUM (weekly template):\n- Reusable template for weekly updates: construction progress, milestone celebrations, social proof, next milestone tease\n- Include placeholder sections I can customize each week\n\nSEQUENCE 4 — FINAL 48-HOUR URGENCY (3 emails):\n- Email 1: 'Final 2 weeks' — milestone progress, remaining tiers, social proof\n- Email 2: '72 hours left' — scarcity messaging, specific tiers almost gone\n- Email 3: 'Last 24 hours' — maximum urgency, final CTA\n\nTIER-SEGMENTED VARIANTS: For sequences 1, 2, and 4, write variants for 3 segments:\n- $1,500-$5,000 backers: Focus on experience value, date selection\n- $5,000-$10,000 backers: Focus on Founders access, exclusive perks\n- $25,000+ backers: Focus on legacy, multi-year relationship, personal touch\n\nFor every email: Write 2 subject line A/B test variants. Keep emails under 300 words. Single clear CTA per email.\n\nOBJECTIVE: A complete email library covering every phase of the campaign, ready to load into GHL and Instantly. Every email should feel personal, not automated, and drive a specific action.`,
    subtasks: ["Write pre-launch warm-up sequence (4 emails)", "Write launch day emails (2 variants)", "Write weekly mid-campaign update templates", "Write final 48-hour urgency sequence (3 emails)", "Create tier-segmented variants for each", "Write subject line A/B test variants"]
  },
  {
    id: "p2-05", phase: 2, title: "Set Up Cold Outreach Sequences",
    description: "Import Manus prospect lists into Instantly via n8n. Create separate campaigns: Investor outreach, Influencer/creator outreach, Campaign creator network, Local business partnerships.",
    tools: ["n8n", "instantly"],
    dependencies: ["p1-06", "p2-04"],
    critical: false,
    usedFor: "Puts your prospect research into action. Four Instantly campaigns launch on a staggered schedule at campaign go-live (P3-03), with responses routing through n8n to GHL (P3-01) for automated nurture and conversion tracking.",
    appliedTo: [
      { task: "p3-01", how: "n8n lead routing workflow from this setup becomes part of the full automation activation" },
      { task: "p3-03", how: "These 4 configured Instantly campaigns are what actually launch on days 1-3 of the live campaign" }
    ],
    dataIn: [
      { label: "Prospect lists (investors, influencers, creators)", from: "p1-06", format: "CSV" },
      { label: "Email sequences", from: "p2-04", format: "Copy docs" },
      { label: "Pitch deck (for investor variant)", from: "p2-01", format: ".pptx / PDF link" }
    ],
    dataOut: [
      { label: "Instantly campaigns (4 segments)", format: "Active Instantly campaigns", dest: ["p3-03"] },
      { label: "n8n lead routing workflow", format: "Active n8n workflow", dest: ["p3-01"] }
    ],
    prompt: `N8N + INSTANTLY SETUP — Cold Outreach Sequences\n\nStep 1 — N8N WORKFLOW: Import Leads to Instantly\n- Trigger: Manual or webhook (for adding new lists later)\n- Read CSV node: Parse prospect CSV from Manus (P1-06)\n- Split by segment field: investor, influencer, creator, local_business\n- For each segment: Instantly API node — add lead to corresponding campaign\n- Error handling: Log failures to Google Sheet\n\nStep 2 — INSTANTLY CAMPAIGN SETUP (4 campaigns):\n\nCAMPAIGN A — Investor Outreach:\n- Subject: Quick question about [their investment focus area]\n- Email 1: Personal intro, the opportunity (luxury STR in Hood River Valley), link to pitch deck PDF\n- Email 2 (day 3): Market data highlight, specific tier recommendation for investors\n- Email 3 (day 7): Social proof + direct ask for a 15-min call\n- Sending: 30/day max, 9am-11am PST\n\nCAMPAIGN B — Influencer/Creator Outreach:\n- Subject: Partnership idea — luxury retreat in Oregon wine country\n- Email 1: Compliment their content + partnership proposal (comped stay for coverage)\n- Email 2 (day 4): Property details, what the collab looks like\n- Email 3 (day 8): Soft close — 'would this work for your content calendar?'\n- Sending: 40/day max, 10am-2pm PST\n\nCAMPAIGN C — Campaign Creator Network:\n- Subject: Fellow crowdfunder — would love your take on our campaign\n- Email 1: Founder-to-founder intro, ask for feedback/advice, mention you studied their campaign\n- Email 2 (day 3): Share a specific thing you learned from their campaign + your differentiation\n- Email 3 (day 6): Ask if they would share with their network\n- Sending: 20/day max\n\nCAMPAIGN D — Local Business Partnerships:\n- Subject: Bringing luxury guests to Hood River — partnership opportunity\n- Email 1: Intro the retreat, propose featuring their business as a curated experience\n- Email 2 (day 4): Specific partnership structure (featured on campaign page, guest referrals)\n- Email 3 (day 7): Ask for a quick call to discuss\n- Sending: 15/day max\n\nStep 3 — RESPONSE ROUTING: Configure Instantly to forward replies via webhook to n8n, which creates/updates GHL contacts with tag 'Outreach-Responded' and appropriate segment tag.\n\nOBJECTIVE: Four segmented cold outreach campaigns ready to launch on days 1-3 of the live campaign, with automatic response routing to GHL for nurture.`,
    subtasks: ["Create n8n workflow: CSV to Instantly import", "Set up Investor outreach campaign in Instantly", "Set up Influencer/Creator outreach campaign", "Set up Campaign Creator network outreach", "Set up Local Business partnership outreach", "Configure daily sending limits", "Test with 5 contacts per segment"]
  },
  {
    id: "p2-06", phase: 2, title: "Build AI Concierge Bot",
    description: "React artifact using Anthropic API. Pre-loaded with campaign context, tier details, property info, FAQ, and local experience data. Lives on campaign page — backers can ask questions in real-time.",
    tools: ["claude", "claudeCode"],
    dependencies: ["p1-04", "p1-05"],
    critical: false,
    usedFor: "Lives on the campaign page answering backer questions 24/7 — a massive differentiator since no other crowdfunding campaign does this. Reduces unanswered questions that kill pledges. Embedded into the live campaign infrastructure at launch (P3-01) and stress-tested pre-launch (P2-07).",
    appliedTo: [
      { task: "p2-07", how: "Concierge bot is included in the stress-test package — Model Council evaluates whether its responses are convincing" },
      { task: "p3-01", how: "Bot goes live as part of the full automation activation on launch day" }
    ],
    dataIn: [
      { label: "Campaign context & copy", from: "p1-05", format: "Documents" },
      { label: "V3 tier details", from: "p1-04", format: "Document" },
      { label: "FAQ content", from: "p1-05", format: "Markdown" },
      { label: "Property renders", from: "p1-11", format: "Images" }
    ],
    dataOut: [{ label: "Deployed concierge bot", format: "React component / embeddable widget", dest: ["p3-01"] }],
    prompt: `CLAUDE CODE PROMPT — AI Concierge Bot for Campaign Page\n\nBuild a React component (Vite + TypeScript + Tailwind) that serves as an AI-powered concierge for the Indiegogo campaign page.\n\nFUNCTIONALITY:\n- Chat interface that floats in bottom-right corner of page\n- Collapsible — small icon/button when closed, chat panel when open\n- Sends messages to Anthropic API (Claude Sonnet) with campaign context as system prompt\n- Streams responses for real-time feel\n- Maintains conversation history within session\n- Includes quick-action buttons: 'Tell me about tiers', 'When will I get my stay?', 'Why Parkdale?', 'How does this work?'\n\nSYSTEM PROMPT FOR THE CONCIERGE:\n---\nYou are the AI concierge for the Parkdale Retreat crowdfunding campaign on Indiegogo. You help potential backers understand the property, tiers, and experience.\n\nProperty: Luxury retreat in Parkdale, Oregon — 3,500 sq ft, 5 bedrooms with en-suite bathrooms, gourmet chef kitchen, pool, hot tub. Located in Hood River Valley between Hood River and Mt. Hood.\n\nTier Structure: [PASTE FULL V3 TIERS FROM P1-04]\n\nFulfillment: Date-batched stays in pre-scheduled windows. [PASTE FULFILLMENT SCHEDULE]\n\nLocal Experiences (bundled with high tiers): Wine tours, guided hikes on Mt. Hood, Columbia Gorge rafting, local restaurant partnerships.\n\nFAQ: [PASTE FULL FAQ FROM P1-05]\n\nRules:\n- Be warm, knowledgeable, and concise\n- Always recommend a specific tier when someone asks 'which tier should I pick?' — ask their budget, group size, and travel style first\n- Never make up information not in your context\n- If asked about something you do not know, say 'Great question — let me connect you with the team directly' and provide the contact email\n- Subtly create urgency when appropriate (limited tiers, founder-only pricing)\n- Never pressure — this is a luxury experience, not a hard sell\n---\n\nDESIGN: Match the campaign page aesthetic — dark/luxury feel, clean typography. The chat should feel like texting a knowledgeable concierge, not talking to a robot.\n\nDeploy as a standalone widget that can be embedded via script tag.\n\nOBJECTIVE: A 24/7 AI concierge that answers backer questions instantly, recommends tiers, and reduces the number of pledges lost to unanswered questions. No other crowdfunding campaign has this — it is a major differentiator.`,
    subtasks: ["Design conversation flow and system prompt", "Build React component with chat UI", "Integrate Anthropic API (Claude Sonnet)", "Pre-load campaign context as system prompt", "Add tier recommendation logic", "Test with 20 sample backer questions", "Deploy as embeddable widget"]
  },
  {
    id: "p2-07", phase: 2, title: "Stress-Test Entire Campaign Package",
    description: "Use Perplexity Computer Model Council (GPT-5.4 + Claude Opus 4.6 + Gemini 3.1 Pro) to independently evaluate the complete campaign package: tiers, copy, pricing, visuals, objection handling.",
    tools: ["perplexity"],
    dependencies: ["p1-04", "p1-05", "p2-01", "p2-04", "p2-06"],
    critical: true,
    usedFor: "The final quality gate before you go live. Three frontier models independently tear apart your tiers, copy, pricing, and pitch deck simultaneously. Identified weaknesses get fixed BEFORE any backer sees the campaign — this is where you catch problems that cost pledges.",
    appliedTo: [
      { task: null, how: "Revisions identified here loop back to whichever tasks need fixes — tier structure, copy, deck, or concierge bot. This is the last checkpoint before launch." }
    ],
    dataIn: [{ label: "Complete campaign package", format: "All documents + assets" }],
    dataOut: [
      { label: "Multi-model critique report", format: "Report with identified weaknesses", dest: [] },
      { label: "Required revisions list", format: "Prioritized task list", dest: [] }
    ],
    prompt: "Use Model Council to stress-test this crowdfunding campaign package for a luxury retreat renovation in Parkdale, Oregon. [Attach all materials]. Identify: which tiers have the weakest value proposition, which are most likely to convert, what is missing, where pricing does not pass a rational backer smell test, and what copy elements need strengthening. Each model should independently evaluate, then synthesize disagreements.",
    subtasks: ["Compile all campaign materials", "Submit to Model Council", "Review disagreements between models", "Prioritize revisions", "Execute highest-priority fixes"]
  },
  {
    id: "p2-08", phase: 2, title: "Episodic Content Series Setup",
    description: "Structure campaign content as ongoing series: Building Parkdale (behind-the-scenes), Why This Valley (local stories), Founder Diaries (raw journey). Create templates, scripts, and production pipeline.",
    tools: ["claude", "heygen", "elevenlabs"],
    dependencies: ["p1-05"],
    critical: false,
    usedFor: "Turns random campaign updates into a structured content series that builds narrative momentum. Templates and first episodes feed the daily social content machine (P3-04) and give weekly campaign updates (P3-06) a consistent format that backers start expecting and looking forward to.",
    appliedTo: [
      { task: "p3-04", how: "Content series templates and pre-produced episodes feed the daily social content workflow" },
      { task: "p3-06", how: "Weekly campaign updates follow the Building Parkdale episode format instead of random posts" }
    ],
    dataIn: [{ label: "Campaign narrative & voice", from: "p1-05", format: "Documents" }],
    dataOut: [
      { label: "Content series templates", format: "Script templates + production workflow", dest: ["p3-04", "p3-06"] },
      { label: "First 3 episodes (each series)", format: "Video/audio content", dest: ["p3-04"] }
    ],
    prompt: `CLAUDE PROMPT — Episodic Content Series Design\n\nDesign three ongoing content series for the Parkdale crowdfunding campaign. Each series should have a consistent format that backers start to expect and look forward to.\n\nSERIES 1 — 'Building Parkdale' (Behind-the-Scenes)\n- Format: 60-90 second video or photo carousel with narration\n- Cadence: Weekly during active campaign\n- Content: Construction progress, design decisions, challenges faced, materials arriving, before/after moments\n- Tone: Raw, honest, founder-journey — not polished marketing\n- Write scripts for the first 3 episodes:\n  - Ep 1: 'Why I bought this property' — the origin story\n  - Ep 2: 'The plans are done — here is what we are building' — walkthrough of architectural plans\n  - Ep 3: 'What $X gets you' — break down where backer money goes (materials, labor, amenities)\n\nSERIES 2 — 'Why This Valley' (Local Stories)\n- Format: Short profile (text + photos) or 45-60 second video\n- Cadence: 2x per week\n- Content: Spotlight local businesses, winemakers, guides, chefs, artists who will be part of the guest experience\n- Tone: Community-focused, builds trust that the curated experiences are real\n- Write scripts for the first 3 episodes:\n  - Ep 1: A local winemaker — their story, their wines, how guests will visit\n  - Ep 2: A Mt. Hood guide — what they will show guests, best trails/routes\n  - Ep 3: A Hood River restaurant — the chef, the food, the reservation for guests\n\nSERIES 3 — 'Founder Diaries' (Raw Journey)\n- Format: Text post (300-500 words) or unscripted 2-minute video\n- Cadence: Weekly\n- Content: Honest reflections — what is going well, what is hard, what you are learning, fears and wins\n- Tone: Vulnerable, real, builds parasocial trust\n- Write the first 3 entries:\n  - Entry 1: 'Why crowdfunding instead of a loan' — the honest reason\n  - Entry 2: 'What I did not expect about building a retreat' — surprises so far\n  - Entry 3: 'The first person who pledged' — what it felt like, what it means\n\nFor each series, also provide: HeyGen/ElevenLabs production notes (if AI narration is used), recommended posting platforms, and hashtag strategy.\n\nOBJECTIVE: Three content series that build narrative momentum, establish trust, and give backers a reason to keep coming back to the campaign page throughout the funding period.`,
    subtasks: ["Define episode structure for each series", "Write first 3 Building Parkdale scripts", "Write first 3 Why This Valley scripts", "Write first 3 Founder Diaries scripts", "Test HeyGen/ElevenLabs for AI narration", "Establish production cadence"]
  },
  // ── PHASE 3: Launch + Active Campaign (Weeks 5-9) ──
  {
    id: "p3-01", phase: 3, title: "Activate All Automation Workflows",
    description: "Flip all n8n workflows to live: lead capture to GHL, backer communication orchestrator, campaign milestone alerts, social proof aggregator, and Instantly integration routing.",
    tools: ["n8n"],
    dependencies: ["p1-08", "p2-05"],
    critical: true,
    usedFor: "Flips everything to live — the moment the campaign becomes a running machine. Every automated workflow starts handling data: lead capture routes to GHL nurture (P3-02), Instantly responses flow into the CRM (P3-03), and milestone alerts trigger update workflows (P3-06).",
    appliedTo: [
      { task: "p3-02", how: "GHL nurture sequences depend on n8n webhooks being live to trigger tier-specific welcome flows for new backers" },
      { task: "p3-03", how: "Instantly response routing through n8n becomes active — outreach replies hit GHL automatically" },
      { task: "p3-06", how: "Milestone alert system triggers when pledge thresholds are hit, feeding into weekly update content" }
    ],
    dataIn: [
      { label: "All built n8n workflows", from: "p1-08", format: "n8n workflow configs" },
      { label: "Instantly campaign configs", from: "p2-05", format: "Active campaigns" }
    ],
    dataOut: [{ label: "Live automation pipelines", format: "Running n8n workflows", dest: ["p3-02", "p3-03", "p3-06"] }],
    prompt: `LAUNCH DAY ACTIVATION CHECKLIST — n8n Workflows\n\nThis is a sequential checklist, not a prompt. Execute in this exact order on launch day.\n\nPRE-ACTIVATION (1 hour before launch):\n[ ] Verify all n8n workflows are in 'inactive' state\n[ ] Confirm GHL API connection is live (test with a dummy contact)\n[ ] Confirm Instantly API connection is live\n[ ] Confirm Google Sheets access is working\n[ ] Verify webhook URLs match what is configured in landing page and Indiegogo\n\nACTIVATION SEQUENCE:\n\n1. [ ] ACTIVATE: Lead Capture workflow (webhook from landing page to GHL)\n   - Test: Submit a test form on landing page, verify contact appears in GHL within 60 seconds\n   - Verify: Tag applied correctly, pipeline stage set, Google Sheet row created\n\n2. [ ] ACTIVATE: Backer Communication Orchestrator (new backer webhook from Indiegogo to GHL)\n   - Test: Simulate a pledge webhook, verify tier-tagged contact creation\n   - Verify: Correct tier tag, welcome sequence triggered\n\n3. [ ] ACTIVATE: Campaign Milestone Alert System\n   - Test: Manually trigger a 25% milestone, verify Slack notification fires\n   - Verify: GHL update email triggers, social post generates\n\n4. [ ] ACTIVATE: Social Proof Aggregator\n   - Test: Verify daily schedule trigger is set correctly\n   - Verify: Social mention collection is working\n\n5. [ ] ACTIVATE: Instantly Response Router\n   - Test: Send a test reply in Instantly, verify it routes to GHL\n   - Verify: Contact created with 'Outreach-Responded' tag\n\nPOST-ACTIVATION MONITORING (first 24 hours):\n[ ] Check n8n execution logs every 2 hours\n[ ] Verify no failed executions\n[ ] Confirm first real leads are flowing correctly\n[ ] Check GHL pipeline for proper staging\n\nOBJECTIVE: Every automated workflow is live and verified before the first real backer hits the campaign page. Zero data loss on launch day.`,
    subtasks: ["Review all workflow triggers", "Test each workflow end-to-end", "Activate lead capture workflow", "Activate backer communication orchestrator", "Activate milestone alert system", "Activate social proof aggregator", "Monitor for first 24 hours"]
  },
  {
    id: "p3-02", phase: 3, title: "Launch Nurture Sequences",
    description: "Activate all GHL nurture sequences: pre-launch audience gets launch notification, new backers get tier-specific welcome sequences, referral tracking goes live.",
    tools: ["ghl"],
    dependencies: ["p1-09", "p3-01"],
    critical: true,
    usedFor: "Converts your pre-launch audience into day-one backers and keeps every new backer engaged throughout the campaign. The WE'RE LIVE email to the pre-warmed list drives day-one pledge velocity. Tier-specific welcome sequences reduce buyer's remorse and increase referrals.",
    appliedTo: [
      { task: null, how: "Execution endpoint — nurture sequences run continuously, converting leads into backers and backers into referral sources throughout the campaign" }
    ],
    dataIn: [
      { label: "Pre-launch audience segment", from: "p1-09", format: "GHL contacts" },
      { label: "Live automation triggers", from: "p3-01", format: "n8n webhooks" }
    ],
    dataOut: [{ label: "Active nurture campaigns", format: "Running GHL automations", dest: [] }],
    prompt: `GHL LAUNCH DAY ACTIVATION — Nurture Sequences\n\nExecute in this order on launch day, AFTER n8n workflows are confirmed live (P3-01):\n\n1. [ ] SEND LAUNCH EMAIL to Pre-Launch List:\n   - Segment: All contacts tagged 'Pre-Launch Interest' who completed the nurture sequence\n   - Email: 'WE ARE LIVE' email from P2-04 Sequence 2\n   - Timing: Send within 15 minutes of Indiegogo campaign going live\n   - Expected: This is your highest-conversion segment — monitor click-through to Indiegogo in real-time\n\n2. [ ] ACTIVATE Tier-Specific Backer Welcome Sequences:\n   - Trigger: New contact tagged with tier level (from n8n Backer Communication Orchestrator)\n   - $1,500-$5,000 sequence: Experience-focused welcome, date selection info, local activity previews\n   - $5,000-$10,000 sequence: Founders Weekend invite, kitchen preview, exclusive update access\n   - $25,000+ sequence: Personal video thank-you within 24 hours, naming opportunity details, direct phone call scheduling\n   - Verify: Each sequence triggers correctly by creating a test contact with each tier tag\n\n3. [ ] ACTIVATE Referral Tracking Workflow:\n   - Trigger: Backer submits referral form\n   - Action: Create referred contact, tag with referrer name, send personalized outreach, notify original backer if referral converts\n\n4. [ ] MONITOR First 48 Hours:\n   - Track: Open rates, click rates, unsubscribes\n   - Alert threshold: If open rate drops below 20% on any email, review subject lines\n   - Report: End-of-day summary of email performance to yourself\n\nOBJECTIVE: Every backer and every lead receives the right automated sequence from the moment the campaign goes live. Day-one pledge velocity depends on this firing correctly.`,
    subtasks: ["Send WE'RE LIVE to pre-launch list", "Activate tier-specific backer welcome sequences", "Activate referral tracking workflow", "Monitor open/click rates for first 48 hours"]
  },
  {
    id: "p3-03", phase: 3, title: "Launch Cold Outreach",
    description: "Activate all Instantly campaigns: investor outreach, influencer/creator outreach, campaign creator network, local business partnerships. Stagger launch over 3 days.",
    tools: ["instantly"],
    dependencies: ["p2-05"],
    critical: false,
    usedFor: "Actively pushes the campaign to researched prospects who would not find it organically. Responses route to GHL via n8n for nurture and conversion tracking. Fresh prospects from mid-campaign research (P3-07) get added to keep the pipeline flowing.",
    appliedTo: [
      { task: "p3-01", how: "Outreach responses flow through n8n into GHL where they enter the backer nurture pipeline" },
      { task: "p3-07", how: "Mid-campaign prospect lists get added to these campaigns to maintain outreach velocity" }
    ],
    dataIn: [{ label: "Configured Instantly campaigns", from: "p2-05", format: "4 campaign segments" }],
    dataOut: [{ label: "Outreach responses", format: "Instantly inbox to n8n to GHL", dest: ["p3-01"] }],
    prompt: `INSTANTLY LAUNCH SEQUENCE — Staggered Cold Outreach\n\nLaunch outreach campaigns in this exact order to protect email deliverability:\n\nDAY 1 (Launch Day):\n[ ] Activate Campaign A: Investor Outreach (30/day)\n[ ] Monitor: Check first batch deliverability after 2 hours\n[ ] Verify: No bounces above 3%, no spam reports\n\nDAY 2:\n[ ] Activate Campaign B: Influencer/Creator Outreach (40/day)\n[ ] Monitor: Check Campaign A reply rate (expect 5-15% for personalized investor outreach)\n[ ] Route any Campaign A replies to GHL via n8n\n\nDAY 3:\n[ ] Activate Campaign C: Campaign Creator Network (20/day)\n[ ] Activate Campaign D: Local Business Partnerships (15/day)\n[ ] Monitor: All 4 campaigns running, check aggregate deliverability\n\nDAILY MONITORING (ongoing):\n[ ] Check Instantly dashboard: deliverability, open rates, reply rates per campaign\n[ ] Route all replies to GHL within 4 hours (automated via n8n, but verify)\n[ ] Flag any campaign with open rate below 30% — review subject lines or sender reputation\n[ ] Flag any campaign with bounce rate above 5% — pause and clean list\n\nRESPONSE HANDLING PRIORITY:\n1. Investor replies → respond within 2 hours, schedule call\n2. Influencer replies → respond within 4 hours, send property details\n3. Creator network replies → respond within 24 hours\n4. Local business replies → respond within 24 hours, schedule meeting\n\nOBJECTIVE: Four outreach campaigns running smoothly by day 3, driving warm leads into GHL for nurture and conversion. Staggered launch protects sender reputation.`,
    subtasks: ["Day 1: Launch investor outreach", "Day 2: Launch influencer/creator outreach", "Day 3: Launch creator network + local business outreach", "Monitor deliverability and reply rates", "Route responses to GHL via n8n"]
  },
  {
    id: "p3-04", phase: 3, title: "Rapid Social Content Generation",
    description: "Use Campaign Copywriter GPT for daily social content: property highlights, tier spotlights, local experience features, backer milestone celebrations, countdown graphics.",
    tools: ["customGpt"],
    dependencies: ["p2-03"],
    critical: false,
    usedFor: "Keeps the campaign visible and top-of-mind daily across all social platforms. Consistent posting signals an active, healthy campaign which builds backer confidence. Milestone celebration posts create social proof that drives more pledges.",
    appliedTo: [
      { task: null, how: "Execution endpoint — daily social content is distributed directly to social platforms and repurposed in weekly campaign updates (P3-06)" }
    ],
    dataIn: [
      { label: "Campaign Copywriter GPT", from: "p2-03", format: "Configured GPT" },
      { label: "Content series templates", from: "p2-08", format: "Scripts" }
    ],
    dataOut: [{ label: "Daily social content", format: "Text + image prompts", dest: [] }],
    prompt: `DAILY SOCIAL CONTENT WORKFLOW — Using Campaign Copywriter GPT\n\nOpen the Parkdale Campaign Copywriter GPT (built in P2-03) and run these prompt templates daily:\n\nMORNING POST (Instagram/Facebook):\n'Write an Instagram post for today. Theme: [PICK ONE: tier spotlight / local experience feature / construction progress / backer milestone / valley scenery / founder reflection]. Include relevant hashtags. Keep under 200 words.'\n\nMIDDAY POST (Twitter/X + LinkedIn):\n'Write a short Twitter post (under 280 chars) about [CURRENT CAMPAIGN MILESTONE OR NEWS]. Make it punchy and shareable.'\n\n'Write a LinkedIn post (150-200 words) about [SAME TOPIC] but positioned for a professional/investor audience.'\n\nAFTERNOON POST (Stories/Reels concept):\n'Write a script for a 30-second Instagram Reel about [TOPIC]. Include: hook in first 3 seconds, main content, CTA to campaign link in bio.'\n\nWEEKLY CONTENT CALENDAR PROMPT (run every Monday):\n'Plan this week social content. The campaign is [X]% funded with [Y] days remaining. Key moments this week: [LIST ANY MILESTONES, EVENTS, OR UPDATES]. Give me a 7-day content calendar with daily post topics, platforms, and content types.'\n\nOBJECTIVE: Consistent daily social presence that keeps the campaign visible and builds momentum. The GPT handles the creative lifting — you review, tweak if needed, and post.`,
    subtasks: ["Generate daily social posts", "Create tier spotlight series", "Create local experience feature posts", "Create milestone celebration graphics", "Maintain content calendar"]
  },
  {
    id: "p3-05", phase: 3, title: "Ongoing Market Monitoring",
    description: "Perplexity Computer scheduled tasks: weekly competitive pricing scans, daily social media mention monitoring (Hood River luxury / Mt Hood retreat), automated campaign performance reporting.",
    tools: ["perplexity"],
    dependencies: ["p1-03"],
    critical: false,
    usedFor: "Your early warning system during the live campaign. If competitor pricing shifts, new campaigns launch, or market conditions change, you catch it here — and adjust strategy in the weekly update cycle (P3-06) before it impacts conversion rates.",
    appliedTo: [
      { task: "p3-06", how: "Weekly market reports and social mention alerts feed directly into strategy adjustment decisions and campaign update content" }
    ],
    dataIn: [{ label: "Baseline market data", from: "p1-03", format: "Report" }],
    dataOut: [
      { label: "Weekly market updates", format: "Reports", dest: ["p3-06"] },
      { label: "Social mention alerts", format: "Notifications", dest: ["p3-06"] }
    ],
    prompt: `PERPLEXITY COMPUTER — Scheduled Monitoring Tasks\n\nSet up these recurring tasks in Perplexity Computer:\n\nTASK 1 — WEEKLY COMPETITIVE PRICING SCAN (every Monday):\n'Check current nightly rates for luxury rental properties (4+ bedrooms) within 30 miles of Parkdale, Oregon on Airbnb, VRBO, and Vacasa. Compare to the baseline rates from [PASTE BASELINE FROM P1-03]. Flag any properties that have significantly changed pricing (up or down by 15%+). Also check if any new luxury properties have listed in the area. Compile into a brief comparison table.'\n\nTASK 2 — DAILY SOCIAL MENTION MONITORING (daily, 8am):\n'Search social media (Twitter/X, Instagram, Reddit, Facebook groups) for mentions of: Hood River luxury rental, Mt Hood retreat, Parkdale Oregon, Columbia Gorge luxury stay, and the campaign name. Flag any positive mentions we could amplify, any negative mentions we need to address, and any conversations we could join. Summary format: [Positive] [Negative] [Opportunities].'\n\nTASK 3 — WEEKLY CAMPAIGN PERFORMANCE CONTEXT (every Friday):\n'Research current crowdfunding trends: what is the average funding velocity for Indiegogo campaigns this week, are there any new luxury hospitality campaigns that launched, what content formats are driving the most engagement on crowdfunding campaigns right now. Compile into a 1-page brief I can use to adjust strategy.'\n\nTASK 4 — CREATE CUSTOM SKILL 'Competitor Price Monitor':\n'Teach Perplexity to run Task 1 automatically and deliver results to [YOUR EMAIL OR PREFERRED DESTINATION] every Monday morning.'\n\nOBJECTIVE: Automated early-warning system that catches market shifts, competitive threats, and social signals before they impact your campaign. Feed outputs into weekly strategy adjustments (P3-06).`,
    subtasks: ["Set up weekly competitive pricing scan (Perplexity scheduled)", "Set up daily social monitoring", "Set up weekly campaign performance report", "Review and act on signals weekly"]
  },
  {
    id: "p3-06", phase: 3, title: "Weekly Campaign Updates & Strategy Adjustments",
    description: "Claude writes weekly campaign updates based on: construction progress, backer milestones, market intel from Perplexity, and engagement data from GHL/n8n. Adjust strategy based on what is working.",
    tools: ["claude", "claudeCode"],
    dependencies: ["p3-05"],
    critical: true,
    usedFor: "Maintains campaign momentum and backer trust week over week. Updates show construction progress, celebrate milestones, and demonstrate the project is real and moving. Strategy adjustments double down on what is converting and cut what is not.",
    appliedTo: [
      { task: null, how: "Execution endpoint — updates distribute via n8n to GHL email + social. Strategy adjustments may loop back to any active task (copy, outreach, pricing) based on what the data shows." }
    ],
    dataIn: [
      { label: "Market monitoring reports", from: "p3-05", format: "Reports" },
      { label: "Campaign performance data", from: "p3-01", format: "n8n dashboard" },
      { label: "Backer engagement metrics", from: "p3-02", format: "GHL analytics" }
    ],
    dataOut: [
      { label: "Weekly update post", format: "Campaign page update + email", dest: [] },
      { label: "Strategy adjustment notes", format: "Document", dest: [] }
    ],
    prompt: `CLAUDE PROMPT — Weekly Campaign Update (reusable template)\n\nWrite this week's campaign update for the Parkdale retreat Indiegogo campaign.\n\nHere is this week's data:\n- Funding progress: [CURRENT TOTAL] of [GOAL] ([X]% funded)\n- New backers this week: [NUMBER] (total: [TOTAL BACKERS])\n- Tiers sold this week: [LIST WHICH TIERS AND HOW MANY]\n- Notable backer activity: [ANY HIGH-DOLLAR PLEDGES, REFERRALS, COMMENTS]\n- Construction progress: [WHAT HAPPENED THIS WEEK — PHOTOS IF AVAILABLE]\n- Market intel from Perplexity monitoring: [PASTE P3-05 WEEKLY SUMMARY]\n- Email/outreach performance: [OPEN RATES, CLICK RATES, REPLY RATES FROM GHL/INSTANTLY]\n\nWrite the update in two versions:\n\nVERSION 1 — CAMPAIGN PAGE UPDATE (public, posted on Indiegogo):\n- 200-300 words\n- Lead with the most exciting news (milestone hit, construction progress, new experience added)\n- Include a specific number or data point that shows momentum\n- End with a clear CTA (share the campaign, upgrade your tier, tell a friend)\n- Tone: Confident, grateful, forward-looking\n\nVERSION 2 — EMAIL UPDATE (sent via GHL to all contacts):\n- 150-200 words\n- Same core content but more personal/intimate tone\n- Include one behind-the-scenes detail not on the public page\n- Segment-specific P.S. lines for each tier level\n\nAlso provide: 1 social media post summarizing the update, and a STRATEGY NOTE for me (not for public) identifying what is working, what is not, and what to adjust next week.\n\nOBJECTIVE: Maintain backer trust and campaign momentum with consistent, data-backed updates that make backers feel informed and excited about their pledge.`,
    subtasks: ["Review week performance data", "Gather construction progress + photos", "Write campaign update", "Generate update graphics (Claude Code)", "Distribute via n8n to GHL email + social", "Identify strategy adjustments", "Implement changes"]
  },
  {
    id: "p3-07", phase: 3, title: "Ongoing Lead Research for Mid-Campaign Boost",
    description: "Manus runs additional prospect research mid-campaign: new hospitality investors, fresh influencer lists, anyone who engaged with campaign content but has not pledged.",
    tools: ["manus"],
    dependencies: ["p1-06"],
    critical: false,
    usedFor: "Refreshes the outreach pipeline when initial prospect lists are exhausted. New investor and influencer contacts route to the active Instantly campaigns (P3-03) to maintain outreach velocity during the campaign middle weeks when momentum typically dips.",
    appliedTo: [
      { task: "p3-03", how: "Fresh prospect CSVs get added to the running Instantly campaigns via n8n — staggered to maintain deliverability" }
    ],
    dataIn: [{ label: "Initial prospect lists", from: "p1-06", format: "CSV" }],
    dataOut: [{ label: "Fresh prospect lists", format: "CSV", dest: ["p3-03"] }],
    prompt: `MANUS PROMPT — Mid-Campaign Prospect Refresh\n\nI need fresh prospect lists to refuel my cold outreach campaigns. My initial lists (from P1-06) are running through Instantly and I need new contacts to maintain outreach velocity.\n\nTASK 1 — New Investor Prospects:\n'Research publicly visible individuals in luxury hospitality investment who were NOT in my initial list. Focus on: angel investors who have funded hospitality projects in the last 6 months, real estate investors publicly discussing short-term rental portfolios in the Pacific Northwest, and members of travel-focused investment syndicates on AngelList or Republic. For each, compile: name, public profile links, investment focus, and recent activity. Deduplicate against this existing list: [PASTE OR ATTACH P1-06 INVESTOR CSV]. Target: 20 new contacts minimum.'\n\nTASK 2 — New Influencer/Creator Prospects:\n'Find travel bloggers, Instagram influencers, and YouTube creators who have posted about Oregon, the Columbia River Gorge, Mt. Hood, or Pacific Northwest luxury travel in the last 30 days — these are people actively creating content in our target area RIGHT NOW. Deduplicate against: [PASTE OR ATTACH P1-06 INFLUENCER CSV]. For each: name, platform, follower count, recent relevant post URL, contact info if public. Target: 30 new contacts minimum.'\n\nTASK 3 — Engaged Non-Backers:\n'Search social media for anyone who has engaged with our campaign content (liked, shared, commented on campaign-related posts) but does not appear in our backer list. Compile contact info where publicly available.'\n\nDeliver all as CSVs formatted for Instantly import (columns: email, firstName, lastName, companyName, customField_segment).\n\nOBJECTIVE: Fresh prospect lists that get immediately routed to active Instantly campaigns via n8n, maintaining outreach velocity during the mid-campaign period when momentum typically dips.`,
    subtasks: ["Run new investor prospect research", "Run new influencer/creator search", "Cross-reference with existing lists (dedupe)", "Route new prospects to Instantly via n8n"]
  },
  // ── PHASE 4: Final Push & Close (Last 2 Weeks) ──
  {
    id: "p4-01", phase: 4, title: "Urgency-Based Copy for Final Push",
    description: "Claude writes final-push content: scarcity messaging (limited tiers, closing dates), social proof compilation, last chance email series, final social blitz content.",
    tools: ["claude"],
    dependencies: [],
    critical: true,
    usedFor: "The last-chance messaging that drives the highest-conversion window of the entire campaign. Scarcity emails load into GHL via n8n (P4-02), social blitz content drives final impressions across all platforms (P4-04), and the campaign page gets a final urgency refresh.",
    appliedTo: [
      { task: "p4-02", how: "Final push email sequence (3 emails: 2 weeks, 72 hours, 24 hours) loads into GHL for automated scarcity triggers" },
      { task: "p4-04", how: "Scarcity social content powers the 3x daily posting blitz in the full-court press" }
    ],
    dataIn: [
      { label: "Campaign performance data", format: "Dashboard metrics" },
      { label: "Remaining tier inventory", format: "Current pledge data" }
    ],
    dataOut: [
      { label: "Final push email sequence (3 emails)", format: "Copy docs", dest: ["p4-02"] },
      { label: "Scarcity social content", format: "Posts + graphics", dest: ["p4-04"] },
      { label: "Updated campaign page copy", format: "Markdown", dest: [] }
    ],
    prompt: `CLAUDE PROMPT — Final Push Copy Package\n\nThe Parkdale campaign has [X] days remaining. Here is the current state:\n- Funded: [AMOUNT] of [GOAL] ([X]%)\n- Backers: [TOTAL]\n- Remaining tier inventory: [LIST EACH TIER AND SLOTS REMAINING]\n- Tiers that are SOLD OUT: [LIST]\n- Top-performing content this campaign: [LIST TOP 3 POSTS/EMAILS BY ENGAGEMENT]\n\nWrite the complete final-push content package:\n\n1. FINAL PUSH EMAIL SEQUENCE (3 emails for GHL):\n\nEmail 1 — 'Final 2 Weeks' (send 14 days before close):\n- Tone: Milestone celebration + forward momentum\n- Content: Where we are, what backers have made possible, what is still available, social proof\n- CTA: 'Lock in your tier before they are gone'\n- Write 2 subject line A/B variants\n\nEmail 2 — '72 Hours Left' (send 3 days before close):\n- Tone: Urgent but not desperate\n- Content: Specific tiers almost gone, countdown, final chance messaging\n- CTA: Direct link to the tier with the most remaining capacity\n- Write 2 subject line A/B variants\n\nEmail 3 — 'Last 24 Hours' (send final day):\n- Tone: Now or never\n- Content: This is it. The door closes tonight. Here is exactly what you get if you act now.\n- CTA: Single button to campaign page\n- Write 2 subject line A/B variants\n\n2. SCARCITY SOCIAL CONTENT (10 posts):\n- 3 countdown posts (7 days, 3 days, final day)\n- 3 tier-specific 'almost gone' posts for tiers with <3 slots\n- 2 social proof posts (backer count, funding milestone)\n- 1 'thank you + final push' post\n- 1 'campaign closes tonight' post\n\n3. CAMPAIGN PAGE UPDATE:\n- New hero banner text reflecting urgency\n- Updated tier availability (SOLD OUT badges where applicable)\n- Final FAQ addition: 'What happens after the campaign closes?'\n\nOBJECTIVE: Every piece of content needed for the highest-conversion window of the campaign. This package powers the final 2 weeks across email, social, and the campaign page simultaneously.`,
    subtasks: ["Analyze which tiers still have capacity", "Write final 2 weeks email", "Write 72 hours left email", "Write last 24 hours email", "Write scarcity-focused social posts", "Update campaign page with urgency messaging"]
  },
  {
    id: "p4-02", phase: 4, title: "Trigger Scarcity Sequences",
    description: "n8n triggers GHL scarcity sequences: tier capacity warnings, countdown timers, X backers away from goal messaging, personalized re-engagement for warm leads.",
    tools: ["n8n", "ghl"],
    dependencies: ["p4-01"],
    critical: true,
    usedFor: "Automated last-push pressure on every undecided lead. Tier capacity warnings, countdown-based urgency emails, and personalized re-engagement sequences fire at warm leads who browsed but did not pledge — this is historically the highest-conversion window for crowdfunding campaigns.",
    appliedTo: [
      { task: "p4-04", how: "Active scarcity automations run alongside the manual full-court press, ensuring no warm lead goes untouched" }
    ],
    dataIn: [{ label: "Final push copy", from: "p4-01", format: "Copy docs" }],
    dataOut: [{ label: "Active scarcity automations", format: "Running GHL sequences", dest: [] }],
    prompt: `GHL + N8N SCARCITY ACTIVATION — Final Push Automations\n\nStep 1 — LOAD EMAILS INTO GHL:\n[ ] Create new email templates from P4-01 final push copy\n[ ] Set up 3-email sequence: 14-day, 3-day, 1-day before campaign close\n[ ] Segment: ALL contacts in pipeline (pre-launch + backers + outreach respondents)\n\nStep 2 — N8N SCARCITY TRIGGERS:\n[ ] Build workflow: Check remaining tier inventory (manual webhook or scheduled)\n[ ] IF any tier has 3 or fewer slots remaining:\n   → Send tier-specific scarcity email to contacts who viewed but did not pledge\n   → Post automated social alert: '[TIER NAME] is almost gone — only [X] slots left'\n[ ] IF funding crosses 75%, 90%, 95% milestones:\n   → Trigger milestone celebration email to all contacts\n   → Generate social celebration post\n\nStep 3 — RE-ENGAGEMENT SEQUENCE:\n[ ] Segment: Contacts who opened emails but never pledged\n[ ] Email: 'We noticed you were interested — here is what is still available'\n[ ] Personalize: Reference the tier they clicked on (if trackable in GHL)\n[ ] Timing: Send 10 days before close\n\nStep 4 — COUNTDOWN AUTOMATION:\n[ ] GHL automation: Send daily countdown emails for final 3 days\n[ ] Content: Each day references specific remaining tiers and updated backer count\n\nMONITOR: Check deliverability hourly during final 48 hours — volume spike can trigger spam filters. If deliverability drops, reduce send rate immediately.\n\nOBJECTIVE: Automated pressure on every undecided lead through the final 2 weeks. Every warm contact should receive at least 4 touchpoints in the final push.`,
    subtasks: ["Load final push emails into GHL", "Set up scarcity trigger conditions in n8n", "Activate countdown-based sequences", "Activate re-engagement sequence for warm leads", "Monitor deliverability and conversions"]
  },
  {
    id: "p4-03", phase: 4, title: "Final Competitive Analysis",
    description: "Perplexity Computer runs closing-phase competitive analysis: have any competing campaigns launched? Market conditions changed? Use to validate or adjust closing strategy.",
    tools: ["perplexity"],
    dependencies: [],
    critical: false,
    usedFor: "Last-minute sanity check before the final push. Confirms your pricing still holds against the market, flags any new competing campaigns that launched during yours, and validates your closing strategy before you commit to the full-court press (P4-04).",
    appliedTo: [
      { task: "p4-04", how: "Closing strategy validation report may adjust the full-court press approach — e.g., if a competitor launched a similar campaign, messaging adapts" }
    ],
    dataIn: [],
    dataOut: [{ label: "Closing strategy validation report", format: "Report", dest: ["p4-04"] }],
    prompt: `PERPLEXITY COMPUTER PROMPT — Closing Strategy Validation\n\nThe Parkdale crowdfunding campaign closes in [X] days. I need a final competitive and market check before committing to the full-court press.\n\nRun these analyses:\n\n1. COMPETITIVE LANDSCAPE: Have any new luxury retreat or boutique hotel crowdfunding campaigns launched on Indiegogo or Kickstarter in the last 30 days? If so, provide: campaign name, goal, current funding, tier structure, and geographic focus. Assess whether any directly compete with our campaign.\n\n2. MARKET RATE VALIDATION: Check current luxury STR nightly rates in the Hood River Valley / Parkdale area. Compare to our tier pricing assumptions ($1,000+/night full property, $300+/night per room). Have rates shifted significantly since our campaign launched?\n\n3. CROWDFUNDING TRENDS: What is the current success rate for Indiegogo campaigns in the last 30 days? Any platform changes, algorithm updates, or trending categories that affect visibility?\n\n4. CLOSING STRATEGY INTEL: From successful crowdfunding campaigns that raised $100K+ in the last year, what closing tactics drove the most final-week pledges? (email frequency, social tactics, urgency messaging, stretch goals, tier additions)\n\nSynthesize into a CLOSING STRATEGY RECOMMENDATION:\n- Should we adjust any messaging based on competitive changes?\n- Should we add a last-minute stretch goal or bonus tier?\n- What closing tactic has the highest expected ROI for our remaining time?\n- Any risks to flag before the final push?\n\nOBJECTIVE: Validate that our closing strategy is still sound given current market conditions, and identify any last-minute adjustments that could increase final pledge total.`,
    subtasks: ["Run competitive landscape scan", "Check for new competing campaigns", "Validate pricing still holds", "Identify any new market signals", "Recommend closing strategy adjustments"]
  },
  {
    id: "p4-04", phase: 4, title: "Full-Court Press — All Tools",
    description: "Maximum conversion push: all channels active, all tools coordinated. Personal outreach to undecided high-dollar prospects, social blitz, email urgency, updated campaign page, influencer asks.",
    tools: ["claude", "n8n", "ghl", "instantly", "customGpt", "manus"],
    dependencies: ["p4-01", "p4-02", "p4-03"],
    critical: true,
    usedFor: "Everything, everywhere, all at once. This is the close. Personal phone/video calls to undecided $10K+ prospects, 3x daily social posting, final emails to all segments, direct outreach to warm leads, last-minute influencer asks, and a final campaign page update. The campaign ends here.",
    appliedTo: [
      { task: null, how: "Terminal task — the campaign closes. Output is your final pledge total." }
    ],
    dataIn: [{ label: "All campaign assets and data", format: "Everything" }],
    dataOut: [{ label: "Campaign close", format: "Final pledge total", dest: [] }],
    prompt: `FULL-COURT PRESS — Execution Playbook (Final 48-72 Hours)\n\nThis is a coordinated, all-channel execution plan. Every action happens in parallel.\n\nCHANNEL 1 — PERSONAL HIGH-DOLLAR OUTREACH (you, directly):\n[ ] Pull list of undecided $10K+ prospects from GHL pipeline\n[ ] For each: personal phone call or video message\n[ ] Script: 'Hi [NAME], this is Bri from the Parkdale project. We are in the final [X] hours and I wanted to reach out personally. [REFERENCE THEIR SPECIFIC INTEREST/PAST CONVERSATION]. The [TIER NAME] tier has [X] spots left and I did not want you to miss it. Can I answer any final questions?'\n[ ] Goal: 3-5 personal calls per day in final 72 hours\n\nCHANNEL 2 — SOCIAL MEDIA BLITZ (3x daily posting):\n[ ] Morning: Countdown post with current funding status\n[ ] Midday: Tier spotlight or social proof (backer quote, milestone)\n[ ] Evening: Behind-the-scenes or emotional appeal\n[ ] Platform priority: Instagram > Facebook > Twitter/X > LinkedIn\n[ ] Use Campaign Copywriter GPT for rapid content generation\n[ ] Reply to EVERY comment within 1 hour\n\nCHANNEL 3 — EMAIL (automated via GHL, from P4-02):\n[ ] Verify scarcity sequences are firing on schedule\n[ ] Monitor open/click rates in real-time\n[ ] If any email underperforms (<15% open rate), send a variant immediately\n\nCHANNEL 4 — INSTANTLY OUTREACH:\n[ ] Send final follow-up to all outreach respondents who did not convert\n[ ] Subject: 'Last chance — Parkdale closes in [X] hours'\n[ ] Keep it to 3 sentences + campaign link\n\nCHANNEL 5 — INFLUENCER ASKS:\n[ ] DM every influencer who engaged with campaign content\n[ ] Ask: 'Would you mind sharing our campaign link? We close in [X] hours and every share helps.'\n[ ] Offer: Comped future stay for anyone who drives 3+ pledges\n\nCHANNEL 6 — CAMPAIGN PAGE:\n[ ] Update hero with countdown timer\n[ ] Add SOLD OUT badges to completed tiers\n[ ] Update FAQ with 'What happens after the campaign closes?'\n[ ] Pin a final update: gratitude + urgency + clear CTA\n\nFINAL HOUR:\n[ ] Post 'last hour' across all social platforms\n[ ] Send final email blast to entire list\n[ ] Go live on Instagram/Facebook for final countdown\n[ ] Close campaign\n\nOBJECTIVE: Leave absolutely nothing on the table. Every warm lead, every channel, every tool — fully coordinated for maximum closing conversion.`,
    subtasks: ["Personal calls/video to undecided $10K+ prospects", "Social media blitz (all platforms, 3x daily)", "Final email to all segments", "Direct outreach to warm leads who have not pledged", "Influencer last-minute asks", "Campaign page final update", "Close campaign"]
  },
];

const PHASES = [
  { id: 1, name: "Pre-Launch Foundation", weeks: "Weeks 1-3", color: "#2E8B6E", description: "Research, strategy, infrastructure. Build the foundation everything else depends on." },
  { id: 2, name: "Campaign Preparation", weeks: "Weeks 3-5", color: "#D4855A", description: "Assets, outreach systems, stress-testing. Get everything ready to go live." },
  { id: 3, name: "Launch + Active Campaign", weeks: "Weeks 5-9", color: "#4A90D9", description: "Everything goes live. Monitor, adjust, convert." },
  { id: 4, name: "Final Push & Close", weeks: "Last 2 Weeks", color: "#D4A853", description: "Maximum pressure. Convert remaining prospects. Close strong." },
];

const STACKING_WORKFLOWS = [
  { id: "wf-1", name: "The Backer Magnet", phase: "Pre-Launch", description: "Research > Prospect > Write > Route > Send > Convert",
    steps: [
      { tool: "perplexity", label: "Research luxury hospitality campaigns + travel influencers", data: "Intel reports, campaign patterns" },
      { tool: "manus", label: "Build prospect lists from public signals", data: "CRM-ready CSVs (investors, creators, influencers)" },
      { tool: "claude", label: "Write personalized outreach sequences (3 variants/segment)", data: "Email copy per segment" },
      { tool: "n8n", label: "Import leads, route to Instantly campaigns", data: "CSV to Instantly API via webhook" },
      { tool: "instantly", label: "Execute cold outreach at scale", data: "Automated email sequences" },
      { tool: "ghl", label: "Capture responses, nurture, convert to pledges", data: "CRM pipeline + automations" },
    ]},
  { id: "wf-2", name: "The Trust Machine", phase: "Campaign Live", description: "Write > Design > Distribute > Monitor > Adjust",
    steps: [
      { tool: "claude", label: "Write weekly campaign update", data: "Update copy + strategy notes" },
      { tool: "claudeCode", label: "Generate update graphics and social assets", data: "PNG/JPG graphics" },
      { tool: "n8n", label: "Distribute to GHL email + social channels", data: "Webhook triggers" },
      { tool: "perplexity", label: "Monitor competitor campaigns + market changes", data: "Weekly intel reports" },
      { tool: "claude", label: "Adjust strategy based on intel", data: "Strategy revision notes" },
    ]},
  { id: "wf-3", name: "The Conversion Engine", phase: "Final Push", description: "Analyze > Rewrite > Generate > Test > Trigger",
    steps: [
      { tool: "perplexity", label: "Analyze which elements drive highest conversion", data: "Conversion analysis report" },
      { tool: "claude", label: "Rewrite underperforming copy + urgency sequences", data: "Revised copy" },
      { tool: "customGpt", label: "Rapid-fire social content variations", data: "50+ social post variants" },
      { tool: "n8n", label: "A/B test email subjects, optimize send times", data: "Test results to winning variants" },
      { tool: "ghl", label: "Trigger scarcity sequences for undecided leads", data: "Automated urgency campaigns" },
    ]},
  { id: "wf-4", name: "The Anchor Backer Close", phase: "High-Dollar", description: "Research > Stress-test > Personalize > Pitch > Track",
    steps: [
      { tool: "manus", label: "Research 20 potential $25K+ prospects", data: "Prospect dossiers (public signals)" },
      { tool: "perplexity", label: "Model Council stress-tests your pitch", data: "Multi-model critique" },
      { tool: "claude", label: "Write personalized pitch letter per prospect", data: "Custom pitch letters" },
      { tool: "claudeSkills", label: "Generate tailored pitch deck per prospect", data: ".pptx files" },
      { tool: "manual", label: "Direct personal outreach (phone/video)", data: "Conversations" },
      { tool: "ghl", label: "Track pipeline, automate follow-ups", data: "CRM deal pipeline" },
    ]},
];

// ─── MAIN COMPONENT ───
export default function ParkdaleCommandCenter() {
  const [taskStatus, setTaskStatus] = useState({});
  const [expandedTasks, setExpandedTasks] = useState({});
  const [subtaskStatus, setSubtaskStatus] = useState({});
  const [activeView, setActiveView] = useState("overview");
  const [filterTool, setFilterTool] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [loaded, setLoaded] = useState(false);
  const [showDataFlow, setShowDataFlow] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // Check for admin edit key in URL: ?edit=PARKDALE
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const editKey = params.get("edit");
    if (editKey === "PARKDALE") {
      setIsAdmin(true);
    }
  }, []);

  useEffect(() => {
    try {
        const t = localStorage.getItem("parkdale-cmd-v2-tasks");
        if (t) setTaskStatus(JSON.parse(t));
        const s = localStorage.getItem("parkdale-cmd-v2-subs");
        if (s) setSubtaskStatus(JSON.parse(s));
      } catch {}
      setLoaded(true);
  }, []);

  useEffect(() => { if (loaded && isAdmin) { try { localStorage.setItem("parkdale-cmd-v2-tasks", JSON.stringify(taskStatus)); } catch {} } }, [taskStatus, loaded, isAdmin]);
  useEffect(() => { if (loaded && isAdmin) { try { localStorage.setItem("parkdale-cmd-v2-subs", JSON.stringify(subtaskStatus)); } catch {} } }, [subtaskStatus, loaded, isAdmin]);

  const toggleTask = useCallback((id) => {
    if (!isAdmin) return;
    setTaskStatus(prev => {
      const c = prev[id] || "not_started";
      const n = c === "not_started" ? "in_progress" : c === "in_progress" ? "complete" : "not_started";
      return { ...prev, [id]: n };
    });
  }, []);
  const toggleSubtask = useCallback((taskId, idx) => {
    if (!isAdmin) return;
    setSubtaskStatus(prev => ({ ...prev, [`${taskId}-${idx}`]: !prev[`${taskId}-${idx}`] }));
  }, []);
  const toggleExpand = useCallback((id) => { setExpandedTasks(prev => ({ ...prev, [id]: !prev[id] })); }, []);
  const getStatus = (id) => taskStatus[id] || "not_started";
  const filteredTasks = useMemo(() => TASKS.filter(t => {
    if (filterTool !== "all" && !t.tools.includes(filterTool)) return false;
    if (filterStatus !== "all" && getStatus(t.id) !== filterStatus) return false;
    return true;
  }), [filterTool, filterStatus, taskStatus]);
  const phaseStats = useMemo(() => { const s = {}; PHASES.forEach(p => { const pt = TASKS.filter(t => t.phase === p.id); const c = pt.filter(t => getStatus(t.id) === "complete").length; s[p.id] = { total: pt.length, completed: c, pct: pt.length > 0 ? Math.round((c / pt.length) * 100) : 0 }; }); return s; }, [taskStatus]);
  const totalStats = useMemo(() => { const c = TASKS.filter(t => getStatus(t.id) === "complete").length; return { total: TASKS.length, completed: c, pct: Math.round((c / TASKS.length) * 100) }; }, [taskStatus]);
  const toolsUsed = useMemo(() => { const s = new Set(); TASKS.forEach(t => t.tools.forEach(tool => s.add(tool))); return Array.from(s).sort(); }, []);
  const canStart = (task) => task.dependencies.length === 0 || task.dependencies.every(d => getStatus(d) === "complete");
  const sC = { not_started: "#B8C0C8", in_progress: "#D4A020", complete: "#3D9970" };
  const sL = { not_started: "Not Started", in_progress: "In Progress", complete: "Complete" };
  const sI = { not_started: "\u25CB", in_progress: "\u25D0", complete: "\u25CF" };
  const resetAll = () => { if (confirm("Reset all progress? Cannot be undone.")) { setTaskStatus({}); setSubtaskStatus({}); try { localStorage.removeItem("parkdale-cmd-v2-tasks"); localStorage.removeItem("parkdale-cmd-v2-subs"); } catch {} } };

  if (!loaded) return <div style={{ background: "#FAF7F2", color: "#6B7B8D", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "monospace" }}>Loading...</div>;

  return (
    <div style={{ background: "#FAF7F2", color: "#2D3436", minHeight: "100vh", fontFamily: "'Inter', system-ui, sans-serif" }}>
      {/* HEADER */}
      <div style={{ borderBottom: "1px solid #E8E0D8", padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 20, fontWeight: 700, fontFamily: "monospace", letterSpacing: "-0.5px" }}><span style={{ color: "#4A90D9" }}>PARKDALE</span> <span style={{ color: "#8A9199" }}>COMMAND CENTER</span></h1>
          <p style={{ margin: 0, fontSize: 11, color: "#8A9199", fontFamily: "monospace", letterSpacing: "1px", textTransform: "uppercase", marginTop: 2 }}>Crowdfunding Campaign Process Map {isAdmin && <span style={{ color: "#3D9970", marginLeft: 8, fontSize: 10, padding: "1px 6px", borderRadius: 4, background: "#3D997015", border: "1px solid #3D997030" }}>EDIT MODE</span>}</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 28, fontWeight: 800, fontFamily: "monospace", color: totalStats.pct === 100 ? "#3D9970" : "#2D3436" }}>{totalStats.pct}%</div>
            <div style={{ fontSize: 10, color: "#8A9199", textTransform: "uppercase", letterSpacing: "1px" }}>{totalStats.completed}/{totalStats.total} Tasks</div>
          </div>
          <div style={{ width: 120, height: 8, background: "#E8E0D8", borderRadius: 4, overflow: "hidden" }}>
            <div style={{ width: `${totalStats.pct}%`, height: "100%", background: "linear-gradient(90deg, #22d3ee, #d946ef)", borderRadius: 4, transition: "width 0.5s" }} />
          </div>
        </div>
      </div>
      {/* NAV */}
      <div style={{ borderBottom: "1px solid #E8E0D8", padding: "8px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
        <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
          {[{ key: "overview", label: "Overview" }, ...PHASES.map(p => ({ key: `phase-${p.id}`, label: `P${p.id}` })), { key: "workflows", label: "Workflows" }].map(nav => (
            <button key={nav.key} onClick={() => setActiveView(nav.key)} style={{ padding: "6px 14px", borderRadius: 6, border: activeView === nav.key ? "1px solid #D4CBC2" : "1px solid transparent", cursor: "pointer", fontSize: 12, fontWeight: 600, fontFamily: "monospace", background: activeView === nav.key ? "#FFFFFF" : "transparent", color: activeView === nav.key ? "#2D3436" : "#8A9199", boxShadow: activeView === nav.key ? "0 1px 3px rgba(0,0,0,0.08)" : "none", transition: "all 0.15s" }}
              onMouseEnter={e => { if (activeView !== nav.key) { e.currentTarget.style.background = "#F5F0EA"; e.currentTarget.style.color = "#2D3436"; } }}
              onMouseLeave={e => { if (activeView !== nav.key) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#8A9199"; } }}
            >{nav.label}</button>
          ))}
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
          <select value={filterTool} onChange={e => setFilterTool(e.target.value)} style={{ background: "#FFFFFF", color: "#2D3436", border: "1px solid #D4CBC2", borderRadius: 6, padding: "4px 8px", fontSize: 11, fontFamily: "monospace" }}>
            <option value="all">All Tools</option>
            {toolsUsed.map(t => <option key={t} value={t}>{TOOLS[t]?.icon} {TOOLS[t]?.name}</option>)}
          </select>
          <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} style={{ background: "#FFFFFF", color: "#2D3436", border: "1px solid #D4CBC2", borderRadius: 6, padding: "4px 8px", fontSize: 11, fontFamily: "monospace" }}>
            <option value="all">All Status</option>
            <option value="not_started">Not Started</option>
            <option value="in_progress">In Progress</option>
            <option value="complete">Complete</option>
          </select>
          <button onClick={() => setShowDataFlow(!showDataFlow)} style={{ padding: "4px 10px", borderRadius: 6, border: `1px solid ${showDataFlow ? "#4A90D9" : "#D4CBC2"}`, background: showDataFlow ? "#4A90D915" : "#FFFFFF", color: showDataFlow ? "#4A90D9" : "#8A9199", cursor: "pointer", fontSize: 11, fontFamily: "monospace", transition: "all 0.15s" }}
            onMouseEnter={e => { if (!showDataFlow) { e.currentTarget.style.background = "#F5F0EA"; e.currentTarget.style.color = "#2D3436"; } }}
            onMouseLeave={e => { if (!showDataFlow) { e.currentTarget.style.background = "#FFFFFF"; e.currentTarget.style.color = "#8A9199"; } }}
          >{showDataFlow ? "\u25C6 Hide" : "\u25C7 Show"} Data Inputs/Outputs</button>
          {isAdmin && <button onClick={resetAll} style={{ padding: "4px 10px", borderRadius: 6, border: "1px solid #D4CBC2", background: "transparent", color: "#C74848", cursor: "pointer", fontSize: 11, fontFamily: "monospace" }}>Reset</button>}
        </div>
      </div>
      {/* MAIN */}
      <div style={{ padding: 24 }}>
        {!isAdmin && <div style={{ marginBottom: 16, padding: "10px 16px", background: "#F0EBE4", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "space-between", border: "1px solid #E8E0D8" }}>
          <span style={{ fontSize: 12, color: "#6B7B8D" }}>You are viewing the Parkdale Campaign Command Center in read-only mode.</span>
        </div>}
        {activeView === "overview" && <OverviewView phases={PHASES} phaseStats={phaseStats} tasks={TASKS} getStatus={getStatus} setActiveView={setActiveView} showDataFlow={showDataFlow} canStart={canStart} />}
        {activeView.startsWith("phase-") && <PhaseDetailView phase={PHASES.find(p => p.id === parseInt(activeView.split("-")[1]))} tasks={filteredTasks.filter(t => t.phase === parseInt(activeView.split("-")[1]))} allTasks={TASKS} getStatus={getStatus} toggleTask={toggleTask} toggleExpand={toggleExpand} expandedTasks={expandedTasks} canStart={canStart} showDataFlow={showDataFlow} isAdmin={isAdmin} subtaskStatus={subtaskStatus} toggleSubtask={toggleSubtask} setActiveView={setActiveView} isAdmin={isAdmin} sC={sC} sL={sL} sI={sI} />}
        {activeView === "workflows" && <WorkflowsView workflows={STACKING_WORKFLOWS} />}
      </div>
    </div>
  );
}

// ─── OVERVIEW ───
function OverviewView({ phases, phaseStats, tasks, getStatus, setActiveView, showDataFlow, canStart }) {
  return (<div>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16, marginBottom: 32 }}>
      {phases.map(phase => {
        const stats = phaseStats[phase.id]; const pt = tasks.filter(t => t.phase === phase.id); const crit = pt.filter(t => t.critical);
        const blocked = pt.filter(t => !canStart(t) && getStatus(t.id) === "not_started").length;
        const ready = pt.filter(t => canStart(t) && getStatus(t.id) === "not_started").length;
        const tSet = new Set(); pt.forEach(t => t.tools.forEach(tool => tSet.add(tool)));
        return (
          <div key={phase.id} onClick={() => setActiveView(`phase-${phase.id}`)} style={{ background: "#FFFFFF", border: `1px solid ${stats.pct === 100 ? "#3D997040" : "#E8E0D8"}`, borderRadius: 12, padding: 20, cursor: "pointer", transition: "all 0.25s ease", position: "relative", overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = phase.color; e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 4px 12px ${phase.color}20`; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = stats.pct === 100 ? "#3D997040" : "#E8E0D8"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.06)"; }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: phase.color, opacity: 0.8 }} />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
              <div><div style={{ fontSize: 10, color: phase.color, fontFamily: "monospace", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 4 }}>Phase {phase.id} · {phase.weeks}</div><h3 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>{phase.name}</h3></div>
              <div style={{ fontSize: 24, fontWeight: 800, fontFamily: "monospace", color: stats.pct === 100 ? "#3D9970" : "#2D3436" }}>{stats.pct}%</div>
            </div>
            <p style={{ margin: "0 0 16px", fontSize: 12, color: "#6B7B8D", lineHeight: 1.5 }}>{phase.description}</p>
            <div style={{ width: "100%", height: 6, background: "#E8E0D8", borderRadius: 3, marginBottom: 16 }}><div style={{ width: `${stats.pct}%`, height: "100%", background: phase.color, borderRadius: 3, transition: "width 0.5s" }} /></div>
            <div style={{ display: "flex", gap: 16, fontSize: 11, color: "#6B7B8D", marginBottom: 12 }}>
              <span><span style={{ color: "#4A90D9" }}>{"\u25CF"}</span> {stats.completed} done</span>
              {ready > 0 && <span><span style={{ color: "#C4883D" }}>{"\u25D0"}</span> {ready} ready</span>}
              {blocked > 0 && <span><span style={{ color: "#D4A853" }}>{"\u25C7"}</span> {blocked} blocked</span>}
            </div>
            {crit.length > 0 && <div style={{ marginBottom: 12 }}><div style={{ fontSize: 10, color: "#8A9199", textTransform: "uppercase", letterSpacing: "1px", marginBottom: 6 }}>Critical Path</div>
              {crit.map(t => <div key={t.id} style={{ fontSize: 12, color: getStatus(t.id) === "complete" ? "#3D9970" : "#2D3436", marginBottom: 4, display: "flex", alignItems: "center", gap: 6 }}><span style={{ color: getStatus(t.id) === "complete" ? "#3D9970" : getStatus(t.id) === "in_progress" ? "#C4883D" : "#A0A8B0" }}>{getStatus(t.id) === "complete" ? "\u25CF" : getStatus(t.id) === "in_progress" ? "\u25D0" : "\u25CB"}</span>{t.title}</div>)}
            </div>}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>{Array.from(tSet).map(tool => <span key={tool} style={{ fontSize: 10, padding: "2px 6px", borderRadius: 4, background: `${TOOLS[tool]?.color}15`, color: TOOLS[tool]?.color, fontFamily: "monospace" }}>{TOOLS[tool]?.icon} {TOOLS[tool]?.name}</span>)}</div>
            <div style={{ marginTop: 14, padding: "8px 12px", background: `${phase.color}10`, border: `1px solid ${phase.color}25`, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, color: phase.color, fontSize: 12, fontWeight: 600, fontFamily: "monospace" }}>View {stats.total} Tasks {"\u2192"}</div>
          </div>);
      })}
    </div>
    {showDataFlow && <div style={{ background: "#FFFFFF", border: "1px solid #E8E0D8", borderRadius: 12, padding: 24, marginBottom: 24 }}>
      <h3 style={{ margin: "0 0 4px", fontSize: 14, fontFamily: "monospace", color: "#4A90D9" }}>Cross-Phase Data Flow</h3>
      <p style={{ margin: "0 0 16px", fontSize: 12, color: "#8A9199" }}>What data moves between each phase of the campaign</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
        {phases.map((phase, idx) => {
          const arrows = ["Tiers, copy, renders, prospect CSVs, GHL pipeline", "Pitch deck, Instantly campaigns, email sequences, concierge bot", "Performance data, campaign metrics, remaining tier inventory"];
          return (<React.Fragment key={phase.id}>
            <div style={{ background: "#FAF7F2", border: `1px solid ${phase.color}40`, borderRadius: 8, padding: 14, display: "flex", gap: 12, alignItems: "center" }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: `${phase.color}18`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 800, color: phase.color, fontFamily: "monospace", flexShrink: 0 }}>{phase.id}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#2D3436" }}>{phase.name}</div>
                <div style={{ fontSize: 11, color: "#6B7B8D", marginTop: 2 }}>{phase.id === 1 && "Intel, strategy, tiers, copy, renders, landing page, CRM"}{phase.id === 2 && "Pitch deck, emails, outreach, AI concierge, stress-test"}{phase.id === 3 && "Live automations, outreach, content, monitoring"}{phase.id === 4 && "Urgency copy, scarcity triggers, full-court press"}</div>
              </div>
            </div>
            {idx < 3 && <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 0 6px 16px" }}>
              <div style={{ fontSize: 16, color: phase.color }}>{"\u2193"}</div>
              <div style={{ fontSize: 11, color: "#8A9199", fontFamily: "monospace", fontStyle: "italic" }}>{arrows[idx]}</div>
            </div>}
          </React.Fragment>);
        })}
      </div>
    </div>}
    <div style={{ background: "#FFFFFF", border: "1px solid #E8E0D8", borderRadius: 12, padding: 16 }}>
      <h3 style={{ margin: "0 0 12px", fontSize: 12, fontFamily: "monospace", color: "#8A9199", textTransform: "uppercase", letterSpacing: "1px" }}>Tool Stack</h3>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>{Object.entries(TOOLS).filter(([k]) => TASKS.some(t => t.tools.includes(k))).map(([key, tool]) => (
        <a key={key} href={tool.link || "#"} target={tool.link ? "_blank" : undefined} rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 12px", borderRadius: 6, background: `${tool.color}10`, border: `1px solid ${tool.color}30`, textDecoration: "none", color: tool.color, fontSize: 11, fontFamily: "monospace" }}><span>{tool.icon}</span> {tool.name} {tool.link && <span style={{ fontSize: 9, opacity: 0.5 }}>{"\u2197"}</span>}</a>
      ))}</div>
    </div>
  </div>);
}

// ─── PHASE DETAIL ───
function PhaseDetailView({ phase, tasks, allTasks, getStatus, toggleTask, toggleExpand, expandedTasks, canStart, showDataFlow, subtaskStatus, toggleSubtask, setActiveView, sC, sL, sI, isAdmin }) {
  if (!phase) return null;
  return (<div>
    <div style={{ marginBottom: 24 }}>
      <button onClick={() => setActiveView("overview")} style={{ background: "#F5F0EA", border: "1px solid #E8E0D8", color: "#6B7B8D", cursor: "pointer", fontSize: 12, fontFamily: "monospace", padding: "6px 14px", marginBottom: 12, borderRadius: 6, transition: "all 0.15s" }}
        onMouseEnter={e => { e.currentTarget.style.background = "#E8E0D8"; e.currentTarget.style.color = "#2D3436"; }}
        onMouseLeave={e => { e.currentTarget.style.background = "#F5F0EA"; e.currentTarget.style.color = "#6B7B8D"; }}
      >{"\u2190"} Back to Overview</button>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div style={{ width: 4, height: 40, background: phase.color, borderRadius: 2 }} />
        <div><div style={{ fontSize: 10, color: phase.color, fontFamily: "monospace", letterSpacing: "1.5px", textTransform: "uppercase" }}>Phase {phase.id} · {phase.weeks}</div><h2 style={{ margin: 0, fontSize: 22, fontWeight: 700 }}>{phase.name}</h2></div>
      </div>
    </div>
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {tasks.map(task => {
        const status = getStatus(task.id); const expanded = expandedTasks[task.id]; const ready = canStart(task); const blocked = !ready && status === "not_started";
        const completedSubs = task.subtasks.filter((_, i) => subtaskStatus[`${task.id}-${i}`]).length;
        return (<div key={task.id} style={{ background: "#FFFFFF", border: `1px solid ${blocked ? "#C7484830" : status === "complete" ? "#3D997030" : "#E8E0D8"}`, borderRadius: 10, overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.06)", transition: "border-color 0.2s" }}
            onMouseEnter={e => { if (!expanded) e.currentTarget.style.borderColor = "#B8C0C8"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = blocked ? "#C7484830" : status === "complete" ? "#3D997030" : "#E8E0D8"; }}>
          <div style={{ padding: "14px 16px", cursor: "pointer", transition: "background 0.15s", borderRadius: expanded ? "10px 10px 0 0" : 10 }} onClick={() => toggleExpand(task.id)}
            onMouseEnter={e => { e.currentTarget.style.background = "#F9F6F1"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <button onClick={e => { e.stopPropagation(); if (!blocked) toggleTask(task.id); }}
                style={{ width: 28, height: 28, borderRadius: 8, border: `2px solid ${blocked ? "#A0A8B0" : sC[status]}`, background: status === "complete" ? "#3D997020" : status === "in_progress" ? "#D4A85320" : "transparent", color: sC[status], cursor: (blocked || !isAdmin) ? "not-allowed" : "pointer", fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, opacity: blocked ? 0.4 : 1 }}
                title={blocked ? "Blocked" : `Click to cycle: ${sL[status]}`}>{sI[status]}</button>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: status === "complete" ? "#3D9970" : blocked ? "#8A9199" : "#2D3436" }}>{task.title}</span>
                  {task.critical && <span style={{ fontSize: 9, padding: "1px 6px", borderRadius: 4, background: "#C7484815", color: "#C74848", fontFamily: "monospace", fontWeight: 600 }}>CRITICAL</span>}
                  {blocked && <span style={{ fontSize: 9, padding: "1px 6px", borderRadius: 4, background: "#C7484815", color: "#6B7B8D", fontFamily: "monospace" }}>BLOCKED</span>}
                  {ready && status === "not_started" && !blocked && <span style={{ fontSize: 9, padding: "1px 6px", borderRadius: 4, background: "#2E8B6E15", color: "#4A90D9", fontFamily: "monospace" }}>READY</span>}
                </div>
                <div style={{ display: "flex", gap: 6, marginTop: 6, flexWrap: "wrap" }}>
                  {task.tools.map(t => <span key={t} style={{ fontSize: 10, padding: "1px 6px", borderRadius: 4, background: `${TOOLS[t]?.color}12`, color: TOOLS[t]?.color, fontFamily: "monospace" }}>{TOOLS[t]?.icon} {TOOLS[t]?.name}</span>)}
                  {task.subtasks.length > 0 && <span style={{ fontSize: 10, color: "#8A9199", fontFamily: "monospace" }}>{completedSubs}/{task.subtasks.length} subtasks</span>}
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 4, flexShrink: 0, padding: "4px 8px", borderRadius: 6, background: expanded ? "#2E8B6E10" : "#F5F0EA", transition: "all 0.2s" }}>
                <span style={{ fontSize: 10, color: expanded ? "#2E8B6E" : "#8A9199", fontFamily: "monospace" }}>{expanded ? "Collapse" : "Expand"}</span>
                <span style={{ fontSize: 14, color: expanded ? "#2E8B6E" : "#8A9199", transform: expanded ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>{"\u25BE"}</span>
              </div>
            </div>
            {/* APPLIED TO — always visible */}
            <div style={{ marginTop: 10, marginLeft: 40, padding: "8px 12px", background: "#F5F0EA", borderLeft: "3px solid #C4883D40", borderRadius: "0 6px 6px 0" }}>
              <div style={{ fontSize: 10, color: "#C4883D", fontFamily: "monospace", letterSpacing: "1px", textTransform: "uppercase", marginBottom: 4, fontWeight: 600 }}>{"\u21B3"} Applied To</div>
              <div style={{ fontSize: 12, color: "#3D4852", lineHeight: 1.6 }}>{task.usedFor}</div>
            </div>
          </div>
          {expanded && <div style={{ borderTop: "1px solid #E8E0D8", padding: 16 }}>
            <p style={{ margin: "0 0 16px", fontSize: 13, color: "#6B7B8D", lineHeight: 1.6 }}>{task.description}</p>
            {/* Downstream detail */}
            {task.appliedTo && task.appliedTo.length > 0 && task.appliedTo[0].task !== null && <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 10, color: "#C4883D", textTransform: "uppercase", letterSpacing: "1px", marginBottom: 8, fontFamily: "monospace", fontWeight: 600 }}>Downstream Usage Detail</div>
              {task.appliedTo.filter(a => a.task).map((a, i) => { const target = allTasks.find(t => t.id === a.task); return (
                <div key={i} style={{ padding: "8px 10px", background: "#FAF7F2", borderRadius: 6, borderLeft: "3px solid #C4883D30", marginBottom: 6 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}><span style={{ fontSize: 10, color: "#C4883D", fontFamily: "monospace", fontWeight: 700 }}>{a.task}</span><span style={{ fontSize: 12, fontWeight: 600, color: "#3D4852" }}>{target?.title || ""}</span></div>
                  <div style={{ fontSize: 11, color: "#6B7B8D", lineHeight: 1.5 }}>{a.how}</div>
                </div>); })}
            </div>}
            {task.appliedTo && task.appliedTo.length > 0 && task.appliedTo[0].task === null && <div style={{ marginBottom: 16, padding: "8px 10px", background: "#FAF7F2", borderRadius: 6, borderLeft: "3px solid #3D997030" }}>
              <div style={{ fontSize: 10, color: "#3D9970", textTransform: "uppercase", letterSpacing: "1px", marginBottom: 4, fontFamily: "monospace", fontWeight: 600 }}>Endpoint</div>
              <div style={{ fontSize: 11, color: "#6B7B8D", lineHeight: 1.5 }}>{task.appliedTo[0].how}</div>
            </div>}
            {/* Dependencies */}
            {task.dependencies.length > 0 && <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 10, color: "#8A9199", textTransform: "uppercase", letterSpacing: "1px", marginBottom: 8, fontFamily: "monospace" }}>Dependencies</div>
              {task.dependencies.map(depId => { const dep = allTasks.find(t => t.id === depId); if (!dep) return null; const ds = getStatus(depId); return (
                <div key={depId} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, padding: "4px 8px", borderRadius: 6, background: "#FAF7F2", marginBottom: 4 }}>
                  <span style={{ color: sC[ds] }}>{sI[ds]}</span><span style={{ color: ds === "complete" ? "#4A90D9" : "#6B7B8D" }}>{dep.title}</span><span style={{ fontSize: 10, color: "#A0A8B0", fontFamily: "monospace" }}>{dep.id}</span>
                </div>); })}
            </div>}
            {/* Data flow */}
            {showDataFlow && (task.dataIn?.length > 0 || task.dataOut?.length > 0) && <div style={{ marginBottom: 16, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {task.dataIn?.length > 0 && <div><div style={{ fontSize: 10, color: "#3D9970", textTransform: "uppercase", letterSpacing: "1px", marginBottom: 8, fontFamily: "monospace" }}>{"\u2B07"} Data In</div>
                {task.dataIn.map((d, i) => <div key={i} style={{ fontSize: 11, color: "#6B7B8D", marginBottom: 6, padding: "6px 8px", background: "#FAF7F2", borderRadius: 6, borderLeft: "2px solid #2E8B6E40" }}><div style={{ fontWeight: 600, color: "#3D4852" }}>{d.label}</div><div style={{ fontSize: 10, color: "#8A9199", fontFamily: "monospace" }}>{d.format}{d.from && ` \u2190 ${d.from}`}</div></div>)}</div>}
              {task.dataOut?.length > 0 && <div><div style={{ fontSize: 10, color: "#D4855A", textTransform: "uppercase", letterSpacing: "1px", marginBottom: 8, fontFamily: "monospace" }}>{"\u2B06"} Data Out</div>
                {task.dataOut.map((d, i) => <div key={i} style={{ fontSize: 11, color: "#6B7B8D", marginBottom: 6, padding: "6px 8px", background: "#FAF7F2", borderRadius: 6, borderLeft: "2px solid #D4855A40" }}><div style={{ fontWeight: 600, color: "#3D4852" }}>{d.label}</div><div style={{ fontSize: 10, color: "#8A9199", fontFamily: "monospace" }}>{d.format}{d.dest?.length > 0 && ` \u2192 ${d.dest.join(", ")}`}</div></div>)}</div>}
            </div>}
            {/* Subtasks */}
            {task.subtasks.length > 0 && <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 10, color: "#8A9199", textTransform: "uppercase", letterSpacing: "1px", marginBottom: 8, fontFamily: "monospace" }}>Subtasks</div>
              {task.subtasks.map((sub, i) => { const done = subtaskStatus[`${task.id}-${i}`]; return (
                <div key={i} onClick={e => { e.stopPropagation(); toggleSubtask(task.id, i); }} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, padding: "6px 8px", borderRadius: 6, background: "#FAF7F2", cursor: "pointer", color: done ? "#4A90D9" : "#6B7B8D", marginBottom: 4 }}>
                  <span style={{ width: 16, height: 16, borderRadius: 4, border: `1.5px solid ${done ? "#3D9970" : "#B8C0C8"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, flexShrink: 0, background: done ? "#3D997020" : "transparent" }}>{done ? "\u2713" : ""}</span>
                  <span style={{ textDecoration: done ? "line-through" : "none", opacity: done ? 0.6 : 1 }}>{sub}</span>
                </div>); })}
            </div>}
            {/* Prompt */}
            {task.prompt && <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 10, color: "#8A9199", textTransform: "uppercase", letterSpacing: "1px", marginBottom: 8, fontFamily: "monospace" }}>Ready-to-Use Prompt</div>
              <div style={{ fontSize: 12, color: "#6B7B8D", padding: 12, background: "#FAF7F2", borderRadius: 8, border: "1px solid #E8E0D8", fontFamily: "monospace", lineHeight: 1.6, whiteSpace: "pre-wrap", maxHeight: 200, overflow: "auto" }}>{task.prompt}</div>
            </div>}
            {/* Tool links */}
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {task.tools.map(t => TOOLS[t]?.link && <a key={t} href={TOOLS[t].link} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 4, padding: "4px 10px", borderRadius: 6, background: `${TOOLS[t].color}10`, border: `1px solid ${TOOLS[t].color}30`, color: TOOLS[t].color, textDecoration: "none", fontSize: 11, fontFamily: "monospace" }}>{TOOLS[t].icon} Open {TOOLS[t].name} {"\u2197"}</a>)}
            </div>
          </div>}
        </div>);
      })}
    </div>
  </div>);
}

// ─── WORKFLOWS ───
function WorkflowsView({ workflows }) {
  const [expandedWf, setExpandedWf] = useState(workflows[0]?.id);
  return (<div>
    <div style={{ marginBottom: 24 }}><h2 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>Tool Stacking Workflows</h2><p style={{ margin: "8px 0 0", fontSize: 13, color: "#6B7B8D" }}>How tools chain together for maximum impact. Each workflow shows the exact data handoff between tools.</p></div>
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {workflows.map(wf => { const expanded = expandedWf === wf.id; return (
        <div key={wf.id} style={{ background: "#FFFFFF", border: "1px solid #E8E0D8", borderRadius: 12, overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
          <div onClick={() => setExpandedWf(expanded ? null : wf.id)} style={{ padding: "16px 20px", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", transition: "background 0.15s" }}
            onMouseEnter={e => { e.currentTarget.style.background = "#F9F6F1"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}>
            <div><div style={{ fontSize: 16, fontWeight: 700 }}>{wf.name}</div><div style={{ fontSize: 12, color: "#6B7B8D", marginTop: 4 }}><span style={{ fontFamily: "monospace", fontSize: 10, color: "#8A9199" }}>{wf.phase}</span><span style={{ margin: "0 8px", color: "#D4CBC2" }}>{"\u00B7"}</span>{wf.description}</div></div>
            <div style={{ display: "flex", alignItems: "center", gap: 4, flexShrink: 0, padding: "4px 8px", borderRadius: 6, background: expanded ? "#2E8B6E10" : "#F5F0EA" }}>
              <span style={{ fontSize: 10, color: expanded ? "#2E8B6E" : "#8A9199", fontFamily: "monospace" }}>{expanded ? "Collapse" : "Expand"}</span>
              <span style={{ fontSize: 14, color: expanded ? "#2E8B6E" : "#8A9199", transform: expanded ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>{"\u25BE"}</span>
            </div>
          </div>
          {expanded && <div style={{ borderTop: "1px solid #E8E0D8", padding: 20 }}>
            {wf.steps.map((step, idx) => { const tool = TOOLS[step.tool]; return (
              <div key={idx}><div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: `${tool?.color}15`, border: `1.5px solid ${tool?.color}40`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>{tool?.icon}</div>
                  {idx < wf.steps.length - 1 && <div style={{ width: 2, height: 32, background: "#E8E0D8", margin: "4px 0" }} />}
                </div>
                <div style={{ paddingBottom: idx < wf.steps.length - 1 ? 12 : 0 }}>
                  <div style={{ fontSize: 10, color: tool?.color, fontFamily: "monospace", marginBottom: 2 }}>{tool?.name}</div>
                  <div style={{ fontSize: 13, color: "#2D3436", fontWeight: 500, marginBottom: 4 }}>{step.label}</div>
                  <div style={{ fontSize: 11, color: "#8A9199", fontFamily: "monospace" }}>{"\u21B3"} {step.data}</div>
                </div>
              </div></div>); })}
          </div>}
        </div>); })}
    </div>
  </div>);
}
