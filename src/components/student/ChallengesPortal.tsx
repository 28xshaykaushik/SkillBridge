import React, { useState } from "react";
import { IndustryChallenge } from "../../types";
import { INDUSTRY_CHALLENGES } from "../../data/mockDatabase";
import { evaluateChallengeSubmissionWithAI } from "../../services/api";
import {
  Flame,
  Trophy,
  Clock,
  Sparkles,
  CheckCircle2,
  ExternalLink,
  Code,
  X,
  Send,
  RefreshCw,
  Award,
} from "lucide-react";

export const ChallengesPortal: React.FC = () => {
  const [challenges, setChallenges] = useState<IndustryChallenge[]>(INDUSTRY_CHALLENGES);
  const [selectedChallenge, setSelectedChallenge] = useState<IndustryChallenge | null>(null);
  const [repoUrl, setRepoUrl] = useState("");
  const [approachNotes, setApproachNotes] = useState("");
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evalResult, setEvalResult] = useState<any>(null);

  const handleSubmitSolution = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedChallenge || !repoUrl) return;

    setIsEvaluating(true);
    try {
      const evaluation = await evaluateChallengeSubmissionWithAI(
        selectedChallenge.title,
        repoUrl,
        approachNotes
      );
      setEvalResult(evaluation);
    } catch (err) {
      console.error(err);
    } finally {
      setIsEvaluating(false);
    }
  };

  return (
    <div className="space-y-6 text-left">
      {/* Header */}
      <div className="pb-4 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-bold font-display text-slate-900">
            Enterprise Industry Challenges
          </h2>
          <span className="rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-bold text-amber-700 border border-amber-200">
            Direct PPO & Cash Prizes
          </span>
        </div>
        <p className="text-xs text-slate-500 mt-1">
          Solve real-world architecture problems posted directly by corporate sponsors. Submissions are auto-evaluated by AI and reviewed by engineering leads.
        </p>
      </div>

      {/* Challenges Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {challenges.map((ch) => (
          <div
            key={ch.id}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-md">
                  {ch.companyName}
                </span>
                <span className="rounded-full bg-emerald-100 text-emerald-800 px-2.5 py-0.5 text-xs font-extrabold flex items-center gap-1">
                  <Trophy className="h-3 w-3 text-emerald-600" />
                  {ch.reward}
                </span>
              </div>

              <h3 className="text-base font-bold text-slate-900">{ch.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{ch.description}</p>

              {/* Required Skills */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {ch.targetSkills.map((skill) => (
                  <span
                    key={skill}
                    className="text-[10px] font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
              <div className="text-slate-500 font-medium">
                Deadline: <strong className="text-slate-800">{ch.deadline}</strong>
              </div>
              <button
                onClick={() => {
                  setSelectedChallenge(ch);
                  setEvalResult(null);
                  setRepoUrl("");
                  setApproachNotes("");
                }}
                className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white hover:bg-slate-800 transition-colors"
                id={`btn-solve-challenge-${ch.id}`}
              >
                <span>Submit Solution</span>
                <Flame className="h-3.5 w-3.5 text-amber-400" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Submit Solution & AI Grading Modal */}
      {selectedChallenge && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="w-full max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl animate-in fade-in duration-150 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-bold text-indigo-700 uppercase tracking-wider">
                  {selectedChallenge.companyName} Challenge
                </span>
                <h3 className="text-base font-bold text-slate-900">{selectedChallenge.title}</h3>
              </div>
              <button
                onClick={() => setSelectedChallenge(null)}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {!evalResult ? (
              <form onSubmit={handleSubmitSolution} className="mt-4 space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    GitHub Solution Repository URL
                  </label>
                  <input
                    type="url"
                    placeholder="https://github.com/priyasharma/distributed-rate-limiter"
                    value={repoUrl}
                    onChange={(e) => setRepoUrl(e.target.value)}
                    required
                    className="w-full rounded-xl border border-slate-200 p-2.5 text-xs text-slate-800 focus:border-indigo-500 focus:outline-none"
                  />
                  <span className="text-[11px] text-slate-400 mt-0.5 block">
                    Must include code, architecture README, and automated unit test suite.
                  </span>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Architectural Strategy & Benchmark Results
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Describe how you solved concurrency, edge conditions, throughput benchmarks, and failover behavior..."
                    value={approachNotes}
                    onChange={(e) => setApproachNotes(e.target.value)}
                    required
                    className="w-full rounded-xl border border-slate-200 p-2.5 text-xs text-slate-800 focus:border-indigo-500 focus:outline-none"
                  />
                </div>

                <div className="rounded-xl bg-indigo-50/70 p-3 text-[11px] text-indigo-900 border border-indigo-100 flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-indigo-600 shrink-0" />
                  <span>
                    When submitted, Gemini 3.8 Flash automatically executes static code analysis and grades your concurrency patterns against enterprise standards.
                  </span>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedChallenge(null)}
                    className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isEvaluating}
                    className="rounded-xl bg-indigo-600 px-5 py-2 text-xs font-bold text-white hover:bg-indigo-700 shadow-sm inline-flex items-center gap-2 disabled:opacity-50"
                  >
                    {isEvaluating ? (
                      <>
                        <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                        Running AI Code Evaluation...
                      </>
                    ) : (
                      <>
                        <Send className="h-3.5 w-3.5" />
                        Submit & Trigger AI Evaluation
                      </>
                    )}
                  </button>
                </div>
              </form>
            ) : (
              /* AI Evaluation Results */
              <div className="mt-4 space-y-4 text-xs">
                <div className="flex items-center justify-between rounded-xl bg-emerald-50 p-4 border border-emerald-200">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white font-bold font-display text-base">
                      {evalResult.automatedScore}
                    </div>
                    <div>
                      <div className="font-bold text-emerald-900 text-sm">
                        Submission Evaluated & Approved!
                      </div>
                      <div className="text-[11px] text-emerald-700">
                        Ranked in Top 10% for {selectedChallenge.title}
                      </div>
                    </div>
                  </div>
                  <span className="rounded-full bg-white px-3 py-1 text-[10px] font-extrabold text-emerald-800 border border-emerald-300">
                    Status: Verified
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                    <span className="font-bold text-slate-900">AI Feedback Summary: </span>
                    <p className="text-slate-700 mt-1 leading-relaxed">{evalResult.feedback}</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="rounded-xl border border-emerald-100 bg-emerald-50/50 p-3">
                      <div className="font-bold text-emerald-900 mb-1 flex items-center gap-1">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                        Strengths Observed
                      </div>
                      <ul className="list-disc list-inside space-y-1 text-slate-700 text-[11px]">
                        {evalResult.strengths?.map((s: string, idx: number) => (
                          <li key={idx}>{s}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="rounded-xl border border-amber-100 bg-amber-50/50 p-3">
                      <div className="font-bold text-amber-900 mb-1 flex items-center gap-1">
                        <Sparkles className="h-3.5 w-3.5 text-amber-600" />
                        Suggestions for Enhancement
                      </div>
                      <ul className="list-disc list-inside space-y-1 text-slate-700 text-[11px]">
                        {evalResult.areasForImprovement?.map((a: string, idx: number) => (
                          <li key={idx}>{a}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex justify-end">
                  <button
                    onClick={() => setSelectedChallenge(null)}
                    className="rounded-xl bg-slate-900 px-5 py-2 text-xs font-bold text-white hover:bg-slate-800"
                  >
                    Done
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
