import React from "react";
import CartItem from "./CartItem";
import CheckoutButton from "./CheckoutButton";

const Cart = ({ cartItems, onUpdateCart, onRemoveFromCart, setCartItems }) => {
  console.log(cartItems);
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div>
      <h1>Carrinho</h1>
      {cartItems.length === 0 ? (
        <>
          <p>Não há itens no carrinho</p>
        </>
      ) : (
        <>
          {cartItems.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onUpdateCart={onUpdateCart}
              onRemoveFromCart={onRemoveFromCart}
            />
          ))}
          <div className="total">
            <p>Total: ${totalPrice.toFixed(2)}</p>
            <CheckoutButton cartItems={cartItems} setCartItems={setCartItems} />
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
