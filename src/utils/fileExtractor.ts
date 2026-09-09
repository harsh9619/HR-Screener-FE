import mammoth from 'mammoth';
import * as pdfjsLib from 'pdfjs-dist';

// Set pdf.js worker URL matching the library version
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;

export async function extractTextFromFile(file: File): Promise<string> {
  const fileName = file.name.toLowerCase();

  if (fileName.endsWith('.pdf')) {
    const arrayBuffer = await file.arrayBuffer();
    const loadingTask = pdfjsLib.getDocument({ data: new Uint8Array(arrayBuffer) });
    const pdf = await loadingTask.promise;
    let fullText = '';

    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const textContent = await page.getTextContent();
      const pageStrings = textContent.items
        .map((item: any) => item.str || '')
        .join(' ');
      fullText += pageStrings + '\n\n';
    }

    if (!fullText.trim()) {
      throw new Error('Extracted PDF text is empty. The file may be scanned or image-only.');
    }

    return fullText.trim();
  }

  if (fileName.endsWith('.docx')) {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    if (!result.value.trim()) {
      throw new Error('Could not extract text from DOCX file. The file may be empty or corrupted.');
    }
    return result.value.trim();
  }

  if (fileName.endsWith('.doc')) {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const result = await mammoth.extractRawText({ arrayBuffer });
      if (result.value && result.value.trim()) {
        return result.value.trim();
      }
    } catch {
      // Fallback for legacy binary doc files: extract printable ASCII strings
      const buffer = await file.arrayBuffer();
      const bytes = new Uint8Array(buffer);
      let text = '';
      let currentWord = '';
      for (let i = 0; i < bytes.length; i++) {
        const charCode = bytes[i];
        if (charCode >= 32 && charCode <= 126) {
          currentWord += String.fromCharCode(charCode);
        } else if (charCode === 10 || charCode === 13) {
          if (currentWord.length > 2) text += currentWord + '\n';
          currentWord = '';
        } else {
          if (currentWord.length > 3) text += currentWord + ' ';
          currentWord = '';
        }
      }
      if (text.trim().length > 30) {
        return text.trim();
      }
    }
    throw new Error('Legacy .doc format could not be parsed automatically. Please convert to .docx or .pdf, or paste text manually.');
  }

  // Fallback for .txt, .rtf, or markdown plain text files
  const text = await file.text();
  if (!text.trim()) {
    throw new Error('File appears to be empty.');
  }
  return text.trim();
}
