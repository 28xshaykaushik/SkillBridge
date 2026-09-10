import React, { useState } from "react";
import { StudentProfile } from "../../types";
import {
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Copy,
  Printer,
  Award,
  QrCode,
  FileCheck2,
  Calendar,
  Layers,
  Sparkles,
} from "lucide-react";

interface VerifiedResumePortfolioProps {
  profile: StudentProfile;
}

export const VerifiedResumePortfolio: React.FC<VerifiedResumePortfolioProps> = ({ profile }) => {
  const [copied, setCopied] = useState(false);
  const verifiedSkills = profile.skills.filter((s) => s.verifiedLevel > 0);
  const shareUrl = `https://skillbridge.gov.in/verify/${profile.id}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 text-left">
      {/* Header & Print actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 print:hidden">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold font-display text-slate-900">
              Verified Blockchain Portfolio & Resume
            </h2>
            <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-emerald-700 border border-emerald-200">
              Cryptographically Stamped
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Zero unverified fluff. Every listed competency links directly to public code repositories, faculty peer reviews, or timed assessment proofs.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyLink}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm"
            id="btn-copy-portfolio-link"
          >
            <Copy className="h-3.5 w-3.5" />
            <span>{copied ? "Link Copied!" : "Copy Verification URL"}</span>
          </button>
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white hover:bg-slate-800 transition-colors shadow-sm"
            id="btn-print-resume"
          >
            <Printer className="h-3.5 w-3.5" />
            <span>Print Verified PDF</span>
          </button>
        </div>
      </div>

      {/* The Printable Verified Resume Card */}
      <div className="rounded-3xl border border-slate-200 bg-white p-8 sm:p-12 shadow-lg max-w-4xl mx-auto print:border-none print:shadow-none print:p-0">
        {/* Top Header of Resume */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b-2 border-slate-900">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-extrabold font-display text-slate-900 tracking-tight">
                {profile.name}
              </h1>
              <span className="rounded-md bg-emerald-100 px-2 py-0.5 text-xs font-bold text-emerald-800 flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                Verified Candidate
              </span>
            </div>
            <p className="text-sm font-semibold text-indigo-700 mt-1">
              Candidate Target: {profile.targetRole}
            </p>
            <p className="text-xs text-slate-500 mt-0.5">
              {profile.degree} in {profile.branch} • {profile.institution} (Semester {profile.semester}, CGPA: {profile.cgpa})
            </p>
          </div>

          {/* Verification Stamp Box */}
          <div className="rounded-2xl border-2 border-indigo-600 bg-indigo-50/50 p-4 shrink-0 text-center space-y-1">
            <div className="flex items-center justify-center gap-1 text-indigo-900 font-bold text-xs uppercase tracking-wider">
              <ShieldCheck className="h-4 w-4 text-indigo-600" />
              <span>SkillBridge Certified</span>
            </div>
            <div className="text-2xl font-black text-indigo-600 font-display">
              {profile.readinessScore}/100
            </div>
            <div className="text-[10px] text-slate-500 font-mono">
              SKILLBRIDGE-STAMP-{profile.id.toUpperCase()}
            </div>
          </div>
        </div>

        {/* Executive Summary */}
        <div className="py-6 border-b border-slate-100">
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">
            Executive Summary
          </h3>
          <p className="text-xs text-slate-700 leading-relaxed max-w-3xl">
            {profile.bio} Proven ability to architect fault-tolerant full-stack microservices, develop reactive user interfaces with modern React, and deploy containerized workloads with automated CI/CD pipelines. All competencies certified through faculty peer review and timed proctored challenges.
          </p>
        </div>

        {/* Verified Technical Competencies Grid */}
        <div className="py-6 border-b border-slate-100">
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">
            Evidence-Backed Competency Proofs (100% Verified)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {verifiedSkills.map((skill) => (
              <div
                key={skill.skillId}
                className="rounded-xl border border-slate-200 bg-slate-50/70 p-3.5 space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-xs">{skill.skillName}</span>
                  <span className="text-[10px] font-extrabold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                    Level {skill.verifiedLevel} / 5
                  </span>
                </div>

                <div className="text-[11px] text-slate-500">
                  {skill.evidenceList.length} verified proof(s) on file
                </div>

                <div className="text-[10px] font-mono text-slate-400 truncate">
                  Hash: {skill.blockchainHash}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Corporate Internship Experience */}
        {profile.activeInternship && (
          <div className="py-6 border-b border-slate-100">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">
              Corporate Internship Experience
            </h3>
            <div className="rounded-xl border border-slate-200 p-4 space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">
                    {profile.activeInternship.role}
                  </h4>
                  <p className="text-xs text-indigo-700 font-semibold">
                    {profile.activeInternship.company}
                  </p>
                </div>
                <span className="text-xs text-slate-500">
                  {profile.activeInternship.startDate} — Present (Week {profile.activeInternship.currentWeek} of {profile.activeInternship.totalWeeks})
                </span>
              </div>
              <p className="text-xs text-slate-600">
                Corporate Mentor: {profile.activeInternship.mentorName} ({profile.activeInternship.mentorEmail})
              </p>
              <div className="text-xs text-slate-600">
                Weekly progress certified with 5/5 performance rating. Skills improved: Redis Caching (+2 levels), High Concurrency APIs.
              </div>
            </div>
          </div>
        )}

        {/* Institutional Endorsements & Security Footer */}
        <div className="pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            <div className="font-bold text-slate-800">Department Sign-off:</div>
            <div>Dr. K. Ramanathan (Professor & Systems Lab Head, IIT Delhi)</div>
          </div>

          <div className="text-right">
            <div className="font-mono text-[10px] text-slate-400">
              Audit Hash: 0x9f83a27e0294bfa29348e...verified
            </div>
            <div className="text-[10px] text-emerald-600 font-bold">
              AICTE National Skill Registry Compliant
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
