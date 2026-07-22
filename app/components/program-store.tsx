"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

type Store = {
  favorites: string[];
  compare: string[];
  toggleFavorite: (id: string) => void;
  toggleCompare: (id: string) => void;
  clearCompare: () => void;
};

const ProgramStore = createContext<Store | null>(null);

export function ProgramStoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [compare, setCompare] = useState<string[]>([]);
  const [storageReady, setStorageReady] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        setFavorites(JSON.parse(localStorage.getItem("mmi-favorites") || "[]"));
        setCompare(
          JSON.parse(localStorage.getItem("mmi-compare") || "[]").slice(0, 2),
        );
      } catch {
        /* stockage local illisible : on repart vide */
      } finally {
        setStorageReady(true);
      }
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!storageReady) return;
    localStorage.setItem("mmi-favorites", JSON.stringify(favorites));
  }, [favorites, storageReady]);
  useEffect(() => {
    if (!storageReady) return;
    localStorage.setItem("mmi-compare", JSON.stringify(compare));
  }, [compare, storageReady]);

  const value = useMemo<Store>(
    () => ({
      favorites,
      compare,
      toggleFavorite: (id) =>
        setFavorites((current) =>
          current.includes(id)
            ? current.filter((value) => value !== id)
            : [...current, id],
        ),
      toggleCompare: (id) =>
        setCompare((current) =>
          current.includes(id)
            ? current.filter((value) => value !== id)
            : current.length < 2
              ? [...current, id]
              : [current[1], id],
        ),
      clearCompare: () => setCompare([]),
    }),
    [favorites, compare],
  );

  return (
    <ProgramStore.Provider value={value}>{children}</ProgramStore.Provider>
  );
}

export function useProgramStore() {
  const value = useContext(ProgramStore);
  if (!value) throw new Error("ProgramStoreProvider manquant");
  return value;
}
