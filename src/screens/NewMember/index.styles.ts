import { StyleSheet } from 'react-native';
import { colors, radius, shadows, spacing, typography } from '../../assets/style/theme';

// ── DROPDOWN & MODAL PICKER STYLES ────────────────────────
export const dropdown = StyleSheet.create({
  wrapper: {
    position: 'relative',
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
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(24, 22, 20, 0.55)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalCard: {
    width: '100%',
    maxWidth: 380,
    maxHeight: 440,
    backgroundColor: '#ffffff',
    borderRadius: radius.lg,
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: colors.borderGold,
    elevation: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
    backgroundColor: '#f9f6f0',
  },
  modalTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  modalCloseBtn: {
    padding: 4,
  },
  modalCloseText: {
    fontSize: 16,
    color: colors.textSecondary,
    fontWeight: '700',
  },
  modalScroll: {
    maxHeight: 340,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 13,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  optionActive: {
    backgroundColor: colors.goldSubtle,
  },
  optionText: {
    fontSize: 14,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  optionTextActive: {
    color: colors.goldDark,
    fontWeight: '800',
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
    fontFamily: typography.serif,
    fontSize: 23,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  pageSubtitle: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 3,
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
    fontFamily: typography.serif,
    fontSize: 14,
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
    fontFamily: typography.serif,
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
    paddingBottom: 8,
    marginBottom: 8,
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

  // ── MODE TOGGLE (QUICK VISITOR VS FULL MEMBER) ───────
  modeContainer: {
    flexDirection: 'row',
    backgroundColor: '#e6ded0',
    borderRadius: radius.pill,
    padding: 4,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  modeTab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 6,
  },
  modeTabActive: {
    backgroundColor: colors.sidebarBg,
    ...shadows.sm,
  },
  modeTabText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  modeTabTextActive: {
    color: '#ffffff',
    fontWeight: '800',
  },

  // ── DATE SELECTOR & AGE BADGE ─────────────────────────
  dateRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 4,
  },
  dateColMonth: {
    flex: 2,
  },
  dateColDay: {
    flex: 1.2,
  },
  dateColYear: {
    flex: 1.5,
  },
  ageBadge: {
    backgroundColor: 'rgba(181, 151, 58, 0.15)',
    borderWidth: 1,
    borderColor: colors.borderGold,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radius.pill,
    alignSelf: 'flex-start',
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  ageBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.goldDark,
  },

  // ── AUTO CHECK-IN CARD ────────────────────────────────
  autoCheckInCard: {
    backgroundColor: colors.card,
    borderWidth: 1.5,
    borderColor: colors.borderGold,
    borderRadius: radius.lg,
    padding: 14,
    marginBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...shadows.sm,
  },
  autoCheckInLeft: {
    flex: 1,
    marginRight: 12,
  },
  autoCheckInTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  autoCheckInSubtitle: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 2,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  checkboxActive: {
    backgroundColor: colors.gold,
    borderColor: colors.gold,
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

  // ── ROLE SELECTION CARD STYLES ────────────────────────
  roleCardRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 6,
    marginBottom: 10,
  },
  roleOptionCard: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: radius.md,
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 76,
  },
  roleOptionCardActive: {
    backgroundColor: colors.goldSubtle,
    borderColor: colors.gold,
  },
  roleOptionTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textSecondary,
    marginBottom: 3,
    textAlign: 'center',
  },
  roleOptionTitleActive: {
    color: colors.goldDark,
    fontWeight: '800',
  },
  roleOptionDesc: {
    fontSize: 10,
    color: colors.textMuted,
    textAlign: 'center',
  },
  classificationSlot: {
    marginTop: 4,
  },
  lockedClassificationField: {
    backgroundColor: '#f5f0e8',
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingVertical: 10,
    paddingHorizontal: 12,
    minHeight: 41,
    justifyContent: 'center',
  },
  lockedClassificationText: {
    fontSize: 13,
    color: colors.textSecondary,
    fontWeight: '600',
  },
});