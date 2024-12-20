"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { SurveyResponses, defaultSurveyResponses } from "@/lib/types/survey";
import { saveSurveyResponses } from "@/lib/storage/survey";
import { ArchetypeStep } from "./steps/archetype-step";
import { TechnicalAbilityStep } from "./steps/technical-ability-step";
import { AvailableHoursStep } from "./steps/available-hours-step";
import { CapitalStep } from "./steps/capital-step";
import { InterestsStep } from "./steps/interests-step";
import { SkillsStep } from "./steps/skills-step";
import { LinkedinStep } from "./steps/linkedin-step";
import { IndustriesStep } from "./steps/industries-step";
import { ExperienceStep } from "./steps/experience-step";
import { useRouter } from "next/navigation";

const steps = [
  "archetype",
  "technicalAbility",
  "availableHours",
  "availableCapital",
  "interests",
  "specialSkills",
  "linkedinProfile",
  "industries",
  "yearsExperience",
];

interface SurveyWizardProps {
  onComplete?: () => void;
  initialResponses?: SurveyResponses;
}

export function SurveyWizard({ onComplete, initialResponses }: SurveyWizardProps) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState<SurveyResponses>(
    initialResponses || defaultSurveyResponses
  );

  const progress = ((currentStep + 1) / steps.length) * 100;

  const updateResponse = (key: keyof SurveyResponses, value: any) => {
    setResponses((prev) => ({ ...prev, [key]: value }));
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      saveSurveyResponses(responses);
      if (onComplete) {
        onComplete();
      } else {
        router.push("/");
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStep = () => {
    switch (steps[currentStep]) {
      case "archetype":
        return (
          <ArchetypeStep
            value={responses.archetype}
            onChange={(value) => updateResponse("archetype", value)}
          />
        );
      case "technicalAbility":
        return (
          <TechnicalAbilityStep
            value={responses.technicalAbility}
            onChange={(value) => updateResponse("technicalAbility", value)}
          />
        );
      case "availableHours":
        return (
          <AvailableHoursStep
            value={responses.availableHours}
            onChange={(value) => updateResponse("availableHours", value)}
          />
        );
      case "availableCapital":
        return (
          <CapitalStep
            value={responses.availableCapital}
            onChange={(value) => updateResponse("availableCapital", value)}
          />
        );
      case "interests":
        return (
          <InterestsStep
            value={responses.interests}
            onChange={(value) => updateResponse("interests", value)}
          />
        );
      case "specialSkills":
        return (
          <SkillsStep
            value={responses.specialSkills}
            onChange={(value) => updateResponse("specialSkills", value)}
          />
        );
      case "linkedinProfile":
        return (
          <LinkedinStep
            value={responses.linkedinProfile}
            onChange={(value) => updateResponse("linkedinProfile", value)}
          />
        );
      case "industries":
        return (
          <IndustriesStep
            value={responses.industries}
            onChange={(value) => updateResponse("industries", value)}
          />
        );
      case "yearsExperience":
        return (
          <ExperienceStep
            value={responses.yearsExperience}
            onChange={(value) => updateResponse("yearsExperience", value)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="container max-w-2xl mx-auto p-6 space-y-6">
      <Progress value={progress} className="w-full" />
      
      <Card className="p-6">
        <div className="space-y-6">
          {renderStep()}
          
          <div className="flex justify-between pt-6">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 0}
            >
              Back
            </Button>
            <Button onClick={handleNext}>
              {currentStep === steps.length - 1 ? "Complete" : "Next"}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}