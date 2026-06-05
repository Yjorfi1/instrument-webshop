const CART_KEY = 'instrument_shop_cart';

const getCart = () => {
  const cart = localStorage.getItem(CART_KEY);
  return cart ? JSON.parse(cart) : [];
};

const setCart = (cart) => {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
};

export const addToCart = (product) => {
  const cart = getCart();
  
  const existingItem = cart.find(item => item.id === product.id);
  
  if (existingItem) {
    existingItem.quantity = (existingItem.quantity || 1) + 1;
  } else {
    cart.push({
      ...product,
      quantity: 1
    });
  }
  
  setCart(cart);
};

export const removeFromCart = (productId) => {
  const cart = getCart();
  const updated = cart.filter(item => item.id !== productId);
  setCart(updated);
};

export const updateQuantity = (productId, quantity) => {
  const cart = getCart();
  const item = cart.find(item => item.id === productId);
  
  if (item) {
    item.quantity = quantity;
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart(cart);
    }
  }
};

export const clearCart = () => {
  localStorage.removeItem(CART_KEY);
};

export const getCartTotal = () => {
  const cart = getCart();
  return cart.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
};

export const getCartCount = () => {
  const cart = getCart();
  return cart.reduce((count, item) => count + (item.quantity || 1), 0);
};

export { getCart };
