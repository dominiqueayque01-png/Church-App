import { StyleSheet } from 'react-native';
import { colors, radius, shadows, spacing } from '../../assets/style/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg, // #f5f0e8
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
    borderRadius: radius.md,
    backgroundColor: '#ede6d8',
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
    fontSize: 17,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  headerDate: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 2,
  },
  headerRightChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.successBg,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: radius.pill,
    gap: 6,
    borderWidth: 1,
    borderColor: colors.successBorder,
  },
  syncPulse: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.success,
  },
  syncText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.success,
    letterSpacing: 0.4,
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
    width: 280,
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

  // ── SEARCH & ADD BAR ──────────────────────────────────
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
    borderRadius: radius.md,
    borderWidth: 1.5,
    borderColor: colors.border,
    paddingHorizontal: 12,
    height: 44,
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
    borderRadius: radius.md,
    paddingHorizontal: 16,
    height: 44,
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

  // ── FILTER TABS ───────────────────────────────────────
  filterRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
    flexWrap: 'wrap',
  },
  filterTab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: radius.pill,
    backgroundColor: '#ede6d8',
    borderWidth: 1,
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
    color: '#181614',
    fontWeight: '800',
  },
  filterCountBadge: {
    backgroundColor: 'rgba(0, 0, 0, 0.08)',
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 8,
  },
  filterCountBadgeActive: {
    backgroundColor: 'rgba(0, 0, 0, 0.18)',
  },
  filterCountText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  filterCountTextActive: {
    color: '#181614',
  },
  divider: {
    height: 1,
    backgroundColor: colors.borderLight,
    marginBottom: 10,
  },

  // ── MEMBER LIST & ROWS ────────────────────────────────
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
    borderRadius: radius.lg,
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
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 15,
    fontWeight: '800',
  },
  memberInfo: {
    flex: 1,
  },
  memberName: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 3,
  },
  metaBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
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

  // Check In Button
  checkInButton: {
    backgroundColor: colors.sidebarBg,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: radius.md,
    gap: 6,
  },
  checkedInButton: {
    backgroundColor: colors.success,
  },
  checkInText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '700',
  },
  checkInTextChecked: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '800',
  },

  // ── ATTENDEES SUMMARY PANEL ───────────────────────────
  presentPanelWrapper: {
    flex: 1,
  },
  presentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  presentTitle: {
    fontSize: 14,
    fontWeight: '800',
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
    paddingVertical: 4,
    borderRadius: radius.sm,
  },
  presentRatioText: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.goldDark,
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
    borderRadius: radius.md,
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
    fontSize: 12,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  presentTime: {
    fontSize: 10,
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
    fontWeight: '800',
    color: '#181614',
  },

  // ── MODAL (PORTRAIT) ─────────────────────────────────
  modalOverlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: 'flex-end',
  },
  modalSheet: {
    backgroundColor: colors.card,
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
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