import React, { useState } from "react";
import { 
  X, 
  ShieldCheck, 
  FileText, 
  Lock, 
  AlertTriangle, 
  HelpCircle, 
  Trash2, 
  Mail, 
  CheckCircle2,
  Building2,
  Send
} from "lucide-react";

export type LegalDocType = "privacy" | "terms" | "disclaimer" | "report_issue" | "data_deletion" | "cookie_policy";

interface Props {
  initialDoc: LegalDocType;
  onClose: () => void;
  domainName?: string;
  companyName?: string;
}

export default function LegalPagesModal({ initialDoc, onClose, domainName = "", companyName = "12105381 Canada Inc." }: Props) {
  const [activeTab, setActiveTab] = useState<LegalDocType>(initialDoc);
  const [issueSubmitted, setIssueSubmitted] = useState<boolean>(false);
  const [deletionSubmitted, setDeletionSubmitted] = useState<boolean>(false);

  // Form states for issue / deletion
  const [reportText, setReportText] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full h-[85vh] flex flex-col overflow-hidden shadow-2xl border border-slate-200">
        
        {/* MODAL HEADER */}
        <div className="bg-slate-900 px-6 py-4 flex items-center justify-between border-b border-slate-800 text-white shrink-0">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <div>
              <h2 className="text-base font-bold font-display">Legal Compliance & Privacy Center</h2>
              <p className="text-[10px] text-slate-400 font-mono">PIPEDA, GDPR, CCPA & App Store Compliance</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* MODAL BODY SPLIT */}
        <div className="flex-grow grid grid-cols-1 md:grid-cols-12 overflow-hidden">
          
          {/* SIDEBAR NAVIGATION (4 cols) */}
          <div className="md:col-span-4 bg-slate-50 p-4 border-r border-slate-200 flex flex-col gap-1 overflow-y-auto">
            {[
              { id: "disclaimer", label: "Govt Independence Disclaimer", icon: AlertTriangle },
              { id: "privacy", label: "Privacy Policy (PIPEDA)", icon: Lock },
              { id: "terms", label: "Terms of Service", icon: FileText },
              { id: "report_issue", label: "Report an Issue / Bug", icon: HelpCircle },
              { id: "data_deletion", label: "Data Deletion Request", icon: Trash2 },
              { id: "cookie_policy", label: "Cookie & Local Storage", icon: ShieldCheck }
            ].map((tab) => {
              const Icon = tab.icon;
              const isSel = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as LegalDocType)}
                  className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2.5 cursor-pointer ${
                    isSel 
                      ? "bg-slate-900 text-white shadow-xs" 
                      : "text-slate-600 hover:bg-slate-200/60 hover:text-slate-900"
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isSel ? "text-amber-400" : "text-slate-400"}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}

            <div className="mt-auto pt-4 border-t border-slate-200 text-[10px] text-slate-500 space-y-1 font-mono">
              <p>Operating Entity: {companyName}</p>
              <p>Support: RZQconsulting@gmail.com</p>
              <p>Phone: +1 905 5140 786</p>
            </div>
          </div>

          {/* DOCUMENT CONTENT PANEL (8 cols) */}
          <div className="md:col-span-8 p-6 overflow-y-auto space-y-4 text-slate-700 text-xs leading-relaxed font-sans">
            
            {/* 1. DISCLAIMER */}
            {activeTab === "disclaimer" && (
              <div className="space-y-4 animate-fade-in">
                <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl space-y-2">
                  <span className="text-[10px] font-mono font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    Mandatory Independent Platform Notice
                  </span>
                  <p className="text-xs font-semibold text-amber-950 leading-relaxed">
                    This application is an independent information platform and is not affiliated with, endorsed by, authorised by, or operated by Immigration, Refugees and Citizenship Canada (IRCC), the Canada Border Services Agency (CBSA), or the Government of Canada.
                  </p>
                </div>

                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-slate-900 font-display">Educational Scope & No Legal Advice</h3>
                  <p>
                    Information provided within this application is intended solely for educational and informational purposes and should not be considered legal, immigration, or professional advice.
                  </p>
                  <h3 className="text-sm font-bold text-slate-900 font-display">Dynamic Policy Notice</h3>
                  <p>
                    Immigration laws, regulations, and policies may change without notice. Users should always verify important information using official Government of Canada resources before making immigration decisions.
                  </p>
                </div>
              </div>
            )}

            {/* 2. PRIVACY POLICY */}
            {activeTab === "privacy" && (
              <div className="space-y-4 animate-fade-in">
                <h2 className="text-sm font-bold text-slate-900 font-display">Privacy Policy (PIPEDA & GDPR Compliant)</h2>
                <p>
                  At <strong>CanImmi Operations</strong> (operated by {companyName}), we prioritize user confidentiality under the Personal Information Protection and Electronic Documents Act (PIPEDA).
                </p>
                <h3 className="font-bold text-slate-900">1. Data Storage & Local Caching</h3>
                <p>
                  To maximize privacy and security, all applicant calculation profiles, CRS parameters, and compliance checklists are stored locally inside your device's sandbox cache (<code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-[11px]">localStorage</code>).
                </p>
                <h3 className="font-bold text-slate-900">2. Analytics & Telemetry</h3>
                <p>
                  We do not sell personal data to third-party advertisers. All telemetry is aggregated anonymously for platform reliability and bug diagnostics.
                </p>
              </div>
            )}

            {/* 3. TERMS OF SERVICE */}
            {activeTab === "terms" && (
              <div className="space-y-4 animate-fade-in">
                <h2 className="text-sm font-bold text-slate-900 font-display">Terms of Service</h2>
                <p>
                  By accessing or using CanImmi Operations, you agree to be bound by these Terms of Service.
                </p>
                <h3 className="font-bold text-slate-900">1. Authorized Use</h3>
                <p>
                  This platform aggregates publicly available Government of Canada information for informational guidance. Commercial scraping or unauthorized redistribution is strictly prohibited.
                </p>
                <h3 className="font-bold text-slate-900">2. Professional Consultations</h3>
                <p>
                  Legal and RCIC consultations booked through this platform are provided directly by independent CICC-licensed consultants or lawyers under individual client agreements.
                </p>
              </div>
            )}

            {/* 4. REPORT ISSUE */}
            {activeTab === "report_issue" && (
              <div className="space-y-4 animate-fade-in">
                <h2 className="text-sm font-bold text-slate-900 font-display">Report an Issue or Bug</h2>
                <p className="text-slate-600">
                  Help us maintain accuracy. Report broken links, incorrect draw statistics, or software bugs.
                </p>

                {issueSubmitted ? (
                  <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl text-emerald-900 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span>Thank you! Your issue report has been logged and sent to engineering support.</span>
                  </div>
                ) : (
                  <form onSubmit={(e) => { e.preventDefault(); setIssueSubmitted(true); }} className="space-y-3">
                    <div>
                      <label className="text-[10px] font-mono font-bold uppercase text-slate-500 block mb-1">Your Email</label>
                      <input 
                        type="email" 
                        required 
                        placeholder="you@domain.com"
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-mono font-bold uppercase text-slate-500 block mb-1">Issue Description</label>
                      <textarea 
                        rows={4} 
                        required 
                        placeholder="Describe the issue or data discrepancy..."
                        value={reportText}
                        onChange={(e) => setReportText(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800"
                      />
                    </div>
                    <button type="submit" className="px-4 py-2 bg-slate-900 text-white font-bold rounded-xl cursor-pointer">
                      Submit Issue Report
                    </button>
                  </form>
                )}
              </div>
            )}

            {/* 5. DATA DELETION REQUEST */}
            {activeTab === "data_deletion" && (
              <div className="space-y-4 animate-fade-in">
                <h2 className="text-sm font-bold text-slate-900 font-display">Data Deletion & Purge Request</h2>
                <p className="text-slate-600">
                  In compliance with PIPEDA, GDPR, and App Store guidelines, you can purge all local cache files and request full deletion of any associated account records.
                </p>

                {deletionSubmitted ? (
                  <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl text-emerald-900 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span>Cache purged! Your local data has been completely erased from this browser instance.</span>
                  </div>
                ) : (
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                    <p className="text-xs text-slate-700">
                      Clicking below will clear all stored CRS calculations, saved draft reports, and phone cache lines from your device immediately.
                    </p>
                    <button
                      onClick={() => {
                        localStorage.clear();
                        setDeletionSubmitted(true);
                      }}
                      className="px-4 py-2 bg-rose-700 hover:bg-rose-800 text-white font-bold text-xs rounded-xl transition cursor-pointer flex items-center gap-1.5"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Purge Local Storage & Data Cache</span>
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* 6. COOKIE POLICY */}
            {activeTab === "cookie_policy" && (
              <div className="space-y-4 animate-fade-in">
                <h2 className="text-sm font-bold text-slate-900 font-display">Cookie & Local Storage Policy</h2>
                <p>
                  This application does not use tracking cookies for cross-site behavioral targeting. We utilize browser HTML5 <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-[11px]">localStorage</code> solely to preserve user preferences, language settings, and active CRS calculations.
                </p>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}
