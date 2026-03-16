"use client";

import Image from "next/image";
import { useState } from "react";

export default function LogoLightbox({ src, alt }: { src: string; alt: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="cursor-zoom-in"
        aria-label={`View ${alt} logo`}
      >
        <div className="w-16 h-16 relative rounded-xl overflow-hidden shrink-0 bg-white border border-gray-200 hover:ring-2 hover:ring-blue-400 transition-all">
          <Image
            src={src}
            alt={alt}
            width={64}
            height={64}
            className="object-contain w-full h-full p-1"
          />
        </div>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative bg-white rounded-2xl p-4 shadow-2xl max-w-md w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors text-gray-500 hover:text-gray-700"
              aria-label="Close"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <Image
              src={src}
              alt={alt}
              width={512}
              height={512}
              quality={100}
              className="w-full h-auto object-contain rounded-xl"
            />
            <p className="text-center text-sm font-medium text-gray-700 mt-3">{alt}</p>
          </div>
        </div>
      )}
    </>
  );
}
