import React from "react";
import { StudentProfile } from "../../types";
import {
  Award,
  CheckSquare,
  AlertTriangle,
  GraduationCap,
  TrendingUp,
  BarChart3,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";

interface FacultyDashboardProps {
  students: StudentProfile[];
  pendingCount: number;
  onNavigateTab: (tab: string) => void;
}

export const FacultyDashboard: React.FC<FacultyDashboardProps> = ({
  students,
  pendingCount,
  onNavigateTab,
}) => {
  const avgReadiness = Math.round(
    students.reduce((acc, s) => acc + s.readinessScore, 0) / (students.length || 1)
  );

  const atRiskStudents = students.filter((s) => s.readinessScore < 75 || s.skills.some((sk) => sk.decayPercentage > 15));

  return (
    <div className="space-y-6 text-left">
      {/* Top Banner */}
      <div className="rounded-2xl border border-emerald-100 bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/30 px-3 py-1 text-xs font-semibold text-emerald-200 border border-emerald-400/30">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-300" />
            <span>Academic Skill Authority • Department of Computer Science & Engineering</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display">
            Welcome, Dr. K. Ramanathan
          </h1>
          <p className="text-sm text-emerald-200/90 max-w-xl">
            Systems Lab Lead. Review student technical artifacts, assign verified competency ratings, and monitor student cohort progression.
          </p>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          onClick={() => onNavigateTab("VERIFICATION_QUEUE")}
          className="cursor-pointer rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:border-emerald-400 hover:shadow-md transition-all"
        >
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold">Pending Verifications</span>
            <CheckSquare className="h-4 w-4 text-emerald-600" />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-slate-900">{pendingCount}</span>
            <span className="text-xs text-rose-600 font-bold">Needs review</span>
          </div>
          <p className="mt-1 text-[11px] text-slate-500">Lab & GitHub submissions</p>
        </div>

        <div
          onClick={() => onNavigateTab("STUDENTS_PROGRESS")}
          className="cursor-pointer rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:border-emerald-400 hover:shadow-md transition-all"
        >
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold">Monitored Students</span>
            <GraduationCap className="h-4 w-4 text-indigo-600" />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-slate-900">{students.length}</span>
            <span className="text-xs text-indigo-600 font-semibold">B.Tech 3rd/4th yr</span>
          </div>
          <p className="mt-1 text-[11px] text-slate-500">CSE Department cohort</p>
        </div>

        <div
          onClick={() => onNavigateTab("SKILL_ANALYTICS")}
          className="cursor-pointer rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:border-emerald-400 hover:shadow-md transition-all"
        >
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold">Cohort Avg Readiness</span>
            <TrendingUp className="h-4 w-4 text-blue-600" />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-slate-900">{avgReadiness}%</span>
            <span className="text-xs text-emerald-600 font-bold">+5% vs last sem</span>
          </div>
          <p className="mt-1 text-[11px] text-slate-500">Top 10% in North Zone</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold">Decay / At-Risk Count</span>
            <AlertTriangle className="h-4 w-4 text-amber-500" />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-slate-900">{atRiskStudents.length}</span>
            <span className="text-xs text-amber-600 font-semibold">Decaying skills</span>
          </div>
          <p className="mt-1 text-[11px] text-slate-500">Action: Trigger test re-take</p>
        </div>
      </div>

      {/* Main Grid: Pending Queue preview & Cohort overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-900">Immediate Verification Queue</h3>
              <p className="text-xs text-slate-500">Submissions awaiting faculty assessment and cryptographic stamping</p>
            </div>
            <button
              onClick={() => onNavigateTab("VERIFICATION_QUEUE")}
              className="text-xs font-bold text-emerald-600 hover:underline flex items-center gap-1"
            >
              Open Full Queue <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 space-y-3 text-xs">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                  Lab & Code Repo Evidence
                </span>
                <h4 className="text-sm font-bold text-slate-900 mt-1">
                  Kubernetes Cluster Helm Deployment
                </h4>
                <p className="text-slate-600 mt-0.5">
                  Student: <strong className="text-slate-900">Priya Sharma</strong> (IIT Delhi • CSE)
                </p>
              </div>
              <span className="text-[11px] text-slate-500">Submitted 2 hrs ago</span>
            </div>

            <p className="text-slate-600 leading-relaxed text-[11px]">
              &quot;Implemented production-grade ingress controller, cert-manager auto-provisioning, and horizontal pod autoscaler metrics.&quot;
            </p>

            <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between">
              <span className="text-[11px] text-slate-500 font-mono">
                Target Skill: <strong>Kubernetes</strong> (Claimed: Level 3)
              </span>
              <button
                onClick={() => onNavigateTab("VERIFICATION_QUEUE")}
                className="rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-emerald-700"
              >
                Review & Stamp
              </button>
            </div>
          </div>
        </div>

        {/* Right Col: Cohort Health */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <div className="pb-3 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-900">At-Risk Skill Intervention</h3>
            <p className="text-xs text-slate-500 mt-0.5">Students with decaying verified indices</p>
          </div>

          <div className="space-y-3">
            {atRiskStudents.slice(0, 3).map((st) => (
              <div key={st.id} className="rounded-xl border border-amber-100 bg-amber-50/50 p-3 text-xs">
                <div className="flex items-center justify-between font-bold text-slate-900">
                  <span>{st.name}</span>
                  <span className="text-amber-700">{st.readinessScore}/100</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Docker skill decayed by 18%. Recommend 15-min assessment.
                </p>
              </div>
            ))}
          </div>

          <button
            onClick={() => onNavigateTab("STUDENTS_PROGRESS")}
            className="w-full rounded-xl border border-slate-200 p-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 text-center"
          >
            View All Cohort Students
          </button>
        </div>
      </div>
    </div>
  );
};
