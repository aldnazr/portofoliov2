import { create } from "zustand/react";

export type ProjectViewMode = "carousel" | "list";

interface ProjectViewModeState {
  viewMode: ProjectViewMode;
  setViewMode: (viewMode: ProjectViewMode) => void;
}

export const useProjectViewMode = create<ProjectViewModeState>()((set) => ({
  viewMode: "carousel",
  setViewMode: (viewMode) => set({ viewMode }),
}));
