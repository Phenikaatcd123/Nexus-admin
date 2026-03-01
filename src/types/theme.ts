export type ThemeMode = 'light' | 'dark' | 'system';
export type ThemeColor = 'blue' | 'purple' | 'green' | 'orange' | 'red';

export interface Theme {
  mode: ThemeMode;
  color: ThemeColor;
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
  isDark: boolean;
}

export interface ThemeContextType {
  theme: Theme;
  setMode: (mode: ThemeMode) => void;
  setColor: (color: ThemeColor) => void;
  toggleMode: () => void;
}