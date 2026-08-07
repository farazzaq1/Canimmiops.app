import React, { useState, useEffect } from "react";
import { PhaseChecklist, SavedDocument } from "../types";
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  Sparkles, 
  Copy, 
  Check, 
  Printer, 
  Save, 
  ChevronRight, 
  ChevronDown, 
  ArrowRight,
  RefreshCw,
  FileText,
  Trash2,
  Lock,
  Eye,
  ShieldCheck,
  AlertCircle
} from "lucide-react";

interface ComplianceWorkbookProps {
  phases: PhaseChecklist[];
  onUpdatePhases: (updatedPhases: PhaseChecklist[]) => void;
  companyName: string;
  setCompanyName: (name: string) => void;
  domainName: string;
  setDomainName: (domain: string) => void;
}

export default function ComplianceWorkbook({ 
  phases, 
  onUpdatePhases, 
  companyName, 
  setCompanyName, 
  domainName, 
  setDomainName 
}: ComplianceWorkbookProps) {
  
  const [activePhaseId, setActivePhaseId] = useState<string>("phase4");
  const [targetUsers, setTargetUsers] = useState<string>("Economic newcomers and study permit applicants");
  const [traffic, setTraffic] = useState<string>("25,000 unique monthly visitors");
  const [securityProtocol, setSecurityProtocol] = useState<string>("OAuth 2.0 with OpenID Connect & 2FA");
  
  // AI draft state
  const [generatingDoc, setGeneratingDoc] = useState<boolean>(false);
  const [draftedContent, setDraftedContent] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);
  const [savedDocs, setSavedDocs] = useState<SavedDocument[]>([]);
  const [viewingDocId, setViewingDocId] = useState<string | null>(null);

  // Load saved documents from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("canimmi_drafted_documents");
    if (saved) {
      try {
        setSavedDocs(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse saved documents", e);
      }
    }
  }, []);

  const saveDocumentsToStorage = (docs: SavedDocument[]) => {
    localStorage.setItem("canimmi_drafted_documents", JSON.stringify(docs));
    setSavedDocs(docs);
  };

  const handleToggleItem = (phaseId: string, itemIdx: number) => {
    const updated = phases.map(phase => {
      if (phase.id === phaseId) {
        const items = [...phase.items];
        items[itemIdx] = { ...items[itemIdx], completed: !items[itemIdx].completed };
        
        // Auto-calculate phase progress
        const completedCount = items.filter(i => i.completed).length;
        let status = phase.status;
        if (completedCount === items.length) {
          status = "completed";
        } else if (completedCount > 0) {
          status = "in_progress";
        } else {
          status = "not_started";
        }
        
        return { ...phase, items, status };
      }
      return phase;
    });
    onUpdatePhases(updated);
  };

  const handleStatusChange = (phaseId: string, status: "not_started" | "in_progress" | "completed") => {
    const updated = phases.map(phase => {
      if (phase.id === phaseId) {
        // If changing to completed, check all items. If changing to not_started, uncheck all.
        const items = phase.items.map(i => ({
          ...i,
          completed: status === "completed" ? true : status === "not_started" ? false : i.completed
        }));
        return { ...phase, items, status };
      }
      return phase;
    });
    onUpdatePhases(updated);
  };

  const handleGenerateDocument = async (phase: PhaseChecklist) => {
    if (!phase.documentType) return;
    setGeneratingDoc(true);
    setDraftedContent("");
    setViewingDocId(null);

    const parameters = {
      targetUsers,
      traffic,
      securityProtocol,
      gateway: "Secure HTTPS REST API gateway with CORS, HMAC and Rate Limiting"
    };

    try {
      const res = await fetch("/api/gemini/generate-document", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phase: phase.documentType,
          companyName,
          domain: domainName,
          parameters
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to generate compliance document.");
      }

      setDraftedContent(data.document);
    } catch (e: any) {
      console.error(e);
      setDraftedContent(`### Error Generating Document\n\n${e.message || "Could not connect to Gemini service. Please verify your GEMINI_API_KEY."}`);
    } finally {
      setGeneratingDoc(false);
    }
  };

  const handleSaveDocument = () => {
    if (!draftedContent) return;
    const currentPhase = phases.find(p => p.id === activePhaseId);
    if (!currentPhase) return;

    const newDoc: SavedDocument = {
      id: `${currentPhase.id}_${Date.now()}`,
      phaseId: currentPhase.id,
      title: `${currentPhase.title} - Proposal Draft`,
      content: draftedContent,
      companyName,
      domain: domainName,
      createdAt: new Date().toLocaleDateString("en-CA", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      })
    };

    const updated = [newDoc, ...savedDocs];
    saveDocumentsToStorage(updated);
    setViewingDocId(newDoc.id);
    
    // Set phase status to completed if document is generated and saved
    const updatedPhases = phases.map(p => {
      if (p.id === currentPhase.id) {
        return { ...p, status: "completed" as const };
      }
      return p;
    });
    onUpdatePhases(updatedPhases);
  };

  const handleDeleteDocument = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = savedDocs.filter(d => d.id !== id);
    saveDocumentsToStorage(updated);
    if (viewingDocId === id) {
      setDraftedContent("");
      setViewingDocId(null);
    }
  };

  const handleCopyText = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = (content: string) => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;
    printWindow.document.write(`
      <html>
        <head>
          <title>Exported Compliance Document</title>
          <style>
            body { font-family: -apple-system, sans-serif; line-height: 1.6; padding: 40px; color: #1e293b; }
            h1 { font-size: 24px; border-bottom: 2px solid #cbd5e1; padding-bottom: 10px; margin-bottom: 20px; }
            h2 { font-size: 18px; margin-top: 30px; }
            pre { background: #f1f5f9; padding: 15px; border-radius: 5px; }
            li { margin-bottom: 5px; }
          </style>
        </head>
        <body>
          <div>${content.replace(/\n/g, "<br/>")}</div>
          <script>window.print();</script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  const activePhase = phases.find(p => p.id === activePhaseId) || phases[0];

  return (
    <div className="space-y-8 animate-fade-in" id="compliance_workbook">
      
      {/* SECTION HEADER */}
      <div className="border-b border-slate-200 pb-5">
        <h2 className="font-display text-2xl font-bold text-slate-900">8-Phase Operations & Compliance Workbook</h2>
        <p className="text-sm text-slate-500 mt-1">
          Interactive playbooks aligning your operations directly with the Government of Canada digital services registry, PIPEDA privacy laws, and OAuth 2.0 specifications.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: PHASE SELECTOR LIST (4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-slate-400">Compliance Phases</h3>
            
            <div className="space-y-2">
              {phases.map((p) => {
                const isActive = p.id === activePhaseId;
                const completedCount = p.items.filter(i => i.completed).length;
                const totalCount = p.items.length;
                const pct = Math.round((completedCount / totalCount) * 100);

                return (
                  <button
                    key={p.id}
                    onClick={() => {
                      setActivePhaseId(p.id);
                      setDraftedContent("");
                      setViewingDocId(null);
                    }}
                    className={`w-full p-3.5 rounded-xl text-left transition-all border flex flex-col gap-2 ${
                      isActive 
                        ? "bg-slate-900 border-slate-900 text-white shadow-md transform -translate-y-0.5" 
                        : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-white hover:border-slate-300"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 w-full">
                      <span className="text-xs font-bold tracking-tight line-clamp-1">{p.title}</span>
                      {p.status === "completed" ? (
                        <span className="text-[9px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-bold font-mono">
                          Completed
                        </span>
                      ) : p.status === "in_progress" ? (
                        <span className="text-[9px] bg-indigo-500/20 text-indigo-400 px-2 py-0.5 rounded-full font-bold font-mono">
                          {pct}% Done
                        </span>
                      ) : (
                        <span className="text-[9px] bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full font-bold font-mono">
                          Pending
                        </span>
                      )}
                    </div>
                    <p className={`text-[10px] line-clamp-2 ${isActive ? "text-slate-300" : "text-slate-500"}`}>
                      {p.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* DRAFTED DOCUMENTS HISTORY */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-slate-400">Generated Documents Library ({savedDocs.length})</h3>
            
            {savedDocs.length === 0 ? (
              <div className="text-center py-6 text-slate-400 text-xs">
                <FileText className="w-8 h-8 mx-auto stroke-1 text-slate-300 mb-2" />
                No custom drafts generated yet.
              </div>
            ) : (
              <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                {savedDocs.map((doc) => {
                  const isViewing = doc.id === viewingDocId;
                  return (
                    <div
                      key={doc.id}
                      onClick={() => {
                        setViewingDocId(doc.id);
                        setDraftedContent(doc.content);
                        const parts = doc.phaseId.split("_");
                        setActivePhaseId(doc.phaseId);
                      }}
                      className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all flex items-center justify-between gap-3 ${
                        isViewing 
                          ? "bg-indigo-50 border-indigo-300 text-indigo-900" 
                          : "bg-slate-50 hover:bg-white border-slate-200 text-slate-700"
                      }`}
                    >
                      <div className="truncate space-y-0.5">
                        <p className="text-xs font-bold truncate">{doc.title}</p>
                        <p className="text-[9px] text-slate-400 font-mono">{doc.createdAt}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePrint(doc.content);
                          }}
                          className="p-1 text-slate-400 hover:text-slate-600 rounded"
                          title="Print/Export"
                        >
                          <Printer className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={(e) => handleDeleteDocument(doc.id, e)}
                          className="p-1 text-slate-400 hover:text-rose-600 rounded"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: ACTIVE PHASE DETAILED PLAYBOOK (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
            
            {/* Phase Title Area */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
              <div className="space-y-1">
                <h3 className="font-display font-bold text-xl text-slate-900">{activePhase.title}</h3>
                <p className="text-xs text-slate-500">{activePhase.description}</p>
              </div>

              {/* Status Select dropdown */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 font-medium font-mono">Status:</span>
                <select
                  value={activePhase.status}
                  onChange={(e) => handleStatusChange(activePhase.id, e.target.value as any)}
                  className="bg-slate-50 border border-slate-200 text-xs rounded-xl px-2.5 py-1.5 text-slate-700 focus:outline-none focus:ring-1 focus:ring-slate-400 font-semibold"
                >
                  <option value="not_started">Pending</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>

            {/* Checklist items */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-slate-400">Required Deliverables & Compliance Checklist</h4>
              
              <div className="grid grid-cols-1 gap-2.5">
                {activePhase.items.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleToggleItem(activePhase.id, idx)}
                    className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-150 cursor-pointer hover:bg-white hover:border-slate-300 transition-colors"
                  >
                    <button className="flex-shrink-0 mt-0.5 text-indigo-600">
                      {item.completed ? (
                        <CheckCircle2 className="w-5 h-5 fill-indigo-50" />
                      ) : (
                        <Circle className="w-5 h-5 text-slate-300" />
                      )}
                    </button>
                    <span className={`text-xs leading-normal ${item.completed ? "line-through text-slate-400 font-medium" : "text-slate-700 font-medium"}`}>
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* COMPANY LAUNCH SPECIFICATIONS PANEL */}
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-100 space-y-4">
              <div className="flex items-center gap-2 text-slate-900 border-b border-slate-200/60 pb-2">
                <ShieldCheck className="w-5 h-5 text-indigo-600" />
                <h4 className="font-display font-bold text-xs uppercase tracking-wider">Corporate Sandbox Credentials & Setup</h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold tracking-wider text-slate-500 font-mono">Company Name</label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g. 12105381 Canada Inc."
                    className="w-full bg-white border border-slate-200 text-xs rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-800"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold tracking-wider text-slate-500 font-mono">Professional Website Domain</label>
                  <input
                    type="text"
                    value={domainName}
                    onChange={(e) => setDomainName(e.target.value)}
                    placeholder="e.g. domain.com"
                    className="w-full bg-white border border-slate-200 text-xs rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-800"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold tracking-wider text-slate-500 font-mono">Target Users</label>
                  <input
                    type="text"
                    value={targetUsers}
                    onChange={(e) => setTargetUsers(e.target.value)}
                    className="w-full bg-white border border-slate-200 text-xs rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-800"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold tracking-wider text-slate-500 font-mono">Expected Monthly Visitors</label>
                  <input
                    type="text"
                    value={traffic}
                    onChange={(e) => setTraffic(e.target.value)}
                    className="w-full bg-white border border-slate-200 text-xs rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-800"
                  />
                </div>
              </div>
            </div>

            {/* AI DOCUMENT GENERATOR ACTION */}
            {activePhase.documentType && (
              <div className="pt-4 border-t border-slate-100 space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-0.5">
                    <h4 className="font-display font-bold text-sm text-slate-900 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-indigo-500" />
                      Gemini Government Compliance Proposal Writer
                    </h4>
                    <p className="text-xs text-slate-500">Draft professional letters, security briefs, or PIAs conforming directly with Canadian standards.</p>
                  </div>

                  <button
                    onClick={() => handleGenerateDocument(activePhase)}
                    disabled={generatingDoc}
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-900 text-white font-semibold text-xs px-4 py-2.5 rounded-xl hover:shadow-md active:scale-95 disabled:from-slate-400 disabled:to-slate-500 transition-all cursor-pointer self-stretch sm:self-auto justify-center"
                  >
                    {generatingDoc ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        Analyzing Mandates...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                        Generate AI Document Draft
                      </>
                    )}
                  </button>
                </div>

                {/* AI Document results layout */}
                {(generatingDoc || draftedContent) && (
                  <div className="bg-slate-50 border border-slate-150 rounded-xl p-5 space-y-4">
                    {generatingDoc ? (
                      <div className="flex flex-col items-center justify-center py-12 space-y-3">
                        <div className="w-10 h-10 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
                        <p className="text-xs text-slate-500 font-semibold font-display">Structuring formal response tailored to PIPEDA / CBSA / IRCC rules...</p>
                        <p className="text-[10px] text-slate-400 max-w-sm text-center">Gemini is researching active parameters to craft a presentation-grade memorandum.</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                          <span className="text-xs font-bold text-slate-800 font-display flex items-center gap-1.5">
                            <FileText className="w-4 h-4 text-slate-600" />
                            Drafted Blueprint Output
                          </span>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleCopyText(draftedContent)}
                              className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg text-xs font-semibold text-slate-700 transition-all cursor-pointer"
                              title="Copy to Clipboard"
                            >
                              {copied ? (
                                <>
                                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                                  Copied!
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3.5 h-3.5" />
                                  Copy
                                </>
                              )}
                            </button>
                            <button
                              onClick={() => handlePrint(draftedContent)}
                              className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg text-xs font-semibold text-slate-700 transition-all cursor-pointer"
                              title="Export / Print"
                            >
                              <Printer className="w-3.5 h-3.5" />
                              Print
                            </button>
                            {!viewingDocId && (
                              <button
                                onClick={handleSaveDocument}
                                className="inline-flex items-center gap-1 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold transition-all cursor-pointer"
                                title="Save to Project Library"
                              >
                                <Save className="w-3.5 h-3.5" />
                                Save Draft
                              </button>
                            )}
                          </div>
                        </div>

                        {/* Textarea or formatted view of drafted contents */}
                        <div className="bg-white border border-slate-100 rounded-xl p-5 max-h-[400px] overflow-y-auto text-xs text-slate-700 leading-relaxed font-mono whitespace-pre-wrap shadow-inner scrollbar-thin">
                          {draftedContent}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
