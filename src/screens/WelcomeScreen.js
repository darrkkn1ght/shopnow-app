import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import GlobalStyles, {
  Colors,
  Typography,
  Spacing,
  BorderRadius,
  Shadows,
  AnimationPresets,
  Screen,
  PlatformStyles,
  EnhancedStyles,
} from '../styles/GlobalStyles';

const { width, height } = Dimensions.get('window');

const WelcomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#007AFF', '#4DA6FF', '#80BFFF']}
        style={styles.gradient}
      >
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Ionicons name="storefront" size={80} color="#FFFFFF" />
            <Text style={styles.logoText}>ShopNow</Text>
            <Text style={styles.tagline}>Your Shopping Companion</Text>
          </View>
        </View>

        {/* Content Section */}
        <View style={styles.content}>
          <View style={styles.featureContainer}>
            <View style={styles.feature}>
              <Ionicons name="flash" size={40} color="#FFD700" />
              <Text style={styles.featureTitle}>Fast Delivery</Text>
              <Text style={styles.featureText}>Get your products delivered quickly</Text>
            </View>
            
            <View style={styles.feature}>
              <Ionicons name="shield-checkmark" size={40} color="#32D74B" />
              <Text style={styles.featureTitle}>Secure Shopping</Text>
              <Text style={styles.featureText}>Safe and secure payment methods</Text>
            </View>
            
            <View style={styles.feature}>
              <Ionicons name="star" size={40} color="#FFD700" />
              <Text style={styles.featureTitle}>Premium Quality</Text>
              <Text style={styles.featureText}>Only the best products for you</Text>
            </View>
          </View>
        </View>

        {/* Footer Section */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.getStartedButton}
            onPress={() => navigation.navigate('ProductList')}
            activeOpacity={0.8}
          >
            <Text style={styles.getStartedText}>Get Started</Text>
            <Ionicons name="arrow-forward" size={24} color="#007AFF" />
          </TouchableOpacity>
          
          <Text style={styles.welcomeText}>
            Discover amazing products at unbeatable prices
          </Text>
        </View>

        {/* Decorative Elements */}
        <View style={styles.decorativeCircle1} />
        <View style={styles.decorativeCircle2} />
        <View style={styles.decorativeCircle3} />
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  gradient: {
    flex: 1,
    position: 'relative',
  },
  header: {
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Spacing.xl + 18,
  },
  logoContainer: {
    alignItems: 'center',
  },
  logoText: {
    fontSize: 42,
    fontWeight: 'bold',
    color: Colors.white,
    marginTop: Spacing.sm + 2,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  tagline: {
    fontSize: 16,
    color: Colors.secondaryLight,
    marginTop: 5,
    fontStyle: 'italic',
  },
  content: {
    flex: 0.4,
    justifyContent: 'center',
    paddingHorizontal: Spacing.xl + 2,
  },
  featureContainer: {
    alignItems: 'center',
  },
  feature: {
    alignItems: 'center',
    marginBottom: Spacing.xl - 2,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: Spacing.lg,
    borderRadius: BorderRadius.large,
    width: width * 0.8,
    // Note: backdropFilter is not supported in RN, so omitted
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.white,
    marginTop: Spacing.sm + 2,
    marginBottom: 5,
  },
  featureText: {
    fontSize: 14,
    color: Colors.secondaryLight,
    textAlign: 'center',
    lineHeight: 20,
  },
  footer: {
    flex: 0.2,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: Spacing.xl + 18,
    paddingHorizontal: Spacing.xl + 2,
  },
  getStartedButton: {
    backgroundColor: Colors.white,
    paddingHorizontal: Spacing.xxl,
    paddingVertical: Spacing.lg - 1,
    borderRadius: BorderRadius.xl,
    flexDirection: 'row',
    alignItems: 'center',
    ...Shadows.large,
    marginBottom: Spacing.lg - 4,
  },
  getStartedText: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.primary,
    marginRight: 10,
  },
  welcomeText: {
    fontSize: 14,
    color: Colors.secondaryLight,
    textAlign: 'center',
    lineHeight: 20,
  },
  // Decorative elements
  decorativeCircle1: {
    position: 'absolute',
    top: 100,
    right: -50,
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  decorativeCircle2: {
    position: 'absolute',
    bottom: 200,
    left: -30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  decorativeCircle3: {
    position: 'absolute',
    top: 300,
    left: 20,
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
});

export default WelcomeScreen;
