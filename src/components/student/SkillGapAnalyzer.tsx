import React, { useState } from "react";
import { StudentProfile, CareerRole } from "../../types";
import { CAREER_ROLES } from "../../data/mockDatabase";
import { analyzeSkillGapWithAI } from "../../services/api";
import {
  Target,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Clock,
  ArrowRight,
  TrendingUp,
  Calendar,
  Layers,
  Award,
} from "lucide-react";

interface SkillGapAnalyzerProps {
  profile: StudentProfile;
  onUpdateTargetRole: (roleTitle: string) => void;
  onNavigateTab: (tab: string) => void;
}

export const SkillGapAnalyzer: React.FC<SkillGapAnalyzerProps> = ({
  profile,
  onUpdateTargetRole,
  onNavigateTab,
}) => {
  const [selectedRoleId, setSelectedRoleId] = useState<string>("role-fullstack-cloud");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiGapData, setAiGapData] = useState<any>(null);

  const selectedRole = CAREER_ROLES.find((r) => r.id === selectedRoleId) || CAREER_ROLES[0];

  const handleRunAiGapAnalysis = async () => {
    setIsAnalyzing(true);
    try {
      const data = await analyzeSkillGapWithAI(profile.skills, selectedRole.title);
      setAiGapData(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-6 text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold font-display text-slate-900">
              AI Skill Gap Engine & Roadmap
            </h2>
            <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-bold text-indigo-700 border border-indigo-200">
              Role Benchmark
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Compare your verified competencies against enterprise benchmarks and receive an AI-crafted milestone plan.
          </p>
        </div>

        <button
          onClick={handleRunAiGapAnalysis}
          disabled={isAnalyzing}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 px-4 py-2.5 text-xs font-bold text-white shadow-md hover:from-indigo-700 hover:to-blue-700 transition-all shrink-0 disabled:opacity-50"
          id="btn-run-ai-gap-analysis"
        >
          <Sparkles className="h-4 w-4" />
          {isAnalyzing ? "Analyzing with Gemini..." : "Re-evaluate with Gemini AI"}
        </button>
      </div>

      {/* Role Selection Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {CAREER_ROLES.map((role) => {
          const isSelected = role.id === selectedRoleId;
          return (
            <div
              key={role.id}
              onClick={() => {
                setSelectedRoleId(role.id);
                onUpdateTargetRole(role.title);
              }}
              className={`cursor-pointer rounded-2xl border p-5 transition-all ${
                isSelected
                  ? "border-indigo-600 bg-indigo-50/50 shadow-md ring-2 ring-indigo-500/20"
                  : "border-slate-200 bg-white hover:border-slate-300"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700">
                  {role.category}
                </span>
                <span className="text-[10px] font-extrabold bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded-full">
                  Demand {role.demandScore}/100
                </span>
              </div>
              <h3 className="mt-2 text-sm font-bold text-slate-900">{role.title}</h3>
              <p className="mt-1 text-xs text-slate-500 line-clamp-2">{role.description}</p>
              <div className="mt-3 pt-3 border-t border-slate-100 text-xs font-semibold text-slate-700">
                Avg CTC: <span className="font-bold text-indigo-600">{role.avgSalary}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Gap Analysis Matrix & Milestones */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Required Skills vs Verified Levels */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Role Skill Requirements: {selectedRole.title}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Comparison between your verified level and industry hiring minimums
                </p>
              </div>
            </div>

            <div className="mt-4 divide-y divide-slate-100">
              {selectedRole.requiredSkills.map((req) => {
                const studentSkill = profile.skills.find(
                  (s) => s.skillName.toLowerCase() === req.skillName.toLowerCase()
                );
                const currentVerified = studentSkill?.verifiedLevel || 0;
                const isMet = currentVerified >= req.requiredLevel;
                const isPartial = currentVerified > 0 && currentVerified < req.requiredLevel;

                return (
                  <div key={req.skillName} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900">{req.skillName}</span>
                        <span className="text-[10px] text-slate-400">
                          (Importance: {req.weight}/10)
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        Required: <strong className="text-slate-700">Lvl {req.requiredLevel}</strong> | Current Verified:{" "}
                        <strong className={currentVerified > 0 ? "text-emerald-700" : "text-slate-400"}>
                          Lvl {currentVerified}
                        </strong>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {isMet ? (
                        <span className="inline-flex items-center gap-1 rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700 border border-emerald-200">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          Requirement Met
                        </span>
                      ) : isPartial ? (
                        <span className="inline-flex items-center gap-1 rounded-lg bg-blue-50 px-2.5 py-1 text-xs font-bold text-blue-700 border border-blue-200">
                          <TrendingUp className="h-3.5 w-3.5" />
                          Partial Gap (+{req.requiredLevel - currentVerified} lvl needed)
                        </span>
                      ) : (
                        <button
                          onClick={() => onNavigateTab("ASSESSMENTS")}
                          className="inline-flex items-center gap-1 rounded-lg bg-rose-50 px-2.5 py-1 text-xs font-bold text-rose-700 border border-rose-200 hover:bg-rose-100"
                        >
                          <AlertCircle className="h-3.5 w-3.5" />
                          Critical Gap (Missing)
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Col: AI Explainability & Roadmap Milestones */}
        <div className="space-y-6">
          {/* AI Explainability Card */}
          <div className="rounded-2xl border border-indigo-200 bg-gradient-to-br from-indigo-50/80 to-white p-6 shadow-sm">
            <div className="flex items-center gap-2 text-indigo-800">
              <Sparkles className="h-4 w-4" />
              <h3 className="text-sm font-bold">AI Gap Explainability</h3>
            </div>
            <p className="mt-2 text-xs text-slate-700 leading-relaxed">
              {aiGapData?.matchExplanation ||
                `Strong match in core frontend and database competencies, but currently lagging in production container orchestration (Kubernetes) and distributed caching policies required for ${selectedRole.title}.`}
            </p>
          </div>

          {/* 4-Week Milestone Roadmap */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <Calendar className="h-4 w-4 text-indigo-600" />
              <h3 className="text-sm font-bold text-slate-900">Recommended Milestone Plan</h3>
            </div>

            <div className="mt-4 space-y-3">
              {(aiGapData?.recommendedMilestones || [
                { week: 1, title: "Take Level 3 Docker Assessment to resolve skill decay", hours: 6 },
                { week: 2, title: "Deploy Kubernetes ingress controller with Helm charts on Minikube", hours: 14 },
                { week: 3, title: "Implement Redis write-through cache in Node distributed lab project", hours: 12 },
                { week: 4, title: "Request Faculty Endorsement from Dr. Ramanathan on lab repository", hours: 4 },
              ]).map((m: any, idx: number) => (
                <div key={idx} className="rounded-xl border border-slate-100 bg-slate-50 p-3 text-xs">
                  <div className="flex items-center justify-between text-indigo-700 font-bold mb-1">
                    <span>Week {m.week || idx + 1}</span>
                    <span className="text-[10px] text-slate-500 font-normal">~{m.hours} hrs</span>
                  </div>
                  <p className="text-slate-700 font-medium">{m.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
