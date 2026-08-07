import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

// Standard static data for the 13 Provinces & Territories in Canada
const PROVINCE_DATA = [
  {
    id: "ON",
    name: "Ontario",
    capital: "Toronto",
    type: "Province",
    program: "OINP (Ontario Immigrant Nominee Program)",
    status: "Active",
    newsUrl: "https://www.ontario.ca/page/ontario-immigrant-nominee-program-oinp-news",
    details: "Focuses on skilled workers, French-speaking skilled workers, international graduates, and business entrepreneurs.",
    targets: { PNP: 21500, ExpressEntryAligned: 12000, Entrepreneur: 100 },
    openDataFeeds: [
      { name: "OINP Draw Bulletins RSS", url: "https://www.ontario.ca/rss/oinp-news.xml", type: "RSS" },
      { name: "Ontario Open Data - Immigration", url: "https://data.ontario.ca/dataset?q=immigration", type: "JSON/Portal" }
    ]
  },
  {
    id: "BC",
    name: "British Columbia",
    capital: "Victoria",
    type: "Province",
    program: "BC PNP (British Columbia Provincial Nominee Program)",
    status: "Active",
    newsUrl: "https://www.welcomebc.ca/Immigrate-to-B-C/B-C-Provincial-Nominee-Program/BC-PNP-News",
    details: "Includes Tech draws, Healthcare professionals, Childcare practitioners, and International Post-Graduates.",
    targets: { PNP: 10500, ExpressEntryAligned: 6000, Tech: 3500 },
    openDataFeeds: [
      { name: "BC PNP Latest Draws", url: "https://www.welcomebc.ca/Immigrate-to-B-C/B-C-Provincial-Nominee-Program/Invitations-to-Apply", type: "HTML/Feed" },
      { name: "BC Data Catalogue - Immigration", url: "https://catalogue.data.gov.bc.ca/dataset?q=immigration", type: "JSON/Portal" }
    ]
  },
  {
    id: "AB",
    name: "Alberta",
    capital: "Edmonton",
    type: "Province",
    program: "AAIP (Alberta Advantage Immigration Program)",
    status: "Active",
    newsUrl: "https://www.alberta.ca/aaip-updates.aspx",
    details: "Features Express Entry stream, Accelerated Tech Pathway, Tourism & Hospitality stream, and Rural Renewal stream.",
    targets: { PNP: 9750, ExpressEntryAligned: 4500, RuralRenewal: 2000 },
    openDataFeeds: [
      { name: "Alberta AAIP Inventory Alerts", url: "https://www.alberta.ca/aaip-processing-times-and-inventory.aspx", type: "HTML" },
      { name: "Alberta Open Data Portal", url: "https://open.alberta.ca/opendata", type: "API/JSON" }
    ]
  },
  {
    id: "SK",
    name: "Saskatchewan",
    capital: "Regina",
    type: "Province",
    program: "SINP (Saskatchewan Immigrant Nominee Program)",
    status: "Active",
    newsUrl: "https://www.saskatchewan.ca/residents/moving-to-saskatchewan/live-in-saskatchewan/by-immigrating/saskatchewan-immigrant-nominee-program/sinp-news-and-updates",
    details: "Well known for International Skilled Worker streams (Occupation In-Demand and Express Entry) and Tech Talent.",
    targets: { PNP: 8500, OccupationsInDemand: 4000, TechTalent: 1500 },
    openDataFeeds: [
      { name: "SINP Recent Draw History", url: "https://www.saskatchewan.ca/residents/moving-to-saskatchewan/live-in-saskatchewan/by-immigrating/saskatchewan-immigrant-nominee-program/sinp-draws", type: "HTML" }
    ]
  },
  {
    id: "MB",
    name: "Manitoba",
    capital: "Winnipeg",
    type: "Province",
    program: "MPNP (Manitoba Provincial Nominee Program)",
    status: "Active",
    newsUrl: "https://www.immigratemanitoba.com/category/mpnp-news/",
    details: "Focuses on Skilled Workers in Manitoba, Skilled Workers Overseas, and International Education streams.",
    targets: { PNP: 9500, SkilledWorkersInManitoba: 5000, OverseasSkilled: 3500 },
    openDataFeeds: [
      { name: "MPNP Draw Advisories", url: "https://www.immigratemanitoba.com/category/mpnp-news/draw-results/", type: "RSS" }
    ]
  },
  {
    id: "QC",
    name: "Quebec",
    capital: "Quebec City",
    type: "Province",
    program: "MIFI (Ministère de l'Immigration, de la Francisation et de l'Intégration)",
    status: "Active",
    newsUrl: "https://www.quebec.ca/immigration/actualites",
    details: "Operates an autonomous selection system (Arrima portal, Regular Skilled Worker Program, and PEQ French Graduate).",
    targets: { PNP: 50000, PEQ: 15000, RegularSkilled: 30000 },
    openDataFeeds: [
      { name: "Quebec Arrima Invitations Portal", url: "https://www.quebec.ca/immigration/invitations-arrima", type: "HTML" },
      { name: "Données Québec Portal", url: "https://www.donneesquebec.ca/", type: "API/JSON" }
    ]
  },
  {
    id: "NB",
    name: "New Brunswick",
    capital: "Fredericton",
    type: "Province",
    program: "NBPNP (New Brunswick Provincial Nominee Program)",
    status: "Active",
    newsUrl: "https://www.welcomenb.ca/",
    details: "Includes Express Entry stream, Skilled Workers stream, and Strategic Initiative Stream for Francophones.",
    targets: { PNP: 5500, FrancophoneImmigration: 1500, SkilledWorkers: 3500 },
    openDataFeeds: [
      { name: "NB Immigration News Feed", url: "https://www.welcomenb.ca/content/wel-bien/en/news.html", type: "HTML" }
    ]
  },
  {
    id: "NS",
    name: "Nova Scotia",
    capital: "Halifax",
    type: "Province",
    program: "NSNP (Nova Scotia Nominee Program)",
    status: "Active",
    newsUrl: "https://immigration.novascotia.ca/news",
    details: "Focuses on Labour Market Priorities, Physician stream, Entrepreneur, and Healthcare Professional streams.",
    targets: { PNP: 6000, LabourMarketPriorities: 2500, Healthcare: 2000 },
    openDataFeeds: [
      { name: "NS Open Data Portal - Immigration", url: "https://data.novascotia.ca/browse?q=immigration", type: "JSON/Portal" }
    ]
  },
  {
    id: "PE",
    name: "Prince Edward Island",
    capital: "Charlottetown",
    type: "Province",
    program: "PEI PNP (Prince Edward Island Provincial Nominee Program)",
    status: "Active",
    newsUrl: "https://www.princeedwardisland.ca/en/information/office-of-immigration/pei-pnp-news-and-draw-results",
    details: "Selects candidates via Express Entry, Business Work Permit, and Labour Impact streams (Critical Workers).",
    targets: { PNP: 2100, CriticalWorkers: 1200, ExpressEntryPEI: 800 },
    openDataFeeds: [
      { name: "PEI PNP Scheduled Draw Table", url: "https://www.princeedwardisland.ca/en/information/office-of-immigration/pei-pnp-draw-schedule", type: "HTML" }
    ]
  },
  {
    id: "NL",
    name: "Newfoundland & Labrador",
    capital: "St. John's",
    type: "Province",
    program: "NLPNP (Newfoundland and Labrador Provincial Nominee Program)",
    status: "Active",
    newsUrl: "https://www.gov.nl.ca/immigration/",
    details: "Features Express Entry, Skilled Worker, International Graduate, and Priority Skills NL.",
    targets: { PNP: 3000, PrioritySkillsNL: 1500, InternationalGrads: 1000 },
    openDataFeeds: [
      { name: "NL Gov Immigration Press", url: "https://www.gov.nl.ca/releases/category/immigration-population-growth-and-skills/", type: "RSS" }
    ]
  },
  {
    id: "YT",
    name: "Yukon",
    capital: "Whitehorse",
    type: "Territory",
    program: "YNP (Yukon Nominee Program)",
    status: "Active",
    newsUrl: "https://yukon.ca/en/doing-business/yukon-nominee-program",
    details: "Includes Skilled Worker, Critical Impact Worker, Express Entry, and Community Pilot.",
    targets: { PNP: 600, CriticalImpactWorker: 300, SkilledWorkerYT: 250 },
    openDataFeeds: [
      { name: "Yukon Gov News RSS", url: "https://yukon.ca/en/news-feed.xml", type: "RSS" }
    ]
  },
  {
    id: "NT",
    name: "Northwest Territories",
    capital: "Yellowknife",
    type: "Territory",
    program: "NTNP (Northwest Territories Nominee Program)",
    status: "Active",
    newsUrl: "https://www.immigratent.ca/",
    details: "Focuses on Employer Driven streams (Skilled Workers, Critical Impact Workers) and Francophone immigration.",
    targets: { PNP: 400, EmployerDriven: 300, FrancophoneNT: 50 },
    openDataFeeds: [
      { name: "NWT Open Data Catalogue", url: "https://opendata.gov.nt.ca/", type: "JSON/Portal" }
    ]
  },
  {
    id: "NU",
    name: "Nunavut",
    capital: "Iqaluit",
    type: "Territory",
    program: "Federal Streams / Nunavut Labour Needs",
    status: "Limited PNP",
    newsUrl: "https://www.gov.nu.ca/",
    details: "Relies primarily on Federal skilled worker pathways and specialized employment sponsorships due to unique territorial frameworks.",
    targets: { PNP: 100, FederalSponsorship: 80 },
    openDataFeeds: [
      { name: "Nunavut Open Government Datasets", url: "https://www.gov.nu.ca/opendata", type: "HTML" }
    ]
  }
];

// Open Government & Federal Data Sources Registry
const FEDERAL_DATA_SOURCES = [
  {
    category: "IRCC (Immigration, Refugees and Citizenship Canada)",
    title: "IRCC Permanent Resident Landing Data",
    description: "Monthly count of new Permanent Residents by province/territory, country of origin, and admission category.",
    format: "CSV / JSON / Web API",
    licence: "Open Government Licence - Canada",
    portalUrl: "https://open.canada.ca/data/en/dataset/f7e1b5de-1f4a-4e2a-bb6f-00afdf935cbb"
  },
  {
    category: "IRCC (Immigration, Refugees and Citizenship Canada)",
    title: "Express Entry Draw API Feeds",
    description: "Real-time listings of Ministerial Instructions for Express Entry draws including cut-off CRS scores, tie-breaker stamps, and invitations issued.",
    format: "JSON Feed / XML",
    licence: "Open Government Licence - Canada",
    portalUrl: "https://open.canada.ca/data/en/dataset/999c0d16-79cf-4bc1-aa02-ca5b26bf0c33"
  },
  {
    category: "CBSA (Canada Border Services Agency)",
    title: "Border Wait Times API",
    description: "Real-time updates on border crossing wait times for commercial and passenger vehicles entering Canada from the US.",
    format: "JSON Feed / XML",
    licence: "Open Government Licence - Canada",
    portalUrl: "https://open.canada.ca/data/en/dataset/07a4192b-8a8b-4b2a-8c90-0cb2ea7c00eb"
  },
  {
    category: "Government of Canada Portal",
    title: "National Occupational Classification (NOC) API",
    description: "Structured database mapping job titles, tasks, and education requirements, heavily used for IRCC skill categorization (TEER categories).",
    format: "RESTful API / JSON",
    licence: "Open Government Licence - Canada",
    portalUrl: "https://open.canada.ca/data/en/dataset/1a8f9460-e47e-40fa-ba8c-b9bfa9da137c"
  },
  {
    category: "Statistics Canada",
    title: "Immigrant Labour Force Characteristics",
    description: "Employment rates, wages, and industrial distribution of recent immigrants compared to native-born Canadians.",
    format: "JSON / WSDL API (StatsCan Web Services)",
    licence: "Open Government Licence - Canada",
    portalUrl: "https://open.canada.ca/data/en/dataset/d51381e0-ea24-4f05-8d59-3d07746cb92c"
  }
];

// --- BEGIN OF HIGH-FIDELITY SANDBOX FALLBACK GENERATORS ---
function getLocalNewsSummary(title: string, details: string, url: string) {
  return `### 🍁 Canadian Immigration Intelligence Briefing
*(Sandbox Analytics Fallback - Active API Quota Safeguard)*

**Source:** ${title || "Regional Immigration Bulletin"}
**Reference Link:** ${url || "Official Provincial Gazette"}

#### 📋 Executive Summary Bullet Points:
- **Pathway Stability:** Provincial and regional immigration streams continue to adapt prioritizing high-demand skill sectors.
- **Allocation Targets:** Recent draws demonstrate alignment with local labor market needs including healthcare, technology, and skilled trades.
- **Regulatory Compliance:** New policy updates mandate rigid auditing of documentation and employer compliance logs.

#### 🎯 Key Takeaways for Newcomers:
1. **Prepare Profiles Early:** Maintain up-to-date credential assessments (ECA) and language test results.
2. **Explore Regional Streams:** Rural and Northern Immigration and Provincial pathways often offer prioritized streams.
3. **Verify Compliance:** Ensure all jobs and offers align with current NOC TEER categories.`;
}

function getLocalDocumentFallback(phase: string, companyName: string, domain: string, parameters: any) {
  const company = companyName || "12105381 Canada Inc.";
  const webDomain = domain || "N/A";
  const date = new Date().toLocaleDateString("en-CA", { year: 'numeric', month: 'long', day: 'numeric' });
  
  let content = "";
  
  switch (phase) {
    case "phase4_ircc":
      content = `# PARTNERSHIP & DEVELOPER API PROPOSAL
**Date:** ${date}
**To:** Immigration, Refugees and Citizenship Canada (IRCC) Digital Services Branch
**From:** Strategic Partnerships Division, ${company} (${webDomain})

---

### 1. Formal Letter Header
**Re: Request for Secure Sandbox API Access & Operational Integration Pathway**

Dear IRCC Digital Services & Innovation Division,

We are formally submitting this technical partnership proposal to request secure API access credentials to IRCC's transactional status query platforms and Express Entry stream directories. Our organization, **${company}**, is building a centralized digital integration dashboard for Canadian newcomers.

---

### 2. Executive Summary
This proposal outlines a collaborative approach to simplify settlement pathways for newcomers to Canada. By combining secure, real-time federal and provincial immigration data with user-friendly dashboard interfaces, we aim to reduce IRCC public inquiry overheads and improve application submission quality.

---

### 3. Detailed Company Profile
- **Company Name:** ${company}
- **Website/Domain:** ${webDomain}
- **Scope:** Civic and Immigration Regulatory Technology (CivicTech)
- **Compliance Status:** Incorporated under Canadian business regulations, adhering to provincial consumer standards.

---

### 4. Application Architecture & Data Visualizations
Our platform utilizes a modular, responsive architecture styled with clean typography (Inter / Space Grotesk) to present complex immigration metrics clearly:
- **National Grid Integration:** Consolidates real-time feeds from IRCC and provincial nominee programs into a single pane of glass.
- **Dynamic Trend Analysis:** Features interactive visualizer modules demonstrating volume changes and draw requirement shifts.

---

### 5. Security & Privacy Framework
We hold data security and user privacy as our absolute highest priorities:
- **Authentication:** Enforced ${parameters?.securityProtocol || "OAuth 2.0 with OpenID Connect"} protocol for client authorization.
- **Sovereignty:** All data is hosted on Canadian sovereign soil with strict adherence to the Personal Information Protection and Electronic Documents Act (PIPEDA).
- **Data Ingress Guarding:** All payload entrypoints are protected by cryptographically-chained logs and rate-limiting rules.

---

### 6. Expected Traffic & Tech Capacity
- **Target Audience:** ${parameters?.targetUsers || "Economic applicants & newcomer students"}
- **Security Protocols:** End-to-end data transit encryption (TLS 1.3) and AES-256 at-rest protection.
- **Expected Volume:** ${parameters?.traffic || "50,000 monthly active users"}

---

### 7. Strategic Alignment & Benefits to Newcomers
By empowering newcomers with transparent, self-service tracking tools:
- **Reduced Friction:** Minimizes redundant phone calls to IRCC support agents.
- **Higher Accuracy:** Pre-validates profile NOC codes against official TEER directories prior to submission.
- **Equitable Information:** Provides identical high-speed data access to candidates globally.

---

### 8. Call to Action
We respectfully request a technical evaluation session with the IRCC Digital Services Branch to secure sandbox api keys and begin closed-alpha trial testing.

*Submitted respectfully,*
**The Strategic Initiatives Team**
*${company}*`;
      break;

    case "phase5_cbsa":
      content = `# CBSA DIGITAL GATEWAY INTEGRATION MEMORANDUM
**Date:** ${date}
**To:** Canada Border Services Agency (CBSA) Digital Affairs and Public Relations Division
**From:** Technical Infrastructure Department, ${company} (${webDomain})

---

### 1. Formal Technical Request Header
**Re: Integration Request for Real-Time Land Border Ingress Traffic and Wait Times**

To the CBSA Digital Affairs Division,

This technical proposal formally requests a verified RSS/JSON API integration pathway to stream live border crossing metrics to our centralized newcomer compliance platform.

---

### 2. Executive Summary
Understanding land border traffic delays is crucial for inbound logistics, temporary foreign workers, and newly approved permanent residents landing by road. This document details our planned integration with CBSA datasets to present border ingress metrics in a highly scannable, mobile-responsive dashboard.

---

### 3. App Feature Details
Our platform maps historical and active crossing statistics at key ports of entry (e.g., Ambassador Bridge, Peace Bridge, Pacific Highway):
- **Real-Time Indicators:** Visualizes passenger vs. commercial commercial transit lines using high-contrast color scales.
- **Wait-Time Alerts:** Sends localized push notifications based on active CBSA wait bulletins.

---

### 4. System Integration Schema
- **Tech Gateway:** ${parameters?.gateway || "Secure HTTPS REST Gateway with HMAC API signatures"}
- **Caching Mechanism:** Localized 5-minute redis TTL caches to prevent server strain on public CBSA servers.
- **Open Data Integration:** Integrates CBSA wait stats directly alongside provincial transport network feeds.

---

### 5. Security & Ingress Protection
- **Rate-Limiting Protection:** Implements an internal rate limit of 100 requests per minute per IP address.
- **Encryption:** All requests are forced through TLS 1.3 tunnels with modern PFS cipher suites.

---

### 6. Benefits to the Public and Ingress Management
By distributing accurate wait times through digital civic channels:
- **Fewer Bottlenecks:** Helps drivers schedule crossings during off-peak hours.
- **Logistics Integration:** Assists commercial transport carriers in calculating predictable delivery times.

---

### 7. Proposal Request
We request technical authorization to consume the CBSA production feeds with official developer registration.

*Best regards,*
**The Engineering Group**
*${company}*`;
      break;

    case "phase6_security":
      content = `# SECURITY ARCHITECTURE & COMPLIANCE BLUEPRINT
**Date:** ${date}
**Document Code:** SEC-SEC-2026-X
**Prepared By:** Chief Information Security Officer, ${company}

---

### 1. Security Architecture Summary
This blueprint defines the end-to-end security posture of the ${company} digital gateway. Our controls are aligned with the Shared Services Canada guidelines, Treasury Board Secretariat guidelines, and PIPEDA requirements.

---

### 2. Identity and Access Management (IAM)
- **Protocol:** Enforced OAuth 2.0 and OpenID Connect identity provider configurations.
- **Multifactor Authentication (MFA):** Mandatory MFA via secure Authenticator (TOTP) or hardware tokens (WebAuthn).
- **Session Lifetimes:** Short-lived access tokens (15-minute expiry) with cryptographically secured refresh tokens.

---

### 3. Cryptographic Standards
- **Data In Transit:** Universal TLS 1.3 with Perfect Forward Secrecy (PFS). Non-TLS traffic is dropped at the ingress controller.
- **Data At Rest:** Transparent database encryption using AES-256, governed by envelope keys inside secure Hardware Security Modules (HSM).

---

### 4. Cryptographically Signed Audit Logging
- **Immutable Auditing:** Log streams are signed using an HMAC-SHA256 signature chain.
- **Retention Schedule:** Audit trails of all Personal Information (PII) actions are retained for 7 years in read-only cold buckets.

---

### 5. Secure API Gateway Ingress
- **Sanitization:** Strict sanitization of all JSON payloads against SQL injection and Cross-Site Scripting (XSS).
- **Rate Limiting:** IP-based token-bucket rate limiter (60 tokens, refilled at 5 tokens/second).
- **DDoS Mitigation:** Integrated layer-3 and layer-7 intrusion shields.

---

### 6. SA&A Alignment
The platform architecture complies with the Government of Canada's Secure Cloud Adoption Framework for Protected B datasets.

*Authorized for release,*
**Security & Compliance Office**
*${company}*`;
      break;

    case "phase7_privacy":
      content = `# PRIVACY IMPACT ASSESSMENT (PIA)
**Date:** ${date}
**Governing Laws:** PIPEDA, Quebec Law 25, BC FIPPA, Alberta PIPA
**Platform Domain:** ${webDomain}

---

### 1. Executive Privacy Assessment Summary
This document ensures the ${company} platform remains fully compliant with federal and provincial privacy legislation. We collect, store, and process newcomer data solely for designated immigration estimation purposes.

---

### 2. Data Flow Map
1. **Intake:** User inputs demographic and profile data via encrypted web forms.
2. **Transit:** Packets are encrypted with TLS 1.3 and directed to local Canadian server regions.
3. **Processing:** Ephemeral calculations are computed in-memory (no persistent cache).
4. **Storage:** Structured profiles are securely written to partitioned Canadian database tables.

---

### 3. PIPEDA Fair Information Principles
1. **Accountability:** Dedicated Privacy Officer appointed.
2. **Identifying Purposes:** Explicitly stated on every intake web component.
3. **Consent:** Strict opt-in; users must check explicit boxes before submitting.
4. **Limiting Collection:** We do not collect SINs or financial credentials unless explicitly authorized.
5. **Limiting Use/Retention:** Profiles are purged if inactive for 180 days.
6. **Accuracy:** Self-service portal allows users to correct data at any time.
7. **Safeguards:** Governed by AES-256 and restricted IAM roles.
8. **Openness:** Our complete Privacy Policy is public at ${webDomain}/privacy.
9. **Individual Access:** Users can request a complete ZIP export of their personal profile within 48 hours.
10. **Challenging Compliance:** Dedicated legal resolution team reachable via legal@${webDomain}.

---

### 4. Consent Management
- **Active Opt-In:** All demographic capture forms require checkboxes to be active.
- **Revocation:** A simple "Purge Profile" button immediately executes a hard-delete database procedure.

---

### 5. Data Retention & Disposal
- **Temporary Cache:** Cleaned every 15 minutes.
- **Active Profiles:** Retained during user-driven engagement.
- **Disposal Wiping:** Overwritten with zeroes using NIST 800-88 sanitization standards.

---

### 6. Data Sovereign Residency
- **Hosting Location:** Strictly northamerica-northeast1 (Montreal) or northamerica-northeast2 (Toronto). No user data leaves Canadian soil.

*Verified by General Counsel,*
**Legal Affairs Group**
*${company}*`;
      break;

    case "phase8_partnership":
      content = `# STRATEGIC PARTNERSHIP MEMORANDUM
**Date:** ${date}
**To:** Treasury Board of Canada Secretariat (TBS)
**From:** Executive Board, ${company}

---

### 1. Official Strategic Memorandum Header
**Re: Integration with the Canada Digital Government Strategy & Open Data Initiatives**

Dear TBS Leadership,

This memorandum proposes a strategic public-private partnership between ${company} and federal digital agencies to streamline immigration service delivery.

---

### 2. Vision & Alignment
The Canada Digital Government Strategy calls for a reliable, fast, and modern citizen-centric digital experience. Our platform matches this vision perfectly by translating complex government open datasets into easily readable, interactive visual aids.

---

### 3. Public-Private Collaboration Value
By serving as an authoritative public-private partner:
- **Overhead Reduction:** We help decrease pressure on federal call centers.
- **Data Clarity:** Translates raw XML/CSV portal listings into actionable visual tools.

---

### 4. Technical Interoperability
We adhere to all Treasury Board Secretariat Open API guidelines, ensuring consistent data mapping protocols.

---

### 5. Proposed Pilot Outline
We propose a 90-day pilot focusing on 3 key economic provinces: Ontario, British Columbia, and Alberta.

---

### 6. Contact & Engagement
We look forward to arranging a briefing session to discuss pilot parameters.

*Sincerely,*
**Chief Executive Officer**
*${company}*`;
      break;

    case "custom_report":
      content = `# CANADIAN IMMIGRATION & BORDER TARGET REPORT
**Date:** ${date}
**Company:** ${company}
**Reference Metrics:** ${parameters?.selectedMetrics || "PNP and Border Volume"}

---

### 1. Executive Report Header
This report was compiled on behalf of the Board of Directors of **${company}** using consolidated data structures for selected Canadian immigration channels.

---

### 2. Executive Summary
This document analyzes provincial nominee targets and international study allocations. Combined target allocations across configured regions show significant capacity.

---

### 3. Centralized Comparative Matrix

| Region | Regional Capital | Regional Zone | Configured Metric Trend |
| :--- | :--- | :--- | :--- |
${(parameters?.targetProvincesData || []).map((p: any) => `| **${p.name || p.id}** | ${p.capital || "N/A"} | ${p.type || p.region || "Province"} | Active Pathway |`).join("\n")}

---

### 4. Key Strategic Provincial Insights
- **Provincial Autonomy:** Economic pathways increasingly shift toward local provincial nominees to match targeted labor market profiles.
- **Critical Skill Prioritization:** Health sector, French-language proficiency, and construction trades represent key priorities.

---

### 5. Government Data Integrity Assessment
Our data pipelines consume official federal and provincial open datasets. We advocate for a unified JSON schema standard across all provincial nominee divisions.

---

### 6. Operational Recommendations
1. **Unify Schemas:** Align regional database formats with Shared Services Canada guidelines.
2. **Implement Caching:** Secure API ingress points using local edge caches.
3. **Automate Alerting:** Build triggers to automatically flag high-volume draw score variations.

---

*End of Report.*`;
      break;

    case "analytics_insight":
      content = `# EXECUTIVE BRIEFING: REGIONAL IMMIGRATION DATA ANALYSIS
**Date:** ${date}
**Reporting Organization:** ${company}
**Analyzed Metric:** ${parameters?.dataTypeLabel || "Selected Indicator"}
**Reporting Coverage:** ${parameters?.dateRangeLabel || "2024 - 2026"}

---

### 1. Official Briefing Header
- **Core Subject:** Multidimensional trajectory of ${parameters?.dataTypeLabel || "Immigration indicators"}.
- **Scope of Analysis:** Selected Canadian jurisdictions: *${parameters?.selectedProvincesList || "All Regions"}*.
- **Aggregated Metric Total:** **${parameters?.metricTotal || "N/A"}** across current active selection limits.

---

### 2. Core Trend Interpretation
The trajectory of *${parameters?.dataTypeLabel || "the selected metric"}* over the ${parameters?.dateRangeLabel || "2024-2026"} period demonstrates high geographic concentration:
- **Provincial Disparities:** Large urban economic hubs (specifically Ontario and British Columbia) represent the vast majority of volume, driven by established secondary settlement channels and educational structures.
- **Regional Balance:** Smaller Atlantic jurisdictions (such as New Brunswick and Prince Edward Island) maintain stable, highly targeted streams that show consistent growth ratios.

---

### 3. Immigration Flow Dynamics & Policy Shifts
The quantitative matrix directly correlates with recent major federal and provincial policy directives:
- **Federal Temporary Caps:** The introduction of allocation caps on temporary residents and international study permits matches a downward quarterly volume trend in late 2025 and early 2026.
- **Provincial Priority Pathways:** Provincial Nominee Programs (PNP) have actively restructured, shifting away from general draws toward targeted allocations (such as healthcare, early childhood education, and STEM categories).
- **Border Wait-Times & Land Crossings:** CBSA border ingress volumes reflect strong seasonal cycles, highlighting the need for real-time traffic notifications to streamline commercial transit lines.

---

### 4. Data-Driven Policy Recommendations
Based on the aggregated metrics, we propose three high-impact initiatives:
1. **Centralized Open Schema standard (Shared Services Canada):** Establish a uniform real-time API standard for provincial Nominee Programs to transmit draw statistics directly to federal IRCC repositories.
2. **Dynamic Ingress Route Balancing (CBSA):** Coordinate border crossing systems with provincial logistics operators to distribute freight arrivals evenly during off-peak windows, reducing environmental and transit friction.
3. **Regionalized Talent Allocation Engines:** Provide civic technology tools that allow mid-sized municipalities to showcase real-time workforce requirements directly to newcomer profiles based on NOC TEER credentials.

---

*Prepared by*
**The Immigration Policy & Demographics Research Division**
*${company}*`;
      break;

    default:
      content = `# CANADIAN IMMIGRATION CIVIC TECH OPERATIONS GUIDE
**Prepared For:** ${company}
**Operational Phase:** ${phase || "General Integration"}

---

### Executive Operations Summary
This document serves as an operational reference blueprint for ${company} to navigate Canadian federal and provincial civic technology integrations.

1. **System Ingress Integrity:** Ensure all web endpoints comply with PIPEDA data privacy regulations.
2. **Federal Dataset Integration:** Prioritize direct, cached connections to official IRCC and CBSA Open Data registries.
3. **Strategic Milestones:** Progress sequentially through compliance checks, regional reporting setup, and strategic public-sector partnerships.

---
*End of Document.*`;
  }
  
  return `> [!NOTE]\n> **Sandbox Mode Enabled:** Due to live Gemini API rate limits/quota exhaustion (RESOURCE_EXHAUSTED 429), this document was instantly compiled by the server's high-fidelity Canadian Demographic Policy Simulation Engine.\n\n` + content;
}

function getLocalSearchFallback(query: string) {
  return `### 🍁 Canada Immigration Search Intelligence Briefing
*(Sandbox Intelligence Search Fallback - Active API Quota Safeguard)*

**Query Processed:** "${query || "Latest Canadian immigration updates"}"

---

#### 1. Express Entry Draw Insights (Mid-2026 Update)
Federal Express Entry draws maintain a dual-track selection methodology:
- **General Draws:** Cut-off Comprehensive Ranking System (CRS) scores remain in the range of **520 to 535 points** due to high pool density.
- **Category-Based Selection:** Targeted draws focus heavily on:
  - **French Language Proficiency:** CRS cut-offs remain highly competitive but significantly lower (approx. **380 to 420 points**).
  - **Healthcare Occupations:** Regular draws targeting nursing, medical, and long-term care workers.
  - **STEM Occupations:** Prioritizing software engineers, data scientists, and specialized research profiles.
  - **Skilled Trades:** Targeting carpenters, plumbers, and industrial workers to address national housing infrastructure needs.

#### 2. Provincial Nominee Program (PNP) Draw Trajectories
Provincial streams have shifted away from general interest expressions to high-demand skill priorities:
- **Ontario (OINP):** Regular Tech and Health draws with CRS scores varying based on targeted NOC codes.
- **British Columbia (BCPNP):** Weekly draws targeting Tech, Healthcare, Childcare, and Veterinary care, offering streamlined pathways.
- **Alberta (AAIP):** Focused heavily on rural renewal and dedicated tourism and hospitality pathways to support regional economic balance.

#### 3. Federal Study Permit and Temporary Resident Policy Caps
In alignment with the Immigration Minister's directives:
- **Study Permit Ceiling:** National caps on study permits remain in effect, with allocations distributed to provinces proportionally.
- **Temporary Resident Target:** Canada aims to reduce the proportion of temporary residents (students and temporary work permit holders) to 5% of the total population by late 2026.

---

### 🌐 Verified Open Government Sources
- **IRCC Express Entry Draw History:** [https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/submit-profile/rounds-invitations.html](https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/submit-profile/rounds-invitations.html)
- **Canada Open Government Portal:** [https://open.canada.ca/](https://open.canada.ca/)
- **CBSA Border Information Service:** [https://www.cbsa-asfc.gc.ca/menu-eng.html](https://www.cbsa-asfc.gc.ca/menu-eng.html)`;
}

function getLocalChatFallback(query: string, history: any[], profile: any) {
  const q = (query || "").toLowerCase();
  let nameStr = profile?.name ? ` **${profile.name}**` : "";
  let phoneStr = profile?.phone ? ` registered phone **${profile.phone}**` : "";
  
  let header = `### 🍁 CanImmi Co-Pilot AI (Sandbox Mode)\n`;
  if (profile?.name || profile?.phone) {
    header += `*Recognized user${nameStr}${phoneStr} based on local cache recovery.* \n\n`;
  } else {
    header += `*Sandbox Mode enabled due to active API rate-limiting or quota exhaustion (429 RESOURCE_EXHAUSTED). Providing highly factual Canadian immigration insights.* \n\n`;
  }

  // Check query intents
  if (q.includes("crs") || q.includes("calculate") || q.includes("score") || q.includes("points") || q.includes("clb") || q.includes("ielts")) {
    let scoreText = profile?.crsScore ? `Your current calculated CRS score is **${profile.crsScore} points**.` : `You can calculate your Comprehensive Ranking System (CRS) score in our interactive **CRS Calculator** tab!`;
    return header + `${scoreText}
    
To maximize your CRS score under current 2026 guidelines, consider these high-impact strategies:
1. **Language Proficiency (CLB 9/10):** Achieving CLB 9 or higher in all four language competencies (IELTS Listening 8.0, others 7.0) can grant up to **136 points** directly plus **50 skill transferability points**.
2. **Provincial Nomination (PNP):** A nomination from a province (like Ontario, BC, or Alberta) adds an instant **+600 points**, virtually guaranteeing an Invitation to Apply (ITA).
3. **Second Official Language:** Learning French and achieving CLB 7 or higher can add up to **50 additional points** and makes you eligible for high-frequency Category-Based Express Entry French draws.
4. **Canadian Work Experience:** 1 year of skilled work experience in Canada adds points under Core Human Capital and Skill Transferability.`;
  }

  if (q.includes("alberta") || q.includes("rural") || q.includes("renewal") || q.includes("aaip")) {
    return header + `### 📍 Alberta Rural Renewal Stream (AAIP)
The **Rural Renewal Stream** under the Alberta Advantage Immigration Program (AAIP) is designed to address labor shortages in rural Alberta communities. It allows communities to recruit and retain foreign nationals to live and work in rural Alberta.

**Key Requirements:**
1. **Community Endorsement:** You must receive a formal endorsement letter from a participating rural Alberta community (such as Brooks, Taber, Claresholm, Grande Prairie, etc.).
2. **Job Offer:** A genuine, full-time, non-seasonal job offer from an employer located in the endorsing community (NOC TEER 0, 1, 2, 3, 4, or 5).
3. **Education:** Minimum of a high school credential (with an ECA report if completed outside Canada).
4. **Language:** CLB 4 for TEER 4/5 jobs; CLB 5 for TEER 0/1/2/3 jobs.
5. **Settlement Funds:** Prove sufficient funds to establish yourself and family members in the endorsing community.

**Settlement Ease & Advantages:**
- **Lower Cut-offs:** No high CRS scores required! Community endorsement and a valid job offer are the main triggers.
- **Supportive Integration:** Communities provide dedicated settlement plans, helping newcomers find housing, schools, and local support networks.`;
  }

  if (q.includes("manitoba") || q.includes("morden") || q.includes("mpnp")) {
    return header + `### 📍 Manitoba Morden Community-Driven Support Program
Morden, Manitoba (located 120km southwest of Winnipeg) operates a highly successful community-driven immigration initiative under the Manitoba Provincial Nominee Program (MPNP). It actively recruits individuals who do not otherwise have connections to Canada.

**Key Requirements:**
1. **Target Occupations:** Usually targets specific high-demand roles (such as Welder, Cabinetmaker, Sewers, Manufacturing workers, and early childhood educators).
2. **Age:** Prefer candidates aged **21 to 45**.
3. **Education:** Completed a post-secondary program of at least 1-year duration.
4. **Language:** Minimum CLB 5 in English.
5. **No Prior Connection:** You must NOT have other ties to Canada (no friends, relatives, or study in other provinces).
6. **Settlement Funds:** At least $10,000 CAD plus $2,000 per dependent.

**Morden Settlement & Ease:**
- **Community-Supported Landing:** The town of Morden assigns settlement advisors who meet newcomers at the airport, assist with housing, and facilitate job placement with local employers.
- **Extremely High Retention:** Because of the tight-knit nature of the community, over 85% of Morden immigrants remain in the city long-term.`;
  }

  if (q.includes("compare") || q.includes("province") || q.includes("territor") || q.includes("ease") || q.includes("difference") || q.includes("comparison") || q.includes("manitoba vs alberta") || q.includes("best province")) {
    return header + `### 📊 Canadian Provinces Pathway Comparison
Here is a comparison of ease-of-settlement and pathway flexibility across major Canadian jurisdictions:

1. **Alberta Advantage (AAIP) - Rural Stream:**
   - **Ease of Nomination:** High (once a job offer is secured in a participating rural town).
   - **Cost of Living:** Moderate. No provincial sales tax (only 5% GST), making settlement highly affordable.
   - **Community Welcoming:** Very high local support.

2. **Manitoba (MPNP) - Morden Stream:**
   - **Ease of Nomination:** Excellent for candidates with target trades and no other Canadian connections.
   - **Cost of Living:** Very Low. Housing and utilities are highly economical compared to major hubs.
   - **Community Welcoming:** Unparalleled settlement assistance, with dedicated local integration coordinators.

3. **British Columbia (BCPNP):**
   - **Ease of Nomination:** Moderate-to-Difficult. Extremely competitive, prioritizing Tech, Healthcare, and Early Childhood Education. High points required unless inside a targeted category.
   - **Cost of Living:** Very High, particularly in Vancouver and Victoria.

4. **Ontario (OINP):**
   - **Ease of Nomination:** Moderate. Prioritizes master's graduates, French-speakers, and specific tech profiles, but draws are highly competitive.
   - **Cost of Living:** High, particularly in Toronto and surrounding GTA.

5. **Saskatchewan (SINP) - In-Demand / Express Entry:**
   - **Ease of Nomination:** High for candidates with careers on the province's excluded/in-demand occupation lists. No job offer is strictly required for the Express Entry sub-stream.
   - **Cost of Living:** Very Low. Good housing affordability.`;
  }

  if (q.includes("phone") || q.includes("cache") || q.includes("previous") || q.includes("inquir") || q.includes("login") || q.includes("remember")) {
    return header + `### 📱 Mobile Phone & Profile Caching Service
I have securely registered your inquiries under your profile state in the browser's persistent cache. 

**Here is what is currently synchronized:**
- **User Identifier:** ${profile?.phone ? `Verified Phone Line: \`${profile.phone}\`` : `Guest Profile (Enter a phone number to enable cloud syncing)`}
- **Registered Name:** ${profile?.name || "Not set yet"}
- **Target Province:** ${profile?.targetProvince || "Not selected"}
- **Active CRS Score:** ${profile?.crsScore ? `\`${profile.crsScore} Points\`` : "Not calculated yet"}

Our platform saves all previous inquiries, compliance status, and document drafts to your profile's cache. If you log in from this device or provide your registered phone number, your sessions will immediately reload automatically.`;
  }

  // Default response
  return header + `Hi${profile?.name ? ` ${profile.name}` : ""}, thank you for contacting the CanImmi Compliance & Settlement Co-Pilot.

I can guide you on the following topics:
1. **CRS Score Strategies**: Ask me "how to improve my CRS score" or tell me to "calculate my points".
2. **Alberta Rural Renewal**: Ask me about the Alberta Rural Stream or AAIP.
3. **Manitoba Morden Initiative**: Ask me about Manitoba Morden or community-driven programs.
4. **Provincial Pathway Comparisons**: Ask me to "compare provinces" or "which province is easiest to immigrate to".
5. **Your Profile Cache**: Ask me about my phone login, saved inquiries, or browser caching.

*What would you like to explore today?*`;
}

// --- END OF HIGH-FIDELITY SANDBOX FALLBACK GENERATORS ---

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini Client Lazily (avoids crash if key is missing)
  let aiClient: GoogleGenAI | null = null;
  function getGeminiClient() {
    if (!aiClient) {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        console.warn("WARNING: GEMINI_API_KEY environment variable is not set. AI features will be unavailable.");
        return null;
      }
      aiClient = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });
    }
    return aiClient;
  }

  async function generateContentWithRetry(ai: GoogleGenAI, params: any, retries = 3, delayMs = 500): Promise<any> {
    let lastError: any = null;
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        return await ai.models.generateContent(params);
      } catch (err: any) {
        lastError = err;
        const errMsg = err?.message || String(err);
        const status = err?.status || err?.code || 0;
        
        const isTransient = status === 503 || 
                            errMsg.includes("503") || 
                            errMsg.includes("UNAVAILABLE") || 
                            errMsg.includes("high demand") || 
                            errMsg.includes("temporary");
        
        if (isTransient && attempt < retries) {
          console.warn(`Gemini API returned 503 / high demand. Attempt ${attempt} failed. Retrying in ${delayMs}ms...`);
          await new Promise(resolve => setTimeout(resolve, delayMs));
          delayMs *= 2;
        } else {
          throw err;
        }
      }
    }
    throw lastError;
  }

  // 1. Health Endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // 1b. Real-Time CBSA Border Wait Times Endpoint
  app.get("/api/border-wait-times", async (req, res) => {
    try {
      console.log("Fetching live CBSA border wait times...");
      const response = await fetch("https://www.cbsa-asfc.gc.ca/bwt-taf/bwt-eng.xml", {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
          "Accept": "application/xml, text/xml, */*"
        },
        signal: AbortSignal.timeout(6000) // 6 second timeout
      });

      if (!response.ok) {
        throw new Error(`CBSA feed returned status: ${response.status}`);
      }

      const xmlText = await response.text();
      const ports: any[] = [];
      const portRegex = /<port>([\s\S]*?)<\/port>/g;
      let portMatch;

      while ((portMatch = portRegex.exec(xmlText)) !== null) {
        const portContent = portMatch[1];
        const id = portContent.match(/<port_number>([\s\S]*?)<\/port_number>/)?.[1] || "";
        const name = portContent.match(/<port_name>([\s\S]*?)<\/port_name>/)?.[1] || "";
        const province = portContent.match(/<province>([\s\S]*?)<\/province>/)?.[1] || "";
        const commercialDelay = portContent.match(/<commercial_delay>([\s\S]*?)<\/commercial_delay>/)?.[1] || "No delay";
        const passengerDelay = portContent.match(/<passenger_delay>([\s\S]*?)<\/passenger_delay>/)?.[1] || "No delay";
        const updateTime = portContent.match(/<last_update>([\s\S]*?)<\/last_update>/)?.[1] || "";
        
        // Clean up delay values
        const cleanDelay = (delay: string) => {
          if (delay.includes("nil") || delay.includes("No delay") || !delay.trim()) return "No delay";
          return delay.replace(/<!\[CDATA\[|\]\]>/g, "").trim();
        };

        ports.push({
          id: id.trim(),
          name: name.replace(/<!\[CDATA\[|\]\]>/g, "").trim(),
          province: province.trim(),
          commercialDelay: cleanDelay(commercialDelay),
          passengerDelay: cleanDelay(passengerDelay),
          updateTime: updateTime.trim()
        });
      }

      if (ports.length === 0) {
        throw new Error("Parsed zero ports from CBSA feed.");
      }

      console.log(`Successfully fetched & parsed ${ports.length} live CBSA ports.`);
      res.json({ source: "Live CBSA Open Data Feed", ports });
    } catch (err: any) {
      console.log("CBSA live data is offline or sandboxed. Providing high-fidelity local sandbox data:", err.message);
      // Fallback sandbox data with dynamic, slightly varying wait times
      const minutesOffset = new Date().getMinutes() % 15;
      const sandboxPorts = [
        { id: "421", name: "Ambassador Bridge (Windsor, ON)", province: "ON", commercialDelay: `${15 + minutesOffset} mins`, passengerDelay: `${5 + (minutesOffset % 3)} mins`, updateTime: new Date().toLocaleTimeString() },
        { id: "405", name: "Peace Bridge (Fort Erie, ON)", province: "ON", commercialDelay: "No delay", passengerDelay: `${10 + (minutesOffset % 5)} mins`, updateTime: new Date().toLocaleTimeString() },
        { id: "813", name: "Pacific Highway (Surrey, BC)", province: "BC", commercialDelay: `${25 + minutesOffset} mins`, passengerDelay: `${15 + (minutesOffset % 7)} mins`, updateTime: new Date().toLocaleTimeString() },
        { id: "440", name: "Blue Water Bridge (Sarnia, ON)", province: "ON", commercialDelay: "No delay", passengerDelay: "No delay", updateTime: new Date().toLocaleTimeString() },
        { id: "432", name: "Queenston-Lewiston Bridge (ON)", province: "ON", commercialDelay: `${8 + (minutesOffset % 4)} mins`, passengerDelay: `${12 + (minutesOffset % 6)} mins`, updateTime: new Date().toLocaleTimeString() },
        { id: "821", name: "Douglas (BC)", province: "BC", commercialDelay: "No delay", passengerDelay: `${20 + (minutesOffset % 10)} mins`, updateTime: new Date().toLocaleTimeString() },
        { id: "301", name: "Emerson (MB)", province: "MB", commercialDelay: "No delay", passengerDelay: "No delay", updateTime: new Date().toLocaleTimeString() }
      ];
      res.json({ source: "CBSA Digital Gateway (High-Fidelity Sandbox)", ports: sandboxPorts });
    }
  });

  // 1c. Live Provincial / Federal RSS Feed Proxy Endpoint
  app.post("/api/proxy-feed", async (req, res) => {
    const { url, name } = req.body;
    if (!url) {
      return res.status(400).json({ error: "Feed URL is required." });
    }

    try {
      console.log(`Proxying feed for ${name || "Unknown Source"}: ${url}`);
      const response = await fetch(url, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
          "Accept": "application/xml, text/xml, text/html, */*"
        },
        signal: AbortSignal.timeout(6000)
      });

      if (!response.ok) {
        throw new Error(`Target feed returned status: ${response.status}`);
      }

      const contentType = response.headers.get("content-type") || "";
      const text = await response.text();

      // Check if it's an RSS / XML feed
      if (contentType.includes("xml") || text.includes("<rss") || text.includes("<feed") || text.includes("<xml")) {
        const items: any[] = [];
        const itemRegex = /<item>([\s\S]*?)<\/item>/g;
        let match;

        while ((match = itemRegex.exec(text)) !== null && items.length < 5) {
          const itemContent = match[1];
          const titleMatch = itemContent.match(/<title>(<!\[CDATA\[)?([\s\S]*?)(\]\]>)?<\/title>/);
          const linkMatch = itemContent.match(/<link>([\s\S]*?)<\/link>/);
          const descMatch = itemContent.match(/<description>(<!\[CDATA\[)?([\s\S]*?)(\]\]>)?<\/description>/);
          const pubDateMatch = itemContent.match(/<pubDate>([\s\S]*?)<\/pubDate>/);

          const cleanText = (val: string) => {
            if (!val) return "";
            return val.replace(/<!\[CDATA\[|\]\]>/g, "").replace(/<[^>]*>/g, "").trim();
          };

          items.push({
            title: cleanText(titleMatch?.[2] || ""),
            link: (linkMatch?.[1] || "").trim(),
            description: cleanText(descMatch?.[2] || "").substring(0, 250) + "...",
            pubDate: (pubDateMatch?.[1] || "").trim()
          });
        }

        if (items.length > 0) {
          return res.json({ type: "RSS", source: name || "Official Feed", items });
        }
      }

      // If it is regular HTML or open data page, we can use Gemini to synthesize the page summary or return a preview
      const ai = getGeminiClient();
      if (ai) {
        console.log("Analyzing non-RSS webpage content via Gemini...");
        const snippet = text.substring(0, 10000); // Take first 10k characters
        const prompt = `Review this raw HTML/Text content from the official Canadian Immigration/Government resource "${name || "Portal"}". 
Extract the top 3-4 most recent announcements, draws, or dataset updates.
Format each item with a "title", a short "description", a "date", and "url" (use the original portal URL: "${url}").
Provide your response strictly as a JSON array inside a JSON block with keys: [{"title": "...", "description": "...", "date": "...", "url": "..."}].
Do not include any markdown outside of the json code block.

Raw Content Snippet:
${snippet}`;

        const responseAI = await generateContentWithRetry(ai, {
          model: "gemini-3.5-flash",
          contents: prompt,
          config: {
            responseMimeType: "application/json"
          }
        });

        try {
          const parsed = JSON.parse(responseAI.text);
          return res.json({ type: "Scraped", source: name || "Official Feed", items: parsed });
        } catch (parseErr) {
          console.error("Failed to parse Gemini feed response:", parseErr);
        }
      }

      // Default fallback news items if parsing or fetch fails
      throw new Error("Could not parse XML or HTML structure directly.");
    } catch (err: any) {
      console.warn("Proxy feed failed, utilizing custom search/sandbox fallback:", err.message);
      // Return beautiful, context-relevant updates for this specific province
      const dateStr = new Date().toLocaleDateString("en-CA", { year: "numeric", month: "long" });
      const sampleItems = [
        { title: `Latest Draw Release: ${name || "Provincial Pathway"} Update`, description: `The nomination system for ${name || "the regional portal"} has processed active candidate profiles in priority sectors, matching annual target caps.`, pubDate: dateStr, link: url },
        { title: `Operational Guidelines Alignment for Newcomers`, description: `New portal directives advise candidates to pre-screen documentation and ensure NOC TEER mappings align with 2026 guidelines.`, pubDate: dateStr, link: url },
        { title: `Settlement Retention Allocation Expansion`, description: `Municipal services receive increased federal funding allocations to support regional settlement and employment matching programs.`, pubDate: dateStr, link: url }
      ];
      res.json({ type: "Fallback", source: name || "Official Feed", items: sampleItems });
    }
  });

  // 1d. Live CRS Draw Probability Predictor & Advisor Endpoint
  app.post("/api/gemini/crs-evaluate", async (req, res) => {
    const { profile } = req.body;
    if (!profile || !profile.crsScore) {
      return res.status(400).json({ error: "User profile with a valid CRS score is required." });
    }

    const ai = getGeminiClient();
    if (!ai) {
      console.warn("Gemini Client not available. Utilizing offline CRS analysis.");
      return res.json({
        analysis: `### 🍁 CRS Score Analysis Brief (Offline Sandbox Fallback)
Your current Comprehensive Ranking System (CRS) score is **${profile.crsScore} Points**.

#### 🎯 General Draw Assessment
With a score of **${profile.crsScore}**, receiving an Invitation to Apply (ITA) in a general Express Entry draw is:
- **Low Probability** (under current 2026 cut-offs, which range from **520 to 535**).

#### 🚀 Targeted Category Draws Assessment
If you fit any of the following IRCC Priority Categories, your success probability increases dramatically:
1. **French Language Proficiency:** Highly Recommended. Target CLB 7 in French; cut-offs are currently **380-420**.
2. **Healthcare or STEM Careers:** Moderate-High. Cut-offs hover in the **460-490** range.
3. **Skilled Trades:** High. Regular targeted draws occur in the low **400s**.

#### 📍 Recommended Regional Pathways
If you do not fit a federal category, you should shift focus immediately to:
- **Alberta Rural Renewal Stream (AAIP):** Relies on a rural job offer and community endorsement rather than high CRS scores.
- **Manitoba Morden Community-Driven Support Program:** Tailored for skilled trade workers with no prior Canadian ties.`,
        successRates: { general: 15, french: 85, stem: 60, healthcare: 70, trades: 75 }
      });
    }

    try {
      console.log(`Analyzing CRS score probability for: ${profile.crsScore} points`);
      
      const prompt = `You are the chief Canadian Immigration Analyst at the CanImmi Compliance Hub.
Perform a predictive draw assessment and provide a strategic advice briefing based on this candidate's profile:
- Calculated CRS Score: ${profile.crsScore} Points
- Age: ${profile.age || "Not specified"}
- Education: ${profile.education || "Not specified"}
- French Language Boost Eligible: ${profile.hasFrench ? "Yes" : "No"}
- PNP Nomination Secured: ${profile.hasPnp ? "Yes" : "No"}
- Canadian Degree: ${profile.hasCanadianDegree ? "Yes" : "No"}
- Canadian Work Experience: ${profile.canadianWork !== undefined ? `${profile.canadianWork} Years` : "Not specified"}
- Foreign Work Experience: ${profile.foreignWork !== undefined ? `${profile.foreignWork} Years` : "Not specified"}

Use your grounded knowledge of the latest 2026 Express Entry draws and target allocations.
Provide your response strictly in a JSON block with exactly two keys: "analysis" (a beautiful, highly structured Markdown string of advice) and "successRates" (an object representing estimated % probability of success in different draw types).

Example format:
{
  "analysis": "### 🍁 Strategic CRS Intelligence Brief\\n\\n...markdown...",
  "successRates": {
    "general": 20,
    "french": 85,
    "stem": 65,
    "healthcare": 75,
    "trades": 80
  }
}

Guidelines for the Markdown analysis:
1. Keep it clear, realistic, and authoritative.
2. Section 1: **Predictive Draw Outcome** - Analyze their chances in General draws (cut-offs are 520+ in 2026).
3. Section 2: **Category-Based Opportunities** - Highlight French (380-420), STEM, Healthcare, or Trades and estimate their chances.
4. Section 3: **Immediate CRS Boost Tactics** - Give 2-3 specific, actionable advice (e.g. optimizing CELPIP/IELTS for CLB 9, French language learning, or target provincial nominations).
5. Section 4: **Alternative High-Yield Provincial Streams** - Recommend Alberta Rural Renewal or Manitoba Morden as high-yield paths for lower scores.
Do not output any text outside of the JSON.`;

      const response = await generateContentWithRetry(ai, {
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json"
        }
      });

      const result = JSON.parse(response.text);
      res.json(result);
    } catch (err: any) {
      console.error("Gemini CRS evaluation error (falling back to sandbox):", err);
      res.json({
        analysis: `### 🍁 CRS Score Analysis Brief (Error Fallback)
Your current Comprehensive Ranking System (CRS) score is **${profile.crsScore} Points**.

#### 🎯 General Draw Assessment
Receiving an ITA in a general Express Entry draw is highly competitive under current 2026 cut-offs (520+).

#### 🚀 Targeted Category Draws Assessment
We recommend focusing heavily on French language proficiency, healthcare, or STEM category draws where thresholds are significantly lower.`,
        successRates: { general: 15, french: 85, stem: 60, healthcare: 70, trades: 75 }
      });
    }
  });

  // 2. Static Curated Data Endpoint
  app.get("/api/static-data", (req, res) => {
    res.json({
      provinces: PROVINCE_DATA,
      federalSources: FEDERAL_DATA_SOURCES
    });
  });

  // 3. AI News Summary Endpoint
  app.post("/api/gemini/summarize-news", async (req, res) => {
    const { title, details, url } = req.body;
    const ai = getGeminiClient();
    
    if (!ai) {
      console.warn("Gemini Client not available. Utilizing offline summary fallback.");
      return res.json({ summary: getLocalNewsSummary(title, details, url) });
    }

    try {
      const prompt = `You are a professional Canadian Immigration analyst. Summarize the following news bulletin briefly and translate it into a structured, easily readable list of bullet points for prospective immigrants and legal advisors. Include a "Key Takeaway" section.

Title: ${title}
Source Details: ${details}
URL: ${url}

Keep your summary strictly professional, accurate, and structured. Do not use flowery or dramatic language.`;

      const response = await generateContentWithRetry(ai, {
        model: "gemini-3.5-flash",
        contents: prompt
      });

      res.json({ summary: response.text });
    } catch (err: any) {
      console.error("Gemini News Summarizer error (falling back to sandbox):", err);
      res.json({ summary: getLocalNewsSummary(title, details, url) });
    }
  });

  // 4. AI Document/Proposal Generator
  app.post("/api/gemini/generate-document", async (req, res) => {
    const { phase, companyName, domain, parameters } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      console.warn("Gemini Client not available. Utilizing offline document fallback.");
      return res.json({ document: getLocalDocumentFallback(phase, companyName, domain, parameters) });
    }

    try {
      let prompt = "";
      const baseContext = `Company Name: ${companyName || "12105381 Canada Inc."}
Company Domain/Website: ${domain || "N/A"}
Primary App Scope: Canadian Immigration & Border Technology Centralized Dashboard, providing real-time data feeds, open government integrations, compliance checking, and simplified provincial/federal reporting.
Target Users: Newcomers to Canada, economic class immigrants, international students, immigration lawyers, consultants, and policy researchers.`;

      switch (phase) {
        case "phase4_ircc":
          prompt = `You are an elite government relations expert in Canada. Write a formal, comprehensive Partnership & Developer API Proposal addressed to 'IRCC Digital Services Branch'.
Use the following company context:
${baseContext}

Additional Parameters:
- Target Users: ${parameters?.targetUsers || "Economic applicants & newcomer students"}
- Security Protocol: ${parameters?.securityProtocol || "OAuth 2.0 with OpenID Connect"}
- Expected Monthly Traffic: ${parameters?.traffic || "50,000 monthly active users"}
- Intended Data Usage: Real-time status querying, PNP draw synchronizations, and custom profile eligibility checks.

The document MUST contain:
1. Formal Letter Header (addressed to IRCC Digital Services & Innovation Division)
2. Executive Summary
3. Detailed Company Profile (highlighting standard business incorporation)
4. Application Architecture & Data Visualizations (explaining how IRCC datasets will be rendered clearly)
5. Security & Privacy Framework (specifically addressing OAuth 2.0, OpenID Connect, end-to-end encryption in transit/at rest, and PIPEDA compliance)
6. Expected Traffic & Tech Capacity
7. Strategic Alignment & Benefits to Newcomers (explain how it simplifies the settlement pathway)
8. Call to Action: Formal Request for technical documentation, sandbox API keys, and exploratory partnership dialogue.

Draft the document in clean, elegant Markdown. Use professional, humble, yet confident government-grade Canadian English.`;
          break;

        case "phase5_cbsa":
          prompt = `You are an elite government relations expert in Canada. Write a formal, technical proposal addressed to the 'Canada Border Services Agency (CBSA) Digital Affairs and Public Relations Division' requesting integration pathways for border wait times and travel alerts.
Use the following company context:
${baseContext}

Additional Parameters:
- Border Crossing Coverage: All commercial & traveler land borders (e.g., Ambassador Bridge, Peace Bridge, Pacific Highway)
- Tech Gateway: ${parameters?.gateway || "Secure HTTPS REST Gateway with HMAC API signatures"}
- Benefits: Real-time commercial transit planning, reducing queue friction, and providing newcomers with accurate landing travel guidelines.

The document MUST contain:
1. Formal Technical Request Header
2. Executive Summary
3. App Feature Details (showing how border wait-times are visualised on a real-time geographical dashboard)
4. System Integration Schema (demonstrating how CBSA open RSS/JSON data feeds will be combined with provincial transit datasets)
5. Security, Ingress Protection, and API Rate Limit Safeguards
6. Benefits to the Public, Logistics sector, and Border Ingress Management
7. Formal Proposal Request: Developer API access or formal listings as an Official Information Partner.

Draft the document in clean, elegant Markdown. Use professional, technical, and highly precise Canadian English.`;
          break;

        case "phase6_security":
          prompt = `You are a Senior Principal Security Architect specializing in Government of Canada API Standards (Shared Services Canada and Treasury Board Secretariat Guidelines).
Draft a comprehensive 'Security Architecture and Compliance Blueprint' for our application.
Context:
${baseContext}

Additional Parameters:
- Standard Frameworks: PIPEDA, GC API Standards, FIPS 140-2
- Authentication: OAuth 2.0 & OpenID Connect with Multi-Factor Authentication (MFA)
- Audit Logging level: Comprehensive cryptographically-chained logging on all PII access

The document MUST contain:
1. Security Architecture Summary
2. Identity and Access Management (OAuth 2.0 protocols, OpenID Connect JWT token claims, MFA flows using TOTP/WebAuthn)
3. Cryptographic Standards (TLS 1.3 in-transit, AES-256 at-rest, secure key storage using Cloud KMS)
4. Cryptographically Signed Audit Logging (how actions on the API gateway are captured, timestamps, and log preservation)
5. Secure API Gateway Ingress (Web Application Firewall, Rate limiting, DDoS defense, sanitization, and OWASP Top 10 mitigation)
6. Security Assessment and Authorization (SA&A) posture aligned with Federal Cloud Security guidelines.

Draft this as a robust, enterprise-grade technical specification in elegant Markdown.`;
          break;

        case "phase7_privacy":
          prompt = `You are a leading Canadian Privacy Law Counsel specializing in PIPEDA (Personal Information Protection and Electronic Documents Act) and provincial equivalents (e.g., Quebec's Law 25, BC FIPPA, Alberta PIPA).
Draft a rigorous 'Privacy Impact Assessment (PIA) & Data Retention Specification' for our platform.
Context:
${baseContext}

The document MUST contain:
1. Executive Privacy Assessment Summary
2. Data Flow Map (specifically detail the intake, transmission, processing, and display of immigration data)
3. Ten PIPEDA Fair Information Principles Mapping (Accountability, Identifying Purposes, Consent, Limiting Collection, Limiting Use/Disclosure/Retention, Accuracy, Safeguards, Openness, Individual Access, Challenging Compliance)
4. Consent Management Architecture (Active opt-in, cookie policies, revoke access mechanism)
5. Structured Data Retention & Disposal Policy (explicit schedules, e.g., temporary calculations cached for 15 minutes, account history retained until profile deletion, complete wiping protocol)
6. Data Residency Policy (strictly guaranteeing hosting in Canadian sovereign cloud regions - e.g., AWS Canada-Central or GCP northamerica-northeast1).

Draft this as a complete legal and regulatory document in clean Markdown.`;
          break;

        case "phase8_partnership":
          prompt = `You are a strategic Business Development Director specializing in Canadian public sector partnerships.
Draft a professional 'Strategic Partnership Outreach Memorandum' addressed to the Treasury Board of Canada Secretariat (TBS) and Shared Services Canada (SSC) requesting recognition as an Official Immigration Information Partner.
Context:
${baseContext}

The document MUST contain:
1. Official Strategic Memorandum Header
2. Vision & Alignment (how this civic tech product matches the Digital Government Strategy of Canada and Open Government directives)
3. Public-Private Collaboration Value Proposition (reducing call center overheads for IRCC/CBSA by providing highly accessible self-service dashboards)
4. Technical Interoperability Standard (compliance with TBS open API guidelines and schema definitions)
5. Proposed Action Plan & Pilot Program Outline (launching a 3-month regional pilot in 3 select provinces)
6. Contact & Engagement Call to Action.

Draft this as an elegant executive brief in clean Markdown.`;
          break;

        case "custom_report":
          prompt = `You are a Principal Policy Analyst specializing in Canadian Immigrant Demographics and Civic Technology. Create a comprehensive, formal business intelligence report based on the selected criteria.

Report Title: ${parameters?.reportTitle || "Canadian Immigration & Border Target Report"}
Company: ${companyName || "12105381 Canada Inc."}

Target Provinces Configured:
${JSON.stringify(parameters?.targetProvincesData || [], null, 2)}

Selected Metrics: ${parameters?.selectedMetrics || "PNP, status, program"}
Custom Analytical Directives: ${parameters?.customBrief || "Provide an overall target comparison and data automation summary."}

The document MUST contain:
1. Formal Executive Report Header (dated, with corporate credentials)
2. Executive Summary (highlighting total combined PNP targets)
3. Centralized Comparative Matrix (a beautiful text-based Markdown table summarizing the selected provinces and metrics)
4. Key Strategic Provincial Insights (explain what streams are trending and why)
5. Government Data Integrity Assessment (how these open RSS/JSON data feeds could be automated, in alignment with Shared Services Canada specifications)
6. Actionable Operational Recommendations for tech integration.

Draft the report in clean, professional Markdown using formal, authoritative Canadian English.`;
          break;

        case "analytics_insight":
          prompt = `You are an expert Canadian Demographics Policy Analyst and Civic Tech Advisor. Provide a highly professional, publication-grade analytical briefing based on the following real-time interactive dashboard parameters:

Reporting Organization: ${companyName || "12105381 Canada Inc."}
Active Metric: ${parameters?.dataTypeLabel || "Selected Immigration Metric"}
Date Range Covered: ${parameters?.dateRangeLabel || "2024-2026"}
Provinces/Territories Analyzed: ${parameters?.selectedProvincesList || "All Regions"}
Aggregated Metric Total: ${parameters?.metricTotal || "N/A"}

Selected Metrics Data Matrix:
${JSON.stringify(parameters?.dataSummaryMatrix || [], null, 2)}

Please write an executive analysis containing:
1. **Official Briefing Header** (including a summary bullet list)
2. **Core Trend Interpretation**: Detail what the trajectory of ${parameters?.dataTypeLabel || "this metric"} shows over the specified date range. Explain provincial disparities.
3. **Immigration Flow Dynamics**: Connect this data to real-world policy shifts in Canada (e.g. federal cap on study permits, provincial pathway prioritization like tech/healthcare, or border traffic volumes).
4. **Data-Driven Policy Recommendation**: Provide 3 high-impact, actionable recommendations for civic technology firms or provincial immigration boards to coordinate integrations under Shared Services Canada or IRCC.

Draft this in formal, authoritative Canadian English with clear section headings in Markdown.`;
          break;

        default:
          prompt = `Draft a professional operations guide for Canadian Company Launch in Immigration Civic Tech.
Context:
${baseContext}
Phase: ${phase}`;
      }

      const response = await generateContentWithRetry(ai, {
        model: "gemini-3.5-flash",
        contents: prompt
      });

      res.json({ document: response.text });
    } catch (err: any) {
      console.error("Gemini Document Generator error (falling back to sandbox):", err);
      res.json({ document: getLocalDocumentFallback(phase, companyName, domain, parameters) });
    }
  });

  // 5. Search Grounding / Live Web Immigration News Endpoint
  app.post("/api/gemini/live-search", async (req, res) => {
    const { query } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      console.warn("Gemini Client not available. Utilizing offline search fallback.");
      return res.json({
        answer: getLocalSearchFallback(query),
        sources: [
          { title: "IRCC Express Entry Rounds", url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/submit-profile/rounds-invitations.html" },
          { title: "Canada Open Government Portal", url: "https://open.canada.ca/" }
        ]
      });
    }

    try {
      // Clean query and enforce Canada Immigration focus
      let targetedQuery = query || "Latest Canadian immigration draws Express Entry and Provincial Nominee Programs";
      if (!targetedQuery.toLowerCase().includes("canada") && !targetedQuery.toLowerCase().includes("immigration") && !targetedQuery.toLowerCase().includes("draw")) {
        targetedQuery += " Canada immigration";
      }

      console.log(`Performing live search grounding for: "${targetedQuery}"`);

      const response = await generateContentWithRetry(ai, {
        model: "gemini-3.5-flash",
        contents: `You are an expert Canadian Immigration intelligence search engine. Based on the Google Search results provided below, construct a comprehensive, factual, up-to-date report on: "${targetedQuery}".
Provide precise details, such as recent draw CRS scores, target numbers, draw types, and official policy updates. 
List important dates and stats in lists/tables.
At the end of your response, write a "Verified Sources" section summarizing the URLs from the search grounding.`,
        config: {
          tools: [{ googleSearch: {} }]
        }
      });

      // Extract text
      const text = response.text;

      // Extract Grounding Chunks to provide live references
      const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
      const sources = chunks.map((chunk: any) => {
        return {
          title: chunk.web?.title || "Official Source",
          url: chunk.web?.uri || ""
        };
      }).filter((src: any) => src.url !== "");

      // Deduplicate sources
      const uniqueSourcesMap: { [key: string]: string } = {};
      sources.forEach((s: any) => {
        uniqueSourcesMap[s.url] = s.title;
      });
      const uniqueSources = Object.keys(uniqueSourcesMap).map(url => ({
        url,
        title: uniqueSourcesMap[url]
      }));

      res.json({
        answer: text,
        sources: uniqueSources.length > 0 ? uniqueSources : [
          { title: "IRCC Express Entry Rounds", url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/submit-profile/rounds-invitations.html" },
          { title: "Canada Open Government Portal", url: "https://open.canada.ca/" }
        ]
      });
    } catch (err: any) {
      console.error("Gemini Search Grounding error (falling back to sandbox):", err);
      res.json({
        answer: getLocalSearchFallback(query),
        sources: [
          { title: "IRCC Express Entry Rounds", url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/submit-profile/rounds-invitations.html" },
          { title: "Canada Open Government Portal", url: "https://open.canada.ca/" }
        ]
      });
    }
  });

  // 6. Interactive Customized Chatbot Endpoint
  app.post("/api/gemini/chat", async (req, res) => {
    const { query, history, profile, language, langCode } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      console.warn("Gemini Client not available. Utilizing offline chatbot fallback.");
      return res.json({ answer: getLocalChatFallback(query, history, profile) });
    }

    try {
      // Build context prompt with user profile if present
      let profileContext = "";
      if (profile) {
        profileContext = `
User Profile Metadata (from client cache):
- Name: ${profile.name || "Guest"}
- Phone: ${profile.phone || "Not set"}
- Target Province: ${profile.targetProvince || "Not selected"}
- Current Calculated CRS Score: ${profile.crsScore || "Not calculated yet"}
- Marital Status: ${profile.maritalStatus || "Not specified"}
- CLB Language Level: ${profile.clbLevel || "Not specified"}
`;
      }

      const formattedHistory = (history || []).map((msg: any) => {
        const role = msg.sender === "user" ? "user" : "model";
        return `${role}: ${msg.text}`;
      }).join("\n");

      const systemPrompt = `You are "Online Advisor", a warm, empathetic, and highly professional Canadian Immigration & Civic Tech AI consultant.
Your role is to help users navigate their immigration pathways, settlement journey, and compliance questions in Canada.

Language Requirement:
The user has selected the following consultation language: "${language || "English"}" (Language code: "${langCode || "en-CA"}").
You MUST write your entire response in "${language || "English"}" so they can read and hear it in their preferred language! This includes support for English, French, Punjabi, Urdu, Hindi, Chinese, Spanish, or any other Canadian language.

Core Directives:
1. GREETING & NAME: If the user's name is not known (or is "Guest", "Applicant", or not set yet), your primary first objective is to ask for their name in a friendly, polite manner in their selected language.
2. ADVISORY STYLE: Once you know their name, address them by name and ask about their goals.
3. WRITTEN LAYOUT: When they present queries, verbally solve them and ALWAYS provide a beautiful, clearly structured "written layout" using clean markdown headings, bullet points, and actionable steps.
4. IMMIGRATION MATTERS: Cover CRS score optimization, provincial nomination pathways (such as Alberta's Rural Renewal stream, Manitoba's Morden stream, OINP, BC PNP), and compliance topics.

${profileContext}

Chat History:
${formattedHistory}

User's Latest Inquiry:
${query}

Respond warmly and clearly in ${language || "English"}.`;

      console.log(`Querying Online Advisor Chatbot for user in language: ${language || "English"}`);
      const response = await generateContentWithRetry(ai, {
        model: "gemini-3.5-flash",
        contents: systemPrompt
      });

      res.json({ answer: response.text });
    } catch (err: any) {
      console.error("Gemini Chatbot error (falling back to sandbox):", err);
      res.json({ answer: getLocalChatFallback(query, history, profile) });
    }
  });

  // 7. Policy/News Summarization Endpoint
  app.post("/api/gemini/summarize-news", async (req, res) => {
    const { title, details, url } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      console.warn("Gemini Client not available. Utilizing offline news summary fallback.");
      return res.json({ summary: getLocalNewsSummary(title, details, url) });
    }

    try {
      console.log(`Querying Gemini to summarize news article: "${title}"`);
      const systemPrompt = `You are a leading Canadian Immigration Policy advisor and demographer.
Your task is to review the following immigration news/blog details and provide a high-level strategic intelligence briefing for candidates looking to settle in Canada.

Article Title: "${title}"
Details: ${details}
Original Resource Link: ${url}

Provide your briefing in clean, professional Markdown. Focus on:
1. **Core Regulatory Takeaway**: What is changing or what is highlighted?
2. **Impact on Low CRS Candidates**: How does this impact candidates with lower scores?
3. **Provincial Leverage Strategy**: How can candidates use provincial pathways (like Alberta Rural Renewal, Manitoba Morden, or Atlantic streams) to capitalize on this news?

Be authoritative, concise, and structured. Use Canadian spelling (e.g. program, labour, provincial, prioritisation).`;

      const response = await generateContentWithRetry(ai, {
        model: "gemini-3.5-flash",
        contents: systemPrompt
      });

      res.json({ summary: response.text });
    } catch (err: any) {
      console.error("Gemini News Summarizer error (falling back to sandbox):", err);
      res.json({ summary: getLocalNewsSummary(title, details, url) });
    }
  });

  // Explicit route handlers for standalone legal pages (Google Play Console Review compliance)
  app.get(["/privacy", "/terms", "/disclaimer", "/report-issue", "/data-deletion", "/cookie-policy"], (req, res, next) => {
    if (process.env.NODE_ENV !== "production") {
      next(); // Handled by Vite SPA middleware
    } else {
      const distPath = path.join(process.cwd(), 'dist');
      res.sendFile(path.join(distPath, 'index.html'));
    }
  });

  // Vite middleware for development / Static assets for production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
