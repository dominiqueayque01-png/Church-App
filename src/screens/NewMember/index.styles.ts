import { StyleSheet } from 'react-native';
import { colors, radius, shadows, spacing } from '../../assets/style/theme';

// ── DROPDOWN POPUP STYLES ─────────────────────────────────
export const dropdown = StyleSheet.create({
  wrapper: {
    position: 'relative',
    zIndex: 99,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  buttonOpen: {
    borderColor: colors.gold,
  },
  buttonText: {
    fontSize: 13,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  menu: {
    position: 'absolute',
    top: 48,
    left: 0,
    right: 0,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    zIndex: 999,
    ...shadows.lg,
    overflow: 'hidden',
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 11,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  optionActive: {
    backgroundColor: colors.goldSubtle,
  },
  optionText: {
    fontSize: 13,
    color: colors.textPrimary,
    fontWeight: '500',
  },
  optionTextActive: {
    color: colors.goldDark,
    fontWeight: '700',
  },
});

// ── MAIN STYLES ──────────────────────────────────────────
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg, // #f5f0e8
  },
  pageHeader: {
    paddingHorizontal: 28,
    paddingTop: 18,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: colors.card,
    ...shadows.sm,
  },
  pageTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: colors.textPrimary,
  },
  pageSubtitle: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 60,
  },
  scrollContentLandscape: {
    padding: 24,
  },

  // ── TABLET LANDSCAPE TWO-COLUMNS ───────────────────────
  twoCol: {
    flexDirection: 'row',
    gap: 20,
    alignItems: 'flex-start',
  },
  leftCol: {
    width: 280,
  },
  leftColInner: {
    gap: 16,
  },
  rightCol: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 10,
    alignItems: 'flex-end',
  },
  colFlex1: { flex: 1 },
  colFlex2: { flex: 2 },

  // ── PHOTO BOX ─────────────────────────────────────────
  photoBox: {
    backgroundColor: '#f2ecdf',
    borderWidth: 1.5,
    borderColor: colors.borderGold,
    borderStyle: 'dashed',
    borderRadius: radius.lg,
    paddingVertical: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(181, 151, 58, 0.12)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  photoTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 2,
  },
  photoLabel: {
    fontSize: 11,
    color: colors.textSecondary,
  },

  // ── CARD ──────────────────────────────────────────────
  card: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    padding: 18,
    marginBottom: 14,
    ...shadows.sm,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.textPrimary,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
    paddingBottom: 8,
    marginBottom: 6,
  },

  // ── INPUT CONTROLS ────────────────────────────────────
  label: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.textSecondary,
    marginBottom: 4,
    marginTop: 6,
  },
  req: {
    color: colors.danger,
  },
  input: {
    backgroundColor: '#ffffff',
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingVertical: 9,
    paddingHorizontal: 12,
    fontSize: 13,
    color: colors.textPrimary,
  },
  inputMultiline: {
    height: 64,
    textAlignVertical: 'top',
    marginTop: 4,
  },

  // ── GENDER SEGMENT ────────────────────────────────────
  genderRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 2,
  },
  genderBtn: {
    flex: 1,
    paddingVertical: 9,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: radius.md,
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  genderBtnActive: {
    backgroundColor: colors.gold,
    borderColor: colors.gold,
  },
  genderText: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  genderTextActive: {
    color: '#181614',
    fontWeight: '800',
  },

  // ── CHIPS ─────────────────────────────────────────────
  chipGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: '#ede6d8',
  },
  chipActive: {
    backgroundColor: colors.gold,
    borderColor: colors.gold,
  },
  chipText: {
    fontSize: 11,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  chipTextActive: {
    color: '#181614',
    fontWeight: '800',
  },

  // ── SUBMIT CTA ────────────────────────────────────────
  submitButton: {
    backgroundColor: colors.gold,
    borderRadius: radius.md,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 40,
    gap: 8,
    ...shadows.gold,
  },
  submitButtonDisabled: {
    opacity: 0.7,
  },
  submitText: {
    color: '#181614',
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: 0.4,
  },
});