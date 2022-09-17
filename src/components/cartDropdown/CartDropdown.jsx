import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCartItems } from "../../store/cart/cart.selector";

import Button from "../button/Buttom";
import CartItem from "../cartItem/CartItem";
import "./cartDropdown.style.scss";

const CartDropdown = () => {
  const cartItems = useSelector(selectCartItems);
  const navigate = useNavigate();

  const goToCheckout = () => {
    navigate("/checkout");
  };
  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {cartItems.map((item) => (
          <CartItem CartItem={item} key={item.id} />
        ))}
      </div>
      <Button onClick={goToCheckout}>GO TO CHECKOUT</Button>
    </div>
  );
};

export default CartDropdown;
