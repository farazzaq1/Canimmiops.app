import { PhaseChecklist } from "../types";

export const INITIAL_PHASES: PhaseChecklist[] = [
  {
    id: "phase1",
    title: "Phase 1: Register Canadian Company",
    description: "Before approaching government agencies, establish a legitimate corporate structure to build trust and accountability.",
    status: "completed",
    items: [
      { text: "Incorporate federally (Canada Corporations Act) or provincially (e.g. Ontario, BC).", completed: true },
      { text: "Obtain an official 9-digit Business Number (BN) from the Canada Revenue Agency (CRA).", completed: true },
      { text: "Register for GST/HST account with the CRA.", completed: true },
      { text: "Launch professional company website with dedicated domain.", completed: true },
      { text: "Publish clear, comprehensive Privacy Policy and Terms of Service.", completed: true },
      { text: "Develop and deploy the initial Minimum Viable Product (MVP) dashboard.", completed: true }
    ]
  },
  {
    id: "phase2",
    title: "Phase 2: Build the MVP First",
    description: "Develop the software utilizing public, non-authenticated information before requesting private APIs or partnership sandboxes.",
    status: "in_progress",
    items: [
      { text: "Map immigration data categories from IRCC public announcements.", completed: true },
      { text: "Incorporate CBSA public border wait times into map interfaces.", completed: true },
      { text: "Centralize provincial nominee programs (PNP) draw thresholds across 13 provinces/territories.", completed: false },
      { text: "Download and organize key historical datasets from open.canada.ca portal.", completed: false }
    ]
  },
  {
    id: "phase3",
    title: "Phase 3: Map Public Feeds & Open APIs",
    description: "Scan official catalogs for JSON, XML, or RSS feeds available under the highly permissive Open Government Licence - Canada.",
    status: "in_progress",
    items: [
      { text: "Incorporate IRCC Newsroom RSS alerts for draw notifications.", completed: true },
      { text: "Index Statistics Canada immigration census data tables via public Web Services.", completed: false },
      { text: "Locate and connect to the CBSA border wait time JSON endpoints.", completed: false },
      { text: "Add Open Government Licence compliance attributes in page footers.", completed: true }
    ]
  },
  {
    id: "phase4",
    title: "Phase 4: Contact IRCC Digital Services",
    description: "Prepare and submit a structured proposal outlining how your secure civic-tech service benefits newcomers.",
    status: "not_started",
    items: [
      { text: "Compile detailed Company Profile and Core Team expertise summary.", completed: false },
      { text: "Take high-fidelity app screenshots demonstrating centralized data reporting.", completed: false },
      { text: "Formalize expected user traffic metrics and server auto-scale metrics.", completed: false },
      { text: "Generate a professional IRCC Partnership and Sandbox API proposal.", completed: false }
    ],
    documentType: "phase4_ircc"
  },
  {
    id: "phase5",
    title: "Phase 5: Contact CBSA Public Affairs",
    description: "Present a professional technical proposal to CBSA to secure developer interfaces or direct travel data integration feeds.",
    status: "not_started",
    items: [
      { text: "Map intended border crossings, land ports, and airport terminals to display.", completed: false },
      { text: "Specify the travel alerts and custom regulations database integrations.", completed: false },
      { text: "Identify the CBSA digital operations or public relations contact channels.", completed: false },
      { text: "Generate the CBSA Technical Integration proposal outlining public transit benefit.", completed: false }
    ],
    documentType: "phase5_cbsa"
  },
  {
    id: "phase6",
    title: "Phase 6: Demonstrate Strong Security",
    description: "Align your technical infrastructure directly with the strict Guidelines for Government of Canada API Standards.",
    status: "not_started",
    items: [
      { text: "Enforce OAuth 2.0 and OpenID Connect (OIDC) protocols for secure user logins.", completed: false },
      { text: "Implement SSL/TLS 1.3 encryption in transit and AES-256 encryption at rest.", completed: false },
      { text: "Configure Multi-Factor Authentication (MFA) for user accounts & developers.", completed: false },
      { text: "Establish an immutable, cryptographically chained Audit Logging pipeline.", completed: false },
      { text: "Generate the Security Architecture and Compliance Blueprint document.", completed: false }
    ],
    documentType: "phase6_security"
  },
  {
    id: "phase7",
    title: "Phase 7: Guarantee Privacy Compliance",
    description: "Immigration data is highly sensitive. Demonstrate strict compliance with PIPEDA and federal/provincial privacy laws.",
    status: "not_started",
    items: [
      { text: "Complete a thorough Privacy Impact Assessment (PIA) for the tech stack.", completed: false },
      { text: "Establish strict Data Retention schedules and automated disposal scripts.", completed: false },
      { text: "Implement active opt-in Consent Management with granular privacy control panels.", completed: false },
      { text: "Commit to sovereign hosting solely in Canadian cloud datacenter regions.", completed: false },
      { text: "Generate the Privacy Impact Assessment & Data Retention Statement.", completed: false }
    ],
    documentType: "phase7_privacy"
  },
  {
    id: "phase8",
    title: "Phase 8: Forge Government Partnerships",
    description: "Position your startup not as a standard commercial API user, but as a recognized Information Partner helping newcomers.",
    status: "not_started",
    items: [
      { text: "Target TBS (Treasury Board Secretariat) and Shared Services Canada contacts.", completed: false },
      { text: "Prepare a civic-tech presentation matching Canada's Digital Government Strategy.", completed: false },
      { text: "Pitch automated reporting adapters to provincial immigration authorities.", completed: false },
      { text: "Generate the Strategic Partnership Outreach Memorandum.", completed: false }
    ],
    documentType: "phase8_partnership"
  }
];
