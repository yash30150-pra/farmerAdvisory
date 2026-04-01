// src/utils/colors.js - Color definitions matching web design
export const colors = {
  // Primary Colors
  primary: '#2ecc71',           // Green
  secondary: '#ffd24d',         // Gold
  
  // Background Colors
  background: '#163a3a',        // Deep Teal
  backgroundAlt: '#276172',     // Secondary background
  darkGreen: '#1e6c2d',         // Dark Green accent
  
  // Text Colors
  text: '#ffffff',
  textMuted: 'rgba(255,255,255,0.95)',
  textSecondary: 'rgba(255,255,255,0.8)',
  textTertiary: 'rgba(255,255,255,0.7)',
  
  // Border & UI
  border: 'rgba(255,255,255,0.1)',
  borderLight: 'rgba(255,255,255,0.05)',
  glass: 'rgba(255,255,255,0.06)',
  glassLight: 'rgba(255,255,255,0.08)',
  
  // Status Colors
  success: '#2ecc71',
  warning: '#ffd24d',
  error: '#ff6b6b',
  info: '#00bcd4',
  
  // Gradient Colors
  gradientStart: '#163a3a',
  gradientEnd: '#1e6c2d',
};

// Opacity utilities
export const opacity = (color, alpha) => {
  return color.replace(/\)/, `, ${alpha})`).replace('rgb', 'rgba');
};
