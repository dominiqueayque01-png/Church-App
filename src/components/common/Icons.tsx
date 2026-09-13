import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';

export interface IconProps {
  size?: number;
  color?: string;
  strokeWidth?: number;
  style?: ViewStyle;
}

const DEFAULT_SIZE = 20;
const DEFAULT_COLOR = '#b5973a';
const DEFAULT_STROKE = 2;

// ── 1. CROSS (Liturgical Latin Cross) ────────────────────
export const Cross: React.FC<IconProps> = ({
  size = DEFAULT_SIZE,
  color = DEFAULT_COLOR,
  strokeWidth = DEFAULT_STROKE,
  style,
}) => (
  <View style={[{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }, style]}>
    <View
      style={{
        position: 'absolute',
        width: Math.max(2, strokeWidth),
        height: size * 0.85,
        backgroundColor: color,
        borderRadius: 1,
      }}
    />
    <View
      style={{
        position: 'absolute',
        top: size * 0.22,
        width: size * 0.65,
        height: Math.max(2, strokeWidth),
        backgroundColor: color,
        borderRadius: 1,
      }}
    />
  </View>
);

// ── 2. CALENDAR CHECK ────────────────────────────────────
export const CalendarCheck: React.FC<IconProps> = ({
  size = DEFAULT_SIZE,
  color = DEFAULT_COLOR,
  strokeWidth = DEFAULT_STROKE,
  style,
}) => (
  <View style={[{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }, style]}>
    <View
      style={{
        width: size * 0.84,
        height: size * 0.84,
        borderWidth: Math.max(1.5, strokeWidth),
        borderColor: color,
        borderRadius: 3,
        overflow: 'hidden',
      }}>
      <View style={{ height: size * 0.24, backgroundColor: color, width: '100%' }} />
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: size * 0.38, color, fontWeight: '900', marginTop: -2 }}>✓</Text>
      </View>
    </View>
    <View style={{ position: 'absolute', top: 0, left: size * 0.25, width: 2, height: size * 0.16, backgroundColor: color }} />
    <View style={{ position: 'absolute', top: 0, right: size * 0.25, width: 2, height: size * 0.16, backgroundColor: color }} />
  </View>
);

// ── 3. CALENDAR ──────────────────────────────────────────
export const Calendar: React.FC<IconProps> = ({
  size = DEFAULT_SIZE,
  color = DEFAULT_COLOR,
  strokeWidth = DEFAULT_STROKE,
  style,
}) => (
  <View style={[{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }, style]}>
    <View
      style={{
        width: size * 0.84,
        height: size * 0.84,
        borderWidth: Math.max(1.5, strokeWidth),
        borderColor: color,
        borderRadius: 3,
        overflow: 'hidden',
      }}>
      <View style={{ height: size * 0.24, backgroundColor: color, width: '100%' }} />
      <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', padding: 2, gap: 2, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ width: 3, height: 3, backgroundColor: color, borderRadius: 1 }} />
        <View style={{ width: 3, height: 3, backgroundColor: color, borderRadius: 1 }} />
        <View style={{ width: 3, height: 3, backgroundColor: color, borderRadius: 1 }} />
        <View style={{ width: 3, height: 3, backgroundColor: color, borderRadius: 1 }} />
      </View>
    </View>
    <View style={{ position: 'absolute', top: 0, left: size * 0.25, width: 2, height: size * 0.16, backgroundColor: color }} />
    <View style={{ position: 'absolute', top: 0, right: size * 0.25, width: 2, height: size * 0.16, backgroundColor: color }} />
  </View>
);

// ── 4. USER ──────────────────────────────────────────────
export const User: React.FC<IconProps> = ({
  size = DEFAULT_SIZE,
  color = DEFAULT_COLOR,
  strokeWidth = DEFAULT_STROKE,
  style,
}) => (
  <View style={[{ width: size, height: size, justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }, style]}>
    <View
      style={{
        width: size * 0.36,
        height: size * 0.36,
        borderRadius: size * 0.18,
        borderWidth: Math.max(1.5, strokeWidth),
        borderColor: color,
        marginBottom: 1,
      }}
    />
    <View
      style={{
        width: size * 0.72,
        height: size * 0.36,
        borderTopLeftRadius: size * 0.36,
        borderTopRightRadius: size * 0.36,
        borderWidth: Math.max(1.5, strokeWidth),
        borderBottomWidth: 0,
        borderColor: color,
      }}
    />
  </View>
);

// ── 5. USER PLUS ─────────────────────────────────────────
export const UserPlus: React.FC<IconProps> = ({
  size = DEFAULT_SIZE,
  color = DEFAULT_COLOR,
  strokeWidth = DEFAULT_STROKE,
  style,
}) => (
  <View style={[{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }, style]}>
    <View style={{ marginRight: 4 }}>
      <User size={size * 0.85} color={color} strokeWidth={strokeWidth} />
    </View>
    <View style={{ position: 'absolute', right: 0, top: size * 0.25 }}>
      <Text style={{ fontSize: size * 0.45, fontWeight: '900', color, lineHeight: size * 0.45 }}>+</Text>
    </View>
  </View>
);

// ── 6. USERS ─────────────────────────────────────────────
export const Users: React.FC<IconProps> = ({
  size = DEFAULT_SIZE,
  color = DEFAULT_COLOR,
  strokeWidth = DEFAULT_STROKE,
  style,
}) => (
  <View style={[{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }, style]}>
    <View style={{ position: 'absolute', left: 0, top: 1, opacity: 0.7 }}>
      <User size={size * 0.75} color={color} strokeWidth={strokeWidth} />
    </View>
    <View style={{ position: 'absolute', right: 1, bottom: 0 }}>
      <User size={size * 0.82} color={color} strokeWidth={strokeWidth} />
    </View>
  </View>
);

// ── 7. LAYOUT DASHBOARD ──────────────────────────────────
export const LayoutDashboard: React.FC<IconProps> = ({
  size = DEFAULT_SIZE,
  color = DEFAULT_COLOR,
  strokeWidth = DEFAULT_STROKE,
  style,
}) => {
  const box = (size - 6) / 2;
  return (
    <View style={[{ width: size, height: size, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', alignContent: 'space-between', padding: 1 }, style]}>
      <View style={{ width: box, height: box * 0.85, borderWidth: Math.max(1.5, strokeWidth), borderColor: color, borderRadius: 2 }} />
      <View style={{ width: box, height: box * 1.15, borderWidth: Math.max(1.5, strokeWidth), borderColor: color, borderRadius: 2 }} />
      <View style={{ width: box, height: box * 1.15, borderWidth: Math.max(1.5, strokeWidth), borderColor: color, borderRadius: 2 }} />
      <View style={{ width: box, height: box * 0.85, borderWidth: Math.max(1.5, strokeWidth), borderColor: color, borderRadius: 2 }} />
    </View>
  );
};

// ── 8. LOG OUT ───────────────────────────────────────────
export const LogOut: React.FC<IconProps> = ({
  size = DEFAULT_SIZE,
  color = DEFAULT_COLOR,
  strokeWidth = DEFAULT_STROKE,
  style,
}) => (
  <View style={[{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }, style]}>
    {/* Bracket door */}
    <View
      style={{
        position: 'absolute',
        left: 2,
        top: 2,
        bottom: 2,
        width: size * 0.45,
        borderWidth: Math.max(1.5, strokeWidth),
        borderRightWidth: 0,
        borderColor: color,
        borderRadius: 2,
      }}
    />
    {/* Arrow */}
    <View style={{ position: 'absolute', right: 1, flexDirection: 'row', alignItems: 'center' }}>
      <View style={{ width: size * 0.45, height: Math.max(1.5, strokeWidth), backgroundColor: color }} />
      <View
        style={{
          width: size * 0.25,
          height: size * 0.25,
          borderTopWidth: Math.max(1.5, strokeWidth),
          borderRightWidth: Math.max(1.5, strokeWidth),
          borderColor: color,
          transform: [{ rotate: '45deg' }],
          marginLeft: -3,
        }}
      />
    </View>
  </View>
);

// ── 9. LOCK ──────────────────────────────────────────────
export const Lock: React.FC<IconProps> = ({
  size = DEFAULT_SIZE,
  color = DEFAULT_COLOR,
  strokeWidth = DEFAULT_STROKE,
  style,
}) => (
  <View style={[{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }, style]}>
    {/* Shackle */}
    <View
      style={{
        width: size * 0.46,
        height: size * 0.44,
        borderWidth: Math.max(1.5, strokeWidth),
        borderBottomWidth: 0,
        borderColor: color,
        borderTopLeftRadius: size * 0.23,
        borderTopRightRadius: size * 0.23,
        marginBottom: -1,
      }}
    />
    {/* Body */}
    <View
      style={{
        width: size * 0.72,
        height: size * 0.48,
        borderWidth: Math.max(1.5, strokeWidth),
        borderColor: color,
        borderRadius: 3,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View style={{ width: 3, height: 5, backgroundColor: color, borderRadius: 1.5 }} />
    </View>
  </View>
);

// ── 10. EYE & EYE OFF ────────────────────────────────────
export const Eye: React.FC<IconProps> = ({
  size = DEFAULT_SIZE,
  color = DEFAULT_COLOR,
  strokeWidth = DEFAULT_STROKE,
  style,
}) => (
  <View style={[{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }, style]}>
    <View
      style={{
        width: size * 0.85,
        height: size * 0.5,
        borderWidth: Math.max(1.5, strokeWidth),
        borderColor: color,
        borderRadius: size * 0.4,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View style={{ width: size * 0.22, height: size * 0.22, borderRadius: size * 0.11, backgroundColor: color }} />
    </View>
  </View>
);

export const EyeOff: React.FC<IconProps> = ({
  size = DEFAULT_SIZE,
  color = DEFAULT_COLOR,
  strokeWidth = DEFAULT_STROKE,
  style,
}) => (
  <View style={[{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }, style]}>
    <Eye size={size} color={color} strokeWidth={strokeWidth} />
    <View
      style={{
        position: 'absolute',
        width: size * 0.95,
        height: Math.max(1.5, strokeWidth),
        backgroundColor: color,
        transform: [{ rotate: '-45deg' }],
      }}
    />
  </View>
);

// ── 11. CHECK CIRCLE 2 ───────────────────────────────────
export const CheckCircle2: React.FC<IconProps> = ({
  size = DEFAULT_SIZE,
  color = DEFAULT_COLOR,
  strokeWidth = DEFAULT_STROKE,
  style,
}) => (
  <View
    style={[
      {
        width: size,
        height: size,
        borderRadius: size / 2,
        borderWidth: Math.max(1.5, strokeWidth),
        borderColor: color,
        justifyContent: 'center',
        alignItems: 'center',
      },
      style,
    ]}>
    <Text style={{ fontSize: size * 0.55, fontWeight: '900', color, marginTop: -2 }}>✓</Text>
  </View>
);

// ── 12. CHECK ────────────────────────────────────────────
export const Check: React.FC<IconProps> = ({
  size = DEFAULT_SIZE,
  color = DEFAULT_COLOR,
  style,
}) => (
  <View style={[{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }, style]}>
    <Text style={{ fontSize: size * 0.8, fontWeight: '900', color }}>✓</Text>
  </View>
);

// ── 13. CHEVRONS ─────────────────────────────────────────
export const ChevronRight: React.FC<IconProps> = ({
  size = DEFAULT_SIZE,
  color = DEFAULT_COLOR,
  strokeWidth = DEFAULT_STROKE,
  style,
}) => (
  <View style={[{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }, style]}>
    <View
      style={{
        width: size * 0.35,
        height: size * 0.35,
        borderTopWidth: Math.max(1.5, strokeWidth),
        borderRightWidth: Math.max(1.5, strokeWidth),
        borderColor: color,
        transform: [{ rotate: '45deg' }],
        marginLeft: -2,
      }}
    />
  </View>
);

export const ChevronDown: React.FC<IconProps> = ({
  size = DEFAULT_SIZE,
  color = DEFAULT_COLOR,
  strokeWidth = DEFAULT_STROKE,
  style,
}) => (
  <View style={[{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }, style]}>
    <View
      style={{
        width: size * 0.35,
        height: size * 0.35,
        borderTopWidth: Math.max(1.5, strokeWidth),
        borderRightWidth: Math.max(1.5, strokeWidth),
        borderColor: color,
        transform: [{ rotate: '135deg' }],
        marginTop: -3,
      }}
    />
  </View>
);

export const ChevronUp: React.FC<IconProps> = ({
  size = DEFAULT_SIZE,
  color = DEFAULT_COLOR,
  strokeWidth = DEFAULT_STROKE,
  style,
}) => (
  <View style={[{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }, style]}>
    <View
      style={{
        width: size * 0.35,
        height: size * 0.35,
        borderTopWidth: Math.max(1.5, strokeWidth),
        borderRightWidth: Math.max(1.5, strokeWidth),
        borderColor: color,
        transform: [{ rotate: '-45deg' }],
        marginTop: 3,
      }}
    />
  </View>
);

// ── 14. ARROWS ───────────────────────────────────────────
export const ArrowRight: React.FC<IconProps> = ({
  size = DEFAULT_SIZE,
  color = DEFAULT_COLOR,
  strokeWidth = DEFAULT_STROKE,
  style,
}) => (
  <View style={[{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }, style]}>
    <View style={{ width: size * 0.65, height: Math.max(1.5, strokeWidth), backgroundColor: color }} />
    <View
      style={{
        position: 'absolute',
        right: size * 0.16,
        width: size * 0.32,
        height: size * 0.32,
        borderTopWidth: Math.max(1.5, strokeWidth),
        borderRightWidth: Math.max(1.5, strokeWidth),
        borderColor: color,
        transform: [{ rotate: '45deg' }],
      }}
    />
  </View>
);

export const ArrowLeft: React.FC<IconProps> = ({
  size = DEFAULT_SIZE,
  color = DEFAULT_COLOR,
  strokeWidth = DEFAULT_STROKE,
  style,
}) => (
  <View style={[{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }, style]}>
    <View style={{ width: size * 0.65, height: Math.max(1.5, strokeWidth), backgroundColor: color }} />
    <View
      style={{
        position: 'absolute',
        left: size * 0.16,
        width: size * 0.32,
        height: size * 0.32,
        borderBottomWidth: Math.max(1.5, strokeWidth),
        borderLeftWidth: Math.max(1.5, strokeWidth),
        borderColor: color,
        transform: [{ rotate: '45deg' }],
      }}
    />
  </View>
);

// ── 15. SEARCH ───────────────────────────────────────────
export const Search: React.FC<IconProps> = ({
  size = DEFAULT_SIZE,
  color = DEFAULT_COLOR,
  strokeWidth = DEFAULT_STROKE,
  style,
}) => (
  <View style={[{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }, style]}>
    <View
      style={{
        width: size * 0.62,
        height: size * 0.62,
        borderRadius: (size * 0.62) / 2,
        borderWidth: Math.max(1.5, strokeWidth),
        borderColor: color,
        marginTop: -3,
        marginLeft: -3,
      }}
    />
    <View
      style={{
        position: 'absolute',
        right: size * 0.12,
        bottom: size * 0.12,
        width: size * 0.32,
        height: Math.max(1.5, strokeWidth),
        backgroundColor: color,
        transform: [{ rotate: '45deg' }],
      }}
    />
  </View>
);

// ── 16. CLOCK ────────────────────────────────────────────
export const Clock: React.FC<IconProps> = ({
  size = DEFAULT_SIZE,
  color = DEFAULT_COLOR,
  strokeWidth = DEFAULT_STROKE,
  style,
}) => (
  <View
    style={[
      {
        width: size,
        height: size,
        borderRadius: size / 2,
        borderWidth: Math.max(1.5, strokeWidth),
        borderColor: color,
        justifyContent: 'center',
        alignItems: 'center',
      },
      style,
    ]}>
    {/* Minute hand */}
    <View style={{ position: 'absolute', top: size * 0.18, width: 2, height: size * 0.32, backgroundColor: color }} />
    {/* Hour hand */}
    <View style={{ position: 'absolute', right: size * 0.22, width: size * 0.28, height: 2, backgroundColor: color }} />
  </View>
);

// ── 17. CLOSE X ──────────────────────────────────────────
export const X: React.FC<IconProps> = ({
  size = DEFAULT_SIZE,
  color = DEFAULT_COLOR,
  strokeWidth = DEFAULT_STROKE,
  style,
}) => (
  <View style={[{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }, style]}>
    <View style={{ position: 'absolute', width: size * 0.75, height: Math.max(1.5, strokeWidth), backgroundColor: color, transform: [{ rotate: '45deg' }] }} />
    <View style={{ position: 'absolute', width: size * 0.75, height: Math.max(1.5, strokeWidth), backgroundColor: color, transform: [{ rotate: '-45deg' }] }} />
  </View>
);

// ── 18. SHIELD CHECK & SHIELD ALERT ──────────────────────
export const ShieldCheck: React.FC<IconProps> = ({
  size = DEFAULT_SIZE,
  color = DEFAULT_COLOR,
  strokeWidth = DEFAULT_STROKE,
  style,
}) => (
  <View
    style={[
      {
        width: size,
        height: size,
        borderWidth: Math.max(1.5, strokeWidth),
        borderColor: color,
        borderTopLeftRadius: size * 0.4,
        borderTopRightRadius: size * 0.4,
        borderBottomLeftRadius: size * 0.5,
        borderBottomRightRadius: size * 0.5,
        justifyContent: 'center',
        alignItems: 'center',
      },
      style,
    ]}>
    <Text style={{ fontSize: size * 0.48, fontWeight: '900', color, marginTop: -2 }}>✓</Text>
  </View>
);

export const ShieldAlert: React.FC<IconProps> = ({
  size = DEFAULT_SIZE,
  color = DEFAULT_COLOR,
  strokeWidth = DEFAULT_STROKE,
  style,
}) => (
  <View
    style={[
      {
        width: size,
        height: size,
        borderWidth: Math.max(1.5, strokeWidth),
        borderColor: color,
        borderTopLeftRadius: size * 0.4,
        borderTopRightRadius: size * 0.4,
        borderBottomLeftRadius: size * 0.5,
        borderBottomRightRadius: size * 0.5,
        justifyContent: 'center',
        alignItems: 'center',
      },
      style,
    ]}>
    <Text style={{ fontSize: size * 0.5, fontWeight: '900', color, marginTop: -2 }}>!</Text>
  </View>
);

// ── 19. CAMERA ───────────────────────────────────────────
export const Camera: React.FC<IconProps> = ({
  size = DEFAULT_SIZE,
  color = DEFAULT_COLOR,
  strokeWidth = DEFAULT_STROKE,
  style,
}) => (
  <View style={[{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }, style]}>
    {/* Top flash bump */}
    <View style={{ width: size * 0.35, height: 3, backgroundColor: color, borderTopLeftRadius: 2, borderTopRightRadius: 2, marginBottom: -1 }} />
    {/* Body */}
    <View
      style={{
        width: size * 0.88,
        height: size * 0.62,
        borderWidth: Math.max(1.5, strokeWidth),
        borderColor: color,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View style={{ width: size * 0.28, height: size * 0.28, borderRadius: (size * 0.28) / 2, borderWidth: 1.5, borderColor: color }} />
    </View>
  </View>
);

// ── 20. PHONE ────────────────────────────────────────────
export const Phone: React.FC<IconProps> = ({
  size = DEFAULT_SIZE,
  color = DEFAULT_COLOR,
  style,
}) => (
  <View style={[{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }, style]}>
    <Text style={{ fontSize: size * 0.75, color }}>📞</Text>
  </View>
);

// ── 21. MAIL ─────────────────────────────────────────────
export const Mail: React.FC<IconProps> = ({
  size = DEFAULT_SIZE,
  color = DEFAULT_COLOR,
  strokeWidth = DEFAULT_STROKE,
  style,
}) => (
  <View style={[{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }, style]}>
    <View
      style={{
        width: size * 0.88,
        height: size * 0.62,
        borderWidth: Math.max(1.5, strokeWidth),
        borderColor: color,
        borderRadius: 3,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text style={{ fontSize: size * 0.45, color, marginTop: -4 }}>✉</Text>
    </View>
  </View>
);

// ── 22. MAP PIN ──────────────────────────────────────────
export const MapPin: React.FC<IconProps> = ({
  size = DEFAULT_SIZE,
  color = DEFAULT_COLOR,
  strokeWidth = DEFAULT_STROKE,
  style,
}) => (
  <View style={[{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }, style]}>
    <View
      style={{
        width: size * 0.55,
        height: size * 0.55,
        borderRadius: (size * 0.55) / 2,
        borderWidth: Math.max(1.5, strokeWidth),
        borderColor: color,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: color }} />
    </View>
    <View
      style={{
        width: 0,
        height: 0,
        borderLeftWidth: size * 0.16,
        borderRightWidth: size * 0.16,
        borderTopWidth: size * 0.28,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderTopColor: color,
        marginTop: -1,
      }}
    />
  </View>
);

// ── 23. SPARKLES ─────────────────────────────────────────
export const Sparkles: React.FC<IconProps> = ({
  size = DEFAULT_SIZE,
  color = DEFAULT_COLOR,
  style,
}) => (
  <View style={[{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }, style]}>
    <Text style={{ fontSize: size * 0.8, color }}>✦</Text>
  </View>
);

// ── 24. ROTATE CCW ───────────────────────────────────────
export const RotateCcw: React.FC<IconProps> = ({
  size = DEFAULT_SIZE,
  color = DEFAULT_COLOR,
  style,
}) => (
  <View style={[{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }, style]}>
    <Text style={{ fontSize: size * 0.8, color, fontWeight: '700' }}>↺</Text>
  </View>
);

// ── 25. RADIO ────────────────────────────────────────────
export const Radio: React.FC<IconProps> = ({
  size = DEFAULT_SIZE,
  color = DEFAULT_COLOR,
  style,
}) => (
  <View style={[{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }, style]}>
    <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: color }} />
  </View>
);

// ── 26. HEART HANDSHAKE ──────────────────────────────────
export const HeartHandshake: React.FC<IconProps> = ({
  size = DEFAULT_SIZE,
  color = DEFAULT_COLOR,
  style,
}) => (
  <View style={[{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }, style]}>
    <Text style={{ fontSize: size * 0.75, color }}>🤝</Text>
  </View>
);
