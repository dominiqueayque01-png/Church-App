import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Sidebar from './Sidebar';

type Props = {
  children: React.ReactNode;
  activeScreen?: string;
};

export default function AppShell({ children, activeScreen = 'EventSelect' }: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <View style={styles.container}>
      {/* Persistent Sidebar */}
      {sidebarOpen && (
        <Sidebar
          activeScreen={activeScreen}
          onCollapse={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content Area */}
      <View style={styles.main}>
        {/* Burger Button — only when sidebar is hidden */}
        {!sidebarOpen && (
          <TouchableOpacity
            style={styles.floatingBurger}
            onPress={() => setSidebarOpen(true)}>
            <View style={styles.toggleLine} />
            <View style={styles.toggleLine} />
            <View style={styles.toggleLine} />
          </TouchableOpacity>
        )}
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#f5f5f0',
  },
  main: {
    flex: 1,
    backgroundColor: '#f5f5f0',
  },
  floatingBurger: {
    position: 'absolute',
    top: 16,
    left: 16,
    zIndex: 99,
    gap: 5,
    padding: 8,
    backgroundColor: '#2c2c2c',
    borderRadius: 6,
  },
  toggleLine: {
    height: 2,
    width: 22,
    backgroundColor: '#b5973a',
    borderRadius: 2,
  },
});