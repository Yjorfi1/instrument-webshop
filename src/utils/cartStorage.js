const CART_KEY = 'instrument_shop_cart'

var getCart = () => {
  var cart = localStorage.getItem(CART_KEY)
  return cart ? JSON.parse(cart) : []
}

var setCart = (cart) => {
  localStorage.setItem(CART_KEY, JSON.stringify(cart))
}

export var addToCart = (product) => {
  var cart = getCart()
  
  var existingItem = cart.find(item => item.id === product.id)
  
  if (existingItem) {
    existingItem.quantity = (existingItem.quantity || 1) + 1
  } else {
    cart.push({
      ...product,
      quantity: 1
    })
  }
  
  setCart(cart)
}

export var removeFromCart = (productId) => {
  var cart = getCart()
  var updated = cart.filter(item => item.id !== productId)
  setCart(updated)
}

export var updateQuantity = (productId, quantity) => {
  var cart = getCart()
  var item = cart.find(item => item.id === productId)
  
  if (item) {
    item.quantity = quantity
    if (quantity <= 0) {
      removeFromCart(productId)
    } else {
      setCart(cart)
    }
  }
}

export var clearCart = () => {
  localStorage.removeItem(CART_KEY)
}

export var getCartTotal = () => {
  var cart = getCart()
  return cart.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0)
}

export var getCartCount = () => {
  var cart = getCart()
  return cart.reduce((count, item) => count + (item.quantity || 1), 0)
}

export { getCart }
 