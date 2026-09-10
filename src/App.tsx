import React, { useState } from "react";
import { UserRole, User, StudentProfile, Opportunity, NotificationItem, SkillEvidence, VerificationRequest } from "./types";
import {
  MOCK_USERS,
  MOCK_STUDENT_PROFILE,
  MOCK_OPPORTUNITIES,
  MOCK_NOTIFICATIONS,
  ASSESSMENTS,
  INDUSTRY_CHALLENGES,
  MOCK_VERIFICATION_REQUESTS,
} from "./data/mockDatabase";
import { Navbar } from "./components/layout/Navbar";
import { Sidebar } from "./components/layout/Sidebar";
import { LandingPage } from "./components/landing/LandingPage";
import { StudentDashboard } from "./components/student/StudentDashboard";
import { SkillIntelligenceView } from "./components/student/SkillIntelligenceView";
import { SkillGapAnalyzer } from "./components/student/SkillGapAnalyzer";
import { AiSkillExtractor } from "./components/student/AiSkillExtractor";
import { CareerSimulator } from "./components/student/CareerSimulator";
import { AssessmentRunner } from "./components/student/AssessmentRunner";
import { OpportunityPortal } from "./components/student/OpportunityPortal";
import { ChallengesPortal } from "./components/student/ChallengesPortal";
import { InternshipTracker } from "./components/student/InternshipTracker";
import { VerifiedResumePortfolio } from "./components/student/VerifiedResumePortfolio";
import { IndustryDashboard } from "./components/industry/IndustryDashboard";
import { CandidateSearch } from "./components/industry/CandidateSearch";
import { PostOpportunityWizard } from "./components/industry/PostOpportunityWizard";
import { FacultyDashboard } from "./components/faculty/FacultyDashboard";
import { VerificationQueue } from "./components/faculty/VerificationQueue";
import { InstitutionDashboard } from "./components/institution/InstitutionDashboard";
import { AdminDashboard } from "./components/admin/AdminDashboard";
import { Phase2RoadmapView } from "./components/common/Phase2RoadmapView";
import { CheckCircle2, AlertCircle, X } from "lucide-react";

export default function App() {
  const [currentRole, setCurrentRole] = useState<UserRole>("STUDENT");
  const [isLandingPage, setIsLandingPage] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("DASHBOARD");

  // Global State
  const [studentProfile, setStudentProfile] = useState<StudentProfile>(MOCK_STUDENT_PROFILE);
  const [opportunities, setOpportunities] = useState<Opportunity[]>(MOCK_OPPORTUNITIES);
  const [notifications, setNotifications] = useState<NotificationItem[]>(MOCK_NOTIFICATIONS);
  const [verificationRequests, setVerificationRequests] = useState<VerificationRequest[]>(
    MOCK_VERIFICATION_REQUESTS
  );
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const currentUser: User = MOCK_USERS[currentRole];

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Role Change Handler
  const handleRoleChange = (role: UserRole) => {
    setCurrentRole(role);
    setIsLandingPage(false);
    setActiveTab("DASHBOARD");
    showToast(`Switched to ${role.charAt(0) + role.slice(1).toLowerCase()} persona.`);
  };

  // Student Actions
  const handleAddEvidence = (skillId: string, evidence: Omit<SkillEvidence, "id">) => {
    const newEvidence: SkillEvidence = {
      ...evidence,
      id: "ev-" + Date.now(),
    };

    // Update student profile
    const updatedSkills = studentProfile.skills.map((s) => {
      if (s.skillId === skillId) {
        return {
          ...s,
          evidenceList: [newEvidence, ...s.evidenceList],
          evidenceCount: s.evidenceCount + 1,
        };
      }
      return s;
    });

    setStudentProfile({
      ...studentProfile,
      skills: updatedSkills,
    });

    // Also inject into Faculty Verification Queue
    const newReq: VerificationRequest = {
      id: "req-" + Date.now(),
      studentId: studentProfile.id,
      studentName: studentProfile.name,
      institution: studentProfile.institution,
      skillId,
      skillName: evidence.skillName,
      claimedLevel: 3,
      evidenceTitle: evidence.title,
      evidenceUrl: evidence.url,
      description: evidence.description,
      submittedAt: "Just now",
      status: "PENDING",
    };

    setVerificationRequests([newReq, ...verificationRequests]);
    showToast(`Evidence for "${evidence.skillName}" submitted! Faculty notified for verification.`);
  };

  const handleAssessmentPassed = (skillId: string, newLevel: number) => {
    const updatedSkills = studentProfile.skills.map((s) => {
      if (s.skillId === skillId) {
        return {
          ...s,
          verifiedLevel: Math.max(s.verifiedLevel, newLevel),
          decayPercentage: 0,
          blockchainHash: "0x" + Math.random().toString(16).substring(2, 14) + "...verified",
        };
      }
      return s;
    });

    const newScore = Math.min(100, studentProfile.readinessScore + 4);
    setStudentProfile({
      ...studentProfile,
      skills: updatedSkills,
      readinessScore: newScore,
    });

    showToast(`Assessment passed! Verified Level upgraded and skill decay index reset to 0%.`);
  };

  const handleApplyOpportunity = (opp: Opportunity) => {
    showToast(`Applied to ${opp.title} at ${opp.companyName} with verified SHA-256 credentials!`);
  };

  const handleAddWeeklyLog = (newLog: any) => {
    if (!studentProfile.activeInternship) return;
    const updatedLogs = [newLog, ...studentProfile.activeInternship.weeklyLogs];
    const updatedInternship = {
      ...studentProfile.activeInternship,
      currentWeek: Math.min(
        studentProfile.activeInternship.totalWeeks,
        studentProfile.activeInternship.currentWeek + 1
      ),
      weeklyLogs: updatedLogs,
    };

    setStudentProfile({
      ...studentProfile,
      activeInternship: updatedInternship,
    });

    showToast(`Week ${newLog.weekNumber} log submitted to Tata Digital mentor for review.`);
  };

  const handleAddExtractedSkills = (extractedSkills: any[]) => {
    // Merge new extracted skills into student profile
    const existingIds = new Set(studentProfile.skills.map((s) => s.skillName.toLowerCase()));
    const newItems = extractedSkills
      .filter((es) => !existingIds.has(es.name.toLowerCase()))
      .map((es, idx) => ({
        skillId: "skill-ext-" + Date.now() + "-" + idx,
        skillName: es.name,
        category: es.category || "Extracted",
        claimedLevel: es.level || 3,
        verifiedLevel: 0,
        decayPercentage: 0,
        evidenceCount: 0,
        blockchainHash: "0x" + Math.random().toString(16).substring(2, 10) + "...pending",
        evidenceList: [],
      }));

    setStudentProfile({
      ...studentProfile,
      skills: [...studentProfile.skills, ...newItems],
    });

    showToast(`Added ${newItems.length} new competencies to your skill profile!`);
  };

  // Faculty Actions
  const handleApproveRequest = (requestId: string, assignedLevel: number, comments: string) => {
    const req = verificationRequests.find((r) => r.id === requestId);
    if (!req) return;

    setVerificationRequests(
      verificationRequests.map((r) =>
        r.id === requestId ? { ...r, status: "APPROVED", facultyRemarks: comments } : r
      )
    );

    // Upgrade student verified level
    const updatedSkills = studentProfile.skills.map((s) => {
      if (s.skillId === req.skillId || s.skillName.toLowerCase() === req.skillName.toLowerCase()) {
        return {
          ...s,
          verifiedLevel: assignedLevel,
          decayPercentage: 0,
          blockchainHash: "0x" + Math.random().toString(16).substring(2, 14) + "...signed",
        };
      }
      return s;
    });

    setStudentProfile({
      ...studentProfile,
      skills: updatedSkills,
      readinessScore: Math.min(100, studentProfile.readinessScore + 3),
    });

    showToast(`Approved ${req.skillName} for ${req.studentName} at Level ${assignedLevel}!`);
  };

  const handleRejectRequest = (requestId: string, comments: string) => {
    setVerificationRequests(
      verificationRequests.map((r) =>
        r.id === requestId ? { ...r, status: "REJECTED", facultyRemarks: comments } : r
      )
    );
    showToast(`Verification request rejected with revision notes.`);
  };

  // Industry Actions
  const handleAddOpportunity = (opp: Opportunity) => {
    setOpportunities([opp, ...opportunities]);
    showToast(`Opportunity "${opp.title}" published! Matching candidates will be notified.`);
  };

  const handleShortlistCandidate = (candidate: StudentProfile) => {
    showToast(`Candidate ${candidate.name} shortlisted for interview!`);
  };

  const handleSelectFlow = (role: UserRole, tab: string) => {
    setCurrentRole(role);
    setActiveTab(tab);
    setIsLandingPage(false);
  };

  const pendingCount = verificationRequests.filter((r) => r.status === "PENDING").length;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans antialiased selection:bg-indigo-500 selection:text-white">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-3 rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3 text-xs font-semibold text-white shadow-2xl animate-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="ml-2 text-slate-400 hover:text-white">
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Top Navbar */}
      <Navbar
        currentUser={currentUser}
        currentRole={currentRole}
        onRoleChange={handleRoleChange}
        notifications={notifications}
        onMarkNotificationRead={(id) =>
          setNotifications(
            notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
          )
        }
        onGoToLanding={() => setIsLandingPage(!isLandingPage)}
        isLandingPage={isLandingPage}
      />

      {/* Landing Page or Dashboard View */}
      {isLandingPage ? (
        <LandingPage
          onSelectRole={(role) => {
            handleRoleChange(role);
            setIsLandingPage(false);
          }}
          onExploreStudent={() => {
            handleRoleChange("STUDENT");
            setIsLandingPage(false);
          }}
        />
      ) : (
        <div className="flex-1 flex flex-col md:flex-row max-w-7xl w-full mx-auto">
          {/* Sidebar */}
          <Sidebar
            currentRole={currentRole}
            activeTab={activeTab}
            onTabChange={(tab) => setActiveTab(tab)}
            pendingVerificationsCount={pendingCount}
            decayAlertsCount={studentProfile.skills.filter((s) => s.decayPercentage > 15).length}
          />

          {/* Main Content Area */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0 overflow-y-auto">
            {/* STUDENT VIEWS */}
            {currentRole === "STUDENT" && (
              <>
                {activeTab === "DASHBOARD" && (
                  <StudentDashboard
                    profile={studentProfile}
                    opportunities={opportunities}
                    assessments={ASSESSMENTS}
                    onNavigateTab={setActiveTab}
                    onApplyOpportunity={handleApplyOpportunity}
                  />
                )}
                {activeTab === "SKILLS" && (
                  <SkillIntelligenceView
                    profile={studentProfile}
                    onAddEvidence={handleAddEvidence}
                    onTakeAssessment={() => setActiveTab("ASSESSMENTS")}
                  />
                )}
                {activeTab === "GAP_ANALYSIS" && (
                  <SkillGapAnalyzer
                    profile={studentProfile}
                    onUpdateTargetRole={(roleTitle) =>
                      setStudentProfile({ ...studentProfile, targetRole: roleTitle })
                    }
                    onNavigateTab={setActiveTab}
                  />
                )}
                {activeTab === "ASSESSMENTS" && (
                  <AssessmentRunner onAssessmentPassed={handleAssessmentPassed} />
                )}
                {activeTab === "OPPORTUNITIES" && (
                  <OpportunityPortal
                    opportunities={opportunities}
                    profile={studentProfile}
                    onApply={handleApplyOpportunity}
                  />
                )}

                {/* PHASE 2 STUDENT ROADMAP VIEWS */}
                {activeTab === "AI_EXTRACTOR" && (
                  <Phase2RoadmapView
                    featureName="AI Resume & Syllabus Skill Parser"
                    category="Document Intelligence & Extraction"
                    description="Automated ingestion of unformatted resumes, GitHub README files, and academic syllabus PDFs using Gemini Vision & Text embedding to parse structured competencies."
                    plannedMilestones={[
                      "Multi-format OCR for scanned university grade-sheets and lab manual PDFs",
                      "Standard AICTE taxonomy alignment matrix with confidence scoring",
                      "Automated conflict resolution between claimed vs proven skills",
                    ]}
                    onReturnToCore={() => setActiveTab("DASHBOARD")}
                  >
                    <AiSkillExtractor onAddExtractedSkills={handleAddExtractedSkills} />
                  </Phase2RoadmapView>
                )}
                {activeTab === "CAREER_SIMULATOR" && (
                  <Phase2RoadmapView
                    featureName="What-If Career Leap & Salary Simulator"
                    category="Predictive Career Intelligence"
                    description="Monte Carlo style predictive engine projecting CTC packages, role elevation percentiles, and shortlisted probability if a student acquires Level 4 competencies."
                    plannedMilestones={[
                      "Historical Indian tech hiring package correlation model (2024-2026)",
                      "City-specific salary adjustments (Bengaluru, Hyderabad, Pune, NCR)",
                      "Automated course pathway recommendation based on highest ROI",
                    ]}
                    onReturnToCore={() => setActiveTab("DASHBOARD")}
                  >
                    <CareerSimulator profile={studentProfile} />
                  </Phase2RoadmapView>
                )}
                {activeTab === "CHALLENGES" && (
                  <Phase2RoadmapView
                    featureName="Corporate Hackathon Arena & Live IDE"
                    category="Gamified Industry Challenges"
                    description="Automated timed coding challenges sponsored by top tech firms with real-time test case evaluation, container sandboxing, and immediate credential issuance."
                    plannedMilestones={[
                      "Secure cloud sandbox executor for Python, Node.js, and Java",
                      "Plagiarism & AI-generated code detection scoring system",
                      "Automated recruiter notification for Top 5% leaderboard rankers",
                    ]}
                    onReturnToCore={() => setActiveTab("DASHBOARD")}
                  >
                    <ChallengesPortal />
                  </Phase2RoadmapView>
                )}
                {activeTab === "INTERNSHIP_TRACKER" && (
                  <Phase2RoadmapView
                    featureName="Dual-Mentor Internship Workspace"
                    category="Work-Integrated Learning (NEP 2020)"
                    description="Collaborative workspace synchronizing university faculty mentors with corporate industry leads to verify weekly sprint deliverables and assign academic credits."
                    plannedMilestones={[
                      "Digital sign-off workflow compliant with AICTE Internship Policy",
                      "Weekly competency progression heatmaps with decay resets",
                      "Automated end-of-internship performance report generation",
                    ]}
                    onReturnToCore={() => setActiveTab("DASHBOARD")}
                  >
                    {studentProfile.activeInternship && (
                      <InternshipTracker
                        internship={studentProfile.activeInternship}
                        onAddWeeklyLog={handleAddWeeklyLog}
                      />
                    )}
                  </Phase2RoadmapView>
                )}
                {activeTab === "VERIFIED_PORTFOLIO" && (
                  <Phase2RoadmapView
                    featureName="Verifiable Portfolio & Cryptographic Hash"
                    category="Immutable Proof Architecture"
                    description="Publicly shareable verification link with QR code and cryptographic proof stamps that recruiters can verify without needing an account."
                    plannedMilestones={[
                      "Decentralized identity (DID) integration for student credentials",
                      "One-click PDF resume export with embedded QR verification hashes",
                      "Integration with DigiLocker and National Academic Depository (NAD)",
                    ]}
                    onReturnToCore={() => setActiveTab("DASHBOARD")}
                  >
                    <VerifiedResumePortfolio profile={studentProfile} />
                  </Phase2RoadmapView>
                )}
              </>
            )}

            {/* INDUSTRY RECRUITER VIEWS */}
            {currentRole === "INDUSTRY" && (
              <>
                {activeTab === "DASHBOARD" && (
                  <IndustryDashboard
                    opportunities={opportunities}
                    challenges={INDUSTRY_CHALLENGES}
                    onNavigateTab={setActiveTab}
                  />
                )}
                {activeTab === "CANDIDATE_SEARCH" && (
                  <CandidateSearch
                    candidates={[studentProfile]}
                    onShortlist={handleShortlistCandidate}
                  />
                )}
                {activeTab === "POST_OPPORTUNITY" && (
                  <PostOpportunityWizard
                    onAddOpportunity={handleAddOpportunity}
                    onNavigateTab={setActiveTab}
                  />
                )}

                {/* PHASE 2 INDUSTRY ROADMAP */}
                {activeTab === "CHALLENGES_MANAGER" && (
                  <Phase2RoadmapView
                    featureName="Corporate Hackathon Creator"
                    category="Recruitment & Assessment Tooling"
                    description="Create sponsored challenges with custom test cases, automated code reviews, and direct interview fast-tracks."
                    plannedMilestones={[
                      "Custom Docker sandbox configurations for proprietary tests",
                      "Automated shortlist export to enterprise ATS (Workday, Greenhouse)",
                      "Live spectator leaderboard during campus hiring events",
                    ]}
                    onReturnToCore={() => setActiveTab("DASHBOARD")}
                  >
                    <ChallengesPortal />
                  </Phase2RoadmapView>
                )}
                {activeTab === "TALENT_POOL" && (
                  <Phase2RoadmapView
                    featureName="Enterprise Talent Pool & Pipeline"
                    category="Candidate Relationship Management"
                    description="Manage talent pipelines, schedule interview loops, and send automated offer letters with skill-level benchmarks."
                    plannedMilestones={[
                      "Bulk outreach with personalized skill gap completion alerts",
                      "Campus placement drive batch interview scheduling",
                      "Recruiter analytics dashboard on sourcing velocity",
                    ]}
                    onReturnToCore={() => setActiveTab("DASHBOARD")}
                  >
                    <CandidateSearch
                      candidates={[studentProfile]}
                      onShortlist={handleShortlistCandidate}
                    />
                  </Phase2RoadmapView>
                )}
              </>
            )}

            {/* FACULTY VIEWS */}
            {currentRole === "FACULTY" && (
              <>
                {activeTab === "DASHBOARD" && (
                  <FacultyDashboard
                    students={[studentProfile]}
                    pendingCount={pendingCount}
                    onNavigateTab={setActiveTab}
                  />
                )}
                {activeTab === "VERIFICATION_QUEUE" && (
                  <VerificationQueue
                    requests={verificationRequests}
                    onApproveRequest={handleApproveRequest}
                    onRejectRequest={handleRejectRequest}
                  />
                )}
                {activeTab === "STUDENTS_PROGRESS" && (
                  <FacultyDashboard
                    students={[studentProfile]}
                    pendingCount={pendingCount}
                    onNavigateTab={setActiveTab}
                  />
                )}

                {/* PHASE 2 FACULTY ROADMAP */}
                {activeTab === "SKILL_ANALYTICS" && (
                  <Phase2RoadmapView
                    featureName="Lab & Cohort Skill Analytics"
                    category="Academic Intelligence"
                    description="Deep analytics on batch-wise competency acquisition across practical lab sessions and end-semester projects."
                    plannedMilestones={[
                      "Direct import from college LMS (Moodle, Canvas, Google Classroom)",
                      "Curriculum gap detection against recent industry job descriptions",
                      "Outcome Based Education (OBE) NBA accreditation report generation",
                    ]}
                    onReturnToCore={() => setActiveTab("DASHBOARD")}
                  >
                    <InstitutionDashboard />
                  </Phase2RoadmapView>
                )}
                {activeTab === "INTERNSHIP_MONITOR" && (
                  <Phase2RoadmapView
                    featureName="Internship Monitoring Workspace"
                    category="Faculty Mentorship"
                    description="Continuous faculty oversight and weekly sign-offs for students on industrial training."
                    plannedMilestones={[
                      "Automated reminder triggers for missed student weekly deliverables",
                      "Corporate mentor feedback calibration index",
                      "Credit transfer synchronization with University Examination Cell",
                    ]}
                    onReturnToCore={() => setActiveTab("DASHBOARD")}
                  >
                    {studentProfile.activeInternship && (
                      <InternshipTracker
                        internship={studentProfile.activeInternship}
                        onAddWeeklyLog={handleAddWeeklyLog}
                      />
                    )}
                  </Phase2RoadmapView>
                )}
              </>
            )}

            {/* INSTITUTION / TPO VIEWS */}
            {currentRole === "INSTITUTION" && (
              <Phase2RoadmapView
                featureName="Institutional Macro-Heatmap & Placement Correlation"
                category="Institution & TPO Executive Suite"
                description="Macro-level skill demand vs supply heatmaps aligned with AICTE and state technical education boards, measuring empirical CTC impact."
                plannedMilestones={[
                  "State & National skill demand indexing powered by AICTE feeds",
                  "Corporate MoU tracker and campus engagement analytics",
                  "Empirical placement package correlation by competency level",
                ]}
                onReturnToCore={() => handleSelectFlow("STUDENT", "DASHBOARD")}
              >
                <InstitutionDashboard />
              </Phase2RoadmapView>
            )}

            {/* ADMIN COMMAND VIEWS */}
            {currentRole === "ADMIN" && (
              <Phase2RoadmapView
                featureName="Central Platform Administration & Taxonomy Registry"
                category="Governance & Compliance"
                description="Centralized RBAC, national skill taxonomy registry, and tamper-proof security audit log ledger."
                plannedMilestones={[
                  "Federated multi-university single sign-on (SSO)",
                  "Custom role-based permissions matrix for state education departments",
                  "Cryptographic ledger backup and tamper verification tools",
                ]}
                onReturnToCore={() => handleSelectFlow("STUDENT", "DASHBOARD")}
              >
                <AdminDashboard />
              </Phase2RoadmapView>
            )}
          </main>
        </div>
      )}
    </div>
  );
}
