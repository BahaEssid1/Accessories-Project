
"use client";
import React, { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import Filter from "../_components/Filter";
import BreadCrumb from "../_components/BreadCrumb";
import Link from "next/link"; // Importing Link for navigation

const PowerBanksPage = () => {
  const { addToCart } = useCart();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Power bank data with images (Update image paths later)
  const powerBanks = [
    { id: "1", title: "Power Bank 1", price: 25, imageUrl: "/images/powerbanks/pb1.jpg", inStock: true },
    { id: "2", title: "Power Bank 2", price: 30, imageUrl: "/images/powerbanks/pb2.jpg", inStock: false },
    { id: "3", title: "Power Bank 3", price: 35, imageUrl: "/images/powerbanks/pb3.jpg", inStock: true },
    { id: "4", title: "Power Bank 4", price: 40, imageUrl: "/images/powerbanks/pb4.jpg", inStock: true },
    { id: "5", title: "Power Bank 5", price: 45, imageUrl: "/images/powerbanks/pb5.jpg", inStock: false },
    { id: "6", title: "Power Bank 6", price: 50, imageUrl: "/images/powerbanks/pb6.jpg", inStock: true },
    { id: "7", title: "Power Bank 7", price: 55, imageUrl: "/images/powerbanks/pb7.jpg", inStock: true },
    { id: "8", title: "Power Bank 8", price: 60, imageUrl: "/images/powerbanks/pb8.jpg", inStock: false },
    { id: "9", title: "Power Bank 9", price: 65, imageUrl: "/images/powerbanks/pb9.jpg", inStock: true },
  ];

  if (!isClient) {
    return null; // Prevents hydration issues
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <BreadCrumb currentPage="Power Banks" />
      </div>

      <div className="flex flex-col lg:flex-row">
        {/* Filter Section */}
        <div className="lg:w-1/4 w-full mb-8 lg:mb-0 lg:mr-8">
          <div className="text-center mb-4">
            <h2 className="text-2xl font-semibold">Filters</h2>
          </div>
          <Filter />
        </div>

        {/* Product Listing */}
        <div className="lg:w-3/4 w-full">
          <h1 className="text-3xl font-bold mb-4">Power Banks</h1>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {powerBanks.map((powerBank) => (
              <li
                key={powerBank.id}
                className="flex flex-col bg-white p-4 rounded shadow-md transition-transform hover:scale-105 relative min-h-[400px]"
              >
                <Link href={`/product-details/power-bank/${powerBank.id}`} className="flex flex-col h-full cursor-pointer">
                  <div className="w-full h-48 relative">
                    <img
                      src={powerBank.imageUrl}
                      alt={powerBank.title}
                      className="w-full h-48 object-contain rounded"
                    />
                  </div>
                  <h3 className="text-xl font-medium mt-2">{powerBank.title}</h3>
                  {/* Stock Status */}
                  <p className={`text-center text-xl mt-1 ${powerBank.inStock ? "text-green-500" : "text-red-500"}`}>
                    {powerBank.inStock ? "In Stock" : "Out of Stock"}
                  </p>
                  <p className="text-center text-orange-500 mt-2 text-xl">Price: ${powerBank.price}</p>
                </Link>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    addToCart({
                      ...powerBank,
                      quantity: 1,
                      imageUrl: powerBank.imageUrl,
                      details: "Details of the power bank",
                    });
                  }}
                  className="mt-4 bg-orange-500 text-white py-2 px-4 rounded w-full"
                  disabled={!powerBank.inStock}
                >
                  {powerBank.inStock ? "Add to Cart" : "Out of Stock"}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PowerBanksPage;
