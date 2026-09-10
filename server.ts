import express, { Request, Response } from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Lazy init or standard server-side client
let aiClient: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI | null {
  if (!process.env.GEMINI_API_KEY) {
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// API Health Check
app.get("/api/health", (_req: Request, res: Response) => {
  res.json({
    status: "ok",
    platform: "SkillBridge",
    hasGeminiKey: Boolean(process.env.GEMINI_API_KEY),
    timestamp: new Date().toISOString(),
  });
});

// 1. Skill Extraction API: Parses raw resume / text / project description into structured skills
app.post("/api/gemini/extract-skills", async (req: Request, res: Response) => {
  try {
    const { text, context } = req.body;
    if (!text || typeof text !== "string") {
      return res.status(400).json({ error: "Missing or invalid 'text' field" });
    }

    const ai = getGenAI();
    if (!ai) {
      // Fallback heuristics if API key is not yet configured
      return res.json({
        source: "heuristic-fallback",
        extractedSkills: [
          { name: "React.js", category: "Frontend", level: 4, confidence: 0.95, evidenceKeywords: ["components", "hooks", "state"] },
          { name: "TypeScript", category: "Programming Languages", level: 4, confidence: 0.9, evidenceKeywords: ["interfaces", "types"] },
          { name: "Node.js", category: "Backend", level: 3, confidence: 0.85, evidenceKeywords: ["express", "REST API"] },
          { name: "PostgreSQL", category: "Databases", level: 3, confidence: 0.8, evidenceKeywords: ["SQL", "relational", "schema"] },
          { name: "Docker", category: "DevOps & Cloud", level: 2, confidence: 0.7, evidenceKeywords: ["containers", "dockerfile"] },
        ],
        summary: "Extracted primary technical competencies spanning Full-Stack and Database Engineering.",
      });
    }

    const prompt = `You are the AI Skill Extraction Engine of the SkillBridge platform.
Analyze the following text (resume, project description, or coursework) and extract structured skills with estimated proficiency (1 to 5), category, evidence keywords, and confidence.
Text to analyze:
"""${text.slice(0, 5000)}"""

Additional context: ${context || "Student Portfolio / Resume"}

Return strictly valid JSON with this format:
{
  "summary": "Short 1-2 sentence assessment summary",
  "extractedSkills": [
    {
      "name": "Skill Name",
      "category": "Frontend | Backend | Databases | AI/ML | DevOps & Cloud | Core CS | Soft Skills",
      "level": 3, // integer 1 (Beginner) to 5 (Expert)
      "confidence": 0.92, // float 0 to 1
      "evidenceKeywords": ["keyword1", "keyword2"]
    }
  ]
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const outputText = response.text || "{}";
    const parsed = JSON.parse(outputText);
    return res.json({ source: "gemini-3.8-flash", ...parsed });
  } catch (error: any) {
    console.error("Error in /api/gemini/extract-skills:", error);
    return res.status(500).json({
      error: "Skill extraction failed",
      details: error?.message || String(error),
    });
  }
});

// 2. Skill Gap Engine & Roadmap API
app.post("/api/gemini/gap-analysis", async (req: Request, res: Response) => {
  try {
    const { currentSkills, targetRole } = req.body;
    const ai = getGenAI();

    if (!ai) {
      return res.json({
        source: "fallback",
        overallReadiness: 74,
        matchExplanation: `Strong match in core fundamentals, but missing industry-level distributed systems and cloud orchestration required for ${targetRole || "Software Engineer"}.`,
        matchedSkills: [
          { name: "React.js", currentLevel: 4, requiredLevel: 4, status: "MET" },
          { name: "TypeScript", currentLevel: 3, requiredLevel: 4, status: "PARTIAL" },
        ],
        missingSkills: [
          { name: "Docker & Kubernetes", currentLevel: 1, requiredLevel: 3, priority: "HIGH" },
          { name: "System Design & Caching", currentLevel: 2, requiredLevel: 4, priority: "HIGH" },
        ],
        recommendedMilestones: [
          { week: 1, title: "Containerize existing React + Node applications with Docker", hours: 10 },
          { week: 2, title: "Implement Redis caching layer and connection pooling", hours: 12 },
          { week: 3, title: "Deploy microservice to Cloud Run / Kubernetes cluster", hours: 14 },
          { week: 4, title: "Earn Faculty/Mentor verification through capstone project submission", hours: 8 },
        ],
      });
    }

    const prompt = `You are SkillBridge's AI Employability & Skill Gap Engine.
The student is aiming for the career role: "${targetRole || "Full Stack Developer"}".
Their current verified & claimed skills are:
${JSON.stringify(currentSkills || [])}

Perform an in-depth gap analysis and provide:
1. Overall readiness score (0 to 100)
2. Explainability summary explaining WHY this score was assigned and what the student excels at or lacks
3. List of matched skills (current vs required)
4. List of missing or lagging skills (with priority HIGH/MEDIUM/LOW)
5. 4-week structured actionable learning milestone plan

Return strictly valid JSON:
{
  "overallReadiness": 78,
  "matchExplanation": "Explanation text...",
  "matchedSkills": [{"name": "Skill", "currentLevel": 3, "requiredLevel": 3, "status": "MET"}],
  "missingSkills": [{"name": "Skill", "currentLevel": 1, "requiredLevel": 3, "priority": "HIGH"}],
  "recommendedMilestones": [{"week": 1, "title": "Milestone description", "hours": 10}]
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    return res.json({ source: "gemini-3.8-flash", ...parsed });
  } catch (error: any) {
    console.error("Error in /api/gemini/gap-analysis:", error);
    return res.status(500).json({
      error: "Gap analysis failed",
      details: error?.message || String(error),
    });
  }
});

// 3. Career Simulator API: "What-If" Analysis
app.post("/api/gemini/career-simulate", async (req: Request, res: Response) => {
  try {
    const { currentProfile, targetRole, hypotheticalSkills } = req.body;
    const ai = getGenAI();

    if (!ai) {
      return res.json({
        source: "fallback",
        initialScore: 68,
        projectedScore: 89,
        scoreDelta: "+21%",
        unlockedOpportunitiesCount: 14,
        keyInsight: `Acquiring ${hypotheticalSkills?.join(", ") || "cloud skills"} bridges the critical gap between academic junior coder and production-ready engineer.`,
        salaryImpactEstimate: "₹8.5 LPA → ₹14 LPA",
        recommendedCertifications: ["AWS Certified Developer Associate", "Docker Certified Associate"],
      });
    }

    const prompt = `You are SkillBridge's What-If Career Simulator.
Current role target: ${targetRole}
Current student skills: ${JSON.stringify(currentProfile?.skills || [])}
Hypothetical skills added or upgraded: ${JSON.stringify(hypotheticalSkills || [])}

Calculate the quantitative and qualitative impact of acquiring these skills.
Return strictly valid JSON:
{
  "initialScore": 68,
  "projectedScore": 89,
  "scoreDelta": "+21%",
  "unlockedOpportunitiesCount": 16,
  "keyInsight": "Detailed explanation of why these specific skills cause such a leap",
  "salaryImpactEstimate": "e.g. ₹7.5 LPA → ₹13.2 LPA",
  "recommendedCertifications": ["Cert 1", "Cert 2"]
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    return res.json({ source: "gemini-3.8-flash", ...parsed });
  } catch (error: any) {
    console.error("Error in /api/gemini/career-simulate:", error);
    return res.status(500).json({
      error: "Simulation failed",
      details: error?.message || String(error),
    });
  }
});

// 4. Industry Challenge Evaluation
app.post("/api/gemini/evaluate-challenge", async (req: Request, res: Response) => {
  try {
    const { challengeTitle, submissionNotes, codeOrArtifact } = req.body;
    const ai = getGenAI();

    if (!ai) {
      return res.json({
        source: "fallback",
        score: 88,
        grade: "A",
        feedback: "Solid architecture, clean modular separation, and evidence of edge case handling. Minor improvements needed in test coverage.",
        demonstratedSkills: [
          { skill: "API Design", score: 92 },
          { skill: "Data Security", score: 85 },
          { skill: "Error Handling", score: 88 }
        ],
        industryReadinessBoost: "+4 pts",
        facultyEndorsementRecommendation: "Recommended for immediate faculty verification."
      });
    }

    const prompt = `You are an automated industry evaluator for Hackathon/Enterprise Challenges on SkillBridge.
Challenge: "${challengeTitle}"
Student notes: "${submissionNotes}"
Submission code/link/snippet:
"""${(codeOrArtifact || "").slice(0, 4000)}"""

Evaluate this submission rigorously. Provide score (0-100), grade (A+, A, B, C), detailed feedback, demonstrated skills breakdown, and endorsement recommendation.
Return strictly valid JSON:
{
  "score": 90,
  "grade": "A",
  "feedback": "...",
  "demonstratedSkills": [{"skill": "Skill Name", "score": 90}],
  "industryReadinessBoost": "+5 pts",
  "facultyEndorsementRecommendation": "..."
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    return res.json({ source: "gemini-3.8-flash", ...parsed });
  } catch (error: any) {
    console.error("Error in /api/gemini/evaluate-challenge:", error);
    return res.status(500).json({
      error: "Evaluation failed",
      details: error?.message || String(error),
    });
  }
});

async function startServer() {
  // Vite middleware in development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`SkillBridge Enterprise server running on http://localhost:${PORT}`);
  });
}

startServer();
