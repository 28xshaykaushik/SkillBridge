import React, { useState } from "react";
import { User, UserRole, NotificationItem } from "../../types";
import {
  ShieldCheck,
  Bell,
  CheckCircle2,
  ChevronDown,
  Sparkles,
  Award,
  LogOut,
  Building2,
  GraduationCap,
  Briefcase,
  Layers,
  Settings,
  X,
  ExternalLink,
} from "lucide-react";

interface NavbarProps {
  currentUser: User;
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  notifications: NotificationItem[];
  onMarkNotificationRead: (id: string) => void;
  onGoToLanding: () => void;
  isLandingPage: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentUser,
  currentRole,
  onRoleChange,
  notifications,
  onMarkNotificationRead,
  onGoToLanding,
  isLandingPage,
}) => {
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [showNotifMenu, setShowNotifMenu] = useState(false);
  const unreadCount = notifications.filter((n) => !n.read).length;

  const roleLabels: Record<UserRole, { label: string; icon: any; color: string; desc: string }> = {
    STUDENT: {
      label: "Student",
      icon: GraduationCap,
      color: "bg-indigo-100 text-indigo-700 border-indigo-200",
      desc: "Priya Sharma (IIT Delhi CSE)",
    },
    INDUSTRY: {
      label: "Industry Recruiter",
      icon: Briefcase,
      color: "bg-blue-100 text-blue-700 border-blue-200",
      desc: "Rohan Verma (Microsoft IDC Partner)",
    },
    FACULTY: {
      label: "Faculty Mentor",
      icon: Award,
      color: "bg-emerald-100 text-emerald-700 border-emerald-200",
      desc: "Dr. K. Ramanathan (Systems Lab Lead)",
    },
    INSTITUTION: {
      label: "Institution / TPO",
      icon: Building2,
      color: "bg-purple-100 text-purple-700 border-purple-200",
      desc: "Prof. Sunita Deshmukh (Placement Cell)",
    },
    ADMIN: {
      label: "Platform Admin",
      icon: Layers,
      color: "bg-amber-100 text-amber-700 border-amber-200",
      desc: "Central Governance Controller",
    },
  };

  const currentRoleInfo = roleLabels[currentRole];
  const CurrentRoleIcon = currentRoleInfo.icon;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand & Tagline */}
        <div className="flex items-center gap-3">
          <button
            onClick={onGoToLanding}
            className="flex items-center gap-2.5 text-left focus:outline-none group"
            id="brand-logo-btn"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-blue-500 text-white shadow-md shadow-indigo-200 group-hover:scale-105 transition-transform">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-bold text-xl tracking-tight text-slate-900">
                  Skill<span className="text-indigo-600">Bridge</span>
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2 py-0.5 text-xs font-semibold text-indigo-700 border border-indigo-200">
                  <Sparkles className="h-3 w-3 text-indigo-600" />
                  AICTE Aligned
                </span>
              </div>
              <p className="hidden md:block text-[11px] font-medium text-slate-500 -mt-0.5">
                From Classroom Skills to Industry Readiness
              </p>
            </div>
          </button>
        </div>

        {/* Center / Right controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Landing Page Toggle */}
          <button
            onClick={onGoToLanding}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              isLandingPage
                ? "bg-slate-900 text-white shadow-sm"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }`}
            id="nav-landing-toggle"
          >
            Overview & Vision
          </button>

          {/* Quick Role Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setShowRoleMenu(!showRoleMenu);
                setShowNotifMenu(false);
              }}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all shadow-sm ${currentRoleInfo.color} hover:shadow`}
              id="role-switcher-btn"
              title="Click to switch demo role"
            >
              <CurrentRoleIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Role:</span>
              <span className="font-bold">{currentRoleInfo.label}</span>
              <ChevronDown className="h-3.5 w-3.5 opacity-70" />
            </button>

            {showRoleMenu && (
              <div className="absolute right-0 mt-2 w-72 sm:w-80 rounded-xl border border-slate-200 bg-white p-2 shadow-xl z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-3 py-2 border-b border-slate-100 mb-1">
                  <p className="text-xs font-bold text-slate-900">Switch Persona (Interactive Evaluation)</p>
                  <p className="text-[11px] text-slate-500">
                    Experience SkillBridge from all 5 stakeholder perspectives:
                  </p>
                </div>
                <div className="space-y-1">
                  {(Object.keys(roleLabels) as UserRole[]).map((roleKey) => {
                    const r = roleLabels[roleKey];
                    const RIcon = r.icon;
                    const isActive = currentRole === roleKey;
                    return (
                      <button
                        key={roleKey}
                        onClick={() => {
                          onRoleChange(roleKey);
                          setShowRoleMenu(false);
                        }}
                        className={`w-full flex items-start gap-3 rounded-lg p-2.5 text-left transition-colors ${
                          isActive
                            ? "bg-indigo-50 border border-indigo-200"
                            : "hover:bg-slate-50 border border-transparent"
                        }`}
                        id={`role-opt-${roleKey.toLowerCase()}`}
                      >
                        <div
                          className={`mt-0.5 flex h-7 w-7 items-center justify-center rounded-lg ${
                            isActive ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          <RIcon className="h-4 w-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-900">{r.label}</span>
                            {isActive && <CheckCircle2 className="h-3.5 w-3.5 text-indigo-600" />}
                          </div>
                          <p className="text-[11px] text-slate-500 truncate">{r.desc}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setShowNotifMenu(!showNotifMenu);
                setShowRoleMenu(false);
              }}
              className="relative rounded-lg p-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
              id="notifications-bell-btn"
              title="Notifications"
            >
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white ring-2 ring-white">
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifMenu && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-xl border border-slate-200 bg-white p-3 shadow-xl z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-1.5">
                    <Bell className="h-4 w-4 text-indigo-600" />
                    <span className="text-xs font-bold text-slate-900">Notifications & Alerts</span>
                  </div>
                  <span className="text-[11px] text-slate-500">{unreadCount} unread</span>
                </div>
                <div className="mt-2 max-h-72 overflow-y-auto space-y-2 divide-y divide-slate-100">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className={`pt-2 flex items-start gap-2.5 transition-colors ${
                        !n.read ? "bg-indigo-50/40 p-2 rounded-lg" : ""
                      }`}
                    >
                      <div className="flex-1 text-left">
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-semibold text-slate-900">{n.title}</p>
                          <span className="text-[10px] text-slate-400">{n.timeAgo}</span>
                        </div>
                        <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                          {n.message}
                        </p>
                        {!n.read && (
                          <button
                            onClick={() => onMarkNotificationRead(n.id)}
                            className="mt-1 text-[10px] font-semibold text-indigo-600 hover:underline"
                          >
                            Mark as read
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Profile Pill */}
          <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="h-8 w-8 rounded-full object-cover ring-2 ring-indigo-500/20"
            />
            <div className="hidden lg:block text-left">
              <div className="flex items-center gap-1">
                <span className="text-xs font-bold text-slate-900">{currentUser.name}</span>
                {currentUser.verifiedBadge && (
                  <CheckCircle2 className="h-3.5 w-3.5 text-indigo-600" />
                )}
              </div>
              <p className="text-[10px] text-slate-500">
                {currentUser.institution || currentUser.company || "National Technical Council"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
