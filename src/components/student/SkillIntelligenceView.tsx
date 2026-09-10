import React, { useState } from "react";
import { StudentProfile, StudentSkill, SkillEvidence, EvidenceType } from "../../types";
import {
  CheckCircle2,
  ShieldCheck,
  ExternalLink,
  Plus,
  Lock,
  Layers,
  Sparkles,
  AlertCircle,
  FileCode2,
  GitBranch,
  X,
  Award,
  Hash,
  Clock,
} from "lucide-react";

interface SkillIntelligenceViewProps {
  profile: StudentProfile;
  onAddEvidence: (skillId: string, evidence: Omit<SkillEvidence, "id">) => void;
  onTakeAssessment: (skillId: string) => void;
}

export const SkillIntelligenceView: React.FC<SkillIntelligenceViewProps> = ({
  profile,
  onAddEvidence,
  onTakeAssessment,
}) => {
  const [selectedSkill, setSelectedSkill] = useState<StudentSkill | null>(null);
  const [showEvidenceModal, setShowEvidenceModal] = useState(false);
  const [evidenceSkillId, setEvidenceSkillId] = useState(profile.skills[0]?.skillId || "");
  const [evidenceType, setEvidenceType] = useState<EvidenceType>("GITHUB_REPO");
  const [evidenceTitle, setEvidenceTitle] = useState("");
  const [evidenceUrl, setEvidenceUrl] = useState("");
  const [evidenceDesc, setEvidenceDesc] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("ALL");

  const categories = ["ALL", "Frontend", "Backend", "Databases", "DevOps & Cloud", "Core CS"];

  const filteredSkills = profile.skills.filter((s) => {
    if (filterCategory === "ALL") return true;
    return s.category === filterCategory;
  });

  const handleSubmitEvidence = (e: React.FormEvent) => {
    e.preventDefault();
    if (!evidenceTitle || !evidenceUrl) return;

    const skillObj = profile.skills.find((s) => s.skillId === evidenceSkillId);
    onAddEvidence(evidenceSkillId, {
      skillId: evidenceSkillId,
      skillName: skillObj?.skillName || "Skill",
      evidenceType,
      title: evidenceTitle,
      url: evidenceUrl,
      description: evidenceDesc,
      verificationLevel: "PENDING",
      blockchainHash: "0x" + Math.random().toString(16).substring(2, 10) + "...pending",
      score: 85,
    });

    setShowEvidenceModal(false);
    setEvidenceTitle("");
    setEvidenceUrl("");
    setEvidenceDesc("");
  };

  return (
    <div className="space-y-6 text-left">
      {/* Header & Subtitle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold font-display text-slate-900">
              Evidence-Based Skill Intelligence
            </h2>
            <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-bold text-indigo-700 border border-indigo-200">
              Anti-Fraud Architecture
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Compare claimed proficiency with faculty-verified & test-proven competency ratings.
          </p>
        </div>

        <button
          onClick={() => setShowEvidenceModal(true)}
          className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-indigo-700 transition-colors shrink-0"
          id="btn-submit-new-evidence"
        >
          <Plus className="h-4 w-4" />
          Submit Skill Evidence
        </button>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              filterCategory === cat
                ? "bg-slate-900 text-white"
                : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Claimed vs Verified Matrix Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                <th className="p-4">Skill & Category</th>
                <th className="p-4">Claimed Level</th>
                <th className="p-4">Verified Level</th>
                <th className="p-4">Evidence & Proofs</th>
                <th className="p-4">Decay Index</th>
                <th className="p-4">Cryptographic Hash</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredSkills.map((skill) => (
                <tr key={skill.skillId} className="hover:bg-slate-50/70 transition-colors">
                  {/* Skill Name */}
                  <td className="p-4">
                    <div className="font-bold text-slate-900 text-sm">{skill.skillName}</div>
                    <span className="text-[10px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full inline-block mt-0.5">
                      {skill.category}
                    </span>
                  </td>

                  {/* Claimed Level */}
                  <td className="p-4">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((lvl) => (
                        <span
                          key={lvl}
                          className={`h-2.5 w-2.5 rounded-full ${
                            lvl <= skill.claimedLevel ? "bg-slate-600" : "bg-slate-200"
                          }`}
                        />
                      ))}
                      <span className="ml-1.5 font-bold text-slate-700">Lvl {skill.claimedLevel}</span>
                    </div>
                  </td>

                  {/* Verified Level */}
                  <td className="p-4">
                    {skill.verifiedLevel > 0 ? (
                      <div className="flex items-center gap-1.5">
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((lvl) => (
                            <span
                              key={lvl}
                              className={`h-2.5 w-2.5 rounded-full ${
                                lvl <= skill.verifiedLevel ? "bg-emerald-500" : "bg-slate-200"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-extrabold text-emerald-700 border border-emerald-200">
                          <CheckCircle2 className="h-3 w-3" />
                          Lvl {skill.verifiedLevel}
                        </span>
                      </div>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-bold text-amber-700 border border-amber-200">
                        <AlertCircle className="h-3 w-3" />
                        Unverified
                      </span>
                    )}
                  </td>

                  {/* Evidence Count */}
                  <td className="p-4">
                    <button
                      onClick={() => setSelectedSkill(skill)}
                      className="font-bold text-indigo-600 hover:text-indigo-800 hover:underline flex items-center gap-1"
                    >
                      <Layers className="h-3.5 w-3.5" />
                      {skill.evidenceList.length} artifact(s)
                    </button>
                  </td>

                  {/* Decay */}
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            skill.decayPercentage > 15 ? "bg-amber-500" : "bg-slate-300"
                          }`}
                          style={{ width: `${Math.min(100, skill.decayPercentage * 4)}%` }}
                        />
                      </div>
                      <span
                        className={`text-[11px] font-semibold ${
                          skill.decayPercentage > 15 ? "text-amber-700 font-bold" : "text-slate-500"
                        }`}
                      >
                        {skill.decayPercentage}%
                      </span>
                    </div>
                  </td>

                  {/* Blockchain Hash */}
                  <td className="p-4">
                    <span className="font-mono text-[10px] text-slate-500 bg-slate-100 px-2 py-1 rounded">
                      {skill.blockchainHash.slice(0, 10)}...{skill.blockchainHash.slice(-6)}
                    </span>
                  </td>

                  {/* Action */}
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setSelectedSkill(skill)}
                        className="rounded-lg border border-slate-200 px-2.5 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-100"
                      >
                        View Proofs
                      </button>
                      <button
                        onClick={() => onTakeAssessment(skill.skillId)}
                        className="rounded-lg bg-indigo-50 border border-indigo-200 px-2.5 py-1 text-xs font-bold text-indigo-700 hover:bg-indigo-100"
                      >
                        Upgrade Level
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Proof Inspection Modal */}
      {selectedSkill && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="w-full max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl animate-in fade-in duration-150">
            <div className="flex items-start justify-between pb-4 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-slate-900">
                    Evidence Portfolio: {selectedSkill.skillName}
                  </h3>
                  <span className="rounded-md bg-indigo-50 px-2 py-0.5 text-[10px] font-bold text-indigo-700">
                    Verified Lvl {selectedSkill.verifiedLevel}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5 font-mono">
                  SHA-256 Stamp: {selectedSkill.blockchainHash}
                </p>
              </div>
              <button
                onClick={() => setSelectedSkill(null)}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-4 space-y-3 max-h-96 overflow-y-auto">
              {selectedSkill.evidenceList.length === 0 ? (
                <div className="rounded-xl border border-dashed border-slate-300 p-8 text-center">
                  <AlertCircle className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                  <p className="text-xs font-bold text-slate-700">No verified evidence uploaded yet.</p>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Submit a GitHub repository link or lab report to earn faculty verification.
                  </p>
                </div>
              ) : (
                selectedSkill.evidenceList.map((ev) => (
                  <div
                    key={ev.id}
                    className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 space-y-2"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[10px] font-bold text-indigo-700 uppercase tracking-wider">
                          {ev.evidenceType}
                        </span>
                        <h4 className="text-sm font-bold text-slate-900">{ev.title}</h4>
                      </div>
                      <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-extrabold text-emerald-800">
                        {ev.verificationLevel}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600">{ev.description}</p>

                    <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-500">
                      <span>Endorsed by: <strong className="text-slate-700">{ev.verifiedBy || "Pending Review"}</strong></span>
                      <a
                        href={ev.url}
                        target="_blank"
                        rel="noreferrer"
                        className="font-bold text-indigo-600 hover:underline flex items-center gap-1"
                      >
                        Inspect Artifact <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setSelectedSkill(null)}
                className="rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white hover:bg-slate-800"
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Submit Evidence Modal */}
      {showEvidenceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl animate-in fade-in duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">Submit Skill Proof Artifact</h3>
              <button
                onClick={() => setShowEvidenceModal(false)}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitEvidence} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Target Skill</label>
                <select
                  value={evidenceSkillId}
                  onChange={(e) => setEvidenceSkillId(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs text-slate-800 focus:border-indigo-500 focus:outline-none"
                >
                  {profile.skills.map((s) => (
                    <option key={s.skillId} value={s.skillId}>
                      {s.skillName} ({s.category})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Evidence Type</label>
                <select
                  value={evidenceType}
                  onChange={(e) => setEvidenceType(e.target.value as EvidenceType)}
                  className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs text-slate-800 focus:border-indigo-500 focus:outline-none"
                >
                  <option value="GITHUB_REPO">GitHub Repository (Code & Unit Tests)</option>
                  <option value="LIVE_DEPLOYMENT">Production Live Deployment URL</option>
                  <option value="FACULTY_LAB">College Lab Assignment / Capstone</option>
                  <option value="HACKATHON_AWARD">Hackathon Project Submission</option>
                  <option value="CERTIFICATION">Proctored Industry Certification</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Artifact Title</label>
                <input
                  type="text"
                  placeholder="e.g. Distributed Rate Limiter in Go / Node.js"
                  value={evidenceTitle}
                  onChange={(e) => setEvidenceTitle(e.target.value)}
                  required
                  className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs text-slate-800 focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Public URL / Repo Link</label>
                <input
                  type="url"
                  placeholder="https://github.com/..."
                  value={evidenceUrl}
                  onChange={(e) => setEvidenceUrl(e.target.value)}
                  required
                  className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs text-slate-800 focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Technical Architecture & Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Explain what you implemented, key algorithms used, and test benchmarks achieved..."
                  value={evidenceDesc}
                  onChange={(e) => setEvidenceDesc(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs text-slate-800 focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowEvidenceModal(false)}
                  className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-indigo-600 px-5 py-2 text-xs font-bold text-white hover:bg-indigo-700 shadow-sm"
                >
                  Send for Faculty Verification
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
