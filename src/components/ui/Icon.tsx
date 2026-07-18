import {
  FaAddressCard, FaArrowUpRightFromSquare, FaAward, FaBars, FaBriefcase, FaBuilding,
  FaChartSimple, FaCheck, FaChevronDown, FaChevronLeft, FaChevronRight, FaChevronUp,
  FaCircleCheck, FaCircleExclamation, FaCircleInfo, FaCircleQuestion, FaCircleXmark,
  FaCloudArrowUp, FaCouch, FaCrown, FaEnvelope, FaEnvelopeOpen, FaEye, FaEyeSlash,
  FaFloppyDisk, FaFolderOpen, FaGear, FaGem, FaGlobe, FaHammer, FaHandHoldingHeart,
  FaHotel, FaHouse, FaImage, FaImages, FaInbox, FaLayerGroup, FaLeaf, FaLocationDot,
  FaLockOpen, FaPaintbrush, FaPanorama, FaPaperclip, FaPaperPlane, FaPenToSquare,
  FaPhone, FaPlus, FaRightFromBracket, FaShareNodes, FaShip, FaStar, FaStore, FaTags,
  FaTrash, FaTriangleExclamation, FaTruck, FaUpload, FaUtensils, FaXmark,
  FaCompassDrafting,
} from "react-icons/fa6";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa6";
import type { IconType } from "react-icons";

/**
 * Single icon registry.
 *
 * Keys are the Font Awesome class names this project already uses — including
 * the values persisted in the `services.icon` column and offered by the admin
 * icon picker — so the database stays valid while the Font Awesome CDN
 * stylesheet is gone from the critical path.
 *
 * Unknown names fall back to a neutral star rather than rendering nothing, so a
 * legacy or hand-edited DB value can never leave an empty hole in the UI.
 */
const REGISTRY: Record<string, IconType> = {
  // ── Brand ──────────────────────────────────────────────────────────────────
  "fa-facebook-f": FaFacebookF,
  "fa-instagram": FaInstagram,
  "fa-whatsapp": FaWhatsapp,

  // ── Navigation / chrome ────────────────────────────────────────────────────
  "fa-bars": FaBars,
  "fa-xmark": FaXmark,
  "fa-chevron-up": FaChevronUp,
  "fa-chevron-down": FaChevronDown,
  "fa-chevron-left": FaChevronLeft,
  "fa-chevron-right": FaChevronRight,
  "fa-arrow-up-right-from-square": FaArrowUpRightFromSquare,
  "fa-right-from-bracket": FaRightFromBracket,

  // ── Contact ────────────────────────────────────────────────────────────────
  "fa-phone": FaPhone,
  "fa-envelope": FaEnvelope,
  "fa-envelope-open": FaEnvelopeOpen,
  "fa-location-dot": FaLocationDot,
  "fa-paper-plane": FaPaperPlane,
  "fa-address-card": FaAddressCard,
  "fa-share-nodes": FaShareNodes,

  // ── Status / feedback ──────────────────────────────────────────────────────
  "fa-check": FaCheck,
  "fa-circle-check": FaCircleCheck,
  "fa-circle-info": FaCircleInfo,
  "fa-circle-xmark": FaCircleXmark,
  "fa-circle-exclamation": FaCircleExclamation,
  "fa-circle-question": FaCircleQuestion,
  "fa-triangle-exclamation": FaTriangleExclamation,

  // ── Admin actions ──────────────────────────────────────────────────────────
  "fa-eye": FaEye,
  "fa-eye-slash": FaEyeSlash,
  "fa-pen": FaPenToSquare,
  "fa-trash": FaTrash,
  "fa-plus": FaPlus,
  "fa-upload": FaUpload,
  "fa-cloud-arrow-up": FaCloudArrowUp,
  "fa-floppy-disk": FaFloppyDisk,
  "fa-folder-open": FaFolderOpen,
  "fa-lock-open": FaLockOpen,
  "fa-paperclip": FaPaperclip,
  "fa-gear": FaGear,
  "fa-layer-group": FaLayerGroup,
  "fa-chart-simple": FaChartSimple,
  "fa-inbox": FaInbox,
  "fa-tags": FaTags,
  "fa-image": FaImage,
  "fa-images": FaImages,
  "fa-panorama": FaPanorama,

  // ── Brand identity / stats ─────────────────────────────────────────────────
  "fa-crown": FaCrown,
  "fa-couch": FaCouch,
  "fa-award": FaAward,
  "fa-hands-holding-circle": FaHandHoldingHeart,

  // ── Service icons (admin picker + seeded values) ───────────────────────────
  "fa-ship": FaShip,
  "fa-hotel": FaHotel,
  "fa-utensils": FaUtensils,
  "fa-compass-drafting": FaCompassDrafting,
  "fa-store": FaStore,
  "fa-truck": FaTruck,
  "fa-globe": FaGlobe,
  "fa-building": FaBuilding,
  "fa-house": FaHouse,
  "fa-star": FaStar,
  "fa-paint-brush": FaPaintbrush,
  "fa-hammer": FaHammer,
  "fa-gem": FaGem,
  "fa-leaf": FaLeaf,
  "fa-briefcase": FaBriefcase,
  "fa-briefcase-blank": FaBriefcase,
};

/** Icon names the admin picker offers — kept beside the registry so the two stay in sync. */
export const SERVICE_ICONS = [
  "fa-ship", "fa-hotel", "fa-utensils", "fa-compass-drafting", "fa-store",
  "fa-truck", "fa-globe", "fa-building", "fa-house", "fa-star",
  "fa-paint-brush", "fa-hammer", "fa-gem", "fa-crown", "fa-leaf",
] as const;

interface IconProps {
  /** Font Awesome style class name, e.g. "fa-crown". */
  name: string;
  className?: string;
  /** Accessible label. Omit for purely decorative icons (the default). */
  title?: string;
}

export default function Icon({ name, className, title }: IconProps) {
  const Glyph = REGISTRY[name] ?? FaStar;
  return (
    <Glyph
      className={className}
      title={title}
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
    />
  );
}
