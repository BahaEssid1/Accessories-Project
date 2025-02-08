"use client";
import React from "react";
import { useCart } from "@/context/CartContext"; // Importing the Cart context
import Filter from "../_components/Filter"; // Importing the Filter component
import BreadCrumb from "../_components/BreadCrumb"; // Importing the Breadcrumb component

const HeadphonesPage = () => {
  const { addToCart } = useCart(); // Accessing the addToCart function from the Cart context

  const headphones = [
    { id: "1", title: "Headphones 1", price: 50 },
    { id: "2", title: "Headphones 2", price: 60 },
    { id: "3", title: "Headphones 3", price: 70 },
    { id: "4", title: "Headphones 4", price: 80 },
    { id: "5", title: "Headphones 5", price: 90 },
    { id: "6", title: "Headphones 6", price: 100 },
    { id: "7", title: "Headphones 7", price: 110 },
    { id: "8", title: "Headphones 8", price: 120 },
    { id: "9", title: "Headphones 9", price: 130 },
  ]; // List of headphones

  return (
    <div className="p-6">
      {/* Breadcrumb Section */}
      <div className="mb-6">
        <BreadCrumb currentPage="Headphones" /> {/* Pass "Headphones" */}
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

        {/* Headphones List Section */}
        <div className="lg:w-3/4 w-full">
          <h1 className="text-3xl font-bold mb-4">Headphones</h1>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {headphones.map((headphone) => (
              <li
                key={headphone.id}
                className="bg-white p-4 rounded shadow-md flex flex-col justify-between"
              >
                <h3 className="text-xl font-medium">{headphone.title}</h3>
                <p className="text-gray-700 mt-2">Price: ${headphone.price}</p>
                <button
                  onClick={() => addToCart({ ...headphone, quantity: 1 })}
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

export default HeadphonesPage;
