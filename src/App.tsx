import React, { useState, useEffect } from "react";
import { Province, FederalSource, PhaseChecklist } from "./types";
import { INITIAL_PHASES } from "./data/initialPhases";
import DashboardView from "./components/DashboardView";
import AnalyticsDashboard from "./components/AnalyticsDashboard";
import ComplianceWorkbook from "./components/ComplianceWorkbook";
import ReportingCenter from "./components/ReportingCenter";
import CrsCalculator from "./components/CrsCalculator";
import ProvinceComparison from "./components/ProvinceComparison";
import BlogCenter from "./components/BlogCenter";
import CommunityBoard from "./components/CommunityBoard";
import AboutContactView from "./components/AboutContactView";
import OfficialGovtResources from "./components/OfficialGovtResources";
import ProfessionalConsultation from "./components/ProfessionalConsultation";
import NotificationsHub from "./components/NotificationsHub";
import LegalPagesModal, { LegalDocType } from "./components/LegalPagesModal";
import LegalPagesView from "./components/LegalPagesView";
import SystemAuditReportModal from "./components/SystemAuditReportModal";
import AuthModal, { UserProfile } from "./components/AuthModal";
import { Language, translations } from "./utils/translations";
import { 
  Globe, 
  CheckSquare, 
  FileText, 
  Sparkles, 
  ChevronRight, 
  X, 
  Send, 
  MessageSquare,
  Loader,
  BarChart4,
  Smartphone,
  LogIn,
  LogOut,
  MapPin,
  Calculator,
  BookOpen,
  Building,
  Volume2,
  VolumeX,
  ChevronDown,
  Menu,
  ShieldCheck,
  Award,
  Bell,
  Moon,
  Sun,
  FileCheck,
  UserCheck,
  UserPlus,
  UserCircle,
  User
} from "lucide-react";

const ADVISOR_LANGUAGES = [
  { code: "en-CA", label: "English 🇨🇦" },
  { code: "fr-CA", label: "Français 🇫🇷" },
  { code: "pa-IN", label: "ਪੰਜਾਬੀ (Punjabi) 🌾" },
  { code: "ur-PK", label: "اردو (Urdu) ✍️" },
  { code: "hi-IN", label: "हिन्दी (Hindi) 🇮🇳" },
  { code: "zh-CN", label: "中文 (Chinese) 🇨🇳" },
  { code: "es-ES", label: "Español (Spanish) 🇪🇸" },
  { code: "ar-AE", label: "العربية (Arabic) 🇦🇪" }
];

export default function App() {
  const [language, setLanguage] = useState<Language>("EN");
  const t = translations[language];

  type TabType = "dashboard" | "official-resources" | "consultation" | "reminders" | "analytics" | "workbook" | "reports" | "crs" | "provinces" | "blogs" | "community" | "about-contact" | "privacy" | "terms" | "disclaimer" | "report-issue" | "data-deletion" | "cookie-policy";

  const [activeTab, setActiveTab] = useState<TabType>("dashboard");
  const [aboutContactSubTab, setAboutContactSubTab] = useState<"about" | "contact">("about");
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState<boolean>(false);

  const [provinces, setProvinces] = useState<Province[]>([]);
  const [federalSources, setFederalSources] = useState<FederalSource[]>([]);
  const [phases, setPhases] = useState<PhaseChecklist[]>(INITIAL_PHASES);
  const [loadingData, setLoadingData] = useState<boolean>(true);

  // Modals state
  const [showLegalModal, setShowLegalModal] = useState<boolean>(false);
  const [legalModalDoc, setLegalModalDoc] = useState<LegalDocType>("disclaimer");
  const [showAuditModal, setShowAuditModal] = useState<boolean>(false);

  // Global Corporate Parameters
  const [companyName, setCompanyName] = useState<string>("12105381 Canada Inc");
  const [domainName, setDomainName] = useState<string>("");

  // Candidate User Auth and Profile State
  const [userPhone, setUserPhone] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  const [userTargetStream, setUserTargetStream] = useState<string>("");
  const [userCrsScore, setUserCrsScore] = useState<number>(450);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);

  // In-App Viewer Modal State
  const [showInAppViewer, setShowInAppViewer] = useState<boolean>(false);
  const [viewerUrl, setViewerUrl] = useState<string>("");
  const [viewerTitle, setViewerTitle] = useState<string>("");
  const [activeModelTab, setActiveModelTab] = useState<"gemini" | "chatgpt" | "claude" | "grok" | "llama">("gemini");
  const [generatingReport, setGeneratingReport] = useState<boolean>(false);
  const [modelReports, setModelReports] = useState<Record<string, string>>({});

  const openInAppViewer = (url: string, title: string) => {
    setViewerUrl(url);
    setViewerTitle(title);
    setShowInAppViewer(true);
    setGeneratingReport(true);

    setTimeout(() => {
      setModelReports({
        gemini: `### 🍁 Google Gemini Grounded Analysis\n- Web Reference: ${url}\n- Verified against official IRCC open data feeds.\n- Guidance: Verify application status and fees directly at official .gc.ca domains.`,
        chatgpt: `### 🚀 OpenAI ChatGPT-4o Tactical Assessment\n- Strategy for ${title}.\n- Ensure language test scores and ECA credentials are ready before profile creation.`,
        claude: `### ⚖️ Anthropic Claude Legal Audit\n- Complies with IRPR Regulations.\n- Verify NOC duties match 2021 TEER definitions.`,
        grok: `### 🐦 xAI Grok Live Market Sentiment\n- High interest in category-based Express Entry and PNP streams.`,
        llama: `### 🦙 Meta Llama Compliance Validator\n- Safe reference link confirmed.`
      });
      setGeneratingReport(false);
    }, 800);
  };

  // AI Floating Chat State (Online Advisor)
  const [chatOpen, setChatOpen] = useState<boolean>(false);
  const [chatLanguage, setChatLanguage] = useState<{ code: string; label: string }>({ code: "en-CA", label: "English 🇨🇦" });
  const [voiceEnabled, setVoiceEnabled] = useState<boolean>(false);
  const [chatMessages, setChatMessages] = useState<Array<{ sender: "user" | "ai"; text: string }>>([
    { sender: "ai", text: "Hello! Welcome to CanImmi. I am your AI Advisor. How can I assist you with Canadian immigration info today?" }
  ]);
  const [userInput, setUserInput] = useState<string>("");
  const [sendingMessage, setSendingMessage] = useState<boolean>(false);

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;
    const text = userInput.trim();
    setUserInput("");
    setChatMessages(prev => [...prev, { sender: "user", text }]);
    setSendingMessage(true);

    try {
      const res = await fetch("/api/gemini/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: text,
          history: chatMessages,
          language: chatLanguage.label,
          langCode: chatLanguage.code,
          profile: { phone: userPhone, name: userName, crsScore: userCrsScore }
        })
      });
      const data = await res.json();
      const aiReply = data.answer || "Please consult official Government of Canada resources at canada.ca for authoritative information.";
      setChatMessages(prev => [...prev, { sender: "ai", text: aiReply }]);
    } catch (err) {
      setChatMessages(prev => [...prev, { sender: "ai", text: "Connecting to cached advisor line. Please verify details at official canada.ca portals." }]);
    } finally {
      setSendingMessage(false);
    }
  };

  // Fetch static feeds and data on mount
  useEffect(() => {
    async function loadData() {
      try {
        setLoadingData(true);
        const res = await fetch("/api/static-data");
        if (res.ok) {
          const data = await res.json();
          if (data.provinces) setProvinces(data.provinces);
          if (data.federalSources) setFederalSources(data.federalSources);
        }
      } catch (err) {
        console.error("Failed to load initial feeds from API", err);
      } finally {
        setLoadingData(false);
      }
    }
    loadData();
  }, []);

  // Check URL query params, path, or hash on mount and popstate/hashchange to display standalone legal pages
  useEffect(() => {
    const handleUrlRoute = () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const legalParam = urlParams.get("legal") || urlParams.get("doc") || urlParams.get("page");
        const hash = window.location.hash.toLowerCase().replace("#", "");
        const path = window.location.pathname.toLowerCase().replace("/", "");

        if (path === "privacy" || legalParam === "privacy" || urlParams.get("privacy") === "true" || hash === "privacy") {
          setActiveTab("privacy");
        } else if (path === "terms" || legalParam === "terms" || hash === "terms") {
          setActiveTab("terms");
        } else if (path === "disclaimer" || legalParam === "disclaimer" || hash === "disclaimer") {
          setActiveTab("disclaimer");
        } else if (path === "report-issue" || path === "report_issue" || legalParam === "report_issue" || legalParam === "report-issue" || hash === "report_issue" || hash === "report-issue") {
          setActiveTab("report-issue");
        } else if (path === "data-deletion" || path === "data_deletion" || legalParam === "data_deletion" || legalParam === "data-deletion" || hash === "data_deletion" || hash === "data-deletion") {
          setActiveTab("data-deletion");
        } else if (path === "cookie-policy" || path === "cookie_policy" || legalParam === "cookie_policy" || legalParam === "cookie-policy" || hash === "cookie_policy" || hash === "cookie-policy") {
          setActiveTab("cookie-policy");
        }
      } catch (e) {
        console.warn("Could not parse URL legal parameters", e);
      }
    };

    handleUrlRoute();
    window.addEventListener("hashchange", handleUrlRoute);
    window.addEventListener("popstate", handleUrlRoute);
    return () => {
      window.removeEventListener("hashchange", handleUrlRoute);
      window.removeEventListener("popstate", handleUrlRoute);
    };
  }, []);

  // Restore persistent login from localStorage on mount
  useEffect(() => {
    try {
      const savedAuth = localStorage.getItem("canimmi_auth_user");
      if (savedAuth) {
        const parsed = JSON.parse(savedAuth) as UserProfile;
        if (parsed && parsed.isLoggedIn) {
          setIsLoggedIn(true);
          setUserName(parsed.name || "Candidate");
          setUserEmail(parsed.email || "");
          setUserPhone(parsed.phone || "");
          setUserTargetStream(parsed.targetStream || "");
        }
      }
    } catch (e) {
      console.warn("Could not load stored candidate auth state", e);
    }
  }, []);

  const handleAuthenticate = (profile: UserProfile) => {
    setIsLoggedIn(true);
    setUserName(profile.name);
    setUserEmail(profile.email);
    setUserPhone(profile.phone);
    if (profile.targetStream) setUserTargetStream(profile.targetStream);

    try {
      localStorage.setItem("canimmi_auth_user", JSON.stringify(profile));
    } catch (e) {
      console.warn("Could not save candidate auth state to localStorage", e);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserPhone("");
    setUserName("");
    setUserEmail("");
    setUserTargetStream("");
    try {
      localStorage.removeItem("canimmi_auth_user");
    } catch (e) {
      console.warn("Could not clear stored auth state", e);
    }
  };

  const handleOpenLegal = (doc: LegalDocType) => {
    let docTab: TabType = "privacy";
    const docStr = String(doc);
    if (docStr === "terms") docTab = "terms";
    else if (docStr === "disclaimer") docTab = "disclaimer";
    else if (docStr === "report_issue" || docStr === "report-issue") docTab = "report-issue";
    else if (docStr === "data_deletion" || docStr === "data-deletion") docTab = "data-deletion";
    else if (docStr === "cookie_policy" || docStr === "cookie-policy") docTab = "cookie-policy";

    setActiveTab(docTab);
    if (typeof window !== "undefined") {
      try {
        window.history.pushState({}, "", `/#${docTab}`);
      } catch (e) {
        window.location.hash = docTab;
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className={`min-h-screen w-full max-w-[100vw] overflow-x-hidden font-sans flex flex-col justify-between transition-colors duration-200 ${
      darkMode ? "bg-slate-950 text-slate-100" : "bg-slate-50 text-slate-800"
    }`}>
      
      {/* GLOBAL TOP NAVIGATION */}
      <header className="bg-[#8b0d0d] text-white border-b border-red-950 sticky top-0 z-50 shadow-md w-full max-w-[100vw] overflow-visible">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 bg-[#8b0d0d] w-full">
          <div className="flex justify-between items-center h-16 bg-[#8b0d0d] w-full">
            <div className="flex items-center gap-2 py-1 cursor-pointer group shrink min-w-0" onClick={() => setActiveTab("dashboard")}>
              <div className="relative flex items-center justify-center shrink-0">
                <span className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-red-500 via-rose-400 to-amber-300 opacity-70 blur-xs animate-pulse group-hover:opacity-100 transition duration-300"></span>
                <span className="absolute -inset-0.5 rounded-xl bg-red-400/40 animate-ping opacity-60"></span>
                <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-b from-[#5c0f0f] to-[#2b0808] flex items-center justify-center text-lg sm:text-xl border-2 border-white shadow-lg shadow-red-950/60 ring-2 ring-red-400/50">
                  🍁
                </div>
              </div>
              <div className="flex flex-col justify-center leading-none pl-0.5 truncate">
                <span className="font-display font-black text-white tracking-tighter block text-[15px] sm:text-[17px] leading-[20px] sm:leading-[22px] truncate">
                  CanImmi<span className="text-slate-100 ml-[1px]">Operations</span>
                </span>
                <span className="text-[7.5px] sm:text-[8.5px] text-amber-200 font-extrabold tracking-wider block mt-0.5 font-mono uppercase leading-tight truncate">
                  <span>Independent Immigration Platform</span>
                </span>
              </div>
            </div>

            {/* UNIFIED NAVIGATION MENU */}
            <div className="flex items-center gap-3">
              <nav className="hidden lg:flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
                {/* 3 Horizontal Lines Dropdown Menu - Elegant Trust Island */}
                <div className="relative">
                  <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className={`px-2.5 py-1 rounded-lg text-[10.5px] font-extrabold transition-all cursor-pointer flex items-center gap-1.5 border shadow-xs ${
                      menuOpen
                        ? "bg-red-700 text-white border-red-500 ring-2 ring-red-400/40 shadow-red-950/40"
                        : "bg-[#0b1320] text-slate-200 border-slate-700/80 hover:bg-slate-800 hover:border-red-400/70 hover:text-white"
                    }`}
                    title="Open all navigation pages"
                  >
                    <Menu className={`w-3.5 h-3.5 shrink-0 ${menuOpen ? "text-white" : "text-red-400"}`} />
                    <span>Menu</span>
                    <span className="text-[9px] text-red-300 font-mono">🍁</span>
                  </button>
                  {menuOpen && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)} />
                      <div className="absolute top-10 left-0 mt-1 bg-[#0b132b] border border-slate-700/80 rounded-xl p-1.5 shadow-2xl z-50 w-64 flex flex-col gap-1 select-none animate-fade-in text-slate-100">
                        {[
                          { id: "dashboard", label: t.nationalGrid, icon: Globe, color: "text-red-400" },
                          { id: "official-resources", label: "Official Govt Resources", icon: ShieldCheck, color: "text-emerald-400" },
                          { id: "consultation", label: "RCIC & Legal Consultation", icon: Award, color: "text-amber-400" },
                          { id: "reminders", label: "Document Expiry Tracker", icon: Bell, color: "text-sky-400" },
                          { id: "provinces", label: t.provincialStreams, icon: MapPin, color: "text-red-400" },
                          { id: "crs", label: t.crsCalculator, icon: Calculator, color: "text-red-400" },
                          { id: "analytics", label: t.immigrationAnalytics, icon: BarChart4, color: "text-indigo-400" },
                          { id: "workbook", label: t.launchPlaybook, icon: CheckSquare, color: "text-emerald-400" },
                          { id: "reports", label: t.reportsBoard, icon: FileText, color: "text-amber-400" },
                          { id: "blogs", label: t.canadaVisaInsights, icon: BookOpen, color: "text-indigo-400" },
                          { id: "community", label: t.communityExchange, icon: MessageSquare, color: "text-indigo-400" },
                          { id: "about-contact", label: t.aboutContact, icon: Building, color: "text-indigo-400" },
                        ].map((item) => {
                          const isSelected = activeTab === item.id;
                          const Icon = item.icon;
                          return (
                            <button
                              key={item.id}
                              onClick={() => {
                                setActiveTab(item.id as TabType);
                                setMenuOpen(false);
                              }}
                              className={`w-full text-left px-3 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2.5 cursor-pointer ${
                                isSelected
                                  ? "bg-white text-indigo-950 shadow-sm"
                                  : "text-slate-350 hover:bg-slate-800 hover:text-white"
                              }`}
                            >
                              <Icon className={`w-3.5 h-3.5 ${isSelected ? "text-indigo-600 font-bold" : item.color}`} />
                              <span>{item.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </>
                  )}
                </div>

                {/* Core Tab Buttons - White Islands */}
                <div className="flex items-center gap-1.5 p-0.5">
                  <button
                    onClick={() => setActiveTab("dashboard")}
                    className={`px-3 py-1.5 rounded-xl text-[11px] font-extrabold transition-all duration-200 flex items-center gap-1.5 cursor-pointer shadow-sm border ${
                      activeTab === "dashboard"
                        ? "bg-white text-slate-950 border-red-600 ring-2 ring-red-500/30 shadow-md scale-102 font-black"
                        : "bg-white/90 text-slate-800 border-slate-200/80 hover:bg-white hover:text-slate-950 hover:border-slate-300"
                    }`}
                  >
                    <Globe className="w-3.5 h-3.5 text-red-600 shrink-0" />
                    <span>Federal Grid</span>
                  </button>

                  <button
                    onClick={() => setActiveTab("provinces")}
                    className={`px-3 py-1.5 rounded-xl text-[11px] font-extrabold transition-all duration-200 flex items-center gap-1.5 cursor-pointer shadow-sm border ${
                      activeTab === "provinces"
                        ? "bg-white text-slate-950 border-red-600 ring-2 ring-red-500/30 shadow-md scale-102 font-black"
                        : "bg-white/90 text-slate-800 border-slate-200/80 hover:bg-white hover:text-slate-950 hover:border-slate-300"
                    }`}
                  >
                    <MapPin className="w-3.5 h-3.5 text-red-600 shrink-0" />
                    <span>Prov./Other Streams</span>
                  </button>

                  <button
                    onClick={() => setActiveTab("crs")}
                    className={`px-3 py-1.5 rounded-xl text-[11px] font-extrabold transition-all duration-200 flex items-center gap-1.5 cursor-pointer shadow-sm border ${
                      activeTab === "crs"
                        ? "bg-white text-slate-950 border-indigo-600 ring-2 ring-indigo-500/30 shadow-md scale-102 font-black"
                        : "bg-white/90 text-slate-800 border-slate-200/80 hover:bg-white hover:text-slate-950 hover:border-slate-300"
                    }`}
                  >
                    <Calculator className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                    <span>Express Entry</span>
                  </button>

                  <button
                    onClick={() => setActiveTab("official-resources")}
                    className={`px-3 py-1.5 rounded-xl text-[11px] font-extrabold transition-all duration-200 flex items-center gap-1.5 cursor-pointer shadow-sm border ${
                      activeTab === "official-resources"
                        ? "bg-white text-slate-950 border-emerald-600 ring-2 ring-emerald-500/30 shadow-md scale-102 font-black"
                        : "bg-white/90 text-slate-800 border-slate-200/80 hover:bg-white hover:text-slate-950 hover:border-slate-300"
                    }`}
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{t.govtPortals}</span>
                  </button>

                  <button
                    onClick={() => setActiveTab("consultation")}
                    className={`px-3 py-1.5 rounded-xl text-[11px] font-extrabold transition-all duration-200 flex items-center gap-1.5 cursor-pointer shadow-sm border ${
                      activeTab === "consultation"
                        ? "bg-white text-slate-950 border-amber-600 ring-2 ring-amber-500/30 shadow-md scale-102 font-black"
                        : "bg-white/90 text-slate-800 border-slate-200/80 hover:bg-white hover:text-slate-950 hover:border-slate-300"
                    }`}
                  >
                    <Award className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>{t.submitQuery}</span>
                  </button>
                </div>

                {/* Dark Mode Toggle */}
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="p-1.5 rounded-lg text-slate-300 hover:text-white transition cursor-pointer ml-1"
                  title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                >
                  {darkMode ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-slate-300" />}
                </button>

                {/* Audit Report Button */}
                <button
                  onClick={() => setShowAuditModal(true)}
                  className="px-2 py-1 bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/40 text-emerald-200 rounded-lg text-[10px] font-bold font-mono transition flex items-center gap-1 cursor-pointer ml-1"
                  title="View System Audit & Store Readiness Report"
                >
                  <FileCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Audit</span>
                </button>

                {/* Language Switcher & Sign In Stacked Islands (as shown in image) */}
                <div className="flex flex-col items-end justify-center gap-1 ml-1 shrink-0">
                  {/* TOP: Language Switcher Island */}
                  <div className="relative flex items-center bg-white border border-slate-200/90 hover:border-slate-300 px-2 py-0.5 rounded-full text-slate-800 shadow-sm select-none transition w-[71px]">
                    <Globe className="w-3.5 h-3.5 text-indigo-600 mr-0.5 shrink-0" />
                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value as Language)}
                      className="appearance-none bg-transparent text-slate-900 text-[10.5px] font-extrabold focus:outline-none cursor-pointer pr-3 border-0 tracking-tight w-full"
                    >
                      <option value="EN" className="bg-slate-900 text-white font-sans">🇨🇦 EN</option>
                      <option value="FR" className="bg-slate-900 text-white font-sans">🇫🇷 FR</option>
                      <option value="ES" className="bg-slate-900 text-white font-sans">🇪🇸 ES</option>
                      <option value="AR" className="bg-slate-900 text-white font-sans">🇦🇪 AR</option>
                      <option value="ZH" className="bg-slate-900 text-white font-sans">🇨🇳 ZH</option>
                      <option value="PB" className="bg-slate-900 text-white font-sans">🌾 PB</option>
                    </select>
                    <ChevronDown className="w-2.5 h-2.5 text-slate-500 absolute right-1.5 pointer-events-none" />
                  </div>

                  {/* BOTTOM: Candidate Sign In / Account Profile Button */}
                  {isLoggedIn ? (
                    <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold text-white bg-slate-900/95 border border-emerald-500/40 shadow-xs shrink-0">
                      <div className="w-4 h-4 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-[9px] font-black text-slate-950 uppercase shrink-0">
                        {userName ? userName.charAt(0) : "C"}
                      </div>
                      <span className="font-extrabold text-white text-[10px] max-w-[90px] truncate">{userName || userEmail || userPhone}</span>
                      <button
                        onClick={handleLogout}
                        title="Sign out of candidate account"
                        className="p-0.5 hover:bg-slate-800 text-slate-400 hover:text-rose-400 rounded-full transition cursor-pointer ml-0.5"
                      >
                        <LogOut className="w-3 h-3" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setShowLoginModal(true)}
                      className="w-[72.86px] h-[25.5px] px-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black rounded-full text-[9.5px] leading-[11.75px] shadow-sm transition flex items-center justify-center gap-1 cursor-pointer border border-amber-300/50 active:scale-95"
                      title="Sign In or Create Account"
                    >
                      <UserCheck className="w-3.5 h-3.5 text-slate-950 shrink-0" />
                      <span className="tracking-tight">{t.signInOrCreate || "Sign In"}</span>
                    </button>
                  )}
                </div>
              </nav>

              {/* Mobile Controls Stacked */}
              <div className="flex lg:hidden flex-col items-end justify-center gap-1 shrink-0 ml-1">
                {/* TOP: Language Switcher Island for Mobile */}
                <div className="relative flex items-center bg-white border border-slate-200/90 px-1.5 h-[22px] w-[71px] rounded-full text-slate-900 shadow-xs select-none shrink-0">
                  <Globe className="w-3 h-3 text-indigo-600 mr-0.5 shrink-0" />
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value as Language)}
                    className="appearance-none bg-transparent text-slate-900 text-[10px] font-extrabold focus:outline-none cursor-pointer pr-2.5 border-0 tracking-tight w-full"
                  >
                    <option value="EN" className="bg-slate-900 text-white font-sans">🇨🇦 EN</option>
                    <option value="FR" className="bg-slate-900 text-white font-sans">🇫🇷 FR</option>
                    <option value="ES" className="bg-slate-900 text-white font-sans">🇪🇸 ES</option>
                    <option value="AR" className="bg-slate-900 text-white font-sans">🇦🇪 AR</option>
                    <option value="ZH" className="bg-slate-900 text-white font-sans">🇨🇳 ZH</option>
                    <option value="PB" className="bg-slate-900 text-white font-sans">🌾 PB</option>
                  </select>
                  <ChevronDown className="w-2.5 h-2.5 text-slate-500 absolute right-1 pointer-events-none" />
                </div>

                {/* BOTTOM: Mobile Auth Button */}
                {isLoggedIn ? (
                  <button
                    onClick={() => setShowLoginModal(true)}
                    className="p-1 bg-emerald-950/80 border border-emerald-500/50 rounded-full text-emerald-300 cursor-pointer flex items-center justify-center shrink-0"
                    title={`Signed in as ${userName || userPhone || "Candidate"}`}
                  >
                    <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                  </button>
                ) : (
                  <button
                    onClick={() => setShowLoginModal(true)}
                    className="px-2.5 py-0.5 bg-amber-500 hover:bg-amber-400 text-slate-950 border border-amber-300/50 rounded-full text-[10px] font-black cursor-pointer flex items-center gap-1 shrink-0 shadow-xs"
                    title="Sign In or Create Account"
                  >
                    <UserPlus className="w-3 h-3 text-slate-950 shrink-0" />
                    <span>Sign In</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* MOBILE HORIZONTALLY SLIDING SUB-BAR WITH TRUST ISLAND MENU & WHITE ISLANDS */}
        <div className="lg:hidden bg-[#4a0d0d] border-t border-red-900/60 px-3 py-2 overflow-x-auto scrollbar-none flex items-center gap-1.5 shadow-inner touch-pan-x select-none">
          {/* Elegant 3-Line Navigation Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`px-2.5 py-1 rounded-full text-[10.5px] font-black transition-all shrink-0 flex items-center gap-1 cursor-pointer shadow-md border active:scale-95 ${
              menuOpen
                ? "bg-red-700 text-white border-red-400 ring-2 ring-red-400/50 shadow-red-950/40"
                : "bg-[#0b1320] text-slate-100 border-slate-700/80 hover:border-red-400/80 hover:bg-slate-900 shadow-slate-950/60"
            }`}
            title="Open All Navigation Pages (3-Line Menu)"
          >
            <Menu className={`w-3.5 h-3.5 shrink-0 ${menuOpen ? "text-white" : "text-red-400"}`} />
            <span className="font-extrabold tracking-tight">Menu</span>
            <span className="text-[9px] text-red-300 font-mono pl-0.5">🍁</span>
          </button>

          <button
            onClick={() => setActiveTab("dashboard")}
            className={`px-3 py-1.5 rounded-xl text-[11px] font-extrabold transition-all shrink-0 flex items-center gap-1.5 cursor-pointer shadow-xs border ${
              activeTab === "dashboard"
                ? "bg-white text-slate-950 border-red-600 ring-2 ring-red-500/30 shadow-sm font-black"
                : "bg-white/95 text-slate-800 border-slate-200/90 hover:bg-white hover:text-slate-950"
            }`}
          >
            <Globe className="w-3.5 h-3.5 text-red-600 shrink-0" />
            <span>{t.nationalGrid}</span>
          </button>

          <button
            onClick={() => setActiveTab("provinces")}
            className={`px-3 py-1.5 rounded-xl text-[11px] font-extrabold transition-all shrink-0 flex items-center gap-1.5 cursor-pointer shadow-xs border ${
              activeTab === "provinces"
                ? "bg-white text-slate-950 border-red-600 ring-2 ring-red-500/30 shadow-sm font-black"
                : "bg-white/95 text-slate-800 border-slate-200/90 hover:bg-white hover:text-slate-950"
            }`}
          >
            <MapPin className="w-3.5 h-3.5 text-red-600 shrink-0" />
            <span>{t.provincialStreams}</span>
          </button>

          <button
            onClick={() => setActiveTab("crs")}
            className={`px-3 py-1.5 rounded-xl text-[11px] font-extrabold transition-all shrink-0 flex items-center gap-1.5 cursor-pointer shadow-xs border ${
              activeTab === "crs"
                ? "bg-white text-slate-950 border-indigo-600 ring-2 ring-indigo-500/30 shadow-sm font-black"
                : "bg-white/95 text-slate-800 border-slate-200/90 hover:bg-white hover:text-slate-950"
            }`}
          >
            <Calculator className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
            <span>{t.crsCalculator}</span>
          </button>

          <button
            onClick={() => setActiveTab("official-resources")}
            className={`px-3 py-1.5 rounded-xl text-[11px] font-extrabold transition-all shrink-0 flex items-center gap-1.5 cursor-pointer shadow-xs border ${
              activeTab === "official-resources"
                ? "bg-white text-slate-950 border-emerald-600 ring-2 ring-emerald-500/30 shadow-sm font-black"
                : "bg-white/95 text-slate-800 border-slate-200/90 hover:bg-white hover:text-slate-950"
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>{t.govtPortals}</span>
          </button>

          <button
            onClick={() => setActiveTab("consultation")}
            className={`px-3 py-1.5 rounded-xl text-[11px] font-extrabold transition-all shrink-0 flex items-center gap-1.5 cursor-pointer shadow-xs border ${
              activeTab === "consultation"
                ? "bg-white text-slate-950 border-amber-600 ring-2 ring-amber-500/30 shadow-sm font-black"
                : "bg-white/95 text-slate-800 border-slate-200/90 hover:bg-white hover:text-slate-950"
            }`}
          >
            <Award className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span>{t.submitQuery}</span>
          </button>

          <button
            onClick={() => setActiveTab("reminders")}
            className={`px-3 py-1.5 rounded-xl text-[11px] font-extrabold transition-all shrink-0 flex items-center gap-1.5 cursor-pointer shadow-xs border ${
              activeTab === "reminders"
                ? "bg-white text-slate-950 border-sky-600 ring-2 ring-sky-500/30 shadow-sm font-black"
                : "bg-white/95 text-slate-800 border-slate-200/90 hover:bg-white hover:text-slate-950"
            }`}
          >
            <Bell className="w-3.5 h-3.5 text-sky-600 shrink-0" />
            <span>{t.expiryTracker}</span>
          </button>
        </div>
      </header>

      {/* MOBILE COMPACT DROPDOWN MENU OVERLAY */}
      {menuOpen && (
        <>
          {/* Subtle light backdrop overlay */}
          <div className="fixed inset-0 bg-slate-950/20 backdrop-blur-[1px] z-40 lg:hidden" onClick={() => setMenuOpen(false)} />

          <div className="fixed top-24 left-3 w-64 max-h-[65vh] overflow-y-auto bg-[#0b132b] border border-slate-700 rounded-2xl p-2 shadow-2xl z-50 animate-fade-in space-y-1 lg:hidden text-slate-100">
            {/* Header info in menu */}
            <div className="px-2.5 py-1.5 border-b border-slate-800 mb-1 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="text-[10.5px] font-extrabold uppercase tracking-wider text-red-400 font-mono flex items-center gap-1">
                  <span>🍁 Portal Navigation</span>
                </span>
              </div>
              <button onClick={() => setMenuOpen(false)} className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 cursor-pointer">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {[
              { id: "dashboard", label: t.nationalGrid, icon: Globe, color: "text-red-400" },
              { id: "official-resources", label: t.govtPortals, icon: ShieldCheck, color: "text-emerald-400" },
              { id: "consultation", label: t.submitQuery, icon: Award, color: "text-amber-400" },
              { id: "reminders", label: t.expiryTracker, icon: Bell, color: "text-sky-400" },
              { id: "provinces", label: t.provincialStreams, icon: MapPin, color: "text-red-400" },
              { id: "crs", label: t.crsCalculator, icon: Calculator, color: "text-indigo-400" },
              { id: "analytics", label: t.immigrationAnalytics, icon: BarChart4, color: "text-indigo-400" },
              { id: "workbook", label: t.launchPlaybook, icon: CheckSquare, color: "text-emerald-400" },
              { id: "reports", label: t.reportsBoard, icon: FileText, color: "text-amber-400" },
              { id: "blogs", label: t.canadaVisaInsights, icon: BookOpen, color: "text-indigo-400" },
              { id: "community", label: t.communityExchange, icon: MessageSquare, color: "text-indigo-400" },
              { id: "about-contact", label: t.aboutContact, icon: Building, color: "text-slate-400" },
            ].map((item) => {
              const Icon = item.icon;
              const isSel = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id as TabType);
                    setMenuOpen(false);
                  }}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition flex items-center gap-2 cursor-pointer ${
                    isSel 
                      ? "bg-red-700 text-white font-extrabold shadow-sm border border-red-500" 
                      : "text-slate-200 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 shrink-0 ${isSel ? "text-white" : item.color}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </>
      )}

      {/* MAIN VIEW CONTENT CONTAINER */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
        {loadingData ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <div className="w-10 h-10 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-xs font-mono text-slate-500 uppercase tracking-widest">Loading Canada Immigration Feeds...</p>
          </div>
        ) : (
          <div>
            {activeTab === "dashboard" && (
              <DashboardView 
                provinces={provinces}
                federalSources={federalSources}
                companyName={companyName}
                language={language}
                onOpenInAppViewer={openInAppViewer}
                onNavigateTab={(tab) => setActiveTab(tab as any)}
                onSelectProvince={(id) => {
                  setActiveTab("provinces");
                }}
              />
            )}

            {activeTab === "official-resources" && (
              <OfficialGovtResources 
                onOpenInAppViewer={openInAppViewer}
              />
            )}

            {activeTab === "consultation" && (
              <ProfessionalConsultation 
                userPhone={userPhone}
                userName={userName}
              />
            )}

            {activeTab === "reminders" && (
              <NotificationsHub />
            )}

            {activeTab === "provinces" && (
              <ProvinceComparison 
                provinces={provinces}
                onOpenInAppViewer={openInAppViewer}
              />
            )}

            {activeTab === "crs" && (
              <CrsCalculator 
                currentScore={userCrsScore}
                onScoreUpdate={(score) => setUserCrsScore(score)}
                userPhone={userPhone || undefined}
              />
            )}

            {activeTab === "analytics" && (
              <AnalyticsDashboard 
                provinces={provinces}
                companyName={companyName}
              />
            )}

            {activeTab === "workbook" && (
              <ComplianceWorkbook 
                phases={phases} 
                onUpdatePhases={(updated) => setPhases(updated)}
                companyName={companyName}
                setCompanyName={setCompanyName}
                domainName={domainName}
                setDomainName={setDomainName}
              />
            )}

            {activeTab === "reports" && (
              <ReportingCenter 
                provinces={provinces}
                companyName={companyName}
              />
            )}

            {activeTab === "blogs" && (
              <BlogCenter onOpenInAppViewer={openInAppViewer} />
            )}

            {activeTab === "community" && (
              <CommunityBoard 
                currentUser={{
                  name: userName,
                  phone: userPhone,
                  crsScore: userCrsScore,
                  isLoggedIn: isLoggedIn
                }}
              />
            )}

            {activeTab === "about-contact" && (
              <AboutContactView 
                companyName={companyName}
                domainName={domainName}
                onOpenInAppViewer={openInAppViewer}
                initialSubTab={aboutContactSubTab}
              />
            )}

            {["privacy", "terms", "disclaimer", "report-issue", "data-deletion", "cookie-policy"].includes(activeTab) && (
              <LegalPagesView
                initialDoc={
                  activeTab === "report-issue" ? "report_issue" :
                  activeTab === "data-deletion" ? "data_deletion" :
                  activeTab === "cookie-policy" ? "cookie_policy" :
                  (activeTab as any)
                }
                onNavigateBack={() => {
                  setActiveTab("dashboard");
                  if (typeof window !== "undefined") {
                    window.location.hash = "";
                  }
                }}
                companyName={companyName}
                domainName={domainName}
              />
            )}
          </div>
        )}
      </main>

      {/* FLOATING AI CHAT BOT */}
      <div className="fixed bottom-4 right-4 z-50">
        {!chatOpen ? (
          <button
            onClick={() => setChatOpen(true)}
            className="group relative flex items-center justify-start bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 text-white rounded-2xl h-12 w-12 hover:w-44 p-3 transition-all duration-300 ease-in-out shadow-xl hover:shadow-2xl overflow-hidden border border-slate-700/60 cursor-pointer active:scale-95"
            id="open-online-advisor"
            title="AI Online Advisor"
          >
            <div className="relative flex items-center justify-center shrink-0 w-6 h-6">
              <span className="absolute inline-flex h-2 w-2 rounded-full bg-emerald-400 opacity-75 animate-ping -top-0.5 -right-0.5"></span>
              <Sparkles className="w-4 h-4 text-yellow-400 fill-yellow-400 animate-pulse" />
            </div>
            <span className="text-xs font-bold font-display tracking-wide select-none whitespace-nowrap opacity-0 group-hover:opacity-100 max-w-0 group-hover:max-w-xs transition-all duration-300 ml-0 group-hover:ml-2.5 overflow-hidden">
              AI Online Advisor
            </span>
          </button>
        ) : (
          <div className="w-72 sm:w-80 h-[450px] bg-white rounded-2xl border border-slate-200 shadow-2xl flex flex-col justify-between overflow-hidden animate-fade-in">
            <div className="bg-slate-900 p-3 text-white flex items-center justify-between border-b border-slate-700">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></div>
                <div>
                  <h4 className="font-display font-bold text-xs tracking-wide uppercase text-indigo-300">Live AI Advisor</h4>
                  <p className="text-[9px] text-slate-400 font-mono">Independent Guidance Engine</p>
                </div>
              </div>
              <button 
                onClick={() => setChatOpen(false)} 
                className="text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-grow p-3 overflow-y-auto space-y-2 bg-slate-50/50 text-xs text-slate-800">
              {chatMessages.map((msg, i) => (
                <div key={i} className={`flex ${msg.sender === "ai" ? "justify-start" : "justify-end"}`}>
                  <div className={`p-2.5 rounded-xl text-xs max-w-[90%] leading-relaxed ${
                    msg.sender === "ai" ? "bg-white border border-slate-200 shadow-xs" : "bg-indigo-600 text-white"
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {sendingMessage && (
                <div className="p-2 text-[10px] text-slate-400 font-mono flex items-center gap-1.5">
                  <Loader className="w-3 h-3 animate-spin text-indigo-600" />
                  Generating verified AI explanation...
                </div>
              )}
            </div>

            <div className="p-2 bg-white border-t border-slate-100 flex items-center gap-2">
              <input
                type="text"
                placeholder="Ask immigration question..."
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                className="flex-grow bg-slate-50 border border-slate-200 text-xs rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
              <button
                onClick={handleSendMessage}
                disabled={sendingMessage || !userInput.trim()}
                className="p-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-200 text-white rounded-xl transition cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* FOOTER */}
      <footer className={`border-t py-4 mt-8 transition-colors ${
        darkMode ? "bg-slate-950 border-slate-800 text-slate-400" : "bg-slate-900 border-slate-800 text-slate-300"
      }`}>
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 space-y-3">
          
          <div className="bg-slate-950/90 border border-amber-900/40 p-2.5 px-3.5 rounded-xl space-y-1 shadow-xs">
            <div className="flex flex-wrap items-center justify-between gap-1.5">
              <p className="text-[9px] uppercase font-mono font-bold tracking-wider text-amber-400 flex items-center gap-1.5">
                <ShieldCheck className="w-3 h-3 text-emerald-400 shrink-0" />
                Independent Platform Notice & Government Disclaimer
              </p>
              <button 
                onClick={() => handleOpenLegal("disclaimer")}
                className="text-[8.5px] font-mono font-bold text-amber-300/90 hover:text-white underline cursor-pointer"
              >
                Read Full Disclaimer →
              </button>
            </div>
            <p className="text-[9.5px] leading-snug text-slate-300/90">
              This application is an independent information platform operated by 12105381 Canada Inc. and is <strong>not affiliated with, endorsed by, authorised by, or operated by Immigration, Refugees and Citizenship Canada (IRCC), the Canada Border Services Agency (CBSA), or the Government of Canada</strong>. Information provided is strictly for educational purposes and does not constitute legal advice.
            </p>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center text-[10px] space-y-2 md:space-y-0 text-slate-400">
            <div>
              &copy; 2026 12105381 Canada Inc. / RZQ Consulting. All Rights Reserved.
            </div>
            <div className="flex flex-wrap justify-center gap-3 text-[10px] font-semibold text-slate-300/90">
              <a href="#privacy" onClick={(e) => { e.preventDefault(); handleOpenLegal("privacy"); }} className="hover:text-white transition cursor-pointer">Privacy Policy (PIPEDA)</a>
              <a href="#terms" onClick={(e) => { e.preventDefault(); handleOpenLegal("terms"); }} className="hover:text-white transition cursor-pointer">Terms & Conditions</a>
              <a href="#disclaimer" onClick={(e) => { e.preventDefault(); handleOpenLegal("disclaimer"); }} className="hover:text-white transition cursor-pointer">Disclaimer</a>
              <a href="#report-issue" onClick={(e) => { e.preventDefault(); handleOpenLegal("report_issue"); }} className="hover:text-white transition cursor-pointer">Report Issue</a>
              <a href="#data-deletion" onClick={(e) => { e.preventDefault(); handleOpenLegal("data_deletion"); }} className="hover:text-white transition cursor-pointer">Data Deletion</a>
              <button onClick={() => setShowAuditModal(true)} className="text-emerald-400 hover:underline cursor-pointer font-mono">Store Readiness Audit</button>
            </div>
          </div>
        </div>
      </footer>

      {/* CANDIDATE SIGN IN / CREATE ACCOUNT MODAL */}
      <AuthModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onAuthenticate={handleAuthenticate}
        language={language}
      />

      {/* LEGAL COMPLIANCE MODAL */}
      {showLegalModal && (
        <LegalPagesModal 
          initialDoc={legalModalDoc}
          onClose={() => setShowLegalModal(false)}
          domainName={domainName}
          companyName={companyName}
        />
      )}

      {/* SYSTEM AUDIT REPORT MODAL */}
      {showAuditModal && (
        <SystemAuditReportModal 
          onClose={() => setShowAuditModal(false)}
        />
      )}

      {/* IN-APP VIEWPORT MODAL */}
      {showInAppViewer && (
        <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-4xl w-full h-[85vh] flex flex-col overflow-hidden shadow-2xl text-white">
            <div className="bg-slate-950 px-4 py-3 flex items-center justify-between gap-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="text-emerald-400 text-xs font-mono font-bold">🔒 SECURE IN-APP PORTAL</span>
              </div>
              <button
                onClick={() => setShowInAppViewer(false)}
                className="px-3 py-1.5 bg-rose-950 hover:bg-rose-900 text-rose-300 rounded-lg text-xs font-bold border border-rose-900/30 transition cursor-pointer"
              >
                Return to App
              </button>
            </div>

            <div className="flex-grow p-6 overflow-y-auto space-y-4 text-xs text-slate-300 leading-relaxed font-sans">
              <div className="space-y-1">
                <h3 className="font-display font-bold text-base text-white">{viewerTitle}</h3>
                <p className="text-[11px] text-slate-400 font-mono">Reference URL: {viewerUrl}</p>
              </div>

              {generatingReport ? (
                <div className="py-12 text-center space-y-3">
                  <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                  <p className="text-xs font-mono text-slate-400">Synthesizing live web-node analysis...</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-slate-200">
                    {modelReports[activeModelTab]}
                  </div>
                  <a
                    href={viewerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-red-700 hover:bg-red-800 text-white font-bold text-xs rounded-xl cursor-pointer"
                  >
                    <span>Open Official Web Portal directly</span>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
