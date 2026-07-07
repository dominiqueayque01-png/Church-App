import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const STATUS_OPTIONS = ['visitor', 'new_member', 'member', 'leader'];
const STATUS_LABELS: Record<string, string> = {
  visitor: 'Visitor',
  new_member: 'New Member',
  member: 'Member',
  leader: 'Leader',
};
const HOW_THEY_HEARD = [
  'Friend / Family',
  'Social Media',
  'Walk-in',
  'Flyer / Poster',
  'Online Search',
  'Other',
];

export default function NewMemberScreen() {
  // navigation handled by parent
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    address: '',
    birthday: '',
    status: 'visitor',
    howTheyHeard: '',
  });

  const updateField = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!form.firstName.trim() || !form.lastName.trim()) {
      Alert.alert('Required', 'Please enter at least the first and last name.');
      return;
    }
    Alert.alert(
      '✅ Member Registered!',
      `${form.firstName} ${form.lastName} has been successfully registered.`,
      [{ text: 'OK' }],
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>

        {/* Section: Basic Info */}
        <Text style={styles.sectionTitle}>Basic Information</Text>
        <View style={styles.card}>
          <Text style={styles.label}>First Name <Text style={styles.required}>*</Text></Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. Juan"
            value={form.firstName}
            onChangeText={v => updateField('firstName', v)}
          />
          <Text style={styles.label}>Last Name <Text style={styles.required}>*</Text></Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. Dela Cruz"
            value={form.lastName}
            onChangeText={v => updateField('lastName', v)}
          />
          <Text style={styles.label}>Birthday</Text>
          <TextInput
            style={styles.input}
            placeholder="MM/DD/YYYY"
            value={form.birthday}
            onChangeText={v => updateField('birthday', v)}
            keyboardType="numeric"
          />
          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. 09XX XXX XXXX"
            value={form.phone}
            onChangeText={v => updateField('phone', v)}
            keyboardType="phone-pad"
          />
          <Text style={styles.label}>Email Address</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. juan@email.com"
            value={form.email}
            onChangeText={v => updateField('email', v)}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Text style={styles.label}>Home Address</Text>
          <TextInput
            style={[styles.input, styles.multiline]}
            placeholder="Street, Barangay, City"
            value={form.address}
            onChangeText={v => updateField('address', v)}
            multiline
            numberOfLines={2}
          />
        </View>

        {/* Section: Spiritual Status */}
        <Text style={styles.sectionTitle}>Spiritual Status</Text>
        <View style={styles.card}>
          <View style={styles.statusGrid}>
            {STATUS_OPTIONS.map(s => (
              <TouchableOpacity
                key={s}
                style={[
                  styles.statusOption,
                  form.status === s && styles.statusSelected,
                ]}
                onPress={() => updateField('status', s)}>
                <Text
                  style={[
                    styles.statusOptionText,
                    form.status === s && styles.statusSelectedText,
                  ]}>
                  {STATUS_LABELS[s]}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Section: How They Heard */}
        <Text style={styles.sectionTitle}>How Did They Hear About Us?</Text>
        <View style={styles.card}>
          <View style={styles.heardGrid}>
            {HOW_THEY_HEARD.map(option => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.heardOption,
                  form.howTheyHeard === option && styles.heardSelected,
                ]}
                onPress={() => updateField('howTheyHeard', option)}>
                <Text
                  style={[
                    styles.heardText,
                    form.howTheyHeard === option && styles.heardSelectedText,
                  ]}>
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitText}>Register Member</Text>
        </TouchableOpacity>

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f2f5',
  },
  scrollContent: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#888',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
    marginTop: 16,
    marginLeft: 4,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    elevation: 2,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#555',
    marginBottom: 6,
    marginTop: 12,
  },
  required: {
    color: '#e74c3c',
  },
  input: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    color: '#333',
    backgroundColor: '#fafafa',
  },
  multiline: {
    height: 70,
    textAlignVertical: 'top',
  },
  statusGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 4,
  },
  statusOption: {
    borderWidth: 1.5,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#fafafa',
  },
  statusSelected: {
    backgroundColor: '#1a1a2e',
    borderColor: '#1a1a2e',
  },
  statusOptionText: {
    fontSize: 14,
    color: '#555',
    fontWeight: '600',
  },
  statusSelectedText: {
    color: '#ffffff',
  },
  heardGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 4,
  },
  heardOption: {
    borderWidth: 1.5,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: '#fafafa',
  },
  heardSelected: {
    backgroundColor: '#4a90d9',
    borderColor: '#4a90d9',
  },
  heardText: {
    fontSize: 13,
    color: '#555',
    fontWeight: '600',
  },
  heardSelectedText: {
    color: '#ffffff',
  },
  submitButton: {
    backgroundColor: '#27ae60',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 24,
    elevation: 3,
  },
  submitText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  bottomSpacing: {
    height: 32,
  },
});