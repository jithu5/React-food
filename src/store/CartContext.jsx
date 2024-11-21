import React, { createContext, useReducer } from "react";

const cartContext = createContext({
  cartItems: [],
  addItem: (item) => {},
  removeItem: (id) => {},
  clearCart: () => {}
});
function cartReducer(state, action) {
  // add cart items
  if (action.type === "ADD_ITEM") {
    // check if cart items already exist
    const existingcartItemIndex = state.cartItems.findIndex(
      (item) => item.id === action.item.id
    );
    const updatedItems = [...state.cartItems];
    // if item already exists, increment quantity
    if (existingcartItemIndex > -1) {
      const exisitingitem = state.cartItems[existingcartItemIndex];
      const updatedItem = {
        ...exisitingitem,
        quantity: exisitingitem.quantity + 1,
      };
      updatedItems[existingcartItemIndex] = updatedItem;
    }
    // if not exists add it to the items
    else {
      updatedItems.push({ ...action.item, quantity: 1 });
    }
    // return the final output
    return {
      ...state,
      cartItems: updatedItems,
    };
  }
  //remove cart items
  else if (action.type === "REMOVE_ITEM") {
    // check if cart items exist with more quantity than 1
    const existingcartItemIndex = state.cartItems.findIndex(
      (item) => item.id === action.id
    );
    if (existingcartItemIndex === -1) {
      console.log("not found");
      return state;
    }
    const updatedItems = [...state.cartItems];
    const exisitingitem = state.cartItems[existingcartItemIndex];

    // if the quantity is 1 remove the whole item
    if (exisitingitem.quantity === 1) {
      updatedItems.splice(existingcartItemIndex, 1);
    }
    // if item has more quantity than 1, decrement quantity
    else {
      const updatedItem = {
        ...exisitingitem,
        quantity: exisitingitem.quantity - 1,
      };
      updatedItems[existingcartItemIndex] = updatedItem;
    }
    return {
      ...state,
      cartItems: updatedItems,
    };
  }
  if (action.type === "CLEAR_CART") {
    return { ...state, cartItems: [] };
  }

  return state;
}
function CartContextProvider({ children }) {
  const [cart, dispatchCartAction] = useReducer(cartReducer, {
    cartItems: [],
  });
  const cartContextValue = {
    cartItems: cart.cartItems,
    addItem: (item) => dispatchCartAction({ type: "ADD_ITEM", item }),
    removeItem: (id) => dispatchCartAction({ type: "REMOVE_ITEM", id }),
    clearCart: () => dispatchCartAction({ type: "CLEAR_CART" })  // new action for clearing cart items
  };
  return (
    <cartContext.Provider value={cartContextValue}>
      {children}
    </cartContext.Provider>
  );
}

export { cartContext, CartContextProvider };
