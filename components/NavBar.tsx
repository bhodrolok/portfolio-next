"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  /** Small description shown in the "More" dropdown. */
  desc?: string;
}

export const mainNav: NavItem[] = [
    // TODO: Add other pages
  { label: "/about", href: "/about" },
];

// moarrrrrr
export const moreNav: NavItem[] = [
  { label: "Uses", href: "/uses", desc: "Stuff that I use" },
  { label: "Colophon", href: "/colophon", desc: "How this site was made" },
];

function isPathActive(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

function NavLink({
  href,
  label,
  className = "",
  onClick,
}: {
  href: string;
  label: string;
  className?: string;
  onClick?: () => void;
}) {
  const pathname = usePathname();
  const isActive = isPathActive(pathname, href);

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`nav-link ${
        isActive ? "nav-link--active" : ""
      } ${className}`}
      aria-current={isActive ? "page" : undefined}
    >
      {isActive ? `[ ${label} ]` : label}
    </Link>
  );
}

export default function NavBar() {
  const pathname = usePathname();

  const [moreOpen, setMoreOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const moreRef = useRef<HTMLDivElement>(null);

  // Close opened menus after navigation.
  useEffect(() => {
    setMoreOpen(false);
    setMobileOpen(false);
  }, [pathname]);

  // Close "More" when clicking outside it.
  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (
        moreRef.current &&
        !moreRef.current.contains(event.target as Node)
      ) {
        setMoreOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
    };
  }, []);

  return (
   <nav aria-label="Primary" className="site-navbar">
  <div className="site-navbar-inner">
    <div className="site-navbar-left">
      <NavLink href="/" label="/home" />
    </div>

    <div className="site-navbar-center">
      {mainNav.map((item) => (
        <NavLink
          key={item.href}
          href={item.href}
          label={item.label}
        />
      ))}
    </div>

    <div className="site-navbar-right">
      <span className="site-navbar-customidk">
        Hello World
      </span>

      <div className="relative" ref={moreRef}>
        <button
          type="button"
          onClick={() => setMoreOpen((open) => !open)}
          className={`nav-link flex items-center gap-1 ${
            moreOpen ? "nav-link--active" : ""
          }`}
          aria-haspopup="menu"
          aria-expanded={moreOpen}
        >
          More

          <ChevronDown
            size={14}
            className={`transition-transform duration-150 ${
              moreOpen ? "rotate-180" : ""
            }`}
            aria-hidden
          />
        </button>

        {moreOpen && (
          <div
            role="menu"
            className="absolute left-1/2 top-full z-50 mt-2 w-64 -translate-x-1/2 p-2"
          >
            {moreNav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                role="menuitem"
                className="link-retro block px-2 py-1.5"
                onClick={() => setMoreOpen(false)}
              >
                <span className="font-heading text-sm uppercase tracking-widest">
                  <span className="text-matrix" aria-hidden>
                    &gt;
                  </span>{" "}
                  {item.label}
                </span>

                {item.desc && (
                  <span className="block text-xs text-offwhite/50">
                    {item.desc}
                  </span>
                )}
              </a>
            ))}
          </div>
        )}
      </div>

      {/* Mobile menu */}
      <button
        type="button"
        onClick={() => setMobileOpen((open) => !open)}
        className="link-retro md:hidden"
        aria-label={
          mobileOpen
            ? "Close navigation menu"
            : "Open navigation menu"
        }
        aria-expanded={mobileOpen}
      >
        {mobileOpen ? <X size={18} /> : <Menu size={18} />}
      </button>
    </div>
  </div>

  {mobileOpen && (
    <div className="site-navbar-mobile">
      <div className="site-navbar-mobile-inner">
        {mainNav.map((item) => (
          <NavLink
            key={item.href}
            href={item.href}
            label={item.label}
            className="py-1.5"
            onClick={() => setMobileOpen(false)}
          />
        ))}

        <span
          aria-hidden
          className="my-2 border-t"
        />

        {moreNav.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="nav-link py-1.5 text-offwhite/70"
            onClick={() => setMobileOpen(false)}
          >
            {item.label}
          </a>
        ))}
      </div>
    </div>
  )}
</nav>
  );
}