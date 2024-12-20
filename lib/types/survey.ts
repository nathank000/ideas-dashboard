export interface SurveyResponses {
  // About You
  archetype: 'solopreneur' | 'entrepreneur' | 'intrapreneur' | null;
  technicalAbility: number;
  availableHours: number;
  availableCapital: number;
  interests: string;
  specialSkills: string;
  linkedinProfile: string;
  
  // About Your Work
  industries: string;
  yearsExperience: number;
}

export const defaultSurveyResponses: SurveyResponses = {
  archetype: null,
  technicalAbility: 5,
  availableHours: 8,
  availableCapital: 0,
  interests: '',
  specialSkills: '',
  linkedinProfile: '',
  industries: '',
  yearsExperience: 0,
};