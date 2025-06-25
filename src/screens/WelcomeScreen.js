import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  Image,
  ScrollView,
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
        colors={['#0f2027', '#2c5364', '#007AFF']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <View style={styles.heroCircle}>
            {/* Try Ionicons, fallback to image if not available */}
            {Ionicons ? (
              <Ionicons name="storefront" size={90} color="#fff" style={{ shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 10 }} />
            ) : (
              <Image source={require('../../assets/logo.png')} style={{ width: 80, height: 80, resizeMode: 'contain' }} />
            )}
          </View>
          <Text style={styles.appName}>ShopNow</Text>
          <Text style={styles.tagline}>Your Shopping Companion</Text>
        </View>

        {/* Features Section - now vertical */}
        <View style={styles.featuresVertical}>
          <View style={styles.featureRow}>
            <Ionicons name="flash" size={32} color="#FFD700" style={styles.featureIcon} />
            <View style={styles.featureTextBlock}>
              <Text style={styles.featureTitle}>Fast Delivery</Text>
              <Text style={styles.featureText}>Get your products delivered quickly</Text>
            </View>
          </View>
          <View style={styles.featureRow}>
            <Ionicons name="shield-checkmark" size={32} color="#32D74B" style={styles.featureIcon} />
            <View style={styles.featureTextBlock}>
              <Text style={styles.featureTitle}>Secure Shopping</Text>
              <Text style={styles.featureText}>Safe and secure payment methods</Text>
            </View>
          </View>
          <View style={styles.featureRow}>
            <Ionicons name="star" size={32} color="#FFD700" style={styles.featureIcon} />
            <View style={styles.featureTextBlock}>
              <Text style={styles.featureTitle}>Premium Quality</Text>
              <Text style={styles.featureText}>Only the best products for you</Text>
            </View>
          </View>
          <View style={styles.featureRow}>
            <Ionicons name="pricetag" size={32} color="#FF375F" style={styles.featureIcon} />
            <View style={styles.featureTextBlock}>
              <Text style={styles.featureTitle}>Best Prices</Text>
              <Text style={styles.featureText}>Unbeatable deals every day</Text>
            </View>
          </View>
        </View>

        {/* Call to Action */}
        <View style={styles.ctaSection}>
          <TouchableOpacity
            style={styles.getStartedButton}
            onPress={() => navigation.navigate('ProductList')}
            activeOpacity={0.85}
          >
            <LinearGradient
              colors={[Colors.primary, '#4DA6FF']}
              style={styles.buttonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.getStartedText}>Start Shopping</Text>
              <Ionicons name="arrow-forward-circle" size={28} color="#fff" style={{ marginLeft: 8 }} />
            </LinearGradient>
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
  heroSection: {
    alignItems: 'center',
    marginTop: Spacing.xl + 10,
    marginBottom: Spacing.lg,
  },
  heroCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  appName: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 2,
    textShadowColor: 'rgba(0,0,0,0.25)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 8,
    marginBottom: 2,
  },
  tagline: {
    fontSize: 18,
    color: '#B3E0FF',
    fontStyle: 'italic',
    marginBottom: 8,
    letterSpacing: 1,
  },
  featuresVertical: {
    marginHorizontal: Spacing.xl,
    marginBottom: Spacing.xl,
    marginTop: 10,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.13)',
    borderRadius: 18,
    paddingVertical: 14,
    paddingHorizontal: 18,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  featureIcon: {
    marginRight: 16,
  },
  featureTextBlock: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 2,
    letterSpacing: 0.5,
  },
  featureText: {
    fontSize: 13,
    color: '#E0F7FA',
    textAlign: 'left',
    lineHeight: 18,
  },
  ctaSection: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: Spacing.xl,
  },
  getStartedButton: {
    borderRadius: 30,
    overflow: 'hidden',
    marginBottom: 12,
    elevation: 2,
  },
  buttonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 36,
    paddingVertical: 14,
    borderRadius: 30,
  },
  getStartedText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 1,
  },
  welcomeText: {
    fontSize: 15,
    color: '#B3E0FF',
    textAlign: 'center',
    lineHeight: 22,
    fontWeight: '500',
    letterSpacing: 0.5,
  },
  // Decorative elements
  decorativeCircle1: {
    position: 'absolute',
    top: 60,
    right: -40,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255,255,255,0.09)',
  },
  decorativeCircle2: {
    position: 'absolute',
    bottom: 160,
    left: -30,
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.13)',
  },
  decorativeCircle3: {
    position: 'absolute',
    top: 320,
    left: 30,
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: 'rgba(255,255,255,0.06)',
  },
});

export default WelcomeScreen;
