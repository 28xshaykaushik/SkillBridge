import {
  User,
  StudentProfile,
  Skill,
  CareerRole,
  Opportunity,
  IndustryChallenge,
  Assessment,
  InternshipProgressLog,
  NotificationItem,
} from "../types";

export const DEMO_USERS: Record<string, User> = {
  STUDENT: {
    id: "user-std-101",
    email: "priya.sharma@iitd.ac.in",
    role: "STUDENT",
    name: "Priya Sharma",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    phone: "+91 98765 43210",
    location: "New Delhi, India",
    bio: "Passionate 3rd-year CS undergrad exploring cloud-native architectures, distributed backend systems, and AI integration.",
    institution: "Indian Institute of Technology, Delhi",
    department: "Computer Science & Engineering",
    verifiedBadge: true,
  },
  INDUSTRY: {
    id: "user-ind-201",
    email: "rohan.verma@microsoft.com",
    role: "INDUSTRY",
    name: "Rohan Verma",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    company: "Microsoft IDC & Partner Network",
    designation: "Principal Engineering Talent Partner",
    location: "Bengaluru, India",
    bio: "Connecting top engineering talent with high-impact cloud infrastructure and AI developer tooling teams.",
    verifiedBadge: true,
  },
  FACULTY: {
    id: "user-fac-301",
    email: "k.ramanathan@iitd.ac.in",
    role: "FACULTY",
    name: "Dr. K. Ramanathan",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    institution: "IIT Delhi",
    department: "Dept. of Computer Science & Engineering",
    designation: "Associate Professor & Systems Lab Lead",
    location: "New Delhi, India",
    bio: "Researcher in Distributed Systems and Cloud Computing. Faculty mentor for student innovation teams.",
    verifiedBadge: true,
  },
  INSTITUTION: {
    id: "user-inst-401",
    email: "tpo@iitd.ac.in",
    role: "INSTITUTION",
    name: "Prof. Sunita Deshmukh",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    institution: "Training & Placement Cell, IIT Delhi",
    designation: "Head of Corporate Relations & Placement Cell",
    location: "New Delhi, India",
    bio: "Bridging academic rigor with 400+ Fortune 500 and high-growth startup hiring partners.",
    verifiedBadge: true,
  },
  ADMIN: {
    id: "user-adm-001",
    email: "admin@skillbridge.gov.in",
    role: "ADMIN",
    name: "Central Portal Administrator",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
    designation: "National Platform Controller",
    location: "AICTE / MoE New Delhi",
    bio: "System supervision, multi-tenant moderation, and skill taxonomy governance for National Skill Network.",
    verifiedBadge: true,
  },
};

export const INITIAL_STUDENT_PROFILE: StudentProfile = {
  id: "std-profile-101",
  userId: "user-std-101",
  name: "Priya Sharma",
  email: "priya.sharma@iitd.ac.in",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  institution: "Indian Institute of Technology, Delhi",
  degree: "Bachelor of Technology",
  branch: "Computer Science and Engineering",
  semester: 6,
  cgpa: 8.84,
  graduationYear: 2027,
  targetRole: "Full Stack Cloud Architect",
  preferredIndustry: "FinTech & Enterprise Cloud SaaS",
  readinessScore: 82,
  scoreBreakdown: {
    verifiedSkills: 34, // out of 40
    assessments: 22, // out of 25
    realWorldProjects: 16, // out of 20
    facultyEndorsements: 10, // out of 15
  },
  skills: [
    {
      skillId: "sk-react",
      skillName: "React.js & Next.js",
      category: "Frontend",
      claimedLevel: 4,
      verifiedLevel: 4,
      lastAssessed: "2026-02-18",
      evidenceCount: 3,
      decayPercentage: 5,
      blockchainHash: "0x8f2a91b5c43d7e82a93f1d44c80b332b71948ae5c1a7d6e4",
      evidenceList: [
        {
          id: "ev-1",
          skillId: "sk-react",
          skillName: "React.js & Next.js",
          evidenceType: "GITHUB_REPO",
          title: "Micro-Frontend E-Commerce Dashboard",
          url: "https://github.com/priyasharma/microfront-store",
          description: "Implemented SSR, React 19 server actions, and optimistic updates with 99.8% test coverage.",
          verificationLevel: "FACULTY_VERIFIED",
          verifiedBy: "Dr. K. Ramanathan",
          verifiedAt: "2026-01-20",
          blockchainHash: "0x7a3c9b...4e19",
          score: 95,
        },
        {
          id: "ev-2",
          skillId: "sk-react",
          skillName: "React.js & Next.js",
          evidenceType: "LIVE_DEPLOYMENT",
          title: "Production Web App at Cloudflare Edge",
          url: "https://storefront-demo.vercel.app",
          description: "Demonstrated lighthouse performance score of 98 with sub-80ms First Contentful Paint.",
          verificationLevel: "INDUSTRY_VERIFIED",
          verifiedBy: "Microsoft Recruiter Reviewer",
          verifiedAt: "2026-02-12",
          blockchainHash: "0x4b8e1f...28c1",
          score: 92,
        },
      ],
    },
    {
      skillId: "sk-ts",
      skillName: "TypeScript",
      category: "Frontend",
      claimedLevel: 4,
      verifiedLevel: 4,
      lastAssessed: "2026-02-10",
      evidenceCount: 2,
      decayPercentage: 4,
      blockchainHash: "0x3e71ba29f50c184d99c43b819e612f00a427bb90f772e351",
      evidenceList: [
        {
          id: "ev-3",
          skillId: "sk-ts",
          skillName: "TypeScript",
          evidenceType: "CERTIFICATION",
          title: "Advanced TypeScript Architectural Patterns",
          url: "https://credentials.skillbridge.gov.in/cert/ts-994",
          description: "Comprehensive exam on conditional types, template literals, and AST transformations.",
          verificationLevel: "FACULTY_VERIFIED",
          verifiedBy: "Dept. Systems Lab",
          verifiedAt: "2026-01-15",
          blockchainHash: "0x91d5fc...33e2",
          score: 94,
        },
      ],
    },
    {
      skillId: "sk-node",
      skillName: "Node.js & Express",
      category: "Backend",
      claimedLevel: 4,
      verifiedLevel: 3,
      lastAssessed: "2026-01-28",
      evidenceCount: 2,
      decayPercentage: 8,
      blockchainHash: "0x9948ba33c5e6f10287a912dc345091a0fc239b561c28ea97",
      evidenceList: [
        {
          id: "ev-4",
          skillId: "sk-node",
          skillName: "Node.js & Express",
          evidenceType: "FACULTY_LAB",
          title: "Distributed Rate Limiter & Token Bucket",
          url: "https://github.com/priyasharma/redis-rate-limiter",
          description: "High-throughput token bucket algorithm benchmarked at 18,000 req/sec.",
          verificationLevel: "FACULTY_VERIFIED",
          verifiedBy: "Dr. K. Ramanathan",
          verifiedAt: "2026-01-28",
          blockchainHash: "0x11f42a...88c4",
          score: 88,
        },
      ],
    },
    {
      skillId: "sk-postgres",
      skillName: "PostgreSQL & Database Design",
      category: "Databases",
      claimedLevel: 4,
      verifiedLevel: 3,
      lastAssessed: "2026-01-14",
      evidenceCount: 1,
      decayPercentage: 12,
      blockchainHash: "0x6189da3b2c8091fe293847afb0c1928374a56c71e29384bf",
      evidenceList: [
        {
          id: "ev-5",
          skillId: "sk-postgres",
          skillName: "PostgreSQL & Database Design",
          evidenceType: "HACKATHON_AWARD",
          title: "National Smart Transit Database Sharding",
          url: "https://github.com/aaditya-sharma/smart-transit-sharding",
          description: "Designed 3NF schema with partitioned timeseries telemetry tables.",
          verificationLevel: "FACULTY_VERIFIED",
          verifiedBy: "Dr. K. Ramanathan",
          verifiedAt: "2026-01-14",
          blockchainHash: "0x55aa3b...199c",
          score: 90,
        },
      ],
    },
    {
      skillId: "sk-docker",
      skillName: "Docker & Containerization",
      category: "DevOps & Cloud",
      claimedLevel: 3,
      verifiedLevel: 2,
      lastAssessed: "2025-11-20",
      evidenceCount: 1,
      decayPercentage: 18, // decay alert trigger!
      blockchainHash: "0x55018f29ea1b28c9405d3b8471c29e0018471b56c8028f11",
      evidenceList: [
        {
          id: "ev-6",
          skillId: "sk-docker",
          skillName: "Docker & Containerization",
          evidenceType: "GITHUB_REPO",
          title: "Multi-stage Dockerfile for Microservices",
          url: "https://github.com/priyasharma/docker-production-builds",
          description: "Alpine-based multi-stage builds trimmed container size from 1.1GB to 84MB.",
          verificationLevel: "PENDING",
          score: 80,
        },
      ],
    },
    {
      skillId: "sk-k8s",
      skillName: "Kubernetes & Cloud Orchestration",
      category: "DevOps & Cloud",
      claimedLevel: 2,
      verifiedLevel: 0, // Unverified - claimed only
      lastAssessed: "2025-10-10",
      evidenceCount: 0,
      decayPercentage: 25,
      blockchainHash: "0x000000000000000000000000000000000000000000000000",
      evidenceList: [],
    },
    {
      skillId: "sk-sysdesign",
      skillName: "System Design & Caching",
      category: "Core CS",
      claimedLevel: 3,
      verifiedLevel: 2,
      lastAssessed: "2026-01-05",
      evidenceCount: 1,
      decayPercentage: 14,
      blockchainHash: "0x98127ab01928374c65f1293847ab091283746c518293740f",
      evidenceList: [
        {
          id: "ev-7",
          skillId: "sk-sysdesign",
          skillName: "System Design & Caching",
          evidenceType: "FACULTY_LAB",
          title: "Distributed Cache invalidation prototype",
          url: "https://github.com/priyasharma/cache-invalidation-raft",
          description: "Implemented write-through and write-back cache policies with Redis Cluster.",
          verificationLevel: "FACULTY_VERIFIED",
          verifiedBy: "Dr. K. Ramanathan",
          verifiedAt: "2026-01-05",
          blockchainHash: "0x892cb1...003a",
          score: 85,
        },
      ],
    },
  ],
  activeInternship: {
    company: "Tata Digital / Cloud Engineering",
    role: "Cloud Engineering Intern",
    mentor: "Vikram Malhotra (Lead Cloud Architect)",
    startDate: "2026-01-05",
    totalWeeks: 12,
    currentWeek: 8,
  },
};

export const CAREER_ROLES: CareerRole[] = [
  {
    id: "role-fullstack-cloud",
    title: "Full Stack Cloud Architect",
    category: "Software Engineering",
    description: "Designs, engineers, and operates modern end-to-end cloud platforms with reactive frontends, resilient microservices, and automated CI/CD.",
    avgSalary: "₹16.5 LPA - ₹28 LPA",
    demandScore: 96,
    requiredSkills: [
      { skillName: "React.js & Next.js", requiredLevel: 4, weight: 8 },
      { skillName: "TypeScript", requiredLevel: 4, weight: 8 },
      { skillName: "Node.js & Express", requiredLevel: 4, weight: 9 },
      { skillName: "PostgreSQL & Database Design", requiredLevel: 4, weight: 9 },
      { skillName: "Docker & Containerization", requiredLevel: 3, weight: 8 },
      { skillName: "Kubernetes & Cloud Orchestration", requiredLevel: 3, weight: 8 },
      { skillName: "System Design & Caching", requiredLevel: 4, weight: 10 },
    ],
  },
  {
    id: "role-aiml-engineer",
    title: "AI & GenAI Solutions Engineer",
    category: "Artificial Intelligence",
    description: "Bridges foundation models, vector databases, and enterprise software to build reliable LLM-augmented intelligent applications.",
    avgSalary: "₹18 LPA - ₹32 LPA",
    demandScore: 98,
    requiredSkills: [
      { skillName: "Python & PyTorch", requiredLevel: 4, weight: 10 },
      { skillName: "LLM Orchestration & Prompting", requiredLevel: 4, weight: 10 },
      { skillName: "Vector DBs & Embeddings", requiredLevel: 3, weight: 8 },
      { skillName: "API Design & FastAPI", requiredLevel: 4, weight: 8 },
      { skillName: "Docker & Containerization", requiredLevel: 3, weight: 7 },
    ],
  },
  {
    id: "role-devops-sre",
    title: "DevOps & Site Reliability Engineer",
    category: "Infrastructure",
    description: "Focuses on high availability, automated infrastructure as code (Terraform), observability, and zero-downtime release pipelines.",
    avgSalary: "₹14 LPA - ₹24 LPA",
    demandScore: 92,
    requiredSkills: [
      { skillName: "Docker & Containerization", requiredLevel: 5, weight: 10 },
      { skillName: "Kubernetes & Cloud Orchestration", requiredLevel: 4, weight: 10 },
      { skillName: "CI/CD & GitHub Actions", requiredLevel: 4, weight: 9 },
      { skillName: "Linux System Internals", requiredLevel: 4, weight: 8 },
      { skillName: "Observability (Prometheus/Grafana)", requiredLevel: 3, weight: 7 },
    ],
  },
];

export const OPPORTUNITIES: Opportunity[] = [
  {
    id: "opp-ms-01",
    type: "INTERNSHIP",
    companyId: "comp-msft",
    companyName: "Microsoft India",
    companyLogo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=80&auto=format&fit=crop&q=80",
    title: "Cloud Infrastructure & Azure Developer Intern",
    description: "Work with Azure Developer Experience team to build automated container diagnostic tools and resilient microservice templates.",
    skillsRequired: ["React.js & Next.js", "TypeScript", "Docker & Containerization", "Node.js & Express"],
    location: "Bengaluru (Hybrid)",
    workMode: "HYBRID",
    stipendOrSalary: "₹1,25,000 / month",
    duration: "6 Months",
    postedAt: "3 days ago",
    deadline: "2026-04-15",
    applicantsCount: 142,
    matchScore: 91,
    status: "OPEN",
  },
  {
    id: "opp-rzp-02",
    type: "JOB",
    companyId: "comp-rzp",
    companyName: "Razorpay",
    companyLogo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=80&auto=format&fit=crop&q=80",
    title: "Software Development Engineer I (Payments Core)",
    description: "Engineer ultra-low latency payment orchestration services handling 10,000 TPS with zero transactional loss.",
    skillsRequired: ["Node.js & Express", "PostgreSQL & Database Design", "System Design & Caching", "Docker & Containerization"],
    location: "Bengaluru (On-site)",
    workMode: "ON_SITE",
    stipendOrSalary: "₹22 LPA - ₹26 LPA CTC",
    experience: "Fresher / 0-1 yr",
    postedAt: "1 day ago",
    deadline: "2026-03-31",
    applicantsCount: 88,
    matchScore: 84,
    status: "OPEN",
  },
  {
    id: "opp-infy-03",
    type: "INTERNSHIP",
    companyId: "comp-infy",
    companyName: "Infosys Labs",
    companyLogo: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=80&auto=format&fit=crop&q=80",
    title: "AI Systems & Enterprise Integration Intern",
    description: "Design agentic workflow benchmarks and evaluate real-time skill matching algorithms for enterprise partners.",
    skillsRequired: ["TypeScript", "React.js & Next.js", "Node.js & Express"],
    location: "Pune / Remote",
    workMode: "REMOTE",
    stipendOrSalary: "₹45,000 / month",
    duration: "4 Months",
    postedAt: "5 days ago",
    deadline: "2026-04-30",
    applicantsCount: 210,
    matchScore: 96,
    status: "OPEN",
  },
  {
    id: "opp-zh-04",
    type: "JOB",
    companyId: "comp-zoho",
    companyName: "Zoho Corporation",
    companyLogo: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=80&auto=format&fit=crop&q=80",
    title: "Full Stack Engineer - Cloud Office Suite",
    description: "Build robust, browser-first collaborative real-time editors and offline-first synchronization layers.",
    skillsRequired: ["React.js & Next.js", "TypeScript", "System Design & Caching"],
    location: "Chennai (On-site)",
    workMode: "ON_SITE",
    stipendOrSalary: "₹14 LPA - ₹18 LPA CTC",
    experience: "0-2 yrs",
    postedAt: "1 week ago",
    deadline: "2026-04-10",
    applicantsCount: 95,
    matchScore: 88,
    status: "OPEN",
  },
];

export const INDUSTRY_CHALLENGES: IndustryChallenge[] = [
  {
    id: "chal-01",
    companyId: "comp-rzp",
    companyName: "Razorpay",
    companyLogo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=80&auto=format&fit=crop&q=80",
    title: "High-Concurrency Webhook Ingestion Engine",
    description: "Design and implement a resilient webhook receiver that can safely digest 5,000 bursts/second with idempotency keys, exponential retry backoff, and signature verification.",
    skillsTested: ["Node.js & Express", "System Design & Caching", "PostgreSQL & Database Design"],
    difficulty: "ADVANCED",
    deadline: "2026-03-25",
    reward: "Direct Interview Fast-Track + ₹50,000 Cash Prize + Verified Industry Badge",
    submissionsCount: 46,
    status: "ACTIVE",
  },
  {
    id: "chal-02",
    companyId: "comp-msft",
    companyName: "Microsoft IDC",
    companyLogo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=80&auto=format&fit=crop&q=80",
    title: "Zero-Downtime Microservice Container Failover Simulator",
    description: "Build a prototype testing harness demonstrating automated health probes, graceful connection draining, and circuit breaking in a containerized environment.",
    skillsTested: ["Docker & Containerization", "TypeScript", "System Design & Caching"],
    difficulty: "INTERMEDIATE",
    deadline: "2026-04-05",
    reward: "Summer Cloud Internship Shortlist + Microsoft Tech Mentorship",
    submissionsCount: 32,
    status: "ACTIVE",
  },
];

export const ASSESSMENTS: Assessment[] = [
  {
    id: "asm-docker-level3",
    skillId: "sk-docker",
    skillName: "Docker & Containerization",
    title: "Level 3: Production Docker & Multi-Stage Optimization",
    description: "Validate real-world container hardening, multi-stage compilation caching, and non-root security boundaries.",
    difficulty: "INTERMEDIATE",
    durationMinutes: 15,
    passingScore: 80,
    questions: [
      {
        id: "q1",
        question: "Why should you use multi-stage builds in a production Dockerfile for a Node.js/TypeScript application?",
        options: [
          "To keep compiler tools (typescript, build-essential) out of the final runtime image, shrinking image size and attack surface.",
          "Because Docker requires multiple FROM statements for each port exposed.",
          "To automatically enable CPU hardware acceleration.",
          "To bypass Unix file permission checks during container initialization."
        ],
        correctIndex: 0,
        explanation: "Multi-stage builds allow separating build dependencies from the lean production image, dramatically improving security and lowering deployment bandwidth."
      },
      {
        id: "q2",
        question: "What is the security risk of running a container process as the default root user (UID 0)?",
        options: [
          "It forces the container to run in read-only mode.",
          "If a container breakout vulnerability occurs, the adversary gains root access on the host operating system.",
          "Docker daemon terminates any container with UID 0 after 24 hours.",
          "Network packets cannot be encrypted."
        ],
        correctIndex: 1,
        explanation: "Container processes should always be restricted with a dedicated non-privileged user (`USER node` or `USER 1001`) to prevent host-level privilege escalation."
      },
      {
        id: "q3",
        question: "In Docker layer caching, which instruction should be placed FIRST to maximize cache reuse when application code changes?",
        options: [
          "COPY . .",
          "RUN npm test",
          "COPY package.json package-lock.json ./ and RUN npm ci",
          "ENTRYPOINT [\"node\", \"dist/server.js\"]"
        ],
        correctIndex: 2,
        explanation: "Copying lockfiles and running `npm ci` first ensures that package installation is cached unless dependencies change, speeding up CI builds."
      },
      {
        id: "q4",
        question: "What is the purpose of the HEALTHCHECK directive in a Dockerfile?",
        options: [
          "It runs antivirus scans on the filesystem during image build.",
          "It allows the orchestrator (Docker/Kubernetes) to verify if the server inside is actively responding to requests rather than just having an active PID.",
          "It measures RAM thermal throttling on the host node.",
          "It automatically restarts the server if CPU usage exceeds 90%."
        ],
        correctIndex: 1,
        explanation: "HEALTHCHECK tells Docker how to test a container to check that it is still working, allowing orchestrators to detect deadlocks or frozen processes."
      }
    ]
  },
  {
    id: "asm-k8s-level2",
    skillId: "sk-k8s",
    skillName: "Kubernetes & Cloud Orchestration",
    title: "Level 2: Kubernetes Pods, Services, and Deployments",
    description: "Test core understanding of Kubernetes declarative workload manifests, cluster IP routing, and replica sets.",
    difficulty: "BEGINNER",
    durationMinutes: 12,
    passingScore: 75,
    questions: [
      {
        id: "kq1",
        question: "What is the fundamental difference between a Pod and a Container in Kubernetes?",
        options: [
          "A Pod is the smallest deployable computing unit and can encapsulate one or more tightly coupled containers sharing network and storage.",
          "Containers run on Linux, while Pods only run on Windows nodes.",
          "A Pod is a database instance, whereas a container is an API server.",
          "Pods cannot have IP addresses, but containers have public static IPs."
        ],
        correctIndex: 0,
        explanation: "A Pod provides shared network namespace (localhost) and shared storage volumes for co-located containers."
      },
      {
        id: "kq2",
        question: "Which Kubernetes object provides a stable virtual IP and DNS name to route traffic across ephemeral Pod replicas?",
        options: [
          "ConfigMap",
          "Service",
          "DaemonSet",
          "HorizontalPodAutoscaler"
        ],
        correctIndex: 1,
        explanation: "A Service defines a logical set of Pods and a policy by which to access them (ClusterIP, NodePort, LoadBalancer)."
      }
    ]
  }
];

export const INITIAL_INTERNSHIP_LOGS: InternshipProgressLog[] = [
  {
    id: "log-w8",
    weekNumber: 8,
    tasksCompleted: [
      "Configured automated Terraform cloud modules for Redis ElastiCache cluster",
      "Created Grafana dashboards for p99 latency alerts",
      "Conducted load testing up to 8,000 concurrent websocket connections"
    ],
    tasksPending: [
      "Finalize disaster recovery multi-region failover runbook",
      "Document API rate limiter boundaries"
    ],
    mentorFeedback: "Exceptional rigor shown in the Redis failover benchmarks. Priya demonstrated mastery in connection pooling under high load.",
    skillsImproved: ["Redis & Caching", "Cloud Infrastructure", "Terraform"],
    rating: 5,
    submittedAt: "2026-03-02",
    status: "APPROVED"
  },
  {
    id: "log-w7",
    weekNumber: 7,
    tasksCompleted: [
      "Implemented JWT token refresh rotation with Redis blacklist",
      "Set up Docker compose local developer environment"
    ],
    tasksPending: [
      "Benchmarking load with k6"
    ],
    mentorFeedback: "Good work adhering to OWASP API security guidelines.",
    skillsImproved: ["API Security", "Docker"],
    rating: 4,
    submittedAt: "2026-02-23",
    status: "APPROVED"
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "notif-1",
    title: "Skill Verification Approved! ✓",
    message: "Dr. K. Ramanathan verified your 'Node.js & Express' lab evidence. Verified Level upgraded to 3.",
    type: "VERIFICATION",
    read: false,
    timeAgo: "2 hours ago",
    actionUrl: "/student/skills",
  },
  {
    id: "notif-2",
    title: "High Match Opportunity Alert",
    message: "Microsoft IDC posted 'Cloud Infrastructure Intern' with a 91% skill alignment with your verified profile.",
    type: "OPPORTUNITY",
    read: false,
    timeAgo: "5 hours ago",
    actionUrl: "/student/internships",
  },
  {
    id: "notif-3",
    title: "Skill Decay Warning ⚠️",
    message: "Your 'Docker & Containerization' skill hasn't had verified activity in 90+ days. Take a quick 15-min assessment to renew.",
    type: "ALERT",
    read: false,
    timeAgo: "1 day ago",
    actionUrl: "/student/assessments",
  },
];

export const MOCK_VERIFICATION_REQUESTS = [
  {
    id: "req-v-001",
    studentId: "std-profile-101",
    studentName: "Priya Sharma",
    institution: "IIT Delhi",
    skillId: "sk-k8s",
    skillName: "Kubernetes & Cloud Orchestration",
    claimedLevel: 3,
    evidenceTitle: "Production Helm Charts & Ingress Controller",
    evidenceUrl: "https://github.com/priyasharma/k8s-helm-cluster",
    description: "Configured multi-tier microservices deployment with automated Canary rollouts and Horizontal Pod Autoscaler based on custom Prometheus metrics.",
    submittedAt: "2 hours ago",
    status: "PENDING" as const,
  },
  {
    id: "req-v-002",
    studentId: "std-profile-102",
    studentName: "Aarav Patel",
    institution: "IIT Delhi",
    skillId: "sk-node",
    skillName: "Node.js & Concurrency",
    claimedLevel: 4,
    evidenceTitle: "Distributed Rate Limiter with Redis Leaky Bucket",
    evidenceUrl: "https://github.com/aaravpatel/distributed-rate-limiter",
    description: "Built high-throughput HTTP reverse proxy in Node.js worker threads with Redis Lua script atomic execution.",
    submittedAt: "5 hours ago",
    status: "PENDING" as const,
  },
];

// Convenience Aliases for Clean Imports
export const MOCK_USERS = DEMO_USERS;
export const MOCK_STUDENT_PROFILE = INITIAL_STUDENT_PROFILE;
export const MOCK_OPPORTUNITIES = OPPORTUNITIES;
export const MOCK_NOTIFICATIONS = INITIAL_NOTIFICATIONS;

