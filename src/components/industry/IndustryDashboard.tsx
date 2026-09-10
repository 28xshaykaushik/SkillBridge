import React from "react";
import { Opportunity, StudentProfile, IndustryChallenge } from "../../types";
import {
  Users,
  Briefcase,
  Trophy,
  CheckCircle2,
  TrendingUp,
  Search,
  PlusCircle,
  ArrowRight,
  ShieldCheck,
  Building2,
  ChevronRight,
} from "lucide-react";

interface IndustryDashboardProps {
  opportunities: Opportunity[];
  challenges: IndustryChallenge[];
  onNavigateTab: (tab: string) => void;
}

export const IndustryDashboard: React.FC<IndustryDashboardProps> = ({
  opportunities,
  challenges,
  onNavigateTab,
}) => {
  return (
    <div className="space-y-6 text-left">
      {/* Top Banner */}
      <div className="rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/30 px-3 py-1 text-xs font-semibold text-blue-200 border border-blue-400/30">
            <ShieldCheck className="h-3.5 w-3.5 text-blue-300" />
            <span>Microsoft IDC Talent Command • Zero-Fraud Candidate Pipeline</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display">
            Welcome, Rohan Verma
          </h1>
          <p className="text-sm text-blue-200/90 max-w-xl">
            Directly discover students with cryptographic evidence-backed competencies verified by premier academic faculty.
          </p>
        </div>
      </div>

      {/* Recruiter Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          onClick={() => onNavigateTab("CANDIDATE_SEARCH")}
          className="cursor-pointer rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:border-blue-400 hover:shadow-md transition-all"
        >
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold">Active Verified Pool</span>
            <Users className="h-4 w-4 text-blue-600" />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-slate-900">1,420</span>
            <span className="text-xs text-emerald-600 font-bold">+18 today</span>
          </div>
          <p className="mt-1 text-[11px] text-slate-500">Level 3+ verified candidates</p>
        </div>

        <div
          onClick={() => onNavigateTab("POST_OPPORTUNITY")}
          className="cursor-pointer rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:border-blue-400 hover:shadow-md transition-all"
        >
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold">Active Listings</span>
            <Briefcase className="h-4 w-4 text-indigo-600" />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-slate-900">{opportunities.length}</span>
            <span className="text-xs text-indigo-600 font-semibold">Roles open</span>
          </div>
          <p className="mt-1 text-[11px] text-slate-500">Auto-matched with students</p>
        </div>

        <div
          onClick={() => onNavigateTab("CHALLENGES_MANAGER")}
          className="cursor-pointer rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:border-blue-400 hover:shadow-md transition-all"
        >
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold">Enterprise Challenges</span>
            <Trophy className="h-4 w-4 text-amber-500" />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-slate-900">{challenges.length}</span>
            <span className="text-xs text-amber-600 font-bold">142 submissions</span>
          </div>
          <p className="mt-1 text-[11px] text-slate-500">AI automated grading active</p>
        </div>

        <div
          onClick={() => onNavigateTab("TALENT_POOL")}
          className="cursor-pointer rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:border-blue-400 hover:shadow-md transition-all"
        >
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold">Shortlisted Talent</span>
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-slate-900">24</span>
            <span className="text-xs text-emerald-600 font-semibold">Ready for interview</span>
          </div>
          <p className="mt-1 text-[11px] text-slate-500">92% average match score</p>
        </div>
      </div>

      {/* Main Grid: Active Roles & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-900">Your Active Talent Openings</h3>
              <p className="text-xs text-slate-500">Candidate applicants are pre-filtered by skill proof graphs</p>
            </div>
            <button
              onClick={() => onNavigateTab("POST_OPPORTUNITY")}
              className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
            >
              Post New <PlusCircle className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {opportunities.map((opp) => (
              <div key={opp.id} className="py-3.5 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{opp.title}</h4>
                  <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-500">
                    <span>{opp.location}</span>
                    <span>•</span>
                    <span>{opp.stipendOrSalary}</span>
                    <span>•</span>
                    <span className="text-emerald-600 font-bold">{opp.applicantCount} applicants</span>
                  </div>
                </div>

                <button
                  onClick={() => onNavigateTab("CANDIDATE_SEARCH")}
                  className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-1"
                >
                  Inspect Candidates <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right Col: Quick Sourcing Tool */}
        <div className="rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50/70 to-white p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-blue-900">
            <Search className="h-4 w-4" />
            <h3 className="text-sm font-bold">Fast-Track Talent Sourcing</h3>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Eliminate first-round screening tests. Search students with certified proof of competency directly in production technologies.
          </p>

          <div className="space-y-2 pt-2">
            <button
              onClick={() => onNavigateTab("CANDIDATE_SEARCH")}
              className="w-full flex items-center justify-between rounded-xl bg-blue-600 p-3 text-xs font-bold text-white hover:bg-blue-700 shadow-sm"
              id="btn-recruiter-search-candidates"
            >
              <span>Search Verified Candidates</span>
              <ArrowRight className="h-4 w-4" />
            </button>

            <button
              onClick={() => onNavigateTab("CHALLENGES_MANAGER")}
              className="w-full flex items-center justify-between rounded-xl border border-blue-200 bg-white p-3 text-xs font-bold text-blue-700 hover:bg-blue-50"
            >
              <span>Manage Hackathons & Challenges</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
