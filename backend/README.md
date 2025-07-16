# 🤖 StudySnap AI Agent

A comprehensive educational AI assistant powered by Google Gemini that helps students and learners with text queries, content summarization, and image-to-text extraction.

## 🌟 Features

### 📝 Text Query Processing

- Ask educational questions and get structured, student-friendly explanations
- Step-by-step explanations with emojis and clear headings
- Practical examples and real-world applications
- Follow-up questions for deeper learning
- Multi-language support (English, Hindi, Spanish, French)

### 📚 Content Summarization

- Summarize long educational content into structured formats
- Organized output with:
  - 📚 Key Points
  - 🔍 Important Details
  - 💡 Practical Applications
  - 📝 Study Tips
  - ❓ Follow-up Questions

### 🖼️ Image-to-Text Extraction (OCR)

- Extract text from images, photos, and scanned documents
- Support for handwritten text and printed documents
- Multi-language OCR support
- Clean, readable text output

## 🚀 Quick Start

### Prerequisites

- Python 3.7 or higher
- Google Gemini API key
- Tesseract OCR (for image processing)

### Installation

1. **Clone or download the project files**

2. **Install Python dependencies:**

   ```bash
   pip install -r requirements.txt
   ```

3. **Set up your API key:**

   - Create a `.env` file in the project directory
   - Add your Gemini API key:
     ```
     GEMINI_API_KEY=your_gemini_api_key_here
     ```

4. **Install Tesseract OCR (for image features):**
   - Download from: https://github.com/UB-Mannheim/tesseract/wiki
   - Install with "Add to PATH" option checked
   - The code will automatically configure the paths

### Usage

**Run the interactive interface:**

```bash
python main.py
```

**Or use the agent programmatically:**

```python
from studysnap_agent import StudySnapAgent

# Initialize the agent
agent = StudySnapAgent()

# Text query
response = agent.process_text_query("Explain Newton's laws in simple terms.")
print(response)

# Content summarization
content = "Your long educational content here..."
summary = agent.summarize_content(content)
print(summary)

# Image OCR
result = agent.analyze_image("path/to/your/image.jpg")
print(result["text"])
```

## 📁 Project Structure

```
Project/
├── studysnap_agent.py      # Main AI agent module
├── main.py                 # Interactive user interface
├── requirements.txt        # Python dependencies
├── .env                    # API key configuration
├── test_agent.py          # Text and summarization tests
├── test_ocr.py            # OCR functionality tests
├── test_tesseract.py      # Tesseract verification
└── README.md              # This file
```

## 🎯 Use Cases

### For Students

- **Homework Help:** Get explanations for complex topics
- **Study Aid:** Summarize long textbook chapters
- **Note Taking:** Extract text from handwritten notes
- **Research:** Summarize research papers and articles

### For Teachers

- **Content Creation:** Generate educational summaries
- **Assessment:** Create follow-up questions
- **Document Processing:** Extract text from educational materials

### For Researchers

- **Literature Review:** Summarize academic papers
- **Data Extraction:** Extract text from research images
- **Multi-language Research:** Process content in different languages

## 🔧 Configuration

### Environment Variables

Create a `.env` file with:

```
GEMINI_API_KEY=your_gemini_api_key_here
```

### Tesseract OCR Setup

1. Download Tesseract installer from the official repository
2. Install with "Add to PATH" option
3. The code automatically configures the paths

## 🌍 Multi-Language Support

**Supported Languages:**

- **English (en/eng)** - Primary language
- **Hindi (hi)** - Indian language support
- **Spanish (es)** - Spanish language support
- **French (fr)** - French language support

**Usage:**

```python
# Text query in Hindi
response = agent.process_text_query("गुरुत्वाकर्षण क्या है?", language='hi')

# Summarization in Spanish
summary = agent.summarize_content(content, language='es')

# OCR in French
result = agent.analyze_image("image.jpg", language='fr')
```

## 🧪 Testing

**Test all features:**

```bash
python test_agent.py
```

**Test OCR functionality:**

```bash
python test_ocr.py
```

**Verify Tesseract installation:**

```bash
python test_tesseract.py
```

## 🔍 Troubleshooting

### Common Issues

**1. "Gemini API key not set"**

- Ensure your `.env` file exists with the correct API key
- Check that the key is valid and has sufficient credits

**2. "Tesseract is not installed"**

- Download and install Tesseract OCR
- Make sure "Add to PATH" is checked during installation
- Restart your terminal after installation

**3. "File not found" for images**

- Check the file path is correct
- Ensure the image file exists
- Use absolute paths or place images in the project directory

**4. "OCR failed" errors**

- Verify Tesseract installation with `tesseract --version`
- Check that language data files are installed
- Ensure the image is clear and readable

### Performance Tips

- Use clear, high-resolution images for better OCR results
- Break long content into smaller chunks for summarization
- Use specific, detailed questions for better text query responses

## 🛠️ Technical Details

### Dependencies

- `google-generativeai` - Gemini AI integration
- `pytesseract` - OCR functionality
- `pillow` - Image processing
- `python-dotenv` - Environment management
- `googletrans` - Translation support

### AI Models Used

- **Gemini 1.5 Flash** - For text processing and summarization
- **Tesseract OCR** - For image-to-text extraction

### Performance

- **Text Processing:** ~2-5 seconds per query
- **Summarization:** ~3-8 seconds for long content
- **OCR:** ~1-3 seconds per image

## 🔒 Security & Privacy

- API keys are stored securely in `.env` files
- No data is stored or logged locally
- All processing is done through secure API calls
- No personal information is collected

## 🚀 Future Enhancements

- Voice input/output capabilities
- PDF processing support
- Web interface
- Database integration for saving summaries
- Advanced handwriting recognition
- Educational diagram analysis

## 📞 Support

If you encounter any issues:

1. Check the troubleshooting section above
2. Verify all dependencies are installed correctly
3. Ensure your API key is valid and has credits
4. Test individual components using the test scripts

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues for bugs and feature requests.

---

**Made with ❤️ for educational purposes**

_StudySnap AI Agent - Your intelligent educational companion!_ 🎓✨

study snap ai agent is working for educational purposes only. please do not use it for any commercial or malicious activities. the author is not
