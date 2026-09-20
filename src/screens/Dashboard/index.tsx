import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  useWindowDimensions,
  InteractionManager,
} from 'react-native';
import {
  CalendarCheck,
  UserPlus,
  Users,
  Sparkles,
  ArrowRight,
  HeartHandshake,
  CheckCircle2,
} from '../../components/common/Icons';

import { colors, radius, shadows, typography } from '../../assets/style/theme';
import { getAllMembers } from '../../services/sync';

type Props = {
  onNavigate?: (screen: string) => void;
};

function DashboardScreen({ onNavigate }: Props) {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  const [totalMembers, setTotalMembers] = React.useState(0);
  const [visitorCount, setVisitorCount] = React.useState(0);
  const [ministryCount, setMinistryCount] = React.useState(0);
  const [youthCount, setYouthCount] = React.useState(0);

  React.useEffect(() => {
    const task = InteractionManager.runAfterInteractions(async () => {
      try {
        const members = await getAllMembers();
        let visitors = 0;
        let youth = 0;
        let ministry = 0;

        members.forEach((m: any) => {
          const isVisitor = m.status === 'visitor' || m.ministry === 'Visitor';
          const isYouth = !isVisitor && (m.ministry === 'Youth Ministry' || m.ministry === 'Youth');
          if (isVisitor) {
            visitors++;
          } else if (isYouth) {
            youth++;
          } else {
            ministry++;
          }
        });

        setTotalMembers(members.length);
        setVisitorCount(visitors);
        setYouthCount(youth);
        setMinistryCount(ministry);
      } catch (err) {
        console.log('Error loading dashboard stats:', err);
      }
    });
    return () => task.cancel();
  }, []);

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const isSaturdayToday = new Date().getDay() === 6;
  const activeServiceName = isSaturdayToday
    ? 'Saturday Ministry Gathering'
    : 'Sunday Fellowship Gathering';
  const activeServiceRoom = isSaturdayToday ? 'Main Sanctuary' : 'Sanctuary & Youth Center';

  return (
    <View style={styles.container}>
      {/* ── Page Header ── */}
      <View style={styles.header}>
        <View style={styles.dateChip}>
          <Sparkles size={12} color={colors.goldDark} strokeWidth={2} />
          <Text style={styles.dateChipText}>{today}</Text>
        </View>
        <Text style={styles.title}>Usher Shift Overview</Text>
        <Text style={styles.subtitle}>
          Active gathering stats, service checkpoints, and quick actions
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* ── Stats Grid (Matches Church-Admin .stat-card) ── */}
        <View
          style={[
            styles.statsGrid,
            isLandscape && styles.statsGridLandscape,
          ]}>
          {/* Card 1 */}
          <View style={styles.statCard}>
            <View style={[styles.statIconWrap, { backgroundColor: 'rgba(181, 151, 58, 0.12)' }]}>
              <Users size={22} color={colors.goldDark} strokeWidth={2.2} />
            </View>
            <View style={styles.statInfo}>
              <Text style={styles.statLabel}>Registered Profiles</Text>
              <Text style={styles.statValue}>{totalMembers}</Text>
              <Text style={styles.statSub}>
                {totalMembers === 0
                  ? 'No records entered yet'
                  : `${ministryCount} Ministry, ${youthCount} Youth, ${visitorCount} Visitors`}
              </Text>
            </View>
          </View>

          {/* Card 2 */}
          <View style={styles.statCard}>
            <View style={[styles.statIconWrap, { backgroundColor: 'rgba(39, 174, 96, 0.12)' }]}>
              <CheckCircle2 size={22} color={colors.success} strokeWidth={2.2} />
            </View>
            <View style={styles.statInfo}>
              <Text style={styles.statLabel}>Active Service</Text>
              <Text style={styles.statValue} numberOfLines={1}>{activeServiceName}</Text>
              <Text style={styles.statSub}>{activeServiceRoom}</Text>
            </View>
          </View>

          {/* Card 3 */}
          <View style={styles.statCard}>
            <View style={[styles.statIconWrap, { backgroundColor: 'rgba(41, 128, 185, 0.12)' }]}>
              <UserPlus size={22} color={colors.info} strokeWidth={2.2} />
            </View>
            <View style={styles.statInfo}>
              <Text style={styles.statLabel}>Role Separation</Text>
              <Text style={styles.statValue}>Ministry & Youth</Text>
              <Text style={styles.statSub}>Saturday / Sunday Contextual</Text>
            </View>
          </View>
        </View>

        {/* ── Quick Action Shortcuts ── */}
        <Text style={styles.sectionHeader}>Quick Terminal Shortcuts</Text>
        <View
          style={[
            styles.actionGrid,
            isLandscape && styles.actionGridLandscape,
          ]}>
          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => onNavigate && onNavigate('EventSelect')}
            activeOpacity={0.85}>
            <View style={styles.actionCardLeft}>
              <View style={styles.actionIconWrap}>
                <CalendarCheck size={22} color={colors.gold} strokeWidth={2} />
              </View>
              <View style={styles.actionCardTextWrap}>
                <Text style={styles.actionTitle}>Service Check-In Terminal</Text>
                <Text style={styles.actionDesc}>
                  Select active service and mark attending members
                </Text>
              </View>
            </View>
            <View style={styles.arrowWrap}>
              <ArrowRight size={16} color={colors.gold} strokeWidth={2.2} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => onNavigate && onNavigate('NewMember')}
            activeOpacity={0.85}>
            <View style={styles.actionCardLeft}>
              <View style={styles.actionIconWrap}>
                <UserPlus size={22} color={colors.gold} strokeWidth={2} />
              </View>
              <View style={styles.actionCardTextWrap}>
                <Text style={styles.actionTitle}>Register New Member</Text>
                <Text style={styles.actionDesc}>
                  Enroll a new attendee or first-time visitor profile
                </Text>
              </View>
            </View>
            <View style={styles.arrowWrap}>
              <ArrowRight size={16} color={colors.gold} strokeWidth={2.2} />
            </View>
          </TouchableOpacity>
        </View>

        {/* ── Usher Protocol Guidelines Card ── */}
        <View style={styles.guidelineCard}>
          <View style={styles.guidelineHeader}>
            <HeartHandshake size={18} color={colors.gold} strokeWidth={2.2} />
            <Text style={styles.guidelineTitle}>Usher Ministry Reminders</Text>
          </View>
          <View style={styles.guidelineList}>
            <View style={styles.guidelineItemRow}>
              <View style={styles.guidelineBullet} />
              <Text style={styles.guidelineItem}>
                Greet each visitor warmly with sanctuary smile and fellowship bulletin.
              </Text>
            </View>
            <View style={styles.guidelineItemRow}>
              <View style={styles.guidelineBullet} />
              <Text style={styles.guidelineItem}>
                Assist elderly members and families with children toward designated priority seating.
              </Text>
            </View>
            <View style={styles.guidelineItemRow}>
              <View style={styles.guidelineBullet} />
              <Text style={styles.guidelineItem}>
                Check in attending members on this tablet station or record new profiles promptly.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  header: {
    paddingHorizontal: 28,
    paddingTop: 20,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: colors.card,
    ...shadows.sm,
  },
  dateChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(181, 151, 58, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(181, 151, 58, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: radius.pill, // 9999px pill matching Church-Admin
    marginBottom: 8,
  },
  dateChipText: {
    fontSize: 11.5,
    fontWeight: '600',
    color: colors.goldDark,
  },
  title: {
    fontFamily: typography.serif,
    fontSize: 24,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  subtitle: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 3,
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 48,
  },

  // Stats Grid (Matches Church-Admin .stat-card)
  statsGrid: {
    gap: 14,
    marginBottom: 24,
  },
  statsGridLandscape: {
    flexDirection: 'row',
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.card, // #faf7f0
    borderRadius: radius.lg, // 14px
    padding: 18,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    ...shadows.sm,
  },
  statIconWrap: {
    width: 48,
    height: 48,
    borderRadius: radius.md, // 10px rounded icon container
    justifyContent: 'center',
    alignItems: 'center',
  },
  statInfo: {
    flex: 1,
    minWidth: 0,
  },
  statLabel: {
    fontSize: 11.5,
    fontWeight: '600',
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 2,
    lineHeight: 26,
  },
  statSub: {
    fontSize: 11,
    color: colors.textMuted,
  },

  // Shortcuts
  sectionHeader: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.6,
    color: colors.textSecondary,
    marginBottom: 12,
    textTransform: 'uppercase',
  },
  actionGrid: {
    gap: 14,
    marginBottom: 24,
  },
  actionGridLandscape: {
    flexDirection: 'row',
  },
  actionCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: radius.lg, // 14px
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...shadows.sm,
  },
  actionCardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    flex: 1,
  },
  actionIconWrap: {
    width: 44,
    height: 44,
    borderRadius: radius.md, // 10px
    backgroundColor: colors.goldSubtle,
    borderWidth: 1,
    borderColor: colors.borderGold,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionCardTextWrap: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 2,
  },
  actionDesc: {
    fontSize: 11.5,
    color: colors.textSecondary,
  },
  arrowWrap: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.goldSubtle,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Guidelines Card
  guidelineCard: {
    backgroundColor: colors.card,
    borderRadius: radius.lg, // 14px
    padding: 20,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.sm,
  },
  guidelineHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
    paddingBottom: 10,
  },
  guidelineTitle: {
    fontFamily: typography.serif,
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  guidelineList: {
    gap: 8,
  },
  guidelineItemRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  guidelineBullet: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: colors.gold,
    marginTop: 6,
  },
  guidelineItem: {
    flex: 1,
    fontSize: 12,
    color: colors.textSecondary,
    lineHeight: 18,
  },
});

export default React.memo(DashboardScreen);