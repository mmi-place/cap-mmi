"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  FilePenLine,
  GitCompareArrows,
  Heart,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { AccessibilityMenu } from "./accessibility-menu";
import { useProgramStore } from "./program-store";

const links = [
  ["/", "Explorer"],
  ["/comparateur", "Comparateur"],
  ["/methode", "Données & méthode"],
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const { favorites, compare } = useProgramStore();
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1500px] items-center justify-between px-4 py-3 lg:px-8">
        <Link
          href="/"
          className="flex shrink-0 items-center"
          aria-label="Cap MMI — accueil"
        >
          <Image
            src="/cap-mmi-wordmark.png"
            alt=""
            width={180}
            height={54}
            priority
            className="h-11 w-auto object-contain sm:h-12"
          />
        </Link>
        <nav
          className="hidden items-center gap-1 md:flex"
          aria-label="Navigation principale"
        >
          {links.map(([href, label]) => (
            <Link
              key={href}
              href={href}
              aria-current={pathname === href ? "page" : undefined}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${pathname === href ? "bg-teal-50 text-teal-800" : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"}`}
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-2 md:flex">
            <Link
              href="/contribuer"
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100"
            >
              <FilePenLine size={14} /> Contribuer
            </Link>
            <Link
              href="/comparateur"
              className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-700 hover:bg-rose-100"
              aria-label={`${favorites.length} formation${favorites.length > 1 ? "s" : ""} favorite${favorites.length > 1 ? "s" : ""}`}
            >
              <Heart size={14} fill="currentColor" /> {favorites.length}
            </Link>
            <Link
              href="/comparateur"
              className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white"
            >
              <GitCompareArrows size={16} /> {compare.length} / 2
            </Link>
          </div>
          <AccessibilityMenu />
          <button
            className="rounded-xl p-2 text-slate-700 md:hidden"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t border-slate-100 bg-white p-4 md:hidden">
          {links.map(([href, label]) => (
            <Link
              onClick={() => setOpen(false)}
              key={href}
              href={href}
              aria-current={pathname === href ? "page" : undefined}
              className={`block rounded-xl px-4 py-3 font-semibold ${pathname === href ? "bg-teal-50 text-teal-800" : "text-slate-700 hover:bg-slate-50"}`}
            >
              {label}
            </Link>
          ))}
          <Link
            onClick={() => setOpen(false)}
            href="/contribuer"
            className={`mt-1 flex items-center gap-2 rounded-xl px-4 py-3 font-semibold ${pathname === "/contribuer" ? "bg-teal-50 text-teal-800" : "text-slate-700 hover:bg-slate-50"}`}
          >
            <FilePenLine size={16} /> Signaler ou proposer
          </Link>
          <div className="mt-3 grid grid-cols-2 gap-2 border-t border-slate-100 pt-3">
            <Link
              onClick={() => setOpen(false)}
              href="/comparateur"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-rose-50 px-3 py-3 text-sm font-semibold text-rose-700"
            >
              <Heart size={15} fill="currentColor" /> {favorites.length} favori{favorites.length > 1 ? "s" : ""}
            </Link>
            <Link
              onClick={() => setOpen(false)}
              href="/comparateur"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-3 py-3 text-sm font-semibold text-white"
            >
              <GitCompareArrows size={15} /> {compare.length} / 2
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
