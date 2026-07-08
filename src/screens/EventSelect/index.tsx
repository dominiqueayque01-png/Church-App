import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
} from 'react-native';

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
  onOpenSidebar: () => void;
};



export default function EventSelectScreen({ onNavigateToCheckIn, onOpenSidebar }: Props) {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  return (  
   <> 
   {/* Burger Button */}
    <TouchableOpacity style={styles.burger} onPress={onOpenSidebar}>
      <View style={styles.burgerLine} />
      <View style={styles.burgerLine} />
      <View style={styles.burgerLine} />
    </TouchableOpacity>


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



const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    backgroundColor: '#f5f5f0',
  },
  dateText: {
    fontSize: 13,
    color: '#888',
    textAlign: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#b5973a',
    textAlign: 'center',
    marginBottom: 24,
  },
  cardsContainer: {
    gap: 16,
    paddingBottom: 32,
  },
  cardsContainerLandscape: {
    flexDirection: 'row',
  },
  serviceCard: {
    borderRadius: 8,
    padding: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    justifyContent: 'space-between',
    minHeight: 140,
  },
  serviceCardLandscape: { flex: 1 },
  cardTop: { marginBottom: 16 },
  cardDay: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.75)',
    fontWeight: '600',
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  cardName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  cardTime: { fontSize: 13, color: 'rgba(255,255,255,0.8)' },
  cardBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.2)',
    paddingTop: 12,
  },
  checkedInText: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.75)',
    fontWeight: '500',
  },
  tapText: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.75)',
    fontWeight: '500',
  },
burger: {
  position: 'absolute',
  top: 16,
  left: 16,
  zIndex: 10,
  gap: 5,
  padding: 8,
},
burgerLine: {
  height: 2,
  width: 22,
  backgroundColor: '#3d3020',
  borderRadius: 2,
},
  
});