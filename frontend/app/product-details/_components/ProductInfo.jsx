// "use client"
// import React, { useState } from 'react';

// function ProductInfo({ title, details, price }) {
//   // State to hold the selected quantity
//   const [quantity, setQuantity] = useState(1);

//   // Handle change in quantity
//   const handleQuantityChange = (e) => {
//     const value = Math.max(1, parseInt(e.target.value)); // Ensure quantity is never less than 1
//     setQuantity(value);
//   };

//   const handleAddToCart = () => {
//     // You can handle the logic for adding to the cart here
//     console.log(`Added ${quantity} of ${title} to the cart!`);
//   };

//   return (
//     <div className="space-y-6">
//       <h2 className="text-2xl font-semibold">{title}</h2>
//       <p className="text-sm text-gray-700">{details}</p>
//       <p className="text-lg font-medium text-gray-900">${price}</p>

//       {/* Quantity Selector */}
//       <div className="flex items-center space-x-2">
//         <label htmlFor="quantity" className="text-sm font-medium text-gray-600">Quantity:</label>
//         <input
//           type="number"
//           id="quantity"
//           value={quantity}
//           onChange={handleQuantityChange}
//           min="1"
//           className="w-16 px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//       </div>

//       {/* Add to Cart Button with your custom style */}
//       <button
//         onClick={handleAddToCart}
//         className="mt-6 block w-full rounded bg-yellow-400 p-4 text-sm font-medium transition hover:scale-105"
//       >
//         Add to Cart
//       </button>
//     </div>
//   );
// }

// export default ProductInfo;

"use client"
import React, { useState } from 'react';
import { useCart } from '@/context/CartContext'; // Import the hook

function ProductInfo({ title, details, price, imageUrl }) {
  const { addToCart } = useCart(); // Get the addToCart function from context

  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    addToCart({ title, price, quantity, imageUrl });
  };

  return (
    <div className="flex flex-col justify-between gap-5 sm:gap-8">
  <div>
    <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
    <p className="mt-3 text-sm text-gray-500">{details}</p>
    <p className="mt-3 text-lg font-semibold text-gray-900">${price}</p>
    
    {/* Add Quantity Label and Input Field */}
    <div className="mt-2 flex items-center gap-2">
      <p className="text-sm text-gray-600">Quantity</p>
      <input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
        className="w-12 text-center bg-gray-100 rounded-md"
      />
    </div>
  </div>
  <div className="flex items-center gap-4">
    <button
      onClick={handleAddToCart}
      className="mt-6 block w-full rounded bg-yellow-400 p-4 text-sm font-medium transition hover:scale-105"
    >
      Add to Cart
    </button>
  </div>
</div>

  );
}

export default ProductInfo;
