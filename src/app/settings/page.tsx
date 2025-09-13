
"use client";

import { MainLayout } from "@/components/main-layout";
import { PageHeader } from "@/components/page-header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function SettingsPage() {
  const [perplexityApiKey, setPerplexityApiKey] = useState("");
  const [elevenLabsApiKey, setElevenLabsApiKey] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    const storedPerplexityKey = localStorage.getItem("perplexity_api_key");
    if (storedPerplexityKey) {
      setPerplexityApiKey(storedPerplexityKey);
    }
    const storedElevenLabsKey = localStorage.getItem("elevenlabs_api_key");
    if (storedElevenLabsKey) {
      setElevenLabsApiKey(storedElevenLabsKey);
    }
  }, []);

  const handleSaveKeys = () => {
    localStorage.setItem("perplexity_api_key", perplexityApiKey);
    localStorage.setItem("elevenlabs_api_key", elevenLabsApiKey);
    toast({
      title: "API Keys Saved",
      description: "Your API keys have been saved locally in your browser.",
    });
  };

  return (
    <MainLayout>
      <div className="p-4 md:p-8">
        <PageHeader
          title="Settings"
          description="Manage your API keys and application preferences."
        />

        <div className="max-w-2xl grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>API Configuration</CardTitle>
              <CardDescription>
                Provide your own API keys to use the services. Keys are
                stored securely in your browser and are never sent to our servers.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="perplexity-api-key">Perplexity API Key</Label>
                <Input
                  id="perplexity-api-key"
                  type="password"
                  placeholder="Your Perplexity API Key"
                  value={perplexityApiKey}
                  onChange={(e) => setPerplexityApiKey(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="elevenlabs-api-key">ElevenLabs API Key</Label>
                <Input
                  id="elevenlabs-api-key"
                  type="password"
                  placeholder="Your ElevenLabs API Key"
                  value={elevenLabsApiKey}
                  onChange={(e) => setElevenLabsApiKey(e.target.value)}
                />
              </div>
              <Button onClick={handleSaveKeys}>Save API Keys</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Reminders</CardTitle>
              <CardDescription>
                Stay on track with your learning goals.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between space-x-2 p-4 border rounded-lg">
                <Label
                  htmlFor="daily-summary"
                  className="flex flex-col space-y-1"
                >
                  <span>Daily Summary Reminder</span>
                  <span className="font-normal leading-snug text-muted-foreground">
                    Get a notification to complete your daily summary.
                  </span>
                </Label>
                <Switch id="daily-summary" defaultChecked />
              </div>
              <div className="flex items-center justify-between space-x-2 p-4 border rounded-lg">
                <Label
                  htmlFor="reminder-time"
                  className="flex flex-col space-y-1"
                >
                  <span>Reminder Time</span>
                  <span className="font-normal leading-snug text-muted-foreground">
                    Choose when you want to be reminded.
                  </span>
                </Label>
                <Select defaultValue="09:00">
                  <SelectTrigger id="reminder-time" className="w-[180px]">
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="08:00">8:00 AM</SelectItem>
                    <SelectItem value="09:00">9:00 AM</SelectItem>
                    <SelectItem value="12:00">12:00 PM</SelectItem>
                    <SelectItem value="17:00">5:00 PM</SelectItem>
                    <SelectItem value="20:00">8:00 PM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
