"use client";
import React, { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext'; // Import the useCart hook
import ProductList from './ProductList';

function ProductSection() {
  const { addToCart } = useCart(); // Access addToCart from context
  const [productList, setProductList] = useState([]);

  // Simulate fetching products
  useEffect(() => {
    setProductList([
      {
        id: 1,
        attributes: {
          title: 'Product 1',
          price: '19.99',
          banner: {
            data: {
              attributes: {
                url: 'https://via.placeholder.com/400x350',
              },
            },
          },
        },
      },
      {
        id: 2,
        attributes: {
          title: 'Product 2',
          price: '29.99',
          banner: {
            data: {
              attributes: {
                url: 'https://via.placeholder.com/400x350',
              },
            },
          },
        },
      },
      {
        id: 3,
        attributes: {
          title: 'Product 3',
          price: '39.99',
          banner: {
            data: {
              attributes: {
                url: 'https://via.placeholder.com/400x350',
              },
            },
          },
        },
      },
    ]);
  }, []);

  return (
    <div className="px-10 md:px-20">
      <h2 className="font-bold text-[20px] my-3">
        Brand New{' '}
        <span className="font-normal text-[14px] float-right text-primary flex items-center cursor-pointer hover:text-teal-600">
          View All Collection
        </span>
      </h2>
      <ProductList productList={productList} addToCart={addToCart} />
    </div>
  );
}

export default ProductSection;
