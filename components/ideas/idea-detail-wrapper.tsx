"use client";

import { useEffect, useState } from "react";
import { Idea } from "@/lib/types/idea";
import { getStoredIdeas, updateIdea } from "@/lib/storage";
import { SpiderChart } from "./spider-chart";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResourcesSection } from "./resources/resources-section";
import { AttributesSection } from "@/components/attributes/attributes-section";
import { AttributeValue } from "@/lib/types/attributes";

interface IdeaDetailWrapperProps {
  id: string;
}

export function IdeaDetailWrapper({ id }: IdeaDetailWrapperProps) {
  const [idea, setIdea] = useState<Idea | null>(null);

  const loadIdea = () => {
    const ideas = getStoredIdeas();
    const found = ideas.find((i) => i.id === id);
    if (found) {
      setIdea(found);
    }
  };

  useEffect(() => {
    loadIdea();
  }, [id]);

  const handleAttributesUpdate = (profileId: string, attributes: AttributeValue[]) => {
    if (idea) {
      const updatedIdea = {
        ...idea,
        attributes,
        updatedAt: new Date(),
      };
      updateIdea(updatedIdea);
      setIdea(updatedIdea);
    }
  };

  if (!idea) {
    return <div>Idea not found</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">{idea.title}</h1>
        <div className="text-sm text-muted-foreground">
          Created on {format(new Date(idea.createdAt), "MMMM d, yyyy")}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Description</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose dark:prose-invert max-w-none">
            {idea.description || "No description provided."}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Metrics Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <SpiderChart metrics={idea.metrics} />
        </CardContent>
      </Card>

      {idea.attributeProfileId && (
        <AttributesSection
          attributeProfileId={idea.attributeProfileId}
          attributes={idea.attributes || []}
          onUpdate={handleAttributesUpdate}
        />
      )}

      <ResourcesSection
        ideaId={idea.id}
        resources={idea.resources || []}
        onUpdate={loadIdea}
      />
    </div>
  );
}