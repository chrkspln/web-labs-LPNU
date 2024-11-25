import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeFromCart, clearCart } from '../../redux/cartActions';
import Button from '../../utilities/Button';
import './Cart.css';

const Cart = () => {
    const cartItems = useSelector((state) => state.cart.cartItems);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleRemove = (id, selectedVolume) => {
        dispatch(removeFromCart(id, selectedVolume));
    };

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    const handleProceedToCheckout = () => {
        navigate('/checkout');
    };

    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => {
            return total + item.price * item.selectedQuantity;
        }, 0);
    };

    return (
        <div className="cart-container">
            <h2 className="cart-title">Your Shopping Cart</h2>
            {cartItems.length === 0 ? (
                <p className="empty-cart-message">Your cart is empty.</p>
            ) : (
                <>
                    <div className="cart-items">
                        {cartItems.map((item) => (
                            <div key={`${item.id}-${item.selectedVolume}`} className="cart-item">
                                <img src={item.image} alt={item.name} className="cart-item-image" />
                                <div className="cart-item-details">
                                    <h4 className="cart-item-name">{item.name}</h4>
                                    <p className="cart-item-color">Volume: {item.selectedVolume} ml</p>
                                    <p className="cart-item-selectedQuantity">Quantity: {item.selectedQuantity}</p>
                                    <p className="cart-item-price">
                                        Price per item: ₴{item.price.toLocaleString()}
                                    </p>
                                    <p className="cart-item-total">
                                        Total: ₴{(item.price * item.selectedQuantity).toLocaleString()}
                                    </p>
                                    <Button
                                        className="remove-button"
                                        onClick={() => handleRemove(item.id, item.selectedVolume)}>
                                        Remove
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="cart-summary">
                        <h3>Cart Summary</h3>
                        <p>Total Items: {cartItems.reduce((sum, item) => sum + item.selectedQuantity, 0)}</p>
                        <p>Total Price: ₴{getTotalPrice().toLocaleString()}</p>
                        <Button className="clear-cart-button" onClick={handleClearCart}>
                            Clear Cart
                        </Button>
                        <Button className="checkout-button" onClick={handleProceedToCheckout}>Proceed to Checkout</Button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Cart;