"use client";

import { useEffect, useState } from "react";
import { Venture } from "@/lib/types/venture";
import { getStoredVentures } from "@/lib/storage/ventures";
import { getPublicSettings } from "@/lib/storage/settings";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { toast } from "sonner";
import { addVote, getVotes } from "@/lib/storage/votes";
import { format } from "date-fns";

interface PublicVentureViewProps {
  id: string;
}

export function PublicVentureView({ id }: PublicVentureViewProps) {
  const [venture, setVenture] = useState<Venture | null>(null);
  const [settings, setSettings] = useState(getPublicSettings());
  const [votes, setVotes] = useState<any[]>([]);
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [showVoteForm, setShowVoteForm] = useState(false);
  const [voteType, setVoteType] = useState<"up" | "down" | null>(null);

  useEffect(() => {
    const ventures = getStoredVentures();
    const found = ventures.find((v) => v.id === id);
    if (found) {
      setVenture(found);
    }
    setVotes(getVotes(id));
  }, [id]);

  const handleVote = async () => {
    if (!voteType) return;
    if (settings.requireEmail && !email) {
      toast.error("Email is required for voting");
      return;
    }

    const vote = {
      id: crypto.randomUUID(),
      ventureId: id,
      type: voteType,
      email,
      comment,
      timestamp: new Date(),
    };

    addVote(vote);
    setVotes(getVotes(id));
    toast.success("Thank you for your feedback!");
    setEmail("");
    setComment("");
    setShowVoteForm(false);
    setVoteType(null);
  };

  if (!venture) {
    return <div>Venture not found</div>;
  }

  const upvotes = votes.filter((v) => v.type === "up").length;
  const downvotes = votes.filter((v) => v.type === "down").length;

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-bold">{venture.title}</h1>
          <Badge variant="secondary">{venture.status}</Badge>
        </div>
        <p className="text-muted-foreground">{venture.description}</p>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progress</span>
            <span>{venture.progress}%</span>
          </div>
          <Progress value={venture.progress} />
        </div>
      </div>

      {settings.allowVoting && (
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setVoteType("up");
                  setShowVoteForm(true);
                }}
              >
                <ThumbsUp className="h-4 w-4 mr-2" />
                {upvotes}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setVoteType("down");
                  setShowVoteForm(true);
                }}
              >
                <ThumbsDown className="h-4 w-4 mr-2" />
                {downvotes}
              </Button>
            </div>
          </div>

          {showVoteForm && (
            <div className="space-y-4">
              {settings.requireEmail && (
                <Input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              )}
              <Textarea
                placeholder="Add a comment (optional)"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <div className="flex gap-2">
                <Button onClick={handleVote}>Submit</Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowVoteForm(false);
                    setVoteType(null);
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}

          <div className="space-y-4">
            {votes.map((vote) => (
              <div
                key={vote.id}
                className="border rounded-lg p-4 space-y-2"
              >
                <div className="flex items-center gap-2">
                  {vote.type === "up" ? (
                    <ThumbsUp className="h-4 w-4 text-green-500" />
                  ) : (
                    <ThumbsDown className="h-4 w-4 text-red-500" />
                  )}
                  <span className="text-sm text-muted-foreground">
                    {format(new Date(vote.timestamp), "MMM d, yyyy h:mm a")}
                  </span>
                </div>
                {vote.comment && (
                  <p className="text-sm">{vote.comment}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Render sections based on settings */}
      {settings.showScope && venture.scopeItems && venture.scopeItems.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Scope</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {venture.scopeItems.map((item) => (
              <div key={item.id} className="border rounded-lg p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{item.title}</h3>
                  <Badge variant={item.status === "in" ? "default" : "secondary"}>
                    {item.status === "in" ? "In Scope" : "Out of Scope"}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add similar sections for other components based on settings */}
    </div>
  );
}