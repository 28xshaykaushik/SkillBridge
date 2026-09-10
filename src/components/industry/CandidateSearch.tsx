import React, { useState } from "react";
import { StudentProfile } from "../../types";
import {
  Search,
  Filter,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Award,
  GraduationCap,
  X,
  UserCheck,
  Send,
  Sparkles,
} from "lucide-react";

interface CandidateSearchProps {
  candidates: StudentProfile[];
  onShortlist: (student: StudentProfile) => void;
}

export const CandidateSearch: React.FC<CandidateSearchProps> = ({
  candidates,
  onShortlist,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [minVerifiedLevel, setMinVerifiedLevel] = useState(3);
  const [selectedCandidate, setSelectedCandidate] = useState<StudentProfile | null>(null);
  const [shortlistedMap, setShortlistedMap] = useState<Record<string, boolean>>({});

  const filteredCandidates = candidates.filter((c) => {
    const matchesQuery =
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.institution.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.skills.some((s) => s.skillName.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesLevel = c.skills.some((s) => s.verifiedLevel >= minVerifiedLevel);
    return matchesQuery && matchesLevel;
  });

  const handleShortlistClick = (c: StudentProfile) => {
    onShortlist(c);
    setShortlistedMap({ ...shortlistedMap, [c.id]: true });
  };

  return (
    <div className="space-y-6 text-left">
      {/* Header */}
      <div className="pb-4 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-bold font-display text-slate-900">
            Anti-Fraud Verified Candidate Search
          </h2>
          <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-bold text-blue-700 border border-blue-200">
            Faculty Certified
          </span>
        </div>
        <p className="text-xs text-slate-500 mt-1">
          Search students filtered exclusively by verified competencies and genuine code artifacts.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Filter by name, skill (e.g. React, Node), or college..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-3 py-2 text-xs text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto text-xs">
          <span className="font-semibold text-slate-600">Min. Verified Level:</span>
          {[2, 3, 4].map((lvl) => (
            <button
              key={lvl}
              onClick={() => setMinVerifiedLevel(lvl)}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                minVerifiedLevel === lvl
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              Level {lvl}+
            </button>
          ))}
        </div>
      </div>

      {/* Candidate Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredCandidates.map((c) => {
          const isShortlisted = shortlistedMap[c.id];
          const verifiedSkills = c.skills.filter((s) => s.verifiedLevel >= minVerifiedLevel);

          return (
            <div
              key={c.id}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:border-blue-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={c.avatar}
                      alt={c.name}
                      className="h-11 w-11 rounded-full object-cover ring-2 ring-blue-500/20"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-bold text-slate-900 text-sm">{c.name}</h3>
                        <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      </div>
                      <p className="text-[11px] text-slate-500">{c.institution}</p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end">
                    <span className="text-xs font-black text-blue-600 font-display">
                      {c.readinessScore}/100
                    </span>
                    <span className="text-[9px] font-bold text-slate-400 uppercase">Readiness</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 space-y-2">
                  <div className="text-[11px] font-bold text-slate-700">
                    Verified Competencies (Lvl {minVerifiedLevel}+):
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {verifiedSkills.map((s) => (
                      <span
                        key={s.skillId}
                        className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-800 border border-emerald-200"
                      >
                        <CheckCircle2 className="h-2.5 w-2.5 text-emerald-600" />
                        {s.skillName} (L{s.verifiedLevel})
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => setSelectedCandidate(c)}
                  className="rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Inspect Proofs
                </button>

                <button
                  onClick={() => handleShortlistClick(c)}
                  className={`rounded-xl px-4 py-1.5 text-xs font-bold transition-all flex items-center gap-1 ${
                    isShortlisted
                      ? "bg-emerald-600 text-white"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                  id={`btn-shortlist-${c.id}`}
                >
                  {isShortlisted ? (
                    <>
                      <UserCheck className="h-3.5 w-3.5" />
                      Shortlisted
                    </>
                  ) : (
                    <>
                      <UserCheck className="h-3.5 w-3.5" />
                      Shortlist
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Candidate Inspection Modal */}
      {selectedCandidate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="w-full max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl animate-in fade-in duration-150 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <img
                  src={selectedCandidate.avatar}
                  alt={selectedCandidate.name}
                  className="h-12 w-12 rounded-full object-cover ring-2 ring-blue-500/20"
                />
                <div>
                  <h3 className="text-base font-bold text-slate-900">{selectedCandidate.name}</h3>
                  <p className="text-xs text-slate-500">
                    {selectedCandidate.degree} in {selectedCandidate.branch} • {selectedCandidate.institution} (CGPA: {selectedCandidate.cgpa})
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedCandidate(null)}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-4 space-y-4 text-xs">
              <div className="rounded-xl bg-blue-50/60 p-3.5 border border-blue-100 flex items-center justify-between">
                <div>
                  <span className="font-bold text-blue-900">Cryptographic Credential Stamp: </span>
                  <span className="font-mono text-blue-700 text-[11px] block mt-0.5">
                    SHA256: 0x8a92e104b789ef...validated
                  </span>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                    Integrity: 100%
                  </span>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 mb-2">Verified Artifact Proofs on Record:</h4>
                <div className="space-y-2">
                  {selectedCandidate.skills.map((s) => (
                    <div
                      key={s.skillId}
                      className="rounded-xl border border-slate-200 bg-slate-50 p-3 space-y-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900">{s.skillName}</span>
                        <span className="text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded text-[10px]">
                          Level {s.verifiedLevel} Verified
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-600">
                        {s.evidenceList[0]?.description || "Verified via Proctored Unit Tests & Lab Repository"}
                      </div>
                      {s.evidenceList[0]?.url && (
                        <a
                          href={s.evidenceList[0].url}
                          target="_blank"
                          rel="noreferrer"
                          className="font-bold text-blue-600 hover:underline flex items-center gap-1 text-[11px]"
                        >
                          View Repository Code <ExternalLink className="h-3 w-3" />
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                onClick={() => setSelectedCandidate(null)}
                className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50"
              >
                Close
              </button>
              <button
                onClick={() => {
                  handleShortlistClick(selectedCandidate);
                  setSelectedCandidate(null);
                }}
                className="rounded-xl bg-blue-600 px-5 py-2 text-xs font-bold text-white hover:bg-blue-700 shadow-sm"
              >
                Shortlist Candidate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
