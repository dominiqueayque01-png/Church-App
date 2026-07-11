import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  SafeAreaView,
  Alert,
  ActivityIndicator,
  useWindowDimensions,
  Modal,
  Animated,
} from 'react-native';
import { styles } from './index.styles';



const MOCK_MEMBERS = [
  { id: '1', firstName: 'John Apolinario', lastName: 'Juaquin', group: 'Ministry', type: 'Adult', status: 'Active' },
  { id: '2', firstName: 'BBM', lastName: 'Bayot', group: 'Member', type: 'Adult', status: 'Inactive' },
  { id: '3', firstName: 'Sarah "Fiona"', lastName: 'Dutiti', group: 'Member', type: 'Adult', status: 'Active' },
  { id: '4', firstName: 'Shrek', lastName: 'Taumbayan', group: 'Member', type: 'Adult', status: 'Active' },
  { id: '5', firstName: 'Blaster', lastName: 'Silog', group: 'Visitor', type: 'Youth', status: 'Active' },
  { id: '6', firstName: 'Unique', lastName: 'Salon', group: 'Ministry', type: 'Adult', status: 'Active' },
  { id: '7', firstName: 'Badjao', lastName: 'Walangbike', group: 'Member', type: 'Adult', status: 'Active' },
  { id: '8', firstName: 'Aypon', lastName: 'Ikisisks', group: 'Member', type: 'Adult', status: 'Active' },
];


const FILTERS = ['All', 'Youth', 'Ministry', 'Adults'];

function getFormattedDate() {
  return new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
  });
}

type Props = {
  eventId: string;
  eventName: string;
  onBack: () => void;
  onNavigateToNewMember: () => void;
  onOpenSidebar?: () => void;
};

export default function CheckInScreen({ eventId, eventName, onBack, onNavigateToNewMember, onOpenSidebar }: Props) {

  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  const [search, setSearch] = useState('');
  const [checkedIn, setCheckedIn] = useState<{ id: string; time: string }[]>([]);
  const [loading] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
  const [presentModalVisible, setPresentModalVisible] = useState(false);

  const filtered = MOCK_MEMBERS.filter(m => {
    const full = `${m.firstName} ${m.lastName}`.toLowerCase();
    const matchSearch = full.includes(search.toLowerCase());
    const matchFilter =
      activeFilter === 'All' ||
      (activeFilter === 'Youth' && m.type === 'Youth') ||
      (activeFilter === 'Ministry' && m.group === 'Ministry') ||
      (activeFilter === 'Adults' && m.type === 'Adult');
    return matchSearch && matchFilter;
  });

  const handleCheckIn = (member: typeof MOCK_MEMBERS[0]) => {
    if (checkedIn.find(c => c.id === member.id)) {
      Alert.alert('Already Checked In', `${member.firstName} ${member.lastName} is already checked in.`);
      return;
    }
    const time = new Date().toLocaleTimeString('en-US', {
      hour: '2-digit', minute: '2-digit', hour12: false,
    });
    setCheckedIn(prev => [...prev, { id: member.id, time }]);
  };

  const presentMembers = checkedIn.map(c => ({
    ...MOCK_MEMBERS.find(m => m.id === c.id)!,
    time: c.time,
  }));

  // ── Member List (shared between portrait and landscape) ──
  const renderMemberList = () => (
    <>
      {/* Search + Add */}
      <View style={styles.searchRow}>
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>⌕</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search members by name, email, phone...."
            placeholderTextColor="#aaa"
            value={search}
            onChangeText={setSearch}
            autoCorrect={false}
          />
        </View>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => onNavigateToNewMember()}>
          <Text style={styles.addButtonText}>+ Add</Text>
        </TouchableOpacity>
      </View>

      {/* Filter Tabs */}
      <View style={styles.filterRow}>
        {FILTERS.map(filter => (
          <TouchableOpacity
            key={filter}
            style={[styles.filterTab, activeFilter === filter && styles.filterTabActive]}
            onPress={() => setActiveFilter(filter)}>
            <Text style={[styles.filterText, activeFilter === filter && styles.filterTextActive]}>
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.divider} />

      {/* List */}
      {loading ? (
        <ActivityIndicator size="large" color="#b5973a" style={{ marginTop: 40 }} />
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.memberList}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No members found</Text>
            </View>
          }
          renderItem={({ item }) => {
            const isCheckedIn = !!checkedIn.find(c => c.id === item.id);
            return (
              <View style={styles.memberRow}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>{item.firstName[0]}</Text>
                </View>
                <View style={styles.memberInfo}>
                  <Text style={styles.memberName}>{item.firstName} {item.lastName}</Text>
                  <Text style={styles.memberMeta}>{item.group} | {item.type} | {item.status}</Text>
                </View>
                <TouchableOpacity
                  style={[styles.checkInButton, isCheckedIn && styles.checkedInButton]}
                  onPress={() => handleCheckIn(item)}>
                  <Text style={styles.checkInText}>
                    {isCheckedIn ? '✓ Present' : 'Check In'}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          }}
        />
      )}
    </>
  );

  // ── Present Panel (shared between portrait modal and landscape panel) ──
  const renderPresentPanel = () => (
    <>
      <View style={styles.presentHeader}>
        <Text style={styles.presentTitle}>Present</Text>
        <Text style={styles.presentCount}>{checkedIn.length}/{MOCK_MEMBERS.length} members</Text>
      </View>
      <View style={styles.presentDivider} />
      <FlatList
        data={presentMembers}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={styles.noPresentText}>No one checked in yet</Text>
        }
        renderItem={({ item }) => (
          <View style={styles.presentRow}>
            <Text style={styles.presentName} numberOfLines={1}>
              {item.firstName} {item.lastName}
            </Text>
            <Text style={styles.presentTime}>{item.time}</Text>
          </View>
        )}
      />
    </>
  );

  return (
    <SafeAreaView style={styles.container}>
  
      {/* ── Main ── */}
      <View style={styles.main}>

        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
              
            <View>
              <Text style={styles.headerTitle}>{eventName}</Text>
              <Text style={styles.headerDate}>{getFormattedDate()}</Text>
            </View>
          </View>
        </View>

        {/* Content */}
        {isLandscape ? (
          // ── LANDSCAPE: side by side ──
          <View style={styles.contentRow}>
            <View style={styles.leftPanel}>
              <Text style={styles.sectionTitle}>Member's Attendance</Text>
              {renderMemberList()}
            </View>
            <View style={styles.rightPanel}>
              {renderPresentPanel()}
            </View>
          </View>
        ) : (
          // ── PORTRAIT: full width list + floating badge ──
          <View style={styles.portraitContent}>
            <Text style={styles.sectionTitle}>Member's Attendance</Text>
            {renderMemberList()}
          </View>
        )}

        {/* ── Floating Badge (portrait only) ── */}
        {!isLandscape && (
          <TouchableOpacity
            style={styles.floatingBadge}
            onPress={() => setPresentModalVisible(true)}
            activeOpacity={0.85}>
            <Text style={styles.floatingBadgeCount}>{checkedIn.length}</Text>
            <Text style={styles.floatingBadgeLabel}>/{MOCK_MEMBERS.length}</Text>
            <Text style={styles.floatingBadgeIcon}>👥</Text>
          </TouchableOpacity>
        )}

        {/* ── Present Modal (portrait only) ── */}
        <Modal
          visible={presentModalVisible}
          transparent
          animationType="slide"
          onRequestClose={() => setPresentModalVisible(false)}>
          <TouchableOpacity
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={() => setPresentModalVisible(false)}>
            <TouchableOpacity
              activeOpacity={1}
              style={styles.modalSheet}>
              {/* Handle Bar */}
              <View style={styles.modalHandle} />

              {/* Close Button */}
              <TouchableOpacity
                style={styles.modalClose}
                onPress={() => setPresentModalVisible(false)}>
                <Text style={styles.modalCloseText}>✕</Text>
              </TouchableOpacity>

              {renderPresentPanel()}
            </TouchableOpacity>
          </TouchableOpacity>
        </Modal>

      </View>
    </SafeAreaView>
  );
}

