import React, { useState } from "react";
import { InternshipRecord } from "../../types";
import {
  Clock,
  CheckCircle2,
  Calendar,
  Building2,
  TrendingUp,
  Plus,
  Send,
  Sparkles,
  ExternalLink,
  Award,
} from "lucide-react";

interface InternshipTrackerProps {
  internship: InternshipRecord;
  onAddWeeklyLog: (log: any) => void;
}

export const InternshipTracker: React.FC<InternshipTrackerProps> = ({
  internship,
  onAddWeeklyLog,
}) => {
  const [tasksCompleted, setTasksCompleted] = useState("");
  const [hoursSpent, setHoursSpent] = useState("36");
  const [pullRequestUrl, setPullRequestUrl] = useState("");
  const [showLogForm, setShowLogForm] = useState(false);

  const handleSubmitLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tasksCompleted) return;

    onAddWeeklyLog({
      weekNumber: internship.currentWeek + 1,
      tasksCompleted,
      hoursSpent: parseInt(hoursSpent, 10) || 35,
      mentorFeedback: "Pending review by corporate mentor",
      mentorRating: 5,
      submissionDate: new Date().toISOString().split("T")[0],
    });

    setTasksCompleted("");
    setPullRequestUrl("");
    setShowLogForm(false);
  };

  const progressPercent = Math.round((internship.currentWeek / internship.totalWeeks) * 100);

  return (
    <div className="space-y-6 text-left">
      {/* Header */}
      <div className="pb-4 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-bold font-display text-slate-900">
            Closed-Loop Internship Workspace
          </h2>
          <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-bold text-blue-700 border border-blue-200">
            Industry Feedback Loop
          </span>
        </div>
        <p className="text-xs text-slate-500 mt-1">
          Weekly milestone logs verified by corporate mentors feed directly back into your academic skill credentials.
        </p>
      </div>

      {/* Active Internship Banner */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md">
              Active Corporate Engagement
            </span>
            <h3 className="text-lg font-bold text-slate-900">
              {internship.role} at {internship.company}
            </h3>
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
              <span>
                Mentor: <strong className="text-slate-800">{internship.mentorName}</strong> ({internship.mentorEmail})
              </span>
              <span>•</span>
              <span>
                Duration: <strong className="text-slate-800">{internship.startDate} to {internship.endDate}</strong>
              </span>
            </div>
          </div>

          <button
            onClick={() => setShowLogForm(!showLogForm)}
            className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-indigo-700 transition-colors shadow-sm shrink-0"
            id="btn-log-weekly-work"
          >
            <Plus className="h-4 w-4" />
            <span>Submit Week {internship.currentWeek + 1} Log</span>
          </button>
        </div>

        {/* Progress Bar */}
        <div className="mt-5 space-y-2">
          <div className="flex justify-between text-xs font-bold">
            <span className="text-slate-700">
              Timeline Progress: Week {internship.currentWeek} of {internship.totalWeeks}
            </span>
            <span className="text-indigo-600">{progressPercent}% Completed</span>
          </div>
          <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-600 to-blue-600 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Log Form if open */}
      {showLogForm && (
        <div className="rounded-2xl border border-indigo-200 bg-indigo-50/40 p-6 shadow-sm animate-in fade-in duration-150">
          <h4 className="text-sm font-bold text-slate-900 mb-3">
            Submit Weekly Deliverables (Week {internship.currentWeek + 1})
          </h4>
          <form onSubmit={handleSubmitLog} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Tasks Completed & Technical Highlights
              </label>
              <textarea
                rows={3}
                required
                placeholder="e.g. Configured Redis cache with read-through strategy; decreased p99 API latency from 240ms to 42ms..."
                value={tasksCompleted}
                onChange={(e) => setTasksCompleted(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs text-slate-800 focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Hours Logged This Week</label>
                <input
                  type="number"
                  value={hoursSpent}
                  onChange={(e) => setHoursSpent(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs text-slate-800 focus:border-indigo-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">PR Link / Deployment Link</label>
                <input
                  type="url"
                  placeholder="https://github.com/..."
                  value={pullRequestUrl}
                  onChange={(e) => setPullRequestUrl(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs text-slate-800 focus:border-indigo-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowLogForm(false)}
                className="rounded-xl border border-slate-200 px-4 py-2 font-semibold text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-xl bg-indigo-600 px-5 py-2 font-bold text-white hover:bg-indigo-700 shadow-sm inline-flex items-center gap-1.5"
              >
                <Send className="h-3.5 w-3.5" />
                Submit to Mentor
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Two Column Section: Weekly Logs & Skill Growth Delta */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Logs */}
        <div className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h4 className="text-sm font-bold text-slate-900">Verified Weekly Logs History</h4>
            <span className="text-[11px] text-slate-500">{internship.weeklyLogs.length} logs on file</span>
          </div>

          <div className="space-y-3">
            {internship.weeklyLogs.map((log) => (
              <div
                key={log.weekNumber}
                className="rounded-xl border border-slate-100 bg-slate-50/70 p-4 space-y-2 text-xs"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-indigo-700">Week {log.weekNumber}</span>
                    <span className="text-slate-400">•</span>
                    <span className="text-slate-500">{log.hoursSpent} hrs logged</span>
                  </div>
                  <div className="flex items-center gap-1 text-emerald-700 font-bold">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                    <span>Rating: {log.mentorRating}/5</span>
                  </div>
                </div>

                <p className="text-slate-700 font-medium">{log.tasksCompleted}</p>

                <div className="pt-2 border-t border-slate-200/60 flex items-start gap-2 text-[11px] text-slate-500">
                  <strong className="text-slate-700 shrink-0">Mentor Review:</strong>
                  <span className="italic text-slate-600">&quot;{log.mentorFeedback}&quot;</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skill Growth Delta */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <div className="pb-3 border-b border-slate-100">
            <h4 className="text-sm font-bold text-slate-900">Verified Skill Growth Delta</h4>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Skills improved through production code during this internship
            </p>
          </div>

          <div className="space-y-3">
            {internship.skillsImproved.map((item) => (
              <div
                key={item.skillName}
                className="rounded-xl border border-slate-100 bg-slate-50 p-3 text-xs"
              >
                <div className="font-bold text-slate-900 mb-1">{item.skillName}</div>
                <div className="flex items-center justify-between text-slate-600">
                  <span>Pre-Internship: Lvl {item.preLevel}</span>
                  <span className="font-bold text-emerald-600">
                    Current: Lvl {item.postLevel} (+{item.postLevel - item.preLevel})
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-xl bg-emerald-50 p-3 border border-emerald-200 text-[11px] text-emerald-900">
            <div className="font-bold mb-0.5">Corporate Certification Stamp</div>
            <div>
              Tata Digital Digital Engineering group automatically signs off on final completion certificate with verifiable hash.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
