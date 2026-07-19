import {
  BookOpenCheck,
  Hash,
  ListCollapse,
  type LucideIcon,
  Repeat,
  Replace,
  Scaling,
  ScanText,
  SearchCheck,
  Shrink,
  Sparkles,
  SpellCheck,
} from "lucide-react";

/**
 * Registry mapping serializable icon names to lucide components.
 *
 * Tool data (config/constants.ts) stores only the string name so it can cross
 * the React Server -> Client Component boundary; the client grid resolves the
 * name to a component via this map.
 */
export const toolIcons = {
  Sparkles,
  Repeat,
  BookOpenCheck,
  ScanText,
  ListCollapse,
  SpellCheck,
  Replace,
  SearchCheck,
  Hash,
  Scaling,
  Shrink,
} satisfies Record<string, LucideIcon>;

export type ToolIconName = keyof typeof toolIcons;
