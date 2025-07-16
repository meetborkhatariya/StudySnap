#!/usr/bin/env python3
"""
StudySnap AI Agent - Interactive Interface
A complete AI agent for educational assistance with user input.
"""

from studysnap_agent import StudySnapAgent
import os

def clear_screen():
    """Clear the terminal screen"""
    os.system('cls' if os.name == 'nt' else 'clear')

def text_query_mode(agent):
    """Handle text query processing"""
    print("\n" + "="*50)
    print("📝 TEXT QUERY MODE")
    print("="*50)
    
    while True:
        query = input("\n🤔 Enter your question (or 'back' to return to menu): ").strip()
        if query.lower() == 'back':
            break
        if not query:
            print("❌ Please enter a question!")
            continue
            
        language = input("🌍 Language (en/hi/es/fr) [default: en]: ").strip() or 'en'
        
        print("\n🔄 Processing your query...")
        try:
            response = agent.process_text_query(query, language=language)
            print("\n✅ AI Response:")
            print("-" * 40)
            print(response)
            print("-" * 40)
        except Exception as e:
            print(f"❌ Error: {e}")

def summarization_mode(agent):
    """Handle content summarization"""
    print("\n" + "="*50)
    print("📚 CONTENT SUMMARIZATION MODE")
    print("="*50)
    
    while True:
        print("\n📝 Enter your content to summarize (or 'back' to return to menu):")
        print("(Type 'END' on a new line when finished)")
        
        lines = []
        while True:
            line = input()
            if line.strip().upper() == 'BACK':
                return
            if line.strip().upper() == 'END':
                break
            lines.append(line)
        
        if not lines:
            print("❌ No content provided!")
            continue
            
        content = '\n'.join(lines)
        language = input("🌍 Language (en/hi/es/fr) [default: en]: ").strip() or 'en'
        
        print("\n🔄 Creating summary...")
        try:
            summary = agent.summarize_content(content, language=language)
            print("\n✅ Summary:")
            print("-" * 40)
            print(summary)
            print("-" * 40)
        except Exception as e:
            print(f"❌ Error: {e}")

def image_ocr_mode(agent):
    """Handle image-to-text extraction"""
    print("\n" + "="*50)
    print("🖼️ IMAGE TO TEXT MODE")
    print("="*50)
    
    while True:
        image_path = input("\n📁 Enter image file path (or 'back' to return to menu): ").strip()
        if image_path.lower() == 'back':
            break
        if not image_path:
            print("❌ Please enter an image file path!")
            continue
            
        # Clean the input - remove any extra text that might have been copied
        image_path = image_path.split('\n')[0].strip()
        
        if not os.path.exists(image_path):
            print(f"❌ File not found: {image_path}")
            continue
            
        language = input("🌍 Language (en/hi/es/fr) [default: en]: ").strip() or 'en'
        
        print("\n🔄 Extracting text from image...")
        try:
            result = agent.analyze_image(image_path, language=language)
            if "text" in result:
                print("\n✅ Extracted Text:")
                print("-" * 40)
                print(result["text"])
                print("-" * 40)
            else:
                print(f"❌ Error: {result.get('error', 'Unknown error')}")
        except Exception as e:
            print(f"❌ Error: {e}")

def main():
    """Main interactive interface"""
    clear_screen()
    print("🤖 StudySnap AI Agent")
    print("=" * 50)
    print("Your intelligent educational assistant powered by Gemini AI")
    print("=" * 50)
    
    try:
        agent = StudySnapAgent()
        print("✅ AI Agent initialized successfully!")
    except Exception as e:
        print(f"❌ Failed to initialize AI Agent: {e}")
        print("Please check your .env file and API key.")
        return
    
    while True:
        print("\n" + "="*50)
        print("🎯 MAIN MENU")
        print("="*50)
        print("1. 📝 Text Query - Ask educational questions")
        print("2. 📚 Summarization - Summarize educational content")
        print("3. 🖼️ Image to Text - Extract text from images")
        print("4. 🧪 Test All Features")
        print("5. 🚪 Exit")
        print("="*50)
        
        choice = input("\nChoose an option (1-5): ").strip()
        
        if choice == '1':
            text_query_mode(agent)
        elif choice == '2':
            summarization_mode(agent)
        elif choice == '3':
            image_ocr_mode(agent)
        elif choice == '4':
            test_all_features(agent)
        elif choice == '5':
            print("\n👋 Thank you for using StudySnap AI Agent!")
            break
        else:
            print("❌ Invalid choice! Please select 1-5.")

def test_all_features(agent):
    """Test all features with sample inputs"""
    print("\n" + "="*50)
    print("🧪 TESTING ALL FEATURES")
    print("="*50)
    
    # Test text query
    print("\n1️⃣ Testing Text Query...")
    try:
        response = agent.process_text_query("Explain photosynthesis in simple terms.", language='en')
        print("✅ Text Query: PASSED")
        print("📝 Preview:", response[:100] + "...")
    except Exception as e:
        print(f"❌ Text Query: FAILED - {e}")
    
    # Test summarization
    print("\n2️⃣ Testing Summarization...")
    try:
        content = "Photosynthesis is the process by which plants convert light energy into chemical energy."
        summary = agent.summarize_content(content, language='en')
        print("✅ Summarization: PASSED")
        print("📝 Preview:", summary[:100] + "...")
    except Exception as e:
        print(f"❌ Summarization: FAILED - {e}")
    
    print("\n3️⃣ Image OCR test requires an image file.")
    print("   Use option 3 from the main menu to test with your own image.")
    
    input("\nPress Enter to continue...")

if __name__ == "__main__":
    main() 