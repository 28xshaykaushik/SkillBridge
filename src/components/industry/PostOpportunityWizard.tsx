import React, { useState } from "react";
import { Opportunity } from "../../types";
import { PlusCircle, CheckCircle2, Briefcase, Sparkles, Building2, MapPin } from "lucide-react";

interface PostOpportunityWizardProps {
  onAddOpportunity: (opp: Opportunity) => void;
  onNavigateTab: (tab: string) => void;
}

export const PostOpportunityWizard: React.FC<PostOpportunityWizardProps> = ({
  onAddOpportunity,
  onNavigateTab,
}) => {
  const [title, setTitle] = useState("");
  const [companyName, setCompanyName] = useState("Microsoft IDC");
  const [type, setType] = useState<"INTERNSHIP" | "FULL_TIME">("INTERNSHIP");
  const [location, setLocation] = useState("Bangalore, India");
  const [workMode, setWorkMode] = useState<"REMOTE" | "HYBRID" | "ON_SITE">("HYBRID");
  const [stipendOrSalary, setStipendOrSalary] = useState("₹1,25,000/mo");
  const [skillsInput, setSkillsInput] = useState("React, TypeScript, Node.js, Kubernetes");
  const [description, setDescription] = useState(
    "Join Microsoft IDC's Cloud & Enterprise team to build high-scale distributed backend systems and developer tooling."
  );
  const [postedSuccess, setPostedSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !companyName) return;

    const newOpp: Opportunity = {
      id: "opp-" + Date.now(),
      title,
      companyName,
      type,
      location,
      workMode,
      stipendOrSalary,
      requiredSkills: skillsInput.split(",").map((s) => s.trim()),
      minVerifiedLevel: 3,
      description,
      matchScore: 92,
      deadline: "2026-04-30",
      applicantCount: 1,
    };

    onAddOpportunity(newOpp);
    setPostedSuccess(true);
    setTimeout(() => {
      onNavigateTab("DASHBOARD");
    }, 1500);
  };

  return (
    <div className="space-y-6 text-left max-w-3xl mx-auto">
      {/* Header */}
      <div className="pb-4 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-bold font-display text-slate-900">
            Publish Verified Skill Opportunity
          </h2>
          <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-bold text-blue-700 border border-blue-200">
            Automated Skill Matching
          </span>
        </div>
        <p className="text-xs text-slate-500 mt-1">
          Post roles specifying mandatory verified levels. Candidates will be auto-matched based on faculty-stamped evidence.
        </p>
      </div>

      {postedSuccess ? (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center space-y-3">
          <div className="h-12 w-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          <h3 className="text-lg font-bold text-emerald-900">Opportunity Successfully Published!</h3>
          <p className="text-xs text-emerald-700">
            Matching candidates are receiving high-priority notifications. Redirecting to recruiter dashboard...
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Opportunity Title</label>
              <input
                type="text"
                placeholder="e.g. Distributed Cloud Backend Intern"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full rounded-xl border border-slate-200 p-2.5 text-xs text-slate-800 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Company / Team Name</label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required
                className="w-full rounded-xl border border-slate-200 p-2.5 text-xs text-slate-800 focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Role Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as any)}
                className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs text-slate-800 focus:border-blue-500 focus:outline-none"
              >
                <option value="INTERNSHIP">Internship</option>
                <option value="FULL_TIME">Full-Time (Direct Placement)</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Work Mode</label>
              <select
                value={workMode}
                onChange={(e) => setWorkMode(e.target.value as any)}
                className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs text-slate-800 focus:border-blue-500 focus:outline-none"
              >
                <option value="HYBRID">Hybrid</option>
                <option value="REMOTE">Remote</option>
                <option value="ON_SITE">On-Site</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Stipend / CTC</label>
              <input
                type="text"
                placeholder="e.g. ₹1,20,000/mo or ₹22 LPA"
                value={stipendOrSalary}
                onChange={(e) => setStipendOrSalary(e.target.value)}
                required
                className="w-full rounded-xl border border-slate-200 p-2.5 text-xs text-slate-800 focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Required Technical Competencies (Comma-separated)
            </label>
            <input
              type="text"
              placeholder="e.g. React, TypeScript, Node.js, Docker, Kubernetes"
              value={skillsInput}
              onChange={(e) => setSkillsInput(e.target.value)}
              required
              className="w-full rounded-xl border border-slate-200 p-2.5 text-xs text-slate-800 focus:border-blue-500 focus:outline-none"
            />
            <span className="text-[11px] text-slate-400 mt-0.5 block">
              SkillBridge will verify student evidence for these skills prior to forwarding candidate applications.
            </span>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Role Description & Team Mission</label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full rounded-xl border border-slate-200 p-2.5 text-xs text-slate-800 focus:border-blue-500 focus:outline-none leading-relaxed"
            />
          </div>

          <div className="pt-3 border-t border-slate-100 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => onNavigateTab("DASHBOARD")}
              className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-xl bg-blue-600 px-5 py-2 text-xs font-bold text-white hover:bg-blue-700 shadow-sm"
              id="btn-publish-opportunity"
            >
              Publish Opportunity
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
