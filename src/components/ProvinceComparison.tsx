import React, { useState } from "react";
import { Compass, HelpCircle, MapPin, CheckCircle, ChevronRight, ShieldCheck, ArrowRight, Sparkles, AlertCircle } from "lucide-react";

interface ProvinceStream {
  id: string;
  name: string;
  provinceName: string;
  streamName: string;
  easeRating: "Excellent" | "High" | "Moderate" | "Difficult";
  easeScore: number; // out of 100
  jobOfferRequired: boolean;
  minClb: number;
  connectionRequired: boolean; // prior tie to Canada
  settlementFunds: string;
  highlights: string[];
  description: string;
  workPermitProcess: string;
  settlementProcess: string;
}

const streamsData: ProvinceStream[] = [
  {
    id: "manitoba-morden",
    name: "Manitoba - Morden",
    provinceName: "Manitoba",
    streamName: "Morden Community-Driven Initiative",
    easeRating: "Excellent",
    easeScore: 92,
    jobOfferRequired: false, // recruited directly as trades
    minClb: 5,
    connectionRequired: false, // strictly requires NO prior connection to other parts of Canada!
    settlementFunds: "Low ($10,000 for single applicant)",
    highlights: [
      "No job offer required prior to community selection",
      "Prioritizes trades: Welders, Cabinetmakers, Painters, Educators",
      "No previous connections to Canada allowed (helps absolute newcomers)"
    ],
    description: "Morden, a vibrant town in Southern Manitoba, actively recruits skilled tradespersons directly through the MPNP. They act as local sponsors, bypassing standard federal CRS point systems.",
    workPermitProcess: "Once selected by the town of Morden, they issue a Letter of Support, allowing you to apply for a closed, expedited Work Permit while your permanent residency is processed provincial-nominee style.",
    settlementProcess: "Incredible local support. A designated town settlement coordinator meets you at the airport, secures temporary housing, assists in setting up banking/social numbers, and introduces you directly to local manufacturers."
  },
  {
    id: "alberta-rural",
    name: "Alberta - Rural Renewal",
    provinceName: "Alberta",
    streamName: "AAIP Rural Renewal Stream",
    easeRating: "High",
    easeScore: 85,
    jobOfferRequired: true,
    minClb: 4, // extremely low language requirement for TEER 4/5!
    connectionRequired: false,
    settlementFunds: "Moderate (Depends on family size, average $5,000 to $9,000)",
    highlights: [
      "Job offer required from a participating rural Alberta community",
      "Extremely low language score threshold (CLB 4 for TEER 4/5)",
      "Zero provincial income tax in Alberta makes settlement highly affordable"
    ],
    description: "Designed for small rural Alberta municipalities (e.g., Brooks, Claresholm, Taber) to recruit foreign nationals. Relies on community endorsement + local employment instead of high CRS scores.",
    workPermitProcess: "With community endorsement + local job offer, AAIP issues a 204(c) Letter of Support, permitting candidates to bypass standard LMIA labor-market testing and receive an immediate Work Permit.",
    settlementProcess: "Participating municipalities have local Welcoming Committees. They arrange buddy-systems, language classes, child enrollment support, and community welcoming socials to integrate newcomers into rural life."
  },
  {
    id: "ontario-oinp",
    name: "Ontario - Human Capital",
    provinceName: "Ontario",
    streamName: "OINP Human Capital Priorities",
    easeRating: "Moderate",
    easeScore: 65,
    jobOfferRequired: false,
    minClb: 7,
    connectionRequired: false,
    settlementFunds: "High ($14,000+ per federal requirements)",
    highlights: [
      "Direct invitations from the federal Express Entry pool",
      "Prioritizes Tech, Healthcare, and French-speakers",
      "Very high cost of living in urban Ontario centers"
    ],
    description: " Ontario searches the federal Express Entry pool for candidates matching target profiles. Excellent for master's grads or IT specialists but requires competitive CRS scores.",
    workPermitProcess: "Generally, candidates remain on their existing Work Permit (e.g. PGWP) or wait until they receive their federal PR. Closed work permits are rarely issued directly from this stream.",
    settlementProcess: "Mainly self-directed settlement. Large urban centers have extensive non-profit newcomer organizations, but individual support is limited due to high immigrant volumes."
  },
  {
    id: "bc-pnp",
    name: "British Columbia - Tech",
    provinceName: "British Columbia",
    streamName: "BCPNP Tech & Care Pathways",
    easeRating: "Moderate",
    easeScore: 60,
    jobOfferRequired: true,
    minClb: 5,
    connectionRequired: false,
    settlementFunds: "High (High cost of living offsets low standard requirements)",
    highlights: [
      "Accelerated processing (Priority Tech draws every Tuesday)",
      "Requires a full-time job offer in one of 35 eligible tech occupations",
      "Very competitive points threshold"
    ],
    description: "A fast-track stream for IT/Tech specialists with a valid 1+ year job offer in Vancouver, Victoria, or other BC cities. Offers priority PNP processing.",
    workPermitProcess: "BCPNP issues a work permit support letter immediately upon nomination, allowing candidates to extend/apply for a work permit without a formal LMIA requirement.",
    settlementProcess: "Fast-paced urban settlement. BC offers specialized services for tech workers, but newcomers must navigate extremely high rental housing markets independently."
  },
  {
    id: "saskatchewan-sinp",
    name: "Saskatchewan - Express Entry",
    provinceName: "Saskatchewan",
    streamName: "SINP Express Entry Stream",
    easeRating: "High",
    easeScore: 78,
    jobOfferRequired: false,
    minClb: 7,
    connectionRequired: false,
    settlementFunds: "Low-to-Moderate (Low cost of living)",
    highlights: [
      "No job offer required for candidates with in-demand skilled NOCs",
      "Operates a separate points grid; candidates do not need high federal CRS",
      "Affordable housing compared to major hubs"
    ],
    description: "Saskatchewan issues nomination invitations to individuals in the federal Express Entry pool whose work experience matches their targeted In-Demand Occupations list.",
    workPermitProcess: "Upon nomination, Saskatchewan provides a support letter for an immediate closed work permit, enabling rapid relocation prior to Permanent Residency issuance.",
    settlementProcess: "Supported by municipal settlement services. Saskatchewan has a strong network of rural and urban welcoming centers, offering decent language training and job integration support."
  }
];

export default function ProvinceComparison() {
  const [selectedStreamId, setSelectedStreamId] = useState<string>("manitoba-morden");
  const [quizAnswers, setQuizAnswers] = useState({
    jobOffer: "no",
    clb: "clb5_6",
    connection: "none",
    background: "trades"
  });
  const [quizResult, setQuizResult] = useState<string | null>(null);

  const selectedStream = streamsData.find(s => s.id === selectedStreamId) || streamsData[0];

  const handleRunQuiz = () => {
    // Basic logic to route candidate to optimal stream
    if (quizAnswers.jobOffer === "yes") {
      setQuizResult("alberta-rural");
    } else if (quizAnswers.background === "tech" && quizAnswers.clb !== "clb4") {
      setQuizResult("bc-pnp");
    } else if (quizAnswers.connection === "none" && quizAnswers.background === "trades" && quizAnswers.clb !== "clb4") {
      setQuizResult("manitoba-morden");
    } else {
      setQuizResult("saskatchewan-sinp");
    }
  };

  const getEaseColor = (rating: string) => {
    switch (rating) {
      case "Excellent": return "text-emerald-600 bg-emerald-50 border-emerald-200";
      case "High": return "text-teal-600 bg-teal-50 border-teal-200";
      case "Moderate": return "text-amber-600 bg-amber-50 border-amber-200";
      default: return "text-rose-600 bg-rose-50 border-rose-200";
    }
  };

  return (
    <div id="province-comparison-view" className="space-y-6">
      
      {/* HEADER CARD */}
      <div className="bg-[#b5a2a2] rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="p-1 bg-indigo-50 text-indigo-600 rounded-lg">
              <Compass className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider font-mono">Provincial Frameworks</span>
          </div>
          <h2 className="font-display font-bold text-2xl text-slate-900 tracking-tight">Provincial Pathway & Ease-of-Settlement Comparison</h2>
          <p className="text-xs text-slate-800 max-w-2xl leading-relaxed">
            While federal Express Entry requires very high CRS cut-offs, individual Canadian provinces operate specialized PNP streams with highly supportive, community-driven settlement processes.
          </p>
        </div>
      </div>

      {/* QUICK COMPARISON GRID */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* LEFT COLUMN: ACTIVE STREAM ACCORDION SELECTOR */}
        <div className="space-y-3 xl:col-span-1">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest px-1">Selected PNP Channels</h3>
          
          <div className="space-y-2.5">
            {streamsData.map((stream) => {
              const isActive = stream.id === selectedStreamId;
              return (
                <button
                  key={stream.id}
                  onClick={() => setSelectedStreamId(stream.id)}
                  className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer block relative ${
                    isActive
                      ? "bg-[#c52835] border-red-800 text-white shadow-md shadow-red-900/10"
                      : "bg-[#edb7b7] border-slate-300 hover:border-slate-400 text-slate-800"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <span className={`text-[9px] font-mono font-bold uppercase tracking-wider block ${isActive ? "text-red-200" : "text-slate-600"}`}>
                        {stream.provinceName}
                      </span>
                      <span className="text-xs font-bold block mt-0.5">{stream.streamName}</span>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                      isActive 
                        ? "bg-white/10 border-white/20 text-white" 
                        : "bg-black/5 border-slate-300 text-slate-800"
                    }`}>
                      Score: {stream.easeScore}
                    </span>
                  </div>
                  
                  {/* Miniature stats badges */}
                  <div className="flex gap-2 mt-3 text-[9px] font-medium">
                    <span className={`px-1.5 py-0.5 rounded-md ${isActive ? "bg-white/15 text-white" : "bg-black/5 text-slate-800"}`}>
                      CLB {stream.minClb}+
                    </span>
                    <span className={`px-1.5 py-0.5 rounded-md ${isActive ? "bg-white/15 text-white" : "bg-black/5 text-slate-800"}`}>
                      {stream.jobOfferRequired ? "Job Offer Req." : "No Job Offer"}
                    </span>
                    <span className={`px-1.5 py-0.5 rounded-md ${isActive ? "bg-white/15 text-white" : "bg-black/5 text-slate-800"}`}>
                      Ease: {stream.easeRating}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* MIDDLE/RIGHT COLUMN: EXPANDED STREAM VIEW & SETTLEMENT FLOW */}
        <div className="xl:col-span-2 space-y-6">
          
          {/* STREAM DETAILED VIEW */}
          <div className="bg-[#d7c6c6] rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
            
            {/* Title Block */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-bold text-indigo-600 font-mono tracking-wider block">
                  {selectedStream.provinceName} PROVINCIAL SELECTION PATHWAY
                </span>
                <h3 className="font-display font-bold text-lg text-slate-900 mt-1">
                  {selectedStream.streamName}
                </h3>
              </div>

              {/* Ease score banner */}
              <div className={`flex items-center gap-2 border px-3 py-1.5 rounded-xl text-xs font-bold ${getEaseColor(selectedStream.easeRating)}`}>
                <span>Ease of Settlement: {selectedStream.easeRating}</span>
                <span className="text-sm font-black">({selectedStream.easeScore}/100)</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              {selectedStream.description}
            </p>

            {/* Stream requirements checklist */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
              <div>
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Technical Thresholds</h4>
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Minimum Language</span>
                    <span className="font-bold text-slate-950 font-mono">CLB Level {selectedStream.minClb}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Arranged Job Offer</span>
                    <span className="font-bold text-slate-950">
                      {selectedStream.jobOfferRequired ? "Mandatory" : "Not Required"}
                    </span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-500">Previous Canadian Tie</span>
                    <span className="font-bold text-slate-950">
                      {selectedStream.connectionRequired ? "Required" : "No (Absolute Newcomers welcome)"}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Required Settlement Funds</h4>
                <div className="space-y-1">
                  <span className="font-mono font-bold text-xs text-indigo-600 block">{selectedStream.settlementFunds}</span>
                  <p className="text-[10px] text-slate-500 leading-relaxed mt-1">
                    Provinces require verification of liquid, unencumbered settlement capital to ensure transition buffer before local payroll cycle establishes.
                  </p>
                </div>
              </div>
            </div>

            {/* Highlights bullet points */}
            <div className="space-y-2.5">
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Key Pathway Highlights</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {selectedStream.highlights.map((highlight, index) => (
                  <div key={index} className="p-3 bg-indigo-50/30 border border-indigo-100/50 rounded-xl text-[11px] text-slate-700 leading-normal flex gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-indigo-600 shrink-0 mt-0.5" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* WORK PERMIT AND SETTLEMENT SPLIT INSIGHTS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {/* Work Permit Channel */}
              <div className="border border-slate-200 p-4 rounded-xl space-y-2">
                <span className="text-[9px] font-bold font-mono text-indigo-600 uppercase tracking-wider">🛠️ Work Permit Pathway</span>
                <h4 className="text-xs font-bold text-slate-900">Immediate Work Authorization</h4>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  {selectedStream.workPermitProcess}
                </p>
              </div>

              {/* Settlement Support */}
              <div className="border border-slate-200 p-4 rounded-xl space-y-2">
                <span className="text-[9px] font-bold font-mono text-emerald-600 uppercase tracking-wider">🏡 Settlement & Integration Process</span>
                <h4 className="text-xs font-bold text-slate-900">Local Community Welcome</h4>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  {selectedStream.settlementProcess}
                </p>
              </div>
            </div>

          </div>

          {/* QUIZ TOOL FOR CUSTOM RECOMMENDATIONS */}
          <div className="bg-slate-900 rounded-2xl p-6 text-white border border-slate-800 shadow-sm space-y-5">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-yellow-400" />
              <div>
                <h3 className="font-display font-bold text-sm">Where Do I Fit Best? Stream Matcher</h3>
                <p className="text-[10px] text-slate-400">Answer 4 quick profile questions to align with the easiest Canadian settlement program.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              {/* Q1: Job offer */}
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Do you have a valid Canadian Job Offer?</label>
                <select
                  value={quizAnswers.jobOffer}
                  onChange={(e) => setQuizAnswers(prev => ({ ...prev, jobOffer: e.target.value }))}
                  className="w-full bg-slate-950 border border-slate-800 text-xs rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-200"
                >
                  <option value="no">No active job offer</option>
                  <option value="yes">Yes, I have an offer from a Canadian employer</option>
                </select>
              </div>

              {/* Q2: CLB English */}
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">What is your CLB Language Level?</label>
                <select
                  value={quizAnswers.clb}
                  onChange={(e) => setQuizAnswers(prev => ({ ...prev, clb: e.target.value }))}
                  className="w-full bg-slate-950 border border-slate-800 text-xs rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-200"
                >
                  <option value="clb7_plus">CLB 7 or higher (Competitive)</option>
                  <option value="clb5_6">CLB 5 to 6 (Intermediate)</option>
                  <option value="clb4">CLB 4 (Basic thresholds)</option>
                </select>
              </div>

              {/* Q3: Prior connections */}
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Do you have relatives, friends, or studies in Canada?</label>
                <select
                  value={quizAnswers.connection}
                  onChange={(e) => setQuizAnswers(prev => ({ ...prev, connection: e.target.value }))}
                  className="w-full bg-slate-950 border border-slate-800 text-xs rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-200"
                >
                  <option value="none">No connections anywhere in Canada</option>
                  <option value="family_friend">Yes, family or friends in BC, Ontario, or Alberta</option>
                </select>
              </div>

              {/* Q4: Professional Background */}
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">What is your primary occupational sector?</label>
                <select
                  value={quizAnswers.background}
                  onChange={(e) => setQuizAnswers(prev => ({ ...prev, background: e.target.value }))}
                  className="w-full bg-slate-950 border border-slate-800 text-xs rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-200"
                >
                  <option value="trades">Skilled Trades (Welder, Carpenter, Manufacturing, etc.)</option>
                  <option value="tech">Information Technology & Software (STEM)</option>
                  <option value="healthcare">Healthcare & Nursing</option>
                  <option value="other">General Administration / Professional</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={handleRunQuiz}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold cursor-pointer transition-colors shadow-md"
              >
                Match Optimal Province Stream
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Quiz Result Output */}
            {quizResult && (
              <div className="mt-4 p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2.5 animate-fade-in">
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Optimal Match Selected:</span>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">
                    {streamsData.find(s => s.id === quizResult)?.provinceName} - {streamsData.find(s => s.id === quizResult)?.streamName}
                  </h4>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    Based on your inputs, you fit best in this stream! It features an **Ease of Settlement Score of {streamsData.find(s => s.id === quizResult)?.easeScore}/100**. Click the stream in the panel above to view full work permit and integration details.
                  </p>
                </div>
                <button
                  onClick={() => setSelectedStreamId(quizResult)}
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-indigo-400 hover:text-indigo-300"
                >
                  View complete details for this stream
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
}
