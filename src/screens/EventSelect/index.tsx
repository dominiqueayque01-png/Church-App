import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import {
  Calendar,
  Clock,
  Users,
  ArrowRight,
  Sparkles,
  ChevronRight,
} from '../../components/common/Icons';

import styles from './index.styles';
import { colors } from '../../assets/style/theme';

const SERVICES = [
  {
    id: 'saturday-ministry',
    name: 'Ministry Gathering',
    day: 'Saturday',
    time: '9:00 AM - 5:00 PM',
    status: 'Upcoming',
    room: 'Main Sanctuary',
  },
  {
    id: 'sunday-fellowship',
    name: 'Youth Fellowship',
    day: 'Sunday',
    time: '9:00 AM - 5:00 PM',
    status: 'Active Today',
    room: 'Youth Center & Hall B',
  },
];

function getFormattedDate() {
  return new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

type Props = {
  onNavigateToCheckIn: (eventId: string, eventName: string) => void;
};

export default function EventSelectScreen({ onNavigateToCheckIn }: Props) {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  return (
    <View style={styles.container}>
      {/* ── Sanctuary Header Banner ── */}
      <View style={styles.header}>
        <View style={styles.dateChip}>
          <Calendar size={13} color={colors.gold} strokeWidth={2} />
          <Text style={styles.dateChipText}>{getFormattedDate()}</Text>
        </View>
        <Text style={styles.title}>Service Gathering</Text>
        <Text style={styles.subtitle}>
          Select an active service to initiate usher member check-in
        </Text>
      </View>

      {/* ── Services Grid ── */}
      <ScrollView
        contentContainerStyle={[
          styles.cardsContainer,
          isLandscape && styles.cardsContainerLandscape,
        ]}
        showsVerticalScrollIndicator={false}>
        {SERVICES.map(service => {
          const isActive = service.status === 'Active Today';
          return (
            <TouchableOpacity
              key={service.id}
              style={[
                styles.serviceCard,
                isActive && styles.serviceCardActive,
                isLandscape && styles.serviceCardLandscape,
              ]}
              onPress={() => onNavigateToCheckIn(service.id, service.name)}
              activeOpacity={0.88}>
              {/* Top Meta Bar */}
              <View style={styles.cardHeaderRow}>
                <View
                  style={[
                    styles.statusPill,
                    isActive ? styles.statusPillActive : styles.statusPillUpcoming,
                  ]}>
                  <View
                    style={[
                      styles.statusDot,
                      isActive ? styles.statusDotActive : styles.statusDotUpcoming,
                    ]}
                  />
                  <Text
                    style={[
                      styles.statusPillText,
                      isActive ? styles.statusTextActive : styles.statusTextUpcoming,
                    ]}>
                    {service.status}
                  </Text>
                </View>
                <Text style={styles.cardDay}>{service.day}</Text>
              </View>

              {/* Service Title */}
              <View style={styles.cardBody}>
                <Text style={styles.cardName}>{service.name}</Text>
                <Text style={styles.cardRoom}>{service.room}</Text>

                {/* Time & Attendance Badges */}
                <View style={styles.metaRow}>
                  <View style={styles.metaItem}>
                    <Clock size={14} color={colors.textSecondary} strokeWidth={2} />
                    <Text style={styles.metaText}>{service.time}</Text>
                  </View>
                  <View style={styles.metaItem}>
                    <Users size={14} color={colors.goldDark} strokeWidth={2} />
                    <Text style={styles.metaTextHighlight}>0 Checked-in</Text>
                  </View>
                </View>
              </View>

              {/* Card Action Footer */}
              <View style={styles.cardFooter}>
                <Text style={styles.tapText}>Open Check-in Terminal</Text>
                <View style={styles.actionArrow}>
                  <ArrowRight size={16} color={colors.gold} strokeWidth={2.4} />
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}
