import React from "react";
import { UserRole } from "../../types";
import {
  LayoutDashboard,
  Cpu,
  Target,
  FileSearch,
  Sparkles,
  Award,
  Briefcase,
  Flame,
  FileBadge,
  Clock,
  Search,
  PlusCircle,
  Trophy,
  Users,
  CheckSquare,
  BarChart3,
  Building,
  GraduationCap,
  TrendingUp,
  Shield,
  Key,
  BookOpen,
} from "lucide-react";

export type StudentTab =
  | "DASHBOARD"
  | "SKILLS"
  | "GAP_ANALYSIS"
  | "AI_EXTRACTOR"
  | "CAREER_SIMULATOR"
  | "ASSESSMENTS"
  | "OPPORTUNITIES"
  | "CHALLENGES"
  | "INTERNSHIP_TRACKER"
  | "VERIFIED_PORTFOLIO";

export type IndustryTab =
  | "DASHBOARD"
  | "CANDIDATE_SEARCH"
  | "POST_OPPORTUNITY"
  | "CHALLENGES_MANAGER"
  | "TALENT_POOL";

export type FacultyTab =
  | "DASHBOARD"
  | "VERIFICATION_QUEUE"
  | "STUDENTS_PROGRESS"
  | "SKILL_ANALYTICS"
  | "INTERNSHIP_MONITOR";

export type InstitutionTab =
  | "DASHBOARD"
  | "SKILL_HEATMAP"
  | "TRAINING_PROGRAMS"
  | "PLACEMENT_CORRELATION"
  | "INDUSTRY_MOUS";

export type AdminTab =
  | "COMMAND_CENTER"
  | "USER_MANAGEMENT"
  | "SKILL_TAXONOMY"
  | "AUDIT_LOGS";

interface NavItem {
  id: string;
  label: string;
  icon: any;
  section: "CORE" | "PHASE2";
  badge?: string;
  highlight?: boolean;
  alert?: string;
  count?: number;
}

interface SidebarProps {
  currentRole: UserRole;
  activeTab: string;
  onTabChange: (tab: string) => void;
  pendingVerificationsCount?: number;
  decayAlertsCount?: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentRole,
  activeTab,
  onTabChange,
  pendingVerificationsCount = 1,
  decayAlertsCount = 1,
}) => {
  const getNavItems = (): NavItem[] => {
    switch (currentRole) {
      case "STUDENT":
        return [
          // CORE WORKING MODULES
          { id: "DASHBOARD", label: "Readiness Dashboard", icon: LayoutDashboard, section: "CORE" },
          { id: "SKILLS", label: "Skill Intelligence", icon: Cpu, badge: "Proof-backed", section: "CORE" },
          { id: "GAP_ANALYSIS", label: "AI Skill Gap & Roadmap", icon: Target, highlight: true, section: "CORE" },
          { id: "ASSESSMENTS", label: "Verified Assessments", icon: Award, alert: decayAlertsCount > 0 ? "Renew" : undefined, section: "CORE" },
          { id: "OPPORTUNITIES", label: "Matched Opportunities", icon: Briefcase, section: "CORE" },
          
          // PHASE 2 ROADMAP
          { id: "AI_EXTRACTOR", label: "AI Resume & Syllabus Parser", icon: FileSearch, section: "PHASE2" },
          { id: "CAREER_SIMULATOR", label: "What-If Simulator", icon: Sparkles, section: "PHASE2" },
          { id: "CHALLENGES", label: "Corporate Hackathon Arena", icon: Flame, section: "PHASE2" },
          { id: "INTERNSHIP_TRACKER", label: "Dual-Mentor Logbook", icon: Clock, section: "PHASE2" },
          { id: "VERIFIED_PORTFOLIO", label: "Verified Portfolio & Hash", icon: FileBadge, section: "PHASE2" },
        ];
      case "INDUSTRY":
        return [
          { id: "DASHBOARD", label: "Recruiter Command", icon: LayoutDashboard, section: "CORE" },
          { id: "CANDIDATE_SEARCH", label: "Verified Talent Search", icon: Search, badge: "Anti-fraud", section: "CORE" },
          { id: "POST_OPPORTUNITY", label: "Post Opportunity", icon: PlusCircle, section: "CORE" },
          { id: "CHALLENGES_MANAGER", label: "Hackathon Challenges", icon: Trophy, section: "PHASE2" },
          { id: "TALENT_POOL", label: "Shortlisted Candidates", icon: Users, section: "PHASE2" },
        ];
      case "FACULTY":
        return [
          { id: "DASHBOARD", label: "Faculty Overview", icon: LayoutDashboard, section: "CORE" },
          {
            id: "VERIFICATION_QUEUE",
            label: "Verification Queue",
            icon: CheckSquare,
            count: pendingVerificationsCount,
            section: "CORE",
          },
          { id: "STUDENTS_PROGRESS", label: "Assigned Students", icon: GraduationCap, section: "CORE" },
          { id: "SKILL_ANALYTICS", label: "Cohort Analytics", icon: BarChart3, section: "PHASE2" },
          { id: "INTERNSHIP_MONITOR", label: "Internship Monitor", icon: Clock, section: "PHASE2" },
        ];
      case "INSTITUTION":
        return [
          { id: "DASHBOARD", label: "Institutional Overview", icon: LayoutDashboard, section: "CORE" },
          { id: "SKILL_HEATMAP", label: "Skill Demand vs Supply", icon: BarChart3, badge: "AICTE Aligned", section: "PHASE2" },
          { id: "TRAINING_PROGRAMS", label: "Bootcamps & Upskilling", icon: BookOpen, section: "PHASE2" },
          { id: "PLACEMENT_CORRELATION", label: "Placement Intelligence", icon: TrendingUp, section: "PHASE2" },
          { id: "INDUSTRY_MOUS", label: "Corporate Partners", icon: Building, section: "PHASE2" },
        ];
      case "ADMIN":
        return [
          { id: "COMMAND_CENTER", label: "System Health & Metrics", icon: LayoutDashboard, section: "CORE" },
          { id: "USER_MANAGEMENT", label: "User RBAC & Tenants", icon: Users, section: "PHASE2" },
          { id: "SKILL_TAXONOMY", label: "Skill Taxonomy & Roles", icon: Key, section: "PHASE2" },
          { id: "AUDIT_LOGS", label: "Security & Audit Trail", icon: Shield, section: "PHASE2" },
        ];
    }
  };

  const navItems = getNavItems();
  const coreItems = navItems.filter((i) => i.section === "CORE");
  const phase2Items = navItems.filter((i) => i.section === "PHASE2");

  return (
    <aside className="w-full md:w-64 shrink-0 border-r border-slate-200 bg-white/80 md:min-h-[calc(100vh-4rem)] p-4 flex flex-col justify-between">
      <div className="space-y-5">
        {/* Core Navigation Section */}
        <div>
          <div className="px-3 flex items-center justify-between mb-2">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-indigo-700 flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              Core Modules
            </span>
            <span className="rounded bg-indigo-50 px-1.5 py-0.2 text-[9px] font-bold text-indigo-700">
              Active
            </span>
          </div>
          <nav className="space-y-1">
            {coreItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  id={`side-nav-${item.id.toLowerCase()}`}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all text-left ${
                    isActive
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-200 font-bold"
                      : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <Icon className={`h-4 w-4 shrink-0 ${isActive ? "text-white" : "text-indigo-600"}`} />
                    <span className="truncate">{item.label}</span>
                  </div>

                  <div className="flex items-center gap-1.5 ml-2">
                    {item.badge && (
                      <span
                        className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md ${
                          isActive
                            ? "bg-indigo-500/50 text-white"
                            : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                    {item.alert && (
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-md bg-amber-100 text-amber-800">
                        {item.alert}
                      </span>
                    )}
                    {item.count !== undefined && item.count > 0 && (
                      <span
                        className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ${
                          isActive
                            ? "bg-white text-indigo-700"
                            : "bg-rose-500 text-white"
                        }`}
                      >
                        {item.count}
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Extended Scope Section */}
        {phase2Items.length > 0 && (
          <div className="pt-3 border-t border-slate-200/80">
            <div className="px-3 flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Extended Modules
              </span>
              <span className="rounded bg-slate-100 px-1.5 py-0.2 text-[9px] font-bold text-slate-500">
                Roadmap
              </span>
            </div>
            <nav className="space-y-1">
              {phase2Items.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onTabChange(item.id)}
                    id={`side-nav-${item.id.toLowerCase()}`}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all text-left ${
                      isActive
                        ? "bg-slate-800 text-white font-bold"
                        : "text-slate-500 hover:bg-slate-100/70 hover:text-slate-800"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <Icon className={`h-3.5 w-3.5 shrink-0 ${isActive ? "text-white" : "text-slate-400"}`} />
                      <span className="truncate text-[11px]">{item.label}</span>
                    </div>
                    <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-slate-100 text-slate-500 group-hover:bg-slate-200">
                      Phase 2
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>
        )}
      </div>

      {/* Role Context Card in Sidebar footer */}
      <div className="mt-6 rounded-xl border border-indigo-100 bg-indigo-50/40 p-3">
        <div className="flex items-center gap-2 text-indigo-900">
          <Shield className="h-4 w-4 text-indigo-600" />
          <span className="text-xs font-bold">Skill Intelligence Platform</span>
        </div>
        <p className="mt-1 text-[11px] text-indigo-700/80 leading-normal">
          Evidence-backed closed-loop competency verification and AI skill intelligence roadmap.
        </p>
      </div>
    </aside>
  );
};
