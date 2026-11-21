"use client";

import { useState } from "react";
import Image from "next/image";
import { FiImage } from "react-icons/fi";

type ServiceGalleryProps = {
  images: string[];
  name: string;
};

export default function ServiceGallery({ images, name }: ServiceGalleryProps) {
  const [activeImage, setActiveImage] = useState(0);
  const gallery = images?.filter(Boolean) || [];

  if (gallery.length === 0) {
    return (
      <div className="flex aspect-[4/3] flex-col items-center justify-center gap-3 rounded-3xl border border-[#F0E1E4] bg-[#F7EDEE] text-[#B39CA1]">
        <FiImage className="size-9" />
        <p className="text-sm">No images available for this service</p>
      </div>
    );
  }

  return (
    <div>
      <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-[#F0E1E4] bg-[#F7EDEE] shadow-[0_18px_45px_rgba(72,31,44,0.08)]">
        <Image
          src={gallery[activeImage]}
          alt={`${name} - image ${activeImage + 1}`}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 55vw"
          className="object-cover"
        />

        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#2D111B]/50 to-transparent" />

        <span className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-1.5 text-[10px] font-semibold text-[#772D43] backdrop-blur-sm">
          {activeImage + 1} / {gallery.length}
        </span>
      </div>

      {gallery.length > 1 && (
        <div className="mt-3 grid grid-cols-4 gap-3">
          {gallery.map((image, index) => (
            <button
              key={`${image}-${index}`}
              type="button"
              onClick={() => setActiveImage(index)}
              aria-label={`Show image ${index + 1} of ${name}`}
              className={`relative aspect-square overflow-hidden rounded-xl border-2 bg-[#F7EDEE] transition-all ${
                activeImage === index
                  ? "border-[#772D43] ring-2 ring-[#B76E79]/20"
                  : "border-transparent opacity-75 hover:opacity-100"
              }`}
            >
              <Image
                src={image}
                alt={`${name} thumbnail ${index + 1}`}
                fill
                sizes="120px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
