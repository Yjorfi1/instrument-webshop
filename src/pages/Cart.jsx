import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  getCart, 
  removeFromCart, 
  clearCart, 
  getCartTotal,
  updateQuantity 
} from '../utils/cartStorage';
import '../App.css';

const Cart = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [cardData, setCardData] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const currentCart = getCart();
    setCart(currentCart);
    setTotal(getCartTotal());
  }, []);

  const handleCheckout = () => {
    setShowCheckoutModal(true);
    setPaymentMethod(null);
  };

  const handleCardChange = (e) => {
    const { name, value } = e.target;
    setCardData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleIDEALPayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setCheckoutSuccess(true);
      setTimeout(() => {
        setCheckoutSuccess(false);
        setShowCheckoutModal(false);
        setPaymentMethod(null);
        setCardData({
          cardNumber: '',
          cardHolder: '',
          expiryDate: '',
          cvv: ''
        });
      }, 3000);
    }, 2000);
  };

  const handleCreditCardSubmit = (e) => {
    e.preventDefault();
    if (!cardData.cardNumber || !cardData.cardHolder || !cardData.expiryDate || !cardData.cvv) {
      alert('Not enough card details filled in');
      return;
    }
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setCheckoutSuccess(true);
      setTimeout(() => {
        setCheckoutSuccess(false);
        setShowCheckoutModal(false);
        setPaymentMethod(null);
        setCardData({
          cardNumber: '',
          cardHolder: '',
          expiryDate: '',
          cvv: ''
        });
      }, 3000);
    }, 2000);
  };

  return (
    <div>
      <button onClick={() => navigate('/')}>← Back to Shop</button>
      <h1>Shopping Cart</h1>

      {checkoutSuccess && (
        <div className="checkout-success">
          <h2>Payment Successful 🎉</h2>
        </div>
      )}

      {showCheckoutModal && (
        <div className="checkout-modal-overlay">
          <div className="checkout-modal">
            {checkoutSuccess ? (
              <div className="payment-success">
                <h2>✓ Payment Processed!</h2>
                <p>Thank you for your purchase.</p>
              </div>
            ) : isProcessing ? (
             <></>
            ) : paymentMethod === null ? (
              <div className="payment-selection">
                <h2>Select Payment Method</h2>
                <div className="payment-options">
                  <button 
                    className="payment-option-btn idea-btn"
                    onClick={() => setPaymentMethod('idea')}
                  >
                    <div className="option-icon">💳</div>
                    <div className="option-text">
                      <h3>iDEAL</h3>
                    </div>
                  </button>
                  <button 
                    className="payment-option-btn card-btn"
                    onClick={() => setPaymentMethod('card')}
                  >
                    <div className="option-icon">💰</div>
                    <div className="option-text">
                      <h3>Credit Card</h3>
                    </div>
                  </button>
                </div>
                <button 
                  className="cancel-btn"
                  onClick={() => setShowCheckoutModal(false)}
                >
                  Cancel
                </button>
              </div>
            ) : paymentMethod === 'idea' ? (
              <div className="idea-payment">
                <h2>iDEAL Payment</h2>
                <p>You will be redirected to your bank to complete the payment.</p>
                <div className="bank-selection">
                  <p>Select your bank:</p>
                  <select>
                    <option>Choose your bank...</option>
                    <option>ING</option>
                    <option>ABN AMRO</option>
                    <option>Rabobank</option>
                    <option>SNS Bank</option>
                    <option>Triodos Bank</option>
                  </select>
                </div>
                <div className="order-total">
                  <p>Amount to pay: <strong>€{total.toFixed(2)}</strong></p>
                </div>
                <button 
                  className="confirm-payment-btn"
                  onClick={handleIDEALPayment}
                  disabled={isProcessing}
                >
                  Continue
                </button>
                <button 
                  className="back-btn"
                  onClick={() => setPaymentMethod(null)}
                >
                  Back
                </button>
              </div>
            ) : paymentMethod === 'card' ? (
              <div className="card-payment">
                <h2>Credit Card Payment</h2>
                <form onSubmit={handleCreditCardSubmit}>
                  <div className="form-group">
                    <label>Card Number</label>
                    <input
                      type="text"
                      name="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={cardData.cardNumber}
                      onChange={handleCardChange}
                      maxLength="19"
                    />
                  </div>
                  <div className="form-group">
                    <label>Card Holder Name</label>
                    <input
                      type="text"
                      name="cardHolder"
                      placeholder="John Doe"
                      value={cardData.cardHolder}
                      onChange={handleCardChange}
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Expiry Date</label>
                      <input
                        type="text"
                        name="expiryDate"
                        placeholder="MM/YY"
                        value={cardData.expiryDate}
                        onChange={handleCardChange}
                        maxLength="5"
                      />
                    </div>
                    <div className="form-group">
                      <label>CVV</label>
                      <input
                        type="text"
                        name="cvv"
                        placeholder="123"
                        value={cardData.cvv}
                        onChange={handleCardChange}
                        maxLength="4"
                      />
                    </div>
                  </div>
                  <div className="order-total">
                    <p>Total Amount: <strong>€{total.toFixed(2)}</strong></p>
                  </div>
                  <button 
                    type="submit"
                    className="confirm-payment-btn"
                    disabled={isProcessing}
                  >
                    Pay Now
                  </button>
                  <button 
                    type="button"
                    className="back-btn"
                    onClick={() => setPaymentMethod(null)}
                  >
                    Back
                  </button>
                </form>
              </div>
            ) : null}
          </div>
        </div>
      )}

      {cart.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty</p>
          <button onClick={() => navigate('/')}>Continue Shopping</button>
        </div>
      ) : (
        <div className="cart-content">
          <div className="cart-items">
            {cart.map((product) => (
              <div key={product.id} className="cart-item">
                <img src={product.image} alt={product.title} />
                <div className="cart-item-info">
                  <h3>{product.title}</h3>
                  <p>€{product.price.toFixed(2)}</p>
                </div>
                <div className="quantity-control">
                  <button onClick={() => handleQuantityChange(product.id, product.quantity - 1)}>
                    -
                  </button>
                  <span>{product.quantity}</span>
                  <button onClick={() => handleQuantityChange(product.id, product.quantity + 1)}>
                    +
                  </button>
                </div>
                <div className="item-total">
                  <p>€{(product.price * product.quantity).toFixed(2)}</p>
                </div>
                <button 
                  className="remove-btn"
                  onClick={() => handleRemove(product.id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <div className="summary-row">
              <span>Items:</span>
              <span>{cart.reduce((sum, item) => sum + item.quantity, 0)}</span>
            </div>
            <div className="summary-row total">
              <span>Total:</span>
              <span>€{total.toFixed(2)}</span>
            </div>

            <button 
              className="checkout-btn"
              onClick={handleCheckout}
            >
              Checkout
            </button>

            <button 
              className="continue-shopping-btn"
              onClick={() => navigate('/')}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
