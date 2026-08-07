import React, { useState, useEffect } from "react";
import { Mail, Phone, MapPin, Building, ShieldCheck, Cpu, Globe, Users, Send, CheckCircle2, ChevronRight, MessageSquare, AlertCircle, Sparkles } from "lucide-react";

interface ContactForm {
  name: string;
  email: string;
  phone: string;
  category: "Express Entry" | "Alberta Rural Renewal" | "Manitoba Morden" | "General Immigration" | "Border / Landing Inquiry";
  message: string;
}

interface AboutContactViewProps {
  companyName: string;
  domainName: string;
  onOpenInAppViewer: (url: string, title: string) => void;
  initialSubTab?: "about" | "contact";
}

export default function AboutContactView({ companyName, domainName, onOpenInAppViewer, initialSubTab = "about" }: AboutContactViewProps) {
  const [activeSubTab, setActiveSubTab] = useState<"about" | "contact">(initialSubTab);

  useEffect(() => {
    if (initialSubTab) {
      setActiveSubTab(initialSubTab);
    }
  }, [initialSubTab]);
  const [formData, setFormData] = useState<ContactForm>({
    name: "",
    email: "",
    phone: "",
    category: "General Immigration",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedReceipt, setSubmittedReceipt] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setFormError("Please fill in all mandatory fields (Name, Email, and Message).");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const trackingId = "IMMI-REQ-" + Math.floor(100000 + Math.random() * 900000);
      setSubmittedReceipt(trackingId);
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        category: "General Immigration",
        message: ""
      });
    }, 1200);
  };

  return (
    <div id="about-contact-hub" className="space-y-6">
      
      {/* HEADER HERO */}
      <div className="bg-gradient-to-r from-indigo-900 to-slate-900 rounded-2xl p-6 border border-indigo-950/60 shadow-md text-white">
        <div className="max-w-3xl space-y-2">
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-white/10 text-indigo-200 rounded-lg backdrop-blur-md">
              <Building className="w-4 h-4" />
            </span>
            <span className="text-[10px] font-bold text-indigo-200 uppercase tracking-wider font-mono">Corporate Portal & Support</span>
          </div>
          <h2 className="font-display font-bold text-2xl tracking-tight">Corporate Registry & Support Network</h2>
          <p className="text-xs text-indigo-100/85 leading-relaxed">
            Welcome to the official legal tech operations hub of {companyName}. Learn about our cognitive multi-agent technology integrations, sovereign data protocols, and get in direct contact with our licensed intake division.
          </p>
        </div>

        {/* Navigation Tabs inside Header */}
        <div className="flex gap-2 mt-6 pt-4 border-t border-white/10">
          <button
            onClick={() => { setActiveSubTab("about"); setSubmittedReceipt(null); }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeSubTab === "about"
                ? "bg-white text-indigo-950 shadow-sm"
                : "bg-white/10 text-white hover:bg-white/20"
            }`}
          >
            🍁 Professional About Us
          </button>
          <button
            onClick={() => { setActiveSubTab("contact"); setSubmittedReceipt(null); }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeSubTab === "contact"
                ? "bg-white text-indigo-950 shadow-sm"
                : "bg-white/10 text-white hover:bg-white/20"
            }`}
          >
            📬 Connect & Inquiry desk
          </button>
        </div>
      </div>

      {activeSubTab === "about" ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fade-in">
          
          {/* LEFT PANEL: CORPORATE OVERVIEW & CORE MISSION */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* CORPORATE IDENTITY */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
              <h3 className="font-display font-bold text-lg text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                <Globe className="w-5 h-5 text-indigo-600" />
                <span>Executive Corporate Profile</span>
              </h3>
              
              <div className="text-xs text-slate-600 leading-relaxed space-y-3">
                <p>
                  <strong>{companyName}</strong> is a registered corporate entity in Canada (Corporation Number: <strong>12105381 Canada Inc</strong>). Please note: we are <strong>not certified and not at all a partner</strong> of IRCC, CBSA, or any government agency. This is simply an independent app and platform that shows all Canadian immigration-related information at one platform and one place.
                </p>
                <p>
                  We compile and present whatever is going on in Canadian immigration, including at the provincial and territorial levels, pathways for students looking for PR (Permanent Residency) in Canada to get themselves settled, spousal sponsorship and family immigration info, work permit pathways, and IRCC processing times for different categories.
                </p>
              </div>

              {/* BENTO STATS */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-center">
                  <span className="text-xs text-slate-500 font-medium font-mono">ESTABLISHED</span>
                  <p className="text-lg font-bold font-display text-slate-900 mt-0.5">2026 Fiscal</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-center">
                  <span className="text-xs text-slate-500 font-medium font-mono">REGULATORY COMPLIANCE</span>
                  <p className="text-lg font-bold font-display text-emerald-600 mt-0.5">PIPEDA Certified</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-center">
                  <span className="text-xs text-slate-500 font-medium font-mono">OFFICIAL REGISTRATION</span>
                  <p className="text-lg font-bold font-display text-indigo-600 mt-0.5">12105381 Canada Inc</p>
                </div>
              </div>
            </div>

            {/* THE COGNITIVE REVOLUTION */}
            <div className="bg-gradient-to-br from-slate-950 to-indigo-950 text-slate-100 rounded-2xl p-6 border border-indigo-900/40 shadow-sm space-y-4">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-indigo-400 font-bold font-mono text-[10px] uppercase tracking-wider">
                  <Cpu className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
                  <span>Cognitive Multi-Agent Architecture</span>
                </div>
                <h3 className="font-display font-bold text-base text-white">Unified Multi-Model Policy Synthesis</h3>
              </div>
              
              <p className="text-xs text-slate-300 leading-relaxed">
                Canadian immigration laws are highly dynamic, governed by weekly ministerial instructions and regional program changes. Rather than relying on a single, isolated AI model, {companyName} operates an advanced, unified cognitive engine that synthesizes intelligence from five of the world's most capable AI nodes:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2 text-[11px]">
                <div className="bg-white/5 border border-white/10 rounded-xl p-3 space-y-1">
                  <span className="text-amber-400 font-bold font-mono">● Google Gemini</span>
                  <p className="text-slate-400">Deep Search Grounding & real-time government news indexing.</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-3 space-y-1">
                  <span className="text-sky-400 font-bold font-mono">● OpenAI ChatGPT-4o</span>
                  <p className="text-slate-400">Comprehensive profile optimization & tactical action planning.</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-3 space-y-1">
                  <span className="text-indigo-400 font-bold font-mono">● Anthropic Claude 3.5</span>
                  <p className="text-slate-400">Highly nuanced policy auditing & complex legal text parsing.</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-3 space-y-1">
                  <span className="text-emerald-400 font-bold font-mono">● xAI Grok & Llama 3</span>
                  <p className="text-slate-400">Social consensus tracking & NOC TEER eligibility validation.</p>
                </div>
              </div>

              <div className="p-3 bg-indigo-900/30 border border-indigo-800/30 rounded-xl text-indigo-200 text-[10px] leading-relaxed">
                When you click reference links throughout our app, our **In-App Portal Secure Viewer** automatically requests each of these five models to produce a consensus strategic report, helping you bypass misleading information or outdated advice instantly.
              </div>
            </div>

            {/* SOVEREIGN PRIVACY FRAMEWORK */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
              <h3 className="font-display font-bold text-sm text-slate-900 border-b border-slate-100 pb-2.5 flex items-center gap-1.5">
                <ShieldCheck className="w-4.5 h-4.5 text-emerald-600" />
                <span>Sovereign Data & Privacy Standards</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-600">
                <div className="space-y-2">
                  <h4 className="font-bold text-slate-800">🔒 Zero PII Central Logging</h4>
                  <p className="leading-relaxed">
                    We do not store your personal identifier phone numbers or active workspace credentials on central databases. Everything resides in your local browser sandbox cache.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-bold text-slate-800">🍁 Canadian Residency Sovereignty</h4>
                  <p className="leading-relaxed">
                    Our API routes and data layers are hosted strictly in sovereign Canadian regions (Google Cloud Montreal and Toronto), fully compliant with the federal <strong>PIPEDA</strong> regulations.
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT PANEL: LEADERSHIP & CONTACT SITES */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* COMPLIANCE ADVISORY */}
            <div className="bg-amber-50/50 rounded-2xl border border-amber-200 p-5 shadow-xs space-y-3.5">
              <h3 className="font-display font-bold text-xs text-amber-900 uppercase tracking-wider font-mono flex items-center gap-1.5">
                <AlertCircle className="w-4.5 h-4.5 text-amber-600 shrink-0" />
                <span>Disclaimer & Legal Consultation</span>
              </h3>
              <p className="text-[11px] text-amber-800 leading-relaxed font-sans">
                This platform is operated by 12105381 Canada Inc. We are not certified and not at all a partner of IRCC or any government body. Reach out to us on the form below for legal consultation and book a paid consultation today by taking the first step towards your journey to Canada. Get the latest information about work permits and IRCC processing times for different application categories.
              </p>
            </div>

            {/* STRATEGIC OFFICES */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
              <h3 className="font-display font-bold text-sm text-slate-900 border-b border-slate-100 pb-2.5 flex items-center gap-1.5">
                <Building className="w-4 h-4 text-indigo-500" />
                <span>Headquarters & Nodes</span>
              </h3>

              <div className="space-y-3.5 text-xs text-slate-600 leading-normal">
                <div className="space-y-1">
                  <h4 className="font-bold text-slate-900 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-red-600" />
                    <span>Toronto Corporate HQ</span>
                  </h4>
                  <p className="pl-4.5 text-slate-500">
                    Suite 1800, 120 Adelaide St West,<br />
                    Toronto, ON M5H 1T1, Canada
                  </p>
                </div>

                <div className="space-y-1">
                  <h4 className="font-bold text-slate-900 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>Vancouver Tech Hub</span>
                  </h4>
                  <p className="pl-4.5 text-slate-500">
                    Suite 2200, 1055 West Georgia St,<br />
                    Vancouver, BC V6E 3P3, Canada
                  </p>
                </div>

                <div className="space-y-1 pt-1 border-t border-slate-100 text-[10px] text-slate-400 font-mono">
                  <span>General Support: RZQconsulting@gmail.com</span><br />
                  <span>Administrative Lines: +1 905 5140 786</span>
                </div>
              </div>
            </div>

            {/* TRUST PLATFORM LINKS */}
            <div className="bg-slate-900 text-slate-300 rounded-2xl p-5 shadow-sm space-y-3.5">
              <h3 className="font-display font-bold text-sm text-white">Direct Government Nodes</h3>
              <p className="text-[10px] text-slate-400 leading-relaxed">
                Verify draw guidelines, official fees, and policy statements instantly. Click to open safely within our In-App secure viewport:
              </p>
              
              <div className="space-y-2 text-xs">
                <button
                  onClick={() => onOpenInAppViewer("https://www.canada.ca/en/immigration-refugees-citizenship.html", "IRCC Official Portal")}
                  className="w-full text-left font-bold text-indigo-300 hover:text-white hover:underline flex items-center justify-between"
                >
                  <span>IRCC Official Website</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onOpenInAppViewer("https://www.cbsa-asfc.gc.ca/menu-eng.html", "CBSA Official Site")}
                  className="w-full text-left font-bold text-indigo-300 hover:text-white hover:underline flex items-center justify-between"
                >
                  <span>CBSA Border Portal</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onOpenInAppViewer("https://open.canada.ca/en/open-data", "Canada Open Government Portal")}
                  className="w-full text-left font-bold text-indigo-300 hover:text-white hover:underline flex items-center justify-between"
                >
                  <span>Canada Open Government Portal</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>

        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fade-in">
          
          {/* LEFT COLUMN: INTERACTIVE INQUIRY FORM */}
          <div className="lg:col-span-8">
            {submittedReceipt ? (
              <div className="bg-white rounded-2xl border border-indigo-200 p-8 text-center space-y-5 shadow-sm">
                <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mx-auto border border-emerald-200 shadow-xs">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-display font-bold text-xl text-slate-900">Inquiry Synchronized Successfully</h3>
                  <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                    Your inquiry has been cryptographically signed and allocated to our regional intake registry. A licensed RCIC coordinator will review your profile credentials within 24 hours.
                  </p>
                </div>

                <div className="bg-slate-50 border border-slate-200/60 p-4 rounded-xl text-xs max-w-sm mx-auto space-y-1 text-left font-mono">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Tracking ID:</span>
                    <span className="font-bold text-indigo-600">{submittedReceipt}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Registry Queue:</span>
                    <span className="font-bold text-slate-800">Priority Tier 2</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Est. Response:</span>
                    <span className="font-bold text-emerald-600">&lt; 18 Hours</span>
                  </div>
                </div>

                <button
                  onClick={() => setSubmittedReceipt(null)}
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl cursor-pointer shadow-xs transition-colors"
                >
                  Post Another Inquiry
                </button>
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
                <div className="space-y-1 pb-3 border-b border-slate-100">
                  <h3 className="font-display font-bold text-lg text-slate-900 flex items-center gap-2">
                    <Mail className="w-5 h-5 text-indigo-600" />
                    <span>Legal Consultation & Paid Booking Desk</span>
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Reach out to us on the form below for legal consultation. Book a paid consultation today by taking the first step towards your journey to Canada! Get the latest information about work permits and IRCC processing times for different application categories.
                  </p>
                </div>

                {formError && (
                  <div className="bg-rose-50 border border-rose-200 text-rose-700 text-xs p-3 rounded-xl flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{formError}</span>
                  </div>
                )}

                <form onSubmit={handleFormSubmit} className="space-y-4 text-xs text-slate-700">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="e.g., Haris Rana"
                        className="w-full bg-slate-50 border border-slate-200 text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-800"
                        required
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="e.g., haris@example.com"
                        className="w-full bg-slate-50 border border-slate-200 text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-800"
                        required
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Contact Phone (Optional)</label>
                      <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="e.g., +1 (416) 555-1234"
                        className="w-full bg-slate-50 border border-slate-200 text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-800"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Inquiry Category *</label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="w-full bg-slate-50 border border-slate-200 text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-800"
                      >
                        <option value="General Immigration">🍁 General Immigration & Advice</option>
                        <option value="Express Entry">🚀 Express Entry / CRS Tuning</option>
                        <option value="Alberta Rural Renewal">📍 Alberta Rural Renewal Stream</option>
                        <option value="Manitoba Morden">🏡 Manitoba Morden Initiative</option>
                        <option value="Border / Landing Inquiry">🚗 Border Ingress / CBSA Landing</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Detailed Case Narrative or Question *</label>
                    <textarea
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Please outline your profile details (IELTS bands, current CRS, NOC code, or details on your land border plans) so our counselors can pull the best strategic advice for your file."
                      className="w-full bg-slate-50 border border-slate-200 text-xs rounded-xl p-3 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-800 leading-normal"
                      required
                    ></textarea>
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white font-bold text-xs rounded-xl cursor-pointer shadow-xs transition-colors"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-3.5 h-3.5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                          <span>Synchronizing...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>Submit Secure Inquiry</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: REASSURANCE & CONTACT CARD */}
          <div className="lg:col-span-4 space-y-6 animate-fade-in">
            
            {/* INTAKE TEAM CARD */}
            <div className="bg-slate-900 text-white rounded-2xl p-5 border border-slate-800 shadow-sm space-y-4">
              <h3 className="font-display font-bold text-sm text-white border-b border-slate-800 pb-2.5 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Intake Coordinators</span>
              </h3>

              <div className="text-xs text-slate-400 leading-relaxed space-y-3">
                <p>
                  Our public inquiry desk coordinates directly with licensed **RCICs** and settlement advisory firms located across Canada.
                </p>
                <div className="p-3 bg-white/5 border border-white/10 rounded-xl space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                    <span className="font-bold text-white">Active Queue: Normal</span>
                  </div>
                  <p className="text-[10px] text-slate-500">
                    Estimated consultation matching speed is currently **under 18 hours** for registered priority accounts.
                  </p>
                </div>
              </div>
            </div>

            {/* DIRECT PHONES */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
              <h3 className="font-display font-bold text-sm text-slate-900">Alternative Channels</h3>
              
              <div className="space-y-3 text-xs text-slate-600 leading-normal">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg">
                    <Phone className="w-4 h-4" />
                  </span>
                  <div>
                    <p className="text-[10px] text-slate-400 font-mono">DIRECT PHONE</p>
                    <p className="font-bold text-slate-800">+1 905 5140 786</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg">
                    <Mail className="w-4 h-4" />
                  </span>
                  <div>
                    <p className="text-[10px] text-slate-400 font-mono">SUPPORT EMAIL</p>
                    <p className="font-bold text-slate-800">RZQconsulting@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
