"use client";

import { useRef, useState } from "react";
import type {
  CSSProperties,
  KeyboardEvent,
  MouseEvent,
  PointerEvent,
} from "react";
import { CarouselPagination } from "./carousel-pagination";
import { ProjectCard, type Project } from "./project-card";
import { clamp, cn } from "./utils";

export type { Project, ProjectStatusTone } from "./project-card";

/**
 * Posisi tiap kartu berdasarkan jaraknya ke kartu aktif (index 0 = aktif,
 * 1 = tetangga, dst). Semua jarak dinyatakan dalam kelipatan lebar kartu
 * (--card-w), jadi layout ikut mengecil di layar kecil. Ini satu-satunya
 * tempat yang perlu diubah untuk menyetel tampilan.
 */
type Slot = {
  x: number; // geser horizontal
  y: number; // geser vertikal
  z: number; // kedalaman (negatif = menjauh dari layar)
  rotate: number; // derajat sumbu Y; kartu kiri negatif, kanan positif
  scale: number;
  opacity: number;
  dim: number; // 0..1, lapisan hitam di atas kartu
};

// Nilai di bawah dikalibrasi terhadap screenshot referensi (kartu 800x500, perspective 1.875x).
const SLOTS: readonly Slot[] = [
  { x: 0, y: 0, z: 0, rotate: 0, scale: 1, opacity: 1, dim: 0 },
  {
    x: 0.669,
    y: 0.007,
    z: -0.111,
    rotate: 12.5,
    scale: 0.906,
    opacity: 1,
    dim: 0.4,
  },
  {
    x: 0.945,
    y: 0.004,
    z: -0.212,
    rotate: 10.3,
    scale: 0.808,
    opacity: 0.4,
    dim: 0.4,
  },
  // Slot tersembunyi: kartu diparkir di belakang kartu aktif, jadi masuk/keluarnya
  // simetris kiri-kanan dan tidak ada kartu yang "menyeberang" saat carousel berputar.
  { x: 0, y: 0, z: -0.35, rotate: 0, scale: 0.7, opacity: 0, dim: 0.4 },
];

const CARD_W = "var(--card-w)";

/** Jarak bertanda kartu `index` ke kartu aktif. Kalau loop, dihitung secara melingkar. */
function getOffset(
  index: number,
  active: number,
  total: number,
  loop: boolean,
): number {
  const diff = index - active;
  if (!loop) return diff;
  let offset = ((diff % total) + total) % total; // 0..total-1
  if (offset > total / 2) offset -= total;
  return offset;
}

function getSlot(offset: number): Slot {
  return SLOTS[Math.min(Math.abs(offset), SLOTS.length - 1)];
}

function getSlideStyle(offset: number): CSSProperties {
  const slot = getSlot(offset);
  const dir = Math.sign(offset);

  return {
    // Kartu aktif tanpa transform supaya teksnya tetap tajam.
    transform:
      offset === 0 ? "none" : (
        `translate3d(calc(${CARD_W} * ${dir * slot.x}), calc(${CARD_W} * ${slot.y}), calc(${CARD_W} * ${slot.z})) rotateY(${dir * slot.rotate}deg) scale(${slot.scale})`
      ),
    opacity: slot.opacity,
    zIndex: Math.max(0, 10 - Math.abs(offset)),
    pointerEvents: slot.opacity === 0 ? "none" : undefined,
  };
}

const DRAG_START_PX = 10;
const SWIPE_PX = 48;

type DragState = {
  tracking: boolean;
  moved: boolean;
  startX: number;
  startY: number;
};

export type ProjectCarouselProps = {
  projects: Project[];
  label?: string;
  defaultIndex?: number;
  loop?: boolean;
  onActiveChange?: (index: number) => void;
  className?: string;
};

export function ProjectCarousel({
  projects,
  label = "Featured projects",
  defaultIndex = 0,
  loop = false,
  onActiveChange,
  className,
}: ProjectCarouselProps) {
  const total = projects.length;
  const initialIndex = clamp(defaultIndex, 0, Math.max(total - 1, 0));
  const [active, setActive] = useState(initialIndex);
  const drag = useRef<DragState>({
    tracking: false,
    moved: false,
    startX: 0,
    startY: 0,
  });

  if (total === 0) return null;

  const current = Math.min(active, total - 1);

  const goTo = (index: number) => {
    const target = loop ? (index + total) % total : clamp(index, 0, total - 1);
    if (target === current) return;
    setActive(target);
    onActiveChange?.(target);
  };
  const prev = () => goTo(current - 1);
  const next = () => goTo(current + 1);

  const handleKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      prev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      next();
    } else if (e.key === "Home") {
      e.preventDefault();
      goTo(0);
    } else if (e.key === "End") {
      e.preventDefault();
      goTo(total - 1);
    }
  };

  // Swipe / drag: geser > SWIPE_PX pindah satu kartu. Pointer baru "ditangkap"
  // setelah benar-benar menggeser, supaya klik biasa pada tombol tetap jalan.
  const handlePointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    drag.current = {
      tracking: true,
      moved: false,
      startX: e.clientX,
      startY: e.clientY,
    };
  };

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d.tracking || d.moved) return;
    const dx = e.clientX - d.startX;
    const dy = e.clientY - d.startY;
    if (Math.abs(dx) > DRAG_START_PX && Math.abs(dx) > Math.abs(dy)) {
      d.moved = true;
      e.currentTarget.setPointerCapture(e.pointerId);
    }
  };

  const handlePointerUp = (e: PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d.tracking) return;
    d.tracking = false;
    const dx = e.clientX - d.startX;
    if (d.moved && Math.abs(dx) > SWIPE_PX) {
      if (dx < 0) next();
      else prev();
    }
  };

  const handlePointerCancel = () => {
    drag.current.tracking = false;
    drag.current.moved = false;
  };

  // Setelah drag, buang event click yang menyusul supaya tidak memicu klik kartu/tombol.
  const handleClickCapture = (e: MouseEvent<HTMLDivElement>) => {
    if (drag.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      drag.current.moved = false;
    }
  };

  return (
    <section
      aria-roledescription="carousel"
      aria-label={label}
      tabIndex={-1}
      onKeyDown={handleKeyDown}
      className={cn(
        "relative w-full overflow-x-clip pb-6 outline-hidden [--card-w:min(640px,84vw)]",
        className,
      )}
    >
      <div
        className="relative mx-auto h-115 w-full touch-pan-y select-none sm:h-100"
        style={{
          perspective: "calc(var(--card-w) * 1.875)",
          // Titik hilang sedikit di bawah tengah kartu, seperti di referensi.
          perspectiveOrigin: "50% calc(var(--card-w) * 0.375)",
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        onClickCapture={handleClickCapture}
      >
        {projects.map((project, i) => {
          const offset = getOffset(i, current, total, loop);
          const isActive = offset === 0;

          return (
            <div
              key={project.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${total}`}
              aria-hidden={isActive ? undefined : true}
              onClick={isActive ? undefined : () => goTo(i)}
              className={cn(
                "absolute inset-x-0 top-0 mx-auto h-full w-(--card-w) transition-[transform,opacity] duration-650 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
                !isActive && "cursor-pointer",
              )}
              style={getSlideStyle(offset)}
            >
              <ProjectCard
                project={project}
                index={i}
                total={total}
                interactive={isActive}
                preload={i === initialIndex}
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-4xl transition-colors duration-650 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
                style={{
                  backgroundColor: `rgba(0,0,0,${getSlot(offset).dim})`,
                }}
              />
            </div>
          );
        })}
      </div>

      <CarouselPagination
        className="mt-6 sm:mt-8"
        total={total}
        active={current}
        onSelect={goTo}
        onPrev={prev}
        onNext={next}
        canPrev={loop ? total > 1 : current > 0}
        canNext={loop ? total > 1 : current < total - 1}
      />

      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {`${projects[current].title} (${current + 1} of ${total})`}
      </p>
    </section>
  );
}
