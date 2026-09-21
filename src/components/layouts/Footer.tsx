"use client";

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
  "relative transition-all duration-300 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-white after:transition-all after:duration-300 dark:after:bg-gray-900";

export function Footer() {
  const activeSection = useActiveSection(sectionIds);

  return (
    <footer className="relative overflow-hidden bg-[#030f18] px-4 py-10 sm:px-6 lg:px-8 dark:bg-white">
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center">
        <div className="mb-6 flex items-center justify-center">
          <span className="text-3xl font-extrabold tracking-wide text-white dark:text-gray-900">
            {site.name}
          </span>
        </div>

        <nav aria-label="Footer" className="mb-2 w-full">
          <ul className="flex list-none flex-wrap justify-center gap-x-4 gap-y-1 text-base font-medium">
            {navItems.map(({ id, label }) => (
              <li key={id}>
                <button
                  type="button"
                  onClick={() => scrollToSection(id)}
                  aria-current={activeSection === id ? "true" : undefined}
                  className={cn(
                    "text-gray-400 hover:text-white dark:text-gray-600 dark:hover:text-gray-900",
                    UNDERLINE_BASE,
                    activeSection === id
                      ? "text-white after:w-full dark:text-gray-900"
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
                className="block text-gray-400 transition-colors duration-300 hover:text-white dark:text-gray-600 dark:hover:text-gray-900"
              >
                <Icon className="size-6 transition-transform duration-200 hover:scale-110" />
              </a>
            </li>
          ))}
        </ul>

        <p className="mt-4 text-center text-xs text-gray-500 dark:text-gray-400">
          Made with 💻, ☕, and a sprinkle of ✨ by {site.name} ©{" "}
          {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}

export default Footer;
