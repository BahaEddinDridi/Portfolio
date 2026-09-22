"use client";

import { RuneDivider } from "@/components/ui/rune-divider";
import { navItems, sectionIds } from "@/data/navigation";
import { site, socials } from "@/data/site";
import { scrollToSection, useActiveSection } from "@/hooks/useActiveSection";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  type IconType,
} from "@/lib/icons";
import { cn } from "@/lib/utils";

interface SocialLink {
  name: string;
  href: string;
  icon: IconType;
}

const socialLinks: SocialLink[] = [
  { name: "LinkedIn", href: socials.linkedin, icon: LinkedinIcon },
  { name: "Facebook", href: socials.facebook, icon: FacebookIcon },
  { name: "Instagram", href: socials.instagram, icon: InstagramIcon },
];

const UNDERLINE_BASE =
  "font-display relative text-xs tracking-[0.15em] uppercase transition-all duration-300 after:absolute after:bottom-0 after:left-0 after:h-px after:bg-current after:transition-all after:duration-300";

export function Footer() {
  const activeSection = useActiveSection(sectionIds);

  return (
    <footer
      className="relative overflow-hidden px-4 pt-12 pb-10 sm:px-6 lg:px-8"
      style={{ background: "var(--footer)", color: "var(--footer-foreground)" }}
    >
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center">
        <RuneDivider className="mb-8 max-w-sm" />
        <div className="mb-6 flex items-center justify-center">
          <span className="font-display text-gilt text-2xl font-extrabold tracking-[0.2em]">
            {site.name}
          </span>
        </div>

        <nav aria-label="Footer" className="mb-2 w-full">
          <ul className="flex list-none flex-wrap justify-center gap-x-5 gap-y-1">
            {navItems.map(({ id, label }) => (
              <li key={id}>
                <button
                  type="button"
                  onClick={() => scrollToSection(id)}
                  aria-current={activeSection === id ? "true" : undefined}
                  className={cn(
                    "opacity-60 hover:opacity-100",
                    UNDERLINE_BASE,
                    activeSection === id
                      ? "text-gilt opacity-100 after:w-full"
                      : "after:w-0 hover:after:w-full"
                  )}
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <ul className="my-2 flex list-none flex-wrap justify-center gap-4">
          {socialLinks.map(({ name, href, icon: Icon }) => (
            <li key={name}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={name}
                className="hover:text-gilt block opacity-60 transition-all duration-300 hover:opacity-100"
              >
                <Icon className="size-6 transition-transform duration-200 hover:scale-110" />
              </a>
            </li>
          ))}
        </ul>

        <p className="mt-4 text-center text-xs italic opacity-55">
          Made with 💻, ☕, and a sprinkle of ✨ by {site.name} ©{" "}
          {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}

export default Footer;
