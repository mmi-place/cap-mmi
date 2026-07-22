"use client";

import type { ReactNode } from "react";
import { useEffect, useId, useRef, useState } from "react";

type InfoTooltipProps = {
  children: ReactNode;
  label: string;
  text: string;
};

export function InfoTooltip({ children, label, text }: InfoTooltipProps) {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState<{
    left: number;
    top: number;
    width: number;
    above: boolean;
  } | null>(null);
  const tooltipId = useId();
  const triggerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!open) return;
    const reposition = () => {
      const trigger = triggerRef.current;
      if (!trigger) return;
      const rect = trigger.getBoundingClientRect();
      const width = Math.min(272, window.innerWidth - 24);
      setPosition({
        left: Math.min(
          Math.max(12, rect.right - width),
          window.innerWidth - width - 12,
        ),
        top: rect.top > 170 ? rect.top - 8 : rect.bottom + 8,
        width,
        above: rect.top > 170,
      });
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    reposition();
    document.addEventListener("keydown", closeOnEscape);
    window.addEventListener("resize", reposition);
    window.addEventListener("scroll", reposition, true);
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      window.removeEventListener("resize", reposition);
      window.removeEventListener("scroll", reposition, true);
    };
  }, [open]);

  return (
    <span
      ref={triggerRef}
      className="relative inline-flex cursor-help rounded-md outline-none transition-colors hover:bg-slate-950/[.06] focus-visible:bg-slate-950/[.06]"
      tabIndex={0}
      aria-label={label}
      aria-describedby={open ? tooltipId : undefined}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onClick={() => setOpen(true)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      {children}
      {open && position && (
        <span
          id={tooltipId}
          role="tooltip"
          style={{
            left: position.left,
            top: position.top,
            width: position.width,
            transform: position.above ? "translateY(-100%)" : undefined,
          }}
          className="fixed z-[90] rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-left text-[11px] font-normal leading-[1.5] text-slate-700 shadow-[0_10px_28px_rgba(15,23,42,.12)]"
        >
          {text}
        </span>
      )}
    </span>
  );
}
