"use client";

import { useRef, useState } from "react";
import type {
  CSSProperties,
  KeyboardEvent,
  MouseEvent,
  PointerEvent,
} from "react";
import { CarouselPagination } from "./carousel-pagination";
import { ProjectCard } from "./project-card";
import { CARD_RADIUS, clamp, cn } from "./utils";
import { CarouselProject } from "@/data/types";

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
  const distance = Math.min(Math.abs(offset), SLOTS.length - 1);
  const from = SLOTS[Math.floor(distance)];
  const to = SLOTS[Math.ceil(distance)];
  const t = distance - Math.floor(distance);
  const mix = (a: number, b: number) => a + (b - a) * t;

  return {
    x: mix(from.x, to.x),
    y: mix(from.y, to.y),
    z: mix(from.z, to.z),
    rotate: mix(from.rotate, to.rotate),
    scale: mix(from.scale, to.scale),
    opacity: mix(from.opacity, to.opacity),
    dim: mix(from.dim, to.dim),
  };
}

/** Interpolasi antar-slot, termasuk saat kartu loop melewati slot tersembunyi. */
function getDragOffset(
  index: number,
  active: number,
  progress: number,
  total: number,
  loop: boolean,
): number {
  const from = getOffset(index, active, total, loop);
  if (progress === 0) return from;
  const direction = Math.sign(progress);
  const t = Math.abs(progress);
  // Pada dua kartu, tetangga bisa masuk dari kedua sisi tergantung arah drag.
  const start = loop && total === 2 && from !== 0 ? direction : from;
  const end =
    loop && total === 2 && from === 0 ?
      -direction
    : getOffset(index, active + direction, total, loop);

  // Kartu yang berpindah sisi harus menghilang di belakang, bukan melintas depan.
  if (loop && start * end < 0 && Math.abs(start - end) > 1) {
    const hidden = SLOTS.length - 1;
    // Kedua sisi bertemu di slot tersembunyi pada titik tengah.
    return t < 0.5 ?
        start + (Math.sign(start) * hidden - start) * (t * 2)
      : Math.sign(end) * hidden +
          (end - Math.sign(end) * hidden) * ((t - 0.5) * 2);
  }
  return start + (end - start) * t;
}

function getSlideStyle(offset: number, slot: Slot): CSSProperties {
  const dir = Math.sign(offset);

  return {
    // Kartu aktif tanpa transform supaya teksnya tetap tajam.
    transform:
      offset === 0 ? "none" : (
        `translate3d(calc(${CARD_W} * ${dir * slot.x}), calc(${CARD_W} * ${slot.y}), calc(${CARD_W} * ${slot.z})) rotateY(${dir * slot.rotate}deg) scale(${slot.scale})`
      ),
    opacity: slot.opacity,
    zIndex: Math.max(0, Math.round(10 - Math.abs(offset))),
    pointerEvents: slot.opacity === 0 ? "none" : undefined,
  };
}

const DRAG_START_PX = 10;
const SWIPE_PX = 48;
const DRAG_STEP = SLOTS[1].x; // jarak pusat kartu aktif ke slot tetangga

type DragState = {
  pointerId: number | null;
  moved: boolean;
  startX: number;
  startY: number;
  width: number;
};

export type ProjectCarouselProps = {
  projects: CarouselProject[];
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
  const [dragProgress, setDragProgress] = useState<number | null>(null);
  const drag = useRef<DragState>({
    pointerId: null,
    moved: false,
    startX: 0,
    startY: 0,
    width: 0,
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
    switch (e.key) {
      case "ArrowLeft":
        e.preventDefault();
        prev();
        break;
      case "ArrowRight":
        e.preventDefault();
        next();
        break;
      case "Home":
        e.preventDefault();
        goTo(0);
        break;
      case "End":
        e.preventDefault();
        goTo(total - 1);
        break;
    }
  };

  // Kartu mengikuti pointer secara langsung; transisi CSS hanya dipakai saat
  // melepas pointer agar posisi akhirnya menganimasi ke slot terdekat.
  const getProgress = (dx: number, width: number) => {
    const progress = clamp(-dx / (width * DRAG_STEP), -1, 1);
    return loop ? progress : clamp(progress, -current, total - 1 - current);
  };

  const handlePointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (
      !e.isPrimary ||
      (e.pointerType === "mouse" && e.button !== 0) ||
      total < 2
    )
      return;
    drag.current = {
      pointerId: e.pointerId,
      moved: false,
      startX: e.clientX,
      startY: e.clientY,
      width: (e.currentTarget.firstElementChild as HTMLElement).offsetWidth,
    };
  };

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (d.pointerId !== e.pointerId) return;
    const dx = e.clientX - d.startX;
    const dy = e.clientY - d.startY;
    if (!d.moved) {
      if (Math.abs(dx) <= DRAG_START_PX || Math.abs(dx) <= Math.abs(dy)) return;
      d.moved = true;
      e.currentTarget.setPointerCapture(e.pointerId);
    }
    setDragProgress(getProgress(dx, d.width));
  };

  const handlePointerUp = (e: PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (d.pointerId !== e.pointerId) return;
    d.pointerId = null;
    const dx = e.clientX - d.startX;
    const progress = getProgress(dx, d.width);
    // Pointer bisa dilepas tanpa event move terakhir: hitung ulang dari koordinat up.
    setDragProgress(null);
    if (d.moved && Math.abs(dx) > SWIPE_PX && progress !== 0) {
      goTo(current + Math.sign(progress));
    }
  };

  const handlePointerCancel = (e: PointerEvent<HTMLDivElement>) => {
    if (drag.current.pointerId !== e.pointerId) return;
    drag.current.pointerId = null;
    drag.current.moved = false;
    setDragProgress(null);
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
        "relative w-full overflow-x-clip pb-6 outline-hidden [--card-w:min(640px,68vw)] md:[--card-w:min(640px,84vw)]",
        className,
      )}
    >
      <div
        className="relative mx-auto h-110 md:h-100 w-full touch-pan-y select-none"
        style={{
          perspective: "calc(var(--card-w) * 1.875)",
          perspectiveOrigin: "50% calc(var(--card-w) * 0.375)",
        }}
        onDragStart={(e) => e.preventDefault()}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        onClickCapture={handleClickCapture}
      >
        {projects.map((project, i) => {
          const isActive = i === current;
          const offset =
            dragProgress === null ?
              getOffset(i, current, total, loop)
            : getDragOffset(i, current, dragProgress, total, loop);
          const slot = getSlot(offset);

          return (
            <div
              key={project.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${total}`}
              aria-hidden={isActive ? undefined : true}
              onClick={isActive ? undefined : () => goTo(i)}
              className={cn(
                "absolute inset-x-0 top-0 mx-auto h-full w-(--card-w) ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
                dragProgress === null &&
                  "transition-[transform,opacity] duration-650",
                !isActive && "cursor-pointer",
              )}
              style={getSlideStyle(offset, slot)}
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
                className={cn(
                  "pointer-events-none absolute inset-0 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
                  CARD_RADIUS,
                  dragProgress === null && "transition-colors duration-650",
                )}
                style={{ backgroundColor: `rgba(0,0,0,${slot.dim})` }}
              />
            </div>
          );
        })}
      </div>

      <CarouselPagination
        className="mt-10 sm:mt-12"
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
