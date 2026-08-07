import React, { useState } from "react";
import { BookOpen, Search, Filter, Calendar, User, Clock, ArrowRight, Share2, ExternalLink, Sparkles, AlertCircle, Heart } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: "Express Entry" | "Provincial Nominee" | "Settlement Advice" | "Policy Updates";
  date: string;
  author: string;
  readTime: string;
  source: string;
  sourceUrl: string;
}

const INITIAL_BLOGS: BlogPost[] = [
  {
    id: "ee-draw-trends-2026",
    title: "Express Entry Draws Analysis: The Rise of Category-Based Selection",
    summary: "How IRCC is prioritizing French speakers, Healthcare professionals, and STEM graduates over general draws under the latest ministerial instructions.",
    category: "Express Entry",
    date: "July 12, 2026",
    author: "Elena Vasquez (Senior Consultant)",
    readTime: "5 min read",
    source: "CanadaVisa.com Updates",
    sourceUrl: "https://www.canadavisa.com/",
    content: `### 🍁 The Evolution of Canada's Express Entry Pool

Throughout the first half of 2026, Immigration, Refugees and Citizenship Canada (IRCC) has pivoted significantly from traditional high-score general draws to highly targeted, category-based selections. According to compiled reports from **CanadaVisa.com**, general draw cut-offs have stubbornly hovered around **520 to 535 Comprehensive Ranking System (CRS) points**, leaving many highly skilled applicants in the pool looking for alternative strategies.

#### 🎯 Key Targeted Sectors Under Current Guidelines:
1. **French Language Proficiency:** This remains the most consistent pathway. Candidates with proven French proficiency (CLB level 7 or higher in all TEF/TCF modules) are being invited in large-volume draws with cut-offs dropping to as low as **385 points**.
2. **Healthcare & Nursing:** Addressing the national healthcare labor squeeze, IRCC regularly holds draws for nurses, clinicians, and physical therapists.
3. **STEM Occupations:** Software developers, data engineers, and cybersecurity specialists remain in strong demand, bypassing general point thresholds.
4. **Skilled Trades:** Carpenters, industrial plumbers, and heavy equipment mechanics are prioritized to bolster national housing infrastructure programs.

### 💡 Tactical Recommendations for Candidates:
* **The French Boost:** Learning French has gone from a "nice-to-have" to an absolute game-changer. Reaching CLB 7 can add up to **50 additional CRS points** and qualifies you for specialized draws.
* **Maximize IELTS/CELPIP:** A marginal increase in language test bands (achieving CLB 9 instead of CLB 8) is the single fastest way to unlock an extra 30-50 skill transferability points.
* **Examine Provincial Alignment:** If your CRS score is below 480 and you do not fit a category-based target, your primary target should be securing a Provincial Nominee Program (PNP) nomination, which provides an automatic **+600 points** addition.`
  },
  {
    id: "alberta-rural-renewal-depth",
    title: "Deep Dive: Securing Nomination via the Alberta Rural Renewal Stream",
    summary: "An in-depth manual on navigating community endorsement, low language thresholds, and finding welcoming communities in rural Alberta.",
    category: "Provincial Nominee",
    date: "July 05, 2026",
    author: "Jean-Pierre Tremblay",
    readTime: "6 min read",
    source: "AAIP Policy Bulletins",
    sourceUrl: "https://www.alberta.ca/aaip-updates.aspx",
    content: `### 🍁 Bypassing High CRS Scores via Alberta's Rural Stream

For many applicants who cannot reach a 500+ CRS score, the **Alberta Advantage Immigration Program's (AAIP) Rural Renewal Stream** represents one of the most accessible and supportive pathways to Canadian Permanent Residency.

Unlike federal systems that rank candidates strictly on age, education, and language scores, the Rural Renewal Stream focuses on **community connection and active employment**. 

#### 📋 How the Process Works (Step-by-Step):
1. **Secure Community Endorsement:** You must first find a participating rural community (like Claresholm, Taber, or Brooks) that has endorsed your profile. This involves submitting your resume to their local economic development committee.
2. **Obtain an Eligible Job Offer:** A participating local employer must issue a full-time, permanent job offer in an eligible NOC TEER category (ranging from TEER 0 down to TEER 5).
3. **AAIP Provincial Nomination:** With community endorsement and the job offer, you apply directly to Alberta. Upon approval, you receive a nomination and a 204(c) work permit support letter.
4. **Relocate and Lands:** You can arrive in Canada on an expedited work permit while your federal permanent residency is finalized.

#### 🏡 The True Advantage: Ease of Settlement
Rural communities in Alberta are highly welcoming. Local committees assign personal integration mentors, help identify affordable housing, assist in enrolling children in schools, and host community integration socials. It is a highly humane, direct-contact system designed to ensure long-term regional retention.`
  },
  {
    id: "language-test-optimization",
    title: "The CLB 9 Benchmark: How to Structure Your Exam Preparation",
    summary: "Practical advice on breaking through the CLB 9 barrier on IELTS or CELPIP to trigger the lucrative Express Entry transferability bonus.",
    category: "Settlement Advice",
    date: "June 28, 2026",
    author: "Amina Al-Mansoor",
    readTime: "4 min read",
    source: "CanadaVisa English Resources",
    sourceUrl: "https://www.canadavisa.com/",
    content: `### 🍁 Mastering the Canadian Language Benchmark (CLB)

In the Express Entry points matrix, there is a massive "point cliff" between **CLB 8** and **CLB 9**. Reaching CLB 9 in all four modules (Listening, Reading, Writing, and Speaking) triggers a massive **Skill Transferability bonus** that can instantly elevate your score by **30 to 50 points**.

#### 📈 The Score Conversions You Need to Memorize:
* **IELTS General Training:** Listening **8.0**, Reading **7.0**, Writing **7.0**, Speaking **7.0**.
* **CELPIP General:** All four modules must be **9** or higher.

#### 🎯 Expert Preparation Strategies:
1. **Focus on IELTS Listening (The 8.0 Hurdle):** The Listening section is where most candidates fall short of CLB 9. To achieve an 8.0, you can miss no more than 5 out of 40 questions. Daily practice of spelling, listening to Canadian/British accents, and understanding conversational speed is vital.
2. **CELPIP Writing Structure:** CELPIP writing is evaluated on coherence, lexical choice, and word count bounds. Always use a clear 4-paragraph structure (Introduction, Point A, Point B, Conclusion) and employ transition signals (Furthermore, Consequently, On the other hand).
3. **Speaking Cohesion:** For both exams, speaking scorers evaluate flow and confidence over complex vocabulary. Avoid long pauses; instead, use natural filler phrases like *"That is an interesting question, let me consider..."* to buy thinking time.`
  },
  {
    id: "pnp-caps-policy-shift",
    title: "Understanding Provincial Nominations Allocation Caps for 2026/2027",
    summary: "Breaking down the Federal-Provincial agreement on immigrant caps and why Atlantic streams are gaining strategic preference.",
    category: "Policy Updates",
    date: "June 15, 2026",
    author: "Richard Holloway",
    readTime: "7 min read",
    source: "Canada Immigration Policy Review",
    sourceUrl: "https://www.canada.ca/en/immigration-refugees-citizenship.html",
    content: `### 🍁 The Federal-Provincial Rebalancing Act

In response to housing constraints and community infrastructure pressures, Canada's federal government has renegotiated immigration target distributions with individual provinces. The outcome is a strict re-allocation of **Provincial Nominee Program (PNP) caps**.

While major urban provinces like Ontario (OINP) and British Columbia (BCPNP) face rigid limits on study permits and temporary work streams, secondary jurisdictions are receiving priority.

#### 🌊 Strategic Focus on the Atlantic Provinces:
* **The AIP (Atlantic Immigration Program):** Enjoys an independent, high-quota federal allocation designed to fill key demographic gaps in Nova Scotia, New Brunswick, Prince Edward Island, and Newfoundland.
* **Low Cut-offs & Rapid Processing:** Due to lower pool density, Atlantic programs feature significantly lower points thresholds and allow employers to fast-track candidates without undergoing full, lengthy Labor Market Impact Assessments (LMIA).

#### 📊 What this means for your Immigration Plan:
If you are planning your settlement, targeting secondary cities or the Atlantic coast offers a far more predictable, less competitive journey. Housing costs are roughly 40% lower than in the GTA or Greater Vancouver, and local retention support is robustly funded by regional civic tech initiatives.`
  }
];

interface BlogCenterProps {
  onOpenInAppViewer: (url: string, title: string) => void;
}

export default function BlogCenter({ onOpenInAppViewer }: BlogCenterProps) {
  const [blogs, setBlogs] = useState<BlogPost[]>(INITIAL_BLOGS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeBlog, setActiveBlog] = useState<BlogPost | null>(null);
  const [aiSummary, setAiSummary] = useState<string | null>(null);
  const [loadingAiSummary, setLoadingAiSummary] = useState(false);
  const [likes, setLikes] = useState<Record<string, number>>({
    "ee-draw-trends-2026": 42,
    "alberta-rural-renewal-depth": 58,
    "language-test-optimization": 31,
    "pnp-caps-policy-shift": 19
  });

  const categories = ["All", "Express Entry", "Provincial Nominee", "Settlement Advice", "Policy Updates"];

  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          blog.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          blog.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || blog.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikes(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
  };

  const handleFetchAiSummary = async (blog: BlogPost) => {
    setLoadingAiSummary(true);
    setAiSummary(null);
    try {
      const res = await fetch("/api/gemini/summarize-news", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: blog.title,
          details: `Category: ${blog.category}. Written by ${blog.author} for ${blog.source}`,
          url: blog.sourceUrl
        })
      });
      const data = await res.json();
      if (res.ok && data.summary) {
        setAiSummary(data.summary);
      } else {
        throw new Error("Empty response");
      }
    } catch (err) {
      console.error(err);
      setAiSummary(`### 🍁 AI Co-Pilot Summary Fallback
- **Focus Sector:** ${blog.category}
- **Author Perspective:** Authored by ${blog.author}, highlighting recent regulatory alignments.
- **Key Takeaway:** Prospective candidates must optimize language scores (CLB 9+) and actively explore regional, community-driven streams (like Alberta Rural Renewal or Manitoba Morden) to bypass highly competitive Express Entry draws.`);
    } finally {
      setLoadingAiSummary(false);
    }
  };

  return (
    <div id="immigration-blog-center" className="space-y-6">
      
      {/* HEADER CARD */}
      <div className="bg-[#bbbbbb] rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6" style={{ backgroundColor: "#bbbbbb" }}>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg">
              <BookOpen className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider font-mono">CanadaVisa Insights</span>
          </div>
          <h2 className="font-display font-bold text-2xl text-slate-900 tracking-tight">Policy Insights & Settlement Blog</h2>
          <p className="text-xs text-slate-600 max-w-2xl leading-relaxed">
            Stay up-to-date with official Canadian immigration policy adjustments, draws analysis, language test benchmarks, and expert settlement guidelines.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN: LIST AND FILTERING */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* SEARCH & FILTERS CONTROLS */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search policy articles, guides, resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 text-xs rounded-xl pl-9 pr-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-800"
              />
            </div>

            {/* Category horizontal scroll */}
            <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setActiveBlog(null);
                    setAiSummary(null);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-[11px] font-bold shrink-0 transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? "bg-indigo-600 text-white shadow-xs"
                      : "bg-slate-100 hover:bg-slate-200 text-slate-600"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* BLOG LIST */}
          <div className="space-y-3.5">
            {filteredBlogs.length === 0 ? (
              <div className="bg-white p-8 text-center rounded-xl border border-slate-200">
                <AlertCircle className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <p className="text-xs text-slate-500 font-bold">No policy blogs match your criteria.</p>
                <button 
                  onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}
                  className="mt-2 text-xs text-indigo-600 font-bold hover:underline"
                >
                  Clear search and filters
                </button>
              </div>
            ) : (
              filteredBlogs.map((blog) => {
                const isActive = activeBlog?.id === blog.id;
                return (
                  <div
                    key={blog.id}
                    onClick={() => {
                      setActiveBlog(blog);
                      setAiSummary(null);
                    }}
                    className={`bg-white rounded-xl border p-5 transition-all cursor-pointer block hover:border-indigo-400/60 shadow-xs relative ${
                      isActive ? "border-indigo-600 ring-1 ring-indigo-600/30" : "border-slate-200"
                    }`}
                  >
                    <div className="flex justify-between items-start gap-4">
                      <span className="px-2 py-0.5 bg-indigo-50 text-[9px] font-mono font-bold text-indigo-700 rounded-md border border-indigo-100 uppercase">
                        {blog.category}
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium font-mono">{blog.date}</span>
                    </div>

                    <h3 className="font-display font-bold text-sm text-slate-900 mt-2.5 group-hover:text-indigo-600">
                      {blog.title}
                    </h3>
                    
                    <p className="text-xs text-slate-500 mt-1.5 line-clamp-2 leading-relaxed">
                      {blog.summary}
                    </p>

                    <div className="flex items-center justify-between mt-4 pt-3.5 border-t border-slate-100 text-[10px] text-slate-500 font-medium">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <User className="w-3.5 h-3.5 text-slate-400" />
                          {blog.author}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          {blog.readTime}
                        </span>
                      </div>

                      <div className="flex items-center gap-2.5">
                        <button
                          onClick={(e) => handleLike(blog.id, e)}
                          className="flex items-center gap-1 px-2 py-1 hover:bg-rose-50 text-slate-400 hover:text-rose-600 rounded-lg transition-all"
                        >
                          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500/10" />
                          <span>{likes[blog.id] || 0}</span>
                        </button>
                        <span className="text-indigo-600 font-bold flex items-center gap-0.5">
                          Read Now
                          <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: DETAIL VIEW WITH AI SUMMARIZER */}
        <div className="lg:col-span-5">
          {activeBlog ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5 sticky top-20 max-h-[calc(100vh-10rem)] overflow-y-auto">
              
              {/* HEADER INFO */}
              <div className="space-y-2 border-b border-slate-100 pb-4">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 bg-indigo-50 border border-indigo-100 text-[9px] font-mono font-bold text-indigo-700 rounded-md">
                    {activeBlog.category}
                  </span>
                  <button 
                    onClick={() => setActiveBlog(null)}
                    className="text-[10px] font-bold text-slate-400 hover:text-slate-600"
                  >
                    Close Reading
                  </button>
                </div>
                <h1 className="font-display font-bold text-base text-slate-900 leading-tight">
                  {activeBlog.title}
                </h1>
                <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                  <span>Published: {activeBlog.date}</span>
                  <span>{activeBlog.readTime}</span>
                </div>
              </div>

              {/* ACTION CO-PILOT BUTTON */}
              <div className="bg-indigo-50/50 border border-indigo-100/70 p-3 rounded-xl flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-indigo-600 animate-pulse" />
                  <div className="text-left">
                    <h4 className="text-[11px] font-bold text-slate-900">Need a quick summary briefing?</h4>
                    <p className="text-[9px] text-slate-500">Ask our AI co-pilot to extract action steps.</p>
                  </div>
                </div>
                <button
                  onClick={() => handleFetchAiSummary(activeBlog)}
                  disabled={loadingAiSummary}
                  className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-[10px] font-bold transition-all shrink-0 cursor-pointer disabled:opacity-50"
                >
                  {loadingAiSummary ? "Analyzing..." : "Generate AI Brief"}
                </button>
              </div>

              {/* AI REPORT FIELD */}
              {aiSummary && (
                <div className="p-4 bg-slate-900 text-slate-200 rounded-xl border border-slate-800 text-[11px] leading-relaxed space-y-2 animate-fade-in">
                  <div className="flex items-center gap-1.5 text-yellow-400 font-bold border-b border-slate-800 pb-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>AI Strategic Intelligence Briefing</span>
                  </div>
                  <div className="markdown-body text-slate-300 font-sans leading-normal">
                    {aiSummary.split('\n').map((line, idx) => (
                      <p key={idx} className="mb-1 text-slate-300">{line}</p>
                    ))}
                  </div>
                </div>
              )}

              {/* MAIN CONTENT FIELD */}
              <div className="text-xs text-slate-700 leading-relaxed space-y-4 font-sans pr-1">
                {activeBlog.content.split('\n\n').map((paragraph, index) => {
                  if (paragraph.startsWith('###')) {
                    return (
                      <h3 key={index} className="font-display font-bold text-sm text-slate-900 pt-2 border-l-2 border-indigo-600 pl-2">
                        {paragraph.replace('###', '').trim()}
                      </h3>
                    );
                  }
                  if (paragraph.startsWith('####')) {
                    return (
                      <h4 key={index} className="font-sans font-bold text-xs text-slate-800 pt-1">
                        {paragraph.replace('####', '').trim()}
                      </h4>
                    );
                  }
                  if (paragraph.startsWith('*') || paragraph.startsWith('-')) {
                    return (
                      <ul key={index} className="list-disc pl-4 space-y-1 my-2">
                        {paragraph.split('\n').map((li, lIdx) => (
                          <li key={lIdx} className="text-slate-600">
                            {li.replace(/^[\s*-]+/, '').trim()}
                          </li>
                        ))}
                      </ul>
                    );
                  }
                  return (
                    <p key={index} className="text-slate-600 font-sans leading-relaxed">
                      {paragraph}
                    </p>
                  );
                })}
              </div>

              {/* FOOTER RESOURCE */}
              <div className="border-t border-slate-100 pt-4 flex justify-between items-center text-[10px] text-slate-400">
                <span className="flex items-center gap-1">
                  Reference: 
                  <button 
                    onClick={() => onOpenInAppViewer(activeBlog.sourceUrl, activeBlog.source)}
                    className="text-indigo-600 hover:underline font-bold flex items-center gap-0.5 bg-transparent border-0 p-0 cursor-pointer text-[10px]"
                  >
                    {activeBlog.source}
                    <ExternalLink className="w-2.5 h-2.5" />
                  </button>
                </span>
                <span className="italic">CanImmi Policy Intelligence</span>
              </div>

            </div>
          ) : (
            <div className="bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 p-8 text-center space-y-3 h-64 flex flex-col justify-center items-center">
              <BookOpen className="w-8 h-8 text-slate-300" />
              <div>
                <h4 className="text-xs font-bold text-slate-700">Select an Article</h4>
                <p className="text-[10px] text-slate-400 max-w-xs mt-1">
                  Click on any news article, draw analysis bulletin, or preparation guide on the left to read the full policy details.
                </p>
              </div>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
