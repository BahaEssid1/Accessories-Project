

"use client";
import BreadCrumb from "../../../_components/BreadCrumb";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useCart } from "../../../context/CartContext";
import Link from "next/link";

interface Product {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  description: string;
  inStock: boolean;
}

const ProductDetails = () => {
  const { type, id } = useParams(); 
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const chargers: Product[] = [
    { id: "1", title: "Chargeur Hama USB Type-C pour voiture / 3 A / Noir", price: 25, imageUrl: "/images/chargers/charger1.jpg", description: "Fast charging adapter with 30W power.", inStock: true },
    { id: "2", title: "Chargeur Allume Cigare avec Cable 2en1 Remax Finchy RCC103 / Gold", price: 30, imageUrl: "/images/chargers/charger2.jpg", description: "Dual USB fast charger with smart protection.", inStock: false },
    { id: "3", title: "Chargeur Allume Cigare S-Link AC30B 2.1A avec câble lightning pour iPhone", price: 35, imageUrl: "/images/chargers/charger3.jpg", description: "Wireless charger with 15W fast charging.", inStock: true },
  ];

  const powerBanks: Product[] = [
    { id: "1", title: "Power Bank 1", price: 25, imageUrl: "/images/powerbanks/pb1.jpg", description: "Portable power bank with 10,000mAh capacity.", inStock: true },
    { id: "2", title: "Power Bank 2", price: 30, imageUrl: "/images/powerbanks/pb2.jpg", description: "Power bank with quick charge support.", inStock: false },
    { id: "3", title: "Power Bank 3", price: 35, imageUrl: "/images/powerbanks/pb3.jpg", description: "Solar power bank for outdoor use.", inStock: true },
  ];

  useEffect(() => {
    if (type && id) {
      let selectedProduct: Product | undefined;
      if (type === "charger") {
        selectedProduct = chargers.find((item) => item.id === id);
      } else if (type === "power-bank") {
        selectedProduct = powerBanks.find((item) => item.id === id);
      }

      if (selectedProduct) {
        setProduct(selectedProduct);
      } else {
        console.error("Product not found:", type, id);
      }
    }
  }, [type, id]);

  if (!product) return <p className="text-center text-xl">Product not found.</p>;

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(1, parseInt(e.target.value));
    setQuantity(value);
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        ...product,
        quantity,
        details: product.description,
      });
      console.log(`Added ${quantity} x ${product.title} to the cart`);
    }
  };

  return (
    <div className="p-6 flex flex-col min-h-screen">
      <BreadCrumb category={type === "charger" ? "Chargers" : "Power Banks"} productTitle={product.title} currentPage="" />

      <div className="flex mt-6">
        <div className="w-1/2 pr-6">
          <img src={product.imageUrl} alt={product.title} className="max-w-[300px] h-auto object-contain mx-auto" />
        </div>

        <div className="w-1/2">
          <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
          <p className={`text-lg mt-2 ${product.inStock ? "text-green-500" : "text-red-500"}`}>
            {product.inStock ? "In Stock" : "Out of Stock"}
          </p>
          <p className="text-lg mt-4">{product.description}</p>
          <p className="text-5xl text-center text-orange-500 font-semibold mt-4"> ${product.price}</p>

          {product.inStock && (
            <div className="mt-6">
              <div className="flex items-center justify-between">
                <label htmlFor="quantity" className="text-lg">Quantity</label>
                <input type="number" id="quantity" value={quantity} onChange={handleQuantityChange} min="1" className="border border-gray-300 p-2 rounded w-24" />
              </div>
              <button onClick={handleAddToCart} className="mt-4 bg-orange-500 text-white py-2 px-4 rounded w-full transition-transform hover:scale-105" disabled={!product.inStock}>
                {product.inStock ? "Add to Cart" : "Out of Stock"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
