import { useContext } from "react";

import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";

import { CartContext } from "../../contexts/cart.context";

import "./cartIcon.style.scss";

const CartIcon = () => {
  const { isCartOpen, setIsCartOpen, cartItems } = useContext(CartContext);
  console.log(cartItems);
  const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);

  const totalCartItems = cartItems.reduce((prev, curr) => {
    return curr.quantity + prev;
  }, 0);

  return (
    <div className="cart-icon-container" onClick={toggleIsCartOpen}>
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">{totalCartItems}</span>
    </div>
  );
};

export default CartIcon;
