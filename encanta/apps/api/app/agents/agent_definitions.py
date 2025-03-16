from openai import OpenAI
import os
import json
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize OpenAI client
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

class BaseAgent:
    def __init__(self, name, system_prompt, model="gpt-4o", temperature=0.7):
        """Initialize a base agent with common properties

        Args:
            name: The name of the agent
            system_prompt: The base system prompt for the agent
            model: The OpenAI model to use
            temperature: Creativity temperature (0.0 to 1.0)
        """
        self.name = name
        self.base_system_prompt = system_prompt
        self.model = model
        self.temperature = temperature
        self.custom_instructions = ""
        self.knowledge_context = ""
        self.examples = []

    def add_custom_instructions(self, instructions):
        """Add custom instructions to the agent"""
        self.custom_instructions = instructions
        return self

    def add_knowledge_context(self, context):
        """Add knowledge context to the agent"""
        self.knowledge_context = context
        return self

    def add_examples(self, examples):
        """Add few-shot examples to the agent"""
        self.examples = examples
        return self

    def get_full_system_prompt(self):
        """Generate the complete system prompt with all context"""
        prompt = self.base_system_prompt

        if self.custom_instructions:
            prompt += f"\n\nCustom Instructions:\n{self.custom_instructions}"

        if self.knowledge_context:
            prompt += f"\n\nKnowledge Context:\n{self.knowledge_context}"

        if self.examples:
            prompt += "\n\nExamples:"
            for example in self.examples:
                prompt += f"\n\nInput: {example['input']}\nOutput: {example['output']}"

        return prompt

    async def run(self, prompt, conversation_history=None):
        """Run the agent with a prompt

        Args:
            prompt: The user prompt to send to the agent
            conversation_history: Optional list of previous messages

        Returns:
            The agent's response text
        """
        messages = [{"role": "system", "content": self.get_full_system_prompt()}]

        # Add conversation history if provided
        if conversation_history:
            messages.extend(conversation_history)

        # Add current prompt
        messages.append({"role": "user", "content": prompt})

        response = client.chat.completions.create(
            model=self.model,
            messages=messages,
            temperature=self.temperature
        )

        return response.choices[0].message.content

# Define specialized agents
def create_ideation_agent(workspace_id=None, custom_config=None):
    """Create an agent specialized for content ideation"""
    base_system_prompt = """
    You are an expert content ideation specialist. Your role is to generate creative,
    engaging, and original content ideas based on the provided topic and target audience.

    Focus on:
    - Creating original angles and approaches
    - Understanding audience needs and interests
    - Aligning ideas with marketing goals
    - Considering SEO and discoverability

    For each idea, provide:
    1. A compelling headline
    2. A brief description (2-3 sentences)
    3. Key points to include
    4. Target keywords
    """

    agent = BaseAgent("IdeationAgent", base_system_prompt, "gpt-4o")

    # Apply custom configuration if provided
    if custom_config:
        if "instructions" in custom_config:
            agent.add_custom_instructions(custom_config["instructions"])
        if "examples" in custom_config:
            agent.add_examples(custom_config["examples"])
        if "temperature" in custom_config:
            agent.temperature = custom_config["temperature"]
        if "model" in custom_config:
            agent.model = custom_config["model"]

    return agent

def create_research_agent(workspace_id=None, custom_config=None):
    """Create an agent specialized for content research"""
    base_system_prompt = """
    You are an expert content researcher. Your role is to gather relevant information,
    facts, statistics, and insights on a given topic to support content creation.

    Focus on:
    - Finding key facts and statistics
    - Identifying common questions and pain points
    - Analyzing the topic from different perspectives
    - Providing context and background information

    Your research should be:
    1. Accurate and fact-based
    2. Well-structured and organized
    3. Relevant to the target audience
    4. Comprehensive yet concise
    """

    agent = BaseAgent("ResearchAgent", base_system_prompt, "gpt-4o")

    # Apply custom configuration if provided
    if custom_config:
        if "instructions" in custom_config:
            agent.add_custom_instructions(custom_config["instructions"])
        if "examples" in custom_config:
            agent.add_examples(custom_config["examples"])
        if "temperature" in custom_config:
            agent.temperature = custom_config["temperature"]
        if "model" in custom_config:
            agent.model = custom_config["model"]

    return agent

def create_content_agent(workspace_id=None, custom_config=None):
    """Create an agent specialized for content writing"""
    base_system_prompt = """
    You are an expert content writer. Your role is to create high-quality,
    engaging content based on the provided outline and research.

    Focus on:
    - Clear, concise writing with a consistent tone
    - Strong headlines and subheadings
    - Engaging introductions and conclusions
    - Incorporating SEO best practices naturally
    - Adding appropriate calls-to-action

    Your content should be:
    1. Well-structured and easy to navigate
    2. Optimized for the specified audience
    3. Formatted properly for the content type
    4. Written in the requested tone and style

    Use HTML formatting for structure where appropriate.
    """

    agent = BaseAgent("ContentAgent", base_system_prompt, "gpt-4o")

    # Apply custom configuration if provided
    if custom_config:
        if "instructions" in custom_config:
            agent.add_custom_instructions(custom_config["instructions"])
        if "examples" in custom_config:
            agent.add_examples(custom_config["examples"])
        if "temperature" in custom_config:
            agent.temperature = custom_config["temperature"]
        if "model" in custom_config:
            agent.model = custom_config["model"]

    return agent

def create_editor_agent(workspace_id=None, custom_config=None):
    """Create an agent specialized for content editing"""
    base_system_prompt = """
    You are an expert content editor. Your role is to refine and improve content
    while maintaining the original voice and intent.

    Focus on:
    - Correcting grammar and spelling
    - Improving clarity and flow
    - Ensuring consistent tone and style
    - Optimizing for readability
    - Fact-checking and accuracy

    Your edits should:
    1. Preserve the original meaning and intent
    2. Maintain the author's voice
    3. Improve structure and organization
    4. Enhance overall quality and professionalism

    Maintain HTML formatting where present.
    """

    agent = BaseAgent("EditorAgent", base_system_prompt, "gpt-4o")

    # Apply custom configuration if provided
    if custom_config:
        if "instructions" in custom_config:
            agent.add_custom_instructions(custom_config["instructions"])
        if "examples" in custom_config:
            agent.add_examples(custom_config["examples"])
        if "temperature" in custom_config:
            agent.temperature = custom_config["temperature"]
        if "model" in custom_config:
            agent.model = custom_config["model"]

    return agent 