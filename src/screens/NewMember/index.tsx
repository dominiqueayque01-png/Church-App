import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  useWindowDimensions,
} from 'react-native';

const STATUS_OPTIONS = ['Visitor', 'New Member', 'Member', 'Leader'];
const MINISTRY_OPTIONS = ['Unassigned', 'Youth Ministry', 'Worship Team', 'Ushers', 'Media Team', 'Children Ministry'];
const GENDER_OPTIONS = ['Male', 'Female'];
const RELATIONSHIP_OPTIONS = ['Spouse', 'Parent', 'Child', 'Sibling', 'Other'];
const HOW_HEARD_OPTIONS = ['Friend / Family', 'Social Media', 'Walk-in', 'Flyer / Poster', 'Other'];

import { styles, dropdown } from './index.styles';

type FormData = {
  firstName: string;
  middleInitial: string;
  lastName: string;
  birthdate: string;
  age: string;
  gender: string;
  phone: string;
  email: string;
  address: string;
  status: string;
  ministry: string;
  dateJoined: string;
  howTheyHeard: string;
};

type DropdownProps = {
  label: string;
  value: string;
  options: string[];
  onSelect: (val: string) => void;
};

function Dropdown({ label, value, options, onSelect }: DropdownProps) {
  const [open, setOpen] = useState(false);
  return (
    <View style={dropdown.wrapper}>
      <TouchableOpacity
        style={dropdown.button}
        onPress={() => setOpen(!open)}>
        <Text style={dropdown.buttonText}>{value || label}</Text>
        <Text style={dropdown.arrow}>{open ? '▲' : '▼'}</Text>
      </TouchableOpacity>
      {open && (
        <View style={dropdown.menu}>
          {options.map(opt => (
            <TouchableOpacity
              key={opt}
              style={dropdown.option}
              onPress={() => { onSelect(opt); setOpen(false); }}>
              <Text style={[
                dropdown.optionText,
                value === opt && dropdown.optionTextActive,
              ]}>{opt}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

type Props = {
 
  onOpenSidebar?: () => void;
};

export default function EventSelectScreen({  onOpenSidebar }: Props) {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  const [form, setForm] = useState<FormData>({
    firstName: '',
    middleInitial: '',
    lastName: '',
    birthdate: '',
    age: '',
    gender: '',
    phone: '',
    email: '',
    address: '',
    status: 'Member',
    ministry: 'Unassigned',
    dateJoined: '',
    howTheyHeard: '',
  });

  const updateField = (field: keyof FormData, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!form.firstName.trim() || !form.lastName.trim()) {
      Alert.alert('Required', 'Please enter at least First and Last name.');
      return;
    }
    Alert.alert(
      '✅ Member Registered!',
      `${form.firstName} ${form.lastName} has been successfully registered.`,
      [{ text: 'OK', onPress: () => setForm({
        firstName: '', middleInitial: '', lastName: '',
        birthdate: '', age: '', gender: '',
        phone: '', email: '', address: '',
        status: 'Member', ministry: 'Unassigned',
        dateJoined: '', howTheyHeard: '',
      })}],
    );
  };

  return (
    <View style={styles.container}>
            {/* Page Title with Burger */}
      <View style={styles.pageHeader}>
        <Text style={styles.pageTitle}>Member's Registration Form</Text>
      </View>

      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          isLandscape && styles.scrollContentLandscape,
        ]}
        showsVerticalScrollIndicator={false}>

        {isLandscape ? (
          // ── LANDSCAPE: Two columns ──
          <View style={styles.twoCol}>
            {/* Left Column */}
            <View style={styles.leftCol}>
              {/* Photo */}
              <TouchableOpacity style={styles.photoBox}>
                <Text style={styles.photoIcon}>📷</Text>
                <Text style={styles.photoLabel}>Tap to capture photo.</Text>
              </TouchableOpacity>

              {/* How They Heard */}
              <View style={styles.card}>
                <Text style={styles.cardTitle}>How Did They Hear About Us?</Text>
                <View style={styles.chipGrid}>
                  {HOW_HEARD_OPTIONS.map(opt => (
                    <TouchableOpacity
                      key={opt}
                      style={[styles.chip, form.howTheyHeard === opt && styles.chipActive]}
                      onPress={() => updateField('howTheyHeard', opt)}>
                      <Text style={[styles.chipText, form.howTheyHeard === opt && styles.chipTextActive]}>
                        {opt}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>

            {/* Right Column */}
            <ScrollView style={styles.rightCol} showsVerticalScrollIndicator={false}>
              {renderFormSections(form, updateField)}
              <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                <Text style={styles.submitText}>Register Member</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        ) : (
          // ── PORTRAIT: Single column ──
          <View>
            {/* Photo */}
            <TouchableOpacity style={styles.photoBox}>
              <Text style={styles.photoIcon}>📷</Text>
              <Text style={styles.photoLabel}>Tap to capture photo.</Text>
            </TouchableOpacity>

            {renderFormSections(form, updateField)}

            {/* How They Heard */}
            <View style={styles.card}>
              <Text style={styles.cardTitle}>How Did They Hear About Us?</Text>
              <View style={styles.chipGrid}>
                {HOW_HEARD_OPTIONS.map(opt => (
                  <TouchableOpacity
                    key={opt}
                    style={[styles.chip, form.howTheyHeard === opt && styles.chipActive]}
                    onPress={() => updateField('howTheyHeard', opt)}>
                    <Text style={[styles.chipText, form.howTheyHeard === opt && styles.chipTextActive]}>
                      {opt}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitText}>Register Member</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

function renderFormSections(
  form: FormData,
  updateField: (field: keyof FormData, value: string) => void,
) {
  return (
    <>

      {/* Basic Information */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Basic Information</Text>

        {/* Name Row */}
        <View style={styles.row}>
          <View style={styles.colFlex2}>
            <Text style={styles.label}>First Name <Text style={styles.req}>*</Text></Text>
            <TextInput
              style={styles.input}
              placeholder="First Name"
              value={form.firstName}
              onChangeText={v => updateField('firstName', v)}
            />
          </View>
          <View style={styles.colFlex1}>
            <Text style={styles.label}>Middle Initial</Text>
            <TextInput
              style={styles.input}
              placeholder="M.I."
              value={form.middleInitial}
              onChangeText={v => updateField('middleInitial', v)}
              maxLength={2}
            />
          </View>
          <View style={styles.colFlex2}>
            <Text style={styles.label}>Last Name <Text style={styles.req}>*</Text></Text>
            <TextInput
              style={styles.input}
              placeholder="Last Name"
              value={form.lastName}
              onChangeText={v => updateField('lastName', v)}
            />
          </View>
        </View>

        {/* Birthdate / Age / Gender Row */}
        <View style={styles.row}>
          <View style={styles.colFlex2}>
            <Text style={styles.label}>Birthdate</Text>
            <TextInput
              style={styles.input}
              placeholder="MM / DD / YYYY"
              value={form.birthdate}
              onChangeText={v => updateField('birthdate', v)}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.colFlex1}>
            <Text style={styles.label}>Age</Text>
            <TextInput
              style={styles.input}
              placeholder="Age"
              value={form.age}
              onChangeText={v => updateField('age', v)}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.colFlex2}>
            <Text style={styles.label}>Gender</Text>
            <View style={styles.genderRow}>
              {['Male', 'Female'].map(g => (
                <TouchableOpacity
                  key={g}
                  style={[styles.genderBtn, form.gender === g && styles.genderBtnActive]}
                  onPress={() => updateField('gender', g)}>
                  <Text style={[styles.genderText, form.gender === g && styles.genderTextActive]}>
                    {g}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </View>

      {/* Contact & Address */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Contact & Address</Text>
        <View style={styles.row}>
          <View style={styles.colFlex1}>
            <Text style={styles.label}>Mobile Number</Text>
            <TextInput
              style={styles.input}
              placeholder="09XX XXX XXXX"
              value={form.phone}
              onChangeText={v => updateField('phone', v)}
              keyboardType="phone-pad"
            />
          </View>
          <View style={styles.colFlex1}>
            <Text style={styles.label}>Email Address (Optional)</Text>
            <TextInput
              style={styles.input}
              placeholder="email@example.com"
              value={form.email}
              onChangeText={v => updateField('email', v)}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
        </View>
        <Text style={styles.label}>Home Address</Text>
        <TextInput
          style={[styles.input, styles.inputMultiline]}
          placeholder="Street, Barangay, City..."
          value={form.address}
          onChangeText={v => updateField('address', v)}
          multiline
          numberOfLines={2}
        />
      </View>

      {/* Church Involvement */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Church Involvement</Text>
        <View style={styles.row}>
          <View style={styles.colFlex1}>
            <Text style={styles.label}>Status</Text>
            <Dropdown
              label="Select Status"
              value={form.status}
              options={['Visitor', 'New Member', 'Member', 'Leader']}
              onSelect={v => updateField('status', v)}
            />
          </View>
          <View style={styles.colFlex1}>
            <Text style={styles.label}>Ministry / Team</Text>
            <Dropdown
              label="Select Ministry"
              value={form.ministry}
              options={['Unassigned', 'Youth Ministry', 'Worship Team', 'Ushers', 'Media Team', 'Children Ministry']}
              onSelect={v => updateField('ministry', v)}
            />
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.colFlex1}>
            <Text style={styles.label}>Date Joined</Text>
            <TextInput
              style={styles.input}
              placeholder="MM / DD / YYYY"
              value={form.dateJoined}
              onChangeText={v => updateField('dateJoined', v)}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.colFlex1} />
        </View>
      </View>

      {/* Family Connections */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Family Connections Registry</Text>
        <View style={styles.row}>
          <View style={styles.colFlex2}>
            <Text style={styles.label}>Select Church Member(s)</Text>
            <Dropdown
              label="Choose profile to link..."
              value=""
              options={['— No members yet —']}
              onSelect={() => {}}
            />
          </View>
          <View style={styles.colFlex1}>
            <Text style={styles.label}>Relationship</Text>
            <Dropdown
              label="Relationship"
              value="Spouse"
              options={['Spouse', 'Parent', 'Child', 'Sibling', 'Other']}
              onSelect={() => {}}
            />
          </View>
          <TouchableOpacity style={styles.linkButton}>
            <Text style={styles.linkButtonText}>Link Member</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

