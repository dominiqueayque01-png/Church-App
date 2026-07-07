import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  SafeAreaView,
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import EventSelectScreen from '../screens/EventSelect';
import CheckInScreen from '../screens/CheckIn';
import NewMemberScreen from '../screens/NewMember';
import DashboardScreen from '../screens/Dashboard';
import Sidebar from '../components/common/Sidebar';

export type RootStackParamList = {
  EventSelect: undefined;
  CheckIn: { eventId: string; eventName: string };
  NewMember: { eventId?: string };
  Dashboard: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

// Screens that are sidebar-navigable — pre-mounted, just hidden/shown
const SIDEBAR_SCREENS = ['EventSelect', 'NewMember'];

export default function Navigation() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('EventSelect');

  return (
    <NavigationContainer>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>

          {/* Persistent Sidebar */}
          {sidebarOpen && (
            <Sidebar
              activeScreen={activeTab}
              onCollapse={() => setSidebarOpen(false)}
              onNavigate={(screen: string) => setActiveTab(screen)}
            />
          )}

          {/* Main Content */}
          <View style={styles.main}>

            {/* Top bar burger when sidebar closed */}
            {!sidebarOpen && (
              <View style={styles.topBar}>
                <TouchableOpacity
                  style={styles.burgerButton}
                  onPress={() => setSidebarOpen(true)}>
                  <View style={styles.toggleLine} />
                  <View style={styles.toggleLine} />
                  <View style={styles.toggleLine} />
                </TouchableOpacity>
              </View>
            )}

            {/* Pre-mounted screens — shown/hidden instantly */}
            <View style={[styles.screen, activeTab !== 'EventSelect' && styles.hidden]}>
              <EventSelectScreen onNavigateToCheckIn={(eventId, eventName) => {
                setActiveTab('CheckIn_' + eventId + '_' + eventName);
              }} />
            </View>

            <View style={[styles.screen, activeTab !== 'NewMember' && styles.hidden]}>
              <NewMemberScreen />
            </View>

            {/* CheckIn uses Stack since it needs params */}
            {activeTab.startsWith('CheckIn_') && (
              <View style={styles.screen}>
                <CheckInScreen
                  eventId={activeTab.split('_')[1]}
                  eventName={activeTab.split('_').slice(2).join('_')}
                  onBack={() => setActiveTab('EventSelect')}
                  onNavigateToNewMember={() => setActiveTab('NewMember')}
                />
              </View>
            )}

          </View>
        </View>
      </SafeAreaView>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#2c2c2c',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#f5f5f0',
  },
  main: {
    flex: 1,
    backgroundColor: '#f5f5f0',
  },
  screen: {
    flex: 1,
  },
  hidden: {
    display: 'none',
  },
  topBar: {
    height: 48,
    backgroundColor: '#2c2c2c',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  burgerButton: {
    gap: 5,
    padding: 6,
    alignSelf: 'flex-start',
  },
  toggleLine: {
    height: 2,
    width: 22,
    backgroundColor: '#b5973a',
    borderRadius: 2,
  },
});