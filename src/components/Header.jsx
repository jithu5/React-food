import React, { useContext } from "react";
import logo from "../assets/logo.jpg";
import Button from "./UI/Button.jsx";
import { cartContext } from "../store/CartContext.jsx";
import { userProgressContext } from "../store/UserProgressContext.jsx";

function Header() {
    const {cartItems} = useContext(cartContext)
    const {showCart} = useContext(userProgressContext)
    const totalItems = cartItems.reduce((total, item) => total + item.quantity,0);

    function handleShowCart() {
      showCart()
    }
  return (
    <header id="main-header">
      <div id="title">
        <img src={logo} alt="A restaurant" />
        <h1>React Food</h1>
      </div>
      <nav>
        <Button textOnly onClick={handleShowCart}>Cart ({totalItems})</Button>
      </nav>
    </header>
  );
}

export default Header;
