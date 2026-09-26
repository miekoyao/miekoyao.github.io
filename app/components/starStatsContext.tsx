import { createContext, useContext, useRef, useState, useCallback, type ReactNode } from 'react';

type StarStats = { hoveredCount: number; clickedCount: number; connectedCount: number };
type StarStatsApi = StarStats & {
  markHovered: (id: number) => void;
  markClicked: (id: number) => void;
  markConnected: (id: number) => void;
};

const StarStatsContext = createContext<StarStatsApi | null>(null);

export function StarStatsProvider({ children }: { children: ReactNode }) {
  const hoveredIds = useRef(new Set<number>());
  const clickedIds = useRef(new Set<number>());
  const connectedIds = useRef(new Set<number>());
  const [stats, setStats] = useState<StarStats>({ hoveredCount: 0, clickedCount: 0, connectedCount: 0 });

  const markHovered = useCallback((id: number) => {
    if (hoveredIds.current.has(id)) return;
    hoveredIds.current.add(id);
    setStats((s) => ({ ...s, hoveredCount: hoveredIds.current.size }));
  }, []);

  const markClicked = useCallback((id: number) => {
    if (clickedIds.current.has(id)) return;
    clickedIds.current.add(id);
    setStats((s) => ({ ...s, clickedCount: clickedIds.current.size }));
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