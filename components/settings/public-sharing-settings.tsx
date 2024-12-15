"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { getPublicSettings, savePublicSettings } from "@/lib/storage/settings";
import { toast } from "sonner";

export function PublicSharingSettings() {
  const [settings, setSettings] = useState({
    showScope: true,
    showAssumptions: true,
    showContacts: false,
    showRisks: true,
    showEvents: true,
    showMeetingNotes: false,
    showDecisionLog: true,
    allowVoting: true,
    requireEmail: true,
  });

  useEffect(() => {
    const storedSettings = getPublicSettings();
    if (storedSettings) {
      setSettings(storedSettings);
    }
  }, []);

  const handleSave = () => {
    savePublicSettings(settings);
    toast.success("Public sharing settings saved successfully");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Public Venture Sharing Settings</CardTitle>
        <CardDescription>
          Control what information is visible on public venture pages
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="showScope">Show Scope Items</Label>
            <Switch
              id="showScope"
              checked={settings.showScope}
              onCheckedChange={(checked) =>
                setSettings((prev) => ({ ...prev, showScope: checked }))
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="showAssumptions">Show Assumptions</Label>
            <Switch
              id="showAssumptions"
              checked={settings.showAssumptions}
              onCheckedChange={(checked) =>
                setSettings((prev) => ({ ...prev, showAssumptions: checked }))
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="showContacts">Show Contacts</Label>
            <Switch
              id="showContacts"
              checked={settings.showContacts}
              onCheckedChange={(checked) =>
                setSettings((prev) => ({ ...prev, showContacts: checked }))
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="showRisks">Show Risks</Label>
            <Switch
              id="showRisks"
              checked={settings.showRisks}
              onCheckedChange={(checked) =>
                setSettings((prev) => ({ ...prev, showRisks: checked }))
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="showEvents">Show Events & Updates</Label>
            <Switch
              id="showEvents"
              checked={settings.showEvents}
              onCheckedChange={(checked) =>
                setSettings((prev) => ({ ...prev, showEvents: checked }))
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="showMeetingNotes">Show Meeting Notes</Label>
            <Switch
              id="showMeetingNotes"
              checked={settings.showMeetingNotes}
              onCheckedChange={(checked) =>
                setSettings((prev) => ({ ...prev, showMeetingNotes: checked }))
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="showDecisionLog">Show Decision Log</Label>
            <Switch
              id="showDecisionLog"
              checked={settings.showDecisionLog}
              onCheckedChange={(checked) =>
                setSettings((prev) => ({ ...prev, showDecisionLog: checked }))
              }
            />
          </div>

          <div className="border-t pt-4 space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="allowVoting">Allow Voting</Label>
              <Switch
                id="allowVoting"
                checked={settings.allowVoting}
                onCheckedChange={(checked) =>
                  setSettings((prev) => ({ ...prev, allowVoting: checked }))
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="requireEmail">Require Email for Voting</Label>
              <Switch
                id="requireEmail"
                checked={settings.requireEmail}
                onCheckedChange={(checked) =>
                  setSettings((prev) => ({ ...prev, requireEmail: checked }))
                }
              />
            </div>
          </div>
        </div>

        <Button onClick={handleSave}>Save Settings</Button>
      </CardContent>
    </Card>
  );
}