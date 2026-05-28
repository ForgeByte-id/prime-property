"use client";

import { useEffect, useRef, type ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
}

export function ScrollReveal({
  children,
  className = "",
}: ScrollRevealProps): React.ReactElement {
  const elementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = elementRef.current;

    if (!element) {
      return;
    }

    let observer: IntersectionObserver | null = null;
    let isDisposed = false;

    const reveal = (): void => {
      if (isDisposed) {
        return;
      }

      if (element.dataset.revealed !== "true") {
        element.dataset.revealed = "true";
      }
    };

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      reveal();
      return;
    }

    observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) {
          return;
        }

        reveal();
        observer?.unobserve(element);
        observer?.disconnect();
        observer = null;
      },
      {
        root: null,
        rootMargin: "0px 0px -12% 0px",
        threshold: 0.12,
      },
    );

    observer.observe(element);

    return () => {
      isDisposed = true;

      if (observer) {
        observer.unobserve(element);
        observer.disconnect();
        observer = null;
      }
    };
  }, []);

  return (
    <div className={`scroll-reveal ${className}`} ref={elementRef}>
      {children}
    </div>
  );
}