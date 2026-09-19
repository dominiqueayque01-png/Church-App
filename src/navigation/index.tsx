import React, { useState, useCallback, useRef } from 'react';
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
import { syncAll } from '../services/sync';

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
  const [currentEvent, setCurrentEvent] = useState<{ id: string; name: string; date?: string }>({
    id: '33333333-3333-3333-3333-333333333302',
    name: 'Sunday Fellowship Gathering',
    date: undefined,
  });
  const currentEventRef = useRef(currentEvent);
  currentEventRef.current = currentEvent;

  const [visitedTabs, setVisitedTabs] = useState<Record<string, boolean>>({
    EventSelect: true,
  });

  // Run initial sync with Supabase Cloud
  React.useEffect(() => {
    syncAll().catch(err => console.log('Initial background sync notice:', err));
  }, []);

  const handleNavigate = useCallback((screen: string) => {
    setActiveTab(screen);
    setSidebarOpen(false);
    setVisitedTabs(prev => (prev[screen] ? prev : { ...prev, [screen]: true }));
  }, []);

  const handleCollapse = useCallback(() => {
    setSidebarOpen(false);
  }, []);

  const handleExpand = useCallback(() => {
    setSidebarOpen(true);
  }, []);

  const handleLogout = useCallback(() => {
    setCurrentUser(null);
  }, []);

  const handleNavigateToCheckIn = useCallback((eventId: string, eventName: string, eventDate?: string) => {
    const ev = { id: eventId, name: eventName, date: eventDate };
    setCurrentEvent(ev);
    currentEventRef.current = ev;
    setActiveTab('CheckIn_' + eventId + '_' + (eventDate || ''));
    setVisitedTabs(prev => (prev.CheckIn ? prev : { ...prev, CheckIn: true }));
  }, []);

  const handleBackToEventSelect = useCallback(() => {
    setActiveTab('EventSelect');
  }, []);

  const handleNavigateToNewMember = useCallback((eventId?: string, eventName?: string) => {
    if (eventId) {
      const ev = { id: eventId, name: eventName || 'Service Gathering' };
      setCurrentEvent(ev);
      currentEventRef.current = ev;
    }
    setActiveTab('NewMember');
    setVisitedTabs(prev => (prev.NewMember ? prev : { ...prev, NewMember: true }));
  }, []);

  const handleNewMemberNavigateToCheckIn = useCallback(() => {
    setActiveTab('CheckIn_' + currentEventRef.current.id + '_' + currentEventRef.current.name);
  }, []);

  const handleCheckInNavigateToNewMember = useCallback(() => {
    handleNavigateToNewMember(currentEventRef.current.id, currentEventRef.current.name);
  }, [handleNavigateToNewMember]);

  // Show login screen if not logged in
  if (!currentUser) {
    return (
      <SafeAreaView style={styles.safeAreaDark}>
        <StatusBar barStyle="light-content" backgroundColor={colors.sidebarBg} />
        <LoginScreen onLoginSuccess={user => {
          setCurrentUser(user);
          syncAll().catch(err => console.log('Post-login sync notice:', err));
        }} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={colors.sidebarBg} />
      <View style={styles.container}>

        {/* Sanctuary Sidebar */}
        <Sidebar
          activeScreen={activeTab.startsWith('CheckIn_') ? 'EventSelect' : activeTab}
          isOpen={sidebarOpen}
          onCollapse={handleCollapse}
          onExpand={handleExpand}
          onNavigate={handleNavigate}
          currentUser={currentUser}
          onLogout={handleLogout}
        />

        {/* Dim Backdrop Overlay */}
        {sidebarOpen && (
          <TouchableOpacity
            style={styles.overlay}
            activeOpacity={1}
            onPress={handleCollapse}
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
              onNavigateToCheckIn={handleNavigateToCheckIn}
            />
          </View>

          {/* Member Registration Screen */}
          {visitedTabs.NewMember && (
            <View
              style={[
                styles.screen,
                activeTab !== 'NewMember' && styles.hidden,
              ]}>
              <NewMemberScreen
                activeEventId={currentEvent.id}
                activeEventName={currentEvent.name}
                onNavigateToCheckIn={handleNewMemberNavigateToCheckIn}
              />
            </View>
          )}

          {/* Shift Overview Dashboard Screen */}
          {visitedTabs.Dashboard && (
            <View
              style={[
                styles.screen,
                activeTab !== 'Dashboard' && styles.hidden,
              ]}>
              <DashboardScreen
                onNavigate={handleNavigate}
              />
            </View>
          )}

          {/* Check-In Terminal Screen */}
          {visitedTabs.CheckIn && (
            <View
              style={[
                styles.screen,
                !activeTab.startsWith('CheckIn_') && styles.hidden,
              ]}>
              <CheckInScreen
                eventId={currentEvent.id}
                eventName={currentEvent.name}
                eventDate={currentEvent.date}
                onBack={handleBackToEventSelect}
                onNavigateToNewMember={handleCheckInNavigateToNewMember}
              />
            </View>
          )}
        </View>

      </View>
    </SafeAreaView>
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