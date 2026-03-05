"use client";

import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Key } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-2xl space-y-6">
        <h1 className="text-2xl font-bold">Ayarlar</h1>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="h-4 w-4" />
              API Anahtarları
            </CardTitle>
            <CardDescription>
              AI sağlayıcıları için API anahtarlarınızı yapılandırın. Anahtarlar sunucu tarafında saklanır.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { label: "Anthropic (Claude)", env: "ANTHROPIC_API_KEY" },
              { label: "OpenAI (GPT)", env: "OPENAI_API_KEY" },
              { label: "Google (Gemini)", env: "GOOGLE_GENERATIVE_AI_API_KEY" },
              { label: "Moonshot (Kimi)", env: "KIMI_API_KEY" },
              { label: "Alibaba (Qwen)", env: "QWEN_API_KEY" },
            ].map((provider) => (
              <div key={provider.env} className="flex items-center justify-between p-3 rounded-md bg-muted/50">
                <div>
                  <p className="text-sm font-medium">{provider.label}</p>
                  <p className="text-xs text-muted-foreground">{provider.env}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">
                    .env.local ile yapılandırın
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Hakkında</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Prompt Generator v0.1.0 — AI modelleri için optimize edilmiş prompt üreten 3 uzman ajanlı web uygulaması.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
