import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Modal,
} from 'react-native';
import {
  CalendarCheck,
  UserPlus,
  LayoutDashboard,
  LogOut,
  Cross,
  Sparkles,
  ShieldCheck,
  Radio,
} from './Icons';

import { styles, PANEL_WIDTH } from './Sidebar.styles';
import { colors, getAvatarGradient } from '../../assets/style/theme';

const SIDEBAR_ITEMS = [
  { icon: CalendarCheck, label: 'Service Check-in', screen: 'EventSelect' },
  { icon: UserPlus, label: 'Member Registration', screen: 'NewMember' },
  { icon: LayoutDashboard, label: 'Shift Overview', screen: 'Dashboard' },
];

type Props = {
  activeScreen: string;
  onCollapse: () => void;
  onExpand: () => void;
  isOpen: boolean;
  onNavigate: (screen: string) => void;
  currentUser: { name: string; username: string; role: string };
  onLogout: () => void;
};

export default function Sidebar({
  activeScreen,
  onCollapse,
  onExpand,
  isOpen,
  onNavigate,
  currentUser,
  onLogout,
}: Props) {
  const slideAnim = useRef(new Animated.Value(-PANEL_WIDTH)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const collapsedFade = useRef(new Animated.Value(1)).current;
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);

  const miniNavOpacity = fadeAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  useEffect(() => {
    if (isOpen) {
      Animated.parallel([
        Animated.spring(slideAnim, {
          toValue: 0,
          useNativeDriver: true,
          tension: 80,
          friction: 12,
        }),
        Animated.timing(collapsedFade, {
          toValue: 0,
          duration: 80,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          delay: 100,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.spring(slideAnim, {
          toValue: -PANEL_WIDTH,
          useNativeDriver: true,
          tension: 80,
          friction: 12,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 80,
          useNativeDriver: true,
        }),
        Animated.timing(collapsedFade, {
          toValue: 1,
          duration: 200,
          delay: 100,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isOpen]);

  const handleLogout = () => {
    setLogoutModalVisible(true);
  };

  const confirmLogout = () => {
    setLogoutModalVisible(false);
    onLogout();
  };

  const cancelLogout = () => {
    setLogoutModalVisible(false);
  };

  const getInitials = (name: string) => {
    if (!name) return 'U';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
    }
    return name[0].toUpperCase();
  };

  const avatarStyle = getAvatarGradient(currentUser.name);

  const isRoleAdmin = currentUser.role.toLowerCase() === 'admin';

  return (
    <View style={styles.wrapper}>
      {/* ── Mini Sidebar (Permanent Strip) ── */}
      <View style={styles.miniSidebar}>
        {/* Animated Burger Toggle */}
        <TouchableOpacity
          style={styles.burgerButton}
          onPress={isOpen ? onCollapse : onExpand}
          activeOpacity={0.7}>
          <View style={styles.toggleLine} />
          <View style={[styles.toggleLine, { width: 16 }]} />
          <View style={styles.toggleLine} />
        </TouchableOpacity>

        {/* Church Cross Emblem (Mini) */}
        <View style={styles.miniLogoWrap}>
          <View style={styles.miniCrest}>
            <Cross size={14} color={colors.gold} strokeWidth={2.4} />
          </View>
        </View>

        {/* Collapsed Icons */}
        <Animated.View
          style={[styles.miniNav, { opacity: miniNavOpacity }]}
          pointerEvents={isOpen ? 'none' : 'auto'}>
          {SIDEBAR_ITEMS.map((item, index) => {
            const IconComponent = item.icon;
            const isActive = activeScreen === item.screen;
            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.miniItem,
                  isActive && styles.miniItemActive,
                ]}
                onPress={() => onNavigate(item.screen)}
                activeOpacity={0.75}>
                <IconComponent
                  size={20}
                  color={isActive ? colors.goldLight : colors.sidebarTextMuted}
                  strokeWidth={isActive ? 2.2 : 1.8}
                />
              </TouchableOpacity>
            );
          })}
        </Animated.View>

        {/* Collapsed Mini Avatar */}
        <Animated.View
          style={[styles.collapsedAccount, { opacity: collapsedFade }]}
          pointerEvents={isOpen ? 'none' : 'auto'}>
          <TouchableOpacity
            style={[styles.miniAvatar, { backgroundColor: avatarStyle.bg }]}
            onPress={onExpand}
            activeOpacity={0.8}>
            <Text style={[styles.miniAvatarText, { color: avatarStyle.text }]}>
              {getInitials(currentUser.name)}
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </View>

      {/* ── Expanded Sanctuary Panel ── */}
      <Animated.View
        style={[
          styles.expandedPanel,
          { transform: [{ translateX: slideAnim }] },
        ]}
        pointerEvents={isOpen ? 'auto' : 'none'}>

        {/* Sanctuary Branding Crest */}
        <Animated.View style={[styles.churchInfo, { opacity: fadeAnim }]}>
          <View style={styles.brandRow}>
            <View style={styles.brandCrest}>
              <Cross size={18} color={colors.gold} strokeWidth={2.4} />
            </View>
            <View style={styles.brandTextWrap}>
              <Text style={styles.churchName}>SANCTUARY</Text>
              <Text style={styles.churchSubtitle}>Usher Terminal System</Text>
            </View>
          </View>
        </Animated.View>

        <View style={styles.divider} />

        {/* Expanded Navigation Items */}
        <Animated.View style={[styles.expandedNav, { opacity: fadeAnim }]}>
          <Text style={styles.navSectionLabel}>NAVIGATION</Text>
          {SIDEBAR_ITEMS.map((item, index) => {
            const IconComponent = item.icon;
            const isActive = activeScreen === item.screen;
            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.expandedItem,
                  isActive && styles.expandedItemActive,
                ]}
                onPress={() => {
                  onNavigate(item.screen);
                  onCollapse();
                }}
                activeOpacity={0.75}>
                {isActive && <View style={styles.activePillIndicator} />}
                <IconComponent
                  size={19}
                  color={isActive ? colors.goldLight : colors.sidebarTextMuted}
                  strokeWidth={isActive ? 2.2 : 1.8}
                />
                <Text
                  style={[
                    styles.expandedLabel,
                    isActive && styles.expandedLabelActive,
                  ]}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </Animated.View>

        {/* ── Bottom Account & Status Section ── */}
        <Animated.View style={[styles.bottomSection, { opacity: fadeAnim }]}>
          <View style={styles.divider} />

          {/* User Profile Card */}
          <View style={styles.profileCard}>
            <View style={[styles.avatar, { backgroundColor: avatarStyle.bg }]}>
              <Text style={[styles.avatarText, { color: avatarStyle.text }]}>
                {getInitials(currentUser.name)}
              </Text>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName} numberOfLines={1}>
                {currentUser.name}
              </Text>
              <Text style={styles.profileUsername} numberOfLines={1}>
                @{currentUser.username}
              </Text>
              <View
                style={[
                  styles.roleBadge,
                  isRoleAdmin ? styles.roleBadgeAdmin : styles.roleBadgeUsher,
                ]}>
                <ShieldCheck
                  size={11}
                  color={isRoleAdmin ? colors.goldLight : '#38d37c'}
                  strokeWidth={2}
                />
                <Text
                  style={[
                    styles.roleBadgeText,
                    isRoleAdmin ? styles.roleTextAdmin : styles.roleTextUsher,
                  ]}>
                  {currentUser.role}
                </Text>
              </View>
            </View>
          </View>

          {/* Sign Out Button */}
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={handleLogout}
            activeOpacity={0.75}>
            <LogOut size={16} color={colors.danger} strokeWidth={2} />
            <Text style={styles.logoutText}>Sign Out</Text>
          </TouchableOpacity>

          {/* Online Tablet Status */}
          <View style={styles.bottomStatus}>
            <View style={styles.onlinePulseWrap}>
              <View style={styles.onlinePulse} />
              <View style={styles.onlineDot} />
            </View>
            <Text style={styles.onlineText}>Tablet Station Online</Text>
          </View>
        </Animated.View>
      </Animated.View>

      {/* ── Sanctuary Sign Out Confirmation Modal ── */}
      <Modal
        visible={logoutModalVisible}
        transparent
        animationType="fade"
        onRequestClose={cancelLogout}>
        <TouchableOpacity
          style={styles.logoutModalOverlay}
          activeOpacity={1}
          onPress={cancelLogout}>
          <TouchableOpacity activeOpacity={1} style={styles.logoutModalCard}>
            <View style={styles.logoutModalIconWrap}>
              <LogOut size={26} color={colors.danger} strokeWidth={2.2} />
            </View>

            <Text style={styles.logoutModalTitle}>Confirm Sign Out</Text>
            <Text style={styles.logoutModalMessage}>
              Are you sure you want to end your usher session, {currentUser.name}?
            </Text>

            <View style={styles.logoutModalActions}>
              <TouchableOpacity
                style={styles.logoutModalCancel}
                onPress={cancelLogout}
                activeOpacity={0.8}>
                <Text style={styles.logoutModalCancelText}>Stay Signed In</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.logoutModalConfirm}
                onPress={confirmLogout}
                activeOpacity={0.8}>
                <Text style={styles.logoutModalConfirmText}>Sign Out</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}
