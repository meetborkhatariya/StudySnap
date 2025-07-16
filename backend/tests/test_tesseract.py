#!/usr/bin/env python3
"""
Simple test to verify Tesseract OCR is working
"""
import pytesseract
from PIL import Image

def test_tesseract():
    print("🧪 Testing Tesseract OCR...")
    
    # Set the path to tesseract executable
    pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'
    
    try:
        # Test if tesseract is accessible
        version = pytesseract.get_tesseract_version()
        print(f"✅ Tesseract version: {version}")
        print("✅ Tesseract is working correctly!")
        return True
    except Exception as e:
        print(f"❌ Tesseract error: {e}")
        return False

if __name__ == "__main__":
    test_tesseract() 