import os
from pinecone import Pinecone
from openai import OpenAI
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize OpenAI client
openai_client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# Initialize Pinecone client
pc = Pinecone(api_key=os.getenv("PINECONE_API_KEY"))
index_name = os.getenv("PINECONE_INDEX", "encanta-knowledge")

# Get or create the index
def initialize_vector_store():
    """Initialize the vector store, creating the index if it doesn't exist"""
    try:
        existing_indexes = [index.name for index in pc.list_indexes()]
        if index_name not in existing_indexes:
            pc.create_index(
                name=index_name,
                dimension=1536,  # OpenAI embedding dimension
                metric="cosine"
            )
        
        # Get the index
        return pc.Index(index_name)
    except Exception as e:
        print(f"Error initializing vector store: {str(e)}")
        # Return None if initialization fails
        return None

# Get the index
index = initialize_vector_store()

def get_embedding(text):
    """Generate embedding for text using OpenAI"""
    if not text or not text.strip():
        return []

    response = openai_client.embeddings.create(
        model="text-embedding-3-small",
        input=text
    )
    return response.data[0].embedding

async def store_document_chunk(text, metadata):
    """Store a document chunk in the vector database"""
    if not text or not text.strip():
        return {"status": "skipped", "reason": "empty text"}

    if not index:
        return {"status": "error", "reason": "vector store not initialized"}

    # Generate embedding
    embedding = get_embedding(text)

    # Store in Pinecone
    index.upsert(
        vectors=[{
            "id": metadata["id"],
            "values": embedding,
            "metadata": {
                **metadata,
                "text": text[:1000]  # Store preview of text in metadata
            }
        }]
    )

    return {"id": metadata["id"], "status": "stored"}

async def search_similar_documents(query, filter=None, top_k=5):
    """Search for similar documents in the vector database"""
    if not query or not query.strip():
        return []

    if not index:
        return []

    # Generate query embedding
    embedding = get_embedding(query)

    # Search Pinecone
    results = index.query(
        vector=embedding,
        top_k=top_k,
        filter=filter,
        include_metadata=True
    )

    return results.matches 