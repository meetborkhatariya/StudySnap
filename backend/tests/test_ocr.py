#!/usr/bin/env python3
"""
Test OCR (image to text extraction) with StudySnap AI Agent
Place an image file (e.g., sample_image.png) in this directory before running.
"""
from studysnap_agent import StudySnapAgent

def main():
    print("🖼️ StudySnap OCR Test")
    image_path = input("Enter the image filename (e.g., sample_image.png): ").strip()
    agent = StudySnapAgent()
    result = agent.analyze_image(image_path)
    if "text" in result:
        print("\n✅ Extracted Text:")
        print(result["text"])
    else:
        print(f"\n❌ Error: {result.get('error', 'Unknown error')}")

if __name__ == "__main__":
    main() 