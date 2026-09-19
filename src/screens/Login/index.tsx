import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  useWindowDimensions,
  KeyboardAvoidingView,
  Platform,
  Animated,
  ActivityIndicator,
} from 'react-native';
import {
  User,
  Lock,
  Eye,
  EyeOff,
  Cross,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
} from '../../components/common/Icons';

import { styles } from './index.styles';
import { colors } from '../../assets/style/theme';
import { APP_CONFIG } from '../../constants/app';

const MOCK_USERS = [
  { id: '1', username: 'admin', password: 'admin123', role: 'Admin', name: 'System Admin' },
  { id: '2', username: 'usher1', password: 'usher123', role: 'Usher', name: 'John Usher' },
  { id: '3', username: 'usher2', password: 'usher123', role: 'Usher', name: 'Maria Usher' },
];

type Props = {
  onLoginSuccess: (user: {
    id: string;
    name: string;
    role: string;
    username: string;
  }) => void;
};

export default function LoginScreen({ onLoginSuccess }: Props) {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [usernameFocused, setUsernameFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  // Entrance animations
  const sealScale = useRef(new Animated.Value(0.85)).current;
  const sealOpacity = useRef(new Animated.Value(0)).current;
  const cardSlide = useRef(new Animated.Value(40)).current;
  const cardOpacity = useRef(new Animated.Value(0)).current;
  const btnScale = useRef(new Animated.Value(1)).current;
  const whiteFlash = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(sealOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.spring(sealScale, {
        toValue: 1,
        tension: 50,
        friction: 8,
        useNativeDriver: true,
      }),
      Animated.timing(cardOpacity, {
        toValue: 1,
        duration: 450,
        delay: 150,
        useNativeDriver: true,
      }),
      Animated.spring(cardSlide, {
        toValue: 0,
        tension: 60,
        friction: 9,
        delay: 150,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleLogin = (userOverride?: typeof MOCK_USERS[0]) => {
    const finalUsername = userOverride ? userOverride.username : username;
    const finalPassword = userOverride ? userOverride.password : password;

    if (!finalUsername.trim() || !finalPassword.trim()) {
      Animated.sequence([
        Animated.timing(cardSlide, { toValue: -8, duration: 50, useNativeDriver: true }),
        Animated.timing(cardSlide, { toValue: 8, duration: 50, useNativeDriver: true }),
        Animated.timing(cardSlide, { toValue: -5, duration: 50, useNativeDriver: true }),
        Animated.timing(cardSlide, { toValue: 5, duration: 50, useNativeDriver: true }),
        Animated.timing(cardSlide, { toValue: 0, duration: 50, useNativeDriver: true }),
      ]).start();
      Alert.alert('Required', 'Please enter your username and password.');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const foundUser = MOCK_USERS.find(
        u =>
          u.username.toLowerCase() === finalUsername.toLowerCase().trim() &&
          u.password === finalPassword,
      );

      if (foundUser) {
        Animated.timing(whiteFlash, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start(() => {
          setLoading(false);
          onLoginSuccess({
            id: foundUser.id,
            name: foundUser.name,
            role: foundUser.role,
            username: foundUser.username,
          });
        });
      } else {
        setLoading(false);
        Animated.sequence([
          Animated.timing(cardSlide, { toValue: -10, duration: 60, useNativeDriver: true }),
          Animated.timing(cardSlide, { toValue: 10, duration: 60, useNativeDriver: true }),
          Animated.timing(cardSlide, { toValue: -6, duration: 60, useNativeDriver: true }),
          Animated.timing(cardSlide, { toValue: 6, duration: 60, useNativeDriver: true }),
          Animated.timing(cardSlide, { toValue: 0, duration: 60, useNativeDriver: true }),
        ]).start();
        Alert.alert('Authentication Failed', 'Invalid username or password. Please try again or tap a demo pill.');
      }
    }, 600);
  };

  const handleQuickDemo = (user: typeof MOCK_USERS[0]) => {
    setUsername(user.username);
    setPassword(user.password);
  };

  const renderBranding = () => (
    <Animated.View
      style={[
        isLandscape ? styles.landscapeBrand : styles.portraitBrand,
        {
          opacity: sealOpacity,
          transform: [{ scale: sealScale }],
        },
      ]}>
      {/* Sacred Seal Double Ring */}
      <View style={styles.sealOuterRing}>
        <View style={styles.sealInnerRing}>
          <Cross size={46} color={colors.gold} strokeWidth={2.4} />
        </View>
      </View>

      <Text style={styles.churchName}>{APP_CONFIG.CHURCH_NAME_UPPER}</Text>
      <View style={styles.goldDividerLine} />
      <Text style={styles.portalSubtitle}>MEMBERS PROFILING SYSTEM</Text>
      <View style={styles.stationBadge}>
        <Sparkles size={12} color={colors.goldLight} strokeWidth={2} />
        <Text style={styles.stationBadgeText}>USHER TABLET STATION</Text>
      </View>
    </Animated.View>
  );

  const renderForm = () => (
    <Animated.View
      style={[
        styles.card,
        isLandscape && styles.cardLandscape,
        {
          opacity: cardOpacity,
          transform: [{ translateY: cardSlide }],
        },
      ]}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>Sign In</Text>
        <Text style={styles.cardSubtitle}>
          Enter your terminal credentials to initiate service check-in
        </Text>
      </View>

      {/* Username Field */}
      <View style={styles.fieldGroup}>
        <Text style={styles.fieldLabel}>USERNAME</Text>
        <View
          style={[
            styles.inputBox,
            usernameFocused && styles.inputBoxFocused,
          ]}>
          <User
            size={18}
            color={usernameFocused ? colors.goldLight : colors.sidebarTextMuted}
            strokeWidth={2}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Username (e.g. usher1)"
            placeholderTextColor="rgba(255, 255, 255, 0.35)"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
            autoCorrect={false}
            onFocus={() => setUsernameFocused(true)}
            onBlur={() => setUsernameFocused(false)}
          />
        </View>
      </View>

      {/* Password Field */}
      <View style={styles.fieldGroup}>
        <Text style={styles.fieldLabel}>PASSWORD</Text>
        <View
          style={[
            styles.inputBox,
            passwordFocused && styles.inputBoxFocused,
          ]}>
          <Lock
            size={18}
            color={passwordFocused ? colors.goldLight : colors.sidebarTextMuted}
            strokeWidth={2}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Password"
            placeholderTextColor="rgba(255, 255, 255, 0.35)"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            autoCapitalize="none"
            autoCorrect={false}
            onFocus={() => setPasswordFocused(true)}
            onBlur={() => setPasswordFocused(false)}
          />
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.eyeToggle}
            activeOpacity={0.7}>
            {showPassword ? (
              <EyeOff size={18} color={colors.sidebarTextMuted} strokeWidth={2} />
            ) : (
              <Eye size={18} color={colors.sidebarTextMuted} strokeWidth={2} />
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* Sign In CTA Button */}
      <TouchableOpacity
        style={[styles.submitButton, loading && styles.submitButtonLoading]}
        onPress={() => handleLogin()}
        disabled={loading}
        activeOpacity={0.85}>
        {loading ? (
          <ActivityIndicator size="small" color="#181614" />
        ) : (
          <>
            <Text style={styles.submitButtonText}>Authorize Terminal</Text>
            <ChevronRight size={18} color="#181614" strokeWidth={2.4} />
          </>
        )}
      </TouchableOpacity>

      {/* Quick Demo Access Pills */}
      <View style={styles.demoSection}>
        <Text style={styles.demoSectionTitle}>QUICK DEMO CREDENTIALS</Text>
        <View style={styles.demoPillRow}>
          {MOCK_USERS.map(user => (
            <TouchableOpacity
              key={user.id}
              style={[
                styles.demoPill,
                username === user.username && styles.demoPillActive,
              ]}
              onPress={() => handleQuickDemo(user)}
              activeOpacity={0.75}>
              <Text
                style={[
                  styles.demoPillText,
                  username === user.username && styles.demoPillTextActive,
                ]}>
                {user.username}
              </Text>
              <Text style={styles.demoPillRole}>({user.role})</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Animated.View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      {/* Deep Sanctuary Background & Ambient Aura */}
      <View style={styles.background}>
        <View style={styles.goldAuraTop} />
        <View style={styles.goldAuraBottom} />
      </View>

      {/* Viewport Content */}
      <View style={styles.viewport}>
        {isLandscape ? (
          <View style={styles.landscapeContainer}>
            {renderBranding()}
            <View style={styles.landscapeFormWrapper}>
              {renderForm()}
            </View>
          </View>
        ) : (
          <View style={styles.portraitContainer}>
            {renderBranding()}
            {renderForm()}
          </View>
        )}
      </View>

      {/* White Flash Transition on Successful Auth */}
      <Animated.View
        pointerEvents="none"
        style={[styles.flashOverlay, { opacity: whiteFlash }]}
      />
    </KeyboardAvoidingView>
  );
}