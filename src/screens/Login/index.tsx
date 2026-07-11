import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  useWindowDimensions,
  KeyboardAvoidingView,
  Platform,
  Animated,
} from 'react-native';

import { styles, dots } from './index.styles';

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

  // ── Entrance animations ──
  const logoScale = useRef(new Animated.Value(0)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const brandSlide = useRef(new Animated.Value(-40)).current;
  const cardSlide = useRef(new Animated.Value(60)).current;
  const cardOpacity = useRef(new Animated.Value(0)).current;

  // ── Success transition ──
  const successScale = useRef(new Animated.Value(1)).current;
  const successOpacity = useRef(new Animated.Value(1)).current;
  const whiteFlash = useRef(new Animated.Value(0)).current;

  // ── Button press ──
  const btnScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Staggered entrance
    Animated.sequence([
      // Logo pops in
      Animated.parallel([
        Animated.spring(logoScale, {
          toValue: 1,
          tension: 60,
          friction: 8,
          useNativeDriver: true,
        }),
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.spring(brandSlide, {
          toValue: 0,
          tension: 60,
          friction: 10,
          useNativeDriver: true,
        }),
      ]),
      // Card slides up
      Animated.parallel([
        Animated.spring(cardSlide, {
          toValue: 0,
          tension: 70,
          friction: 10,
          useNativeDriver: true,
        }),
        Animated.timing(cardOpacity, {
          toValue: 1,
          duration: 350,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, []);

  const handleButtonPressIn = () => {
    Animated.spring(btnScale, {
      toValue: 0.96,
      tension: 200,
      friction: 10,
      useNativeDriver: true,
    }).start();
  };

  const handleButtonPressOut = () => {
    Animated.spring(btnScale, {
      toValue: 1,
      tension: 200,
      friction: 10,
      useNativeDriver: true,
    }).start();
  };

  const handleLogin = () => {
    if (!username.trim() || !password.trim()) {
      // Shake card on error
      Animated.sequence([
        Animated.timing(cardSlide, { toValue: -10, duration: 60, useNativeDriver: true }),
        Animated.timing(cardSlide, { toValue: 10, duration: 60, useNativeDriver: true }),
        Animated.timing(cardSlide, { toValue: -8, duration: 60, useNativeDriver: true }),
        Animated.timing(cardSlide, { toValue: 8, duration: 60, useNativeDriver: true }),
        Animated.timing(cardSlide, { toValue: 0, duration: 60, useNativeDriver: true }),
      ]).start();
      Alert.alert('Required', 'Please enter your username and password.');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const user = MOCK_USERS.find(
        u =>
          u.username.toLowerCase() === username.toLowerCase().trim() &&
          u.password === password,
      );

      if (user) {
        // Success transition — scale up + white flash
        Animated.sequence([
          // Button confirms
          Animated.spring(btnScale, {
            toValue: 0.94,
            tension: 200,
            friction: 8,
            useNativeDriver: true,
          }),
          Animated.delay(100),
          // Everything scales up and fades
          Animated.parallel([
            Animated.timing(successScale, {
              toValue: 1.08,
              duration: 350,
              useNativeDriver: true,
            }),
            Animated.timing(successOpacity, {
              toValue: 0,
              duration: 350,
              useNativeDriver: true,
            }),
            Animated.timing(whiteFlash, {
              toValue: 1,
              duration: 350,
              useNativeDriver: true,
            }),
          ]),
        ]).start(() => {
          setLoading(false);
          onLoginSuccess({
            id: user.id,
            name: user.name,
            role: user.role,
            username: user.username,
          });
        });
      } else {
        setLoading(false);
        // Shake on wrong credentials
        Animated.sequence([
          Animated.timing(cardSlide, { toValue: -12, duration: 70, useNativeDriver: true }),
          Animated.timing(cardSlide, { toValue: 12, duration: 70, useNativeDriver: true }),
          Animated.timing(cardSlide, { toValue: -8, duration: 70, useNativeDriver: true }),
          Animated.timing(cardSlide, { toValue: 8, duration: 70, useNativeDriver: true }),
          Animated.timing(cardSlide, { toValue: 0, duration: 70, useNativeDriver: true }),
        ]).start();
        Alert.alert('Login Failed', 'Incorrect username or password.');
      }
    }, 700);
  };

  const renderBranding = () => (
    <Animated.View
      style={[
        isLandscape ? styles.landscapeBrand : styles.portraitBrand,
        {
          opacity: logoOpacity,
          transform: [
            { translateY: brandSlide },
          ],
        },
      ]}>
      <Animated.View
        style={[
          styles.logoCircle,
          {
            transform: [{ scale: logoScale }],
          },
        ]}>
        <Text style={styles.logoIcon}>✝</Text>
      </Animated.View>
      <Text style={styles.churchName}>Church's Name</Text>
      <View style={styles.nameLine} />
      <Text style={styles.churchSubtitle}>Members Profiling System</Text>
    </Animated.View>
  );

  const renderForm = () => (
    <Animated.View
      style={[
        styles.card,
        isLandscape && styles.cardLandscape,
        {
          opacity: cardOpacity,
          transform: [
            { translateX: cardSlide },
            { translateY: isLandscape ? 0 : cardSlide },
          ],
        },
      ]}>
      <Text style={styles.loginTitle}>Login</Text>
      <Text style={styles.loginSub}>Sign in to your account</Text>

      {/* Username */}
      <View style={[
        styles.inputWrapper,
        usernameFocused && styles.inputWrapperFocused,
      ]}>
        <Text style={styles.inputIcon}>👤</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="rgba(255,255,255,0.4)"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
          autoCorrect={false}
          onFocus={() => setUsernameFocused(true)}
          onBlur={() => setUsernameFocused(false)}
        />
      </View>

      {/* Password */}
      <View style={[
        styles.inputWrapper,
        passwordFocused && styles.inputWrapperFocused,
      ]}>
        <Text style={styles.inputIcon}>🔒</Text>
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="rgba(255,255,255,0.4)"
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
          style={styles.eyeBtn}>
          <Text style={styles.eyeText}>{showPassword ? '🙈' : '👁️'}</Text>
        </TouchableOpacity>
      </View>

      {/* Sign In Button */}
      <Animated.View style={{ transform: [{ scale: btnScale }] }}>
        <TouchableOpacity
          style={[styles.signInBtn, loading && styles.signInBtnLoading]}
          onPress={handleLogin}
          onPressIn={handleButtonPressIn}
          onPressOut={handleButtonPressOut}
          disabled={loading}
          activeOpacity={1}>
          {loading ? (
            <View style={styles.loadingRow}>
              <Text style={styles.signInText}>Signing in</Text>
              <LoadingDots />
            </View>
          ) : (
            <Text style={styles.signInText}>Sign in</Text>
          )}
        </TouchableOpacity>
      </Animated.View>

      {/* Role hint */}
      <View style={styles.hintBox}>
        <Text style={styles.hintTitle}>Demo Accounts</Text>
        <Text style={styles.hintText}>admin / admin123</Text>
        <Text style={styles.hintText}>usher1 / usher123</Text>
      </View>
    </Animated.View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>

      {/* Background */}
      <View style={styles.background} />

      {/* Main content */}
      <Animated.View
        style={[
          styles.mainContent,
          {
            opacity: successOpacity,
            transform: [{ scale: successScale }],
          },
        ]}>
        {isLandscape ? (
          <View style={styles.landscapeContainer}>
            {renderBranding()}
            <View style={styles.landscapeFormContainer}>
              {renderForm()}
            </View>
          </View>
        ) : (
          <View style={styles.portraitContainer}>
            {renderBranding()}
            {renderForm()}
          </View>
        )}
      </Animated.View>

      {/* White flash overlay on success */}
      <Animated.View
        pointerEvents="none"
        style={[
          styles.flashOverlay,
          { opacity: whiteFlash },
        ]}
      />

    </KeyboardAvoidingView>
  );
}

// Simple animated loading dots
function LoadingDots() {
  const dot1 = useRef(new Animated.Value(0)).current;
  const dot2 = useRef(new Animated.Value(0)).current;
  const dot3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animate = (dot: Animated.Value, delay: number) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(dot, { toValue: -4, duration: 250, useNativeDriver: true }),
          Animated.timing(dot, { toValue: 0, duration: 250, useNativeDriver: true }),
          Animated.delay(500),
        ]),
      );

    Animated.parallel([
      animate(dot1, 0),
      animate(dot2, 150),
      animate(dot3, 300),
    ]).start();
  }, []);

  return (
    <View style={dots.row}>
      {[dot1, dot2, dot3].map((dot, i) => (
        <Animated.View
          key={i}
          style={[dots.dot, { transform: [{ translateY: dot }] }]}
        />
      ))}
    </View>
  );
}