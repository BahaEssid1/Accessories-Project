"use client";
import React from "react";
import { useCart } from "@/context/CartContext"; // Importing the Cart context
import Filter from "../_components/Filter"; // Importing the Filter component
import BreadCrumb from "../_components/BreadCrumb"; // Importing the Breadcrumb component

const ScreenProtectorsPage = () => {
  const { addToCart } = useCart(); // Accessing the addToCart function from the Cart context

  const screenProtectors = [
    { id: "1", title: "Screen Protector 1", price: 15 },
    { id: "2", title: "Screen Protector 2", price: 18 },
    { id: "3", title: "Screen Protector 3", price: 20 },
    { id: "4", title: "Screen Protector 4", price: 22 },
    { id: "5", title: "Screen Protector 5", price: 25 },
    { id: "6", title: "Screen Protector 6", price: 28 },
    { id: "7", title: "Screen Protector 7", price: 30 },
    { id: "8", title: "Screen Protector 8", price: 35 },
    { id: "9", title: "Screen Protector 9", price: 40 },
  ]; // List of screen protectors

  return (
    <div className="p-6">
      {/* Breadcrumb Section */}
      <div className="mb-6">
        <BreadCrumb currentPage="Screen Protectors" /> {/* Pass "Screen Protectors" to BreadCrumb */}
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

        {/* Screen Protectors List Section */}
        <div className="lg:w-3/4 w-full">
          <h1 className="text-3xl font-bold mb-4">Screen Protectors</h1>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {screenProtectors.map((screenProtector) => (
              <li
                key={screenProtector.id}
                className="bg-white p-4 rounded shadow-md flex flex-col justify-between"
              >
                <h3 className="text-xl font-medium">{screenProtector.title}</h3>
                <p className="text-gray-700 mt-2">Price: ${screenProtector.price}</p>
                <button
                  onClick={() => addToCart({ ...screenProtector, quantity: 1 })}
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

export default ScreenProtectorsPage;
