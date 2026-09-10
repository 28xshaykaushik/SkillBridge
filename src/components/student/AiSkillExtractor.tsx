import React, { useState } from "react";
import { extractSkillsWithAI } from "../../services/api";
import {
  FileSearch,
  Sparkles,
  Upload,
  CheckCircle2,
  Cpu,
  Layers,
  ArrowRight,
  RefreshCw,
  Copy,
} from "lucide-react";

interface AiSkillExtractorProps {
  onAddExtractedSkills: (skills: any[]) => void;
}

const SAMPLE_RESUMES = {
  FULLSTACK: `Priya Sharma | B.Tech CSE | IIT Delhi | 2027
Summary: Software engineering undergrad with production experience building responsive micro-frontends in React 19, TypeScript, and Tailwind CSS.
Backend: Built high-throughput RESTful services using Node.js and Express with PostgreSQL schemas and Redis caching layers.
DevOps: Implemented multi-stage Docker builds, GitHub Actions CI/CD automation pipelines, and deployed containerized services to AWS ECS.
Projects: E-Commerce Storefront (React, Next.js, Stripe, PostgreSQL, 10k users), Distributed Rate Limiter (Redis, Token Bucket algorithm, Go).`,
  AIML: `Aryan Gupta | AI Research & Systems | IIT Bombay
Experience: Trained transformer-based language models with PyTorch and Hugging Face. Engineered RAG pipelines using Pinecone vector database and LangChain.
Key Competencies: Python, PyTorch, LangChain, FastAPI, Docker, CUDA optimization, Prompt Engineering, Evaluation Benchmarks.
Publication: Efficient Low-Rank Adaptation for Domain-Specific LLMs (Accepted at AICTE National Research Conclave 2025).`,
};

export const AiSkillExtractor: React.FC<AiSkillExtractorProps> = ({ onAddExtractedSkills }) => {
  const [inputText, setInputText] = useState(SAMPLE_RESUMES.FULLSTACK);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [addedSuccess, setAddedSuccess] = useState(false);

  const handleExtract = async () => {
    if (!inputText.trim()) return;
    setIsLoading(true);
    setAddedSuccess(false);
    try {
      const data = await extractSkillsWithAI(inputText, "Resume / Project Evaluation");
      setResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApplyToProfile = () => {
    if (!result?.extractedSkills) return;
    onAddExtractedSkills(result.extractedSkills);
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 text-left">
      {/* Header */}
      <div className="pb-4 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-bold font-display text-slate-900">
            AI Skill Extraction Engine
          </h2>
          <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-bold text-indigo-700 border border-indigo-200">
            Gemini 3.8 Flash
          </span>
        </div>
        <p className="text-xs text-slate-500 mt-1">
          Paste your resume, project README, or coursework summary. Gemini extracts structured competencies, levels, and evidence keywords.
        </p>
      </div>

      {/* Preset Quick Loaders */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold text-slate-500">Quick Test Presets:</span>
        <button
          onClick={() => setInputText(SAMPLE_RESUMES.FULLSTACK)}
          className="rounded-lg border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-50"
        >
          Full-Stack & Cloud Resume
        </button>
        <button
          onClick={() => setInputText(SAMPLE_RESUMES.AIML)}
          className="rounded-lg border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-50"
        >
          AI/ML Solutions Profile
        </button>
      </div>

      {/* Input Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-900">Input Resume or Project Text</span>
            <span className="text-[11px] text-slate-400">{inputText.length} chars</span>
          </div>

          <textarea
            rows={10}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Paste raw text here..."
            className="w-full rounded-xl border border-slate-200 p-3 text-xs text-slate-800 focus:border-indigo-500 focus:outline-none font-mono leading-relaxed"
          />

          <button
            onClick={handleExtract}
            disabled={isLoading || !inputText.trim()}
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 text-xs font-bold text-white shadow-sm hover:bg-indigo-700 transition-colors disabled:opacity-50"
            id="btn-extract-skills"
          >
            {isLoading ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                Extracting with Gemini...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                Extract Structured Skills
              </>
            )}
          </button>
        </div>

        {/* Results Area */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-900">Extracted Structured Skills</span>
            {result?.source && (
              <span className="text-[10px] font-bold bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full">
                {result.source}
              </span>
            )}
          </div>

          {!result ? (
            <div className="h-64 flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 p-6 text-center text-slate-400">
              <Cpu className="h-8 w-8 mb-2 opacity-50" />
              <p className="text-xs font-semibold text-slate-600">No skills extracted yet.</p>
              <p className="text-[11px] text-slate-400 mt-1">
                Click &quot;Extract Structured Skills&quot; to parse competency metadata.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="rounded-xl bg-slate-50 p-3 text-xs text-slate-700 border border-slate-100">
                <span className="font-bold text-slate-900">AI Assessment Summary: </span>
                {result.summary}
              </div>

              <div className="max-h-64 overflow-y-auto space-y-2 pr-1">
                {result.extractedSkills?.map((skill: any, idx: number) => (
                  <div
                    key={idx}
                    className="rounded-xl border border-slate-200 bg-white p-3 flex items-center justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900">{skill.name}</span>
                        <span className="text-[10px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                          {skill.category}
                        </span>
                      </div>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {skill.evidenceKeywords?.map((kw: string, kidx: number) => (
                          <span
                            key={kidx}
                            className="text-[9px] bg-indigo-50 text-indigo-700 px-1.5 py-0.5 rounded"
                          >
                            #{kw}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="text-xs font-bold text-indigo-600">Level {skill.level}/5</div>
                      <div className="text-[10px] text-slate-400">
                        {Math.round((skill.confidence || 0.9) * 100)}% conf.
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <button
                  onClick={handleApplyToProfile}
                  className={`w-full inline-flex items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-bold transition-all shadow-sm ${
                    addedSuccess
                      ? "bg-emerald-600 text-white"
                      : "bg-slate-900 text-white hover:bg-slate-800"
                  }`}
                  id="btn-apply-extracted-skills"
                >
                  {addedSuccess ? (
                    <>
                      <CheckCircle2 className="h-4 w-4" />
                      Skills Synchronized to Profile!
                    </>
                  ) : (
                    <>
                      <Layers className="h-4 w-4" />
                      Sync Skills to Claimed Matrix
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
