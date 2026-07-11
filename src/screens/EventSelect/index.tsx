import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
} from 'react-native';

import styles from './index.styles';

const SERVICES = [
  {
    id: 'saturday-ministry',
    name: 'Ministry Gathering',
    day: 'Saturday',
    time: '9:00 AM - 5:00 PM',
    color: '#b5973a',
  },
  {
    id: 'sunday-fellowship',
    name: 'Youth Fellowship',
    day: 'Sunday',
    time: '9:00 AM - 5:00 PM',
    color: '#7a6a2a',
  },
];

function getFormattedDate() {
  return new Date().toLocaleDateString('en-US', {
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
   <> 
   {/* Burger Button */}
  

    <View style={styles.container}>
      <Text style={styles.dateText}>{getFormattedDate()}</Text>
      <Text style={styles.title}>Select Service</Text>

      <ScrollView
        contentContainerStyle={[
          styles.cardsContainer,
          isLandscape && styles.cardsContainerLandscape,
        ]}
        showsVerticalScrollIndicator={false}>
        {SERVICES.map(service => (
          <TouchableOpacity
            key={service.id}
            style={[
              styles.serviceCard,
              { backgroundColor: service.color },
              isLandscape && styles.serviceCardLandscape,
            ]}
            onPress={() => onNavigateToCheckIn(service.id, service.name)}
            activeOpacity={0.85}>
            <View style={styles.cardTop}>
              <Text style={styles.cardDay}>{service.day}</Text>
              <Text style={styles.cardName}>{service.name}</Text>
              <Text style={styles.cardTime}>{service.time}</Text>
            </View>
            <View style={styles.cardBottom}>
              <Text style={styles.checkedInText}>0 Checked-in</Text>
              <Text style={styles.tapText}>Tap to start Check-in →</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
    </>
  );
}
