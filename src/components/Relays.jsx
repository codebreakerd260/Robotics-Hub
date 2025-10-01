import { useEffect, useState } from "react";
import { ref, onValue, set } from "firebase/database";
import { db } from "../firebase";
import Header from "./Header";
import RelayCard from "./RelayCard";
import { Activity } from "lucide-react";

export default function Relays() {
  const [relays, setRelays] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribers = [];
    
    for (let i = 1; i <= 8; i++) {
      const relayRef = ref(db, `Relays/Relay${i}/status`);
      const unsubscribe = onValue(relayRef, (snapshot) => {
        setRelays((prev) => ({ ...prev, [`Relay${i}`]: snapshot.val() }));
        setLoading(false);
      });
      unsubscribers.push(unsubscribe);
    }

    return () => unsubscribers.forEach((unsub) => unsub());
  }, []);

  const toggleRelay = (id, val) => {
    set(ref(db, `Relays/${id}/status`), val);
  };

  const activeCount = Object.values(relays).filter((status) => status === 0).length;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-muted-foreground">Loading relays...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="container mx-auto px-6 py-8">
        <div className="mb-8 glass-card p-6 rounded-2xl">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-1">
                Relay Dashboard
              </h2>
              <p className="text-muted-foreground">
                Manage your smart home devices in real-time
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="glass-card px-6 py-3 rounded-xl">
                <div className="flex items-center gap-3">
                  <Activity className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Active Relays</p>
                    <p className="text-2xl font-bold text-foreground">
                      {activeCount}/8
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Object.keys(relays)
            .sort()
            .map((id, index) => (
              <div
                key={id}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <RelayCard
                  id={id}
                  status={relays[id]}
                  onToggle={toggleRelay}
                />
              </div>
            ))}
        </div>
      </main>
    </div>
  );
}
