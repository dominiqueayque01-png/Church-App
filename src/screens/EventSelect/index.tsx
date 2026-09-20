import React, { useState, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  useWindowDimensions,
  InteractionManager,
  Modal,
  Alert,
} from 'react-native';
import {
  Calendar,
  Clock,
  Users,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Lock,
  RotateCcw,
  X,
  History,
  Sparkles,
  CalendarDays,
} from '../../components/common/Icons';

import { getAttendanceForEvent, pullAttendanceFromSupabase } from '../../services/sync';
import {
  getWeekendDates,
  formatDateISO,
  formatDisplayDate,
  formatWeekRange,
  getDateScopedEventId,
  getMonthCalendarDays,
  toMidnight,
  CalendarDay,
  getQuickWeekendOptions,
} from '../../services/dateUtils';

import styles from './index.styles';
import { colors } from '../../assets/style/theme';

type Props = {
  onNavigateToCheckIn: (eventId: string, eventName: string, eventDate?: string) => void;
};

function EventSelectScreen({ onNavigateToCheckIn }: Props) {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  // Week offset: 0 = This Weekend, -1 = Last Weekend, +1 = Next Weekend
  const [weekOffset, setWeekOffset] = useState<number>(0);
  const [calendarModalVisible, setCalendarModalVisible] = useState(false);
  const [calendarMonth, setCalendarMonth] = useState<Date>(() => new Date());
  const [counts, setCounts] = useState<Record<string, number>>({});

  // Compute weekend dates for current offset
  const { saturday: satDate, sunday: sunDate } = useMemo(() => {
    return getWeekendDates(weekOffset);
  }, [weekOffset]);

  const satDateStr = useMemo(() => formatDateISO(satDate), [satDate]);
  const sunDateStr = useMemo(() => formatDateISO(sunDate), [sunDate]);

  const satEventId = useMemo(() => getDateScopedEventId(true, satDateStr), [satDateStr]);
  const sunEventId = useMemo(() => getDateScopedEventId(false, sunDateStr), [sunDateStr]);

  const todayDay = new Date().getDay(); // 0 = Sun, 6 = Sat, 1-5 = Mon-Fri
  const isCurrentWeek = weekOffset === 0;

  // Quick options: Last Week, This Weekend, Upcoming Events
  const quickOptions = useMemo(() => {
    return getQuickWeekendOptions();
  }, []);

  // Load attendance counts for these specific gathering dates
  useEffect(() => {
    const task = InteractionManager.runAfterInteractions(() => {
      async function loadCounts() {
        const newCounts: Record<string, number> = {};
        for (const item of [
          { id: satEventId, date: satDateStr },
          { id: sunEventId, date: sunDateStr },
        ]) {
          try {
            const localLogs = await getAttendanceForEvent(item.id, item.date);
            newCounts[item.id] = localLogs.length;
          } catch {
            newCounts[item.id] = 0;
          }
        }
        setCounts(newCounts);

        // Background fetch from Supabase Cloud
        for (const item of [
          { id: satEventId, date: satDateStr },
          { id: sunEventId, date: sunDateStr },
        ]) {
          pullAttendanceFromSupabase(item.id, item.date).then(cloudLogs => {
            if (cloudLogs && cloudLogs.length > 0) {
              setCounts(prev => ({
                ...prev,
                [item.id]: Math.max(prev[item.id] || 0, cloudLogs.length),
              }));
            }
          });
        }
      }
      loadCounts();
    });

    return () => task.cancel();
  }, [satEventId, sunEventId, satDateStr, sunDateStr]);

  // Construct dynamic services matching Church-Admin Attendance.css data structure
  const services = useMemo(() => {
    // ── SATURDAY MINISTRY GATHERING ──
    let satStatus = 'Upcoming';
    let satIsActive = false;
    let satIsLocked = false;
    let satActionText = 'Check In';
    let satBadgeStyle = styles.statusPillUpcoming;
    let satDotStyle = styles.statusDotUpcoming;
    let satTextStyle = styles.statusTextUpcoming;

    if (isCurrentWeek) {
      if (todayDay === 6) {
        satStatus = 'Active Today';
        satIsActive = true;
        satActionText = 'Open Check-in';
        satBadgeStyle = styles.statusPillActive;
        satDotStyle = styles.statusDotActive;
        satTextStyle = styles.statusTextActive;
      } else if (todayDay === 0) {
        satStatus = 'Completed Yesterday';
        satIsActive = false;
        satActionText = 'Review Attendance';
        satBadgeStyle = styles.statusPillPast;
        satDotStyle = styles.statusDotPast;
        satTextStyle = styles.statusTextPast;
      } else {
        satStatus = 'Upcoming This Saturday';
        satIsActive = false;
        satActionText = 'Saturday Service';
      }
    } else if (weekOffset < 0) {
      satStatus = `Past Gathering (${satDateStr})`;
      satIsActive = false;
      satActionText = 'Review Attendance';
      satBadgeStyle = styles.statusPillPast;
      satDotStyle = styles.statusDotPast;
      satTextStyle = styles.statusTextPast;
    } else {
      satStatus = 'Upcoming';
      satIsLocked = true;
      satActionText = 'Upcoming Service';
      satBadgeStyle = styles.statusPillLocked;
      satDotStyle = styles.statusDotLocked;
      satTextStyle = styles.statusTextLocked;
    }

    // ── SUNDAY FELLOWSHIP GATHERING ──
    let sunStatus = 'Upcoming';
    let sunIsActive = false;
    let sunIsLocked = false;
    let sunActionText = 'Check In';
    let sunBadgeStyle = styles.statusPillUpcoming;
    let sunDotStyle = styles.statusDotUpcoming;
    let sunTextStyle = styles.statusTextUpcoming;

    if (isCurrentWeek) {
      if (todayDay === 6) {
        sunStatus = 'Available Tomorrow';
        sunIsActive = false;
        sunIsLocked = true;
        sunActionText = 'Opens Sunday';
        sunBadgeStyle = styles.statusPillLocked;
        sunDotStyle = styles.statusDotLocked;
        sunTextStyle = styles.statusTextLocked;
      } else if (todayDay === 0) {
        sunStatus = 'Active Today';
        sunIsActive = true;
        sunActionText = 'Open Check-in';
        sunBadgeStyle = styles.statusPillActive;
        sunDotStyle = styles.statusDotActive;
        sunTextStyle = styles.statusTextActive;
      } else {
        sunStatus = 'Upcoming This Sunday';
        sunIsActive = false;
        sunActionText = 'Sunday Service';
      }
    } else if (weekOffset < 0) {
      sunStatus = `Past Gathering (${sunDateStr})`;
      sunIsActive = false;
      sunActionText = 'Review Attendance';
      sunBadgeStyle = styles.statusPillPast;
      sunDotStyle = styles.statusDotPast;
      sunTextStyle = styles.statusTextPast;
    } else {
      sunStatus = 'Upcoming';
      sunIsLocked = true;
      sunActionText = 'Upcoming Service';
      sunBadgeStyle = styles.statusPillLocked;
      sunDotStyle = styles.statusDotLocked;
      sunTextStyle = styles.statusTextLocked;
    }

    return [
      {
        id: satEventId,
        name: 'Saturday Ministry Gathering',
        day: 'Saturday',
        dayAbbr: 'SAT',
        dayNum: satDate.getDate(),
        isMinistry: true,
        date: satDateStr,
        displayDate: formatDisplayDate(satDate),
        time: '9:00 AM - 5:00 PM',
        room: 'Main Sanctuary',
        targetAudience: 'Ministry Members Only',
        status: satStatus,
        isActive: satIsActive,
        isLocked: satIsLocked,
        actionText: satActionText,
        badgeStyle: satBadgeStyle,
        dotStyle: satDotStyle,
        textStyle: satTextStyle,
      },
      {
        id: sunEventId,
        name: 'Sunday Fellowship Gathering',
        day: 'Sunday',
        dayAbbr: 'SUN',
        dayNum: sunDate.getDate(),
        isMinistry: false,
        date: sunDateStr,
        displayDate: formatDisplayDate(sunDate),
        time: '9:00 AM - 5:00 PM',
        room: 'Sanctuary & Youth Center',
        targetAudience: 'Youth Fellowship & Ministry',
        status: sunStatus,
        isActive: sunIsActive,
        isLocked: sunIsLocked,
        actionText: sunActionText,
        badgeStyle: sunBadgeStyle,
        dotStyle: sunDotStyle,
        textStyle: sunTextStyle,
      },
    ];
  }, [isCurrentWeek, todayDay, weekOffset, satEventId, sunEventId, satDateStr, sunDateStr, satDate, sunDate]);

  const handleCardPress = (service: any) => {
    if (service.isLocked) {
      if (isCurrentWeek && todayDay === 6 && service.day === 'Sunday') {
        Alert.alert(
          'Sunday Fellowship Gathering',
          'Sunday Fellowship Gathering will be open for live check-in tomorrow, Sunday. Today is dedicated exclusively to Saturday Ministry Gathering.',
          [{ text: 'Understood' }],
        );
        return;
      }
      Alert.alert('Upcoming Gathering', 'This gathering is not open for check-in yet.');
      return;
    }

    onNavigateToCheckIn(service.id, service.name, service.date);
  };

  // Jump from calendar day to week offset
  const handleSelectCalendarDay = (day: CalendarDay) => {
    const currentSat = getWeekendDates(0).saturday;
    const targetSat = toMidnight(day.date);

    if (day.date.getDay() === 0) {
      targetSat.setDate(targetSat.getDate() - 1);
    } else {
      targetSat.setDate(targetSat.getDate() + (6 - day.date.getDay()));
    }

    const diffMs = targetSat.getTime() - currentSat.getTime();
    const computedOffset = Math.round(diffMs / (7 * 24 * 60 * 60 * 1000));
    setWeekOffset(computedOffset);
    setCalendarModalVisible(false);
  };

  const handlePrevMonth = () => {
    setCalendarMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCalendarMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const calendarDays = useMemo(() => {
    return getMonthCalendarDays(calendarMonth.getFullYear(), calendarMonth.getMonth());
  }, [calendarMonth]);

  const monthLabel = useMemo(() => {
    return calendarMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  }, [calendarMonth]);

  const weekRangeLabel = useMemo(() => {
    return formatWeekRange(satDate, sunDate);
  }, [satDate, sunDate]);

  const selectedSatStr = satDateStr;
  const selectedSunStr = sunDateStr;

  return (
    <View style={styles.container}>
      {/* ── Top Header Row: Title & Subtitle + Circular Calendar Button ── */}
      <View style={styles.headerRow}>
        <View style={styles.headerLeft}>
          <Text style={styles.title}>Service Check-in</Text>
          <View style={styles.subtitleRow}>
            <Calendar size={13} color={colors.goldDark} strokeWidth={2} />
            <Text style={styles.subtitleText}>
              {weekOffset === 0
                ? 'This Weekend'
                : weekOffset === -1
                ? 'Last Week'
                : weekOffset === 1
                ? 'Next Weekend'
                : weekOffset < -1
                ? `${Math.abs(weekOffset)} Weeks Ago`
                : 'Upcoming Gathering'}{' '}
              - {weekRangeLabel}
            </Text>
            {weekOffset !== 0 && (
              <TouchableOpacity
                style={styles.resetPill}
                onPress={() => setWeekOffset(0)}
                activeOpacity={0.75}>
                <RotateCcw size={11} color={colors.goldDark} strokeWidth={2.4} />
                <Text style={styles.resetPillText}>Back to Today</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Circular Action Button for Calendar */}
        <TouchableOpacity
          style={[
            styles.calendarCircleBtn,
            weekOffset !== 0 && styles.calendarCircleBtnActive,
          ]}
          onPress={() => {
            setCalendarMonth(new Date(satDate));
            setCalendarModalVisible(true);
          }}
          activeOpacity={0.75}
          accessibilityLabel="Open gathering calendar">
          <Calendar
            size={20}
            color={weekOffset !== 0 ? '#181614' : colors.goldDark}
            strokeWidth={2.2}
          />
          {weekOffset !== 0 && <View style={styles.activeIndicatorDot} />}
        </TouchableOpacity>
      </View>

      {/* ── Main Surface: 2 Service Cards Aligned with Church-Admin ── */}
      <ScrollView
        contentContainerStyle={[
          styles.cardsContainer,
          isLandscape && styles.cardsContainerLandscape,
        ]}
        showsVerticalScrollIndicator={false}>
        {services.map(service => (
          <TouchableOpacity
            key={service.id}
            style={[
              styles.serviceCard,
              service.isActive && styles.serviceCardActive,
              service.isLocked && styles.serviceCardLocked,
              isLandscape && styles.serviceCardLandscape,
            ]}
            onPress={() => handleCardPress(service)}
            activeOpacity={service.isLocked ? 0.95 : 0.85}>
            {/* Header: Date Tile + Titles */}
            <View style={styles.cardHeaderRow}>
              <View
                style={[
                  styles.dateBlock,
                  service.isMinistry ? styles.dateBlockMinistry : styles.dateBlockFellowship,
                ]}>
                <Text style={styles.dateBlockDay}>{service.dayAbbr}</Text>
                <Text style={styles.dateBlockNum}>{service.dayNum}</Text>
              </View>

              <View style={styles.cardTitleWrap}>
                <Text style={styles.cardTitle}>{service.name}</Text>
                <Text style={styles.cardRoom}>{service.room}</Text>
                <Text style={styles.cardAudience}>{service.targetAudience}</Text>
              </View>
            </View>

            {/* Middle: Time & Live Attendance Badges */}
            <View style={styles.cardMetaRow}>
              <View style={styles.metaItem}>
                <Clock size={13} color={colors.textSecondary} strokeWidth={2} />
                <Text style={styles.metaText}>{service.time}</Text>
              </View>
              <View style={styles.metaItem}>
                <Users size={13} color={colors.goldDark} strokeWidth={2} />
                <Text style={styles.metaTextHighlight}>
                  {counts[service.id] ?? 0} Checked In
                </Text>
              </View>
            </View>

            {/* Footer: Pill Status Badge & Action Arrow */}
            <View style={styles.cardFooter}>
              <View style={[styles.statusPill, service.badgeStyle]}>
                <View style={[styles.statusDot, service.dotStyle]} />
                <Text style={[styles.statusPillText, service.textStyle]}>
                  {service.status}
                </Text>
              </View>

              <View style={styles.actionBtn}>
                <Text
                  style={[
                    styles.actionBtnText,
                    service.isLocked && { color: colors.textMuted },
                  ]}>
                  {service.actionText}
                </Text>
                {service.isLocked ? (
                  <Lock size={14} color={colors.textMuted} strokeWidth={2} />
                ) : (
                  <ArrowRight size={14} color={colors.gold} strokeWidth={2.4} />
                )}
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* ── Circular Button Triggered Calendar & Events Modal ── */}
      <Modal
        visible={calendarModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setCalendarModalVisible(false)}>
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setCalendarModalVisible(false)}>
          <TouchableOpacity activeOpacity={1} style={styles.calendarModalCard}>
            {/* Modal Header */}
            <View style={styles.calendarModalHeader}>
              <Text style={styles.calendarModalTitle}>Gathering Calendar & Events</Text>
              <TouchableOpacity
                onPress={() => setCalendarModalVisible(false)}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                <X size={18} color={colors.textSecondary} />
              </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.modalScrollContent}>
              {/* Quick Event Options (Last Week, This Weekend, Upcoming) */}
              <Text style={styles.sectionLabel}>Quick Event Access</Text>
              <View style={styles.quickOptionsWrap}>
                {quickOptions.map(opt => {
                  const isSelected = weekOffset === opt.offset;
                  const Icon = opt.offset === -1 ? History : opt.offset === 0 ? Sparkles : CalendarDays;
                  return (
                    <TouchableOpacity
                      key={opt.offset}
                      style={[
                        styles.quickOptionCard,
                        isSelected && styles.quickOptionCardActive,
                      ]}
                      onPress={() => {
                        setWeekOffset(opt.offset);
                        setCalendarModalVisible(false);
                      }}
                      activeOpacity={0.8}>
                      <View style={styles.quickOptionLeft}>
                        <View style={styles.quickOptionTitleRow}>
                          <Icon
                            size={15}
                            color={isSelected ? colors.goldDark : colors.textSecondary}
                            strokeWidth={2}
                          />
                          <Text style={styles.quickOptionTitle}>{opt.label}</Text>
                          {isSelected && (
                            <View style={styles.activePillBadge}>
                              <Text style={styles.activePillBadgeText}>Selected</Text>
                            </View>
                          )}
                        </View>
                        <Text style={styles.quickOptionSub}>{opt.sublabel}</Text>
                      </View>
                      <Text style={styles.quickOptionRange}>{opt.range}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              {/* Interactive Monthly Calendar View */}
              <Text style={styles.sectionLabel}>All Gathering Dates</Text>

              {/* Month Navigator */}
              <View style={styles.calendarMonthNavRow}>
                <TouchableOpacity
                  onPress={handlePrevMonth}
                  activeOpacity={0.7}
                  hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                  <ChevronLeft size={20} color={colors.textPrimary} />
                </TouchableOpacity>

                <Text style={styles.calendarMonthLabel}>{monthLabel}</Text>

                <TouchableOpacity
                  onPress={handleNextMonth}
                  activeOpacity={0.7}
                  hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                  <ChevronRight size={20} color={colors.textPrimary} />
                </TouchableOpacity>
              </View>

              {/* Calendar Grid */}
              <View style={styles.calendarGrid}>
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
                  <View key={d} style={styles.calendarDayHeaderCell}>
                    <Text
                      style={[
                        styles.calendarDayHeaderText,
                        (d === 'Sat' || d === 'Sun') && { color: colors.goldDark },
                      ]}>
                      {d}
                    </Text>
                  </View>
                ))}

                {calendarDays.map((cd, index) => {
                  const isWeekend = cd.isSaturday || cd.isSunday;
                  const isSelectedDate =
                    cd.dateString === selectedSatStr || cd.dateString === selectedSunStr;

                  return (
                    <TouchableOpacity
                      key={`${cd.dateString}-${index}`}
                      style={[
                        styles.calendarDayCell,
                        isWeekend && styles.calendarDayCellWeekend,
                        isSelectedDate && styles.calendarDayCellSelected,
                        cd.isToday && styles.calendarDayCellToday,
                      ]}
                      onPress={() => handleSelectCalendarDay(cd)}
                      activeOpacity={0.75}>
                      <Text
                        style={[
                          styles.calendarDayText,
                          !cd.isCurrentMonth && styles.calendarDayTextMuted,
                          isWeekend && styles.calendarDayTextWeekend,
                          isSelectedDate && styles.calendarDayTextSelected,
                        ]}>
                        {cd.dayNumber}
                      </Text>
                      {cd.isSaturday && (
                        <Text
                          style={[
                            styles.calendarWeekendTag,
                            isSelectedDate && { color: '#ffffff' },
                          ]}>
                          Ministry
                        </Text>
                      )}
                      {cd.isSunday && (
                        <Text
                          style={[
                            styles.calendarWeekendTag,
                            { color: '#1f618d' },
                            isSelectedDate && { color: '#ffffff' },
                          ]}>
                          Fellowship
                        </Text>
                      )}
                    </TouchableOpacity>
                  );
                })}
              </View>
            </ScrollView>

            {/* Modal Footer */}
            <View style={styles.calendarModalFooter}>
              <Text style={styles.calendarModalFooterText}>
                Tap any weekend gathering to load attendance or check in members
              </Text>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

export default React.memo(EventSelectScreen);
