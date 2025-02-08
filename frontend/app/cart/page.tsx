"use client";

import { useCart } from "@/context/CartContext"; // Import the useCart hook
import { IoCartSharp } from "react-icons/io5";
import BreadCrumb from "../_components/BreadCrumb"; // Import the BreadCrumb component

const CartPage = () => {
  const { cartItems, getTotalPrice, removeFromCart } = useCart(); // Access cart items and functions

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb should always be visible */}
      <div className="py-6 px-4 sm:px-6 lg:px-8">
        <BreadCrumb currentPage="Cart" />
      </div>

      {cartItems.length === 0 ? (
        <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
          <IoCartSharp size={150} className="text-gray-500" /> {/* Icon with size and color */}
          <h1 className="text-2xl text-gray-900">Your cart is empty</h1>
          <p>Please add products to your shopping cart list.</p>
        </div>
      ) : (
        <div className="max-w-screen-xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Your Cart</h1>

          <div className="space-y-6">
            {/* Display each item in the cart */}
            {cartItems.map((item) => (
              <div
                key={`${item.id}_${item.title}`} // Ensuring uniqueness in the key prop
                className="flex items-center justify-between p-4 bg-white rounded-md shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">{item.title}</h2>
                    <p className="text-sm text-gray-500">{item.details}</p>
                    <p className="text-lg font-semibold text-gray-900">
                      ${item.price} x {item.quantity}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => removeFromCart(item.id, item.title)} // Pass both id and title to remove the item
                  className="text-sm text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="mt-8 p-4 bg-white rounded-md shadow-sm flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">Total Price:</h2>
            <span className="text-xl font-bold text-gray-900">${getTotalPrice()}</span>
          </div>

          {/* Proceed to Checkout button */}
          <div className="mt-6">
            <a href="/checkout">
              <button
                className="w-full py-3 bg-blue-600 text-white text-lg font-semibold rounded-md hover:bg-blue-700"
              >
                Proceed to Checkout
              </button>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
