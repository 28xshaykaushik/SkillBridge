import React, { useState } from "react";
import { Opportunity, StudentProfile } from "../../types";
import {
  Briefcase,
  Search,
  Filter,
  CheckCircle2,
  AlertCircle,
  Building2,
  MapPin,
  Clock,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  X,
  FileCheck2,
} from "lucide-react";

interface OpportunityPortalProps {
  opportunities: Opportunity[];
  profile: StudentProfile;
  onApply: (opp: Opportunity) => void;
}

export const OpportunityPortal: React.FC<OpportunityPortalProps> = ({
  opportunities,
  profile,
  onApply,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string>("ALL");
  const [selectedOpp, setSelectedOpp] = useState<Opportunity | null>(null);
  const [appliedSuccess, setAppliedSuccess] = useState<string | null>(null);

  const filteredOpps = opportunities.filter((opp) => {
    const matchesSearch =
      opp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opp.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opp.requiredSkills.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesType =
      filterType === "ALL" ||
      (filterType === "INTERNSHIP" && opp.type === "INTERNSHIP") ||
      (filterType === "FULL_TIME" && opp.type === "FULL_TIME");

    return matchesSearch && matchesType;
  });

  const handleApplyClick = (opp: Opportunity) => {
    onApply(opp);
    setAppliedSuccess(opp.id);
    setTimeout(() => setAppliedSuccess(null), 3500);
  };

  return (
    <div className="space-y-6 text-left">
      {/* Header */}
      <div className="pb-4 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-bold font-display text-slate-900">
            Matched Industry Opportunities
          </h2>
          <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-bold text-indigo-700 border border-indigo-200">
            Direct Skill Alignment
          </span>
        </div>
        <p className="text-xs text-slate-500 mt-1">
          Opportunities ranked algorithmically based on your faculty-verified competencies and benchmark requirements.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by role, company, or tech stack..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white pl-9 pr-3 py-2 text-xs text-slate-800 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => setFilterType("ALL")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              filterType === "ALL"
                ? "bg-slate-900 text-white"
                : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
            }`}
          >
            All Types
          </button>
          <button
            onClick={() => setFilterType("INTERNSHIP")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              filterType === "INTERNSHIP"
                ? "bg-indigo-600 text-white"
                : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
            }`}
          >
            Internships
          </button>
          <button
            onClick={() => setFilterType("FULL_TIME")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              filterType === "FULL_TIME"
                ? "bg-indigo-600 text-white"
                : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
            }`}
          >
            Full-Time Jobs
          </button>
        </div>
      </div>

      {/* Opportunities List */}
      <div className="grid grid-cols-1 gap-4">
        {filteredOpps.map((opp) => {
          const match = opp.matchScore || 75;
          const isApplied = appliedSuccess === opp.id;

          return (
            <div
              key={opp.id}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:border-indigo-300 transition-all flex flex-col md:flex-row md:items-center justify-between gap-5"
            >
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md">
                    {opp.companyName}
                  </span>
                  <span className="text-[11px] text-slate-400">•</span>
                  <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {opp.location} ({opp.workMode})
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900">{opp.title}</h3>
                <p className="text-xs text-slate-600 line-clamp-2">{opp.description}</p>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {opp.requiredSkills.map((req) => {
                    const hasVerified = profile.skills.some(
                      (s) => s.skillName.toLowerCase() === req.toLowerCase() && s.verifiedLevel > 0
                    );
                    return (
                      <span
                        key={req}
                        className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-md ${
                          hasVerified
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {hasVerified && <CheckCircle2 className="h-2.5 w-2.5 text-emerald-600" />}
                        <span>{req}</span>
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Right Side: Match Gauge & Action */}
              <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-3 border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100 shrink-0">
                <div className="flex items-center gap-2">
                  <div className="text-right">
                    <div className="text-xs font-bold text-slate-900">{match}% Match</div>
                    <div className="text-[10px] text-emerald-600 font-semibold">High Readiness</div>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 font-bold font-display text-sm border border-emerald-200">
                    {match}
                  </div>
                </div>

                <div className="text-xs font-bold text-slate-700">{opp.stipendOrSalary}</div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedOpp(opp)}
                    className="rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    Match Breakdown
                  </button>

                  <button
                    onClick={() => handleApplyClick(opp)}
                    className={`rounded-xl px-4 py-1.5 text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 ${
                      isApplied
                        ? "bg-emerald-600 text-white"
                        : "bg-indigo-600 text-white hover:bg-indigo-700"
                    }`}
                    id={`btn-apply-opp-${opp.id}`}
                  >
                    {isApplied ? (
                      <>
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        Applied!
                      </>
                    ) : (
                      <>
                        <FileCheck2 className="h-3.5 w-3.5" />
                        1-Click Apply
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Match Breakdown Modal */}
      {selectedOpp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl animate-in fade-in duration-150">
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-bold text-indigo-700 uppercase tracking-wider">
                  {selectedOpp.companyName}
                </span>
                <h3 className="text-base font-bold text-slate-900">{selectedOpp.title}</h3>
              </div>
              <button
                onClick={() => setSelectedOpp(null)}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-4 space-y-4 text-xs">
              <div className="rounded-xl bg-indigo-50/70 p-3.5 border border-indigo-100">
                <div className="flex items-center gap-2 text-indigo-900 font-bold mb-1">
                  <Sparkles className="h-4 w-4" />
                  <span>Why you received a {selectedOpp.matchScore}% match:</span>
                </div>
                <p className="text-slate-700 leading-relaxed">
                  Your verified levels in React (L4), TypeScript (L4), and Node.js (L3) fulfill 85% of the mandatory job criteria. Missing or unverified: Production Kubernetes deployment experience.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 mb-2">Requirement Checklist:</h4>
                <div className="space-y-1.5">
                  {selectedOpp.requiredSkills.map((req) => {
                    const studentSkill = profile.skills.find(
                      (s) => s.skillName.toLowerCase() === req.toLowerCase()
                    );
                    const isVerified = (studentSkill?.verifiedLevel || 0) > 0;
                    return (
                      <div
                        key={req}
                        className="flex items-center justify-between p-2 rounded-lg bg-slate-50"
                      >
                        <span className="font-semibold text-slate-800">{req}</span>
                        {isVerified ? (
                          <span className="text-emerald-700 font-bold flex items-center gap-1 text-[11px]">
                            <CheckCircle2 className="h-3.5 w-3.5" />
                            Verified Lvl {studentSkill?.verifiedLevel}
                          </span>
                        ) : (
                          <span className="text-amber-700 font-semibold flex items-center gap-1 text-[11px]">
                            <AlertCircle className="h-3.5 w-3.5" />
                            Unverified
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 p-3 text-[11px] text-slate-500 flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-indigo-600 shrink-0" />
                <span>Applying automatically links your tamper-proof SHA-256 evidence bundle to the recruiter’s portal.</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                onClick={() => setSelectedOpp(null)}
                className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50"
              >
                Close
              </button>
              <button
                onClick={() => {
                  handleApplyClick(selectedOpp);
                  setSelectedOpp(null);
                }}
                className="rounded-xl bg-indigo-600 px-5 py-2 text-xs font-bold text-white hover:bg-indigo-700 shadow-sm"
              >
                Apply with Verified Credentials
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
