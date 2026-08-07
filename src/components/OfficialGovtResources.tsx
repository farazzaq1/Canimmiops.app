import React, { useState } from "react";
import { 
  ExternalLink, 
  Search, 
  ShieldCheck, 
  FileText, 
  Clock, 
  Calculator, 
  HelpCircle, 
  UserCheck, 
  Globe, 
  Building2, 
  Scale, 
  CheckCircle2,
  AlertTriangle,
  Info
} from "lucide-react";

interface ResourceLink {
  id: string;
  category: "ircc" | "cbsa" | "provincial" | "gazette";
  title: string;
  description: string;
  url: string;
  officialTag: string;
  iconName: string;
  recommendedFor: string;
}

const OFFICIAL_RESOURCES: ResourceLink[] = [
  {
    id: "ircc-home",
    category: "ircc",
    title: "IRCC Official Homepage",
    description: "The primary Government of Canada hub for immigration, permanent residency, visas, work permits, and citizenship.",
    url: "https://www.canada.ca/en/immigration-refugees-citizenship.html",
    officialTag: "Government of Canada (IRCC)",
    iconName: "Globe",
    recommendedFor: "General information, starting applications & policy updates"
  },
  {
    id: "ircc-processing-times",
    category: "ircc",
    title: "IRCC Application Processing Times Tool",
    description: "Real-time official estimated processing times for Express Entry, Study Permits, Work Permits, and Spousal Sponsorships.",
    url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/application/check-processing-times.html",
    officialTag: "IRCC Live Calculator",
    iconName: "Clock",
    recommendedFor: "Checking how long your specific application stream takes"
  },
  {
    id: "ircc-forms",
    category: "ircc",
    title: "Official IRCC Application Forms & Guides",
    description: "Direct access to official PDF application packages (IMM 5669, IMM 0008, IMM 5406) and official instruction guides.",
    url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/application/application-forms-guides.html",
    officialTag: "Official Government PDF Forms",
    iconName: "FileText",
    recommendedFor: "Downloading authorized application form packages"
  },
  {
    id: "ircc-fee-calculator",
    category: "ircc",
    title: "IRCC Fee Calculator",
    description: "Official government tool to calculate processing fees, biometric fees, and Right of Permanent Residence Fees (RPRF).",
    url: "https://www.ircc.canada.ca/english/information/fees/index.asp",
    officialTag: "Official Fee Portal",
    iconName: "Calculator",
    recommendedFor: "Verifying exact government fee totals before payment"
  },
  {
    id: "ircc-webform",
    category: "ircc",
    title: "IRCC Webform & Inquiry Portal",
    description: "Official secure portal for submitting status inquiries, updating contact info, or uploading additional documents.",
    url: "https://secure.cic.gc.ca/enquiries-renseignements/canada-case-cas-eng.aspx",
    officialTag: "Secure Case Portal",
    iconName: "HelpCircle",
    recommendedFor: "Communicating directly with IRCC about pending applications"
  },
  {
    id: "ircc-account-login",
    category: "ircc",
    title: "IRCC Secure Account Login (GCKey & Sign-In Partner)",
    description: "Access your online IRCC account to view application status, messages, and biometrics requests.",
    url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/application/account.html",
    officialTag: "GCKey / Authorized Sign-In",
    iconName: "UserCheck",
    recommendedFor: "Managing submitted applications and uploading requested files"
  },
  {
    id: "cbsa-portal",
    category: "cbsa",
    title: "CBSA Border Services & Travel Portal",
    description: "Canada Border Services Agency official portal for port-of-entry requirements, customs declarations, and border wait times.",
    url: "https://www.cbsa-asfc.gc.ca/menu-eng.html",
    officialTag: "CBSA Official Portal",
    iconName: "Building2",
    recommendedFor: "Travelers, port of entry procedures, and customs regulations"
  },
  {
    id: "canada-gazette",
    category: "gazette",
    title: "Canada Gazette - Official Regulations",
    description: "Official newspaper of the Government of Canada publishing legislative notices, Ministerial Instructions, and IRCC regulation changes.",
    url: "https://www.gazette.gc.ca/",
    officialTag: "Official Legislative Gazette",
    iconName: "Scale",
    recommendedFor: "Reviewing official legal statutes and Ministerial Instructions"
  }
];

interface Props {
  onOpenInAppViewer: (url: string, title: string) => void;
}

export default function OfficialGovtResources({ onOpenInAppViewer }: Props) {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  const filteredResources = OFFICIAL_RESOURCES.filter(res => {
    const matchesCategory = categoryFilter === "all" || res.category === categoryFilter;
    const matchesSearch = 
      res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.recommendedFor.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-fade-in max-w-7xl mx-auto px-4 sm:px-6 py-6">
      
      {/* HEADER BANNER */}
      <div className="bg-gradient-to-r from-red-900 via-red-950 to-slate-900 text-white p-6 sm:p-8 rounded-2xl border border-red-800/40 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-950/80 border border-red-700/50 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider text-red-200">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Verified Government Portals
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-black tracking-tight text-white">
              Official Government Resources
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
              Direct access to authoritative, official Government of Canada domains (<code className="bg-red-950/60 px-1.5 py-0.5 rounded text-amber-300 font-mono">.gc.ca</code> and <code className="bg-red-950/60 px-1.5 py-0.5 rounded text-amber-300 font-mono">canada.ca</code>). Always verify important immigration information directly on official portals.
            </p>
          </div>
        </div>

        {/* INDEPENDENCE NOTICE */}
        <div className="bg-slate-950/80 p-4 rounded-xl border border-red-900/40 flex items-start gap-3 text-xs text-slate-300">
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-bold text-amber-200 uppercase tracking-wider text-[10px] font-mono">
              Government Independence Notice
            </p>
            <p className="leading-relaxed text-[11px] text-slate-300">
              This application is an independent information platform operated by 12105381 Canada Inc. and is <strong>not affiliated with, endorsed by, authorised by, or operated by</strong> Immigration, Refugees and Citizenship Canada (IRCC), the Canada Border Services Agency (CBSA), or the Government of Canada.
            </p>
          </div>
        </div>
      </div>

      {/* SEARCH AND FILTERS */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search official portals, forms, tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
            {[
              { id: "all", label: "All Portals" },
              { id: "ircc", label: "IRCC Tools" },
              { id: "cbsa", label: "CBSA Border" },
              { id: "gazette", label: "Official Gazette" }
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setCategoryFilter(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  categoryFilter === cat.id
                    ? "bg-red-700 text-white shadow-xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* RESOURCE CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        {filteredResources.map((resource) => (
          <div 
            key={resource.id}
            className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-red-300 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-full text-[10px] font-mono font-bold">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  {resource.officialTag}
                </span>
                <span className="text-[10px] font-mono text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                  Official Source
                </span>
              </div>

              <div className="space-y-1">
                <h2 className="text-base font-bold text-slate-900 group-hover:text-red-700 transition-colors font-display">
                  {resource.title}
                </h2>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {resource.description}
                </p>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-[11px] text-slate-600 flex items-start gap-2">
                <Info className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                <span><strong>Recommended For:</strong> {resource.recommendedFor}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => onOpenInAppViewer(resource.url, resource.title)}
                className="flex-1 px-3 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Preview in Safe Portal</span>
              </button>
              <a
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 bg-red-700 hover:bg-red-800 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
              >
                <span>Official Web</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {filteredResources.length === 0 && (
        <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center space-y-3">
          <Search className="w-8 h-8 text-slate-300 mx-auto" />
          <h3 className="text-sm font-bold text-slate-700">No resources matched your search</h3>
          <p className="text-xs text-slate-500">Try adjusting your keyword filter or switching category tabs.</p>
          <button
            onClick={() => { setSearchQuery(""); setCategoryFilter("all"); }}
            className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      )}

    </div>
  );
}
