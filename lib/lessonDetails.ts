export type LessonDetail = {
  why: string;
  principle: string;
  steps: { title: string; detail: string }[];
  engineering: { label: string; value: string }[];
  challenge: string;
};

export const lessonDetails: Record<string, LessonDetail> = {
  mcp: {
    why: "AI applications often need the same kinds of external capabilities—files, repositories, databases, internal tools—but every integration used to require its own custom adapter.",
    principle: "Separate the AI application from the details of each external system by putting a common protocol between them.",
    steps: [
      { title: "Discover", detail: "The AI application learns what a connected MCP server exposes." },
      { title: "Choose", detail: "The model or application selects the capability needed for the current task." },
      { title: "Invoke", detail: "A structured request is sent through the MCP connection." },
      { title: "Use the result", detail: "The returned data becomes context the AI application can reason over." },
    ],
    engineering: [
      { label: "Core roles", value: "Host · MCP Client · MCP Server" },
      { label: "Capabilities", value: "Tools · Resources · Prompts" },
      { label: "Transports", value: "stdio or HTTP-based transport" },
      { label: "Design concern", value: "Permissions and trust boundaries still matter" },
    ],
    challenge: "Explain why MCP reduces integration complexity without saying that MCP itself is an agent.",
  },
  rag: {
    why: "A model cannot reliably answer questions about information that is private, newly published, or too specific to have been captured during training.",
    principle: "Retrieve the most relevant evidence at question time, place that evidence in context, and let the model answer from it.",
    steps: [
      { title: "Ask", detail: "A user question enters the system." },
      { title: "Retrieve", detail: "Search finds the chunks or records most likely to contain the answer." },
      { title: "Augment", detail: "The retrieved evidence is inserted into the model's context." },
      { title: "Generate", detail: "The model produces an answer grounded in the supplied evidence." },
    ],
    engineering: [
      { label: "Typical retrieval", value: "Vector search, keyword search, hybrid search" },
      { label: "Input artifact", value: "Documents split into searchable chunks" },
      { label: "Quality risk", value: "Bad retrieval produces confidently bad context" },
      { label: "Not the same as", value: "Fine-tuning or changing model weights" },
    ],
    challenge: "Explain why a larger context window does not automatically remove the need for retrieval.",
  },
  agents: {
    why: "Many useful tasks require more than one model response: the system must decide, act, inspect what happened, and continue until the goal is reached.",
    principle: "Put the model inside a controlled action loop where it can choose tools, observe results, and decide what should happen next.",
    steps: [
      { title: "Receive a goal", detail: "The agent starts with an objective, constraints, and available tools." },
      { title: "Decide", detail: "The model chooses the next useful action instead of only writing an answer." },
      { title: "Act", detail: "A tool call changes or observes the outside world." },
      { title: "Observe and repeat", detail: "The result becomes new state for the next decision." },
    ],
    engineering: [
      { label: "Core loop", value: "Reason · Act · Observe · Continue/Stop" },
      { label: "State", value: "Goal, conversation, tool results, intermediate work" },
      { label: "Production concern", value: "Permission limits, retries, verification, timeouts" },
      { label: "Failure mode", value: "More autonomy can amplify a bad decision" },
    ],
    challenge: "Describe the difference between an assistant that answers a question and an agent that completes a task.",
  },
  "multi-agent": {
    why: "Some tasks combine distinct kinds of work—planning, research, implementation, review—and one general-purpose agent can become overloaded or hard to control.",
    principle: "Split responsibilities between specialized agents only when the boundaries make the overall system easier to reason about.",
    steps: [
      { title: "Decompose", detail: "A coordinator or workflow divides a larger task into meaningful responsibilities." },
      { title: "Delegate", detail: "Specialists receive focused context, tools, and goals." },
      { title: "Exchange", detail: "Agents pass results through messages or shared state." },
      { title: "Synthesize", detail: "A coordinator combines, verifies, or routes the work onward." },
    ],
    engineering: [
      { label: "Common patterns", value: "Supervisor · Handoff · Debate · Pipeline" },
      { label: "Shared concern", value: "State ownership and context boundaries" },
      { label: "Tradeoff", value: "Specialization versus coordination overhead" },
      { label: "Good reason to use it", value: "Different roles genuinely require different tools or context" },
    ],
    challenge: "Give one case where multiple agents are justified and one where a single agent would be simpler.",
  },
  langchain: {
    why: "LLM applications repeatedly need the same plumbing: prompts, model calls, retrieval, tools, structured output, and provider integrations.",
    principle: "Compose reusable building blocks instead of hand-writing every integration and orchestration detail from scratch.",
    steps: [
      { title: "Choose components", detail: "Select a model, prompt, retriever, tools, parsers, and other building blocks." },
      { title: "Compose", detail: "Connect components into a runnable application flow." },
      { title: "Invoke", detail: "Pass application input through the composed pipeline." },
      { title: "Extend", detail: "Swap providers or add retrieval, tools, tracing, or structured outputs as needed." },
    ],
    engineering: [
      { label: "Role", value: "Application framework and integration toolkit" },
      { label: "Useful for", value: "Provider abstractions and reusable AI-app components" },
      { label: "Not required", value: "You can build the same architecture without LangChain" },
      { label: "Related framework", value: "LangGraph for explicit stateful workflows" },
    ],
    challenge: "Explain what value LangChain provides without describing it as an LLM or an agent.",
  },
  langgraph: {
    why: "Agent workflows often stop being linear: they branch, loop, wait for people, retry work, and need durable state between steps.",
    principle: "Represent the workflow explicitly as state plus nodes and transitions, so control flow is visible and inspectable.",
    steps: [
      { title: "Define state", detail: "Decide what information must survive as the workflow moves between steps." },
      { title: "Add nodes", detail: "Each node performs a model call, tool action, transformation, or human step." },
      { title: "Connect edges", detail: "Transitions define what can happen next, including conditions and loops." },
      { title: "Checkpoint", detail: "Persist state so long-running or interruptible workflows can resume safely." },
    ],
    engineering: [
      { label: "Mental model", value: "State machine / graph of executable steps" },
      { label: "Strength", value: "Loops, branching, persistence, human-in-the-loop" },
      { label: "Not this", value: "A knowledge graph or graph database" },
      { label: "Useful when", value: "Control flow matters as much as model reasoning" },
    ],
    challenge: "Explain why LangGraph's “graph” refers to workflow control flow rather than knowledge relationships.",
  },
};
