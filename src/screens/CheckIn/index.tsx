import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  useWindowDimensions,
  Modal,
  InteractionManager,
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
  History,
} from '../../components/common/Icons';

import { styles } from './index.styles';
import { colors, getAvatarGradient } from '../../assets/style/theme';
import {
  getAllMembers,
  logAttendance,
  getAttendanceForEvent,
  pullAttendanceFromSupabase,
  deleteAttendance,
} from '../../services/sync';
import { formatDisplayDate, toMidnight } from '../../services/dateUtils';

type MemberItem = {
  id: string;
  firstName: string;
  lastName: string;
  role: 'Ministry Member' | 'Youth Member' | 'Visitor';
  ministryDept: string;
  status: string;
};

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
  eventDate?: string;
  onBack: () => void;
  onNavigateToNewMember: () => void;
};

function CheckInScreen({
  eventId,
  eventName,
  eventDate,
  onBack,
  onNavigateToNewMember,
}: Props) {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  const isHistorical = useMemo(() => {
    if (!eventDate) return false;
    const todayMidnight = toMidnight(new Date()).getTime();
    const sessionMidnight = toMidnight(new Date(eventDate)).getTime();
    return sessionMidnight < todayMidnight;
  }, [eventDate]);

  const displayDate = useMemo(() => {
    if (eventDate) {
      return formatDisplayDate(new Date(eventDate));
    }
    return getFormattedDate();
  }, [eventDate]);

  const isSaturday =
    eventId === '33333333-3333-3333-3333-333333333301' ||
    eventName.toLowerCase().includes('saturday') ||
    eventName.toLowerCase().includes('ministry');

  const filters = useMemo(() => {
    if (isSaturday) {
      return ['All Ministry', 'Ushers', 'Worship Team', 'Media Team', 'Children Ministry', 'Visitors'];
    }
    return ['All Attendees', 'Youth Members', 'Ministry Facilitators', 'Visitors'];
  }, [isSaturday]);

  const [search, setSearch] = useState('');
  const [checkedIn, setCheckedIn] = useState<{ id: string; time: string }[]>([]);
  const [activeFilter, setActiveFilter] = useState(isSaturday ? 'All Ministry' : 'All Attendees');
  const [presentModalVisible, setPresentModalVisible] = useState(false);
  const [membersList, setMembersList] = useState<MemberItem[]>([]);

  useEffect(() => {
    setActiveFilter(isSaturday ? 'All Ministry' : 'All Attendees');
  }, [isSaturday, eventId]);

  const loadData = useCallback(() => {
    const task = InteractionManager.runAfterInteractions(async () => {
      try {
        // 1. Load members from local WatermelonDB SQLite
        const dbMembers = await getAllMembers();
        if (dbMembers && dbMembers.length > 0) {
          const mapped: MemberItem[] = dbMembers.map((m: any) => {
            const isVisitor = m.status === 'visitor' || m.ministry === 'Visitor';
            const isYouth = !isVisitor && (m.ministry === 'Youth Ministry' || m.ministry === 'Youth');
            const role: 'Ministry Member' | 'Youth Member' | 'Visitor' = isVisitor
              ? 'Visitor'
              : isYouth
              ? 'Youth Member'
              : 'Ministry Member';

            const ministryDept = isVisitor
              ? 'Visitor'
              : isYouth
              ? 'Youth Ministry'
              : (m.ministry && m.ministry !== 'Unassigned' ? m.ministry : 'General Ministry');

            return {
              id: m.id,
              firstName: m.firstName,
              lastName: m.lastName,
              role,
              ministryDept,
              status: isVisitor ? 'Visitor' : 'Active',
            };
          });
          setMembersList(mapped);
        } else {
          setMembersList([]);
        }

        // 2. Load attendance records for this event from local SQLite (scoped to date if provided)
        const localLogs = await getAttendanceForEvent(eventId, eventDate);
        const localMap = new Map<string, { id: string; time: string }>();

        localLogs.forEach(l => {
          localMap.set(l.memberId, {
            id: l.memberId,
            time: new Date(l.checkedInAt).toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit',
              hour12: true,
            }),
          });
        });

        setCheckedIn(Array.from(localMap.values()));

        // 3. Pull cloud attendance in background (scoped to date if provided)
        pullAttendanceFromSupabase(eventId, eventDate).then(cloudLogs => {
          if (cloudLogs && cloudLogs.length > 0) {
            setCheckedIn(prev => {
              const merged = new Map<string, { id: string; time: string }>(
                prev.map(item => [item.id, item]),
              );
              cloudLogs.forEach(cl => {
                if (!merged.has(cl.memberId)) {
                  merged.set(cl.memberId, {
                    id: cl.memberId,
                    time: new Date(cl.checkedInAt).toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: true,
                    }),
                  });
                }
              });
              return Array.from(merged.values());
            });
          }
        });
      } catch (err) {
        console.log('Error loading data in CheckInScreen:', err);
      }
    });

    return () => task.cancel();
  }, [eventId, eventDate]);

  useEffect(() => {
    const cancel = loadData();
    return cancel;
  }, [loadData]);

  // Available members for the specific service:
  // Saturday Gathering is strictly for Ministry Members and Saturday Visitors.
  // Sunday Gathering includes Youth Members, Ministry Facilitators, and Visitors.
  const availableMembers = useMemo(() => {
    if (isSaturday) {
      return membersList.filter(m => m.role === 'Ministry Member' || m.role === 'Visitor');
    }
    return membersList;
  }, [membersList, isSaturday]);

  const filtered = useMemo(() => {
    return availableMembers.filter(m => {
      const full = `${m.firstName} ${m.lastName}`.toLowerCase();
      const matchSearch = full.includes(search.toLowerCase());

      let matchFilter = true;
      if (isSaturday) {
        if (activeFilter === 'All Ministry') {
          matchFilter = true;
        } else if (activeFilter === 'Visitors') {
          matchFilter = m.role === 'Visitor';
        } else {
          matchFilter = m.ministryDept === activeFilter;
        }
      } else {
        if (activeFilter === 'All Attendees') {
          matchFilter = true;
        } else if (activeFilter === 'Youth Members') {
          matchFilter = m.role === 'Youth Member';
        } else if (activeFilter === 'Ministry Facilitators') {
          matchFilter = m.role === 'Ministry Member';
        } else if (activeFilter === 'Visitors') {
          matchFilter = m.role === 'Visitor';
        }
      }

      return matchSearch && matchFilter;
    });
  }, [availableMembers, search, activeFilter, isSaturday]);

  const handleCheckIn = (member: MemberItem) => {
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
              deleteAttendance(member.id, eventId);
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
    logAttendance(member.id, eventId, member.role === 'Visitor', eventDate);
  };

  const handleUndoFromList = (memberId: string) => {
    setCheckedIn(prev => prev.filter(c => c.id !== memberId));
    deleteAttendance(memberId, eventId);
  };

  const presentMembers = checkedIn.map(c => {
    const found = availableMembers.find(m => m.id === c.id) || membersList.find(m => m.id === c.id);
    return {
      ...(found || {
        id: c.id,
        firstName: 'Attendee',
        lastName: '',
        role: 'Visitor' as const,
        ministryDept: 'Visitor',
        status: 'Visitor',
      }),
      time: c.time,
    };
  });

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
        {filters.map(filter => {
          const isActive = activeFilter === filter;
          const count = availableMembers.filter(m => {
            if (isSaturday) {
              if (filter === 'All Ministry') return true;
              if (filter === 'Visitors') return m.role === 'Visitor';
              return m.ministryDept === filter;
            } else {
              if (filter === 'All Attendees') return true;
              if (filter === 'Youth Members') return m.role === 'Youth Member';
              if (filter === 'Ministry Facilitators') return m.role === 'Ministry Member';
              if (filter === 'Visitors') return m.role === 'Visitor';
              return true;
            }
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
            <Text style={styles.emptyText}>
              {availableMembers.length === 0
                ? (isSaturday
                    ? 'No ministry members registered yet.\nRegister ministry members to track Saturday service.'
                    : 'No members registered yet.\nTap "+ New Member" to add your first attendee.')
                : 'No members match your filter'}
            </Text>
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
                  {item.role === 'Ministry Member' ? (
                    <View style={styles.roleBadgeGold}>
                      <Text style={styles.roleBadgeGoldText}>
                        {isSaturday ? `Ministry • ${item.ministryDept}` : `Facilitator • ${item.ministryDept}`}
                      </Text>
                    </View>
                  ) : item.role === 'Youth Member' ? (
                    <View style={styles.roleBadgeBlue}>
                      <Text style={styles.roleBadgeBlueText}>Youth Member</Text>
                    </View>
                  ) : (
                    <View style={styles.roleBadgeGreen}>
                      <Text style={styles.roleBadgeGreenText}>Visitor</Text>
                    </View>
                  )}
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
            {checkedIn.length} of {availableMembers.length} Present
          </Text>
        </View>
        <View style={styles.presentRatioBadge}>
          <Text style={styles.presentRatioText}>
            {availableMembers.length > 0 ? Math.round((checkedIn.length / availableMembers.length) * 100) : 0}%
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
              <Text style={styles.presentTime}>
                {item.time} • {item.role === 'Ministry Member' ? (isSaturday ? item.ministryDept : `Facilitator (${item.ministryDept})`) : item.role}
              </Text>
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
          <Text style={styles.headerDate}>{displayDate}</Text>
        </View>

        {isHistorical ? (
          <View style={styles.headerRightChipArchived}>
            <History size={13} color="#b45309" strokeWidth={2.2} />
            <Text style={styles.archivedChipText}>Historical Roster</Text>
          </View>
        ) : (
          <View style={styles.headerRightChip}>
            <View style={styles.syncPulse} />
            <Text style={styles.syncText}>Live Terminal</Text>
          </View>
        )}
      </View>

      {/* ── Historical Roster Notice Banner ── */}
      {isHistorical && (
        <View style={styles.historicalBanner}>
          <History size={15} color="#b45309" strokeWidth={2.2} />
          <Text style={styles.historicalBannerText}>
            Past Gathering Roster • {displayDate}
          </Text>
          <View style={styles.historicalBannerBadge}>
            <Text style={styles.historicalBannerBadgeText}>Archived Roster</Text>
          </View>
        </View>
      )}

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
              {checkedIn.length} / {availableMembers.length}
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

export default React.memo(CheckInScreen);

