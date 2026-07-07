import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const SIDEBAR_ITEMS = [
  { icon: '⌕', label: 'Service Check-in', screen: 'EventSelect' },
  { icon: '⊕', label: 'Member Registration', screen: 'NewMember' },
];

type Props = {
  activeScreen: string;
  onCollapse: () => void;
  onNavigate: (screen: string) => void;
};

export default function Sidebar({ activeScreen, onCollapse, onNavigate }: Props) {
  return (
    <View style={styles.sidebar}>
      <View style={styles.sidebarHeader}>
        <TouchableOpacity style={styles.burgerButton} onPress={onCollapse}>
          <View style={styles.toggleLine} />
          <View style={styles.toggleLine} />
          <View style={styles.toggleLine} />
        </TouchableOpacity>
        <Text style={styles.churchName}>Church's Name</Text>
        <Text style={styles.churchSubtitle}>Members Profiling System</Text>
      </View>

      <View style={styles.sidebarNav}>
        {SIDEBAR_ITEMS.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.sidebarItem,
              activeScreen === item.screen && styles.sidebarItemActive,
            ]}
            onPress={() => onNavigate(item.screen)}>
            <Text style={styles.sidebarIcon}>{item.icon}</Text>
            <Text style={styles.sidebarLabel}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sidebar: {
    width: 190,
    backgroundColor: '#2c2c2c',
    paddingTop: 16,
  },
  sidebarHeader: {
    paddingHorizontal: 16,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  burgerButton: {
    marginBottom: 12,
    gap: 5,
    padding: 4,
    alignSelf: 'flex-start',
  },
  toggleLine: {
    height: 2,
    width: 22,
    backgroundColor: '#b5973a',
    borderRadius: 2,
  },
  churchName: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  churchSubtitle: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.5)',
  },
  sidebarNav: { paddingTop: 16 },
  sidebarItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 10,
    borderLeftWidth: 3,
    borderLeftColor: 'transparent',
  },
  sidebarItemActive: {
    backgroundColor: 'rgba(181,151,58,0.15)',
    borderLeftColor: '#b5973a',
  },
  sidebarIcon: { fontSize: 18, color: '#b5973a' },
  sidebarLabel: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.8)',
    fontWeight: '500',
    flexShrink: 1,
  },
});