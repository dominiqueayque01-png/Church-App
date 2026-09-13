import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  useWindowDimensions,
  ActivityIndicator,
} from 'react-native';
import {
  Camera,
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Users,
  ChevronDown,
  ChevronUp,
  UserPlus,
  CheckCircle2,
  Sparkles,
} from '../../components/common/Icons';

import { createMember } from '../../services/sync';
import { styles, dropdown } from './index.styles';
import { colors } from '../../assets/style/theme';

const STATUS_OPTIONS = ['Visitor', 'New Member', 'Member', 'Leader'];
const MINISTRY_OPTIONS = [
  'Unassigned',
  'Youth Ministry',
  'Worship Team',
  'Ushers',
  'Media Team',
  'Children Ministry',
];
const HOW_HEARD_OPTIONS = [
  'Friend / Family',
  'Social Media',
  'Walk-in',
  'Flyer / Poster',
  'Other',
];

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
        style={[dropdown.button, open && dropdown.buttonOpen]}
        onPress={() => setOpen(!open)}
        activeOpacity={0.8}>
        <Text style={dropdown.buttonText}>{value || label}</Text>
        {open ? (
          <ChevronUp size={16} color={colors.gold} strokeWidth={2} />
        ) : (
          <ChevronDown size={16} color={colors.textMuted} strokeWidth={2} />
        )}
      </TouchableOpacity>
      {open && (
        <View style={dropdown.menu}>
          {options.map(opt => (
            <TouchableOpacity
              key={opt}
              style={[
                dropdown.option,
                value === opt && dropdown.optionActive,
              ]}
              onPress={() => {
                onSelect(opt);
                setOpen(false);
              }}
              activeOpacity={0.75}>
              <Text
                style={[
                  dropdown.optionText,
                  value === opt && dropdown.optionTextActive,
                ]}>
                {opt}
              </Text>
              {value === opt && (
                <CheckCircle2 size={14} color={colors.gold} strokeWidth={2.4} />
              )}
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

export default function NewMemberScreen() {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState<FormData>({
    firstName: '',
    middleInitial: '',
    lastName: '',
    birthdate: '',
    age: '',
    gender: 'Male',
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

  const handleSubmit = async () => {
    if (!form.firstName.trim() || !form.lastName.trim()) {
      Alert.alert('Required Information', 'Please provide at least First and Last name.');
      return;
    }

    setSubmitting(true);

    try {
      await createMember({
        firstName: form.firstName,
        middleInitial: form.middleInitial,
        lastName: form.lastName,
        birthday: form.birthdate,
        age: form.age,
        gender: form.gender,
        phone: form.phone,
        email: form.email,
        address: form.address,
        status: form.status,
        ministry: form.ministry,
        joinedDate: form.dateJoined,
        howTheyHeard: form.howTheyHeard,
      });

      setSubmitting(false);

      Alert.alert(
        'Member Registered',
        `${form.firstName} ${form.lastName} has been successfully registered to the sanctuary directory.`,
        [
          {
            text: 'Register Another',
            onPress: () =>
              setForm({
                firstName: '',
                middleInitial: '',
                lastName: '',
                birthdate: '',
                age: '',
                gender: 'Male',
                phone: '',
                email: '',
                address: '',
                status: 'Member',
                ministry: 'Unassigned',
                dateJoined: '',
                howTheyHeard: '',
              }),
          },
        ],
      );
    } catch (e) {
      console.log(e);
      setSubmitting(false);
      Alert.alert('Registration Error', 'Could not register member. Please check local database connection.');
    }
  };

  const renderPhotoAndSource = () => (
    <View style={styles.leftColInner}>
      {/* Photo Capture Area */}
      <TouchableOpacity style={styles.photoBox} activeOpacity={0.8}>
        <View style={styles.photoIconWrap}>
          <Camera size={26} color={colors.gold} strokeWidth={2} />
        </View>
        <Text style={styles.photoTitle}>Member Portrait</Text>
        <Text style={styles.photoLabel}>Tap to take or select photo</Text>
      </TouchableOpacity>

      {/* Outreach Source */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>How Did They Hear About Us?</Text>
        <View style={styles.chipGrid}>
          {HOW_HEARD_OPTIONS.map(opt => (
            <TouchableOpacity
              key={opt}
              style={[
                styles.chip,
                form.howTheyHeard === opt && styles.chipActive,
              ]}
              onPress={() => updateField('howTheyHeard', opt)}
              activeOpacity={0.75}>
              <Text
                style={[
                  styles.chipText,
                  form.howTheyHeard === opt && styles.chipTextActive,
                ]}>
                {opt}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );

  const renderFormFields = () => (
    <>
      {/* Card 1: Personal Details */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Personal Information</Text>

        {/* First, MI, Last */}
        <View style={styles.row}>
          <View style={styles.colFlex2}>
            <Text style={styles.label}>
              First Name <Text style={styles.req}>*</Text>
            </Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. John"
              placeholderTextColor={colors.textMuted}
              value={form.firstName}
              onChangeText={v => updateField('firstName', v)}
            />
          </View>

          <View style={styles.colFlex1}>
            <Text style={styles.label}>M.I.</Text>
            <TextInput
              style={styles.input}
              placeholder="A."
              placeholderTextColor={colors.textMuted}
              value={form.middleInitial}
              onChangeText={v => updateField('middleInitial', v)}
              maxLength={2}
            />
          </View>

          <View style={styles.colFlex2}>
            <Text style={styles.label}>
              Last Name <Text style={styles.req}>*</Text>
            </Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. Santos"
              placeholderTextColor={colors.textMuted}
              value={form.lastName}
              onChangeText={v => updateField('lastName', v)}
            />
          </View>
        </View>

        {/* Birthdate, Age, Gender */}
        <View style={styles.row}>
          <View style={styles.colFlex2}>
            <Text style={styles.label}>Birthdate</Text>
            <TextInput
              style={styles.input}
              placeholder="MM / DD / YYYY"
              placeholderTextColor={colors.textMuted}
              value={form.birthdate}
              onChangeText={v => updateField('birthdate', v)}
            />
          </View>

          <View style={styles.colFlex1}>
            <Text style={styles.label}>Age</Text>
            <TextInput
              style={styles.input}
              placeholder="Age"
              placeholderTextColor={colors.textMuted}
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
                  style={[
                    styles.genderBtn,
                    form.gender === g && styles.genderBtnActive,
                  ]}
                  onPress={() => updateField('gender', g)}
                  activeOpacity={0.8}>
                  <Text
                    style={[
                      styles.genderText,
                      form.gender === g && styles.genderTextActive,
                    ]}>
                    {g}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </View>

      {/* Card 2: Contact & Residence */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Contact & Residence</Text>

        <View style={styles.row}>
          <View style={styles.colFlex1}>
            <Text style={styles.label}>Mobile Phone Number</Text>
            <TextInput
              style={styles.input}
              placeholder="09XX XXX XXXX"
              placeholderTextColor={colors.textMuted}
              value={form.phone}
              onChangeText={v => updateField('phone', v)}
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.colFlex1}>
            <Text style={styles.label}>Email Address (Optional)</Text>
            <TextInput
              style={styles.input}
              placeholder="member@email.com"
              placeholderTextColor={colors.textMuted}
              value={form.email}
              onChangeText={v => updateField('email', v)}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
        </View>

        <Text style={styles.label}>Home Street Address</Text>
        <TextInput
          style={[styles.input, styles.inputMultiline]}
          placeholder="Street, Barangay, City / Province..."
          placeholderTextColor={colors.textMuted}
          value={form.address}
          onChangeText={v => updateField('address', v)}
          multiline
          numberOfLines={2}
        />
      </View>

      {/* Card 3: Church Involvement */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Church Involvement</Text>

        <View style={styles.row}>
          <View style={styles.colFlex1}>
            <Text style={styles.label}>Membership Status</Text>
            <Dropdown
              label="Select Status"
              value={form.status}
              options={STATUS_OPTIONS}
              onSelect={v => updateField('status', v)}
            />
          </View>

          <View style={styles.colFlex1}>
            <Text style={styles.label}>Ministry Placement</Text>
            <Dropdown
              label="Select Ministry"
              value={form.ministry}
              options={MINISTRY_OPTIONS}
              onSelect={v => updateField('ministry', v)}
            />
          </View>
        </View>

        <View style={[styles.row, { marginTop: 14 }]}>
          <View style={styles.colFlex1}>
            <Text style={styles.label}>Date Joined</Text>
            <TextInput
              style={styles.input}
              placeholder="MM / DD / YYYY"
              placeholderTextColor={colors.textMuted}
              value={form.dateJoined}
              onChangeText={v => updateField('dateJoined', v)}
            />
          </View>
          <View style={styles.colFlex1} />
        </View>
      </View>

      {/* Submit CTA */}
      <TouchableOpacity
        style={[styles.submitButton, submitting && styles.submitButtonDisabled]}
        onPress={handleSubmit}
        disabled={submitting}
        activeOpacity={0.85}>
        {submitting ? (
          <ActivityIndicator size="small" color="#181614" />
        ) : (
          <>
            <UserPlus size={18} color="#181614" strokeWidth={2.4} />
            <Text style={styles.submitText}>Complete Registration</Text>
          </>
        )}
      </TouchableOpacity>
    </>
  );

  return (
    <View style={styles.container}>
      {/* ── Page Header ── */}
      <View style={styles.pageHeader}>
        <Text style={styles.pageTitle}>Member Registration</Text>
        <Text style={styles.pageSubtitle}>
          Record new attendee or transfer profile for church records
        </Text>
      </View>

      {/* ── Scrollable Body ── */}
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          isLandscape && styles.scrollContentLandscape,
        ]}
        showsVerticalScrollIndicator={false}>
        {isLandscape ? (
          <View style={styles.twoCol}>
            <View style={styles.leftCol}>
              {renderPhotoAndSource()}
            </View>
            <View style={styles.rightCol}>
              {renderFormFields()}
            </View>
          </View>
        ) : (
          <View>
            {renderPhotoAndSource()}
            {renderFormFields()}
          </View>
        )}
      </ScrollView>
    </View>
  );
}
