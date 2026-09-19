import { StyleSheet } from 'react-native';
import { colors, radius, shadows, spacing } from '../../assets/style/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 28,
    paddingTop: 24,
    backgroundColor: colors.bg, // #f5f0e8
  },
  header: {
    alignItems: 'center',
    marginBottom: 28,
  },
  dateChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ede6d8',
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: radius.pill,
    gap: 6,
    marginBottom: 10,
  },
  dateChipText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.textSecondary,
    letterSpacing: 0.4,
  },
  title: {
    fontSize: 26,
    fontWeight: '900',
    color: colors.textPrimary,
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 13,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  cardsContainer: {
    gap: 18,
    paddingBottom: 40,
  },
  cardsContainerLandscape: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },

  // ── SERVICE CARD ──────────────────────────────────────
  serviceCard: {
    backgroundColor: colors.card, // #faf7f0
    borderRadius: radius.xl,
    padding: 24,
    borderWidth: 1.5,
    borderColor: colors.border,
    justifyContent: 'space-between',
    minHeight: 180,
    ...shadows.md,
  },
  serviceCardActive: {
    borderColor: colors.borderGold,
    backgroundColor: '#ffffff',
  },
  serviceCardLandscape: {
    flex: 1,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radius.pill,
    gap: 6,
  },
  statusPillActive: {
    backgroundColor: colors.successBg,
    borderWidth: 1,
    borderColor: colors.successBorder,
  },
  statusPillUpcoming: {
    backgroundColor: 'rgba(181, 151, 58, 0.12)',
    borderWidth: 1,
    borderColor: colors.borderGold,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusDotActive: {
    backgroundColor: colors.success,
  },
  statusDotUpcoming: {
    backgroundColor: colors.gold,
  },
  statusPillText: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  statusTextActive: {
    color: colors.success,
  },
  statusTextUpcoming: {
    color: colors.goldDark,
  },
  cardDay: {
    fontSize: 11,
    fontWeight: '800',
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },

  cardBody: {
    marginBottom: 20,
  },
  cardName: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  cardRoom: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 14,
  },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0ebe0',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: radius.sm,
    gap: 6,
  },
  metaText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  metaTextHighlight: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.goldDark,
  },

  // Card Footer
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
    paddingTop: 14,
  },
  tapText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  actionArrow: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(181, 151, 58, 0.12)',
    borderWidth: 1,
    borderColor: colors.borderGold,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // ── QUICK PRESET PILLS ────────────────────────────────
  quickNavRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 12,
    flexWrap: 'wrap',
  },
  quickPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: radius.pill,
    backgroundColor: '#ede6d8',
    borderWidth: 1,
    borderColor: colors.border,
  },
  quickPillActive: {
    backgroundColor: colors.gold,
    borderColor: colors.goldDark,
    ...shadows.sm,
  },
  quickPillText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  quickPillTextActive: {
    color: '#181614',
    fontWeight: '800',
  },

  // ── WEEK NAVIGATION BAR ───────────────────────────────
  weekBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.sm,
  },
  weekNavBtn: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: radius.md,
    backgroundColor: '#ede6d8',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  weekNavBtnDisabled: {
    opacity: 0.35,
  },
  weekNavBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  weekInfoWrap: {
    alignItems: 'center',
  },
  weekTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  weekSub: {
    fontSize: 11,
    color: colors.goldDark,
    fontWeight: '700',
    marginTop: 1,
  },

  // ── HISTORICAL NOTICE BANNER ──────────────────────────
  historicalNoticeBanner: {
    backgroundColor: 'rgba(181, 151, 58, 0.14)',
    borderWidth: 1,
    borderColor: colors.borderGold,
    borderRadius: radius.md,
    paddingVertical: 8,
    paddingHorizontal: 14,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  historicalNoticeText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.goldDark,
  },
  historicalResetBtn: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: radius.pill,
    backgroundColor: colors.gold,
  },
  historicalResetText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#181614',
  },

  // ── LOCKED & PAST CARD STATES ─────────────────────────
  serviceCardLocked: {
    backgroundColor: '#f3ede2',
    borderColor: colors.border,
    borderStyle: 'dashed',
    opacity: 0.85,
  },
  statusPillLocked: {
    backgroundColor: 'rgba(0, 0, 0, 0.06)',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  statusDotLocked: {
    backgroundColor: colors.textMuted,
  },
  statusTextLocked: {
    color: colors.textMuted,
  },
  statusPillPast: {
    backgroundColor: 'rgba(181, 151, 58, 0.14)',
    borderWidth: 1,
    borderColor: colors.borderGold,
  },
  statusDotPast: {
    backgroundColor: colors.goldDark,
  },
  statusTextPast: {
    color: colors.goldDark,
  },

  // ── CALENDAR MODAL ────────────────────────────────────
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(24, 22, 20, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  calendarModalCard: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: '#ffffff',
    borderRadius: radius.xl,
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: colors.borderGold,
    ...shadows.lg,
  },
  calendarModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: '#f9f6f0',
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  calendarModalTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  calendarMonthNavRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  calendarMonthLabel: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
  },
  calendarDayHeaderCell: {
    width: '14.28%',
    alignItems: 'center',
    paddingVertical: 6,
  },
  calendarDayHeaderText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.textMuted,
    textTransform: 'uppercase',
  },
  calendarDayCell: {
    width: '14.28%',
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.sm,
    marginVertical: 2,
  },
  calendarDayCellWeekend: {
    backgroundColor: 'rgba(181, 151, 58, 0.1)',
    borderWidth: 1,
    borderColor: colors.borderGold,
  },
  calendarDayCellToday: {
    borderWidth: 1.5,
    borderColor: colors.goldDark,
  },
  calendarDayText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  calendarDayTextMuted: {
    color: colors.textMuted,
    opacity: 0.5,
  },
  calendarDayTextWeekend: {
    fontWeight: '800',
    color: colors.goldDark,
  },
  calendarWeekendTag: {
    fontSize: 8,
    fontWeight: '800',
    color: colors.goldDark,
    marginTop: -2,
  },
  calendarModalFooter: {
    padding: 14,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
    backgroundColor: '#f9f6f0',
    alignItems: 'center',
  },
  calendarModalFooterText: {
    fontSize: 11,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});

export default styles;