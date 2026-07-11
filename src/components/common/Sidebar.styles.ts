import { StyleSheet } from 'react-native';

export const FULL_WIDTH = 260;
export const MINI_WIDTH = 52;
export const PANEL_WIDTH = FULL_WIDTH - MINI_WIDTH;

export const styles = StyleSheet.create({
    wrapper: {
    position: 'relative',
    zIndex: 99,
  },

  // ── MINI SIDEBAR (always visible) ──────────────────
  miniSidebar: {
    width: MINI_WIDTH,
    backgroundColor: '#2c2c2c',
    paddingTop: 16,
    zIndex: 100,
    elevation: 17, // must beat expandedPanel's elevation on Android or icons can get painted underneath
    height: '100%',
  },
  burgerButton: {
    gap: 5,
    padding: 10,
    alignItems: 'center',
    marginBottom: 8,
  },
  toggleLine: {
    height: 2,
    width: 22,
    backgroundColor: '#b5973a',
    borderRadius: 2,
  },
  miniNav: {
    paddingTop: 8,
  },
  miniItem: {
    alignItems: 'center',
    paddingVertical: 14,
    borderLeftWidth: 3,
    borderLeftColor: 'transparent',
  },
  miniItemActive: {
    backgroundColor: 'rgba(181,151,58,0.15)',
    borderLeftColor: '#b5973a',
  },
  miniIcon: {
    fontSize: 18,
    color: '#b5973a',
  },

  // ── EXPANDED PANEL (slides out) ─────────────────────
  expandedPanel: {
    position: 'absolute',
    top: 0,
    left: MINI_WIDTH,
    width: PANEL_WIDTH,
    height: '100%',
    backgroundColor: '#2c2c2c',
    zIndex: 99,
    paddingTop: 16,
    elevation: 16,
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    overflow: 'hidden',
  },
  churchInfo: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  churchName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  churchSubtitle: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.5)',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginBottom: 8,
  },
  expandedNav: {
    paddingTop: 8,
  },
  expandedItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 12,
    borderLeftWidth: 3,
    borderLeftColor: 'transparent',
  },
  expandedItemActive: {
    backgroundColor: 'rgba(181,151,58,0.15)',
    borderLeftColor: '#b5973a',
  },
  expandedIcon: {
    fontSize: 18,
    color: '#b5973a',
  },
  expandedLabel: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.85)',
    fontWeight: '500',
  },
  bottomStatus: {
  // remove: position: 'absolute', bottom: 24, left: 16
  flexDirection: 'row',
  alignItems: 'center',
  gap: 8,
  paddingHorizontal: 16,
  paddingBottom: 20,
},
  onlineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#27ae60',
  },
  onlineText: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.5)',
  },
  userSection: {
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  padding: 16,
},
userDivider: {
  height: 1,
  backgroundColor: 'rgba(255,255,255,0.1)',
  marginBottom: 12,
},
userInfo: {
  flexDirection: 'row',
  alignItems: 'center',
  gap: 10,
  marginBottom: 10,
},
userAvatar: {
  width: 34,
  height: 34,
  borderRadius: 17,
  backgroundColor: '#b5973a',
  justifyContent: 'center',
  alignItems: 'center',
},
userAvatarText: {
  color: '#ffffff',
  fontWeight: 'bold',
  fontSize: 14,
},
userDetails: {
  flex: 1,
},
userName: {
  fontSize: 12,
  fontWeight: '600',
  color: '#ffffff',
},
userRole: {
  fontSize: 10,
  color: 'rgba(255,255,255,0.5)',
  textTransform: 'uppercase',
},


expandedAccount: {
    paddingHorizontal: 12,
    gap: 10,
  },

   profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 10,
    padding: 10,
    gap: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#b5973a',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  avatarText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 2,
  },
  profileUsername: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.4)',
    marginBottom: 5,
  },
  roleBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 4,
  },
  roleBadgeText: {
    color: '#ffffff',
    fontSize: 9,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: 'rgba(231,76,60,0.15)',
    borderRadius: 8,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: 'rgba(231,76,60,0.25)',
  },
  logoutIcon: {
    fontSize: 14,
    color: '#e74c3c',
  },
  logoutText: {
    fontSize: 13,
    color: '#e74c3c',
    fontWeight: '600',
  },

  accountSection: {
flex: 1,                 // fills whatever space is left below the nav items
  justifyContent: 'flex-end', // pushes its content (the card) to the bottom
  paddingBottom: 12,
  },
  accountDivider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginBottom: 12,
  },
  collapsedAccount: {
    alignItems: 'center',
    paddingVertical: 4,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 20,
  },
  miniAvatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#b5973a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  miniAvatarText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 13,
  },

  // ── SIGN OUT MODAL ───────────────────────────────────
  logoutModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  logoutModalCard: {
    width: '100%',
    maxWidth: 320,
    backgroundColor: '#2c2c2c',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  logoutModalIconWrap: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: 'rgba(231,76,60,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
  },
  logoutModalIcon: {
    fontSize: 22,
    color: '#e74c3c',
  },
  logoutModalTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 8,
  },
  logoutModalMessage: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.6)',
    textAlign: 'center',
    lineHeight: 19,
    marginBottom: 22,
  },
  logoutModalActions: {
    flexDirection: 'row',
    gap: 10,
    width: '100%',
  },
  logoutModalCancel: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  logoutModalCancelText: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 13,
    fontWeight: '600',
  },
  logoutModalConfirm: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#e74c3c',
  },
  logoutModalConfirmText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '700',
  },
});