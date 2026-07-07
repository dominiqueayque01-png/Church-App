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
};

export default function CheckInScreen({ eventId, eventName, onBack, onNavigateToNewMember }: Props) {

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#f5f5f0',
  },


  // ── MAIN ─────────────────────────────────────────────
  main: { flex: 1, backgroundColor: '#f5f5f0' },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0d9c8',
    backgroundColor: '#ffffff',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#b5973a',
  },
  headerDate: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },

  // ── PORTRAIT CONTENT ─────────────────────────────────
  portraitContent: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },

  // ── LANDSCAPE LAYOUT ─────────────────────────────────
  contentRow: {
    flex: 1,
    flexDirection: 'row',
  },
  leftPanel: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  rightPanel: {
    width: 170,
    backgroundColor: '#f0ebe0',
    paddingHorizontal: 12,
    paddingTop: 16,
    borderLeftWidth: 1,
    borderLeftColor: '#e0d9c8',
  },

  // ── SHARED ───────────────────────────────────────────
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#b5973a',
    marginBottom: 12,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0d9c8',
    paddingHorizontal: 10,
    height: 40,
  },
  searchIcon: { fontSize: 16, color: '#aaa', marginRight: 6 },
  searchInput: { flex: 1, fontSize: 13, color: '#333', height: 40 },
  addButton: {
    backgroundColor: '#2c2c2c',
    borderRadius: 8,
    paddingHorizontal: 16,
    height: 40,
    justifyContent: 'center',
  },
  addButtonText: { color: '#ffffff', fontWeight: '600', fontSize: 13 },
  filterRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 10,
    flexWrap: 'wrap',
  },
  filterTab: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#e8e4d8',
  },
  filterTabActive: { backgroundColor: '#b5973a' },
  filterText: { fontSize: 12, color: '#666', fontWeight: '600' },
  filterTextActive: { color: '#ffffff' },
  divider: {
    height: 1,
    backgroundColor: '#e0d9c8',
    marginBottom: 8,
  },
  memberList: { paddingBottom: 100 },
  emptyContainer: { alignItems: 'center', paddingTop: 40 },
  emptyText: { color: '#aaa', fontSize: 14 },

  // ── MEMBER ROW ───────────────────────────────────────
  memberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0ebe0',
    gap: 10,
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#d0c8b0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: { fontSize: 16, fontWeight: 'bold', color: '#7a6a2a' },
  memberInfo: { flex: 1 },
  memberName: { fontSize: 14, fontWeight: '600', color: '#333', marginBottom: 2 },
  memberMeta: { fontSize: 11, color: '#999' },
  checkInButton: {
    backgroundColor: '#2c2c2c',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 6,
  },
  checkedInButton: { backgroundColor: '#b5973a' },
  checkInText: { color: '#ffffff', fontSize: 11, fontWeight: '600' },

  // ── PRESENT PANEL ────────────────────────────────────
  presentHeader: { marginBottom: 8 },
  presentTitle: { fontSize: 14, fontWeight: '700', color: '#b5973a' },
  presentCount: { fontSize: 11, color: '#888', marginTop: 2 },
  presentDivider: { height: 1, backgroundColor: '#d0c8b0', marginBottom: 10 },
  presentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 7,
    borderBottomWidth: 1,
    borderBottomColor: '#e8e4d8',
  },
  presentName: { fontSize: 11, color: '#444', flex: 1, flexShrink: 1 },
  presentTime: { fontSize: 10, color: '#999', marginLeft: 4 },
  noPresentText: { fontSize: 11, color: '#aaa', textAlign: 'center', marginTop: 20 },

  // ── FLOATING BADGE ───────────────────────────────────
  floatingBadge: {
    position: 'absolute',
    bottom: 24,
    right: 20,
    backgroundColor: '#b5973a',
    borderRadius: 50,
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    flexDirection: 'column',
  },
  floatingBadgeCount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    lineHeight: 22,
  },
  floatingBadgeLabel: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.85)',
    lineHeight: 13,
  },
  floatingBadgeIcon: {
    fontSize: 14,
    marginTop: 2,
  },

  // ── MODAL ────────────────────────────────────────────
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  modalSheet: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 40,
    maxHeight: '70%',
  },
  modalHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#ddd',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 16,
  },
  modalClose: {
    position: 'absolute',
    top: 16,
    right: 20,
    padding: 8,
  },
  modalCloseText: {
    fontSize: 16,
    color: '#999',
    fontWeight: '600',
  },
});