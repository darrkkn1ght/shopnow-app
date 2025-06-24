import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  StatusBar,
} from 'react-native';
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

const Header = ({
  title,
  subtitle,
  showBackButton = false,
  showCartButton = false,
  showSearchButton = false,
  showMenuButton = false,
  onBackPress,
  onCartPress,
  onSearchPress,
  onMenuPress,
  cartCount = 0,
  backgroundColor = '#FFF',
  titleColor = '#1A1A1A',
  iconColor = '#1A1A1A',
  style,
  rightComponent,
  leftComponent,
}) => {
  const renderLeftComponent = () => {
    if (leftComponent) {
      return leftComponent;
    }
    
    if (showBackButton) {
      return (
        <TouchableOpacity
          style={styles.iconButton}
          onPress={onBackPress}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={24} color={iconColor} />
        </TouchableOpacity>
      );
    }
    
    if (showMenuButton) {
      return (
        <TouchableOpacity
          style={styles.iconButton}
          onPress={onMenuPress}
          activeOpacity={0.7}
        >
          <Ionicons name="menu" size={24} color={iconColor} />
        </TouchableOpacity>
      );
    }
    
    return <View style={styles.iconButton} />;
  };

  const renderRightComponent = () => {
    if (rightComponent) {
      return rightComponent;
    }
    
    const rightButtons = [];
    
    if (showSearchButton) {
      rightButtons.push(
        <TouchableOpacity
          key="search"
          style={styles.iconButton}
          onPress={onSearchPress}
          activeOpacity={0.7}
        >
          <Ionicons name="search-outline" size={24} color={iconColor} />
        </TouchableOpacity>
      );
    }
    
    if (showCartButton) {
      rightButtons.push(
        <TouchableOpacity
          key="cart"
          style={[styles.iconButton, styles.cartButton]}
          onPress={onCartPress}
          activeOpacity={0.7}
        >
          <Ionicons name="bag-outline" size={24} color={iconColor} />
          {cartCount > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>
                {cartCount > 99 ? '99+' : cartCount}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      );
    }
    
    if (rightButtons.length === 0) {
      return <View style={styles.iconButton} />;
    }
    
    return (
      <View style={styles.rightContainer}>
        {rightButtons}
      </View>
    );
  };

  const renderTitle = () => {
    if (!title) return null;
    
    return (
      <View style={styles.titleContainer}>
        <Text style={[styles.title, { color: titleColor }]} numberOfLines={1}>
          {title}
        </Text>
        {subtitle && (
          <Text style={[styles.subtitle, { color: titleColor }]} numberOfLines={1}>
            {subtitle}
          </Text>
        )}
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor }, style]}>
      <View style={styles.content}>
        {renderLeftComponent()}
        {renderTitle()}
        {renderRightComponent()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    ...Shadows.small,
    zIndex: 1000,
    backgroundColor: Colors.background,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md - 4,
    minHeight: 56,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.md,
  },
  title: {
    ...Typography.h3,
    textAlign: 'center',
  },
  subtitle: {
    ...Typography.caption,
    textAlign: 'center',
    marginTop: 2,
    opacity: 0.7,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: BorderRadius.round,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cartButton: {
    position: 'relative',
  },
  cartBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: Colors.secondary,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.white,
  },
  cartBadgeText: {
    color: Colors.white,
    fontSize: 10,
    fontWeight: '600',
    textAlign: 'center',
  },
});

// Predefined header variants for common use cases
export const HeaderVariants = {
  // Main screen header with menu and cart
  main: (props) => (
    <Header
      showMenuButton={true}
      showCartButton={true}
      {...props}
    />
  ),
  
  // Detail screen header with back button
  detail: (props) => (
    <Header
      showBackButton={true}
      showCartButton={true}
      {...props}
    />
  ),
  
  // Search screen header with back and search
  search: (props) => (
    <Header
      showBackButton={true}
      showSearchButton={true}
      {...props}
    />
  ),
  
  // Simple header with just back button
  simple: (props) => (
    <Header
      showBackButton={true}
      {...props}
    />
  ),
  
  // Minimal header with no buttons
  minimal: (props) => (
    <Header
      {...props}
    />
  ),
};

export default Header;
