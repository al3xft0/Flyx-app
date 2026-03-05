// Dark Green Theme for Flyx
export const colors = {
  // Primary dark green palette
  background: '#0a120a',
  surface: '#141d14',
  surfaceElevated: '#1e291e',
  surfaceHighlight: '#283528',
  
  // Green accent colors
  primary: '#2d7a2d',
  primaryLight: '#3d9a3d',
  primaryDark: '#1e5a1e',
  accent: '#4caf50',
  accentLight: '#6fcf72',
  accentDark: '#388e3c',
  
  // Text colors
  text: '#e8f5e8',
  textSecondary: '#a8c4a8',
  textMuted: '#6a8a6a',
  textInverse: '#0a120a',
  
  // Border and divider
  border: '#2a3a2a',
  divider: '#1f2f1f',
  
  // Status colors
  success: '#4caf50',
  warning: '#ff9800',
  error: '#f44336',
  info: '#2196f3',
  
  // Rating colors
  rating: '#ffc107',
  ratingEmpty: '#3a4a3a',
  
  // Overlay
  overlay: 'rgba(10, 18, 10, 0.85)',
  overlayLight: 'rgba(10, 18, 10, 0.5)',
  
  // Gradients
  gradientStart: '#0a120a',
  gradientEnd: '#1a2a1a',
};

export const gradients = {
  background: ['#0a120a', '#141d14'],
  surface: ['#141d14', '#1e291e'],
  primary: ['#1e5a1e', '#2d7a2d', '#3d9a3d'],
  overlay: ['rgba(10,18,10,0)', 'rgba(10,18,10,0.9)'],
  card: ['#1e291e', '#283528'],
};

export const shadows = {
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 10,
  },
  glow: {
    shadowColor: '#2d7a2d',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const borderRadius = {
  sm: 6,
  md: 10,
  lg: 16,
  xl: 20,
  xxl: 28,
  round: 9999,
};

export const typography = {
  h1: { fontSize: 32, fontWeight: 'bold', letterSpacing: -0.5 },
  h2: { fontSize: 28, fontWeight: 'bold', letterSpacing: -0.3 },
  h3: { fontSize: 24, fontWeight: '600', letterSpacing: -0.2 },
  h4: { fontSize: 20, fontWeight: '600', letterSpacing: -0.1 },
  h5: { fontSize: 18, fontWeight: '600' },
  body: { fontSize: 16, fontWeight: '400' },
  bodySmall: { fontSize: 14, fontWeight: '400' },
  caption: { fontSize: 12, fontWeight: '400' },
  button: { fontSize: 14, fontWeight: '600' },
  label: { fontSize: 11, fontWeight: '600', textTransform: 'uppercase' },
};

export default { colors, gradients, shadows, spacing, borderRadius, typography };
