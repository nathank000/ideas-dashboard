import { Venture } from "@/lib/types/venture";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot } from "lucide-react";

interface ValidationAIProps {
  venture: Venture;
}

export function ValidationAI({ venture }: ValidationAIProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-primary" />
          <CardTitle>Validation AI Assistant</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Add AI analysis content here */}
          <p className="text-muted-foreground">
            AI analysis of your venture validation efforts will appear here...
          </p>
        </div>
      </CardContent>
    </Card>
  );
} 