// Shared design tokens. Import these instead of repeating hex codes /
// spacing numbers across every screen's stylesheet.
//
//   import { colors, spacing, radius, font } from '../theme';

export const colors = {
  // Brand
  gold: '#b5973a',
  goldTint: 'rgba(181,151,58,0.15)',

  // Surfaces
  dark: '#2c2c2c',
  cream: '#f5f5f0',
  creamPanel: '#f0ebe0',
  white: '#ffffff',

  // Borders / dividers
  border: '#e0d9c8',
  borderLight: '#f0ebe0',

  // Text
  textPrimary: '#333333',
  textMuted: '#888888',
  textFaint: '#999999',
  textOnDark: 'rgba(255,255,255,0.85)',
  textOnDarkMuted: 'rgba(255,255,255,0.5)',
  textOnDarkFaint: 'rgba(255,255,255,0.4)',

  // Status
  success: '#27ae60',
  danger: '#e74c3c',
  dangerTint: 'rgba(231,76,60,0.15)',
  dangerBorder: 'rgba(231,76,60,0.25)',

  // Overlays
  overlay: 'rgba(0,0,0,0.4)',
  overlayStrong: 'rgba(0,0,0,0.55)',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
};

export const radius = {
  sm: 6,
  md: 8,
  lg: 10,
  xl: 16,
  pill: 20,
  round: 999,
};

export const font = {
  xs: 10,
  sm: 11,
  base: 13,
  md: 14,
  lg: 15,
  xl: 17,
  xxl: 20,
};