import React, { useState, useEffect } from "react";
import { Assessment, AssessmentQuestion } from "../../types";
import { ASSESSMENTS } from "../../data/mockDatabase";
import {
  Award,
  Clock,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  RotateCcw,
  ShieldCheck,
  ArrowRight,
  ChevronRight,
  Sparkles,
} from "lucide-react";

interface AssessmentRunnerProps {
  onAssessmentPassed: (skillId: string, newLevel: number) => void;
  selectedAssessmentId?: string;
}

export const AssessmentRunner: React.FC<AssessmentRunnerProps> = ({
  onAssessmentPassed,
  selectedAssessmentId,
}) => {
  const [activeAssessmentId, setActiveAssessmentId] = useState<string>(
    selectedAssessmentId || ASSESSMENTS[0].id
  );
  const [inProgress, setInProgress] = useState(false);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const activeAssessment =
    ASSESSMENTS.find((a) => a.id === activeAssessmentId) || ASSESSMENTS[0];

  useEffect(() => {
    let timer: any;
    if (inProgress && secondsLeft > 0 && !isSubmitted) {
      timer = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            handleSubmitTest();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [inProgress, secondsLeft, isSubmitted]);

  const handleStartTest = (asm: Assessment) => {
    setActiveAssessmentId(asm.id);
    setInProgress(true);
    setCurrentQIndex(0);
    setAnswers({});
    setIsSubmitted(false);
    setSecondsLeft(asm.durationMinutes * 60);
  };

  const handleSelectOption = (optIndex: number) => {
    if (isSubmitted) return;
    setAnswers({ ...answers, [currentQIndex]: optIndex });
  };

  const handleSubmitTest = () => {
    setIsSubmitted(true);
    setInProgress(false);

    // Calculate score
    const totalQuestions = activeAssessment.questions.length;
    let correctCount = 0;
    activeAssessment.questions.forEach((q, idx) => {
      if (answers[idx] === q.correctIndex) {
        correctCount++;
      }
    });

    const scorePercentage = Math.round((correctCount / totalQuestions) * 100);
    if (scorePercentage >= activeAssessment.passingScore) {
      onAssessmentPassed(activeAssessment.skillId, 3);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    activeAssessment.questions.forEach((q, idx) => {
      if (answers[idx] === q.correctIndex) {
        correct++;
      }
    });
    return Math.round((correct / activeAssessment.questions.length) * 100);
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remSecs = secs % 60;
    return `${mins}:${remSecs < 10 ? "0" : ""}${remSecs}`;
  };

  return (
    <div className="space-y-6 text-left">
      {/* Header */}
      <div className="pb-4 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-bold font-display text-slate-900">
            Proctored Skill Assessments
          </h2>
          <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-bold text-indigo-700 border border-indigo-200">
            Level Verification & Decay Reset
          </span>
        </div>
        <p className="text-xs text-slate-500 mt-1">
          Prove your mastery through timed, conceptual and scenario-based questions. Passing awards an immediate verified level upgrade.
        </p>
      </div>

      {!inProgress && !isSubmitted ? (
        /* Assessment Catalog */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ASSESSMENTS.map((asm) => (
            <div
              key={asm.id}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
                    {asm.difficulty}
                  </span>
                  <div className="flex items-center gap-1 text-xs font-semibold text-slate-500">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{asm.durationMinutes} mins</span>
                  </div>
                </div>

                <h3 className="mt-3 text-base font-bold text-slate-900">{asm.title}</h3>
                <p className="mt-1 text-xs text-slate-600 leading-relaxed">{asm.description}</p>

                <div className="mt-4 flex items-center gap-4 text-xs text-slate-500">
                  <span>
                    Questions: <strong className="text-slate-800">{asm.questions.length}</strong>
                  </span>
                  <span>•</span>
                  <span>
                    Passing: <strong className="text-emerald-600">{asm.passingScore}%</strong>
                  </span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500">Target: {asm.skillName}</span>
                <button
                  onClick={() => handleStartTest(asm)}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white hover:bg-indigo-700 transition-colors shadow-sm"
                  id={`btn-start-test-${asm.id}`}
                >
                  <span>Start Test</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : inProgress ? (
        /* Active Test Runner */
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-md space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-200">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700">
                {activeAssessment.skillName}
              </span>
              <h3 className="text-base font-bold text-slate-900">{activeAssessment.title}</h3>
            </div>

            <div className="flex items-center gap-2 rounded-xl bg-slate-900 px-3.5 py-1.5 text-white font-mono text-xs font-bold">
              <Clock className="h-4 w-4 text-emerald-400" />
              <span>Time Left: {formatTime(secondsLeft)}</span>
            </div>
          </div>

          {/* Question Navigator Pills */}
          <div className="flex items-center gap-2">
            {activeAssessment.questions.map((_, qIdx) => (
              <button
                key={qIdx}
                onClick={() => setCurrentQIndex(qIdx)}
                className={`h-7 w-7 rounded-lg text-xs font-bold transition-all ${
                  currentQIndex === qIdx
                    ? "bg-indigo-600 text-white"
                    : answers[qIdx] !== undefined
                    ? "bg-emerald-100 text-emerald-800"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {qIdx + 1}
              </button>
            ))}
          </div>

          {/* Current Question */}
          <div className="space-y-4">
            <div className="text-xs font-semibold text-slate-400">
              Question {currentQIndex + 1} of {activeAssessment.questions.length}
            </div>
            <p className="text-sm font-bold text-slate-900 leading-relaxed">
              {activeAssessment.questions[currentQIndex].question}
            </p>

            {/* Options */}
            <div className="space-y-2.5 pt-2">
              {activeAssessment.questions[currentQIndex].options.map((option, optIdx) => {
                const isSelected = answers[currentQIndex] === optIdx;
                return (
                  <div
                    key={optIdx}
                    onClick={() => handleSelectOption(optIdx)}
                    className={`cursor-pointer rounded-xl border p-3.5 text-xs font-medium transition-all ${
                      isSelected
                        ? "border-indigo-600 bg-indigo-50/70 text-indigo-900 ring-2 ring-indigo-500/20"
                        : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${
                          isSelected
                            ? "bg-indigo-600 text-white"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                      <span className="leading-normal">{option}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Navigation & Submit footer */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={() => setCurrentQIndex((prev) => Math.max(0, prev - 1))}
              disabled={currentQIndex === 0}
              className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-30"
            >
              Previous
            </button>

            {currentQIndex < activeAssessment.questions.length - 1 ? (
              <button
                onClick={() => setCurrentQIndex((prev) => prev + 1)}
                className="rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white hover:bg-slate-800"
              >
                Next Question
              </button>
            ) : (
              <button
                onClick={handleSubmitTest}
                className="rounded-xl bg-emerald-600 px-5 py-2 text-xs font-bold text-white hover:bg-emerald-700 shadow-sm"
                id="btn-submit-assessment"
              >
                Submit & Verify Score
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Results View */
        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm text-center space-y-6">
          {calculateScore() >= activeAssessment.passingScore ? (
            <div className="space-y-2">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mx-auto">
                <CheckCircle2 className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Assessment Passed!</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Congratulations! You scored{" "}
                <strong className="text-emerald-600 text-sm">{calculateScore()}%</strong> (Passing:{" "}
                {activeAssessment.passingScore}%). Your verified proficiency in{" "}
                <strong className="text-slate-800">{activeAssessment.skillName}</strong> has been
                upgraded and skill decay index has been reset.
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-rose-100 text-rose-600 mx-auto">
                <XCircle className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Assessment Not Passed</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                You scored{" "}
                <strong className="text-rose-600 text-sm">{calculateScore()}%</strong>. Passing threshold is{" "}
                {activeAssessment.passingScore}%. Review the explanations below and re-attempt anytime.
              </p>
            </div>
          )}

          {/* Explanations List */}
          <div className="text-left space-y-3 pt-4 border-t border-slate-100">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Question Breakdown & Detailed Explanations
            </h4>
            {activeAssessment.questions.map((q, idx) => {
              const userAns = answers[idx];
              const isCorrect = userAns === q.correctIndex;
              return (
                <div
                  key={idx}
                  className={`rounded-xl border p-4 text-xs ${
                    isCorrect ? "border-emerald-200 bg-emerald-50/40" : "border-rose-200 bg-rose-50/40"
                  }`}
                >
                  <div className="flex items-center gap-2 font-bold text-slate-900">
                    {isCorrect ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    ) : (
                      <XCircle className="h-4 w-4 text-rose-600 shrink-0" />
                    )}
                    <span>{q.question}</span>
                  </div>
                  <div className="mt-2 text-slate-600">
                    Your Answer: <strong>{q.options[userAns] || "Unanswered"}</strong>
                  </div>
                  {!isCorrect && (
                    <div className="text-emerald-700 font-semibold mt-1">
                      Correct Answer: {q.options[q.correctIndex]}
                    </div>
                  )}
                  <div className="mt-2 text-[11px] text-slate-500 bg-white/80 p-2.5 rounded-lg border border-slate-200/50">
                    <strong className="text-slate-700">Explanation: </strong>
                    {q.explanation}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-center gap-4">
            <button
              onClick={() => {
                setIsSubmitted(false);
                setInProgress(false);
              }}
              className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 px-5 py-2.5 text-xs font-bold text-white hover:bg-slate-800"
            >
              Back to Assessments Catalog
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
