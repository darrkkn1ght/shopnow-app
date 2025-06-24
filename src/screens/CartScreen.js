import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TextInput,
  Alert,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../context/CartContext';
import Header from '../components/Header';
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

const CartScreen = ({ navigation }) => {
  const {
    items,
    discount,
    updateQuantity,
    removeFromCart,
    clearCart,
    applyDiscountCode,
    removeDiscount,
    getCartSummary,
  } = useCart();

  const [discountCodeInput, setDiscountCodeInput] = useState('');
  const [isApplyingDiscount, setIsApplyingDiscount] = useState(false);

  const cartSummary = getCartSummary();

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      Alert.alert(
        'Remove Item',
        'Are you sure you want to remove this item from your cart?',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Remove',
            style: 'destructive',
            onPress: () => updateQuantity(productId, 0),
          },
        ]
      );
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleApplyDiscount = () => {
    if (!discountCodeInput.trim()) {
      Alert.alert('Error', 'Please enter a discount code.');
      return;
    }

    setIsApplyingDiscount(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const result = applyDiscountCode(discountCodeInput.trim());
      
      if (result.success) {
        setDiscountCodeInput('');
        Alert.alert('Success', result.message);
      } else {
        Alert.alert('Error', result.message);
      }
      
      setIsApplyingDiscount(false);
    }, 500);
  };

  const handleCheckout = () => {
    if (items.length === 0) {
      Alert.alert('Empty Cart', 'Your cart is empty. Add some items to proceed.');
      return;
    }

    Alert.alert(
      'Proceed to Checkout',
      `Total: $${cartSummary.total.toFixed(2)}\n\nThis is a demo app. Checkout functionality would redirect to payment processing.`,
      [
        { text: 'Continue Shopping', style: 'cancel' },
        { text: 'Proceed', onPress: () => {/* Navigate to checkout */} }
      ]
    );
  };

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <TouchableOpacity
        onPress={() => navigation.navigate('ProductDetail', { product: item.product })}
      >
        <Image source={item.product.image} style={styles.productImage} />
      </TouchableOpacity>
      
      <View style={styles.itemDetails}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ProductDetail', { product: item.product })}
        >
          <Text style={styles.productName} numberOfLines={2}>
            {item.product.name}
          </Text>
        </TouchableOpacity>
        
        <Text style={styles.productCategory}>{item.product.category}</Text>
        
        <View style={styles.priceQuantityContainer}>
          <Text style={styles.itemPrice}>${item.product.price}</Text>
          
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => handleQuantityChange(item.product.id, item.quantity - 1)}
            >
              <Ionicons name="remove" size={16} color="#007AFF" />
            </TouchableOpacity>
            
            <Text style={styles.quantityText}>{item.quantity}</Text>
            
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => handleQuantityChange(item.product.id, item.quantity + 1)}
            >
              <Ionicons name="add" size={16} color="#007AFF" />
            </TouchableOpacity>
          </View>
        </View>
        
        <Text style={styles.itemTotal}>
          Total: ${(item.product.price * item.quantity).toFixed(2)}
        </Text>
      </View>
      
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => removeFromCart(item.product.id)}
      >
        <Ionicons name="trash-outline" size={20} color="#FF6B35" />
      </TouchableOpacity>
    </View>
  );

  const renderEmptyCart = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="bag-outline" size={80} color="#CCC" />
      <Text style={styles.emptyTitle}>Your cart is empty</Text>
      <Text style={styles.emptySubtitle}>
        Looks like you haven't added anything to your cart yet
      </Text>
      <TouchableOpacity
        style={styles.shopNowButton}
        onPress={() => navigation.navigate('ProductList')}
      >
        <Text style={styles.shopNowText}>Start Shopping</Text>
      </TouchableOpacity>
    </View>
  );

  const renderDiscountSection = () => (
    <View style={styles.discountSection}>
      <Text style={styles.sectionTitle}>Discount Code</Text>
      
      {discount ? (
        <View style={styles.appliedDiscountContainer}>
          <View style={styles.discountInfo}>
            <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
            <Text style={styles.appliedDiscountText}>
              {discount.code} applied ({discount.type === 'percentage' ? `${discount.discount}%` : `$${discount.discount}`} off)
            </Text>
          </View>
          <TouchableOpacity onPress={removeDiscount}>
            <Text style={styles.removeDiscountText}>Remove</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.discountInputContainer}>
          <TextInput
            style={styles.discountInput}
            placeholder="Enter discount code"
            value={discountCodeInput}
            onChangeText={setDiscountCodeInput}
            autoCapitalize="characters"
          />
          <TouchableOpacity
            style={[styles.applyButton, isApplyingDiscount && styles.applyButtonDisabled]}
            onPress={handleApplyDiscount}
            disabled={isApplyingDiscount}
          >
            <Text style={styles.applyButtonText}>
              {isApplyingDiscount ? 'Applying...' : 'Apply'}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  const renderOrderSummary = () => (
    <View style={styles.summarySection}>
      <Text style={styles.sectionTitle}>Order Summary</Text>
      
      {cartSummary.freeShippingRemaining > 0 && (
        <View style={styles.freeShippingAlert}>
          <Ionicons name="information-circle-outline" size={16} color="#007AFF" />
          <Text style={styles.freeShippingText}>
            Add ${cartSummary.freeShippingRemaining.toFixed(2)} more for free shipping!
          </Text>
        </View>
      )}
      
      <View style={styles.summaryRow}>
        <Text style={styles.summaryLabel}>Subtotal ({cartSummary.itemCount} items)</Text>
        <Text style={styles.summaryValue}>${cartSummary.subtotal.toFixed(2)}</Text>
      </View>
      
      {cartSummary.discountAmount > 0 && (
        <View style={styles.summaryRow}>
          <Text style={[styles.summaryLabel, styles.discountLabel]}>
            Discount ({discount.code})
          </Text>
          <Text style={[styles.summaryValue, styles.discountValue]}>
            -${cartSummary.discountAmount.toFixed(2)}
          </Text>
        </View>
      )}
      
      <View style={styles.summaryRow}>
        <Text style={styles.summaryLabel}>Shipping</Text>
        <Text style={[styles.summaryValue, cartSummary.shipping === 0 && styles.freeText]}>
          {cartSummary.shipping === 0 ? 'FREE' : `$${cartSummary.shipping.toFixed(2)}`}
        </Text>
      </View>
      
      <View style={styles.summaryRow}>
        <Text style={styles.summaryLabel}>Tax</Text>
        <Text style={styles.summaryValue}>${cartSummary.tax.toFixed(2)}</Text>
      </View>
      
      <View style={[styles.summaryRow, styles.totalRow]}>
        <Text style={styles.totalLabel}>Total</Text>
        <Text style={styles.totalValue}>${cartSummary.total.toFixed(2)}</Text>
      </View>
    </View>
  );

  if (items.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
        <Header
          title="Shopping Cart"
          showBackButton={true}
          onBackPress={() => navigation.goBack()}
        />
        {renderEmptyCart()}
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
      
      <Header
        title="Shopping Cart"
        subtitle={`${cartSummary.itemCount} item${cartSummary.itemCount !== 1 ? 's' : ''}`}
        showBackButton={true}
        onBackPress={() => navigation.goBack()}
        rightComponent={
          <TouchableOpacity onPress={clearCart} style={styles.clearButton}>
            <Text style={styles.clearButtonText}>Clear</Text>
          </TouchableOpacity>
        }
      />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <FlatList
          data={items}
          renderItem={renderCartItem}
          keyExtractor={(item) => item.product.id.toString()}
          scrollEnabled={false}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
        
        {renderDiscountSection()}
        {renderOrderSummary()}
      </ScrollView>
      
      <View style={styles.checkoutContainer}>
        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={handleCheckout}
        >
          <Text style={styles.checkoutButtonText}>
            Proceed to Checkout • ${cartSummary.total.toFixed(2)}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
  },
  cartItem: {
    flexDirection: 'row',
    padding: Spacing.md,
    backgroundColor: Colors.white,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: BorderRadius.small,
    backgroundColor: Colors.background,
  },
  itemDetails: {
    flex: 1,
    marginLeft: Spacing.sm + 4,
    justifyContent: 'space-between',
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  productCategory: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: Spacing.sm,
  },
  priceQuantityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.primary,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderRadius: BorderRadius.small,
    padding: 2,
  },
  quantityButton: {
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.small,
  },
  quantityText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginHorizontal: Spacing.md - 4,
    minWidth: 16,
    textAlign: 'center',
  },
  itemTotal: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  removeButton: {
    padding: Spacing.sm,
    justifyContent: 'flex-start',
  },
  separator: {
    height: 1,
    backgroundColor: Colors.lightGray,
    marginHorizontal: Spacing.md,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginTop: Spacing.md,
    marginBottom: Spacing.sm,
  },
  emptySubtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: Spacing.xl,
  },
  shopNowButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.lg - 2,
    borderRadius: BorderRadius.medium,
  },
  shopNowText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  discountSection: {
    margin: Spacing.md,
    padding: Spacing.md,
    backgroundColor: Colors.background,
    borderRadius: BorderRadius.medium,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
  },
  appliedDiscountContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  discountInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  appliedDiscountText: {
    fontSize: 14,
    color: '#4CAF50',
    marginLeft: Spacing.sm,
    flex: 1,
  },
  removeDiscountText: {
    fontSize: 14,
    color: Colors.secondary,
    fontWeight: '500',
  },
  discountInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  discountInput: {
    flex: 1,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.lightGray,
    borderRadius: BorderRadius.small,
    paddingHorizontal: Spacing.md - 4,
    paddingVertical: Spacing.sm,
    fontSize: 14,
    marginRight: Spacing.sm,
  },
  applyButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.small,
  },
  applyButtonDisabled: {
    backgroundColor: Colors.mediumGray,
  },
  applyButtonText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '500',
  },
  summarySection: {
    margin: Spacing.md,
    padding: Spacing.md,
    backgroundColor: Colors.background,
    borderRadius: BorderRadius.medium,
  },
  freeShippingAlert: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E3F2FD',
    padding: Spacing.sm,
    borderRadius: BorderRadius.small,
    marginBottom: Spacing.md - 4,
  },
  freeShippingText: {
    fontSize: 12,
    color: Colors.primary,
    marginLeft: Spacing.xs,
    flex: 1,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  summaryLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.textPrimary,
  },
  discountLabel: {
    color: '#4CAF50',
  },
  discountValue: {
    color: '#4CAF50',
  },
  freeText: {
    color: '#4CAF50',
    fontWeight: '600',
  },
  totalRow: {
    marginTop: Spacing.sm,
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.lightGray,
    marginBottom: 0,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.primary,
  },
  clearButton: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
  },
  clearButtonText: {
    fontSize: 14,
    color: Colors.secondary,
    fontWeight: '500',
  },
  checkoutContainer: {
    padding: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.lightGray,
    backgroundColor: Colors.white,
  },
  checkoutButton: {
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.lg,
    borderRadius: BorderRadius.medium,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: '600',
  },
});

export default CartScreen;
