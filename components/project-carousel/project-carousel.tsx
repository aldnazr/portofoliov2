"use client";

import { useLayoutEffect, useRef, useState } from "react";
import type { KeyboardEvent, MouseEvent, PointerEvent } from "react";
import { clamp, motion, useReducedMotion } from "motion/react";
import type { Transition } from "motion/react";
import { CarouselPagination } from "./carousel-pagination.tsx";
import { ProjectCard } from "./project-card.tsx";
import { CarouselProject } from "@/data/types.ts";
import { cn, CARD_RADIUS } from "@/lib/utils.ts";

type Slot = {
  x: number;
  y: number;
  z: number;
  rotate: number;
  scale: number;
  opacity: number;
  dim: number;
};

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
  { x: 0, y: 0, z: -0.35, rotate: 0, scale: 0.7, opacity: 0, dim: 0.4 },
];

function getOffset(
  index: number,
  active: number,
  total: number,
  loop: boolean,
): number {
  const diff = index - active;
  if (!loop) return diff;
  let offset = ((diff % total) + total) % total;
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
  const start = loop && total === 2 && from !== 0 ? direction : from;
  const end =
    loop && total === 2 && from === 0 ?
      -direction
    : getOffset(index, active + direction, total, loop);

  if (loop && start * end < 0 && Math.abs(start - end) > 1) {
    const hidden = SLOTS.length - 1;
    return t < 0.5 ?
        start + (Math.sign(start) * hidden - start) * (t * 2)
      : Math.sign(end) * hidden +
          (end - Math.sign(end) * hidden) * ((t - 0.5) * 2);
  }
  return start + (end - start) * t;
}

function getTarget(offset: number, width: number) {
  const dir = Math.sign(offset);
  const slot = getSlot(offset);
  return {
    x: dir * slot.x * width,
    y: slot.y * width,
    z: slot.z * width,
    rotateY: dir * slot.rotate,
    scale: slot.scale,
    opacity: slot.opacity,
    dim: slot.dim,
    zIndex: Math.max(0, Math.round(10 - Math.abs(offset))),
  };
}

const DRAG_START_PX = 10;
const SWIPE_PX = 48;
const DRAG_STEP = SLOTS[1].x;
const SLIDE: Transition = { duration: 0.65, ease: [0.22, 1, 0.36, 1] };
const INSTANT: Transition = { duration: 0 };

type DragState = {
  pointerId: number | null;
  moved: boolean;
  startX: number;
  startY: number;
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
  const [cardWidth, setCardWidth] = useState(0);
  const stageRef = useRef<HTMLDivElement>(null);
  const drag = useRef<DragState>({
    pointerId: null,
    moved: false,
    startX: 0,
    startY: 0,
  });
  const reduceMotion = useReducedMotion();

  useLayoutEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const measure = () =>
      setCardWidth(
        (stage.firstElementChild as HTMLElement | null)?.offsetWidth ?? 0,
      );
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  if (total === 0) return null;

  const current = Math.min(active, total - 1);
  const transition = dragProgress !== null || reduceMotion ? INSTANT : SLIDE;

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

  const getProgress = (dx: number) => {
    const progress = clamp(-dx / (cardWidth * DRAG_STEP), -1, 1);
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
    setDragProgress(getProgress(dx));
  };

  const handlePointerUp = (e: PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (d.pointerId !== e.pointerId) return;
    d.pointerId = null;
    const dx = e.clientX - d.startX;
    const progress = getProgress(dx);
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
        ref={stageRef}
        className="relative mx-auto h-110 md:h-100 w-full touch-pan-y select-none"
        style={{
          perspective: cardWidth * 1.875,
          perspectiveOrigin: `50% ${cardWidth * 0.375}px`,
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
          const target = getTarget(offset, cardWidth);

          return (
            <motion.div
              key={project.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${total}`}
              aria-hidden={isActive ? undefined : true}
              onClick={isActive ? undefined : () => goTo(i)}
              className={cn(
                "absolute inset-x-0 top-0 mx-auto h-full w-(--card-w)",
                !isActive && "cursor-pointer",
              )}
              initial={false}
              animate={{
                x: target.x,
                y: target.y,
                z: target.z,
                rotateY: target.rotateY,
                scale: target.scale,
                opacity: target.opacity,
              }}
              transition={transition}
              style={{
                zIndex: target.zIndex,
                pointerEvents: target.opacity === 0 ? "none" : undefined,
                transformStyle: "preserve-3d",
              }}
            >
              <ProjectCard
                project={project}
                index={i}
                total={total}
                interactive={isActive}
                preload={i === initialIndex}
              />
              <motion.div
                aria-hidden="true"
                className={cn(
                  "pointer-events-none absolute inset-0 bg-black",
                  CARD_RADIUS,
                )}
                initial={false}
                animate={{ opacity: target.dim }}
                transition={transition}
              />
            </motion.div>
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
