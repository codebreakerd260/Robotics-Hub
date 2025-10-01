import { useState, useEffect } from "react";
import { Power } from "lucide-react";

interface RelayCardProps {
  id: string;
  status: number;
  onToggle: (id: string, val: number) => void;
}

export default function RelayCard({ id, status, onToggle }: RelayCardProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const isOn = status === 0;

  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 300);
    return () => clearTimeout(timer);
  }, [status]);

  return (
    <div
      className={`glass-card p-6 rounded-2xl transition-all duration-300 animate-slide-in ${
        isAnimating ? "scale-105" : ""
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className={`p-3 rounded-xl transition-all duration-300 ${
              isOn ? "relay-on animate-pulse-glow" : "relay-off"
            }`}
          >
            <Power
              className={`w-5 h-5 ${
                isOn ? "text-white" : "text-muted-foreground"
              }`}
            />
          </div>
          <div>
            <h3 className="font-semibold text-lg text-foreground">
              {id.replace("Relay", "Relay ")}
            </h3>
            <p className="text-sm text-muted-foreground">Smart Control</p>
          </div>
        </div>
        <div
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            isOn
              ? "bg-success/20 text-success-glow border border-success/30"
              : "bg-secondary/50 text-muted-foreground border border-border/30"
          }`}
        >
          {isOn ? "ACTIVE" : "INACTIVE"}
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => onToggle(id, 0)}
          disabled={isOn}
          className={`flex-1 py-3 rounded-xl font-semibold transition-all duration-200 ${
            isOn
              ? "relay-on text-white cursor-default"
              : "bg-secondary hover:bg-secondary/80 text-foreground hover:scale-105 active:scale-95"
          }`}
        >
          Turn ON
        </button>
        <button
          onClick={() => onToggle(id, 1)}
          disabled={!isOn}
          className={`flex-1 py-3 rounded-xl font-semibold transition-all duration-200 ${
            !isOn
              ? "bg-destructive/20 text-destructive border border-destructive/30 cursor-default"
              : "bg-secondary hover:bg-secondary/80 text-foreground hover:scale-105 active:scale-95"
          }`}
        >
          Turn OFF
        </button>
      </div>
    </div>
  );
}
