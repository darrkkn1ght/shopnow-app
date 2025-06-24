// src/styles/GlobalStyles.js
import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

// Design System Colors
export const Colors = {
  primary: '#007AFF',
  primaryDark: '#0056CC',
  secondary: '#FF6B35',
  secondaryLight: '#FF8A5C',
  
  // Neutrals
  white: '#FFFFFF',
  black: '#000000',
  darkGray: '#2C2C2E',
  mediumGray: '#8E8E93',
  lightGray: '#F2F2F7',
  
  // Status Colors
  success: '#34C759',
  warning: '#FF9500',
  error: '#FF3B30',
  
  // Background
  background: '#F8F9FA',
  cardBackground: '#FFFFFF',
  
  // Text Colors
  textPrimary: '#1C1C1E',
  textSecondary: '#8E8E93',
  textLight: '#FFFFFF',
};

// Typography Scale
export const Typography = {
  // Headers
  h1: {
    fontSize: 34,
    fontWeight: 'bold',
    lineHeight: 41,
    color: Colors.textPrimary,
  },
  h2: {
    fontSize: 28,
    fontWeight: 'bold',
    lineHeight: 34,
    color: Colors.textPrimary,
  },
  h3: {
    fontSize: 22,
    fontWeight: '600',
    lineHeight: 28,
    color: Colors.textPrimary,
  },
  h4: {
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 25,
    color: Colors.textPrimary,
  },
  
  // Body Text
  body: {
    fontSize: 17,
    fontWeight: '400',
    lineHeight: 22,
    color: Colors.textPrimary,
  },
  bodyMedium: {
    fontSize: 15,
    fontWeight: '400',
    lineHeight: 20,
    color: Colors.textPrimary,
  },
  bodySmall: {
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 18,
    color: Colors.textSecondary,
  },
  
  // Special
  caption: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
    color: Colors.textSecondary,
  },
  button: {
    fontSize: 17,
    fontWeight: '600',
    lineHeight: 22,
    color: Colors.white,
  },
};

// Spacing Scale
export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

// Border Radius
export const BorderRadius = {
  small: 8,
  medium: 12,
  large: 16,
  xl: 24,
  round: 999,
};

// Shadows
export const Shadows = {
  small: {
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  medium: {
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  large: {
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
};

// Global Styles
export const GlobalStyles = StyleSheet.create({
  // Layout
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: Spacing.md,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  
  // Cards
  card: {
    backgroundColor: Colors.cardBackground,
    borderRadius: BorderRadius.medium,
    padding: Spacing.md,
    ...Shadows.small,
  },
  cardLarge: {
    backgroundColor: Colors.cardBackground,
    borderRadius: BorderRadius.large,
    padding: Spacing.lg,
    ...Shadows.medium,
  },
  
  // Buttons
  primaryButton: {
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.medium,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.small,
  },
  secondaryButton: {
    backgroundColor: Colors.secondary,
    borderRadius: BorderRadius.medium,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.small,
  },
  outlineButton: {
    borderWidth: 2,
    borderColor: Colors.primary,
    borderRadius: BorderRadius.medium,
    paddingVertical: Spacing.md - 2,
    paddingHorizontal: Spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  // Input
  input: {
    borderWidth: 1,
    borderColor: Colors.lightGray,
    borderRadius: BorderRadius.small,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    fontSize: 17,
    backgroundColor: Colors.white,
  },
  
  // Text Styles
  textCenter: {
    textAlign: 'center',
  },
  textBold: {
    fontWeight: 'bold',
  },
  textMuted: {
    color: Colors.textSecondary,
  },
  
  // Margin & Padding Utilities
  mb1: { marginBottom: Spacing.xs },
  mb2: { marginBottom: Spacing.sm },
  mb3: { marginBottom: Spacing.md },
  mb4: { marginBottom: Spacing.lg },
  mt1: { marginTop: Spacing.xs },
  mt2: { marginTop: Spacing.sm },
  mt3: { marginTop: Spacing.md },
  mt4: { marginTop: Spacing.lg },
  mx1: { marginHorizontal: Spacing.xs },
  mx2: { marginHorizontal: Spacing.sm },
  mx3: { marginHorizontal: Spacing.md },
  mx4: { marginHorizontal: Spacing.lg },
  
  p1: { padding: Spacing.xs },
  p2: { padding: Spacing.sm },
  p3: { padding: Spacing.md },
  p4: { padding: Spacing.lg },
});

// Animation Presets
export const AnimationPresets = {
  fadeIn: {
    from: { opacity: 0 },
    to: { opacity: 1 },
    duration: 300,
  },
  slideInUp: {
    from: { 
      opacity: 0,
      transform: [{ translateY: 50 }],
    },
    to: { 
      opacity: 1,
      transform: [{ translateY: 0 }],
    },
    duration: 400,
  },
  slideInRight: {
    from: { 
      opacity: 0,
      transform: [{ translateX: width }],
    },
    to: { 
      opacity: 1,
      transform: [{ translateX: 0 }],
    },
    duration: 350,
  },
  scaleIn: {
    from: { 
      opacity: 0,
      transform: [{ scale: 0.8 }],
    },
    to: { 
      opacity: 1,
      transform: [{ scale: 1 }],
    },
    duration: 300,
  },
  buttonPress: {
    from: { transform: [{ scale: 1 }] },
    to: { transform: [{ scale: 0.95 }] },
    duration: 100,
  },
};

// Screen Dimensions
export const Screen = {
  width,
  height,
  isSmallDevice: width < 375,
  isLargeDevice: width > 414,
};

// Platform Specific Styles
export const PlatformStyles = StyleSheet.create({
  headerTitle: {
    ...Typography.h3,
    ...Platform.select({
      ios: {
        fontWeight: '600',
      },
      android: {
        fontWeight: '500',
        fontSize: 20,
      },
    }),
  },
  safeArea: {
    ...Platform.select({
      ios: {
        paddingTop: 0,
      },
      android: {
        paddingTop: 25,
      },
    }),
  },
});

// Enhanced Component Styles for existing components
export const EnhancedStyles = StyleSheet.create({
  // Enhanced ProductCard animations
  productCardContainer: {
    transform: [{ scale: 1 }],
  },
  productCardPressed: {
    transform: [{ scale: 0.98 }],
  },
  
  // Enhanced WelcomeScreen
  welcomeContainer: {
    flex: 1,
    backgroundColor: 'linear-gradient(135deg, #007AFF 0%, #FF6B35 100%)',
  },
  
  // Enhanced ProductDetail
  productImageContainer: {
    borderRadius: BorderRadius.large,
    overflow: 'hidden',
    ...Shadows.medium,
  },
  
  // Enhanced Cart
  cartItemContainer: {
    backgroundColor: Colors.white,
    marginVertical: Spacing.xs,
    borderRadius: BorderRadius.medium,
    ...Shadows.small,
  },
  
  // Loading States
  shimmer: {
    backgroundColor: Colors.lightGray,
    borderRadius: BorderRadius.small,
  },
  
  // Pull to Refresh
  refreshControl: {
    tintColor: Colors.primary,
  },
});

export default {
  Colors,
  Typography,
  Spacing,
  BorderRadius,
  Shadows,
  GlobalStyles,
  AnimationPresets,
  Screen,
  PlatformStyles,
  EnhancedStyles,
};