"use client";
import React, { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import Filter from "../_components/Filter"; // Importing the Filter component
import BreadCrumb from "../_components/BreadCrumb"; // Importing the Breadcrumb component
import Link from "next/link"; // Importing Link for navigation

const PhoneCasesPage = () => {
  const { addToCart } = useCart(); // Access the addToCart function
  const [isClient, setIsClient] = useState(false);

  // Ensure this component is only rendered on the client
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Updated phone cases list with id, title, price, and image data
  const phoneCases = [
    { id: "1", title: "Case 1", price: 25, imageUrl: "https://via.placeholder.com/200" },
    { id: "2", title: "Case 2", price: 30, imageUrl: "https://via.placeholder.com/200" },
    { id: "3", title: "Case 3", price: 35, imageUrl: "https://via.placeholder.com/200" },
    { id: "4", title: "Case 4", price: 40, imageUrl: "https://via.placeholder.com/200" },
    { id: "5", title: "Case 5", price: 45, imageUrl: "https://via.placeholder.com/200" },
    { id: "6", title: "Case 6", price: 50, imageUrl: "https://via.placeholder.com/200" },
    { id: "7", title: "Case 7", price: 55, imageUrl: "https://via.placeholder.com/200" },
    { id: "8", title: "Case 8", price: 60, imageUrl: "https://via.placeholder.com/200" },
    { id: "9", title: "Case 9", price: 65, imageUrl: "https://via.placeholder.com/200" },
  ];

  // Avoid rendering until client-side rendering is ensured
  if (!isClient) {
    return null;
  }

  return (
    <div className="p-6">
      {/* Breadcrumb Section */}
      <div className="mb-6">
        <BreadCrumb currentPage="Phone Cases" /> {/* Pass "Phone Cases" to BreadCrumb */}
      </div>

      {/* Main Section */}
      <div className="flex flex-col lg:flex-row">
        {/* Filter Section on the Left */}
        <div className="lg:w-1/4 w-full mb-8 lg:mb-0 lg:mr-8">
          <div className="text-center mb-4">
            <h2 className="text-2xl font-semibold">Filters</h2>
          </div>
          <Filter /> {/* Filter Component */}
        </div>

        {/* Phone Cases List Section */}
        <div className="lg:w-3/4 w-full">
          <h1 className="text-3xl font-bold mb-4">Phone Cases</h1>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {phoneCases.map((phoneCase) => (
              <li
                key={phoneCase.id}
                className="flex flex-col bg-white p-4 rounded shadow-md transition-transform hover:scale-105 relative"
              >
                {/* Link to individual product details */}
                <Link href={`/product-details/phoneCases/${phoneCase.id}`}>
                  <div>
                    <img src={phoneCase.imageUrl} alt={phoneCase.title} className="w-full h-40 object-cover rounded mb-2" />
                    <h3 className="text-xl font-medium">{phoneCase.title}</h3>
                    <p className="text-gray-700 mt-2">Price: ${phoneCase.price}</p>
                  </div>
                </Link>

                {/* Button to add product to cart */}
                <button
                  onClick={() => addToCart({
                    ...phoneCase, quantity: 1,
                    imageUrl: phoneCase.imageUrl,
                    details: "Some details for the phone case"
                  })}
                  className="mt-4 bg-yellow-400 text-white py-2 px-4 rounded"
                >
                  Add to Cart
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PhoneCasesPage;
