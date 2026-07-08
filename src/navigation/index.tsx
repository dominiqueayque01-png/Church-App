import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  SafeAreaView,
  View,
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
const MINI_WIDTH = 52;

const Stack = createStackNavigator<RootStackParamList>();

export default function Navigation() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('EventSelect');

  return (
    <NavigationContainer
      onStateChange={state => {
        const currentRoute = state?.routes[state.index ?? 0]?.name;
        if (currentRoute) setActiveTab(currentRoute);
      }}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>

          {/* Sidebar — always visible as mini strip */}
          <Sidebar
            activeScreen={activeTab}
            isOpen={sidebarOpen}
            onCollapse={() => setSidebarOpen(false)}
            onExpand={() => setSidebarOpen(true)}
            onNavigate={(screen: string) => {
              setActiveTab(screen);
              setSidebarOpen(false);
            }}
          />

          {/* Overlay when sidebar open */}
          {sidebarOpen && (
            <View
              style={styles.overlay}
              onTouchStart={() => setSidebarOpen(false)}
            />
          )}

          {/* Main Content */}
          <View style={styles.main}>
            <View style={[styles.screen, activeTab !== 'EventSelect' && styles.hidden]}>
              <EventSelectScreen
                onNavigateToCheckIn={(eventId, eventName) => {
                  setActiveTab('CheckIn_' + eventId + '_' + eventName);
                }}
                onOpenSidebar={() => setSidebarOpen(true)}
              />
            </View>

            <View style={[styles.screen, activeTab !== 'NewMember' && styles.hidden]}>
              <NewMemberScreen />
            </View>

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
  overlay: {
    position: 'absolute',
    top: 0,
    left: MINI_WIDTH,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    zIndex: 98,
  },
});

