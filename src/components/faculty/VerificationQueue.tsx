import React, { useState } from "react";
import { VerificationRequest, VerificationStatus } from "../../types";
import {
  CheckSquare,
  CheckCircle2,
  XCircle,
  ExternalLink,
  ShieldCheck,
  Award,
  Sparkles,
  MessageSquare,
  AlertCircle,
  X,
} from "lucide-react";

interface VerificationQueueProps {
  requests: VerificationRequest[];
  onApproveRequest: (requestId: string, assignedLevel: number, comments: string) => void;
  onRejectRequest: (requestId: string, comments: string) => void;
}

export const VerificationQueue: React.FC<VerificationQueueProps> = ({
  requests,
  onApproveRequest,
  onRejectRequest,
}) => {
  const [selectedReq, setSelectedReq] = useState<VerificationRequest | null>(null);
  const [assignedLevel, setAssignedLevel] = useState<number>(3);
  const [comments, setComments] = useState<string>("Verified implementation of ingress controllers and unit tests.");
  const [actionDoneMsg, setActionDoneMsg] = useState<string | null>(null);

  const pendingRequests = requests.filter((r) => r.status === "PENDING");

  const handleApprove = (req: VerificationRequest) => {
    onApproveRequest(req.id, assignedLevel, comments);
    setActionDoneMsg(`Approved & certified ${req.studentName} for ${req.skillName} (Level ${assignedLevel})!`);
    setSelectedReq(null);
    setTimeout(() => setActionDoneMsg(null), 3500);
  };

  const handleReject = (req: VerificationRequest) => {
    onRejectRequest(req.id, comments);
    setActionDoneMsg(`Rejected request for ${req.studentName}.`);
    setSelectedReq(null);
    setTimeout(() => setActionDoneMsg(null), 3500);
  };

  return (
    <div className="space-y-6 text-left">
      {/* Header */}
      <div className="pb-4 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-bold font-display text-slate-900">
            Faculty Verification & Endorsement Queue
          </h2>
          <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-emerald-700 border border-emerald-200">
            Cryptographic Authority
          </span>
        </div>
        <p className="text-xs text-slate-500 mt-1">
          Peer-review student code repositories and lab submissions. Approved competencies generate an immutable SHA-256 certificate hash.
        </p>
      </div>

      {actionDoneMsg && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-xs font-bold text-emerald-900 flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="h-4 w-4 text-emerald-600" />
          <span>{actionDoneMsg}</span>
        </div>
      )}

      {/* Requests List */}
      <div className="space-y-4">
        {pendingRequests.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 p-12 text-center text-slate-400 bg-white">
            <CheckCircle2 className="h-10 w-10 text-emerald-500 mx-auto mb-2" />
            <h3 className="text-sm font-bold text-slate-700">Verification Queue Clear!</h3>
            <p className="text-xs text-slate-500 mt-1">
              All student evidence artifacts have been reviewed and cryptographically signed.
            </p>
          </div>
        ) : (
          pendingRequests.map((req) => (
            <div
              key={req.id}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:border-emerald-300 transition-all space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900">{req.studentName}</span>
                    <span className="text-[10px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                      {req.institution}
                    </span>
                  </div>
                  <div className="text-xs font-semibold text-emerald-700 mt-0.5">
                    Target Skill: <strong>{req.skillName}</strong> (Claimed Level: {req.claimedLevel})
                  </div>
                </div>

                <div className="text-[11px] text-slate-400">Submitted: {req.submittedAt}</div>
              </div>

              {/* Artifact details */}
              <div className="space-y-2 text-xs">
                <div className="font-bold text-slate-900">{req.evidenceTitle}</div>
                <p className="text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                  {req.description}
                </p>

                <div className="flex items-center gap-3 pt-1">
                  <a
                    href={req.evidenceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="font-bold text-indigo-600 hover:underline flex items-center gap-1"
                  >
                    Inspect Repository Code <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                  <span className="text-slate-300">•</span>
                  <span className="text-[10px] font-mono text-slate-400">
                    Artifact ID: {req.id}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  onClick={() => handleReject(req)}
                  className="rounded-xl border border-rose-200 px-4 py-2 text-xs font-semibold text-rose-700 hover:bg-rose-50"
                >
                  Reject with Feedback
                </button>
                <button
                  onClick={() => {
                    setSelectedReq(req);
                    setAssignedLevel(req.claimedLevel);
                  }}
                  className="rounded-xl bg-emerald-600 px-5 py-2 text-xs font-bold text-white hover:bg-emerald-700 shadow-sm flex items-center gap-1.5"
                  id={`btn-review-req-${req.id}`}
                >
                  <ShieldCheck className="h-4 w-4" />
                  Approve & Issue Certificate Stamp
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Approval Modal */}
      {selectedReq && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl animate-in fade-in duration-150">
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Certify Competency: {selectedReq.skillName}
                </h3>
                <p className="text-xs text-slate-500">Candidate: {selectedReq.studentName}</p>
              </div>
              <button
                onClick={() => setSelectedReq(null)}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-4 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Assign Faculty Verified Competency Level (1 to 5)
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setAssignedLevel(lvl)}
                      className={`h-9 w-9 rounded-xl font-bold transition-all ${
                        assignedLevel === lvl
                          ? "bg-emerald-600 text-white shadow-sm"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                  <span className="text-[11px] text-slate-500 ml-2">
                    {assignedLevel === 3 ? "Proficient (Industry Standard)" : assignedLevel === 4 ? "Advanced Engineering" : "Mastery"}
                  </span>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Faculty Endorsement Remarks</label>
                <textarea
                  rows={3}
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 p-2.5 text-xs text-slate-800 focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div className="rounded-xl bg-emerald-50/70 p-3 text-[11px] text-emerald-900 border border-emerald-200 flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>
                  This action signs an immutable SHA-256 digital stamp into {selectedReq.studentName}&apos;s verified public portfolio.
                </span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setSelectedReq(null)}
                className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleApprove(selectedReq)}
                className="rounded-xl bg-emerald-600 px-5 py-2 text-xs font-bold text-white hover:bg-emerald-700 shadow-sm"
                id="btn-confirm-approval"
              >
                Confirm Verification Stamp
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
