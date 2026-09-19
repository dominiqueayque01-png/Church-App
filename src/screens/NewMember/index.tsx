import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  useWindowDimensions,
  ActivityIndicator,
  Modal,
} from 'react-native';
import {
  Camera,
  ChevronDown,
  UserPlus,
  CheckCircle2,
  Check,
} from '../../components/common/Icons';

import { createMember, logAttendance } from '../../services/sync';
import { styles, dropdown } from './index.styles';
import { colors } from '../../assets/style/theme';

export type MemberRole = 'Ministry Member' | 'Youth Member' | 'Visitor';

export const MINISTRY_DEPARTMENTS = [
  'Worship Team',
  'Ushers',
  'Media Team',
  'Children Ministry',
  'General Ministry',
];

const STATUS_OPTIONS = ['Visitor', 'New Member', 'Member', 'Leader'];
const MINISTRY_OPTIONS = [
  'Unassigned',
  'Youth Ministry',
  'Worship Team',
  'Ushers',
  'Media Team',
  'Children Ministry',
  'General Ministry',
];
const HOW_HEARD_OPTIONS = [
  'Friend / Family',
  'Social Media',
  'Walk-in',
  'Flyer / Poster',
  'Other',
];

const MONTHS = [
  { label: 'Jan', value: '01' },
  { label: 'Feb', value: '02' },
  { label: 'Mar', value: '03' },
  { label: 'Apr', value: '04' },
  { label: 'May', value: '05' },
  { label: 'Jun', value: '06' },
  { label: 'Jul', value: '07' },
  { label: 'Aug', value: '08' },
  { label: 'Sep', value: '09' },
  { label: 'Oct', value: '10' },
  { label: 'Nov', value: '11' },
  { label: 'Dec', value: '12' },
];

const DAYS = Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, '0'));

const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: 100 }, (_, i) => String(CURRENT_YEAR - i));

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
        onPress={() => setOpen(true)}
        activeOpacity={0.8}>
        <Text style={dropdown.buttonText} numberOfLines={1}>{value || label}</Text>
        <ChevronDown size={16} color={colors.textMuted} strokeWidth={2} />
      </TouchableOpacity>

      <Modal
        visible={open}
        transparent
        animationType="fade"
        onRequestClose={() => setOpen(false)}>
        <TouchableOpacity
          style={dropdown.modalBackdrop}
          activeOpacity={1}
          onPress={() => setOpen(false)}>
          <View style={dropdown.modalCard}>
            <View style={dropdown.modalHeader}>
              <Text style={dropdown.modalTitle}>{label}</Text>
              <TouchableOpacity
                onPress={() => setOpen(false)}
                style={dropdown.modalCloseBtn}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                <Text style={dropdown.modalCloseText}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={dropdown.modalScroll} showsVerticalScrollIndicator>
              {options.map(opt => {
                const isSelected = value === opt;
                return (
                  <TouchableOpacity
                    key={opt}
                    style={[
                      dropdown.option,
                      isSelected && dropdown.optionActive,
                    ]}
                    onPress={() => {
                      onSelect(opt);
                      setOpen(false);
                    }}
                    activeOpacity={0.75}>
                    <Text
                      style={[
                        dropdown.optionText,
                        isSelected && dropdown.optionTextActive,
                      ]}>
                      {opt}
                    </Text>
                    {isSelected && (
                      <CheckCircle2 size={16} color={colors.gold} strokeWidth={2.4} />
                    )}
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

type Props = {
  activeEventId?: string;
  activeEventName?: string;
  onMemberCreated?: () => void;
  onNavigateToCheckIn?: () => void;
};

function NewMemberScreen({
  activeEventId,
  activeEventName,
  onMemberCreated,
  onNavigateToCheckIn,
}: Props) {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  const [mode, setMode] = useState<'quick' | 'full'>('quick');
  const [submitting, setSubmitting] = useState(false);

  // Member Role Classification
  const [role, setRole] = useState<MemberRole>('Visitor');
  const [ministryDept, setMinistryDept] = useState('Worship Team');

  // Form Fields
  const [firstName, setFirstName] = useState('');
  const [middleInitial, setMiddleInitial] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('Male');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [status, setStatus] = useState('Visitor');
  const [ministry, setMinistry] = useState('Visitor');
  const [howTheyHeard, setHowTheyHeard] = useState('Walk-in');

  // Birthday Selector Fields
  const [birthMonth, setBirthMonth] = useState('');
  const [birthDay, setBirthDay] = useState('');
  const [birthYear, setBirthYear] = useState('');

  // Emergency Contact
  const [emergencyName, setEmergencyName] = useState('');
  const [emergencyRelationship, setEmergencyRelationship] = useState('');
  const [emergencyPhone, setEmergencyPhone] = useState('');

  // Auto Check-in Toggle
  const [autoCheckIn, setAutoCheckIn] = useState(true);

  // Dynamic Age Calculation
  const computedAge = useMemo(() => {
    if (!birthYear || !birthMonth || !birthDay) return '';
    const y = Number(birthYear);
    const m = Number(birthMonth) - 1;
    const d = Number(birthDay);
    const birthDate = new Date(y, m, d);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age >= 0 ? String(age) : '';
  }, [birthYear, birthMonth, birthDay]);

  const handleRoleChange = (newRole: MemberRole) => {
    setRole(newRole);
    if (newRole === 'Ministry Member') {
      setStatus(mode === 'quick' ? 'Member' : (status === 'Visitor' ? 'Member' : status));
      setMinistry(ministryDept || 'Worship Team');
    } else if (newRole === 'Youth Member') {
      setStatus(mode === 'quick' ? 'Member' : (status === 'Visitor' ? 'Member' : status));
      setMinistry('Youth Ministry');
    } else {
      setStatus('Visitor');
      setMinistry('Visitor');
    }
  };

  const resetForm = () => {
    setFirstName('');
    setMiddleInitial('');
    setLastName('');
    setGender('Male');
    setPhone('');
    setEmail('');
    setAddress('');
    const initialRole: MemberRole = mode === 'quick' ? 'Visitor' : 'Ministry Member';
    setRole(initialRole);
    setMinistryDept('Worship Team');
    setStatus(initialRole === 'Visitor' ? 'Visitor' : 'Member');
    setMinistry(initialRole === 'Visitor' ? 'Visitor' : 'Worship Team');
    setHowTheyHeard('Walk-in');
    setBirthMonth('');
    setBirthDay('');
    setBirthYear('');
    setEmergencyName('');
    setEmergencyRelationship('');
    setEmergencyPhone('');
  };

  const handleModeChange = (newMode: 'quick' | 'full') => {
    setMode(newMode);
    if (newMode === 'quick') {
      setRole('Visitor');
      setStatus('Visitor');
      setMinistry('Visitor');
    } else {
      setRole('Ministry Member');
      setStatus('Member');
      setMinistry(ministryDept || 'Worship Team');
    }
  };

  const handleSubmit = async () => {
    if (!firstName.trim() || !lastName.trim()) {
      Alert.alert('Required Name', 'Please enter at least First Name and Last Name.');
      return;
    }

    setSubmitting(true);

    const formattedBirthday =
      birthYear && birthMonth && birthDay
        ? `${birthYear}-${birthMonth}-${birthDay}`
        : undefined;

    const finalMinistry =
      role === 'Ministry Member'
        ? (ministryDept || 'Worship Team')
        : role === 'Youth Member'
        ? 'Youth Ministry'
        : 'Visitor';

    const finalStatus =
      role === 'Visitor'
        ? 'visitor'
        : (status.toLowerCase().replace(/\s+/g, '_') || 'member');

    try {
      const newMember = await createMember({
        firstName,
        middleInitial: middleInitial || undefined,
        lastName,
        birthday: formattedBirthday,
        age: computedAge || undefined,
        gender,
        phone: phone || undefined,
        email: email || undefined,
        address: address || undefined,
        status: finalStatus,
        ministry: finalMinistry,
        howTheyHeard,
        emergencyContact:
          emergencyName && emergencyPhone
            ? {
                name: emergencyName,
                relationship: emergencyRelationship || undefined,
                phone: emergencyPhone,
              }
            : undefined,
      });

      // Handle Auto Check-in if requested
      if (autoCheckIn) {
        const targetEventId = activeEventId || '33333333-3333-3333-3333-333333333302';
        await logAttendance(newMember.id, targetEventId, role === 'Visitor');
      }

      setSubmitting(false);

      if (onMemberCreated) {
        onMemberCreated();
      }

      const alertButtons: any[] = [
        {
          text: 'Register Another',
          onPress: resetForm,
        },
      ];

      if (onNavigateToCheckIn) {
        alertButtons.push({
          text: 'View Check-In Terminal',
          onPress: () => {
            resetForm();
            onNavigateToCheckIn();
          },
        });
      }

      Alert.alert(
        'Registration Complete! 🎉',
        `${firstName.trim()} ${lastName.trim()} was successfully registered${
          autoCheckIn ? ` and checked in to ${activeEventName || "today's service"}` : ''
        }.`,
        alertButtons,
      );
    } catch (err: any) {
      setSubmitting(false);
      console.log('Error creating member:', err);
      Alert.alert(
        'Registration Notice',
        err?.message || 'Could not complete registration. Please verify connection.',
      );
    }
  };

  // ── Role Selection Component ──
  const renderRoleSelection = () => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Congregation Role & Classification</Text>
      <View style={styles.roleCardRow}>
        <TouchableOpacity
          style={[
            styles.roleOptionCard,
            role === 'Ministry Member' && styles.roleOptionCardActive,
          ]}
          onPress={() => handleRoleChange('Ministry Member')}
          activeOpacity={0.8}>
          <Text
            style={[
              styles.roleOptionTitle,
              role === 'Ministry Member' && styles.roleOptionTitleActive,
            ]}>
            🛡️ Ministry Member
          </Text>
          <Text style={styles.roleOptionDesc}>
            Serves Saturday & facilitates Sunday
          </Text>
          {role === 'Ministry Member' && (
            <View style={styles.roleBadgeMini}>
              <Text style={styles.roleBadgeMiniText}>{ministryDept}</Text>
            </View>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.roleOptionCard,
            role === 'Youth Member' && styles.roleOptionCardActive,
          ]}
          onPress={() => handleRoleChange('Youth Member')}
          activeOpacity={0.8}>
          <Text
            style={[
              styles.roleOptionTitle,
              role === 'Youth Member' && styles.roleOptionTitleActive,
            ]}>
            🌟 Youth Member
          </Text>
          <Text style={styles.roleOptionDesc}>
            Youth fellowship attendee
          </Text>
          {role === 'Youth Member' && (
            <View style={styles.roleBadgeMini}>
              <Text style={styles.roleBadgeMiniText}>Youth Fellowship</Text>
            </View>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.roleOptionCard,
            role === 'Visitor' && styles.roleOptionCardActive,
          ]}
          onPress={() => handleRoleChange('Visitor')}
          activeOpacity={0.8}>
          <Text
            style={[
              styles.roleOptionTitle,
              role === 'Visitor' && styles.roleOptionTitleActive,
            ]}>
            🤝 Visitor
          </Text>
          <Text style={styles.roleOptionDesc}>
            First-time / guest intake
          </Text>
          {role === 'Visitor' && (
            <View style={styles.roleBadgeMini}>
              <Text style={styles.roleBadgeMiniText}>Guest</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {role === 'Ministry Member' && (
        <View style={{ marginTop: 6 }}>
          <Text style={styles.label}>Assigned Ministry Department</Text>
          <Dropdown
            label="Select Department"
            value={ministryDept}
            options={MINISTRY_DEPARTMENTS}
            onSelect={dept => {
              setMinistryDept(dept);
              setMinistry(dept);
            }}
          />
        </View>
      )}
    </View>
  );

  // ── Birthday Selector Component ──
  const renderBirthdaySection = () => {
    const monthLabel = MONTHS.find(m => m.value === birthMonth)?.label || 'Month';
    return (
      <View style={{ marginTop: 6, marginBottom: 10 }}>
        <Text style={styles.label}>
          Birthday (Date of Birth)
        </Text>
        <View style={styles.dateRow}>
          {/* Month */}
          <View style={styles.dateColMonth}>
            <Dropdown
              label="Month"
              value={monthLabel}
              options={MONTHS.map(m => m.label)}
              onSelect={lbl => {
                const found = MONTHS.find(m => m.label === lbl);
                if (found) setBirthMonth(found.value);
              }}
            />
          </View>

          {/* Day */}
          <View style={styles.dateColDay}>
            <Dropdown
              label="Day"
              value={birthDay || 'Day'}
              options={DAYS}
              onSelect={val => setBirthDay(val)}
            />
          </View>

          {/* Year */}
          <View style={styles.dateColYear}>
            <Dropdown
              label="Year"
              value={birthYear || 'Year'}
              options={YEARS}
              onSelect={val => setBirthYear(val)}
            />
          </View>
        </View>

        {/* Auto Computed Age Badge */}
        {computedAge ? (
          <View style={styles.ageBadge}>
            <Text style={styles.ageBadgeText}>
              ✓ Age: {computedAge} years old (Computed)
            </Text>
          </View>
        ) : (
          <Text style={{ fontSize: 11, color: colors.textMuted, marginTop: 4 }}>
            Select Month, Day & Year to auto-compute age
          </Text>
        )}
      </View>
    );
  };

  // ── Left Card: Photo / Avatar & Quick Source ──
  const renderLeftPanel = () => (
    <View style={styles.leftColInner}>
      <View style={styles.photoBox}>
        <View style={styles.photoIconWrap}>
          <Camera size={22} color={colors.gold} strokeWidth={2} />
        </View>
        <Text style={styles.photoTitle}>Sanctuary Directory</Text>
        <Text style={styles.photoLabel}>Photo auto-initials assigned</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>How Did You Hear About Us?</Text>
        <View style={styles.chipGrid}>
          {HOW_HEARD_OPTIONS.map(opt => (
            <TouchableOpacity
              key={opt}
              style={[
                styles.chip,
                howTheyHeard === opt && styles.chipActive,
              ]}
              onPress={() => setHowTheyHeard(opt)}
              activeOpacity={0.8}>
              <Text
                style={[
                  styles.chipText,
                  howTheyHeard === opt && styles.chipTextActive,
                ]}>
                {opt}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* ── Page Header ── */}
      <View style={styles.pageHeader}>
        <Text style={styles.pageTitle}>Member Registration</Text>
        <Text style={styles.pageSubtitle}>
          Record sanctuary intake or update congregation records
        </Text>
      </View>

      {/* ── Scrollable Body ── */}
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          isLandscape && styles.scrollContentLandscape,
        ]}
        showsVerticalScrollIndicator={false}>

        {/* ── Mode Toggle Switch ── */}
        <View style={styles.modeContainer}>
          <TouchableOpacity
            style={[styles.modeTab, mode === 'quick' && styles.modeTabActive]}
            onPress={() => handleModeChange('quick')}
            activeOpacity={0.85}>
            <Text style={[styles.modeTabText, mode === 'quick' && styles.modeTabTextActive]}>
              ⚡ Quick Visitor Intake
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.modeTab, mode === 'full' && styles.modeTabActive]}
            onPress={() => handleModeChange('full')}
            activeOpacity={0.85}>
            <Text style={[styles.modeTabText, mode === 'full' && styles.modeTabTextActive]}>
              📋 Full Member Profile
            </Text>
          </TouchableOpacity>
        </View>

        {isLandscape ? (
          <View style={styles.twoCol}>
            <View style={styles.leftCol}>
              {renderLeftPanel()}
            </View>

            <View style={styles.rightCol}>
              {/* Card 0: Role & Classification */}
              {renderRoleSelection()}

              {/* Card 1: Personal Details */}
              <View style={styles.card}>
                <Text style={styles.cardTitle}>
                  {mode === 'quick' ? 'Visitor Information' : 'Personal Details'}
                </Text>

                <View style={styles.row}>
                  <View style={styles.colFlex2}>
                    <Text style={styles.label}>
                      First Name <Text style={styles.req}>*</Text>
                    </Text>
                    <TextInput
                      style={styles.input}
                      placeholder="e.g. John"
                      placeholderTextColor={colors.textMuted}
                      value={firstName}
                      onChangeText={setFirstName}
                    />
                  </View>

                  {mode === 'full' && (
                    <View style={styles.colFlex1}>
                      <Text style={styles.label}>M.I.</Text>
                      <TextInput
                        style={styles.input}
                        placeholder="A."
                        placeholderTextColor={colors.textMuted}
                        value={middleInitial}
                        onChangeText={setMiddleInitial}
                        maxLength={2}
                      />
                    </View>
                  )}

                  <View style={styles.colFlex2}>
                    <Text style={styles.label}>
                      Last Name <Text style={styles.req}>*</Text>
                    </Text>
                    <TextInput
                      style={styles.input}
                      placeholder="e.g. Santos"
                      placeholderTextColor={colors.textMuted}
                      value={lastName}
                      onChangeText={setLastName}
                    />
                  </View>
                </View>

                {/* Birthday Selector */}
                {renderBirthdaySection()}

                {/* Gender */}
                {mode === 'full' && (
                  <View style={{ marginTop: 4 }}>
                    <Text style={styles.label}>Gender</Text>
                    <View style={styles.genderRow}>
                      {['Male', 'Female'].map(g => (
                        <TouchableOpacity
                          key={g}
                          style={[
                            styles.genderBtn,
                            gender === g && styles.genderBtnActive,
                          ]}
                          onPress={() => setGender(g)}
                          activeOpacity={0.8}>
                          <Text
                            style={[
                              styles.genderText,
                              gender === g && styles.genderTextActive,
                            ]}>
                            {g}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>
                )}
              </View>

              {/* Card 2: Contact Information */}
              <View style={styles.card}>
                <Text style={styles.cardTitle}>Contact Details</Text>
                <View style={styles.row}>
                  <View style={styles.colFlex1}>
                    <Text style={styles.label}>Mobile Phone Number</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="09XX XXX XXXX"
                      placeholderTextColor={colors.textMuted}
                      value={phone}
                      onChangeText={setPhone}
                      keyboardType="phone-pad"
                    />
                  </View>

                  {mode === 'full' && (
                    <View style={styles.colFlex1}>
                      <Text style={styles.label}>Email Address</Text>
                      <TextInput
                        style={styles.input}
                        placeholder="member@email.com"
                        placeholderTextColor={colors.textMuted}
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                      />
                    </View>
                  )}
                </View>

                {mode === 'full' && (
                  <>
                    <Text style={styles.label}>Home Street Address</Text>
                    <TextInput
                      style={[styles.input, styles.inputMultiline]}
                      placeholder="Street, Barangay, City / Province..."
                      placeholderTextColor={colors.textMuted}
                      value={address}
                      onChangeText={setAddress}
                      multiline
                      numberOfLines={2}
                    />
                  </>
                )}
              </View>

              {/* Card 3: Emergency Contact (Full Mode) */}
              {mode === 'full' && (
                <View style={styles.card}>
                  <Text style={styles.cardTitle}>Emergency Contact</Text>
                  <View style={styles.row}>
                    <View style={styles.colFlex2}>
                      <Text style={styles.label}>Contact Person Name</Text>
                      <TextInput
                        style={styles.input}
                        placeholder="e.g. Maria Santos (Spouse/Parent)"
                        placeholderTextColor={colors.textMuted}
                        value={emergencyName}
                        onChangeText={setEmergencyName}
                      />
                    </View>
                    <View style={styles.colFlex1}>
                      <Text style={styles.label}>Relationship</Text>
                      <TextInput
                        style={styles.input}
                        placeholder="e.g. Mother"
                        placeholderTextColor={colors.textMuted}
                        value={emergencyRelationship}
                        onChangeText={setEmergencyRelationship}
                      />
                    </View>
                  </View>

                  <Text style={styles.label}>Emergency Mobile Number</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="09XX XXX XXXX"
                    placeholderTextColor={colors.textMuted}
                    value={emergencyPhone}
                    onChangeText={setEmergencyPhone}
                    keyboardType="phone-pad"
                  />
                </View>
              )}

              {/* Card 4: Church Involvement (Full Mode) */}
              {mode === 'full' && (
                <View style={styles.card}>
                  <Text style={styles.cardTitle}>Sanctuary Records & Standing</Text>
                  <View style={styles.row}>
                    <View style={styles.colFlex1}>
                      <Text style={styles.label}>Membership Status Tier</Text>
                      <Dropdown
                        label="Select Status"
                        value={status}
                        options={STATUS_OPTIONS}
                        onSelect={setStatus}
                      />
                    </View>

                    {role === 'Ministry Member' ? (
                      <View style={styles.colFlex1}>
                        <Text style={styles.label}>Ministry Placement</Text>
                        <Dropdown
                          label="Select Department"
                          value={ministryDept}
                          options={MINISTRY_DEPARTMENTS}
                          onSelect={dept => {
                            setMinistryDept(dept);
                            setMinistry(dept);
                          }}
                        />
                      </View>
                    ) : (
                      <View style={styles.colFlex1}>
                        <Text style={styles.label}>Assigned Role</Text>
                        <TextInput
                          style={[
                            styles.input,
                            { backgroundColor: '#f5f0e8', color: colors.textSecondary },
                          ]}
                          value={role}
                          editable={false}
                        />
                      </View>
                    )}
                  </View>
                </View>
              )}

              {/* Auto Check-in Toggle Card */}
              <TouchableOpacity
                style={styles.autoCheckInCard}
                onPress={() => setAutoCheckIn(!autoCheckIn)}
                activeOpacity={0.8}>
                <View style={styles.autoCheckInLeft}>
                  <Text style={styles.autoCheckInTitle}>
                    Instant Attendance Check-In
                  </Text>
                  <Text style={styles.autoCheckInSubtitle}>
                    Automatically record attendee as Present for {activeEventName || "today's service"} upon registration
                  </Text>
                </View>
                <View style={[styles.checkbox, autoCheckIn && styles.checkboxActive]}>
                  {autoCheckIn && <Check size={14} color="#181614" strokeWidth={3} />}
                </View>
              </TouchableOpacity>

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
                    <Text style={styles.submitText}>
                      {mode === 'quick' ? `Register & Check In ${role}` : 'Save Member Record'}
                    </Text>
                  </>
                )}
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          /* Portrait Layout */
          <View>
            {renderLeftPanel()}
            {renderRoleSelection()}
            {/* Form cards follow */}
            <View style={styles.card}>
              <Text style={styles.cardTitle}>
                {mode === 'quick' ? 'Basic Information' : 'Personal Details'}
              </Text>
              <Text style={styles.label}>First Name *</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. John"
                placeholderTextColor={colors.textMuted}
                value={firstName}
                onChangeText={setFirstName}
              />
              <Text style={styles.label}>Last Name *</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. Santos"
                placeholderTextColor={colors.textMuted}
                value={lastName}
                onChangeText={setLastName}
              />
              {renderBirthdaySection()}
            </View>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>Contact Details</Text>
              <Text style={styles.label}>Mobile Phone Number</Text>
              <TextInput
                style={styles.input}
                placeholder="09XX XXX XXXX"
                placeholderTextColor={colors.textMuted}
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
              />
            </View>

            <TouchableOpacity
              style={styles.autoCheckInCard}
              onPress={() => setAutoCheckIn(!autoCheckIn)}
              activeOpacity={0.8}>
              <View style={styles.autoCheckInLeft}>
                <Text style={styles.autoCheckInTitle}>Instant Check-In</Text>
                <Text style={styles.autoCheckInSubtitle}>
                  Automatically mark present for today's service
                </Text>
              </View>
              <View style={[styles.checkbox, autoCheckIn && styles.checkboxActive]}>
                {autoCheckIn && <Check size={14} color="#181614" strokeWidth={3} />}
              </View>
            </TouchableOpacity>

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
                  <Text style={styles.submitText}>
                    {mode === 'quick' ? `Register & Check In ${role}` : 'Save Member Record'}
                  </Text>
                </>
              )}
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

export default React.memo(NewMemberScreen);
