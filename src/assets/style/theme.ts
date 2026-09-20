// ═══════════════════════════════════════════════════
// SANCTUARY DESIGN TOKENS — Usher Tablet App
// Matches church-admin web app token system
// ═══════════════════════════════════════════════════

export const colors = {
  // Brand Liturgical Gold
  gold: '#b5973a',
  goldLight: '#d4b84a',
  goldDark: '#8b7535',
  goldSubtle: 'rgba(181, 151, 58, 0.12)',
  goldGlow: 'rgba(181, 151, 58, 0.28)',

  // Sanctuary Surfaces
  bg: '#f5f0e8',                // Warm parchment canvas
  card: '#faf7f0',              // Warm cream card
  cardHover: '#ffffff',
  sidebarBg: '#181614',          // Deep warm sanctuary charcoal
  sidebarElevated: '#24211d',    // Elevated dark charcoal
  inputBg: 'rgba(0, 0, 0, 0.03)',
  inputBgDark: 'rgba(255, 255, 255, 0.06)',
  overlay: 'rgba(20, 16, 12, 0.65)',
  overlayStrong: 'rgba(12, 10, 8, 0.82)',

  // Borders & Dividers
  border: '#e0d9c8',
  borderLight: '#ebe6da',
  borderDark: 'rgba(255, 255, 255, 0.08)',
  borderDarkMuted: 'rgba(255, 255, 255, 0.05)',
  borderGold: 'rgba(181, 151, 58, 0.25)',
  borderGoldStrong: 'rgba(181, 151, 58, 0.5)',

  // Text Hierarchy
  textPrimary: '#2d2214',        // Deep warm espresso
  textSecondary: '#7d7261',      // Warm taupe
  textMuted: '#a89f90',          // Soft muted
  textInverse: '#ffffff',
  sidebarText: 'rgba(255, 255, 255, 0.88)',
  sidebarTextMuted: 'rgba(255, 255, 255, 0.45)',

  // Semantic Status
  success: '#27ae60',
  successBg: 'rgba(39, 174, 96, 0.12)',
  successBorder: 'rgba(39, 174, 96, 0.25)',
  danger: '#c0392b',
  dangerBg: 'rgba(192, 57, 43, 0.12)',
  dangerBorder: 'rgba(192, 57, 43, 0.25)',
  warning: '#e67e22',
  warningBg: 'rgba(230, 126, 34, 0.12)',
  info: '#2980b9',
  infoBg: 'rgba(41, 128, 185, 0.12)',

  // Legacy mappings for backwards-compatibility
  dark: '#181614',
  cream: '#f5f0e8',
  creamPanel: '#faf7f0',
  white: '#ffffff',
  textFaint: '#a89f90',
  textOnDark: 'rgba(255, 255, 255, 0.88)',
  textOnDarkMuted: 'rgba(255, 255, 255, 0.45)',
  textOnDarkFaint: 'rgba(255, 255, 255, 0.25)',
  dangerTint: 'rgba(192, 57, 43, 0.12)',
  goldTint: 'rgba(181, 151, 58, 0.15)',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

export const radius = {
  xs: 4,
  sm: 6,      // Church-Admin --radius-sm: 6px
  md: 10,     // Church-Admin --radius-md: 10px
  lg: 14,     // Church-Admin --radius-lg: 14px
  xl: 20,     // Church-Admin --radius-xl: 20px
  pill: 9999, // Church-Admin --radius-full: 9999px
  round: 9999,
};

export const font = {
  xs: 11,
  sm: 12,
  base: 13,
  md: 14,
  lg: 16,
  xl: 18,
  xxl: 22,
  display: 28,
};

export const typography = {
  serif: 'serif',
  sans: 'sans-serif',
};

export const shadows = {
  sm: {
    shadowColor: '#2d2214',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  md: {
    shadowColor: '#2d2214',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07,
    shadowRadius: 10,
    elevation: 4,
  },
  lg: {
    shadowColor: '#2d2214',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 18,
    elevation: 6,
  },
  gold: {
    shadowColor: '#b5973a',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.22,
    shadowRadius: 14,
    elevation: 4,
  },
  dark: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 10,
  },
};



/**
 * Generates deterministic pastel background and text colors from a name string.
 * Aligns 100% with the admin web app's getAvatarGradient logic.
 */
export function getAvatarGradient(name: string): { bg: string; text: string } {
  if (!name) return { bg: '#e8e4d8', text: '#5a4a20' };
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hues = [38, 45, 160, 200, 280, 340];
  const hue = hues[Math.abs(hash) % hues.length];
  return {
    bg: `hsl(${hue}, 45%, 88%)`,
    text: `hsl(${hue}, 55%, 25%)`,
  };
}