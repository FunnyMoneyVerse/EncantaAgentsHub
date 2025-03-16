from app.agents.agent_definitions import create_ideation_agent, create_research_agent, create_content_agent, create_editor_agent
from app.utils.vector_store import search_similar_documents
from app.utils.supabase_client import supabase
from typing import Dict, Any, List, Optional
import json

async def run_content_generation(params: Dict[str, Any]) -> Dict[str, Any]:
    """Run the full content generation workflow

    Args:
        params: Dictionary containing content parameters
            - topic: Content topic
            - content_type: Type of content (blog, social_post, etc.)
            - tone: Desired tone
            - target_audience: Target audience
            - key_points: Optional key points to include
            - brand_profile: Optional brand guidelines
            - workspace_id: Workspace ID

    Returns:
        Dictionary with the generated content and metadata
    """
    try:
        # Extract parameters
        topic = params.get("topic")
        content_type = params.get("content_type")
        tone = params.get("tone")
        target_audience = params.get("target_audience")
        key_points = params.get("key_points", "")
        brand_profile = params.get("brand_profile")
        workspace_id = params.get("workspace_id")

        if not topic or not content_type or not target_audience or not tone:
            return {
                "success": False,
                "error": "Missing required parameters: topic, content_type, target_audience, and tone are required"
            }

        # Step 1: Retrieve relevant knowledge from vector store
        knowledge_context = ""
        if workspace_id:
            # Convert workspace_id to string if it's not already
            if not isinstance(workspace_id, str):
                workspace_id = str(workspace_id)

            relevant_docs = await search_similar_documents(
                query=topic,
                filter={"workspace_id": workspace_id},
                top_k=3
            )

            if relevant_docs:
                knowledge_context = "Relevant information from knowledge base:\n\n"
                for i, doc in enumerate(relevant_docs):
                    if "metadata" in doc and "text" in doc.metadata:
                        knowledge_context += f"Document {i+1}:\n{doc.metadata['text']}\n\n"

        # Step 2: Prepare brand context
        brand_context = ""
        if brand_profile:
            brand_context = f"""
            Brand Name: {brand_profile.get('name', '')}
            Brand Voice: {brand_profile.get('voice', '')}
            """

            if "guidelines" in brand_profile and brand_profile["guidelines"]:
                # Parse JSON string if needed
                guidelines = brand_profile["guidelines"]
                if isinstance(guidelines, str):
                    try:
                        guidelines = json.loads(guidelines)
                    except:
                        guidelines = {"raw": guidelines}

                if isinstance(guidelines, dict):
                    if "keyMessages" in guidelines:
                        brand_context += f"Key Messages: {guidelines['keyMessages']}\n"
                    if "toneGuidelines" in guidelines:
                        brand_context += f"Tone Guidelines: {guidelines['toneGuidelines']}\n"

        # Step 3: Combine contexts
        full_context = f"{knowledge_context}\n{brand_context}".strip()

        # Step 4: Run ideation agent
        ideation_agent = create_ideation_agent()
        if full_context:
            ideation_agent.add_knowledge_context(full_context)

        ideation_prompt = f"""
        Create content ideas for a {content_type} about "{topic}" targeting {target_audience}.
        The tone should be {tone}.
        {f"Include these key points: {key_points}" if key_points else ""}

        Provide 3-5 creative approaches to this topic.
        """

        ideas = await ideation_agent.run(ideation_prompt)

        # Step 5: Run research agent
        research_agent = create_research_agent()
        if full_context:
            research_agent.add_knowledge_context(full_context)

        research_prompt = f"""
        Research the topic: "{topic}" for a {content_type} targeting {target_audience}.

        Use these content ideas as a guide:
        {ideas}

        Provide key facts, statistics, insights, and analysis that would support creating
        compelling content on this topic.
        """

        research = await research_agent.run(research_prompt)

        # Step 6: Run content creation agent
        content_agent = create_content_agent()
        if full_context:
            content_agent.add_knowledge_context(full_context)

        content_prompt = f"""
        Create a {content_type} about "{topic}" for {target_audience} with a {tone} tone.

        Use these ideas as inspiration:
        {ideas}

        And incorporate this research:
        {research}

        {f"Make sure to include these key points: {key_points}" if key_points else ""}

        Format the content appropriately for a {content_type}, including headlines, subheadings,
        and proper structure. Use HTML formatting for the structure.
        """

        draft_content = await content_agent.run(content_prompt)

        # Step 7: Run editor agent
        editor_agent = create_editor_agent()
        if full_context:
            editor_agent.add_knowledge_context(full_context)

        editor_prompt = f"""
        Review and improve this {content_type} content:

        {draft_content}

        Make sure it:
        - Has a {tone} tone appropriate for {target_audience}
        - Is well-structured and engaging
        - Has a strong headline and clear subheadings
        - Includes all necessary key points
        - Is free of grammar and spelling errors
        - Maintains HTML formatting
        """

        final_content = await editor_agent.run(editor_prompt)

        return {
            "success": True,
            "content": final_content,
            "ideas": ideas,
            "research": research,
            "workflow_steps": ["ideation", "research", "content_creation", "editing"]
        }

    except Exception as e:
        return {
            "success": False,
            "error": str(e)
        } 