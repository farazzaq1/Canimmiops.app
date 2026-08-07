export interface Province {
  id: string;
  name: string;
  capital: string;
  type: string;
  program: string;
  status: string;
  newsUrl: string;
  details: string;
  targets: {
    PNP: number;
    ExpressEntryAligned?: number;
    [key: string]: number | undefined;
  };
  openDataFeeds: Array<{
    name: string;
    url: string;
    type: string;
  }>;
}

export interface FederalSource {
  category: string;
  title: string;
  description: string;
  format: string;
  licence: string;
  portalUrl: string;
}

export interface PhaseChecklist {
  id: string;
  title: string;
  description: string;
  status: "not_started" | "in_progress" | "completed";
  items: Array<{
    text: string;
    completed: boolean;
  }>;
  documentType?: "phase4_ircc" | "phase5_cbsa" | "phase6_security" | "phase7_privacy" | "phase8_partnership";
}

export interface SavedDocument {
  id: string;
  phaseId: string;
  title: string;
  content: string;
  companyName: string;
  domain: string;
  createdAt: string;
}

export interface DraftReport {
  id: string;
  title: string;
  provinceId?: string;
  metrics: string[];
  reportContent: string;
  createdAt: string;
}
