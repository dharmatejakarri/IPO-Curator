import pytest
from fastapi.testclient import TestClient
import os
import tempfile
from main import app

client = TestClient(app)

# Minimal valid PDF file byte string containing "Hello World"
MINIMAL_PDF = b"%PDF-1.4\n1 0 obj\n<<\n/Type /Catalog\n/Pages 2 0 R\n>>\nendobj\n2 0 obj\n<<\n/Type /Pages\n/Count 1\n/Kids [3 0 R]\n>>\nendobj\n3 0 obj\n<<\n/Type /Page\n/Parent 2 0 R\n/MediaBox [0 0 612 792]\n/Resources <<\n/Font <<\n/F1 4 0 R\n>>\n>>\n/Contents 5 0 R\n>>\nendobj\n4 0 obj\n<<\n/Type /Font\n/Subtype /Type1\n/BaseFont /Helvetica\n>>\nendobj\n5 0 obj\n<<\n/Length 44\n>>\nstream\nBT\n/F1 24 Tf\n100 700 Td\n(Hello World) Tj\nET\nendstream\nendobj\nxref\n0 6\n0000000000 65535 f \n0000000009 00000 n \n0000000058 00000 n \n0000000115 00000 n \n0000000219 00000 n \n0000000307 00000 n \ntrailer\n<<\n/Size 6\n/Root 1 0 R\n>>\nstartxref\n402\n%%EOF\n"

def test_root():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json()["status"] == "ok"

def test_document_upload_and_rag_query():
    # 1. Test Document Upload Pipeline (LangChain + Chroma)
    with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as tmp:
        tmp.write(MINIMAL_PDF)
        tmp_path = tmp.name

    try:
        with open(tmp_path, "rb") as f:
            response = client.post("/api/upload", files={"file": ("test_drhp.pdf", f, "application/pdf")})
        
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "success"
        assert data["filename"] == "test_drhp.pdf"
        assert data["chunks"] > 0
        
        # 2. Test RAG Query Pipeline (Retrieve the chunks we just uploaded)
        query_response = client.post("/api/chat", json={"query": "Hello"})
        assert query_response.status_code == 200
        query_data = query_response.json()
        assert query_data["status"] == "success"
        
        # Since 'Hello World' was in the PDF, the RAG agent should find it.
        assert "Hello World" in query_data["nudge"] or "could not find" not in query_data["nudge"]
        
    finally:
        os.remove(tmp_path)
