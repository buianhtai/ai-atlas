export type Concept = {
  slug: string;
  name: string;
  category: string;
  simple: string;
  analogy: string;
  problem: string;
  notThis: string;
  realExample: string;
  related: string[];
};

export const concepts: Concept[] = [
  {
    slug: "mcp",
    name: "MCP",
    category: "Agent Infrastructure",
    simple: "A standard way for AI applications to connect to tools and data sources.",
    analogy: "Think of MCP like USB-C for AI: one common connector instead of building a different cable for every tool.",
    problem: "An AI model can reason, but it cannot automatically read your GitHub repo, query a database, or call an internal service. MCP gives applications a consistent protocol for exposing those capabilities.",
    notThis: "MCP is not an AI agent and it is not a model. It is the connection layer that can help an agent reach tools and context.",
    realExample: "A coding assistant can connect through MCP servers to GitHub, internal documentation, a ticket system, and a database without inventing a new integration format for each source.",
    related: ["Agents", "Tool Calling", "RAG"]
  },
  {
    slug: "rag",
    name: "RAG",
    category: "Knowledge",
    simple: "Let the model look up useful information before it answers.",
    analogy: "It is like taking an open-book exam: first find the right pages, then write the answer.",
    problem: "Models do not know your newest or private information. RAG retrieves relevant context at question time and places it in the model's working context.",
    notThis: "RAG is not the same as training or fine-tuning. It changes the information supplied for an answer, not the model weights.",
    realExample: "Ask a support assistant about an internal policy; it searches the policy library, retrieves relevant sections, and answers using those sections.",
    related: ["Embeddings", "Vector DB", "Knowledge Graph"]
  },
  {
    slug: "agents",
    name: "AI Agents",
    category: "Agent Systems",
    simple: "A model that can decide what actions to take, use tools, observe results, and continue toward a goal.",
    analogy: "A chatbot is like an advisor. An agent is closer to an assistant who can also pick up the phone, open files, and complete steps.",
    problem: "Some tasks require several decisions and actions, not one answer. Agents create a loop: think, act, observe, and decide what to do next.",
    notThis: "An agent is not automatically autonomous or reliable. Its permissions, tools, limits, and verification still matter.",
    realExample: "An operations agent investigates an incident by reading logs, checking deployments, comparing recent changes, and preparing a diagnosis.",
    related: ["MCP", "Multi-Agent", "LangGraph"]
  },
  {
    slug: "multi-agent",
    name: "Multi-Agent",
    category: "Agent Systems",
    simple: "Several specialized agents cooperate on one larger task.",
    analogy: "Instead of one employee doing everything, use a small team where each person has a specialty.",
    problem: "Large tasks can involve planning, research, coding, validation, and domain expertise. Multi-agent systems split responsibilities and coordinate results.",
    notThis: "More agents do not automatically mean better results. Coordination overhead can make a simple problem worse.",
    realExample: "A planner agent decomposes a migration, a schema agent analyzes data models, and a reviewer agent validates the proposed changes.",
    related: ["Agents", "LangGraph", "Orchestration"]
  },
  {
    slug: "langchain",
    name: "LangChain",
    category: "Frameworks",
    simple: "A toolkit for composing LLM calls, tools, retrieval, prompts, and application logic.",
    analogy: "Think of it as a box of Lego pieces for building LLM applications.",
    problem: "AI apps repeat common patterns: prompts, model calls, retrieval, tool integration, structured output, and state. Frameworks package those patterns.",
    notThis: "LangChain is not an LLM and it is not required to build an AI application.",
    realExample: "A developer uses LangChain components to retrieve documentation, call a model, parse structured output, and invoke tools.",
    related: ["LangGraph", "RAG", "Agents"]
  },
  {
    slug: "langgraph",
    name: "LangGraph",
    category: "Frameworks",
    simple: "A framework for building stateful agent workflows as graphs of steps and transitions.",
    analogy: "Imagine drawing a flowchart where each box can think or act, and the arrows decide what happens next.",
    problem: "Agent workflows often need loops, branching, checkpoints, human approval, and durable state. A graph makes those transitions explicit.",
    notThis: "LangGraph is not a knowledge graph. The word graph here describes workflow control flow.",
    realExample: "An agent checks an answer, loops back for more research if confidence is low, and requests human approval before a risky action.",
    related: ["Agents", "Multi-Agent", "State Machines"]
  }
];

export function getConcept(slug: string) {
  return concepts.find((concept) => concept.slug === slug);
}
