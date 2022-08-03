import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

import Button from "../button/Buttom";
import CartItem from "../cartItem/CartItem";
import "./cartDropdown.style.scss";

const CartDropdown = () => {
  const { cartItems } = useContext(CartContext);
  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {cartItems.map((item) => (
          <CartItem CartItem={item} key={item.id} />
        ))}
      </div>
      <Button>GO TO CHECKOUT</Button>
    </div>
  );
};

export default CartDropdown;
