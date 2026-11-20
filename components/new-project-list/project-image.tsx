"use client";

import Image from "next/image";
import { useState } from "react";
import OutlineTextBackground from "../background/OutlineTextBackground";

type ProjectImageProps = {
  src: string;
  alt: string;
  title?: string;
  ratio: "square" | "video";
  sizes: string;
};

export function ProjectImage({
  src,
  alt,
  title,
  ratio,
  sizes,
}: ProjectImageProps) {
  const [status, setStatus] = useState<"loading" | "loaded" | "error">(
    "loading",
  );

  return (
    <div
      className={`relative w-full overflow-hidden rounded-[inherit] ${
        ratio === "square" ? "aspect-square" : "aspect-video"
      }`}
    >
      <div
        aria-hidden="true"
        className={`absolute inset-0 z-0 isolate ${
          status === "loading" ? "animate-pulse motion-reduce:animate-none" : ""
        }`}
      >
        <OutlineTextBackground text={title ? title.slice(0, 4) : alt} fill />
      </div>
      {status !== "error" && (
        <Image
          fill
          src={src}
          alt={alt}
          sizes={sizes}
          onLoad={() => setStatus("loaded")}
          onError={() => setStatus("error")}
          className={`z-1 object-cover transition-opacity duration-500 motion-reduce:transition-none ${
            status === "loaded" ? "opacity-100" : "opacity-0"
          }`}
        />
      )}
    </div>
  );
}
