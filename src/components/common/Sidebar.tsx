import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Modal,
} from 'react-native';
import { styles, PANEL_WIDTH } from './Sidebar.styles';
 
const SIDEBAR_ITEMS = [
  { icon: '⌕', label: 'Service Check-in', screen: 'EventSelect' },
  { icon: '⊕', label: 'Member Registration', screen: 'NewMember' },
];
 
type Props = {
  activeScreen: string;
  onCollapse: () => void;
  onExpand: () => void;
  isOpen: boolean;
  onNavigate: (screen: string) => void;
  currentUser: { name: string; username: string; role: string };
  onLogout: () => void;
  username: string;
};
 
export default function Sidebar({
  activeScreen,
  onCollapse,
  onExpand,
  isOpen,
  onNavigate,
  currentUser,
  onLogout,
  username,
}: Props) {
  // Start HIDDEN (tucked off-screen behind the mini strip), not at 0.
  const slideAnim = useRef(new Animated.Value(-PANEL_WIDTH)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const collapsedFade = useRef(new Animated.Value(1)).current;

  // Mini nav icons fade out exactly as the expanded panel's icons fade in,
  // so only one set of icons is ever visible at a time.
  const miniNavOpacity = fadeAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  useEffect(() => {
    if (isOpen) {
      Animated.parallel([
        Animated.spring(slideAnim, {
          toValue: 0, // slide INTO its natural docked position
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
          toValue: -PANEL_WIDTH, // slide back OUT of view
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

const [logoutModalVisible, setLogoutModalVisible] = useState(false);

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
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
    }
    return name[0].toUpperCase();
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role.toLowerCase()) {
      case 'admin': return '#e74c3c';
      case 'usher': return '#27ae60';
      default: return '#b5973a';
    }
  };

  return (
    <View style={styles.wrapper}>

      {/* Mini sidebar — always visible strip */}
      <View style={styles.miniSidebar}>
        {/* Burger */}
        <TouchableOpacity
          style={styles.burgerButton}
          onPress={isOpen ? onCollapse : onExpand}>
          <View style={styles.toggleLine} />
          <View style={styles.toggleLine} />
          <View style={styles.toggleLine} />
        </TouchableOpacity>

        {/* Collapsed mini avatar */}
        <Animated.View
          style={[styles.collapsedAccount, { opacity: collapsedFade }]}
          pointerEvents={isOpen ? 'none' : 'auto'}>
          <TouchableOpacity style={styles.miniAvatar} onPress={onExpand}>
            <Text style={styles.miniAvatarText}>
              {getInitials(currentUser.name)}
            </Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Mini icons — hidden while the expanded panel is open so the
            same icon doesn't render twice side by side */}
        <Animated.View
          style={[styles.miniNav, { opacity: miniNavOpacity }]}
          pointerEvents={isOpen ? 'none' : 'auto'}>
          {SIDEBAR_ITEMS.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.miniItem,
                activeScreen === item.screen && styles.miniItemActive,
              ]}
              onPress={() => onNavigate(item.screen)}>
              <Text style={styles.miniIcon}>{item.icon}</Text>
            </TouchableOpacity>
          ))}
        </Animated.View>
      </View>

      {/* Expanded panel — slides out over content */}
      <Animated.View
        style={[
          styles.expandedPanel,
          { transform: [{ translateX: slideAnim }] },
        ]}
        pointerEvents={isOpen ? 'auto' : 'none'}>

        {/* Church Info */}
        <Animated.View style={[styles.churchInfo, { opacity: fadeAnim }]}>
          <Text style={styles.churchName}>Church's Name</Text>
          <Text style={styles.churchSubtitle}>Members Profiling System</Text>
        </Animated.View>

        <View style={styles.divider} />

        {/* Nav Items with labels */}
        <Animated.View style={[styles.expandedNav, { opacity: fadeAnim }]}>
          {SIDEBAR_ITEMS.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.expandedItem,
                activeScreen === item.screen && styles.expandedItemActive,
              ]}
              onPress={() => {
                onNavigate(item.screen);
                onCollapse();
              }}>
              <Text style={styles.expandedIcon}>{item.icon}</Text>
              <Text style={styles.expandedLabel}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </Animated.View>

                {/* ── Account Section ── */}
      <View style={styles.accountSection}>
        <View style={styles.accountDivider} />


        {/* Expanded account card */}
        <Animated.View
          style={[styles.expandedAccount, { opacity: fadeAnim }]}
          pointerEvents={isOpen ? 'auto' : 'none'}>
          <View style={styles.profileCard}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
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
              <View style={[
                styles.roleBadge,
                { backgroundColor: getRoleBadgeColor(currentUser.role) },
              ]}>
                <Text style={styles.roleBadgeText}>{currentUser.role}</Text>
              </View>
            </View>
          </View>

          <TouchableOpacity
            style={styles.logoutButton}
            onPress={handleLogout}
            activeOpacity={0.8}>
            <Text style={styles.logoutIcon}>⎋</Text>
            <Text style={styles.logoutText}>Sign Out</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>


        {/* Online status */}
        <View style={styles.bottomStatus}>
          <View style={styles.onlineDot} />
          <Text style={styles.onlineText}>Tablet client Online</Text>
        </View>

      </Animated.View>

          {/* User Info + Logout — fades in when open */}
<Animated.View style={[styles.userSection, { opacity: fadeAnim }]}>
  <View style={styles.userDivider} />
  <View style={styles.userInfo}>
    <View style={styles.userAvatar}>
      <Text style={styles.userAvatarText}>
        {currentUser.name[0]}
      </Text>
    </View>
    <View style={styles.userDetails}>
      <Text style={styles.userName} numberOfLines={1}>
        {currentUser.name}
      </Text>
      <Text style={styles.userRole}>{currentUser.role}</Text>
    </View>
  </View>
  
      {/* ── Sign Out Confirmation Modal ── */}
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
              <Text style={styles.logoutModalIcon}>⎋</Text>
            </View>
 
            <Text style={styles.logoutModalTitle}>Sign Out</Text>
            <Text style={styles.logoutModalMessage}>
              Are you sure you want to sign out, {currentUser.name}?
            </Text>
 
            <View style={styles.logoutModalActions}>
              <TouchableOpacity
                style={styles.logoutModalCancel}
                onPress={cancelLogout}
                activeOpacity={0.8}>
                <Text style={styles.logoutModalCancelText}>Cancel</Text>
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
  
</Animated.View>

 



    </View>
  );
}
