import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  SafeAreaView,
  View,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';

import EventSelectScreen from '../screens/EventSelect';
import CheckInScreen from '../screens/CheckIn';
import NewMemberScreen from '../screens/NewMember';
import DashboardScreen from '../screens/Dashboard';
import LoginScreen from '../screens/Login';
import Sidebar from '../components/common/Sidebar';
import { colors } from '../assets/style/theme';

export type RootStackParamList = {
  EventSelect: undefined;
  CheckIn: { eventId: string; eventName: string };
  NewMember: { eventId?: string };
  Dashboard: undefined;
};

type LoggedInUser = {
  id: string;
  name: string;
  role: string;
  username: string;
};

export default function Navigation() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('EventSelect');
  const [currentUser, setCurrentUser] = useState<LoggedInUser | null>(null);

  // Show login screen if not logged in
  if (!currentUser) {
    return (
      <SafeAreaView style={styles.safeAreaDark}>
        <StatusBar barStyle="light-content" backgroundColor={colors.sidebarBg} />
        <LoginScreen onLoginSuccess={user => setCurrentUser(user)} />
      </SafeAreaView>
    );
  }

  return (
    <NavigationContainer>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="light-content" backgroundColor={colors.sidebarBg} />
        <View style={styles.container}>

          {/* Sanctuary Sidebar */}
          <Sidebar
            activeScreen={activeTab.startsWith('CheckIn_') ? 'EventSelect' : activeTab}
            isOpen={sidebarOpen}
            onCollapse={() => setSidebarOpen(false)}
            onExpand={() => setSidebarOpen(true)}
            onNavigate={(screen: string) => {
              setActiveTab(screen);
              setSidebarOpen(false);
            }}
            currentUser={currentUser}
            onLogout={() => setCurrentUser(null)}
          />

          {/* Dim Backdrop Overlay */}
          {sidebarOpen && (
            <TouchableOpacity
              style={styles.overlay}
              activeOpacity={1}
              onPress={() => setSidebarOpen(false)}
            />
          )}

          {/* Main Content Viewport */}
          <View style={styles.main}>
            {/* Event Select Screen */}
            <View
              style={[
                styles.screen,
                activeTab !== 'EventSelect' && styles.hidden,
              ]}>
              <EventSelectScreen
                onNavigateToCheckIn={(eventId, eventName) =>
                  setActiveTab('CheckIn_' + eventId + '_' + eventName)
                }
              />
            </View>

            {/* Member Registration Screen */}
            <View
              style={[
                styles.screen,
                activeTab !== 'NewMember' && styles.hidden,
              ]}>
              <NewMemberScreen />
            </View>

            {/* Shift Overview Dashboard Screen */}
            <View
              style={[
                styles.screen,
                activeTab !== 'Dashboard' && styles.hidden,
              ]}>
              <DashboardScreen
                onNavigate={(screen) => setActiveTab(screen)}
              />
            </View>

            {/* Check-In Terminal Screen */}
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
  safeAreaDark: {
    flex: 1,
    backgroundColor: colors.sidebarBg,
  },
  safeArea: {
    flex: 1,
    backgroundColor: colors.sidebarBg,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: colors.bg,
  },
  main: {
    flex: 1,
    backgroundColor: colors.bg,
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
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.overlay,
    zIndex: 98,
  },
});