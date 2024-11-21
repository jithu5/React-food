import React, { useContext } from "react";
import Modal from "./UI/Modal";
import { cartContext } from "../store/CartContext";
import { currencyFormatter } from "../../public/utils/formatting";
import Button from "./UI/Button";
import { userProgressContext } from "../store/UserProgressContext";
import CartItems from "./UI/CartItems";

function Cart() {
  const { cartItems, removeItem, addItem } = useContext(cartContext);
  const { progress, hideCart,showCheckout } = useContext(userProgressContext);
  const totalPrice = cartItems.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

  function handleClosecart() {
    hideCart();
  }
  function handleShowCheckout() {
    showCheckout()
  }
  return (
    <Modal className="cart" open={progress == "cart"} onClose={progress==="cart"?handleClosecart:null} >
      <h2>YOUR CART</h2>
      <ul>
        {cartItems.map((cartItem) => {
          return (
            <CartItems
              key={cartItem.id}
              item={cartItem}
              onIncrease={() => addItem(cartItem)}
              onDecrease={() => removeItem(cartItem.id)}
            />
          );
        })}
      </ul>
      <p className="cart-total">
        Total price : {currencyFormatter.format(totalPrice)}
      </p>
      <p className="modal-actions">
        <Button textOnly onClick={handleClosecart}>
          Close
        </Button>
        {cartItems.length > 0 && <Button onClick={handleShowCheckout}>Go to Checkout</Button>}
      </p>
    </Modal>
  );
}

export default Cart;
