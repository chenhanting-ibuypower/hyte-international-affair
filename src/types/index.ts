export interface TranslationRequest {
  locale: string;
  content: string[];
}

export interface TranslationResponse {
  translatedText: string[];
  backLanguage: string[];
}

export interface FeedbackEntry {
  originalContext: string;
  targetLanguage: string;
  translatedContext: string;
  backTranslation: string;
  quality: 'GOOD' | 'BAD';
  suggestion: string;
}