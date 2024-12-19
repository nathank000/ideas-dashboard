import { Venture } from "@/lib/types/venture";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, Target, Users, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ValidationAIProps {
  venture: Venture;
}

export function ValidationAI({ venture }: ValidationAIProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-primary" />
          <CardTitle>Litmus Idea Explorer</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex gap-4">
            <Button variant="outline" className="flex-1">
              <Target className="mr-2 h-4 w-4" />
              Market Verify
            </Button>
            <Button variant="outline" className="flex-1">
              <Users className="mr-2 h-4 w-4" />
              Persona Generation
            </Button>
            <Button variant="outline" className="flex-1">
              <TrendingUp className="mr-2 h-4 w-4" />
              Persona Marketing
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 