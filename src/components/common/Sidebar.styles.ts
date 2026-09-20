import { StyleSheet } from 'react-native';
import { colors, radius, shadows, spacing, typography } from '../../assets/style/theme';

export const FULL_WIDTH = 270;
export const MINI_WIDTH = 58;
export const PANEL_WIDTH = FULL_WIDTH - MINI_WIDTH;

export const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    zIndex: 99,
  },

  // ── MINI SIDEBAR (always visible strip) ───────────────
  miniSidebar: {
    width: MINI_WIDTH,
    backgroundColor: colors.sidebarBg, // #181614
    borderRightWidth: 1,
    borderRightColor: colors.borderDark,
    paddingTop: 16,
    zIndex: 100,
    elevation: 20,
    height: '100%',
    alignItems: 'center',
  },
  burgerButton: {
    gap: 4,
    padding: 10,
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: radius.md,
  },
  toggleLine: {
    height: 2,
    width: 20,
    backgroundColor: colors.gold,
    borderRadius: 2,
  },
  miniLogoWrap: {
    marginBottom: 16,
    alignItems: 'center',
  },
  miniCrest: {
    width: 32,
    height: 32,
    borderRadius: radius.md,
    backgroundColor: 'rgba(181, 151, 58, 0.12)',
    borderWidth: 1,
    borderColor: colors.borderGold,
    justifyContent: 'center',
    alignItems: 'center',
  },
  miniNav: {
    width: '100%',
    paddingTop: 4,
    gap: 6,
  },
  miniItem: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 14,
    borderLeftWidth: 3,
    borderLeftColor: 'transparent',
  },
  miniItemActive: {
    backgroundColor: colors.goldSubtle,
    borderLeftColor: colors.gold,
  },
  collapsedAccount: {
    alignItems: 'center',
    paddingVertical: 8,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 20,
  },
  miniAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.borderGold,
  },
  miniAvatarText: {
    fontWeight: '700',
    fontSize: 13,
  },

  // ── EXPANDED SANCTUARY PANEL ──────────────────────────
  expandedPanel: {
    position: 'absolute',
    top: 0,
    left: MINI_WIDTH,
    width: PANEL_WIDTH,
    height: '100%',
    backgroundColor: colors.sidebarBg,
    borderRightWidth: 1,
    borderRightColor: colors.borderDark,
    zIndex: 99,
    paddingTop: 18,
    elevation: 18,
    shadowColor: '#000000',
    shadowOffset: { width: 6, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    overflow: 'hidden',
  },
  churchInfo: {
    paddingHorizontal: 18,
    paddingBottom: 14,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  brandCrest: {
    width: 36,
    height: 36,
    borderRadius: radius.md,
    backgroundColor: 'rgba(181, 151, 58, 0.14)',
    borderWidth: 1,
    borderColor: colors.borderGoldStrong,
    justifyContent: 'center',
    alignItems: 'center',
  },
  brandTextWrap: {
    flex: 1,
  },
  churchName: {
    fontFamily: typography.serif,
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.8,
    color: colors.goldLight,
  },
  churchSubtitle: {
    fontSize: 10,
    fontWeight: '500',
    letterSpacing: 0.4,
    color: colors.sidebarTextMuted,
    marginTop: 1,
  },
  divider: {
    height: 1,
    backgroundColor: colors.borderDark,
    marginHorizontal: 16,
    marginVertical: 10,
  },

  // Navigation List
  expandedNav: {
    paddingTop: 6,
    paddingHorizontal: 10,
    gap: 4,
  },
  navSectionLabel: {
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1.4,
    color: 'rgba(255, 255, 255, 0.32)',
    paddingHorizontal: 10,
    marginBottom: 6,
  },
  expandedItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: radius.md,
    gap: 12,
    position: 'relative',
  },
  expandedItemActive: {
    backgroundColor: 'rgba(181, 151, 58, 0.14)',
  },
  activePillIndicator: {
    position: 'absolute',
    left: 0,
    top: 8,
    bottom: 8,
    width: 3.5,
    borderRadius: 2,
    backgroundColor: colors.gold,
  },
  expandedLabel: {
    fontSize: 13,
    color: colors.sidebarTextMuted,
    fontWeight: '500',
  },
  expandedLabelActive: {
    color: colors.goldLight,
    fontWeight: '700',
  },

  // ── Bottom Section ──
  bottomSection: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: 16,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.sidebarElevated,
    borderRadius: radius.lg,
    padding: 12,
    marginHorizontal: 12,
    marginBottom: 10,
    gap: 10,
    borderWidth: 1,
    borderColor: colors.borderDark,
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.borderGold,
    flexShrink: 0,
  },

  avatarText: {
    fontWeight: '700',
    fontSize: 14,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textInverse,
    marginBottom: 1,
  },
  profileUsername: {
    fontSize: 10,
    color: colors.sidebarTextMuted,
    marginBottom: 4,
  },
  roleBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: radius.pill,
    gap: 4,
  },
  roleBadgeUsher: {
    backgroundColor: 'rgba(39, 174, 96, 0.16)',
    borderWidth: 1,
    borderColor: 'rgba(39, 174, 96, 0.3)',
  },
  roleBadgeAdmin: {
    backgroundColor: 'rgba(181, 151, 58, 0.18)',
    borderWidth: 1,
    borderColor: colors.borderGold,
  },
  roleBadgeText: {
    fontSize: 9,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  roleTextUsher: {
    color: '#38d37c',
  },
  roleTextAdmin: {
    color: colors.goldLight,
  },

  // Logout Button
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: colors.dangerBg,
    borderRadius: radius.md,
    paddingVertical: 10,
    marginHorizontal: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.dangerBorder,
  },
  logoutText: {
    fontSize: 12,
    color: colors.danger,
    fontWeight: '700',
  },

  // Online Status
  bottomStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingHorizontal: 12,
  },
  onlinePulseWrap: {
    width: 12,
    height: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  onlinePulse: {
    position: 'absolute',
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'rgba(39, 174, 96, 0.25)',
  },
  onlineDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.success,
  },
  onlineText: {
    fontSize: 10,
    fontWeight: '500',
    color: colors.sidebarTextMuted,
  },

  // ── SIGN OUT MODAL ───────────────────────────────────
  logoutModalOverlay: {
    flex: 1,
    backgroundColor: colors.overlayStrong,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  logoutModalCard: {
    width: '100%',
    maxWidth: 340,
    backgroundColor: colors.sidebarElevated,
    borderRadius: radius.lg, // 6px
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.borderDark,
    ...shadows.dark,
  },
  logoutModalIconWrap: {
    width: 48,
    height: 48,
    borderRadius: radius.md,
    backgroundColor: colors.dangerBg,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.dangerBorder,
  },
  logoutModalTitle: {
    fontFamily: typography.serif,
    fontSize: 18,
    fontWeight: '700',
    color: colors.textInverse,
    marginBottom: 8,
  },
  logoutModalMessage: {
    fontSize: 13,
    color: colors.sidebarTextMuted,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  logoutModalActions: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  logoutModalCancel: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: radius.md,
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1,
    borderColor: colors.borderDark,
  },
  logoutModalCancelText: {
    color: colors.sidebarText,
    fontSize: 13,
    fontWeight: '600',
  },
  logoutModalConfirm: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: radius.md,
    alignItems: 'center',
    backgroundColor: colors.danger,
  },
  logoutModalConfirmText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '700',
  },
});