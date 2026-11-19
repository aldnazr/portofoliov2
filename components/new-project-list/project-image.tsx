'use client';

import Image from 'next/image';
import { useState } from 'react';

type ProjectImageProps = {
  src: string;
  alt: string;
  ratio: 'square' | 'video';
  sizes: string;
};

/**
 * Gambar banner dengan placeholder di belakangnya.
 * - loading → placeholder berdenyut, gambar transparan
 * - loaded  → gambar fade-in menutupi placeholder
 * - error   → gambar disembunyikan, placeholder tetap tampil (layout tidak rusak)
 */
export function ProjectImage({ src, alt, ratio, sizes }: ProjectImageProps) {
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading');

  return (
    <div
      className={`relative w-full overflow-hidden rounded-[inherit] ${
        ratio === 'square' ? 'aspect-square' : 'aspect-video'
      }`}
    >
      <div
        aria-hidden="true"
        className={`absolute inset-0 z-0 isolate bg-linear-to-br from-neutral-900 to-neutral-950 ${
          status === 'loading' ? 'animate-pulse motion-reduce:animate-none' : ''
        }`}
      />
      {status !== 'error' && (
        <Image
          fill
          src={src}
          alt={alt}
          sizes={sizes}
          onLoad={() => setStatus('loaded')}
          onError={() => setStatus('error')}
          className={`z-[1] object-cover transition-opacity duration-500 motion-reduce:transition-none ${
            status === 'loaded' ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}
    </div>
  );
}
