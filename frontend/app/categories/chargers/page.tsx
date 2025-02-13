
// "use client";
// import React, { useEffect, useState } from "react";
// import { useCart } from "@/context/CartContext";
// import Filter from "../_components/Filter"; // Importing the Filter component
// import BreadCrumb from "../_components/BreadCrumb"; // Importing the Breadcrumb component
// import Link from "next/link"; // Importing Link for navigation

// const ChargersPage = () => {
//   const { addToCart } = useCart(); // Access the addToCart function
//   const [isClient, setIsClient] = useState(false);

//   // Ensure this component is only rendered on the client
//   useEffect(() => {
//     setIsClient(true);
//   }, []);

//   // Hardcoded list of chargers with brand logo, image, stock status and other data
//   const chargers = [
//     { id: "1", title: "Chargeur Hama USB Type-C pour voiture / 3 A / Noir", price: 25, brand: "Brand A", brandLogo: "/images/logos/brandA-logo.png", imageUrl: "/images/chargers/charger1.jpg", inStock: true },
//     { id: "2", title: "Chargeur Allume Cigare avec Cable 2en1 Remax Finchy RCC103 / Gold", price: 30, brand: "Brand B", brandLogo: "/images/logos/brandB-logo.png", imageUrl: "/images/chargers/charger2.jpg", inStock: false },
//     { id: "3", title: "Chargeur Allume Cigare S-Link AC30B 2.1A avec câble lightning pour iPhone", price: 35, brand: "Brand C", brandLogo: "/images/logos/brandC-logo.png", imageUrl: "/images/chargers/charger3.jpg", inStock: true },
//     { id: "4", title: "Chargeur secteur 3.1A + CABLE MICRO USB", price: 25, brand: "Brand D", brandLogo: "/images/logos/brandD-logo.png", imageUrl: "/images/chargers/charger4.jpg", inStock: true },
//     { id: "5", title: "Chargeur secteur 3.1A + CABLE IPHONE", price: 30, brand: "Brand E", brandLogo: "/images/logos/brandE-logo.png", imageUrl: "/images/chargers/charger5.jpg", inStock: false },
//     { id: "6", title: "CHARGEUR SECTEUR CX200 / 18W / WHITE+ CABLE TYPE C", price: 35, brand: "Brand F", brandLogo: "/images/logos/brandF-logo.png", imageUrl: "/images/chargers/charger6.jpg", inStock: true },
//     { id: "7", title: "Charger 7", price: 25, brand: "Brand G", brandLogo: "/images/logos/brandG-logo.png", imageUrl: "/images/chargers/charger7.jpg", inStock: true },
//     { id: "8", title: "Charger 8", price: 30, brand: "Brand H", brandLogo: "/images/logos/brandH-logo.png", imageUrl: "/images/chargers/charger8.jpg", inStock: false },
//     { id: "9", title: "Charger 9", price: 35, brand: "Brand M", brandLogo: "/images/logos/brandC-logo.png", imageUrl: "/images/chargers/charger9.jpg", inStock: true },
//   ];

//   // Avoid rendering until client-side rendering is ensured
//   if (!isClient) {
//     return null;
//   }

//   return (
//     <div className="p-6">
//       <div className="mb-6">
//         <BreadCrumb currentPage="Chargers" />
//       </div>

//       <div className="flex flex-col lg:flex-row">
//         {/* Filter Section on the Left */}
//         <div className="lg:w-1/4 w-full mb-8 lg:mb-0 lg:mr-8">
//           <div className="text-center mb-4">
//             <h2 className="text-2xl font-semibold">Filters</h2>
//           </div>
//           <Filter />
//         </div>

//         {/* Product Listing Section */}
//         <div className="lg:w-3/4 w-full">
//           <h1 className="text-3xl font-bold mb-4">Chargers</h1>
//           <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//             {chargers.map((charger) => (
//               <li
//                 key={charger.id}
//                 className="flex flex-col bg-white p-4 rounded shadow-md transition-transform hover:scale-105 relative min-h-[400px]"
//               >
//                 <Link href={`/product-details/charger/${charger.id}`} className="flex flex-col h-full cursor-pointer">
//                   <img
//                     src={charger.imageUrl}
//                     alt={charger.title}
//                     className="w-full h-40 object-contain rounded mb-2"
//                   />
//                   <h3 className="text-xl font-medium line-clamp-2">{charger.title}</h3>
//                   {/* Stock Status */}
//                   <p className={`text-center text-xl mt-1 ${charger.inStock ? "text-green-500" : "text-red-500"}`}>
//                     {charger.inStock ? "In Stock" : "Out of Stock"}
//                   </p>
//                   <p className="text-center text-orange-500 mt-2 text-xl">Price: ${charger.price}</p>
//                   <div className="flex justify-center mt-2 mb-4">
//                     <img
//                       src={charger.brandLogo}
//                       alt={charger.brand}
//                       className="max-w-full h-12 object-contain"
//                     />
//                   </div>
//                 </Link>

//                 <button
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     e.preventDefault();
//                     addToCart({
//                       ...charger,
//                       quantity: 1,
//                       imageUrl: charger.imageUrl,
//                       details: "Some details for the charger",
//                     });
//                   }}
//                   className="mt-auto bg-orange-500 text-white py-2 px-4 rounded w-full"
//                   disabled={!charger.inStock}
//                 >
//                   {charger.inStock ? "Add to Cart" : "Out of Stock"}
//                 </button>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChargersPage;



"use client";
import React, { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import Filter from "../_components/Filter";
import BreadCrumb from "../_components/BreadCrumb";
import Link from "next/link";

interface Product {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  brand: string;
  brandLogo: string;
  inStock: boolean;
}

const ChargersPage = () => {
  const { addToCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChargers = async () => {
      try {
        const token = "your-jwt-token"; // Replace with your actual JWT token
        const response = await fetch("http://localhost:3002/admin/categories/9/products", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching chargers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChargers();
  }, []);

  if (loading) {
    return <p className="text-center text-xl">Loading...</p>;
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <BreadCrumb currentPage="Chargers" />
      </div>

      <div className="flex flex-col lg:flex-row">
        {/* Filter Section */}
        <div className="lg:w-1/4 w-full mb-8 lg:mb-0 lg:mr-8">
          <h2 className="text-2xl font-semibold text-center">Filters</h2>
          <Filter />
        </div>

        {/* Product Listing */}
        <div className="lg:w-3/4 w-full">
          <h1 className="text-3xl font-bold mb-4">Chargers</h1>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((charger) => (
              <li key={charger.id} className="flex flex-col bg-white p-4 rounded shadow-md hover:scale-105 relative min-h-[400px]">
                <Link href={`/product-details/charger/${charger.id}`} className="flex flex-col h-full cursor-pointer">
                  <img src={charger.imageUrl} alt={charger.title} className="w-full h-40 object-contain rounded mb-2" />
                  <h3 className="text-xl font-medium line-clamp-2">{charger.title}</h3>
                  <p className={`text-center text-xl mt-1 ${charger.inStock ? "text-green-500" : "text-red-500"}`}>
                    {charger.inStock ? "In Stock" : "Out of Stock"}
                  </p>
                  <p className="text-center text-orange-500 mt-2 text-xl">Price: ${charger.price}</p>
                  <div className="flex justify-center mt-2 mb-4">
                    <img src={charger.brandLogo} alt={charger.brand} className="max-w-full h-12 object-contain" />
                  </div>
                </Link>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    addToCart({
                      ...charger,
                      quantity: 1,
                      imageUrl: charger.imageUrl,
                      details: ""
                    });
                  }}
                  className="mt-auto bg-orange-500 text-white py-2 px-4 rounded w-full"
                  disabled={!charger.inStock}
                >
                  {charger.inStock ? "Add to Cart" : "Out of Stock"}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ChargersPage;
