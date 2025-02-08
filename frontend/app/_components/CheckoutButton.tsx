import { FC } from "react";

interface CheckoutButtonProps {
  cartItems: any[];
  onCheckout: () => void; // Add the onCheckout callback prop
}

const CheckoutButton: FC<CheckoutButtonProps> = ({ cartItems, onCheckout }) => {
  return (
    <button
      onClick={onCheckout}
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
    >
      Proceed to Checkout
    </button>
  );
};

export default CheckoutButton;
