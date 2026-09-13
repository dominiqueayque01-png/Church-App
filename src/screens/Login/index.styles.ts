import { StyleSheet } from 'react-native';
import { colors, radius, shadows, spacing } from '../../assets/style/theme';

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#12100e', // Deep sanctuary black
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#12100e',
    overflow: 'hidden',
  },
  goldAuraTop: {
    position: 'absolute',
    top: -120,
    left: -80,
    width: 380,
    height: 380,
    borderRadius: 190,
    backgroundColor: 'rgba(181, 151, 58, 0.08)',
  },
  goldAuraBottom: {
    position: 'absolute',
    bottom: -160,
    right: -100,
    width: 460,
    height: 460,
    borderRadius: 230,
    backgroundColor: 'rgba(181, 151, 58, 0.06)',
  },
  viewport: {
    flex: 1,
  },
  flashOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.bg,
  },

  // ── LANDSCAPE LAYOUT (PRIMARY TABLET ORIENTATION) ───────
  landscapeContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 48,
  },
  landscapeBrand: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 24,
  },
  landscapeFormWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 24,
  },

  // ── PORTRAIT LAYOUT ──────────────────────────────────
  portraitContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 28,
    gap: 24,
  },
  portraitBrand: {
    alignItems: 'center',
    marginBottom: 8,
  },

  // ── SACRED SEAL BRANDING ──────────────────────────────
  sealOuterRing: {
    width: 104,
    height: 104,
    borderRadius: 52,
    borderWidth: 1.5,
    borderColor: 'rgba(181, 151, 58, 0.35)',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: 'rgba(181, 151, 58, 0.04)',
  },
  sealInnerRing: {
    width: 82,
    height: 82,
    borderRadius: 41,
    borderWidth: 2,
    borderColor: colors.gold,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(24, 22, 20, 0.85)',
    ...shadows.gold,
  },
  churchName: {
    fontSize: 24,
    fontWeight: '900',
    color: colors.goldLight,
    letterSpacing: 4,
    textAlign: 'center',
    marginBottom: 8,
  },
  goldDividerLine: {
    width: 50,
    height: 2,
    backgroundColor: colors.gold,
    borderRadius: 1,
    marginBottom: 10,
  },
  portalSubtitle: {
    fontSize: 11,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.55)',
    letterSpacing: 2,
    textAlign: 'center',
    marginBottom: 14,
  },
  stationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(181, 151, 58, 0.12)',
    borderWidth: 1,
    borderColor: colors.borderGold,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: radius.pill,
    gap: 6,
  },
  stationBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.2,
    color: colors.goldLight,
  },

  // ── FROSTED GLASSMORPHIC CARD ─────────────────────────
  card: {
    width: '100%',
    maxWidth: 410,
    backgroundColor: 'rgba(28, 24, 20, 0.92)',
    borderRadius: radius.xl,
    padding: 30,
    borderWidth: 1,
    borderColor: 'rgba(181, 151, 58, 0.22)',
    ...shadows.dark,
  },
  cardLandscape: {
    maxWidth: 430,
  },
  cardHeader: {
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.textInverse,
    marginBottom: 6,
  },
  cardSubtitle: {
    fontSize: 12,
    color: colors.sidebarTextMuted,
    lineHeight: 18,
  },

  // ── FORM CONTROLS ─────────────────────────────────────
  fieldGroup: {
    marginBottom: 16,
  },
  fieldLabel: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.2,
    color: colors.gold,
    marginBottom: 8,
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: radius.md,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    paddingHorizontal: 14,
    height: 48,
    gap: 10,
  },
  inputBoxFocused: {
    borderColor: colors.gold,
    backgroundColor: 'rgba(181, 151, 58, 0.08)',
  },
  textInput: {
    flex: 1,
    fontSize: 14,
    color: colors.textInverse,
    height: '100%',
  },
  eyeToggle: {
    padding: 6,
  },

  // ── SUBMIT BUTTON ─────────────────────────────────────
  submitButton: {
    backgroundColor: colors.gold,
    borderRadius: radius.md,
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 6,
    ...shadows.gold,
  },
  submitButtonLoading: {
    opacity: 0.8,
  },
  submitButtonText: {
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 0.8,
    color: '#181614',
  },

  // ── QUICK DEMO ACCESS PILLS ───────────────────────────
  demoSection: {
    marginTop: 22,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.08)',
  },
  demoSectionTitle: {
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1.4,
    color: 'rgba(255, 255, 255, 0.35)',
    marginBottom: 10,
    textAlign: 'center',
  },
  demoPillRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  demoPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: radius.pill,
    paddingHorizontal: 10,
    paddingVertical: 6,
    gap: 4,
  },
  demoPillActive: {
    backgroundColor: 'rgba(181, 151, 58, 0.2)',
    borderColor: colors.gold,
  },
  demoPillText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.sidebarText,
  },
  demoPillTextActive: {
    color: colors.goldLight,
  },
  demoPillRole: {
    fontSize: 9,
    color: colors.sidebarTextMuted,
  },
});