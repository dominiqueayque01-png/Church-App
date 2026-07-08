import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';

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
};

const FULL_WIDTH = 260;
const MINI_WIDTH = 52;
const PANEL_WIDTH = FULL_WIDTH - MINI_WIDTH;

export default function Sidebar({
  activeScreen,
  onCollapse,
  onExpand,
  isOpen,
  onNavigate,
}: Props) {
  // Start HIDDEN (tucked off-screen behind the mini strip), not at 0.
  const slideAnim = useRef(new Animated.Value(-PANEL_WIDTH)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

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
      ]).start();
    }
  }, [isOpen]);

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

        {/* Online status */}
        <View style={styles.bottomStatus}>
          <View style={styles.onlineDot} />
          <Text style={styles.onlineText}>Tablet client Online</Text>
        </View>

      </Animated.View>

    </View>
  );
}

const styles = StyleSheet.create({
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
    position: 'absolute',
    bottom: 24,
    left: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
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
});