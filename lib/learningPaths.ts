export type LearningPath = {
  slug: string;
  name: string;
  audience: string;
  description: string;
  conceptSlugs: string[];
};

export const recommendedBefore: Record<string, string[]> = {
  rag: [],
  mcp: [],
  agents: ["mcp"],
  langchain: ["rag"],
  langgraph: ["agents"],
  "multi-agent": ["agents", "langgraph"],
};

export const learningPaths: LearningPath[] = [
  {
    slug: "agent-engineer",
    name: "Agent Engineer",
    audience: "Build tool-using, stateful agents",
    description: "Start with connections, then learn the agent loop, explicit workflow control, and multi-agent coordination.",
    conceptSlugs: ["mcp", "agents", "langgraph", "multi-agent"],
  },
  {
    slug: "knowledge-to-action",
    name: "Knowledge → Action",
    audience: "Build grounded AI applications",
    description: "Learn how retrieval supplies context, frameworks compose the application, and agents turn information into action.",
    conceptSlugs: ["rag", "langchain", "mcp", "agents", "langgraph"],
  },
  {
    slug: "framework-control",
    name: "Framework & Control",
    audience: "Understand orchestration choices",
    description: "Move from reusable LLM building blocks to stateful graphs and coordinated specialist agents.",
    conceptSlugs: ["rag", "langchain", "agents", "langgraph", "multi-agent"],
  },
];

export function getPath(slug: string) {
  return learningPaths.find((path) => path.slug === slug);
}

export function getRecommendedNext(completed: string[]) {
  const completedSet = new Set(completed);
  const candidates = Object.keys(recommendedBefore).filter((slug) => !completedSet.has(slug));

  return candidates.find((slug) =>
    recommendedBefore[slug].every((required) => completedSet.has(required)),
  ) ?? candidates[0] ?? null;
}
