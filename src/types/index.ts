export type UserRole = "STUDENT" | "INDUSTRY" | "FACULTY" | "INSTITUTION" | "ADMIN";

export interface User {
  id: string;
  email: string;
  role: UserRole;
  name: string;
  avatar: string;
  phone?: string;
  location?: string;
  bio?: string;
  institution?: string;
  company?: string;
  department?: string;
  designation?: string;
  verifiedBadge?: boolean;
}

export interface Skill {
  id: string;
  name: string;
  category: "Frontend" | "Backend" | "Databases" | "AI/ML" | "DevOps & Cloud" | "Core CS" | "Cybersecurity";
  subcategory?: string;
  demandScore: number; // 1-100
  trend: "up" | "stable" | "down";
}

export type EvidenceType = "GITHUB_REPO" | "LIVE_DEPLOYMENT" | "FACULTY_LAB" | "HACKATHON_AWARD" | "CERTIFICATION" | "PEER_REVIEW";

export interface SkillEvidence {
  id: string;
  skillId: string;
  skillName: string;
  evidenceType: EvidenceType;
  title: string;
  url: string;
  description: string;
  verificationLevel: "PENDING" | "FACULTY_VERIFIED" | "INDUSTRY_VERIFIED" | "REJECTED";
  verifiedBy?: string;
  verifiedAt?: string;
  blockchainHash?: string;
  score?: number;
}

export interface StudentSkill {
  skillId: string;
  skillName: string;
  category: string;
  claimedLevel: number; // 1 to 5
  verifiedLevel: number; // 0 to 5 (0 = unverified)
  lastAssessed: string;
  evidenceCount: number;
  decayPercentage: number; // 0-100%
  blockchainHash: string;
  evidenceList: SkillEvidence[];
}

export interface CareerRole {
  id: string;
  title: string;
  category: string;
  description: string;
  avgSalary: string;
  demandScore: number; // 0-100
  requiredSkills: {
    skillName: string;
    requiredLevel: number; // 1-5
    weight: number; // importance weight 1-10
  }[];
}

export interface Opportunity {
  id: string;
  type: "JOB" | "INTERNSHIP" | "FULL_TIME";
  companyId?: string;
  companyName: string;
  companyLogo?: string;
  title: string;
  description: string;
  skillsRequired?: string[];
  requiredSkills?: string[];
  minVerifiedLevel?: number;
  location: string;
  workMode: "REMOTE" | "HYBRID" | "ON_SITE";
  stipendOrSalary: string;
  duration?: string;
  experience?: string;
  postedAt?: string;
  deadline: string;
  applicantsCount?: number;
  applicantCount?: number;
  matchScore?: number;
  status?: "OPEN" | "CLOSED" | "FLAGGED";
}

export interface Application {
  id: string;
  opportunityId: string;
  opportunityTitle: string;
  companyName: string;
  type: "JOB" | "INTERNSHIP";
  studentId: string;
  studentName: string;
  studentCgpa: number;
  readinessScore: number;
  status: "APPLIED" | "SHORTLISTED" | "INTERVIEWING" | "OFFERED" | "REJECTED";
  appliedAt: string;
  coverLetter?: string;
}

export interface IndustryChallenge {
  id: string;
  companyId: string;
  companyName: string;
  companyLogo: string;
  title: string;
  description: string;
  skillsTested: string[];
  difficulty: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
  deadline: string;
  reward: string;
  submissionsCount: number;
  status: "ACTIVE" | "EVALUATING" | "CLOSED";
}

export interface ChallengeSubmission {
  id: string;
  challengeId: string;
  studentId: string;
  studentName: string;
  submissionUrl: string;
  notes: string;
  score?: number;
  grade?: string;
  feedback?: string;
  evaluatedAt?: string;
  submittedAt: string;
}

export interface AssessmentQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Assessment {
  id: string;
  skillId: string;
  skillName: string;
  title: string;
  description: string;
  difficulty: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
  durationMinutes: number;
  passingScore: number;
  questions: AssessmentQuestion[];
}

export interface InternshipProgressLog {
  id: string;
  weekNumber: number;
  tasksCompleted: string[];
  tasksPending: string[];
  mentorFeedback?: string;
  skillsImproved: string[];
  rating?: number; // 1-5
  submittedAt: string;
  status: "PENDING_REVIEW" | "APPROVED";
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: "VERIFICATION" | "OPPORTUNITY" | "ASSESSMENT" | "ALERT";
  read: boolean;
  timeAgo: string;
  actionUrl?: string;
}

export interface StudentProfile {
  id: string;
  userId: string;
  name: string;
  email: string;
  avatar: string;
  institution: string;
  degree: string;
  branch: string;
  semester: number;
  cgpa: number;
  graduationYear: number;
  targetRole: string;
  preferredIndustry: string;
  readinessScore: number; // 0-100
  scoreBreakdown: {
    verifiedSkills: number; // out of 40
    assessments: number; // out of 25
    realWorldProjects: number; // out of 20
    facultyEndorsements: number; // out of 15
  };
  skills: StudentSkill[];
  activeInternship?: {
    company: string;
    role: string;
    mentor: string;
    startDate: string;
    totalWeeks: number;
    currentWeek: number;
    weeklyLogs?: InternshipProgressLog[];
  };
}

export type VerificationStatus = "PENDING" | "APPROVED" | "REJECTED" | "UNDER_REVIEW";

export interface VerificationRequest {
  id: string;
  studentId: string;
  studentName: string;
  institution: string;
  skillId: string;
  skillName: string;
  claimedLevel: number;
  evidenceTitle: string;
  evidenceUrl: string;
  description: string;
  submittedAt: string;
  status: VerificationStatus;
  facultyRemarks?: string;
}

export interface InternshipRecord {
  company: string;
  role: string;
  mentor: string;
  startDate: string;
  totalWeeks: number;
  currentWeek: number;
  weeklyLogs?: InternshipProgressLog[];
}

