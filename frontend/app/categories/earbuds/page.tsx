"use client";
import React, { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import Filter from "../_components/Filter"; // Importing the Filter component
import BreadCrumb from "../_components/BreadCrumb"; // Importing the Breadcrumb component
import Link from "next/link"; // Importing Link for navigation

const EarbudsPage = () => {
  const { addToCart } = useCart(); // Access the addToCart function
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Hardcoded list of earbuds with brand logo, image, stock status and other data
  const earbuds = [
    { id: "1", title: "Earbud Sony WF-1000XM4", price: 120, brand: "Sony", brandLogo: "/images/logos/sony-logo.png", imageUrl: "/images/earbuds/earbud1.jpg", inStock: true },
    { id: "2", title: "Apple AirPods Pro (2nd Gen)", price: 250, brand: "Apple", brandLogo: "/images/logos/apple-logo.png", imageUrl: "/images/earbuds/earbud2.jpg", inStock: false },
    { id: "3", title: "Samsung Galaxy Buds2 Pro", price: 180, brand: "Samsung", brandLogo: "/images/logos/samsung-logo.png", imageUrl: "/images/earbuds/earbud3.jpg", inStock: true },
    { id: "4", title: "Jabra Elite 7 Active", price: 140, brand: "Jabra", brandLogo: "/images/logos/jabra-logo.png", imageUrl: "/images/earbuds/earbud4.jpg", inStock: true },
    { id: "5", title: "Bose QuietComfort Earbuds II", price: 230, brand: "Bose", brandLogo: "/images/logos/bose-logo.png", imageUrl: "/images/earbuds/earbud5.jpg", inStock: false },
    { id: "6", title: "Beats Fit Pro", price: 200, brand: "Beats", brandLogo: "/images/logos/beats-logo.png", imageUrl: "/images/earbuds/earbud6.jpg", inStock: true },
    { id: "7", title: "Sennheiser Momentum True Wireless 3", price: 220, brand: "Sennheiser", brandLogo: "/images/logos/sennheiser-logo.png", imageUrl: "/images/earbuds/earbud7.jpg", inStock: true },
    { id: "8", title: "Anker Soundcore Liberty 3 Pro", price: 100, brand: "Anker", brandLogo: "/images/logos/anker-logo.png", imageUrl: "/images/earbuds/earbud8.jpg", inStock: false },
    { id: "9", title: "Nothing Ear (2)", price: 130, brand: "Nothing", brandLogo: "/images/logos/nothing-logo.png", imageUrl: "/images/earbuds/earbud9.jpg", inStock: true },
  ];

  if (!isClient) return null;

  return (
    <div className="p-6">
      <div className="mb-6">
        <BreadCrumb currentPage="Earbuds" />
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
          <h1 className="text-3xl font-bold mb-4">Earbuds</h1>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {earbuds.map((earbud) => (
              <li
                key={earbud.id}
                className="flex flex-col bg-white p-4 rounded shadow-md transition-transform hover:scale-105 relative min-h-[400px]"
              >
                <Link href={`/product-details/earbud/${earbud.id}`} className="flex flex-col h-full cursor-pointer">
                  <img
                    src={earbud.imageUrl}
                    alt={earbud.title}
                    className="w-full h-40 object-contain rounded mb-2"
                  />
                  <h3 className="text-xl font-medium line-clamp-2">{earbud.title}</h3>
                  <p className={`text-center text-xl mt-1 ${earbud.inStock ? "text-green-500" : "text-red-500"}`}>
                    {earbud.inStock ? "In Stock" : "Out of Stock"}
                  </p>
                  <p className="text-center text-orange-500 mt-2 text-xl">Price: ${earbud.price}</p>
                  <div className="flex justify-center mt-2 mb-4">
                    <img
                      src={earbud.brandLogo}
                      alt={earbud.brand}
                      className="max-w-full h-12 object-contain"
                    />
                  </div>
                </Link>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    addToCart({
                      ...earbud,
                      quantity: 1,
                      imageUrl: earbud.imageUrl,
                      details: "Some details for the earbuds",
                    });
                  }}
                  className="mt-auto bg-orange-500 text-white py-2 px-4 rounded w-full"
                  disabled={!earbud.inStock}
                >
                  {earbud.inStock ? "Add to Cart" : "Out of Stock"}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EarbudsPage;
