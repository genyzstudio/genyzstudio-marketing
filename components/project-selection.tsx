'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';
import { greatGulp } from '@/content/studio';

const ProjectSelection = createContext<{ selectedUrl: string; selectProject: (url: string) => void } | null>(null);

export function ProjectSelectionProvider({ children }: { children: ReactNode }) {
  const [selectedUrl, selectProject] = useState(greatGulp.url);
  return <ProjectSelection.Provider value={{ selectedUrl, selectProject }}>{children}</ProjectSelection.Provider>;
}

export function useProjectSelection() {
  const selection = useContext(ProjectSelection);
  if (!selection) throw new Error('Project controls require ProjectSelectionProvider');
  return selection;
}

export function ProjectOnly({ url, children }: { url: string; children: ReactNode }) {
  const { selectedUrl } = useProjectSelection();
  return selectedUrl === url ? children : null;
}
