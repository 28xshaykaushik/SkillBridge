import React from "react";
import { StudentProfile, Opportunity, Assessment } from "../../types";
import {
  Sparkles,
  Award,
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Briefcase,
  ExternalLink,
  Clock,
  TrendingUp,
  Building2,
  FileCheck2,
  Target,
  ChevronRight,
} from "lucide-react";

interface StudentDashboardProps {
  profile: StudentProfile;
  opportunities: Opportunity[];
  assessments: Assessment[];
  onNavigateTab: (tab: string) => void;
  onApplyOpportunity: (opp: Opportunity) => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  profile,
  opportunities,
  assessments,
  onNavigateTab,
  onApplyOpportunity,
}) => {
  const verifiedSkillsCount = profile.skills.filter((s) => s.verifiedLevel > 0).length;
  const decayingSkills = profile.skills.filter((s) => s.decayPercentage > 15);
  const topMatchedOpportunities = opportunities
    .filter((o) => (o.matchScore || 0) >= 80)
    .slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Top Banner / Welcome & Target Role */}
      <div className="rounded-2xl border border-indigo-100 bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 h-64 w-64 rounded-full bg-indigo-500/20 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full bg-indigo-500/30 px-3 py-1 text-xs font-semibold text-indigo-200 border border-indigo-400/30">
              <Sparkles className="h-3.5 w-3.5 text-indigo-300" />
              <span>National Skill Intelligence • Verified Candidate Profile</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-display">
              Welcome back, {profile.name}!
            </h1>
            <p className="text-sm text-indigo-200/90 max-w-xl">
              Targeting: <span className="font-semibold text-white">{profile.targetRole}</span> at{" "}
              {profile.institution} (Semester {profile.semester})
            </p>
          </div>

          {/* Readiness Score Ring Card */}
          <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 shrink-0">
            <div className="relative flex items-center justify-center">
              <svg className="h-20 w-20 transform -rotate-90">
                <circle
                  cx="40"
                  cy="40"
                  r="34"
                  stroke="currentColor"
                  strokeWidth="7"
                  className="text-white/20"
                  fill="transparent"
                />
                <circle
                  cx="40"
                  cy="40"
                  r="34"
                  stroke="currentColor"
                  strokeWidth="7"
                  strokeDasharray={213.6}
                  strokeDashoffset={213.6 * (1 - profile.readinessScore / 100)}
                  strokeLinecap="round"
                  className="text-emerald-400"
                  fill="transparent"
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center text-center">
                <span className="text-2xl font-black text-white">{profile.readinessScore}</span>
                <span className="text-[9px] font-bold text-emerald-300 uppercase tracking-wider">
                  Score
                </span>
              </div>
            </div>

            <div className="text-left">
              <div className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                Industry Ready
              </div>
              <div className="text-sm font-bold text-white mt-0.5">Top 8% in Cohort</div>
              <p className="text-[11px] text-indigo-200 mt-1">
                4/4 Core Competencies Verified
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Decay Alert Trigger Banner if applicable */}
      {decayingSkills.length > 0 && (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-amber-900 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-200 text-amber-800 shrink-0">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
                Skill Decay Alert
              </span>
              <p className="text-xs text-amber-900 mt-0.5">
                Your <span className="font-bold">{decayingSkills[0].skillName}</span> verification has a{" "}
                {decayingSkills[0].decayPercentage}% decay index. Pass a 15-min assessment to maintain
                Level {decayingSkills[0].claimedLevel} status.
              </p>
            </div>
          </div>
          <button
            onClick={() => onNavigateTab("ASSESSMENTS")}
            className="shrink-0 rounded-lg bg-amber-800 px-4 py-2 text-xs font-bold text-white hover:bg-amber-900 transition-colors"
            id="dash-decay-renew-btn"
          >
            Take 15-Min Test
          </button>
        </div>
      )}

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          onClick={() => onNavigateTab("SKILLS")}
          className="cursor-pointer rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:border-indigo-400 hover:shadow-md transition-all text-left"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Verified Skills</span>
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-slate-900">{verifiedSkillsCount}</span>
            <span className="text-xs text-slate-400">of {profile.skills.length} claimed</span>
          </div>
          <p className="mt-1 text-[11px] text-emerald-600 font-medium">100% faculty backed</p>
        </div>

        <div
          onClick={() => onNavigateTab("GAP_ANALYSIS")}
          className="cursor-pointer rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:border-indigo-400 hover:shadow-md transition-all text-left"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Target Role Match</span>
            <Target className="h-4 w-4 text-indigo-500" />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-slate-900">{profile.readinessScore}%</span>
            <span className="text-xs text-indigo-600 font-semibold">+6% this month</span>
          </div>
          <p className="mt-1 text-[11px] text-slate-500 font-medium">Gap: Cloud Orchestration</p>
        </div>

        <div
          onClick={() => onNavigateTab("INTERNSHIP_TRACKER")}
          className="cursor-pointer rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:border-indigo-400 hover:shadow-md transition-all text-left"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Active Internship</span>
            <Clock className="h-4 w-4 text-blue-500" />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-slate-900">
              Week {profile.activeInternship?.currentWeek || 8}
            </span>
            <span className="text-xs text-slate-400">
              of {profile.activeInternship?.totalWeeks || 12}
            </span>
          </div>
          <p className="mt-1 text-[11px] text-blue-600 font-medium truncate">
            {profile.activeInternship?.company || "Tata Digital"}
          </p>
        </div>

        <div
          onClick={() => onNavigateTab("OPPORTUNITIES")}
          className="cursor-pointer rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:border-indigo-400 hover:shadow-md transition-all text-left"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Matched Jobs</span>
            <Briefcase className="h-4 w-4 text-purple-500" />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-slate-900">{topMatchedOpportunities.length}</span>
            <span className="text-xs text-purple-600 font-semibold">&gt;80% match</span>
          </div>
          <p className="mt-1 text-[11px] text-slate-500 font-medium">Microsoft, Razorpay, Zoho</p>
        </div>
      </div>

      {/* Main Grid: Readiness Breakdown & Top Matched Opportunities */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Employability Breakdown & Active Skill Status */}
        <div className="lg:col-span-2 space-y-6">
          {/* Readiness Score Breakdown Card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm text-left">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900">Readiness Score Algorithm</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Multi-factor employability index computed from verified evidence & peer reviews
                </p>
              </div>
              <button
                onClick={() => onNavigateTab("CAREER_SIMULATOR")}
                className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
              >
                Simulate Growth <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="mt-5 space-y-4">
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-700">Verified Evidence & Code Repositories</span>
                  <span className="text-indigo-600 font-bold">
                    {profile.scoreBreakdown.verifiedSkills} / 40 pts
                  </span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-600 rounded-full"
                    style={{ width: `${(profile.scoreBreakdown.verifiedSkills / 40) * 100}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-700">Platform Proctored Assessments</span>
                  <span className="text-blue-600 font-bold">
                    {profile.scoreBreakdown.assessments} / 25 pts
                  </span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 rounded-full"
                    style={{ width: `${(profile.scoreBreakdown.assessments / 25) * 100}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-700">Real-World Hackathon & Production Projects</span>
                  <span className="text-emerald-600 font-bold">
                    {profile.scoreBreakdown.realWorldProjects} / 20 pts
                  </span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full"
                    style={{ width: `${(profile.scoreBreakdown.realWorldProjects / 20) * 100}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-700">Faculty & Department Endorsements</span>
                  <span className="text-purple-600 font-bold">
                    {profile.scoreBreakdown.facultyEndorsements} / 15 pts
                  </span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-purple-600 rounded-full"
                    style={{ width: `${(profile.scoreBreakdown.facultyEndorsements / 15) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Claimed vs Verified Snapshot Card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm text-left">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900">Skill Competency Snapshot</h3>
                <p className="text-xs text-slate-500">
                  Green indicates evidence verified by faculty or industry review
                </p>
              </div>
              <button
                onClick={() => onNavigateTab("SKILLS")}
                className="text-xs font-bold text-indigo-600 hover:underline flex items-center gap-1"
              >
                Inspect Proofs <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="mt-4 divide-y divide-slate-100">
              {profile.skills.slice(0, 5).map((skill) => (
                <div key={skill.skillId} className="py-3 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900">{skill.skillName}</span>
                      <span className="text-[10px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                        {skill.category}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-500">
                      <span>Claimed: Lvl {skill.claimedLevel}</span>
                      <span>•</span>
                      <span>{skill.evidenceCount} verified artifact(s)</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {skill.verifiedLevel > 0 ? (
                      <div className="flex items-center gap-1 rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700 border border-emerald-200">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                        <span>Verified Lvl {skill.verifiedLevel}</span>
                      </div>
                    ) : (
                      <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-500">
                        Unverified
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: Top Matched Opportunities & Quick AI Tools */}
        <div className="space-y-6">
          {/* Quick AI Tools Card */}
          <div className="rounded-2xl border border-indigo-200 bg-gradient-to-br from-indigo-50/70 to-white p-6 shadow-sm text-left">
            <div className="flex items-center gap-2 text-indigo-800">
              <Sparkles className="h-4 w-4" />
              <h3 className="text-sm font-bold">AI Skill Tools</h3>
            </div>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Powered by Gemini 3.8 Flash to accelerate your career readiness.
            </p>

            <div className="mt-4 space-y-2">
              <button
                onClick={() => onNavigateTab("AI_EXTRACTOR")}
                className="w-full flex items-center justify-between rounded-xl border border-indigo-200 bg-white p-3 text-xs font-bold text-indigo-700 hover:bg-indigo-50 transition-colors shadow-xs"
              >
                <span>AI Resume & Project Skill Parser</span>
                <ChevronRight className="h-4 w-4" />
              </button>

              <button
                onClick={() => onNavigateTab("CAREER_SIMULATOR")}
                className="w-full flex items-center justify-between rounded-xl border border-indigo-200 bg-white p-3 text-xs font-bold text-indigo-700 hover:bg-indigo-50 transition-colors shadow-xs"
              >
                <span>&quot;What-If&quot; Career Leap Simulator</span>
                <ChevronRight className="h-4 w-4" />
              </button>

              <button
                onClick={() => onNavigateTab("GAP_ANALYSIS")}
                className="w-full flex items-center justify-between rounded-xl border border-indigo-200 bg-white p-3 text-xs font-bold text-indigo-700 hover:bg-indigo-50 transition-colors shadow-xs"
              >
                <span>Role Gap Analysis & Roadmap</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Matched Opportunities Widget */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm text-left">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Recommended For You</h3>
                <p className="text-[11px] text-slate-500">Based on verified skill alignment</p>
              </div>
              <button
                onClick={() => onNavigateTab("OPPORTUNITIES")}
                className="text-xs font-bold text-indigo-600 hover:underline"
              >
                View All
              </button>
            </div>

            <div className="mt-4 space-y-3">
              {topMatchedOpportunities.map((opp) => (
                <div
                  key={opp.id}
                  className="rounded-xl border border-slate-100 bg-slate-50/70 p-3.5 hover:border-indigo-300 hover:bg-white transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-indigo-700 uppercase tracking-wider">
                        {opp.companyName}
                      </span>
                      <h4 className="text-xs font-bold text-slate-900 mt-0.5">{opp.title}</h4>
                    </div>
                    <span className="rounded-md bg-emerald-100 px-2 py-0.5 text-[10px] font-extrabold text-emerald-800">
                      {opp.matchScore}% Match
                    </span>
                  </div>

                  <div className="mt-2 flex items-center justify-between pt-2 border-t border-slate-200/60 text-[11px] text-slate-500">
                    <span>{opp.stipendOrSalary}</span>
                    <button
                      onClick={() => onApplyOpportunity(opp)}
                      className="font-bold text-indigo-600 hover:text-indigo-800 hover:underline flex items-center gap-1"
                    >
                      Quick Apply <ExternalLink className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
