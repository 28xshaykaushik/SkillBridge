import React from "react";
import { UserRole } from "../../types";
import {
  ShieldCheck,
  Sparkles,
  ArrowRight,
  GraduationCap,
  Briefcase,
  Award,
  Building2,
  Layers,
  CheckCircle2,
  FileCode2,
  TrendingUp,
  Cpu,
  Lock,
  Compass,
  FileCheck,
  ChevronRight,
  Star,
} from "lucide-react";

interface LandingPageProps {
  onSelectRole: (role: UserRole) => void;
  onExploreStudent: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onSelectRole,
  onExploreStudent,
}) => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 border-b border-slate-200/80 bg-gradient-to-b from-white via-indigo-50/30 to-slate-50">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-100/50 via-transparent to-transparent pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50/80 px-4 py-1.5 text-xs font-semibold text-indigo-700 shadow-sm mb-8 animate-in fade-in slide-in-from-top-4 duration-500">
            <span className="flex h-2 w-2 rounded-full bg-indigo-600 animate-ping" />
            <span>National Skill Intelligence Initiative</span>
            <span className="text-slate-300">•</span>
            <span>Academia–Industry Skill Intelligence Platform</span>
          </div>

          {/* Heading */}
          <h1 className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 max-w-4xl mx-auto leading-[1.15]">
            From Classroom Skills to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-700">
              Industry Readiness
            </span>
          </h1>

          {/* Tagline / Subtitle */}
          <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto font-normal leading-relaxed">
            Don&apos;t just tell students what they can apply for. Tell them what they are
            capable of, what they are missing, how to improve, and{" "}
            <span className="font-semibold text-slate-900">prove what they actually know</span>{" "}
            with cryptographic, evidence-backed skill verification.
          </p>

          {/* Primary Action Buttons */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onExploreStudent}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:shadow-indigo-300 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              id="hero-launch-student-btn"
            >
              <Sparkles className="h-4 w-4" />
              Launch Interactive Student Demo
              <ArrowRight className="h-4 w-4" />
            </button>
            <a
              href="#interactive-pillars"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm"
              id="hero-explore-architecture-btn"
            >
              Explore 5-Role Ecosystem
            </a>
          </div>

          {/* Real Metrics Counter Strip */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto text-left">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="text-3xl font-extrabold text-indigo-600 font-display">14,200+</div>
              <div className="text-xs font-semibold text-slate-700 mt-1">Verified Engineering Students</div>
              <div className="text-[11px] text-slate-400 mt-0.5">IITs, NITs, and AICTE Tier-1 colleges</div>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="text-3xl font-extrabold text-blue-600 font-display">420+</div>
              <div className="text-xs font-semibold text-slate-700 mt-1">Industry Hiring Partners</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Microsoft, Razorpay, Infosys, Zoho</div>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="text-3xl font-extrabold text-emerald-600 font-display">99.4%</div>
              <div className="text-xs font-semibold text-slate-700 mt-1">Evidence Verification Rate</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Zero unverified resume exaggerations</div>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="text-3xl font-extrabold text-purple-600 font-display">₹22.4 LPA</div>
              <div className="text-xs font-semibold text-slate-700 mt-1">Average Cloud Role CTC</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Direct hiring via skill matching</div>
            </div>
          </div>
        </div>
      </section>

      {/* The 4-Pillar Continuous Bridge Diagram */}
      <section id="interactive-pillars" className="py-20 bg-white border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">The Continuous Bridge</span>
            <h2 className="text-3xl font-bold font-display text-slate-900 mt-2">
              A 360° Closed-Loop Ecosystem
            </h2>
            <p className="text-slate-600 text-sm mt-3">
              SkillBridge replaces static PDF resumes with dynamic, verified skill proof graphs connecting every key stakeholder.
            </p>
          </div>

          {/* Interactive 5-Role Launcher Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {/* Student */}
            <div
              onClick={() => onSelectRole("STUDENT")}
              className="group cursor-pointer rounded-2xl border border-slate-200 bg-white p-5 transition-all hover:border-indigo-500 hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between"
              id="role-card-student"
            >
              <div>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  <GraduationCap className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-base font-bold text-slate-900">1. Student Portal</h3>
                <p className="mt-2 text-xs text-slate-500 leading-relaxed">
                  Skill evidence linking, AI gap engine, What-If career simulator, and verified credentials.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-indigo-600">
                <span>Enter as Student</span>
                <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Industry */}
            <div
              onClick={() => onSelectRole("INDUSTRY")}
              className="group cursor-pointer rounded-2xl border border-slate-200 bg-white p-5 transition-all hover:border-blue-500 hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between"
              id="role-card-industry"
            >
              <div>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Briefcase className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-base font-bold text-slate-900">2. Industry & Recruiter</h3>
                <p className="mt-2 text-xs text-slate-500 leading-relaxed">
                  Filter candidates by verified skill levels, inspect GitHub repos, and post enterprise challenges.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600">
                <span>Enter as Recruiter</span>
                <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Faculty */}
            <div
              onClick={() => onSelectRole("FACULTY")}
              className="group cursor-pointer rounded-2xl border border-slate-200 bg-white p-5 transition-all hover:border-emerald-500 hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between"
              id="role-card-faculty"
            >
              <div>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                  <Award className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-base font-bold text-slate-900">3. Faculty Mentor</h3>
                <p className="mt-2 text-xs text-slate-500 leading-relaxed">
                  Verify lab artifacts, monitor at-risk students, review internship logs, and certify competencies.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-600">
                <span>Enter as Faculty</span>
                <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Institution */}
            <div
              onClick={() => onSelectRole("INSTITUTION")}
              className="group cursor-pointer rounded-2xl border border-slate-200 bg-white p-5 transition-all hover:border-purple-500 hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between"
              id="role-card-institution"
            >
              <div>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50 text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                  <Building2 className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-base font-bold text-slate-900">4. Institution / TPO</h3>
                <p className="mt-2 text-xs text-slate-500 leading-relaxed">
                  Institutional skill heatmaps, industry demand vs student supply analytics, and bootcamp tracking.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-purple-600">
                <span>Enter as TPO</span>
                <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Admin */}
            <div
              onClick={() => onSelectRole("ADMIN")}
              className="group cursor-pointer rounded-2xl border border-slate-200 bg-white p-5 transition-all hover:border-amber-500 hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between"
              id="role-card-admin"
            >
              <div>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-600 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                  <Layers className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-base font-bold text-slate-900">5. Platform Admin</h3>
                <p className="mt-2 text-xs text-slate-500 leading-relaxed">
                  System health metrics, national skill taxonomy curation, opportunity moderation, and audit logs.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-amber-600">
                <span>Enter as Admin</span>
                <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>

          {/* Workflow Diagram */}
          <div className="mt-16 rounded-3xl border border-slate-200 bg-slate-900 text-white p-8 sm:p-12 relative overflow-hidden">
            <div className="relative z-10 max-w-4xl mx-auto">
              <div className="text-center mb-10">
                <span className="text-xs font-bold tracking-widest uppercase text-indigo-400">
                  How SkillBridge Solves The Employability Paradox
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold font-display mt-2">
                  From Claims to Cryptographic Proof in 4 Steps
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
                <div className="bg-slate-800/80 rounded-2xl p-5 border border-slate-700/60">
                  <div className="text-indigo-400 font-bold text-sm mb-2">Step 01</div>
                  <h4 className="font-bold text-white text-base">Claim & Evidence</h4>
                  <p className="text-xs text-slate-400 mt-2">
                    Student submits GitHub repositories, live deployments, lab projects, or hackathon links.
                  </p>
                </div>
                <div className="bg-slate-800/80 rounded-2xl p-5 border border-slate-700/60">
                  <div className="text-emerald-400 font-bold text-sm mb-2">Step 02</div>
                  <h4 className="font-bold text-white text-base">Faculty Peer Review</h4>
                  <p className="text-xs text-slate-400 mt-2">
                    College faculty inspects code quality and assigns verified competency level (1-5).
                  </p>
                </div>
                <div className="bg-slate-800/80 rounded-2xl p-5 border border-slate-700/60">
                  <div className="text-blue-400 font-bold text-sm mb-2">Step 03</div>
                  <h4 className="font-bold text-white text-base">AI Gap & Simulator</h4>
                  <p className="text-xs text-slate-400 mt-2">
                    Gemini AI compares verified skills against live industry requirements and charts personalized milestones.
                  </p>
                </div>
                <div className="bg-slate-800/80 rounded-2xl p-5 border border-slate-700/60">
                  <div className="text-purple-400 font-bold text-sm mb-2">Step 04</div>
                  <h4 className="font-bold text-white text-base">Matched Hiring</h4>
                  <p className="text-xs text-slate-400 mt-2">
                    Recruiters hire based on verified skill proof graphs with 0% resume fraud and guaranteed readiness.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Technology Features */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">Enterprise Engineering</span>
            <h2 className="text-3xl font-bold font-display text-slate-900 mt-2">
              Deep Intelligence Under The Hood
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 mb-4">
                <Cpu className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Gemini AI Skill Extraction</h3>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                Automatically parses unstructured resumes, GitHub commit histories, and project descriptions into structured skill taxonomies with confidence scoring.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 mb-4">
                <Lock className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Cryptographic Hash Verification</h3>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                Every verified competency generates a tamper-proof SHA-256 digital stamp, ensuring credentials cannot be fabricated or modified post-endorsement.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600 mb-4">
                <Compass className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">What-If Career Simulator</h3>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                Students can model potential learning investments (&quot;What if I learn Kubernetes?&quot;) and see real-time salary projections and unlocked opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-12 border-t border-slate-200 text-center">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-2 mb-3">
            <ShieldCheck className="h-6 w-6 text-indigo-600" />
            <span className="font-display font-bold text-lg text-slate-900">
              Skill<span className="text-indigo-600">Bridge</span>
            </span>
          </div>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            SkillBridge Academia–Industry Skill Intelligence Platform. Built for AICTE, Ministry of Education, and National Technical Institutions.
          </p>
          <div className="mt-6 flex justify-center gap-6 text-xs text-slate-400">
            <span>Enterprise Architecture</span>
            <span>•</span>
            <span>Role-Based Access Control</span>
            <span>•</span>
            <span>Gemini 3.8 Flash Powered</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
