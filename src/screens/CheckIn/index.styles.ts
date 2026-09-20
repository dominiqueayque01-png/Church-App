import { StyleSheet } from 'react-native';
import { colors, radius, shadows, typography } from '../../assets/style/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },

  // ── SANCTUARY TOP BAR ─────────────────────────────────
  header: {
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: colors.card,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...shadows.sm,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: radius.sm, // 6px
    backgroundColor: '#ede6d8',
    borderWidth: 1,
    borderColor: colors.border,
  },
  backButtonText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  headerCenter: {
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 12,
  },
  headerTitle: {
    fontFamily: typography.serif,
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  headerDate: {
    fontSize: 11.5,
    color: colors.textSecondary,
    fontWeight: '500',
    marginTop: 2,
  },
  headerRightChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.successBg,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radius.pill, // 9999px pill badge matching Church-Admin
    gap: 6,
    borderWidth: 1,
    borderColor: colors.successBorder,
  },
  headerRightChipArchived: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fef3c7',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radius.pill,
    gap: 6,
    borderWidth: 1,
    borderColor: '#fde68a',
  },
  syncPulse: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.success,
  },
  syncText: {
    fontSize: 10.5,
    fontWeight: '700',
    color: colors.success,
    letterSpacing: 0.4,
    textTransform: 'uppercase',
  },
  archivedChipText: {
    fontSize: 10.5,
    fontWeight: '700',
    color: '#b45309',
    letterSpacing: 0.4,
    textTransform: 'uppercase',
  },
  historicalBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fffbeb',
    borderBottomWidth: 1,
    borderBottomColor: '#fde68a',
    paddingHorizontal: 20,
    paddingVertical: 10,
    gap: 10,
  },
  historicalBannerText: {
    flex: 1,
    fontSize: 12,
    fontWeight: '600',
    color: '#92400e',
  },
  historicalBannerBadge: {
    backgroundColor: '#fde68a',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radius.pill,
  },
  historicalBannerBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#78350f',
    letterSpacing: 0.3,
  },

  // ── DUAL-PANE LANDSCAPE LAYOUT ─────────────────────────
  contentRow: {
    flex: 1,
    flexDirection: 'row',
  },
  leftPanel: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 18,
  },
  rightPanel: {
    width: 290,
    backgroundColor: colors.card,
    borderLeftWidth: 1,
    borderLeftColor: colors.border,
    paddingHorizontal: 18,
    paddingTop: 18,
    ...shadows.sm,
  },

  // ── PORTRAIT CONTENT ─────────────────────────────────
  portraitContent: {
    flex: 1,
    paddingHorizontal: 18,
    paddingTop: 18,
  },

  // ── SEARCH & ADD BAR (Matches Church-Admin .search-bar) ─
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: radius.md, // 10px
    borderWidth: 1.5,
    borderColor: colors.border,
    paddingHorizontal: 12,
    height: 42,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    color: colors.textPrimary,
    height: '100%',
  },
  addButton: {
    backgroundColor: colors.sidebarBg,
    borderRadius: radius.md, // 10px
    paddingHorizontal: 16,
    height: 42,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    ...shadows.sm,
  },
  addButtonText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 12,
  },

  // ── FILTER TABS (Matches Church-Admin .filter-pill) ───
  filterRow: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 12,
    flexWrap: 'wrap',
  },
  filterTab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: radius.pill, // 9999px pill filter
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: colors.border,
    gap: 6,
  },
  filterTabActive: {
    backgroundColor: colors.gold,
    borderColor: colors.gold,
  },
  filterText: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  filterTextActive: {
    color: '#ffffff',
    fontWeight: '700',
  },
  filterCountBadge: {
    backgroundColor: 'rgba(0, 0, 0, 0.08)',
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: radius.pill,
  },
  filterCountBadgeActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
  },
  filterCountText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  filterCountTextActive: {
    color: '#ffffff',
  },
  divider: {
    height: 1,
    backgroundColor: colors.borderLight,
    marginBottom: 10,
  },

  // ── MEMBER LIST & ROWS (Matches Church-Admin table) ───
  memberList: {
    paddingBottom: 40,
    gap: 8,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingTop: 48,
    gap: 8,
  },
  emptyText: {
    color: colors.textMuted,
    fontSize: 13,
    fontWeight: '500',
  },
  memberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12, // 12px rounded row
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: colors.borderLight,
    gap: 12,
    ...shadows.sm,
  },
  memberRowChecked: {
    borderColor: 'rgba(39, 174, 96, 0.35)',
    backgroundColor: '#fafefc',
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19, // circular avatar matching Church-Admin .avatar
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 14,
    fontWeight: '700',
  },
  memberInfo: {
    flex: 1,
  },
  memberName: {
    fontSize: 13.5,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 3,
  },
  metaBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flexWrap: 'wrap',
  },
  tagBadge: {
    backgroundColor: '#f5f0e8',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: radius.xs,
  },
  tagBadgeText: {
    fontSize: 10,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  statusBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: radius.xs,
  },
  statusBadgeActive: {
    backgroundColor: colors.successBg,
  },
  statusBadgeInactive: {
    backgroundColor: 'rgba(0, 0, 0, 0.06)',
  },
  statusBadgeText: {
    fontSize: 9,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  statusTextActive: {
    color: colors.success,
  },
  statusTextInactive: {
    color: colors.textMuted,
  },

  // Role Badges (Matches Church-Admin .badge--ministry, .badge--fellowship)
  roleBadgeGold: {
    backgroundColor: 'rgba(181, 151, 58, 0.12)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radius.pill,
  },
  roleBadgeGoldText: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.goldDark,
  },
  roleBadgeBlue: {
    backgroundColor: 'rgba(52, 152, 219, 0.12)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radius.pill,
  },
  roleBadgeBlueText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#2980b9',
  },
  roleBadgeGreen: {
    backgroundColor: 'rgba(39, 174, 96, 0.12)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radius.pill,
  },
  roleBadgeGreenText: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.success,
  },

  // Check In Button
  checkInButton: {
    backgroundColor: colors.sidebarBg,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: radius.sm, // 6px
    gap: 6,
  },
  checkedInButton: {
    backgroundColor: colors.success,
  },
  checkInText: {
    color: '#ffffff',
    fontSize: 11.5,
    fontWeight: '700',
  },
  checkInTextChecked: {
    color: '#ffffff',
    fontSize: 11.5,
    fontWeight: '700',
  },

  // ── ATTENDEES SUMMARY PANEL ───────────────────────────
  presentPanelWrapper: {
    flex: 1,
  },
  presentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  presentTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  presentCount: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 2,
  },
  presentRatioBadge: {
    backgroundColor: colors.goldSubtle,
    borderWidth: 1,
    borderColor: colors.borderGold,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radius.sm, // 6px
  },
  presentRatioText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.goldDark,
  },
  progressBarTrack: {
    height: 4,
    backgroundColor: '#ede6d8',
    borderRadius: 2,
    marginVertical: 8,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: colors.goldDark,
    borderRadius: 2,
  },
  presentDivider: {
    height: 1,
    backgroundColor: colors.border,
    marginBottom: 10,
  },
  presentList: {
    paddingBottom: 24,
    gap: 6,
  },
  presentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: radius.sm, // 6px
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  presentNameWrap: {
    flex: 1,
    marginRight: 6,
  },
  presentName: {
    fontSize: 12.5,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  presentTime: {
    fontSize: 10.5,
    color: colors.textMuted,
    marginTop: 1,
  },
  undoBtn: {
    padding: 6,
    borderRadius: radius.xs,
    backgroundColor: '#f5f0e8',
  },
  noPresentBox: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 32,
    gap: 8,
  },
  noPresentText: {
    fontSize: 11,
    color: colors.textMuted,
    textAlign: 'center',
  },

  // ── FLOATING BADGE (PORTRAIT) ─────────────────────────
  floatingBadge: {
    position: 'absolute',
    bottom: 24,
    right: 20,
    backgroundColor: colors.gold,
    borderRadius: radius.pill,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    ...shadows.gold,
  },
  floatingBadgeCount: {
    fontSize: 14,
    fontWeight: '700',
    color: '#ffffff',
  },

  // ── MODAL (PORTRAIT) ─────────────────────────────────
  modalOverlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: 'flex-end',
  },
  modalSheet: {
    backgroundColor: colors.card,
    borderTopLeftRadius: radius.lg, // 14px
    borderTopRightRadius: radius.lg, // 14px
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 36,
    maxHeight: '75%',
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.dark,
  },
  modalHandle: {
    width: 40,
    height: 4,
    backgroundColor: colors.border,
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 14,
  },
  modalClose: {
    position: 'absolute',
    top: 14,
    right: 18,
    padding: 6,
  },
});

export default styles;