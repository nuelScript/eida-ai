"use client";

import { Button } from "@/components/ui/button";
import { Settings, Sparkles } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";

interface SubscriptionButtonProps {
  isPro: boolean;
}

export const SubscriptionButton = ({ isPro }: SubscriptionButtonProps) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const onClick = async () => {
    try {
      setLoading(true);

      const reponse = await axios.get("/api/stripe");
      window.location.href = reponse.data.url;
    } catch (error) {
      toast({
        description: "Something went wrong. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <Button
      onClick={onClick}
      disabled={loading}
      size="sm"
      variant={isPro ? "default" : "premium"}
    >
      {isPro ? "Manage Subscription" : "Upgrade to Pro"}
      {isPro ? (
        <Settings className="h-4 w-4 ml-2 fill-white" />
      ) : (
        <Sparkles className="h-4 w-4 ml-2 fill-white" />
      )}
    </Button>
  );
};
