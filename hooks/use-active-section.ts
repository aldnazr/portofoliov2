import { useEffect, useState } from "react";

export function useActiveSection(ids: readonly string[]) {
  const [activeId, setActiveId] = useState(ids[0] ?? "");

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length === 0) return;
        setActiveId(visible[visible.length - 1].target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );

    for (const element of elements) observer.observe(element);
    return () => observer.disconnect();
  }, [ids]);

  return activeId;
}
