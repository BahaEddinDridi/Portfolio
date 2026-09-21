import {
  DiscordIcon,
  EmailIcon,
  GithubIcon,
  LinkedinIcon,
  PhoneIcon,
  type IconType,
} from "@/lib/icons";
import { socials } from "./site";

export interface ContactChannel {
  label: string;
  value: string;
  href: string;
  icon: IconType;
}

export const contactChannels: ContactChannel[] = [
  {
    label: "Email",
    value: socials.email,
    href: `mailto:${socials.email}`,
    icon: EmailIcon,
  },
  {
    label: "Phone",
    value: socials.phone,
    href: `tel:${socials.phone.replace(/\s/g, "")}`,
    icon: PhoneIcon,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/baha-eddine-dridi-88b039203",
    href: socials.linkedin,
    icon: LinkedinIcon,
  },
  {
    label: "GitHub",
    value: "github.com/BahaEddinDridi",
    href: socials.github,
    icon: GithubIcon,
  },
  {
    label: "Discord",
    value: "geodaddy1591",
    href: socials.discord,
    icon: DiscordIcon,
  },
];
