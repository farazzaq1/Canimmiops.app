import React, { useState, useMemo } from "react";
import { Province } from "../types";
import { HISTORICAL_DATA, HistoricalRecord } from "../data/historicalData";
import { 
  TrendingUp, 
  MapPin, 
  Download, 
  Sparkles, 
  RefreshCw, 
  Copy, 
  Check, 
  Printer, 
  Filter, 
  Calendar, 
  BarChart4, 
  Layers, 
  PieChart, 
  Activity, 
  HelpCircle,
  FileSpreadsheet,
  AlertCircle,
  ChevronRight,
  Info
} from "lucide-react";

interface AnalyticsDashboardProps {
  provinces: Province[];
  companyName: string;
}

export default function AnalyticsDashboard({ provinces, companyName }: AnalyticsDashboardProps) {
  // Filter States
  const [selectedProvs, setSelectedProvs] = useState<string[]>(["ON", "BC", "AB", "QC", "SK"]);
  const [selectedYears, setSelectedYears] = useState<number[]>([2024, 2025, 2026]);
  const [selectedQuarters, setSelectedQuarters] = useState<string[]>(["Q1", "Q2", "Q3", "Q4"]);
  const [activeMetric, setActiveMetric] = useState<"pnpTargets" | "expressEntry" | "studyPermits" | "workPermits" | "borderCrossings">("pnpTargets");

  // Hover Tooltip States
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  const [chartTooltip, setChartTooltip] = useState<{ x: number; y: number; label: string; value: string } | null>(null);

  // AI Insights States
  const [generatingInsights, setGeneratingInsights] = useState<boolean>(false);
  const [insightsResult, setInsightsResult] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);

  // Define metric names and labels
  const metricConfig = {
    pnpTargets: {
      label: "Provincial Nominee Program (PNP) Targets",
      shortLabel: "PNP Targets",
      color: "text-indigo-600 font-bold",
      fillColor: "#4f46e5",
      gradient: "from-indigo-500 to-purple-600",
      bgSoft: "bg-indigo-50",
      borderSoft: "border-indigo-100",
      description: "Annual and quarterly allocation ceilings for provincial immigration nominees.",
      unit: "PRs"
    },
    expressEntry: {
      label: "Express Entry Aligned Nominee Targets",
      shortLabel: "Express Entry Aligned",
      color: "text-emerald-600 font-bold",
      fillColor: "#059669",
      gradient: "from-emerald-400 to-teal-600",
      bgSoft: "bg-emerald-50",
      borderSoft: "border-emerald-100",
      description: "Allocations linked directly to the federal Express Entry online intake system.",
      unit: "PRs"
    },
    studyPermits: {
      label: "Temporary International Study Permits",
      shortLabel: "Study Permits",
      color: "text-amber-600 font-bold",
      fillColor: "#d97706",
      gradient: "from-amber-400 to-orange-500",
      bgSoft: "bg-amber-50",
      borderSoft: "border-amber-100",
      description: "Active study permits allocated per province, subject to federal caps.",
      unit: "Permits"
    },
    workPermits: {
      label: "Temporary Work Permits Issued",
      shortLabel: "Work Permits",
      color: "text-rose-600 font-bold",
      fillColor: "#e11d48",
      gradient: "from-rose-500 to-red-600",
      bgSoft: "bg-rose-50",
      borderSoft: "border-rose-100",
      description: "LMIA and international mobility program work permits processed regionally.",
      unit: "Permits"
    },
    borderCrossings: {
      label: "CBSA Land Border Ingress Traffic",
      shortLabel: "Border Crossings",
      color: "text-sky-600 font-bold",
      fillColor: "#0284c7",
      gradient: "from-sky-400 to-blue-600",
      bgSoft: "bg-sky-50",
      borderSoft: "border-sky-100",
      description: "Passenger and commercial truck traffic volume crossing land border ports.",
      unit: "k Entries"
    }
  };

  // Province Information
  const provinceLookup: Record<string, { name: string; capital: string; region: string; gridPos: { r: number; c: number } }> = {
    YT: { name: "Yukon", capital: "Whitehorse", region: "Territories", gridPos: { r: 1, c: 1 } },
    NT: { name: "Northwest Territories", capital: "Yellowknife", region: "Territories", gridPos: { r: 1, c: 2 } },
    NU: { name: "Nunavut", capital: "Iqaluit", region: "Territories", gridPos: { r: 1, c: 3 } },
    BC: { name: "British Columbia", capital: "Victoria", region: "West", gridPos: { r: 2, c: 1 } },
    AB: { name: "Alberta", capital: "Edmonton", region: "West", gridPos: { r: 2, c: 2 } },
    SK: { name: "Saskatchewan", capital: "Regina", region: "West", gridPos: { r: 2, c: 3 } },
    MB: { name: "Manitoba", capital: "Winnipeg", region: "West", gridPos: { r: 2, c: 4 } },
    ON: { name: "Ontario", capital: "Toronto", region: "East", gridPos: { r: 3, c: 4 } },
    QC: { name: "Quebec", capital: "Quebec City", region: "East", gridPos: { r: 3, c: 5 } },
    NB: { name: "New Brunswick", capital: "Fredericton", region: "East", gridPos: { r: 3, c: 6 } },
    PE: { name: "Prince Edward Island", capital: "Charlottetown", region: "East", gridPos: { r: 2, c: 6 } },
    NS: { name: "Nova Scotia", capital: "Halifax", region: "East", gridPos: { r: 4, c: 6 } },
    NL: { name: "Newfoundland & Labrador", capital: "St. John's", region: "East", gridPos: { r: 2, c: 7 } }
  };

  // Region filtering groups
  const regionPresets = {
    all: { label: "All 13 Regions", ids: ["ON", "BC", "AB", "QC", "SK", "MB", "NB", "NS", "PE", "NL", "YT", "NT", "NU"] },
    west: { label: "Western Canada", ids: ["BC", "AB", "SK", "MB"] },
    east: { label: "Eastern / Atlantic", ids: ["ON", "QC", "NB", "NS", "PE", "NL"] },
    territories: { label: "Territories", ids: ["YT", "NT", "NU"] }
  };

  // Toggles for Filter States
  const handleToggleProvince = (id: string) => {
    if (selectedProvs.includes(id)) {
      if (selectedProvs.length > 1) {
        setSelectedProvs(selectedProvs.filter(p => p !== id));
      }
    } else {
      setSelectedProvs([...selectedProvs, id]);
    }
  };

  const handleApplyPreset = (presetKey: "all" | "west" | "east" | "territories") => {
    setSelectedProvs(regionPresets[presetKey].ids);
  };

  const handleToggleYear = (year: number) => {
    if (selectedYears.includes(year)) {
      if (selectedYears.length > 1) {
        setSelectedYears(selectedYears.filter(y => y !== year));
      }
    } else {
      setSelectedYears([...selectedYears, year].sort());
    }
  };

  const handleToggleQuarter = (q: string) => {
    if (selectedQuarters.includes(q)) {
      if (selectedQuarters.length > 1) {
        setSelectedQuarters(selectedQuarters.filter(item => item !== q));
      }
    } else {
      setSelectedQuarters([...selectedQuarters, q]);
    }
  };

  // Filtered dataset computed from selected parameters
  const filteredRecords = useMemo(() => {
    return HISTORICAL_DATA.filter(rec => 
      selectedProvs.includes(rec.provinceId) &&
      selectedYears.includes(rec.year) &&
      selectedQuarters.includes(rec.quarter)
    );
  }, [selectedProvs, selectedYears, selectedQuarters]);

  // Calculations for KPI Cards
  const kpiData = useMemo(() => {
    let totalValue = 0;
    const provTotals: Record<string, number> = {};
    const quarterlyTrends: Record<string, number> = {};

    filteredRecords.forEach(rec => {
      const val = rec[activeMetric] || 0;
      totalValue += val;

      provTotals[rec.provinceId] = (provTotals[rec.provinceId] || 0) + val;
      
      const trendKey = `${rec.year} ${rec.quarter}`;
      quarterlyTrends[trendKey] = (quarterlyTrends[trendKey] || 0) + val;
    });

    // Peak Province
    let peakProv = "N/A";
    let peakVal = 0;
    Object.entries(provTotals).forEach(([prov, sum]) => {
      if (sum > peakVal) {
        peakVal = sum;
        peakProv = provinceLookup[prov]?.name || prov;
      }
    });

    // Multi-year comparison baseline
    const yearTotals: Record<number, number> = {};
    filteredRecords.forEach(rec => {
      yearTotals[rec.year] = (yearTotals[rec.year] || 0) + (rec[activeMetric] || 0);
    });

    let yoyGrowthLabel = "Baseline Stable";
    let yoyGrowthVal = 0;
    const yearsArr = Object.keys(yearTotals).map(Number).sort();
    if (yearsArr.length >= 2) {
      const latestYear = yearsArr[yearsArr.length - 1];
      const prevYear = yearsArr[yearsArr.length - 2];
      const latestSum = yearTotals[latestYear];
      const prevSum = yearTotals[prevYear];
      if (prevSum > 0) {
        yoyGrowthVal = ((latestSum - prevSum) / prevSum) * 100;
        yoyGrowthLabel = `${yoyGrowthVal > 0 ? "▲" : "▼"} ${Math.abs(yoyGrowthVal).toFixed(1)}% YoY (${prevYear} to ${latestYear})`;
      }
    }

    return {
      total: totalValue,
      peakProvince: peakProv,
      peakValue: peakVal,
      yoyLabel: yoyGrowthLabel,
      yoyPercentage: yoyGrowthVal,
      provTotals,
      quarterlyTrends
    };
  }, [filteredRecords, activeMetric]);

  // Aggregate matrix by Province for tables and bar chart
  const provincialSummaryMatrix = useMemo(() => {
    return selectedProvs.map(provId => {
      const recordsForProv = filteredRecords.filter(r => r.provinceId === provId);
      const total = recordsForProv.reduce((acc, r) => acc + (r[activeMetric] || 0), 0);
      return {
        id: provId,
        name: provinceLookup[provId]?.name || provId,
        capital: provinceLookup[provId]?.capital || "N/A",
        region: provinceLookup[provId]?.region || "N/A",
        total
      };
    }).sort((a, b) => b.total - a.total);
  }, [filteredRecords, selectedProvs, activeMetric]);

  // Quarterly aggregated timeline for the line chart
  const timelineData = useMemo(() => {
    const quartersLine: Array<{ label: string; value: number }> = [];
    
    // Sort timeline correctly (2024 -> 2026, Q1 -> Q4)
    const years = [2024, 2025, 2026].filter(y => selectedYears.includes(y));
    const quarters = ["Q1", "Q2", "Q3", "Q4"].filter(q => selectedQuarters.includes(q));

    years.forEach(year => {
      quarters.forEach(quarter => {
        const matchingRecs = filteredRecords.filter(r => r.year === year && r.quarter === quarter);
        const sum = matchingRecs.reduce((acc, r) => acc + (r[activeMetric] || 0), 0);
        if (matchingRecs.length > 0) {
          quartersLine.push({
            label: `${year} ${quarter}`,
            value: sum
          });
        }
      });
    });

    return quartersLine;
  }, [filteredRecords, selectedYears, selectedQuarters, activeMetric]);

  // EXPORT UTILITIES: CSV Generation
  const handleExportCSV = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Province/Territory,Province Code,Year,Quarter,Metric,Value\n";

    filteredRecords.forEach(rec => {
      const name = provinceLookup[rec.provinceId]?.name || rec.provinceId;
      csvContent += `"${name}","${rec.provinceId}",${rec.year},"${rec.quarter}","${metricConfig[activeMetric].shortLabel}",${rec[activeMetric]}\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `CanImmi_Analytics_${activeMetric}_${selectedYears.join("-")}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // EXPORT UTILITIES: JSON Generation
  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(filteredRecords, null, 2));
    const link = document.createElement("a");
    link.setAttribute("href", dataStr);
    link.setAttribute("download", `CanImmi_Analytics_${activeMetric}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // TRIGGER AI REPORT FROM GEMINI
  const handleGenerateAIInsights = async () => {
    setGeneratingInsights(true);
    setInsightsResult("");

    const dataSummaryMatrix = provincialSummaryMatrix.map(m => ({
      province: m.name,
      code: m.id,
      aggregatedValue: m.total,
      percentageOfTotal: kpiData.total > 0 ? ((m.total / kpiData.total) * 100).toFixed(1) + "%" : "0%"
    }));

    try {
      const res = await fetch("/api/gemini/generate-document", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phase: "analytics_insight",
          companyName,
          parameters: {
            dataTypeLabel: metricConfig[activeMetric].label,
            dateRangeLabel: `Years [${selectedYears.join(", ")}] - Quarters [${selectedQuarters.join(", ")}]`,
            selectedProvincesList: selectedProvs.map(id => provinceLookup[id]?.name || id).join(", "),
            metricTotal: `${kpiData.total.toLocaleString()} ${metricConfig[activeMetric].unit}`,
            dataSummaryMatrix
          }
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to generate AI insights.");
      }

      setInsightsResult(data.document);
    } catch (e: any) {
      console.error(e);
      setInsightsResult(`### Insights Offline\n\nCould not fetch real-time policy commentary: ${e.message}. Please verify that a valid GEMINI_API_KEY is configured in the Secrets panel.`);
    } finally {
      setGeneratingInsights(false);
    }
  };

  const handleCopyInsights = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrintView = () => {
    window.print();
  };

  // Renders the chloropleth scale for Canada Map
  const getProvinceColorClass = (provId: string) => {
    const isSelected = selectedProvs.includes(provId);
    if (!isSelected) return "bg-slate-100 hover:bg-slate-200 text-slate-400 border-slate-200 opacity-40";

    const total = kpiData.provTotals[provId] || 0;
    if (kpiData.total === 0 || total === 0) return "bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100";

    const ratio = total / kpiData.peakValue;
    
    // Choose specific theme color scale based on activeMetric
    if (activeMetric === "pnpTargets") {
      if (ratio > 0.75) return "bg-indigo-900 text-white border-indigo-950";
      if (ratio > 0.5) return "bg-indigo-700 text-white border-indigo-800";
      if (ratio > 0.25) return "bg-indigo-400 text-white border-indigo-500";
      return "bg-indigo-100 text-indigo-800 border-indigo-200 hover:bg-indigo-200";
    } else if (activeMetric === "expressEntry") {
      if (ratio > 0.75) return "bg-emerald-900 text-white border-emerald-950";
      if (ratio > 0.5) return "bg-emerald-700 text-white border-emerald-800";
      if (ratio > 0.25) return "bg-emerald-400 text-white border-emerald-500";
      return "bg-emerald-100 text-emerald-800 border-emerald-200 hover:bg-emerald-200";
    } else if (activeMetric === "studyPermits") {
      if (ratio > 0.75) return "bg-amber-800 text-white border-amber-900";
      if (ratio > 0.5) return "bg-amber-600 text-white border-amber-700";
      if (ratio > 0.25) return "bg-amber-400 text-slate-900 border-amber-500";
      return "bg-amber-100 text-amber-800 border-amber-200 hover:bg-amber-200";
    } else if (activeMetric === "workPermits") {
      if (ratio > 0.75) return "bg-rose-900 text-white border-rose-950";
      if (ratio > 0.5) return "bg-rose-700 text-white border-rose-800";
      if (ratio > 0.25) return "bg-rose-400 text-white border-rose-500";
      return "bg-rose-100 text-rose-800 border-rose-200 hover:bg-rose-200";
    } else {
      if (ratio > 0.75) return "bg-sky-900 text-white border-sky-950";
      if (ratio > 0.5) return "bg-sky-700 text-white border-sky-800";
      if (ratio > 0.25) return "bg-sky-400 text-white border-sky-500";
      return "bg-sky-100 text-sky-800 border-sky-200 hover:bg-sky-200";
    }
  };

  // Dynamically compute SVG path coordinates for the custom Line/Area Chart
  const svgLinePoints = useMemo(() => {
    if (timelineData.length < 2) return { linePath: "", areaPath: "", points: [] };
    
    const width = 500;
    const height = 180;
    const padding = 25;
    
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;
    
    const maxVal = Math.max(...timelineData.map(d => d.value), 10);
    const minVal = 0;
    
    const points = timelineData.map((d, index) => {
      const x = padding + (index / (timelineData.length - 1)) * chartWidth;
      const valRatio = (d.value - minVal) / (maxVal - minVal);
      const y = height - padding - valRatio * chartHeight;
      return { x, y, label: d.label, value: d.value };
    });
    
    // Create bezier curve or smooth line path
    let linePath = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      linePath += ` L ${points[i].x} ${points[i].y}`;
    }
    
    // Create closing points for the shaded area gradient
    const areaPath = `${linePath} L ${points[points.length - 1].x} ${height - padding} L ${points[0].x} ${height - padding} Z`;
    
    return { linePath, areaPath, points };
  }, [timelineData]);

  // Handle line hover interaction
  const handleSvgMouseMove = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    if (svgLinePoints.points.length === 0) return;
    const svgRect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - svgRect.left;
    
    // Find closest point on X coordinate
    let closestPt = svgLinePoints.points[0];
    let minDist = Math.abs(svgLinePoints.points[0].x - mouseX);
    
    svgLinePoints.points.forEach(pt => {
      const dist = Math.abs(pt.x - mouseX);
      if (dist < minDist) {
        minDist = dist;
        closestPt = pt;
      }
    });

    setChartTooltip({
      x: closestPt.x,
      y: closestPt.y,
      label: closestPt.label,
      value: `${closestPt.value.toLocaleString()} ${metricConfig[activeMetric].unit}`
    });
  };

  return (
    <div className="space-y-8 animate-fade-in" id="analytics_dashboard">
      
      {/* SECTION HEADER */}
      <div className="border-b border-slate-200 pb-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl font-bold text-slate-900 flex items-center gap-2">
            <BarChart4 className="w-6 h-6 text-indigo-600 animate-pulse" />
            Interactive Regional Immigration & Border Analytics
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Perform granular multidimensional queries across Canadian borders, provincial quotas, study permits, and work allocations.
          </p>
        </div>

        {/* Action Suite */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={handleExportCSV}
            disabled={filteredRecords.length === 0}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl text-xs font-semibold cursor-pointer transition-all disabled:opacity-50"
            title="Download active filter dataset as CSV"
          >
            <Download className="w-3.5 h-3.5" />
            Export CSV
          </button>
          <button
            onClick={handleExportJSON}
            disabled={filteredRecords.length === 0}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl text-xs font-semibold cursor-pointer transition-all disabled:opacity-50"
            title="Download active filter dataset as JSON"
          >
            <Layers className="w-3.5 h-3.5" />
            Export JSON
          </button>
          <button
            onClick={handlePrintView}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl text-xs font-semibold cursor-pointer transition-all"
            title="Print-friendly analytical memo layout"
          >
            <Printer className="w-3.5 h-3.5" />
            Print Report
          </button>
        </div>
      </div>

      {/* THREE INTERACTIVE KPI BLOCK CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* KPI 1: AGGREGATE TOTAL */}
        <div className={`bg-[#424244] rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center justify-between transition-all hover:shadow-md relative overflow-hidden`} style={{ backgroundColor: "#424244" }}>
          <div className="space-y-1.5 z-10">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block">Filtered Aggregated Sum</span>
            <span className="text-2xl font-bold font-display text-slate-900 block leading-none">
              {kpiData.total.toLocaleString()}
            </span>
            <span className="text-[10px] text-slate-500 font-medium font-mono bg-slate-100 border border-slate-200/50 px-2 py-0.5 rounded inline-block mt-1">
              Metric: {metricConfig[activeMetric].shortLabel}
            </span>
          </div>
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-indigo-50 border border-indigo-100 text-indigo-600 z-10`}>
            <Activity className="w-6 h-6 animate-pulse" />
          </div>
          <div className="absolute right-0 bottom-0 -mb-4 -mr-4 w-24 h-24 bg-slate-50 rounded-full opacity-50"></div>
        </div>

        {/* KPI 2: PEAK REGION CONTRIBUTION */}
        <div className="bg-[#424244] rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center justify-between transition-all hover:shadow-md relative overflow-hidden" style={{ backgroundColor: "#424244" }}>
          <div className="space-y-1.5 z-10">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block">Peak Region Contribution</span>
            <span className="text-xl font-bold font-display text-slate-900 block truncate max-w-[200px] leading-none">
              {kpiData.peakProvince}
            </span>
            <p className="text-xs text-slate-500 font-mono mt-1">
              Sum: <strong className="text-indigo-600">{kpiData.peakValue.toLocaleString()}</strong> ({kpiData.total > 0 ? ((kpiData.peakValue / kpiData.total) * 100).toFixed(1) : 0}%)
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-emerald-50 border border-emerald-100 text-emerald-600 z-10">
            <MapPin className="w-6 h-6" />
          </div>
          <div className="absolute right-0 bottom-0 -mb-4 -mr-4 w-24 h-24 bg-slate-50 rounded-full opacity-50"></div>
        </div>

        {/* KPI 3: MULTI-YEAR COMP COMPARISON */}
        <div className="bg-[#424244] rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center justify-between transition-all hover:shadow-md relative overflow-hidden" style={{ backgroundColor: "#424244" }}>
          <div className="space-y-1.5 z-10">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block">Trajectory Trailing Rate</span>
            <span className={`text-sm font-bold font-mono block ${kpiData.yoyPercentage > 0 ? "text-emerald-600" : kpiData.yoyPercentage < 0 ? "text-rose-600" : "text-slate-500"}`}>
              {kpiData.yoyLabel}
            </span>
            <p className="text-[10px] text-slate-500 max-w-[230px] leading-relaxed mt-1">
              Comparison represents aggregate shifts across selected sequential years under current constraints.
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-amber-50 border border-amber-100 text-amber-600 z-10">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div className="absolute right-0 bottom-0 -mb-4 -mr-4 w-24 h-24 bg-slate-50 rounded-full opacity-50"></div>
        </div>

      </div>

      {/* CENTRAL QUERY FILTERING BAR */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 shadow-md space-y-5">
        <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
          <Filter className="w-5 h-5 text-indigo-400" />
          <div>
            <h3 className="font-display font-bold text-sm text-slate-100">Live Granular Filter Matrix</h3>
            <p className="text-[10px] text-slate-400">Narrow down data dimensions in real-time. Adjustments reflect on all charts, maps, and AI insights immediately.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* FILTER 1: METRIC TYPE (4 Cols) */}
          <div className="lg:col-span-4 space-y-2">
            <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block">Select Data Type Indicator</label>
            <div className="grid grid-cols-1 gap-1.5">
              {Object.entries(metricConfig).map(([key, item]) => {
                const isActive = activeMetric === key;
                return (
                  <button
                    key={key}
                    onClick={() => setActiveMetric(key as any)}
                    className={`w-full text-left px-3.5 py-2.5 rounded-xl border text-xs font-semibold transition-all flex items-center justify-between ${
                      isActive 
                        ? "bg-indigo-600 border-indigo-500 text-white shadow-md transform translate-x-1" 
                        : "bg-slate-800 border-slate-700/80 hover:bg-slate-800/60 hover:border-slate-600 text-slate-300"
                    }`}
                  >
                    <span>{item.shortLabel}</span>
                    <ChevronRight className={`w-3.5 h-3.5 opacity-60 transition-transform ${isActive ? "rotate-90 text-white" : ""}`} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* FILTER 2: REGIONAL CONSTRAINTS (5 Cols) */}
          <div className="lg:col-span-5 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block">Select Regional Constraints ({selectedProvs.length})</label>
              
              {/* Presets Button Links */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleApplyPreset("all")}
                  className="text-[9px] bg-slate-800 hover:bg-slate-700 text-indigo-300 font-bold px-2 py-0.5 rounded"
                >
                  All 13
                </button>
                <button
                  onClick={() => handleApplyPreset("west")}
                  className="text-[9px] bg-slate-800 hover:bg-slate-700 text-indigo-300 font-bold px-2 py-0.5 rounded"
                >
                  West
                </button>
                <button
                  onClick={() => handleApplyPreset("east")}
                  className="text-[9px] bg-slate-800 hover:bg-slate-700 text-indigo-300 font-bold px-2 py-0.5 rounded"
                >
                  East
                </button>
                <button
                  onClick={() => handleApplyPreset("territories")}
                  className="text-[9px] bg-slate-800 hover:bg-slate-700 text-indigo-300 font-bold px-2 py-0.5 rounded"
                >
                  Terr.
                </button>
              </div>
            </div>

            {/* Provinces check grid */}
            <div className="p-3.5 bg-slate-800/55 border border-slate-800 rounded-xl grid grid-cols-4 gap-1.5 max-h-[145px] overflow-y-auto scrollbar-thin">
              {Object.keys(provinceLookup).map((id) => {
                const isChecked = selectedProvs.includes(id);
                return (
                  <button
                    key={id}
                    onClick={() => handleToggleProvince(id)}
                    className={`px-2 py-1.5 rounded-lg border text-left text-[11px] font-bold transition-all truncate flex items-center justify-between ${
                      isChecked
                        ? "bg-white text-slate-900 border-white shadow-sm"
                        : "bg-slate-800 border-slate-700 hover:border-slate-600 text-slate-400"
                    }`}
                  >
                    <span>{id}</span>
                    <span className="text-[9px] opacity-50 font-mono">{provinceLookup[id]?.name.substring(0, 4)}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* FILTER 3: DATE RANGE (3 Cols) */}
          <div className="lg:col-span-3 space-y-4">
            {/* Year constraints */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block">Date Range (Years)</label>
              <div className="flex gap-1 bg-slate-800/80 p-1 rounded-xl border border-slate-800">
                {[2024, 2025, 2026].map((year) => {
                  const isChecked = selectedYears.includes(year);
                  return (
                    <button
                      key={year}
                      onClick={() => handleToggleYear(year)}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        isChecked 
                          ? "bg-indigo-600 text-white shadow-sm" 
                          : "text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      {year}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quarter constraints */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block">Quarters Included</label>
              <div className="grid grid-cols-4 gap-1 p-1 bg-slate-800/80 rounded-xl border border-slate-800">
                {["Q1", "Q2", "Q3", "Q4"].map((q) => {
                  const isChecked = selectedQuarters.includes(q);
                  return (
                    <button
                      key={q}
                      onClick={() => handleToggleQuarter(q)}
                      className={`py-1 rounded-lg text-[10px] font-bold transition-all ${
                        isChecked 
                          ? "bg-indigo-600 text-white shadow-sm" 
                          : "text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      {q}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

        </div>

        {/* Selected parameters explanation footer */}
        <div className="pt-3 border-t border-slate-800 text-xs text-slate-400 flex items-center gap-1.5">
          <Info className="w-4 h-4 text-indigo-400 flex-shrink-0" />
          <span>
            Active indicator: <strong className="text-indigo-300">{metricConfig[activeMetric].label}</strong>. {metricConfig[activeMetric].description}
          </span>
        </div>
      </div>

      {/* CORE VISUALIZATION GRID: MAP AND CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: INTERACTIVE GEOGRAPHIC SPATIAL GRID (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#424244] rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between min-h-[460px]" style={{ backgroundColor: "#424244" }}>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-display font-bold text-slate-900 text-sm">Spatial Canada Map</h3>
                  <p className="text-[11px] text-slate-500">Chloropleth distribution based on selected constraints. Click to toggle.</p>
                </div>
                <span className="text-[10px] uppercase font-mono font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded border border-slate-200/50">
                  Regional Relative Scale
                </span>
              </div>

              {/* Geographic Tile Map Layout of Canada */}
              <div className="py-6 flex flex-col items-center justify-center relative">
                
                {/* 4 Row x 7 Column spatial grid representing Canada geographically */}
                <div className="grid grid-rows-4 grid-cols-7 gap-2.5 w-full max-w-[340px]">
                  
                  {/* ROW 1: Territories (YT, NT, NU) */}
                  <button 
                    onClick={() => handleToggleProvince("YT")} 
                    onMouseEnter={() => setHoveredRegion("YT")}
                    onMouseLeave={() => setHoveredRegion(null)}
                    className={`row-start-1 col-start-1 h-14 rounded-xl border flex flex-col items-center justify-center p-2 transition-all font-display font-bold cursor-pointer hover:scale-[1.03] active:scale-[0.98] ${getProvinceColorClass("YT")}`}
                  >
                    <span className="text-xs">YT</span>
                    <span className="text-[8px] font-mono font-medium truncate max-w-full leading-none mt-1">{(kpiData.provTotals["YT"] || 0).toLocaleString()}</span>
                  </button>

                  <button 
                    onClick={() => handleToggleProvince("NT")} 
                    onMouseEnter={() => setHoveredRegion("NT")}
                    onMouseLeave={() => setHoveredRegion(null)}
                    className={`row-start-1 col-start-2 h-14 rounded-xl border flex flex-col items-center justify-center p-2 transition-all font-display font-bold cursor-pointer hover:scale-[1.03] active:scale-[0.98] ${getProvinceColorClass("NT")}`}
                  >
                    <span className="text-xs">NT</span>
                    <span className="text-[8px] font-mono font-medium truncate max-w-full leading-none mt-1">{(kpiData.provTotals["NT"] || 0).toLocaleString()}</span>
                  </button>

                  <button 
                    onClick={() => handleToggleProvince("NU")} 
                    onMouseEnter={() => setHoveredRegion("NU")}
                    onMouseLeave={() => setHoveredRegion(null)}
                    className={`row-start-1 col-start-3 h-14 rounded-xl border flex flex-col items-center justify-center p-2 transition-all font-display font-bold cursor-pointer hover:scale-[1.03] active:scale-[0.98] ${getProvinceColorClass("NU")}`}
                  >
                    <span className="text-xs">NU</span>
                    <span className="text-[8px] font-mono font-medium truncate max-w-full leading-none mt-1">{(kpiData.provTotals["NU"] || 0).toLocaleString()}</span>
                  </button>

                  {/* Empty spacers in Row 1 */}
                  <div className="row-start-1 col-start-4"></div>
                  <div className="row-start-1 col-start-5"></div>
                  <div className="row-start-1 col-start-6"></div>

                  <button 
                    onClick={() => handleToggleProvince("NL")} 
                    onMouseEnter={() => setHoveredRegion("NL")}
                    onMouseLeave={() => setHoveredRegion(null)}
                    className={`row-start-2 col-start-7 h-14 rounded-xl border flex flex-col items-center justify-center p-2 transition-all font-display font-bold cursor-pointer hover:scale-[1.03] active:scale-[0.98] ${getProvinceColorClass("NL")}`}
                  >
                    <span className="text-xs">NL</span>
                    <span className="text-[8px] font-mono font-medium truncate max-w-full leading-none mt-1">{(kpiData.provTotals["NL"] || 0).toLocaleString()}</span>
                  </button>

                  {/* ROW 2: Western Canada (BC, AB, SK, MB) and PE */}
                  <button 
                    onClick={() => handleToggleProvince("BC")} 
                    onMouseEnter={() => setHoveredRegion("BC")}
                    onMouseLeave={() => setHoveredRegion(null)}
                    className={`row-start-2 col-start-1 h-14 rounded-xl border flex flex-col items-center justify-center p-2 transition-all font-display font-bold cursor-pointer hover:scale-[1.03] active:scale-[0.98] ${getProvinceColorClass("BC")}`}
                  >
                    <span className="text-xs">BC</span>
                    <span className="text-[8px] font-mono font-medium truncate max-w-full leading-none mt-1">{(kpiData.provTotals["BC"] || 0).toLocaleString()}</span>
                  </button>

                  <button 
                    onClick={() => handleToggleProvince("AB")} 
                    onMouseEnter={() => setHoveredRegion("AB")}
                    onMouseLeave={() => setHoveredRegion(null)}
                    className={`row-start-2 col-start-2 h-14 rounded-xl border flex flex-col items-center justify-center p-2 transition-all font-display font-bold cursor-pointer hover:scale-[1.03] active:scale-[0.98] ${getProvinceColorClass("AB")}`}
                  >
                    <span className="text-xs">AB</span>
                    <span className="text-[8px] font-mono font-medium truncate max-w-full leading-none mt-1">{(kpiData.provTotals["AB"] || 0).toLocaleString()}</span>
                  </button>

                  <button 
                    onClick={() => handleToggleProvince("SK")} 
                    onMouseEnter={() => setHoveredRegion("SK")}
                    onMouseLeave={() => setHoveredRegion(null)}
                    className={`row-start-2 col-start-3 h-14 rounded-xl border flex flex-col items-center justify-center p-2 transition-all font-display font-bold cursor-pointer hover:scale-[1.03] active:scale-[0.98] ${getProvinceColorClass("SK")}`}
                  >
                    <span className="text-xs">SK</span>
                    <span className="text-[8px] font-mono font-medium truncate max-w-full leading-none mt-1">{(kpiData.provTotals["SK"] || 0).toLocaleString()}</span>
                  </button>

                  <button 
                    onClick={() => handleToggleProvince("MB")} 
                    onMouseEnter={() => setHoveredRegion("MB")}
                    onMouseLeave={() => setHoveredRegion(null)}
                    className={`row-start-2 col-start-4 h-14 rounded-xl border flex flex-col items-center justify-center p-2 transition-all font-display font-bold cursor-pointer hover:scale-[1.03] active:scale-[0.98] ${getProvinceColorClass("MB")}`}
                  >
                    <span className="text-xs">MB</span>
                    <span className="text-[8px] font-mono font-medium truncate max-w-full leading-none mt-1">{(kpiData.provTotals["MB"] || 0).toLocaleString()}</span>
                  </button>

                  <div className="row-start-2 col-start-5"></div>

                  <button 
                    onClick={() => handleToggleProvince("PE")} 
                    onMouseEnter={() => setHoveredRegion("PE")}
                    onMouseLeave={() => setHoveredRegion(null)}
                    className={`row-start-2 col-start-6 h-14 rounded-xl border flex flex-col items-center justify-center p-2 transition-all font-display font-bold cursor-pointer hover:scale-[1.03] active:scale-[0.98] ${getProvinceColorClass("PE")}`}
                  >
                    <span className="text-xs">PE</span>
                    <span className="text-[8px] font-mono font-medium truncate max-w-full leading-none mt-1">{(kpiData.provTotals["PE"] || 0).toLocaleString()}</span>
                  </button>

                  {/* ROW 3: Central Canada (ON, QC) and NB */}
                  <div className="row-start-3 col-start-1"></div>
                  <div className="row-start-3 col-start-2"></div>
                  <div className="row-start-3 col-start-3"></div>

                  <button 
                    onClick={() => handleToggleProvince("ON")} 
                    onMouseEnter={() => setHoveredRegion("ON")}
                    onMouseLeave={() => setHoveredRegion(null)}
                    className={`row-start-3 col-start-4 h-14 rounded-xl border flex flex-col items-center justify-center p-2 transition-all font-display font-bold cursor-pointer hover:scale-[1.03] active:scale-[0.98] ${getProvinceColorClass("ON")}`}
                  >
                    <span className="text-xs">ON</span>
                    <span className="text-[8px] font-mono font-medium truncate max-w-full leading-none mt-1">{(kpiData.provTotals["ON"] || 0).toLocaleString()}</span>
                  </button>

                  <button 
                    onClick={() => handleToggleProvince("QC")} 
                    onMouseEnter={() => setHoveredRegion("QC")}
                    onMouseLeave={() => setHoveredRegion(null)}
                    className={`row-start-3 col-start-5 h-14 rounded-xl border flex flex-col items-center justify-center p-2 transition-all font-display font-bold cursor-pointer hover:scale-[1.03] active:scale-[0.98] ${getProvinceColorClass("QC")}`}
                  >
                    <span className="text-xs">QC</span>
                    <span className="text-[8px] font-mono font-medium truncate max-w-full leading-none mt-1">{(kpiData.provTotals["QC"] || 0).toLocaleString()}</span>
                  </button>

                  <button 
                    onClick={() => handleToggleProvince("NB")} 
                    onMouseEnter={() => setHoveredRegion("NB")}
                    onMouseLeave={() => setHoveredRegion(null)}
                    className={`row-start-3 col-start-6 h-14 rounded-xl border flex flex-col items-center justify-center p-2 transition-all font-display font-bold cursor-pointer hover:scale-[1.03] active:scale-[0.98] ${getProvinceColorClass("NB")}`}
                  >
                    <span className="text-xs">NB</span>
                    <span className="text-[8px] font-mono font-medium truncate max-w-full leading-none mt-1">{(kpiData.provTotals["NB"] || 0).toLocaleString()}</span>
                  </button>

                  {/* ROW 4: NS */}
                  <div className="row-start-4 col-start-1"></div>
                  <div className="row-start-4 col-start-2"></div>
                  <div className="row-start-4 col-start-3"></div>
                  <div className="row-start-4 col-start-4"></div>
                  <div className="row-start-4 col-start-5"></div>

                  <button 
                    onClick={() => handleToggleProvince("NS")} 
                    onMouseEnter={() => setHoveredRegion("NS")}
                    onMouseLeave={() => setHoveredRegion(null)}
                    className={`row-start-4 col-start-6 h-14 rounded-xl border flex flex-col items-center justify-center p-2 transition-all font-display font-bold cursor-pointer hover:scale-[1.03] active:scale-[0.98] ${getProvinceColorClass("NS")}`}
                  >
                    <span className="text-xs">NS</span>
                    <span className="text-[8px] font-mono font-medium truncate max-w-full leading-none mt-1">{(kpiData.provTotals["NS"] || 0).toLocaleString()}</span>
                  </button>

                </div>

                {/* Overlaid Region Hover Card (Dynamic Tooltip) */}
                <div className="w-full mt-6 h-14 flex items-center justify-center">
                  {hoveredRegion ? (
                    <div className="bg-slate-900 text-white rounded-xl px-4 py-2 text-xs border border-slate-700 shadow-md text-center max-w-xs animate-fade-in">
                      <p className="font-bold font-display">{provinceLookup[hoveredRegion]?.name}</p>
                      <p className="text-[10px] font-mono text-indigo-300 mt-0.5">
                        Selected Metric: <strong className="text-white">{(kpiData.provTotals[hoveredRegion] || 0).toLocaleString()} {metricConfig[activeMetric].unit}</strong>
                      </p>
                    </div>
                  ) : (
                    <p className="text-[10px] text-slate-400 font-mono flex items-center gap-1.5 bg-slate-50 border border-slate-100 rounded-lg px-3 py-1.5">
                      <HelpCircle className="w-3.5 h-3.5 text-indigo-500" />
                      Hover over any node for detailed totals and region constraints.
                    </p>
                  )}
                </div>

              </div>
            </div>

            {/* Regional List Table */}
            <div className="border-t border-slate-100 pt-4 mt-2">
              <p className="text-[10px] uppercase font-mono font-bold text-slate-400 mb-2">Regional Ranking Matrix</p>
              <div className="max-h-[140px] overflow-y-auto scrollbar-thin space-y-1.5 pr-1">
                {provincialSummaryMatrix.map((item, index) => (
                  <div key={item.id} className="flex items-center justify-between text-xs p-1.5 hover:bg-slate-50 rounded-lg transition-colors border border-transparent hover:border-slate-100">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold text-slate-400 w-4 text-center">#{index + 1}</span>
                      <strong className="text-slate-800 font-semibold">{item.name}</strong>
                      <span className="text-[9px] font-mono text-slate-400 bg-slate-100 px-1 rounded">{item.id}</span>
                    </div>
                    <span className="font-mono font-bold text-slate-700">
                      {item.total.toLocaleString()} {metricConfig[activeMetric].unit}
                    </span>
                  </div>
                ))}
                {provincialSummaryMatrix.length === 0 && (
                  <p className="text-center py-4 text-xs text-slate-400">Select provinces above to populate comparison metrics.</p>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* RIGHT COLUMN: CHARTS GRID (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-[#424244] rounded-2xl p-6 border border-slate-200 shadow-sm min-h-[460px] flex flex-col justify-between" style={{ backgroundColor: "#424244" }}>
            
            {/* Chart Header */}
            <div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-display font-bold text-slate-900 text-sm">Aggregated Timeline Trend</h3>
                  <p className="text-[11px] text-slate-500">Aggregated performance across selected regions and quarters.</p>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-600"></span>
                  <span className="text-[10px] font-mono text-slate-500 font-bold">Sum of Active Filter</span>
                </div>
              </div>

              {/* DYNAMIC SVG CHART COMPONENT */}
              <div className="relative mt-4">
                {timelineData.length < 2 ? (
                  <div className="h-[180px] bg-slate-50 border border-slate-100 border-dashed rounded-xl flex flex-col items-center justify-center text-center p-4 text-slate-400 space-y-1.5">
                    <Activity className="w-8 h-8 text-slate-300 stroke-1" />
                    <p className="text-xs font-semibold">Insufficient Timeline Points</p>
                    <p className="text-[10px] max-w-xs">Select at least two quarters and one year to generate a sequential timeline line chart.</p>
                  </div>
                ) : (
                  <div className="bg-slate-50/50 border border-slate-100 rounded-xl p-3 relative h-[210px]">
                    
                    {/* SVG Element */}
                    <svg 
                      viewBox="0 0 500 180" 
                      className="w-full h-full overflow-visible"
                      onMouseMove={handleSvgMouseMove}
                      onMouseLeave={() => setChartTooltip(null)}
                    >
                      {/* Definitions for Gradient shading */}
                      <defs>
                        <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.25" />
                          <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>

                      {/* SVG Gridlines */}
                      <line x1="25" y1="25" x2="475" y2="25" stroke="#e2e8f0" strokeDasharray="3,3" strokeWidth="1" />
                      <line x1="25" y1="77.5" x2="475" y2="77.5" stroke="#e2e8f0" strokeDasharray="3,3" strokeWidth="1" />
                      <line x1="25" y1="130" x2="475" y2="130" stroke="#e2e8f0" strokeDasharray="3,3" strokeWidth="1" />
                      <line x1="25" y1="155" x2="475" y2="155" stroke="#cbd5e1" strokeWidth="1.5" />

                      {/* X and Y axes labels */}
                      <text x="25" y="167" fill="#94a3b8" fontSize="8" fontFamily="monospace" textAnchor="middle">Start</text>
                      <text x="475" y="167" fill="#94a3b8" fontSize="8" fontFamily="monospace" textAnchor="middle">End</text>

                      {/* Line shaded Area fill */}
                      <path d={svgLinePoints.areaPath} fill="url(#chartGradient)" />

                      {/* Line Path */}
                      <path 
                        d={svgLinePoints.linePath} 
                        fill="none" 
                        stroke="#4f46e5" 
                        strokeWidth="3.5" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                      />

                      {/* Interactive Hover Vertical Tracker Line */}
                      {chartTooltip && (
                        <line 
                          x1={chartTooltip.x} 
                          y1="25" 
                          x2={chartTooltip.x} 
                          y2="155" 
                          stroke="#4f46e5" 
                          strokeWidth="1" 
                          strokeDasharray="4,4" 
                        />
                      )}

                      {/* Circle points on line */}
                      {svgLinePoints.points.map((pt, index) => (
                        <circle 
                          key={index} 
                          cx={pt.x} 
                          cy={pt.y} 
                          r={chartTooltip?.x === pt.x ? "6" : "3.5"} 
                          fill={chartTooltip?.x === pt.x ? "#4f46e5" : "white"} 
                          stroke="#4f46e5" 
                          strokeWidth="2.5" 
                        />
                      ))}
                    </svg>

                    {/* Chart floating overlay tooltip */}
                    {chartTooltip && (
                      <div 
                        className="absolute bg-slate-900 border border-slate-700 text-white rounded-lg p-2 text-[10px] pointer-events-none shadow-md space-y-0.5 animate-fade-in"
                        style={{ 
                          left: `${Math.min(Math.max(chartTooltip.x - 45, 10), 400)}px`, 
                          top: `${Math.min(chartTooltip.y - 45, 130)}px`
                        }}
                      >
                        <p className="font-semibold text-slate-300 font-mono leading-none">{chartTooltip.label}</p>
                        <p className="font-bold text-white font-mono leading-none">{chartTooltip.value}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* BAR CHART COMPONENT: Comparing Selected Provinces */}
            <div className="border-t border-slate-100 pt-5 mt-5">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-display font-bold text-slate-900 text-xs flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-slate-500" />
                  Regional Allocation Contrast (Proportional Bars)
                </h4>
                <span className="text-[10px] font-mono text-slate-400">Comparing selected {selectedProvs.length} regions</span>
              </div>

              {/* Custom proportional bar stack */}
              <div className="space-y-3.5 max-h-[160px] overflow-y-auto scrollbar-thin pr-1">
                {provincialSummaryMatrix.map((item) => {
                  const percentOfPeak = kpiData.peakValue > 0 ? (item.total / kpiData.peakValue) * 100 : 0;
                  const percentOfTotal = kpiData.total > 0 ? (item.total / kpiData.total) * 100 : 0;
                  return (
                    <div key={item.id} className="space-y-1">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-semibold text-slate-700">{item.name} <span className="font-mono text-[9px] text-slate-400 bg-slate-100 px-1 rounded">{item.id}</span></span>
                        <span className="font-mono text-slate-500 font-semibold">
                          <strong>{item.total.toLocaleString()}</strong> ({percentOfTotal.toFixed(1)}%)
                        </span>
                      </div>
                      
                      {/* Bar wrapper */}
                      <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200/40">
                        <div 
                          className="h-full bg-indigo-600 rounded-full transition-all duration-500" 
                          style={{ width: `${Math.max(percentOfPeak, 2)}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* AI INSIGHTS GENERATION ENGINE CONTAINER */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-6 border border-slate-800 shadow-xl space-y-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-800 pb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-500/10 border border-indigo-500/20 rounded-xl flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse fill-yellow-400" />
            </div>
            <div>
              <h3 className="font-display font-bold text-base text-slate-100">AI Demographics Trend Analyst</h3>
              <p className="text-xs text-indigo-200">Generate publication-grade market insights and policy interpretation for chosen metrics.</p>
            </div>
          </div>

          <button
            onClick={handleGenerateAIInsights}
            disabled={generatingInsights || filteredRecords.length === 0}
            className="px-4 py-2 bg-white text-slate-900 hover:bg-slate-50 disabled:bg-slate-400 text-xs font-bold rounded-xl shadow transition-all cursor-pointer inline-flex items-center gap-1.5 self-start md:self-auto"
          >
            {generatingInsights ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-slate-800" />
                Querying Canadian Registry...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                Synthesize AI Trend Report
              </>
            )}
          </button>
        </div>

        {/* AI Insight display */}
        {generatingInsights && (
          <div className="flex flex-col items-center justify-center py-12 text-center space-y-3">
            <div className="w-10 h-10 border-4 border-indigo-400/20 border-t-indigo-400 rounded-full animate-spin"></div>
            <p className="text-xs text-indigo-200 font-semibold">Gemini is processing active parameters: {metricConfig[activeMetric].shortLabel} across {selectedProvs.join(", ")}...</p>
            <p className="text-[10px] text-slate-400 max-w-sm leading-relaxed">Applying historical matrix algorithms and formulating sovereign Canada regulatory analysis.</p>
          </div>
        )}

        {!generatingInsights && !insightsResult && (
          <div className="flex flex-col items-center justify-center py-8 text-center text-slate-400 space-y-2">
            <Info className="w-10 h-10 stroke-1 text-slate-500" />
            <p className="text-xs text-slate-200 font-semibold">Analytical Report Pending Trigger</p>
            <p className="text-[10px] max-w-xs leading-relaxed">Click 'Synthesize AI Trend Report' on the right to prompt Gemini 3.5 Flash to write a comprehensive policy briefing on this dynamic dataset.</p>
          </div>
        )}

        {!generatingInsights && insightsResult && (
          <div className="space-y-4 animate-fade-in">
            <div className="flex items-center justify-between bg-slate-800 px-3 py-2 border border-slate-700/80 rounded-xl text-xs">
              <span className="font-semibold text-indigo-200 flex items-center gap-1.5">
                <FileSpreadsheet className="w-4 h-4 text-indigo-400" />
                Formulated Demographics Memo
              </span>

              <button
                onClick={() => handleCopyInsights(insightsResult)}
                className="inline-flex items-center gap-1 bg-slate-900 border border-slate-700 hover:bg-slate-800 px-2.5 py-1.5 rounded-lg font-bold text-xs text-slate-300 transition-all cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    Copied Memo
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    Copy Text
                  </>
                )}
              </button>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 max-h-[350px] overflow-y-auto text-xs text-slate-300 leading-relaxed font-mono whitespace-pre-wrap shadow-inner scrollbar-thin">
              {insightsResult}
            </div>

            <div className="p-3 bg-indigo-950/40 border border-indigo-900/40 rounded-xl text-[11px] text-indigo-200 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-indigo-400 flex-shrink-0" />
              <p>
                Draft report synthesized based on selected parameters. Real-world applications of these data curves must align with municipal and federal FIPPA/PIPEDA data privacy standards.
              </p>
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
