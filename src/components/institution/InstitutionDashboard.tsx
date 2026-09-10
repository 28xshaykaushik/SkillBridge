import React, { useState } from "react";
import {
  Building2,
  TrendingUp,
  BarChart3,
  BookOpen,
  Users,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Calendar,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";

export const InstitutionDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"HEATMAP" | "PLACEMENT" | "BOOTCAMPS">("HEATMAP");

  const skillGaps = [
    { skill: "Cloud & Kubernetes Orchestration", industryDemand: 94, studentProficiency: 58, gap: 36, status: "Critical Shortage" },
    { skill: "GenAI & LLM Fine-Tuning", industryDemand: 90, studentProficiency: 64, gap: 26, status: "High Priority" },
    { skill: "System Design & Concurrency", industryDemand: 88, studentProficiency: 72, gap: 16, status: "Moderate" },
    { skill: "React & TypeScript Micro-frontends", industryDemand: 82, studentProficiency: 86, gap: -4, status: "Surplus / On Target" },
    { skill: "SQL & Distributed Schemas", industryDemand: 85, studentProficiency: 84, gap: 1, status: "Balanced" },
  ];

  const placementCorrelation = [
    { tier: "Tier 1: High Verification (Lvl 4+ in 3+ skills)", avgCtc: "₹24.8 LPA", placementRate: "98.4%", studentsCount: 142 },
    { tier: "Tier 2: Solid Verification (Lvl 3+ in 2+ skills)", avgCtc: "₹14.2 LPA", placementRate: "91.2%", studentsCount: 380 },
    { tier: "Tier 3: Basic Verification (Lvl 1-2 only)", avgCtc: "₹8.4 LPA", placementRate: "76.5%", studentsCount: 220 },
    { tier: "Tier 4: Unverified / Claims Only", avgCtc: "₹5.6 LPA", placementRate: "52.0%", studentsCount: 88 },
  ];

  const bootcamps = [
    {
      title: "AICTE-Sponsored Kubernetes Cloud Native Bootcamp",
      dates: "March 15 - 28, 2026",
      enrolled: 180,
      targetGap: "Cloud & Kubernetes (36% gap)",
      partner: "Red Hat & Microsoft",
      status: "Registration Open",
    },
    {
      title: "Enterprise GenAI & RAG Architecture Workshop",
      dates: "April 2 - 12, 2026",
      enrolled: 145,
      targetGap: "GenAI Fine-Tuning (26% gap)",
      partner: "Google Cloud AI",
      status: "Scheduled",
    },
  ];

  return (
    <div className="space-y-6 text-left">
      {/* Top Banner */}
      <div className="rounded-2xl border border-purple-100 bg-gradient-to-r from-purple-900 via-indigo-950 to-slate-900 p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full bg-purple-500/30 px-3 py-1 text-xs font-semibold text-purple-200 border border-purple-400/30">
            <Building2 className="h-3.5 w-3.5 text-purple-300" />
            <span>Institutional Placement & Curriculum Intelligence Cell</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display">
            Welcome, Prof. Sunita Deshmukh
          </h1>
          <p className="text-sm text-purple-200/90 max-w-xl">
            Dean of Corporate Relations & Placements (IIT Delhi). Real-time curriculum alignment with national industry demand signals.
          </p>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold">Total Verified Students</span>
            <Users className="h-4 w-4 text-purple-600" />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-slate-900">830</span>
            <span className="text-xs text-emerald-600 font-bold">92% verified</span>
          </div>
          <p className="mt-1 text-[11px] text-slate-500">2026 Graduating Batch</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold">Average Placed CTC</span>
            <TrendingUp className="h-4 w-4 text-indigo-600" />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-slate-900">₹18.6 LPA</span>
            <span className="text-xs text-indigo-600 font-bold">+28% YoY</span>
          </div>
          <p className="mt-1 text-[11px] text-slate-500">Evidence-verified hiring</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold">Active Industry MoUs</span>
            <Building2 className="h-4 w-4 text-blue-600" />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-slate-900">42</span>
            <span className="text-xs text-blue-600 font-semibold">Direct Recruiter Links</span>
          </div>
          <p className="mt-1 text-[11px] text-slate-500">Microsoft, Infosys, Tata</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold">Curriculum Gap Index</span>
            <AlertTriangle className="h-4 w-4 text-amber-500" />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-slate-900">14%</span>
            <span className="text-xs text-emerald-600 font-bold">Down from 32%</span>
          </div>
          <p className="mt-1 text-[11px] text-slate-500">AICTE Curriculum Aligned</p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab("HEATMAP")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === "HEATMAP"
              ? "bg-purple-600 text-white shadow-sm"
              : "bg-white text-slate-600 hover:bg-slate-100"
          }`}
        >
          Institutional Skill Heatmap (Demand vs Supply)
        </button>
        <button
          onClick={() => setActiveTab("PLACEMENT")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === "PLACEMENT"
              ? "bg-purple-600 text-white shadow-sm"
              : "bg-white text-slate-600 hover:bg-slate-100"
          }`}
        >
          Skill-to-Package CTC Correlation
        </button>
        <button
          onClick={() => setActiveTab("BOOTCAMPS")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === "BOOTCAMPS"
              ? "bg-purple-600 text-white shadow-sm"
              : "bg-white text-slate-600 hover:bg-slate-100"
          }`}
        >
          Intervention Bootcamps
        </button>
      </div>

      {/* Content based on activeTab */}
      {activeTab === "HEATMAP" && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <div className="pb-3 border-b border-slate-100">
            <h3 className="text-base font-bold text-slate-900">
              Departmental Skill Heatmap: National Industry Demand vs Student Capability
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Highlighting curriculum blind spots where student supply lags corporate hiring velocity
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                  <th className="p-4">Technology Domain</th>
                  <th className="p-4">Industry Demand</th>
                  <th className="p-4">Student Proficiency</th>
                  <th className="p-4">Gap Index</th>
                  <th className="p-4">Strategic Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {skillGaps.map((item) => (
                  <tr key={item.skill} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-bold text-slate-900">{item.skill}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-indigo-600 rounded-full"
                            style={{ width: `${item.industryDemand}%` }}
                          />
                        </div>
                        <span className="font-bold text-slate-700">{item.industryDemand}%</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-emerald-500 rounded-full"
                            style={{ width: `${item.studentProficiency}%` }}
                          />
                        </div>
                        <span className="font-bold text-slate-700">{item.studentProficiency}%</span>
                      </div>
                    </td>
                    <td className="p-4 font-bold">
                      {item.gap > 0 ? (
                        <span className="text-rose-600">+{item.gap}% Deficit</span>
                      ) : (
                        <span className="text-emerald-600">Target Satisfied</span>
                      )}
                    </td>
                    <td className="p-4">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[10px] font-extrabold ${
                          item.gap > 20
                            ? "bg-rose-100 text-rose-800"
                            : item.gap > 0
                            ? "bg-amber-100 text-amber-800"
                            : "bg-emerald-100 text-emerald-800"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "PLACEMENT" && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <div className="pb-3 border-b border-slate-100">
            <h3 className="text-base font-bold text-slate-900">
              Evidence-Based Verification Impact on Placement Package (CTC)
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Empirical data proving that verified technical artifacts directly translate to top-tier compensation offers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            {placementCorrelation.map((p) => (
              <div
                key={p.tier}
                className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5 space-y-3"
              >
                <div className="flex items-start justify-between">
                  <h4 className="font-bold text-slate-900 text-sm">{p.tier}</h4>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                    {p.placementRate} Placed
                  </span>
                </div>

                <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-slate-500">Average Compensation:</span>
                    <div className="text-lg font-black text-indigo-700 font-display mt-0.5">
                      {p.avgCtc}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-slate-500">Cohort Size:</span>
                    <div className="text-sm font-bold text-slate-800 mt-0.5">
                      {p.studentsCount} Students
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "BOOTCAMPS" && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <div className="pb-3 border-b border-slate-100">
            <h3 className="text-base font-bold text-slate-900">
              Active Institutional Upskilling Bootcamps
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Targeted short-term cohorts designed to eliminate identified skill deficits before placement season
            </p>
          </div>

          <div className="space-y-3 pt-2">
            {bootcamps.map((b) => (
              <div
                key={b.title}
                className="rounded-2xl border border-slate-200 p-5 space-y-2 text-xs hover:border-purple-300 transition-all"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-2 py-0.5 rounded">
                      Addressing: {b.targetGap}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 mt-1">{b.title}</h4>
                  </div>
                  <span className="rounded-full bg-emerald-100 text-emerald-800 px-2.5 py-0.5 font-bold text-[10px]">
                    {b.status}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-slate-500 pt-2 border-t border-slate-100">
                  <span>
                    Duration: <strong className="text-slate-800">{b.dates}</strong>
                  </span>
                  <span>•</span>
                  <span>
                    Corporate Sponsor: <strong className="text-slate-800">{b.partner}</strong>
                  </span>
                  <span>•</span>
                  <span className="text-indigo-600 font-bold">{b.enrolled} Students Enrolled</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
