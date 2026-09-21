/**
 * The project's single icon source.
 *
 * Every icon in the app comes from `react-icons` and is re-exported here under
 * an intent-revealing name. Importing icons directly from `react-icons/*` in a
 * component is what let three different icon sets drift into the codebase, so
 * add the icon here first and import it from `@/lib/icons`.
 *
 * `react-icons` rather than `lucide-react` because the skills constellation and
 * the project cards need brand marks (React, Docker, GitHub, Jira...), and
 * lucide dropped every brand icon in v1.
 */
export type { IconType } from "react-icons";

export {
  FaBars as MenuIcon,
  FaTimes as CloseIcon,
  FaChevronLeft as ChevronLeftIcon,
  FaChevronRight as ChevronRightIcon,
  FaChevronDown as ChevronDownIcon,
  FaExternalLinkAlt as ExternalLinkIcon,
  FaSpinner as SpinnerIcon,
  FaCode as CodeIcon,
  FaBriefcase as BriefcaseIcon,
  FaUsers as UsersIcon,
  FaEnvelope as EmailIcon,
  FaPhone as PhoneIcon,
  FaGithub as GithubIcon,
  FaLinkedin as LinkedinIcon,
  FaFacebook as FacebookIcon,
  FaInstagram as InstagramIcon,
} from "react-icons/fa";

export { SiDiscord as DiscordIcon } from "react-icons/si";
