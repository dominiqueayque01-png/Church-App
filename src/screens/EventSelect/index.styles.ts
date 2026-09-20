import { StyleSheet } from 'react-native';
import { colors, radius, shadows, typography } from '../../assets/style/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 28,
    paddingTop: 24,
    backgroundColor: colors.bg, // #f5f0e8
  },

  // ── HEADER ROW ────────────────────────────────────────
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 22,
  },
  headerLeft: {
    flex: 1,
    paddingRight: 16,
  },
  title: {
    fontFamily: typography.serif,
    fontSize: 26,
    fontWeight: '700',
    color: colors.textPrimary,
    letterSpacing: 0.3,
  },
  subtitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 4,
  },
  subtitleText: {
    fontFamily: typography.sans,
    fontSize: 13,
    fontWeight: '500',
    color: colors.textSecondary,
  },
  resetPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.goldSubtle,
    borderWidth: 1,
    borderColor: colors.borderGold,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: radius.pill,
    marginLeft: 6,
  },
  resetPillText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.goldDark,
  },

  // ── CIRCULAR CALENDAR ACTION BUTTON ───────────────────
  calendarCircleBtn: {
    width: 44,
    height: 44,
    borderRadius: 22, // circular action button matching Church-Admin
    backgroundColor: colors.card,
    borderWidth: 1.5,
    borderColor: colors.borderGold,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.sm,
  },
  calendarCircleBtnActive: {
    backgroundColor: colors.gold,
    borderColor: colors.goldDark,
    ...shadows.gold,
  },
  activeIndicatorDot: {
    position: 'absolute',
    top: 2,
    right: 2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.goldDark,
    borderWidth: 1.5,
    borderColor: '#ffffff',
  },

  // ── 2 CARDS CONTAINER ─────────────────────────────────
  cardsContainer: {
    gap: 18,
    paddingBottom: 36,
  },
  cardsContainerLandscape: {
    flexDirection: 'row',
    alignItems: 'stretch',
    gap: 18,
  },

  // ── SERVICE CARD (Matches Church-Admin .calendar-item & .stat-card) ──
  serviceCard: {
    backgroundColor: colors.card, // #faf7f0
    borderRadius: radius.lg, // 14px
    padding: 20,
    borderWidth: 1,
    borderColor: colors.border,
    justifyContent: 'space-between',
    minHeight: 210,
    ...shadows.sm,
  },
  serviceCardActive: {
    borderColor: colors.borderGoldStrong,
    backgroundColor: '#ffffff',
    ...shadows.md,
  },
  serviceCardLocked: {
    backgroundColor: '#f3ece1',
    borderColor: colors.border,
    opacity: 0.88,
  },
  serviceCardLandscape: {
    flex: 1,
  },

  // Card Header: Date Tile + Title
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 14,
    marginBottom: 14,
  },
  dateBlock: {
    width: 50,
    height: 56,
    borderRadius: radius.md, // 10px rounded date tile matching Church-Admin
    alignItems: 'center',
    justifyContent: 'center',
    gap: 1,
  },
  dateBlockMinistry: {
    backgroundColor: 'rgba(181, 151, 58, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(181, 151, 58, 0.3)',
  },
  dateBlockFellowship: {
    backgroundColor: 'rgba(52, 152, 219, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(52, 152, 219, 0.3)',
  },
  dateBlockDay: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    color: colors.textSecondary,
  },
  dateBlockNum: {
    fontSize: 21,
    fontWeight: '800',
    color: colors.textPrimary,
    lineHeight: 22,
  },
  cardTitleWrap: {
    flex: 1,
  },
  cardTitle: {
    fontFamily: typography.serif,
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 3,
  },
  cardRoom: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: 2,
  },
  cardAudience: {
    fontSize: 11,
    color: colors.textMuted,
  },

  // Meta Row: Time & Attendance
  cardMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginVertical: 10,
    flexWrap: 'wrap',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#f1ebd8',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: radius.sm, // 6px
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  metaText: {
    fontSize: 11.5,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  metaTextHighlight: {
    fontSize: 11.5,
    fontWeight: '700',
    color: colors.goldDark,
  },

  // Card Footer: Pill Badge & Action Arrow
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
    paddingTop: 14,
    marginTop: 6,
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radius.pill, // 9999px pill badge matching Church-Admin .badge
    gap: 6,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusPillText: {
    fontSize: 10.5,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },

  // Status Badge Flavors
  statusPillActive: {
    backgroundColor: colors.successBg,
    borderWidth: 1,
    borderColor: colors.successBorder,
  },
  statusTextActive: {
    color: colors.success,
  },
  statusDotActive: {
    backgroundColor: colors.success,
  },

  statusPillUpcoming: {
    backgroundColor: 'rgba(181, 151, 58, 0.12)',
    borderWidth: 1,
    borderColor: colors.borderGold,
  },
  statusTextUpcoming: {
    color: colors.goldDark,
  },
  statusDotUpcoming: {
    backgroundColor: colors.gold,
  },

  statusPillLocked: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.08)',
  },
  statusTextLocked: {
    color: colors.textMuted,
  },
  statusDotLocked: {
    backgroundColor: colors.textMuted,
  },

  statusPillPast: {
    backgroundColor: 'rgba(181, 151, 58, 0.12)',
    borderWidth: 1,
    borderColor: colors.borderGold,
  },
  statusTextPast: {
    color: colors.goldDark,
  },
  statusDotPast: {
    backgroundColor: colors.goldDark,
  },

  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  actionBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textPrimary,
  },

  // ── CALENDAR & EVENTS MODAL ───────────────────────────
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(24, 22, 20, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  calendarModalCard: {
    width: '100%',
    maxWidth: 480,
    maxHeight: '90%',
    backgroundColor: '#ffffff',
    borderRadius: radius.lg, // 14px
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
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
    fontFamily: typography.serif,
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  modalScrollContent: {
    padding: 18,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    color: colors.textSecondary,
    marginBottom: 8,
  },

  // Quick Option Cards
  quickOptionsWrap: {
    marginBottom: 18,
    gap: 6,
  },
  quickOptionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderRadius: radius.md, // 10px
    backgroundColor: '#f7f4ed',
    borderWidth: 1,
    borderColor: colors.border,
  },
  quickOptionCardActive: {
    borderColor: colors.gold,
    backgroundColor: 'rgba(181, 151, 58, 0.12)',
    boxShadow: '0 0 0 2px rgba(181, 151, 58, 0.2)',
  },
  quickOptionLeft: {
    flex: 1,
  },
  quickOptionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  quickOptionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  quickOptionSub: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 2,
  },
  quickOptionRange: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.goldDark,
  },
  activePillBadge: {
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: radius.pill,
    backgroundColor: colors.gold,
  },
  activePillBadgeText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#ffffff',
    textTransform: 'uppercase',
  },

  // Monthly Calendar In Modal
  calendarMonthNavRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    marginBottom: 4,
  },
  calendarMonthLabel: {
    fontFamily: typography.serif,
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  calendarDayHeaderCell: {
    width: '14.28%',
    alignItems: 'center',
    paddingVertical: 5,
  },
  calendarDayHeaderText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.textMuted,
    textTransform: 'uppercase',
  },
  calendarDayCell: {
    width: '14.28%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.sm, // 6px
    marginVertical: 2,
  },
  calendarDayCellWeekend: {
    backgroundColor: 'rgba(181, 151, 58, 0.1)',
    borderWidth: 1,
    borderColor: colors.borderGold,
  },
  calendarDayCellSelected: {
    backgroundColor: colors.gold,
    borderColor: colors.goldDark,
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
    opacity: 0.45,
  },
  calendarDayTextWeekend: {
    fontWeight: '700',
    color: colors.goldDark,
  },
  calendarDayTextSelected: {
    fontWeight: '800',
    color: '#ffffff',
  },
  calendarWeekendTag: {
    fontSize: 8,
    fontWeight: '700',
    color: colors.goldDark,
    marginTop: -2,
  },

  // Modal Footer
  calendarModalFooter: {
    padding: 12,
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