import { SurveyResponses, defaultSurveyResponses } from "../types/survey";

const STORAGE_KEY = "survey_responses";

export function getStoredSurveyResponses(): SurveyResponses {
  if (typeof window === "undefined") return defaultSurveyResponses;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : defaultSurveyResponses;
  } catch (error) {
    console.error("Error reading survey responses from storage:", error);
    return defaultSurveyResponses;
  }
}

export function saveSurveyResponses(responses: SurveyResponses) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(responses));
}