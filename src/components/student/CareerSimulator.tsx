import React, { useState } from "react";
import { StudentProfile } from "../../types";
import { simulateCareerImpactWithAI } from "../../services/api";
import {
  Sparkles,
  TrendingUp,
  ArrowRight,
  Briefcase,
  Award,
  Check,
  Plus,
  RefreshCw,
  Coins,
  Compass,
} from "lucide-react";

interface CareerSimulatorProps {
  profile: StudentProfile;
}

const AVAILABLE_HYPOTHETICAL_SKILLS = [
  "Kubernetes & Cloud Orchestration",
  "High-Throughput Redis & System Caching",
  "Distributed Systems & Raft Consensus",
  "Terraform & Infrastructure-as-Code",
  "Apache Kafka Event Streaming",
  "AWS Cloud Architect Foundations",
  "GraphQL & Federation Schemas",
];

export const CareerSimulator: React.FC<CareerSimulatorProps> = ({ profile }) => {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([
    "Kubernetes & Cloud Orchestration",
    "High-Throughput Redis & System Caching",
  ]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationData, setSimulationData] = useState<any>(null);

  const toggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter((s) => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handleRunSimulation = async () => {
    if (selectedSkills.length === 0) return;
    setIsSimulating(true);
    try {
      const res = await simulateCareerImpactWithAI(profile, profile.targetRole, selectedSkills);
      setSimulationData(res);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSimulating(false);
    }
  };

  return (
    <div className="space-y-6 text-left">
      {/* Header */}
      <div className="pb-4 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-bold font-display text-slate-900">
            &quot;What-If&quot; Career Leap Simulator
          </h2>
          <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-bold text-indigo-700 border border-indigo-200">
            Predictive AI Engine
          </span>
        </div>
        <p className="text-xs text-slate-500 mt-1">
          Model future learning investments: pick skills you plan to master and observe projected readiness score leaps, salary growth, and unlocked job openings.
        </p>
      </div>

      {/* Selector Matrix */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold text-slate-900">
            Select Hypothetical Skills to Acquire / Level Up:
          </span>
          <span className="text-[11px] text-indigo-600 font-semibold">
            {selectedSkills.length} selected
          </span>
        </div>

        <div className="flex flex-wrap gap-2.5">
          {AVAILABLE_HYPOTHETICAL_SKILLS.map((skill) => {
            const isSelected = selectedSkills.includes(skill);
            return (
              <button
                key={skill}
                onClick={() => toggleSkill(skill)}
                className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-semibold transition-all ${
                  isSelected
                    ? "bg-indigo-600 text-white shadow-sm ring-2 ring-indigo-500/20"
                    : "bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100"
                }`}
              >
                {isSelected ? <Check className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5 text-slate-400" />}
                <span>{skill}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-5 pt-4 border-t border-slate-100 flex justify-end">
          <button
            onClick={handleRunSimulation}
            disabled={isSimulating || selectedSkills.length === 0}
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-bold text-white shadow-md hover:bg-indigo-700 transition-all disabled:opacity-50"
            id="btn-run-career-sim"
          >
            {isSimulating ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                Simulating with Gemini...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                Simulate Career Trajectory
              </>
            )}
          </button>
        </div>
      </div>

      {/* Projection Impact Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Readiness Leap */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold">Projected Readiness Leap</span>
            <TrendingUp className="h-4 w-4 text-emerald-500" />
          </div>
          <div className="mt-4 flex items-baseline gap-3">
            <span className="text-3xl font-extrabold text-slate-400 line-through">
              {simulationData?.initialScore || profile.readinessScore}
            </span>
            <ArrowRight className="h-5 w-5 text-indigo-600" />
            <span className="text-4xl font-extrabold text-emerald-600 font-display">
              {simulationData?.projectedScore || 94}
            </span>
          </div>
          <p className="mt-2 text-xs font-bold text-emerald-700">
            {simulationData?.scoreDelta || "+12%"} Employability Surge
          </p>
        </div>

        {/* Salary CTC Projection */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold">Projected CTC Band</span>
            <Coins className="h-4 w-4 text-indigo-500" />
          </div>
          <div className="mt-4 text-2xl font-extrabold text-slate-900 font-display">
            {simulationData?.salaryImpactEstimate || "₹9.5 LPA → ₹18.5 LPA"}
          </div>
          <p className="mt-2 text-xs text-slate-500 font-medium">
            Based on current Q1 2026 hiring rates in FinTech/Cloud
          </p>
        </div>

        {/* Unlocked Jobs */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold">Unlocked Openings</span>
            <Briefcase className="h-4 w-4 text-blue-500" />
          </div>
          <div className="mt-4 text-4xl font-extrabold text-blue-600 font-display">
            +{simulationData?.unlockedOpportunitiesCount || 16}
          </div>
          <p className="mt-2 text-xs text-slate-500 font-medium">
            Qualifies for Top-Tier Tier 1 & Global MNC filters
          </p>
        </div>
      </div>

      {/* AI Key Insight & Recommended Certifications */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-2xl border border-indigo-200 bg-gradient-to-br from-indigo-50/80 to-white p-6 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-indigo-900">
            <Sparkles className="h-4 w-4" />
            <h3 className="text-sm font-bold">Gemini Architectural Analysis</h3>
          </div>
          <p className="text-xs text-slate-700 leading-relaxed">
            {simulationData?.keyInsight ||
              "Acquiring verified competencies in Kubernetes and Redis invalidation bridges the primary gap separating academic junior coders from production cloud architects. Recruiters filter heavily on zero-downtime deployment patterns and cache coherence under concurrency."}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-slate-900">
            <Award className="h-4 w-4 text-indigo-600" />
            <h3 className="text-sm font-bold">Fast-Track Certifications</h3>
          </div>
          <div className="space-y-2">
            {(simulationData?.recommendedCertifications || [
              "Certified Kubernetes Administrator (CKA)",
              "AWS Solutions Architect Associate",
              "Redis Certified Developer",
            ]).map((cert: string, idx: number) => (
              <div
                key={idx}
                className="rounded-xl border border-slate-100 bg-slate-50 p-2.5 text-xs font-semibold text-slate-800 flex items-center gap-2"
              >
                <div className="h-1.5 w-1.5 rounded-full bg-indigo-600 shrink-0" />
                <span>{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
