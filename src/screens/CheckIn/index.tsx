import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  ActivityIndicator,
  useWindowDimensions,
  Modal,
} from 'react-native';
import {
  Search,
  UserPlus,
  ArrowLeft,
  CheckCircle2,
  Check,
  RotateCcw,
  Users,
  X,
  Clock,
  ShieldAlert,
} from '../../components/common/Icons';

import { styles } from './index.styles';
import { colors, getAvatarGradient } from '../../assets/style/theme';

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
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

type Props = {
  eventId: string;
  eventName: string;
  onBack: () => void;
  onNavigateToNewMember: () => void;
};

export default function CheckInScreen({
  eventId,
  eventName,
  onBack,
  onNavigateToNewMember,
}: Props) {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  const [search, setSearch] = useState('');
  const [checkedIn, setCheckedIn] = useState<{ id: string; time: string }[]>([]);
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
    const existing = checkedIn.find(c => c.id === member.id);
    if (existing) {
      // Allow un-checking if tapped again
      Alert.alert(
        'Already Checked In',
        `${member.firstName} ${member.lastName} was checked in at ${existing.time}. Would you like to undo this check-in?`,
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Undo Check-In',
            style: 'destructive',
            onPress: () => {
              setCheckedIn(prev => prev.filter(c => c.id !== member.id));
            },
          },
        ],
      );
      return;
    }
    const time = new Date().toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
    setCheckedIn(prev => [...prev, { id: member.id, time }]);
  };

  const handleUndoFromList = (memberId: string) => {
    setCheckedIn(prev => prev.filter(c => c.id !== memberId));
  };

  const presentMembers = checkedIn.map(c => ({
    ...MOCK_MEMBERS.find(m => m.id === c.id)!,
    time: c.time,
  }));

  // ── Member Directory List ──
  const renderMemberList = () => (
    <>
      {/* Search & Action Row */}
      <View style={styles.searchRow}>
        <View style={styles.searchContainer}>
          <Search size={16} color={colors.textMuted} strokeWidth={2} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search members by name..."
            placeholderTextColor={colors.textMuted}
            value={search}
            onChangeText={setSearch}
            autoCorrect={false}
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch('')} activeOpacity={0.7}>
              <X size={16} color={colors.textMuted} strokeWidth={2} />
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity
          style={styles.addButton}
          onPress={onNavigateToNewMember}
          activeOpacity={0.8}>
          <UserPlus size={15} color="#ffffff" strokeWidth={2.2} />
          <Text style={styles.addButtonText}>New Member</Text>
        </TouchableOpacity>
      </View>

      {/* Filter Tabs */}
      <View style={styles.filterRow}>
        {FILTERS.map(filter => {
          const isActive = activeFilter === filter;
          const count = MOCK_MEMBERS.filter(m => {
            if (filter === 'All') return true;
            if (filter === 'Youth') return m.type === 'Youth';
            if (filter === 'Ministry') return m.group === 'Ministry';
            if (filter === 'Adults') return m.type === 'Adult';
            return true;
          }).length;

          return (
            <TouchableOpacity
              key={filter}
              style={[styles.filterTab, isActive && styles.filterTabActive]}
              onPress={() => setActiveFilter(filter)}
              activeOpacity={0.75}>
              <Text
                style={[styles.filterText, isActive && styles.filterTextActive]}>
                {filter}
              </Text>
              <View
                style={[
                  styles.filterCountBadge,
                  isActive && styles.filterCountBadgeActive,
                ]}>
                <Text
                  style={[
                    styles.filterCountText,
                    isActive && styles.filterCountTextActive,
                  ]}>
                  {count}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={styles.divider} />

      {/* Member Items FlatList */}
      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.memberList}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <ShieldAlert size={28} color={colors.textMuted} strokeWidth={1.8} />
            <Text style={styles.emptyText}>No members match your filter</Text>
          </View>
        }
        renderItem={({ item }) => {
          const isCheckedIn = !!checkedIn.find(c => c.id === item.id);
          const avatarStyle = getAvatarGradient(item.firstName);

          return (
            <View style={[styles.memberRow, isCheckedIn && styles.memberRowChecked]}>
              {/* Deterministic Gradient Avatar */}
              <View style={[styles.avatar, { backgroundColor: avatarStyle.bg }]}>
                <Text style={[styles.avatarText, { color: avatarStyle.text }]}>
                  {item.firstName[0]}
                </Text>
              </View>

              {/* Member Details */}
              <View style={styles.memberInfo}>
                <Text style={styles.memberName} numberOfLines={1}>
                  {item.firstName} {item.lastName}
                </Text>
                <View style={styles.metaBadgeRow}>
                  <View style={styles.tagBadge}>
                    <Text style={styles.tagBadgeText}>{item.group}</Text>
                  </View>
                  <View style={styles.tagBadge}>
                    <Text style={styles.tagBadgeText}>{item.type}</Text>
                  </View>
                  <View
                    style={[
                      styles.statusBadge,
                      item.status === 'Active'
                        ? styles.statusBadgeActive
                        : styles.statusBadgeInactive,
                    ]}>
                    <Text
                      style={[
                        styles.statusBadgeText,
                        item.status === 'Active'
                          ? styles.statusTextActive
                          : styles.statusTextInactive,
                      ]}>
                      {item.status}
                    </Text>
                  </View>
                </View>
              </View>

              {/* Check-In Action Button */}
              <TouchableOpacity
                style={[
                  styles.checkInButton,
                  isCheckedIn && styles.checkedInButton,
                ]}
                onPress={() => handleCheckIn(item)}
                activeOpacity={0.8}>
                {isCheckedIn ? (
                  <>
                    <Check size={14} color="#ffffff" strokeWidth={2.4} />
                    <Text style={styles.checkInTextChecked}>Present</Text>
                  </>
                ) : (
                  <>
                    <CheckCircle2 size={14} color="#ffffff" strokeWidth={2} />
                    <Text style={styles.checkInText}>Check In</Text>
                  </>
                )}
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </>
  );

  // ── Present Attendees Panel ──
  const renderPresentPanel = () => (
    <View style={styles.presentPanelWrapper}>
      <View style={styles.presentHeader}>
        <View>
          <Text style={styles.presentTitle}>Session Attendees</Text>
          <Text style={styles.presentCount}>
            {checkedIn.length} of {MOCK_MEMBERS.length} Present
          </Text>
        </View>
        <View style={styles.presentRatioBadge}>
          <Text style={styles.presentRatioText}>
            {Math.round((checkedIn.length / (MOCK_MEMBERS.length || 1)) * 100)}%
          </Text>
        </View>
      </View>

      <View style={styles.presentDivider} />

      <FlatList
        data={presentMembers}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.presentList}
        ListEmptyComponent={
          <View style={styles.noPresentBox}>
            <Clock size={20} color={colors.textMuted} strokeWidth={1.8} />
            <Text style={styles.noPresentText}>No members checked in yet</Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.presentRow}>
            <View style={styles.presentNameWrap}>
              <Text style={styles.presentName} numberOfLines={1}>
                {item.firstName} {item.lastName}
              </Text>
              <Text style={styles.presentTime}>{item.time}</Text>
            </View>
            <TouchableOpacity
              onPress={() => handleUndoFromList(item.id)}
              style={styles.undoBtn}
              activeOpacity={0.7}>
              <RotateCcw size={12} color={colors.textMuted} strokeWidth={2} />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      {/* ── Sanctuary Top Bar ── */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={onBack}
          activeOpacity={0.75}>
          <ArrowLeft size={18} color={colors.textPrimary} strokeWidth={2.2} />
          <Text style={styles.backButtonText}>Services</Text>
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle} numberOfLines={1}>
            {eventName}
          </Text>
          <Text style={styles.headerDate}>{getFormattedDate()}</Text>
        </View>

        <View style={styles.headerRightChip}>
          <View style={styles.syncPulse} />
          <Text style={styles.syncText}>Live Terminal</Text>
        </View>
      </View>

      {/* ── Dual-Pane Landscape vs Portrait Content ── */}
      {isLandscape ? (
        <View style={styles.contentRow}>
          <View style={styles.leftPanel}>
            {renderMemberList()}
          </View>
          <View style={styles.rightPanel}>
            {renderPresentPanel()}
          </View>
        </View>
      ) : (
        <View style={styles.portraitContent}>
          {renderMemberList()}

          {/* Floating Attendance Badge (Portrait) */}
          <TouchableOpacity
            style={styles.floatingBadge}
            onPress={() => setPresentModalVisible(true)}
            activeOpacity={0.85}>
            <Users size={18} color="#ffffff" strokeWidth={2.2} />
            <Text style={styles.floatingBadgeCount}>
              {checkedIn.length} / {MOCK_MEMBERS.length}
            </Text>
          </TouchableOpacity>

          {/* Present Modal Sheet (Portrait) */}
          <Modal
            visible={presentModalVisible}
            transparent
            animationType="slide"
            onRequestClose={() => setPresentModalVisible(false)}>
            <TouchableOpacity
              style={styles.modalOverlay}
              activeOpacity={1}
              onPress={() => setPresentModalVisible(false)}>
              <TouchableOpacity activeOpacity={1} style={styles.modalSheet}>
                <View style={styles.modalHandle} />
                <TouchableOpacity
                  style={styles.modalClose}
                  onPress={() => setPresentModalVisible(false)}>
                  <X size={18} color={colors.textSecondary} strokeWidth={2} />
                </TouchableOpacity>
                {renderPresentPanel()}
              </TouchableOpacity>
            </TouchableOpacity>
          </Modal>
        </View>
      )}
    </View>
  );
}
