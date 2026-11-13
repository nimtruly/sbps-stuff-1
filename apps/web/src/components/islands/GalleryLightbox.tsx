import { useState, useEffect } from 'preact/hooks';

interface ImageItem {
  url: string;
  alt: string;
  caption?: string;
}

interface Props {
  images: ImageItem[];
}

export default function GalleryLightbox({ images }: Props) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === 'Escape') setSelectedIndex(null);
      if (e.key === 'ArrowRight') {
        setSelectedIndex((prev) => (prev !== null ? (prev + 1) % images.length : null));
      }
      if (e.key === 'ArrowLeft') {
        setSelectedIndex((prev) => (prev !== null ? (prev - 1 + images.length) % images.length : null));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, images.length]);

  return (
    <div>
      {/* Grid */}
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {images.map((img, idx) => (
          <div
            key={img.url}
            class="group cursor-pointer rounded-xl overflow-hidden bg-paper-100 border border-paper-300 shadow-sm flex flex-col"
            onClick={() => setSelectedIndex(idx)}
          >
            <div class="aspect-4/3 overflow-hidden bg-paper-200">
              <img
                src={img.url}
                alt={img.alt}
                class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
            </div>
            {img.caption && (
              <div class="p-3 text-xs text-paper-700 bg-paper-50 border-t border-paper-200">
                {img.caption}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedIndex !== null && (
        <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/90 backdrop-blur-sm">
          {/* Close Backdrop */}
          <div class="absolute inset-0" onClick={() => setSelectedIndex(null)} />

          {/* Modal Container */}
          <div class="relative z-10 max-w-4xl w-full flex flex-col items-center">
            {/* Close Button */}
            <button
              type="button"
              class="absolute -top-12 right-0 text-white hover:text-saffron-300 text-sm font-semibold p-2"
              onClick={() => setSelectedIndex(null)}
              aria-label="Close lightbox"
            >
              ✕ Close (Esc)
            </button>

            {/* Main Image */}
            <div class="relative max-h-[75vh] w-full flex items-center justify-center">
              <img
                src={images[selectedIndex].url}
                alt={images[selectedIndex].alt}
                class="max-h-[75vh] max-w-full rounded-lg shadow-2xl object-contain"
              />

              {/* Prev / Next Controls */}
              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    class="absolute left-2 p-3 rounded-full bg-ink/60 text-white hover:bg-crimson-700 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedIndex((selectedIndex - 1 + images.length) % images.length);
                    }}
                    aria-label="Previous image"
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    class="absolute right-2 p-3 rounded-full bg-ink/60 text-white hover:bg-crimson-700 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedIndex((selectedIndex + 1) % images.length);
                    }}
                    aria-label="Next image"
                  >
                    ›
                  </button>
                </>
              )}
            </div>

            {/* Caption & Counter */}
            <div class="mt-4 text-center text-white space-y-1">
              <p class="text-sm font-medium">{images[selectedIndex].alt}</p>
              {images[selectedIndex].caption && (
                <p class="text-xs text-paper-300">{images[selectedIndex].caption}</p>
              )}
              <span class="text-[11px] text-paper-400 tabular-nums">
                {selectedIndex + 1} of {images.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
