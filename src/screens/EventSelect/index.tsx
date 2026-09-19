import React, { useState, useEffect, useMemo, useCallback } from 'react';
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
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Lock,
  CalendarDays,
  History,
  X,
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
} from '../../services/dateUtils';

import styles from './index.styles';
import { colors } from '../../assets/style/theme';

type Props = {
  onNavigateToCheckIn: (eventId: string, eventName: string, eventDate?: string) => void;
};

function EventSelectScreen({ onNavigateToCheckIn }: Props) {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  // Week offset: 0 = This Weekend, -1 = Last Weekend, -2 = 2 Weeks Ago
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

        // Also background fetch from cloud
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

  // Construct dynamic services based on date and on-time weekend logic
  const services = useMemo(() => {
    // ── SATURDAY MINISTRY GATHERING ──
    let satStatus = 'Upcoming';
    let satIsActive = false;
    let satIsLocked = false;
    let satActionText = 'Open Check-in Terminal';
    let satPillStyle = styles.statusPillUpcoming;
    let satDotStyle = styles.statusDotUpcoming;
    let satTextStyle = styles.statusTextUpcoming;

    if (isCurrentWeek) {
      if (todayDay === 6) {
        // Today is Saturday!
        satStatus = 'Active Today';
        satIsActive = true;
        satActionText = 'Open Live Check-In Terminal';
        satPillStyle = styles.statusPillActive;
        satDotStyle = styles.statusDotActive;
        satTextStyle = styles.statusTextActive;
      } else if (todayDay === 0) {
        // Today is Sunday: Saturday happened yesterday, clickable for review!
        satStatus = 'Completed Yesterday';
        satIsActive = false;
        satActionText = 'Review Saturday Attendance';
        satPillStyle = styles.statusPillPast;
        satDotStyle = styles.statusDotPast;
        satTextStyle = styles.statusTextPast;
      } else {
        // Weekday
        satStatus = 'Upcoming This Saturday';
        satIsActive = false;
        satActionText = 'Open Saturday Terminal';
      }
    } else if (weekOffset < 0) {
      // Historical week
      satStatus = `Past Gathering (${satDateStr})`;
      satIsActive = false;
      satActionText = 'Review Historical Attendance';
      satPillStyle = styles.statusPillPast;
      satDotStyle = styles.statusDotPast;
      satTextStyle = styles.statusTextPast;
    } else {
      // Future week
      satStatus = 'Upcoming';
      satIsLocked = true;
      satActionText = 'Upcoming Gathering';
      satPillStyle = styles.statusPillLocked;
      satDotStyle = styles.statusDotLocked;
      satTextStyle = styles.statusTextLocked;
    }

    // ── SUNDAY FELLOWSHIP GATHERING ──
    let sunStatus = 'Upcoming';
    let sunIsActive = false;
    let sunIsLocked = false;
    let sunActionText = 'Open Check-in Terminal';
    let sunPillStyle = styles.statusPillUpcoming;
    let sunDotStyle = styles.statusDotUpcoming;
    let sunTextStyle = styles.statusTextUpcoming;

    if (isCurrentWeek) {
      if (todayDay === 6) {
        // Today is Saturday: Sunday is locked until tomorrow!
        sunStatus = 'Upcoming Tomorrow';
        sunIsActive = false;
        sunIsLocked = true; // Locked on Saturday as requested
        sunActionText = 'Available Tomorrow (Sunday)';
        sunPillStyle = styles.statusPillLocked;
        sunDotStyle = styles.statusDotLocked;
        sunTextStyle = styles.statusTextLocked;
      } else if (todayDay === 0) {
        // Today is Sunday: Active today!
        sunStatus = 'Active Today';
        sunIsActive = true;
        sunActionText = 'Open Live Check-In Terminal';
        sunPillStyle = styles.statusPillActive;
        sunDotStyle = styles.statusDotActive;
        sunTextStyle = styles.statusTextActive;
      } else {
        // Weekday
        sunStatus = 'Upcoming This Sunday';
        sunIsActive = false;
        sunActionText = 'Open Sunday Terminal';
      }
    } else if (weekOffset < 0) {
      // Historical week
      sunStatus = `Past Gathering (${sunDateStr})`;
      sunIsActive = false;
      sunActionText = 'Review Historical Attendance';
      sunPillStyle = styles.statusPillPast;
      sunDotStyle = styles.statusDotPast;
      sunTextStyle = styles.statusTextPast;
    } else {
      // Future week
      sunStatus = 'Upcoming';
      sunIsLocked = true;
      sunActionText = 'Upcoming Gathering';
      sunPillStyle = styles.statusPillLocked;
      sunDotStyle = styles.statusDotLocked;
      sunTextStyle = styles.statusTextLocked;
    }

    return [
      {
        id: satEventId,
        name: 'Saturday Ministry Gathering',
        day: 'Saturday',
        date: satDateStr,
        displayDate: formatDisplayDate(satDate),
        time: '9:00 AM - 5:00 PM',
        room: 'Main Sanctuary',
        targetAudience: 'Ministry Workers & Servants',
        status: satStatus,
        isActive: satIsActive,
        isLocked: satIsLocked,
        actionText: satActionText,
        pillStyle: satPillStyle,
        dotStyle: satDotStyle,
        textStyle: satTextStyle,
      },
      {
        id: sunEventId,
        name: 'Sunday Fellowship Gathering',
        day: 'Sunday',
        date: sunDateStr,
        displayDate: formatDisplayDate(sunDate),
        time: '9:00 AM - 5:00 PM',
        room: 'Sanctuary & Youth Center',
        targetAudience: 'Youth Fellowship & Ministry Facilitators',
        status: sunStatus,
        isActive: sunIsActive,
        isLocked: sunIsLocked,
        actionText: sunActionText,
        pillStyle: sunPillStyle,
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
      // Sunday: Saturday was 1 day earlier
      targetSat.setDate(targetSat.getDate() - 1);
    } else {
      // Monday to Saturday
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

  return (
    <View style={styles.container}>
      {/* ── Sanctuary Header Banner ── */}
      <View style={styles.header}>
        <View style={styles.dateChip}>
          <Calendar size={13} color={colors.gold} strokeWidth={2} />
          <Text style={styles.dateChipText}>
            {new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </Text>
        </View>
        <Text style={styles.title}>Service Gathering</Text>
        <Text style={styles.subtitle}>
          Select an active service to initiate usher member check-in
        </Text>
      </View>

      {/* ── Quick Preset Navigation Pills ── */}
      <View style={styles.quickNavRow}>
        <TouchableOpacity
          style={[styles.quickPill, weekOffset === 0 && styles.quickPillActive]}
          onPress={() => setWeekOffset(0)}
          activeOpacity={0.8}>
          <Sparkles size={12} color={weekOffset === 0 ? '#181614' : colors.goldDark} strokeWidth={2} />
          <Text style={[styles.quickPillText, weekOffset === 0 && styles.quickPillTextActive]}>
            This Weekend
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.quickPill, weekOffset === -1 && styles.quickPillActive]}
          onPress={() => setWeekOffset(-1)}
          activeOpacity={0.8}>
          <History size={12} color={weekOffset === -1 ? '#181614' : colors.textSecondary} />
          <Text style={[styles.quickPillText, weekOffset === -1 && styles.quickPillTextActive]}>
            Last Weekend
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.quickPill}
          onPress={() => {
            setCalendarMonth(new Date(satDate));
            setCalendarModalVisible(true);
          }}
          activeOpacity={0.8}>
          <CalendarDays size={13} color={colors.textSecondary} />
          <Text style={styles.quickPillText}>Calendar View</Text>
        </TouchableOpacity>
      </View>

      {/* ── Week Navigation Bar ── */}
      <View style={styles.weekBar}>
        <TouchableOpacity
          style={styles.weekNavBtn}
          onPress={() => setWeekOffset(prev => prev - 1)}
          activeOpacity={0.75}>
          <ChevronLeft size={16} color={colors.textPrimary} />
          <Text style={styles.weekNavBtnText}>Prev Week</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.weekInfoWrap}
          onPress={() => {
            setCalendarMonth(new Date(satDate));
            setCalendarModalVisible(true);
          }}
          activeOpacity={0.75}>
          <Text style={styles.weekTitle}>Week of {weekRangeLabel}</Text>
          <Text style={styles.weekSub}>
            {weekOffset === 0
              ? '● Current Weekend'
              : weekOffset === -1
              ? '↺ Previous Weekend (Last Week)'
              : weekOffset < -1
              ? `↺ ${Math.abs(weekOffset)} Weeks Ago`
              : 'Upcoming Weekend'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.weekNavBtn, weekOffset >= 1 && styles.weekNavBtnDisabled]}
          disabled={weekOffset >= 1}
          onPress={() => setWeekOffset(prev => prev + 1)}
          activeOpacity={0.75}>
          <Text style={styles.weekNavBtnText}>Next Week</Text>
          <ChevronRight size={16} color={colors.textPrimary} />
        </TouchableOpacity>
      </View>

      {/* ── Historical Notice Banner (if viewing past gathering) ── */}
      {weekOffset < 0 && (
        <View style={styles.historicalNoticeBanner}>
          <Text style={styles.historicalNoticeText}>
            📅 Viewing historical gathering attendance for {weekRangeLabel}.
          </Text>
          <TouchableOpacity
            style={styles.historicalResetBtn}
            onPress={() => setWeekOffset(0)}
            activeOpacity={0.8}>
            <Text style={styles.historicalResetText}>Jump to Today</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* ── Services Cards Grid ── */}
      <ScrollView
        contentContainerStyle={[
          styles.cardsContainer,
          isLandscape && styles.cardsContainerLandscape,
        ]}
        showsVerticalScrollIndicator={false}>
        {services.map(service => {
          return (
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
              {/* Top Meta Bar */}
              <View style={styles.cardHeaderRow}>
                <View style={[styles.statusPill, service.pillStyle]}>
                  <View style={[styles.statusDot, service.dotStyle]} />
                  <Text style={[styles.statusPillText, service.textStyle]}>
                    {service.status}
                  </Text>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                  {service.isLocked && <Lock size={12} color={colors.textMuted} />}
                  <Text style={styles.cardDay}>{service.day} • {service.date}</Text>
                </View>
              </View>

              {/* Service Title */}
              <View style={styles.cardBody}>
                <Text style={styles.cardName}>{service.name}</Text>
                <Text style={styles.cardRoom}>
                  {service.room} • {service.targetAudience}
                </Text>

                {/* Time & Attendance Badges */}
                <View style={styles.metaRow}>
                  <View style={styles.metaItem}>
                    <Clock size={14} color={colors.textSecondary} strokeWidth={2} />
                    <Text style={styles.metaText}>{service.time}</Text>
                  </View>
                  <View style={styles.metaItem}>
                    <Users size={14} color={colors.goldDark} strokeWidth={2} />
                    <Text style={styles.metaTextHighlight}>
                      {counts[service.id] ?? 0} Checked-in
                    </Text>
                  </View>
                </View>
              </View>

              {/* Card Action Footer */}
              <View style={styles.cardFooter}>
                <Text
                  style={[
                    styles.tapText,
                    service.isLocked && { color: colors.textMuted },
                  ]}>
                  {service.actionText}
                </Text>
                <View style={styles.actionArrow}>
                  {service.isLocked ? (
                    <Lock size={14} color={colors.textMuted} strokeWidth={2} />
                  ) : (
                    <ArrowRight size={16} color={colors.gold} strokeWidth={2.4} />
                  )}
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* ── Monthly Calendar Modal ── */}
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
              <Text style={styles.calendarModalTitle}>Sanctuary Gathering Calendar</Text>
              <TouchableOpacity
                onPress={() => setCalendarModalVisible(false)}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                <X size={18} color={colors.textSecondary} />
              </TouchableOpacity>
            </View>

            {/* Month Navigator */}
            <View style={styles.calendarMonthNavRow}>
              <TouchableOpacity onPress={handlePrevMonth} activeOpacity={0.7} style={{ padding: 6 }}>
                <ChevronLeft size={18} color={colors.textPrimary} />
              </TouchableOpacity>

              <Text style={styles.calendarMonthLabel}>{monthLabel}</Text>

              <TouchableOpacity onPress={handleNextMonth} activeOpacity={0.7} style={{ padding: 6 }}>
                <ChevronRight size={18} color={colors.textPrimary} />
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
                return (
                  <TouchableOpacity
                    key={`${cd.dateString}-${index}`}
                    style={[
                      styles.calendarDayCell,
                      isWeekend && styles.calendarDayCellWeekend,
                      cd.isToday && styles.calendarDayCellToday,
                    ]}
                    onPress={() => handleSelectCalendarDay(cd)}
                    activeOpacity={0.75}>
                    <Text
                      style={[
                        styles.calendarDayText,
                        !cd.isCurrentMonth && styles.calendarDayTextMuted,
                        isWeekend && styles.calendarDayTextWeekend,
                      ]}>
                      {cd.dayNumber}
                    </Text>
                    {cd.isSaturday && <Text style={styles.calendarWeekendTag}>Ministry</Text>}
                    {cd.isSunday && <Text style={[styles.calendarWeekendTag, { color: '#1f618d' }]}>Fellowship</Text>}
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Modal Footer */}
            <View style={styles.calendarModalFooter}>
              <Text style={styles.calendarModalFooterText}>
                Tap any Saturday or Sunday to load historical attendance for that gathering
              </Text>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

export default React.memo(EventSelectScreen);
