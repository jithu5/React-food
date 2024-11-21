import React, { useContext } from "react";
import Modal from "./UI/Modal";
import { cartContext } from "../store/CartContext";
import { currencyFormatter } from "../../public/utils/formatting";
import Input from "./UI/Input";
import Button from "./UI/Button";
import { userProgressContext } from "../store/UserProgressContext";
import UseHttp from "../hooks/UseHttp";
import FetchError from "./FetchError";

const config = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};
function Checkout() {
  const { cartItems,clearCart } = useContext(cartContext);
  const { progress, hideCheckout } = useContext(userProgressContext);

  const { isLoading:isSending, error, data, sendRequest,clearData } = UseHttp(
    "http://localhost:3000/orders",
    config
  );

  const totalPrice = cartItems.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

  function handleClose() {
    hideCheckout();
  }
  function handleFinish() {
    hideCheckout();
    clearData()
    clearCart()
    
  }
  function handleSubmit(e) {
    e.preventDefault();
    // Add your own logic to handle form submission
    const fd = new FormData(e.target);
    const customerData = Object.fromEntries(fd.entries());

    sendRequest(
      JSON.stringify({
        order: {
          items: cartItems,
          customer: customerData,
        },
      })
    );
  }
  let actions = (
    <>
      <Button type="button" textOnly onClick={handleClose}>
        Close
      </Button>
      <Button>Submit Order</Button>
    </>
  );

  if (isSending) {
    actions=<span>Sending Order data...</span>
  }
  if (data && !error) {
    return <Modal open={progress==="checkout"} onClose={handleFinish}>
      <h2>Success!</h2>
      <p>Your order was submitted successfully</p>
      <p>We will get back to you with more details within the next few minutes</p>
      <p className="modal-actions">
        <Button onClick={handleFinish}>Okay</Button>
      </p>
    </Modal>
  }
  return (
    <Modal open={progress === "checkout"} onClose={handleClose}>
      <form onSubmit={handleSubmit} action="" method="post">
        <h2>Checkout</h2>
        <p>Total Amount : {currencyFormatter.format(totalPrice)} </p>
        <Input label="Full Name" type="text" id="name" />
        <Input label={"E-Mail"} id="email" type="email" />
        <Input label="Street" type="text" id="street" />
        <div className="control-row">
          <Input label="Postal Code" type="text" id="postal-code" />
          <Input label="City" type="text" id="city" />
        </div>
        {error && <FetchError title="failed to submit order" msg={error}/>}
        <p className="modal-actions">
          {actions}
        </p>
      </form>
    </Modal>
  );
}

export default Checkout;
