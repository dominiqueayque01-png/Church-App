declare module 'lucide-react-native' {
  import React from 'react';
  import { SvgProps } from 'react-native-svg';

  export interface IconProps extends SvgProps {
    size?: number | string;
    color?: string;
    strokeWidth?: number | string;
  }

  export type Icon = React.FC<IconProps>;

  export const CalendarCheck: Icon;
  export const UserPlus: Icon;
  export const LayoutDashboard: Icon;
  export const LogOut: Icon;
  export const Cross: Icon;
  export const Sparkles: Icon;
  export const ShieldCheck: Icon;
  export const Radio: Icon;
  export const User: Icon;
  export const Lock: Icon;
  export const Eye: Icon;
  export const EyeOff: Icon;
  export const CheckCircle2: Icon;
  export const ChevronRight: Icon;
  export const ChevronDown: Icon;
  export const ChevronUp: Icon;
  export const Calendar: Icon;
  export const Clock: Icon;
  export const Users: Icon;
  export const ArrowRight: Icon;
  export const ArrowLeft: Icon;
  export const Search: Icon;
  export const Check: Icon;
  export const RotateCcw: Icon;
  export const X: Icon;
  export const ShieldAlert: Icon;
  export const Camera: Icon;
  export const Phone: Icon;
  export const Mail: Icon;
  export const MapPin: Icon;
  export const HeartHandshake: Icon;

  const icons: Record<string, Icon>;
  export default icons;
}
