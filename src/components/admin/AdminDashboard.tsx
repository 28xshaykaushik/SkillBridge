import React, { useState } from "react";
import {
  Layers,
  Shield,
  Key,
  Users,
  Activity,
  CheckCircle2,
  Server,
  Database,
  Lock,
  Search,
  Plus,
} from "lucide-react";

export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"HEALTH" | "TAXONOMY" | "AUDIT">("HEALTH");

  const systemMetrics = [
    { label: "Active API Gateway", value: "Normal (28ms p99)", icon: Server, status: "Healthy" },
    { label: "Gemini 3.8 Flash Inference", value: "32,450 tokens/min", icon: Activity, status: "Optimal" },
    { label: "Blockchain Verification Hashes", value: "14,892 Anchored", icon: Lock, status: "Synced" },
    { label: "Multi-Tenant Institutions", value: "18 Colleges Active", icon: Users, status: "Active" },
  ];

  const taxonomySkills = [
    { name: "React 19 & Concurrent Mode", category: "Frontend", level3Desc: "Custom hooks, suspense, SSR hydration", totalVerified: 1420 },
    { name: "Node.js & Distributed Systems", category: "Backend", level3Desc: "Stream processing, cluster mode, worker threads", totalVerified: 1210 },
    { name: "Kubernetes & Ingress Controllers", category: "DevOps", level3Desc: "Helm charts, HPA, service mesh networking", totalVerified: 480 },
    { name: "Transformer RAG & Embeddings", category: "AI/ML", level3Desc: "Vector index tuning, reranking, hybrid search", totalVerified: 360 },
  ];

  const auditLogs = [
    { timestamp: "2026-03-10 14:32:18", event: "Skill Endorsement Issued", actor: "Dr. K. Ramanathan (IIT Delhi)", target: "Priya Sharma (Kubernetes Lvl 3)", hash: "0x8f23...a9b2" },
    { timestamp: "2026-03-10 14:15:02", event: "Candidate Profile Shortlisted", actor: "Rohan Verma (Microsoft IDC)", target: "Priya Sharma (Cloud Architect)", hash: "0x3e11...440c" },
    { timestamp: "2026-03-10 13:58:44", event: "Assessment Completed & Passed", actor: "Priya Sharma", target: "Docker Containerization Test (92%)", hash: "0x7d94...ff12" },
    { timestamp: "2026-03-10 12:40:11", event: "Weekly Internship Log Signed", actor: "Tata Digital Corporate Mentor", target: "Week 8 Deliverables Approved", hash: "0x2a08...cc91" },
  ];

  return (
    <div className="space-y-6 text-left">
      {/* Top Banner */}
      <div className="rounded-2xl border border-amber-200 bg-gradient-to-r from-amber-950 via-slate-900 to-slate-950 p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/30 px-3 py-1 text-xs font-semibold text-amber-200 border border-amber-400/30">
            <Layers className="h-3.5 w-3.5 text-amber-300" />
            <span>Platform Governance & National Skill Registry Controller</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display">
            Central Command & Auditing
          </h1>
          <p className="text-sm text-amber-200/90 max-w-xl">
            National centralized skill governance authority. Skill taxonomy curation, tenant verification, and cryptographic audit monitoring.
          </p>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {systemMetrics.map((m) => {
          const Icon = m.icon;
          return (
            <div key={m.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between text-slate-500">
                <span className="text-xs font-semibold">{m.label}</span>
                <Icon className="h-4 w-4 text-amber-600" />
              </div>
              <div className="mt-3 text-lg font-bold text-slate-900">{m.value}</div>
              <p className="mt-1 text-[11px] text-emerald-600 font-bold flex items-center gap-1">
                <CheckCircle2 className="h-3 w-3" />
                {m.status}
              </p>
            </div>
          );
        })}
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab("HEALTH")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === "HEALTH"
              ? "bg-slate-900 text-white shadow-sm"
              : "bg-white text-slate-600 hover:bg-slate-100"
          }`}
        >
          System Health & Services
        </button>
        <button
          onClick={() => setActiveTab("TAXONOMY")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === "TAXONOMY"
              ? "bg-slate-900 text-white shadow-sm"
              : "bg-white text-slate-600 hover:bg-slate-100"
          }`}
        >
          National Skill Taxonomy
        </button>
        <button
          onClick={() => setActiveTab("AUDIT")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === "AUDIT"
              ? "bg-slate-900 text-white shadow-sm"
              : "bg-white text-slate-600 hover:bg-slate-100"
          }`}
        >
          Cryptographic Audit Trail
        </button>
      </div>

      {/* Tab Panels */}
      {activeTab === "HEALTH" && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4 text-xs">
          <h3 className="text-base font-bold text-slate-900">Service Infrastructure Health</h3>
          <div className="divide-y divide-slate-100">
            <div className="py-3 flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-900">Gemini 3.8 Flash AI Inference Server</span>
                <p className="text-slate-500 text-[11px]">Serving /api/gemini/* routes for skill extraction & simulation</p>
              </div>
              <span className="text-emerald-700 font-bold bg-emerald-100 px-2.5 py-1 rounded-full text-[10px]">
                100% Operational
              </span>
            </div>

            <div className="py-3 flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-900">Cryptographic SHA-256 Ledger Node</span>
                <p className="text-slate-500 text-[11px]">Validates digital evidence hashes and tamper proofs</p>
              </div>
              <span className="text-emerald-700 font-bold bg-emerald-100 px-2.5 py-1 rounded-full text-[10px]">
                Synced & Verified
              </span>
            </div>

            <div className="py-3 flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-900">Multi-Role Session Authorization</span>
                <p className="text-slate-500 text-[11px]">Strict RBAC enforcement across 5 institutional stakeholder roles</p>
              </div>
              <span className="text-emerald-700 font-bold bg-emerald-100 px-2.5 py-1 rounded-full text-[10px]">
                Protected (Zero Breaches)
              </span>
            </div>
          </div>
        </div>
      )}

      {activeTab === "TAXONOMY" && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-900">AICTE Standardized Competency Taxonomy</h3>
              <p className="text-xs text-slate-500">Benchmark rubric for technical skill leveling across national universities</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                  <th className="p-4">Skill Title</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Level 3 (Proficient) Definition</th>
                  <th className="p-4">Nationally Verified</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {taxonomySkills.map((sk) => (
                  <tr key={sk.name} className="hover:bg-slate-50">
                    <td className="p-4 font-bold text-slate-900">{sk.name}</td>
                    <td className="p-4 text-slate-600">{sk.category}</td>
                    <td className="p-4 text-slate-600 max-w-xs">{sk.level3Desc}</td>
                    <td className="p-4 font-bold text-indigo-600">{sk.totalVerified} students</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "AUDIT" && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <div className="pb-3 border-b border-slate-100">
            <h3 className="text-base font-bold text-slate-900">Immutable Cryptographic Audit Trail</h3>
            <p className="text-xs text-slate-500">Every faculty sign-off, corporate endorsement, and test result is signed and stamped</p>
          </div>

          <div className="space-y-3">
            {auditLogs.map((log, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-slate-200 bg-slate-50 p-3.5 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900">{log.event}</span>
                    <span className="text-slate-400">•</span>
                    <span className="text-[11px] text-slate-500">{log.timestamp}</span>
                  </div>
                  <div className="text-[11px] text-slate-600 mt-1">
                    Actor: <strong className="text-slate-800">{log.actor}</strong> → Target: <strong className="text-slate-800">{log.target}</strong>
                  </div>
                </div>

                <div className="font-mono text-[10px] text-slate-400 bg-white px-2.5 py-1 rounded border border-slate-200">
                  {log.hash}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
