import { createContext, useContext, useRef, useState, useCallback, type ReactNode } from 'react';

type StarStats = { hoveredCount: number; clickedCount: number; connectedCount: number };
type StarStatsApi = StarStats & {
  markHovered: (id: number) => void;
  markClicked: (id: number) => void;
  markConnected: (id: number) => void;
};

const StarStatsContext = createContext<StarStatsApi | null>(null);

export function StarStatsProvider({ children }: { children: ReactNode }) {
  const connectedIds = useRef(new Set<number>());
  const [stats, setStats] = useState<StarStats>({ hoveredCount: 0, clickedCount: 0, connectedCount: 0 });

  const markHovered = useCallback((_id: number) => {
    setStats((s) => ({ ...s, hoveredCount: s.hoveredCount + 1 }));
  }, []);

  const markClicked = useCallback((_id: number) => {
    setStats((s) => ({ ...s, clickedCount: s.clickedCount + 1 }));
  }, []);

  const markConnected = useCallback((id: number) => {
    if (connectedIds.current.has(id)) return;
    connectedIds.current.add(id);
    setStats((s) => ({ ...s, connectedCount: connectedIds.current.size }));
  }, []);

  return (
    <StarStatsContext.Provider value={{ ...stats, markHovered, markClicked, markConnected }}>
      {children}
    </StarStatsContext.Provider>
  );
}

export function useStarStats() {
  const ctx = useContext(StarStatsContext);
  if (!ctx) throw new Error('useStarStats must be used within StarStatsProvider');
  return ctx;
}