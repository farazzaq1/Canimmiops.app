import React, { useState, useEffect } from "react";
import { 
  ShieldCheck, 
  FileText, 
  Lock, 
  AlertTriangle, 
  HelpCircle, 
  Trash2, 
  Mail, 
  CheckCircle2, 
  Copy, 
  Printer, 
  ArrowLeft, 
  Globe, 
  Building2, 
  Phone, 
  ExternalLink,
  Check
} from "lucide-react";

export type LegalDocType = "privacy" | "terms" | "disclaimer" | "report-issue" | "data-deletion" | "cookie-policy";

interface Props {
  initialDoc?: LegalDocType;
  onNavigateBack?: () => void;
  domainName?: string;
  companyName?: string;
}

export default function LegalPagesView({ 
  initialDoc = "privacy", 
  onNavigateBack,
  domainName = "", 
  companyName = "12105381 Canada Inc." 
}: Props) {
  const [activeTab, setActiveTab] = useState<LegalDocType>(initialDoc);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [issueSubmitted, setIssueSubmitted] = useState<boolean>(false);
  const [deletionSubmitted, setDeletionSubmitted] = useState<boolean>(false);

  // Form states
  const [userEmail, setUserEmail] = useState<string>("");
  const [reportText, setReportText] = useState<string>("");
  const [issueCategory, setIssueCategory] = useState<string>("bug");

  // Keep activeTab in sync with initialDoc prop if changed externally
  useEffect(() => {
    if (initialDoc) {
      setActiveTab(initialDoc);
    }
  }, [initialDoc]);

  // Update hash when tab changes
  const handleTabChange = (tab: LegalDocType) => {
    setActiveTab(tab);
    if (typeof window !== "undefined") {
      window.location.hash = tab;
    }
  };

  const handleCopyDirectLink = () => {
    if (typeof window !== "undefined") {
      const currentUrl = `${window.location.origin}${window.location.pathname}#${activeTab}`;
      navigator.clipboard.writeText(currentUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans pb-16 animate-fade-in selection:bg-indigo-500 selection:text-white">
      {/* TOP HEADER / BREADCRUMB */}
      <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            {onNavigateBack && (
              <button
                onClick={onNavigateBack}
                className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-xl transition cursor-pointer border border-slate-700 flex items-center gap-1 text-xs font-bold"
                title="Return to Main Application"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Back to App</span>
              </button>
            )}
            <div className="flex items-center gap-2">
              <div className="p-2 bg-indigo-950 border border-indigo-500/30 rounded-xl text-indigo-400">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <h1 className="text-base sm:text-lg font-bold font-display text-white leading-tight">
                  Legal & Compliance Documentation Portal
                </h1>
                <p className="text-[11px] text-slate-400 font-mono">
                  Google Play Console, PIPEDA & GDPR Authorized Legal Pages
                </p>
              </div>
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyDirectLink}
              className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-xs transition cursor-pointer border border-indigo-400/30 flex items-center gap-1.5 shadow-sm"
              title="Copy direct URL to paste into Google Play Console"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedLink ? "URL Copied!" : "Copy Direct URL"}</span>
            </button>
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl font-bold text-xs transition cursor-pointer border border-slate-700 flex items-center gap-1.5"
              title="Print current legal page"
            >
              <Printer className="w-3.5 h-3.5 text-slate-400" />
              <span className="hidden sm:inline">Print Page</span>
            </button>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT CONTAINER */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        
        {/* COMPLIANCE STATUS BADGE BANNER */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950/60 to-slate-900 border border-indigo-900/50 rounded-2xl p-4 sm:p-5 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="bg-emerald-950/80 text-emerald-300 border border-emerald-500/30 text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Official Standalone Legal URL
              </span>
              <span className="text-slate-400 text-xs hidden sm:inline">• Verified Entity</span>
            </div>
            <p className="text-sm font-semibold text-slate-200">
              Direct accessible links for Google Play Console review, PIPEDA compliance, and user protection.
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-300 bg-slate-900/80 p-3 rounded-xl border border-slate-800 shrink-0 font-mono">
            <Building2 className="w-4 h-4 text-amber-400 shrink-0" />
            <div>
              <p className="font-bold text-white">{companyName}</p>
              {domainName && <p className="text-[10px] text-slate-400">Domain: {domainName}</p>}
            </div>
          </div>
        </div>

        {/* PAGE NAVIGATION TABS */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-slate-800">
          {[
            { id: "privacy", label: "Privacy Policy (PIPEDA)", icon: Lock, hash: "#privacy" },
            { id: "terms", label: "Terms & Conditions", icon: FileText, hash: "#terms" },
            { id: "disclaimer", label: "Government Disclaimer", icon: AlertTriangle, hash: "#disclaimer" },
            { id: "report-issue", label: "Report an Issue / Bug", icon: HelpCircle, hash: "#report-issue" },
            { id: "data-deletion", label: "Data Deletion Request", icon: Trash2, hash: "#data-deletion" },
            { id: "cookie-policy", label: "Cookie & Storage Policy", icon: ShieldCheck, hash: "#cookie-policy" }
          ].map((tab) => {
            const Icon = tab.icon;
            const isSel = activeTab === tab.id;
            return (
              <a
                key={tab.id}
                href={tab.hash}
                onClick={(e) => {
                  e.preventDefault();
                  handleTabChange(tab.id as LegalDocType);
                }}
                className={`px-4 py-2.5 rounded-xl font-bold text-xs transition flex items-center gap-2 shrink-0 border cursor-pointer ${
                  isSel
                    ? "bg-indigo-600 text-white border-indigo-400 shadow-md scale-[1.02]"
                    : "bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <Icon className={`w-4 h-4 ${isSel ? "text-amber-300" : "text-slate-400"}`} />
                <span>{tab.label}</span>
              </a>
            );
          })}
        </div>

        {/* STANDALONE DOCUMENT CARD */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6 text-slate-300 text-sm leading-relaxed">
          
          {/* 1. PRIVACY POLICY */}
          {activeTab === "privacy" && (
            <article className="space-y-6 animate-fade-in max-w-4xl">
              <div className="border-b border-slate-800 pb-4 space-y-1">
                <span className="text-xs font-mono font-bold text-indigo-400 uppercase tracking-widest block">
                  Official Policy Document • Effective Date: January 1, 2026
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-white font-display">
                  Privacy Policy (PIPEDA & GDPR Compliant)
                </h2>
              </div>

              <p className="text-slate-200 leading-relaxed font-medium">
                At <strong>CanImmi Operations</strong> (operated by <strong>{companyName}</strong>{domainName ? `, accessible via <strong>${domainName}</strong>` : ""}), we strictly respect the privacy of every candidate navigating the Canadian immigration journey. This Privacy Policy details our data governance practices under Canada’s <em>Personal Information Protection and Electronic Documents Act (PIPEDA)</em>, the <em>General Data Protection Regulation (GDPR)</em>, and Google Play Store Developer Guidelines.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <h3 className="font-bold text-white text-sm flex items-center gap-2">
                    <Lock className="w-4 h-4 text-emerald-400" />
                    1. On-Device Local Sandbox Caching
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    All candidate CRS scores, language test scores, provincial target selections, and checklist milestones remain stored inside your device's sandbox local cache (<code className="bg-slate-900 px-1 py-0.5 rounded font-mono text-[11px] text-amber-300">localStorage</code>). Your private credentials are never harvested or sold.
                  </p>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <h3 className="font-bold text-white text-sm flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-sky-400" />
                    2. Telemetry & Analytics Diagnostics
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Anonymized diagnostic telemetry is gathered solely to maintain server availability, open-data feed uptime, and software stability. No personal identification profiles are attached to diagnostic logs.
                  </p>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <h3 className="text-base font-bold text-white font-display">3. Third-Party Links & Open Data Feeds</h3>
                <p className="text-xs leading-relaxed text-slate-300">
                  Our app displays live feeds from official Government of Canada websites (<code className="text-indigo-300">canada.ca</code>, <code className="text-indigo-300">cic.gc.ca</code>, <code className="text-indigo-300">cbsa-asfc.gc.ca</code>). When navigating external portals via our In-App Viewer, your session is protected by standard SSL encryption.
                </p>

                <h3 className="text-base font-bold text-white font-display pt-2">4. Your Data Control Rights</h3>
                <p className="text-xs leading-relaxed text-slate-300">
                  Under PIPEDA and GDPR, you have the right to inspect, export, or purge all data stored on your device at any time. You can execute an instant cache purge directly on our <a href="#data-deletion" onClick={(e) => { e.preventDefault(); handleTabChange("data-deletion"); }} className="text-amber-400 underline font-bold">Data Deletion Page</a>.
                </p>

                <h3 className="text-base font-bold text-white font-display pt-2">5. Privacy Officer Contact</h3>
                <p className="text-xs text-slate-300 font-mono">
                  Corporate Entity: {companyName}<br />
                  Privacy Inquiries: RZQconsulting@gmail.com<br />
                  Phone Support: +1 905 5140 786<br />
                  {domainName && <>Primary Web Domain: {domainName}<br /></>}
                </p>
              </div>
            </article>
          )}

          {/* 2. TERMS OF SERVICE */}
          {activeTab === "terms" && (
            <article className="space-y-6 animate-fade-in max-w-4xl">
              <div className="border-b border-slate-800 pb-4 space-y-1">
                <span className="text-xs font-mono font-bold text-indigo-400 uppercase tracking-widest block">
                  User Terms Agreement • Version 2026.2
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-white font-display">
                  Terms & Conditions of Service
                </h2>
              </div>

              <p className="text-slate-200 leading-relaxed">
                Welcome to <strong>CanImmi Operations</strong>. By downloading, accessing, or using this application on Web, Android, or Tablet devices, you agree to be bound by these Terms & Conditions.
              </p>

              <div className="space-y-4">
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <h3 className="font-bold text-white text-sm">1. Authorized Non-Commercial Educational Use</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    This platform synthesizes publicly available Canadian immigration draws, provincial nominee target allocations, and border telemetry for informational purposes. Reverse engineering, automated web scraping, or unauthorized commercial resale of our algorithms is strictly prohibited.
                  </p>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <h3 className="font-bold text-white text-sm">2. Independent Professional Consultations</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Consultations requested through our directory are fulfilled directly by independent Regulated Canadian Immigration Consultants (RCICs) or CICC-licensed immigration lawyers. Retainer agreements are executed independently between the user and the licensed practitioner.
                  </p>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <h3 className="font-bold text-white text-sm">3. Limitation of Liability</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Immigration policies, CRS score draw thresholds, and processing fee schedules are subject to rapid change by IRCC without notice. {companyName} accepts no liability for decisions made based on calculated scores or estimated timelines. Users must verify all requirements on official government websites (<code className="text-indigo-300">canada.ca</code>).
                  </p>
                </div>
              </div>
            </article>
          )}

          {/* 3. GOVERNMENT INDEPENDENCE DISCLAIMER */}
          {activeTab === "disclaimer" && (
            <article className="space-y-6 animate-fade-in max-w-4xl">
              <div className="border-b border-slate-800 pb-4 space-y-1">
                <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest block flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  Mandatory Legal Notice
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-white font-display">
                  Government Independence & Non-Affiliation Disclaimer
                </h2>
              </div>

              <div className="bg-amber-950/40 border border-amber-500/40 p-5 rounded-2xl space-y-3 text-amber-100">
                <h3 className="text-base font-bold text-amber-300 font-display flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
                  IMPORTANT NOTICE FOR ALL APPLICANTS
                </h3>
                <p className="text-sm leading-relaxed font-semibold">
                  This application is an independent private informational utility created by <strong>{companyName}</strong>. It is NOT affiliated with, endorsed by, authorized by, sponsored by, or in any way officially connected with Immigration, Refugees and Citizenship Canada (IRCC), the Canada Border Services Agency (CBSA), or the Government of Canada.
                </p>
              </div>

              <div className="space-y-4 pt-2">
                <h3 className="text-base font-bold text-white font-display">1. Official Government Sources</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  All official application forms, study permits, work permit renewals, and PR draw announcements must be submitted directly through official Government of Canada web portals (<a href="https://www.canada.ca" target="_blank" rel="noopener noreferrer" className="text-indigo-400 underline font-bold">www.canada.ca</a>).
                </p>

                <h3 className="text-base font-bold text-white font-display">2. Educational Calculations</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Calculations generated by our CRS Score Simulator and Provincial Preference Index are estimates provided for self-assessment purposes. Official score determination rests solely with IRCC officers during formal application review.
                </p>
              </div>
            </article>
          )}

          {/* 4. REPORT AN ISSUE / BUG */}
          {activeTab === "report-issue" && (
            <article className="space-y-6 animate-fade-in max-w-4xl">
              <div className="border-b border-slate-800 pb-4 space-y-1">
                <span className="text-xs font-mono font-bold text-sky-400 uppercase tracking-widest block">
                  Engineering & Data Integrity Feedback
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-white font-display">
                  Report an Issue or Software Bug
                </h2>
              </div>

              <p className="text-slate-200">
                Found a broken link, data discrepancy, or software glitch? Submit a report directly to our technical desk.
              </p>

              {issueSubmitted ? (
                <div className="bg-emerald-950/80 border border-emerald-500/50 p-6 rounded-2xl text-emerald-200 flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <h3 className="font-bold text-white text-sm">Issue Report Received!</h3>
                    <p className="text-xs text-emerald-200 leading-relaxed">
                      Thank you for helping keep CanImmi accurate. Our support engineering team has logged your report and will verify the details immediately.
                    </p>
                    <button
                      onClick={() => setIssueSubmitted(false)}
                      className="mt-3 px-3 py-1 bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg transition cursor-pointer"
                    >
                      Submit Another Report
                    </button>
                  </div>
                </div>
              ) : (
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    setIssueSubmitted(true);
                  }}
                  className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-300 block mb-1">Your Email Address</label>
                      <input 
                        type="email" 
                        required 
                        placeholder="candidate@domain.com"
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-300 block mb-1">Issue Category</label>
                      <select
                        value={issueCategory}
                        onChange={(e) => setIssueCategory(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                      >
                        <option value="bug">Software Bug / App Glitch</option>
                        <option value="data">CRS / Draw Data Discrepancy</option>
                        <option value="link">Broken Reference Link</option>
                        <option value="accessibility">Layout / Accessibility Issue</option>
                        <option value="other">General Inquiry</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1">Detailed Description</label>
                    <textarea 
                      rows={5} 
                      required 
                      placeholder="Please describe what happened, including the page or feature name..."
                      value={reportText}
                      onChange={(e) => setReportText(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 leading-relaxed"
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl transition cursor-pointer shadow-md flex items-center gap-2"
                  >
                    <HelpCircle className="w-4 h-4 text-amber-300" />
                    <span>Submit Issue to Technical Support</span>
                  </button>
                </form>
              )}
            </article>
          )}

          {/* 5. DATA DELETION REQUEST */}
          {activeTab === "data-deletion" && (
            <article className="space-y-6 animate-fade-in max-w-4xl">
              <div className="border-b border-slate-800 pb-4 space-y-1">
                <span className="text-xs font-mono font-bold text-rose-400 uppercase tracking-widest block">
                  App Store & PIPEDA User Data Erasure Rights
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-white font-display">
                  Data Deletion & Local Cache Purge Request
                </h2>
              </div>

              <p className="text-slate-200">
                In full compliance with <strong>Google Play Console Developer Policies</strong>, PIPEDA, and GDPR, users have full autonomy to erase all cached data, calculation history, and personal profiles instantly.
              </p>

              {deletionSubmitted ? (
                <div className="bg-emerald-950/80 border border-emerald-500/50 p-6 rounded-2xl text-emerald-200 flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
                  <div className="space-y-2">
                    <h3 className="font-bold text-white text-sm">Local Storage & Cache Successfully Purged!</h3>
                    <p className="text-xs text-emerald-200 leading-relaxed">
                      All local CRS scores, search logs, saved drafts, and user preferences have been permanently deleted from this browser/device instance.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* OPTION A: INSTANT ON-DEVICE PURGE */}
                  <div className="bg-slate-950 p-6 rounded-2xl border border-rose-900/40 space-y-4">
                    <div className="flex items-center gap-2 text-rose-400">
                      <Trash2 className="w-5 h-5" />
                      <h3 className="font-bold text-white text-sm">Option A: Instant Local Device Data Purge</h3>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Clicking below will immediately purge all stored CRS calculations, saved draft reports, phone cache lines, and local preferences from your current device.
                    </p>
                    <button
                      onClick={() => {
                        if (typeof window !== "undefined") {
                          localStorage.clear();
                          sessionStorage.clear();
                        }
                        setDeletionSubmitted(true);
                      }}
                      className="px-5 py-2.5 bg-rose-700 hover:bg-rose-600 text-white font-bold text-xs rounded-xl transition cursor-pointer flex items-center gap-2 shadow-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Execute Immediate Local Data Purge</span>
                    </button>
                  </div>

                  {/* OPTION B: FORMAL ACCOUNT DELETION EMAIL REQUEST */}
                  <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3">
                    <h3 className="font-bold text-white text-sm flex items-center gap-2">
                      <Mail className="w-4 h-4 text-indigo-400" />
                      Option B: Formal Data Privacy Erasure Request
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      To request manual deletion of any server-side support correspondence or consultation bookings associated with your email address, please contact our Data Privacy Desk:
                    </p>
                    <div className="p-3 bg-slate-900 rounded-xl font-mono text-xs text-amber-300 border border-slate-800">
                      Email: RZQconsulting@gmail.com<br />
                      Subject: Formal Data Deletion Request<br />
                      Operating Entity: {companyName}
                    </div>
                  </div>
                </div>
              )}
            </article>
          )}

          {/* 6. COOKIE & LOCAL STORAGE POLICY */}
          {activeTab === "cookie-policy" && (
            <article className="space-y-6 animate-fade-in max-w-4xl">
              <div className="border-b border-slate-800 pb-4 space-y-1">
                <span className="text-xs font-mono font-bold text-indigo-400 uppercase tracking-widest block">
                  Browser Storage Disclosures
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-white font-display">
                  Cookie & Local Storage Policy
                </h2>
              </div>

              <p className="text-slate-200">
                This application does not use intrusive third-party tracking cookies or ad-network tracking pixels.
              </p>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <h3 className="font-bold text-white text-sm">Essential Technical Storage</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  We utilize standard HTML5 <code className="bg-slate-900 text-amber-300 px-1 py-0.5 rounded font-mono text-[11px]">localStorage</code> solely to remember your chosen language setting, saved CRS score inputs, and UI theme preferences.
                </p>
              </div>
            </article>
          )}

        </div>

        {/* FOOTER DIRECT LINKS FOR GOOGLE PLAY REVIEWR ACCESS */}
        <footer className="bg-slate-900 border border-slate-800 rounded-2xl p-5 text-center text-xs text-slate-400 space-y-3 font-mono">
          <p>© 2026 {companyName}. All Rights Reserved.{domainName ? ` Primary Domain: ${domainName}` : ""}</p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-[11px]">
            <a href="#privacy" onClick={(e) => { e.preventDefault(); handleTabChange("privacy"); }} className="hover:text-white transition underline">Privacy Policy</a>
            <span>•</span>
            <a href="#terms" onClick={(e) => { e.preventDefault(); handleTabChange("terms"); }} className="hover:text-white transition underline">Terms & Conditions</a>
            <span>•</span>
            <a href="#disclaimer" onClick={(e) => { e.preventDefault(); handleTabChange("disclaimer"); }} className="hover:text-white transition underline">Disclaimer</a>
            <span>•</span>
            <a href="#report-issue" onClick={(e) => { e.preventDefault(); handleTabChange("report-issue"); }} className="hover:text-white transition underline">Report Issue</a>
            <span>•</span>
            <a href="#data-deletion" onClick={(e) => { e.preventDefault(); handleTabChange("data-deletion"); }} className="hover:text-white transition underline">Data Deletion</a>
          </div>
        </footer>

      </main>
    </div>
  );
}
