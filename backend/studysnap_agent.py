"""
StudySnap AI Agent (Gemini Version)
-----------------------------------
A modular Python agent for educational text query processing, image analysis, and content summarization using Google Gemini (Generative AI) API.

Requirements:
- google-generativeai
- pillow
- python-dotenv

Setup:
1. Install dependencies: pip install -r requirements.txt
2. Create a .env file with: GEMINI_API_KEY=your_gemini_api_key_here

Example usage:
    from studysnap_agent import StudySnapAgent
    agent = StudySnapAgent()
    response = agent.process_text_query('Explain Newton\'s laws in simple terms.', language='en')
    print(response)

# For Hindi
response = agent.process_text_query("गुरुत्वाकर्षण क्या है?", language='hi')
print(response)

# For Spanish
response = agent.process_text_query("¿Qué es la gravedad?", language='es')
print(response)

# For French
response = agent.process_text_query("Qu'est-ce que la gravité ?", language='fr')
print(response)
"""
import os
from typing import Optional, Dict
from PIL import Image
from dotenv import load_dotenv
import google.generativeai as genai
import pytesseract

load_dotenv()

class StudySnapAgent:
    def __init__(self, api_key: Optional[str] = None):
        self.api_key = api_key or os.getenv('GEMINI_API_KEY')
        if not self.api_key:
            raise ValueError('Gemini API key not set. Set GEMINI_API_KEY in .env or pass api_key.')
        genai.configure(api_key=self.api_key)
        self.model = genai.GenerativeModel('gemini-1.5-flash')
        self.vision_model = genai.GenerativeModel('gemini-1.5-flash')

    def process_text_query(self, query: str, language: str = 'en') -> str:
        """
        Process a text query and return a structured, student-friendly explanation in the requested language.
        """
        language_map = {'en': 'English', 'hi': 'Hindi', 'es': 'Spanish', 'fr': 'French'}
        lang_name = language_map.get(language, language)
        prompt = (
            f"You are an expert educational AI assistant. "
            f"Explain the following in a student-friendly way with step-by-step explanations, emojis, headings, practical examples, and follow-up questions. "
            f"Respond ONLY in {lang_name}. Do not use English or any other language.\n"
            f"Query: {query}"
        )
        response = self.model.generate_content(prompt)
        return response.text

    def analyze_image(self, image_path: str, language: str = 'en') -> dict:
        """
        Extract text content from an image using OCR (Tesseract).
        """
        try:
            # Set the path to tesseract executable
            pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'
            # Set the TESSDATA_PREFIX environment variable
            os.environ['TESSDATA_PREFIX'] = r'C:\Program Files\Tesseract-OCR\tessdata'
            image = Image.open(image_path)
            # Use 'eng' instead of 'en' for English language data
            lang_code = 'eng' if language == 'en' else language
            text = pytesseract.image_to_string(image, lang=lang_code)
            return {"text": text.strip()}
        except Exception as e:
            return {"error": f"OCR failed: {e}"}

    def summarize_content(self, content: str, language: str = 'en') -> str:
        """
        Summarize educational content in the requested language.
        """
        language_map = {'en': 'English', 'hi': 'Hindi', 'es': 'Spanish', 'fr': 'French'}
        lang_name = language_map.get(language, language)
        prompt = (
            "Summarize the following educational content. Structure the summary with:\n"
            "📚 Key Points\n🔍 Important Details\n💡 Practical Applications\n📝 Study Tips\n❓ Follow-up Questions\n"
            f"Respond ONLY in {lang_name}. Do not use English or any other language.\n"
            f"Content: {content}"
        )
        response = self.model.generate_content(prompt)
        return response.text 