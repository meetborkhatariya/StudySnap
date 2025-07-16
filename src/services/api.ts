import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || 'AIzaSyAU4y4Ejl1z90wMqp76HTe--gC_qm2eZlo';

export interface TextQueryRequest {
  query: string;
  language: string;
}

export interface SummarizationRequest {
  content: string;
  language: string;
}

export interface ImageOCRRequest {
  image: File;
  language: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

class StudySnapAPI {
  private genAI: GoogleGenerativeAI;
  private model: any;

  constructor() {
    if (!API_KEY) {
      throw new Error('Gemini API key not found. Please check your environment variables.');
    }
    this.genAI = new GoogleGenerativeAI(API_KEY);
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  }

  async processTextQuery(request: TextQueryRequest): Promise<ApiResponse<string>> {
    try {
      const languageMap = {
        'en': 'English',
        'hi': 'Hindi', 
        'es': 'Spanish',
        'fr': 'French'
      };
      
      const langName = languageMap[request.language as keyof typeof languageMap] || 'English';
      
      const prompt = `You are an expert educational AI assistant. Explain the following in a student-friendly way with step-by-step explanations, emojis, clear headings, practical examples, and follow-up questions.

Structure your response like this:
# 🎯 [Topic Title]

## 🔬 What is it?
[Clear, simple definition]

## 📋 Step-by-Step Explanation:
### 1️⃣ [First Step]
[Detailed explanation with examples]

### 2️⃣ [Second Step] 
[Detailed explanation with examples]

### 3️⃣ [Third Step]
[Detailed explanation with examples]

## 🌍 Why It Matters:
[Real-world importance and applications]

## 💡 Key Takeaways:
• [Important point 1]
• [Important point 2] 
• [Important point 3]

## 🤔 Follow-up Questions:
1. [Thought-provoking question 1]
2. [Thought-provoking question 2]
3. [Thought-provoking question 3]

Respond ONLY in ${langName}. Do not use English or any other language if a different language is specified.

Query: ${request.query}`;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      return {
        success: true,
        data: text
      };
    } catch (error) {
      console.error('Text query error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to process text query'
      };
    }
  }

  async summarizeContent(request: SummarizationRequest): Promise<ApiResponse<string>> {
    try {
      const languageMap = {
        'en': 'English',
        'hi': 'Hindi',
        'es': 'Spanish', 
        'fr': 'French'
      };
      
      const langName = languageMap[request.language as keyof typeof languageMap] || 'English';
      
      const prompt = `You are an expert educational content summarizer. Analyze the following content and summarize it in a structured, student-friendly format.

Create a comprehensive summary with this exact structure:

# 📚 Content Summary

## 🎯 Main Topic
[Identify the primary subject/topic of the content]

## 📋 Key Points
• [Most important point 1]
• [Most important point 2]
• [Most important point 3]
• [Most important point 4]

## 🔍 Important Details
**Core Concepts:**
• [Essential concept 1]
• [Essential concept 2]

**Supporting Information:**
• [Supporting detail 1]
• [Supporting detail 2]

## 💡 Practical Applications
• [Real-world application 1]
• [Real-world application 2]
• [Real-world application 3]

## 📝 Study Tips
• [Study tip 1]
• [Study tip 2]
• [Study tip 3]

## 🔗 Connections
• [How this relates to other topics]
• [Interdisciplinary connections]

## ❓ Follow-up Questions
1. [Question to deepen understanding]
2. [Question about applications]
3. [Question about implications]

Respond ONLY in ${langName}. Do not use English or any other language if a different language is specified.

Content to summarize: ${request.content}`;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      return {
        success: true,
        data: text
      };
    } catch (error) {
      console.error('Summarization error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to summarize content'
      };
    }
  }

  async extractTextFromImage(request: ImageOCRRequest): Promise<ApiResponse<string>> {
    try {
      // Convert File to base64 for Gemini Vision API
      const imageData = await this.fileToBase64(request.image);
      
      const visionModel = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      
      // OCR only supports English - ignore language parameter
      const prompt = `Extract all text from this image. Format the output as follows:

# 📄 Extracted Text from Image

## 📝 Main Content:
[All text found in the image, preserving formatting where possible]

## 🔍 Additional Details:
• **Image Type:** [Description of what type of document/image this is]
• **Text Quality:** [Assessment of text clarity]
• **Language Detected:** [Primary language of the text]

## 📊 Content Structure:
[If applicable, describe any headings, bullet points, tables, or special formatting]

## ⚠️ Notes:
[Any unclear text, potential OCR errors, or special characters]

Please extract ALL visible text accurately, including:
- Headings and titles
- Body text and paragraphs  
- Bullet points and lists
- Numbers and dates
- Mathematical formulas or equations
- Any other readable text

If no text is found, clearly state that no readable text was detected.

Respond in English only for OCR functionality.`;

      const imagePart = {
        inlineData: {
          data: imageData.split(',')[1], // Remove data:image/jpeg;base64, prefix
          mimeType: request.image.type
        }
      };

      const result = await visionModel.generateContent([prompt, imagePart]);
      const response = await result.response;
      const text = response.text();

      return {
        success: true,
        data: text
      };
    } catch (error) {
      console.error('Image OCR error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to extract text from image'
      };
    }
  }

  private fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  }
}

export const studySnapAPI = new StudySnapAPI();