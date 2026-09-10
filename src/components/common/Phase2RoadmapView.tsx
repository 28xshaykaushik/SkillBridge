import React, { useState } from "react";
import { Sparkles, ArrowRight, Clock, Milestone, Eye, ShieldCheck, ChevronRight } from "lucide-react";

interface Phase2RoadmapViewProps {
  featureName: string;
  category: string;
  description: string;
  targetPhase?: string;
  plannedMilestones: string[];
  onReturnToCore: () => void;
  children?: React.ReactNode;
}

export const Phase2RoadmapView: React.FC<Phase2RoadmapViewProps> = ({
  featureName,
  category,
  description,
  targetPhase = "Phase 2 (Production Rollout)",
  plannedMilestones,
  onReturnToCore,
  children,
}) => {
  const [showLivePreview, setShowLivePreview] = useState(false);

  return (
    <div className="space-y-6 text-left max-w-5xl mx-auto">
      {/* Extended Module Header */}
      <div className="rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50/70 via-white to-slate-50 p-5 sm:p-7 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-indigo-100">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-100 px-3 py-0.5 text-[11px] font-bold text-indigo-800">
              <Clock className="h-3.5 w-3.5 text-indigo-600" />
              <span>Extended Module • Phase 2 Roadmap</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-display">
              {featureName}
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Category: {category} • Target Rollout: {targetPhase}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {children && (
              <button
                onClick={() => setShowLivePreview(!showLivePreview)}
                className={`rounded-xl px-3.5 py-2 text-xs font-bold border transition-all flex items-center gap-1.5 ${
                  showLivePreview
                    ? "bg-slate-900 text-white border-slate-900"
                    : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
                }`}
                id="btn-toggle-wireframe"
              >
                <Eye className="h-3.5 w-3.5" />
                <span>{showLivePreview ? "Show Blueprint Spec" : "Preview Wireframe"}</span>
              </button>
            )}

            <button
              onClick={onReturnToCore}
              className="rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white hover:bg-indigo-700 shadow-xs transition-all flex items-center gap-1.5"
              id="btn-back-to-working-core"
            >
              <span>Back to Dashboard</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* When preview is toggled, render the component below */}
        {showLivePreview && children ? (
          <div className="mt-6 pt-6 border-t border-slate-200">
            <div className="mb-4 flex items-center gap-2 rounded-lg bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-800 border border-amber-200">
              <Sparkles className="h-4 w-4 text-amber-600 shrink-0" />
              <span>Extended Module Interactive Preview</span>
            </div>
            {children}
          </div>
        ) : (
          /* Roadmap Specification */
          <div className="mt-5 space-y-4 text-xs">
            <div className="rounded-xl border border-indigo-100 bg-indigo-50/60 p-4 text-indigo-950 space-y-1">
              <span className="font-bold flex items-center gap-1.5 text-xs text-indigo-900">
                <Sparkles className="h-4 w-4 text-indigo-600" />
                Architecture Overview:
              </span>
              <p className="text-[11px] text-indigo-800 leading-relaxed">
                This capability is scheduled as part of the Phase 2 expansion. The active core focuses on Verified Skill Intelligence, AI Gap Roadmaps, Faculty Digital Endorsements, and Verified Talent Sourcing.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-slate-900 text-sm mb-1">Architectural Scope</h3>
              <p className="text-slate-600 text-xs leading-relaxed">{description}</p>
            </div>

            <div className="pt-2">
              <h3 className="font-bold text-slate-900 text-xs mb-3 flex items-center gap-1.5">
                <Milestone className="h-4 w-4 text-indigo-600" />
                Phase 2 Implementation Milestones:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {plannedMilestones.map((m, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-white p-3 shadow-2xs"
                  >
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-50 font-mono text-[10px] font-bold text-indigo-700 border border-indigo-200">
                      {idx + 1}
                    </span>
                    <div className="text-xs text-slate-700 font-medium leading-relaxed">{m}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
