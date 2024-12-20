"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SurveyResponses } from "@/lib/types/survey";
import { getStoredSurveyResponses } from "@/lib/storage/survey";
import { SurveyWizard } from "@/components/survey/survey-wizard";

export function SurveySettings() {
  const [responses, setResponses] = useState<SurveyResponses | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setResponses(getStoredSurveyResponses());
  }, []);

  if (!responses) {
    return null;
  }

  if (isEditing) {
    return (
      <SurveyWizard
        initialResponses={responses}
        onComplete={() => {
          setResponses(getStoredSurveyResponses());
          setIsEditing(false);
        }}
      />
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Survey</CardTitle>
        <CardDescription>
          Your responses to the onboarding survey
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h3 className="font-semibold mb-2">About You</h3>
              <dl className="space-y-2">
                <div>
                  <dt className="text-sm text-muted-foreground">Archetype</dt>
                  <dd className="capitalize">{responses.archetype || "Not set"}</dd>
                </div>
                <div>
                  <dt className="text-sm text-muted-foreground">Technical Ability</dt>
                  <dd>{responses.technicalAbility}/10</dd>
                </div>
                <div>
                  <dt className="text-sm text-muted-foreground">Available Hours</dt>
                  <dd>{responses.availableHours} hours/day</dd>
                </div>
                <div>
                  <dt className="text-sm text-muted-foreground">Available Capital</dt>
                  <dd>${responses.availableCapital.toLocaleString()}</dd>
                </div>
                <div>
                  <dt className="text-sm text-muted-foreground">Interests</dt>
                  <dd className="whitespace-pre-wrap">{responses.interests || "Not set"}</dd>
                </div>
                <div>
                  <dt className="text-sm text-muted-foreground">Special Skills</dt>
                  <dd className="whitespace-pre-wrap">{responses.specialSkills || "Not set"}</dd>
                </div>
                <div>
                  <dt className="text-sm text-muted-foreground">LinkedIn Profile</dt>
                  <dd>
                    {responses.linkedinProfile ? (
                      <a
                        href={responses.linkedinProfile}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        View Profile
                      </a>
                    ) : (
                      "Not set"
                    )}
                  </dd>
                </div>
              </dl>
            </div>

            <div>
              <h3 className="font-semibold mb-2">About Your Work</h3>
              <dl className="space-y-2">
                <div>
                  <dt className="text-sm text-muted-foreground">Industries</dt>
                  <dd className="whitespace-pre-wrap">{responses.industries || "Not set"}</dd>
                </div>
                <div>
                  <dt className="text-sm text-muted-foreground">Years of Experience</dt>
                  <dd>{responses.yearsExperience} years</dd>
                </div>
              </dl>
            </div>
          </div>

          <Button onClick={() => setIsEditing(true)}>Edit Responses</Button>
        </div>
      </CardContent>
    </Card>
  );
}