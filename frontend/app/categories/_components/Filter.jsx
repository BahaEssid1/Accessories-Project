"use client"
import React, { useState } from 'react';

const Filter = () => {
  // State to manage each filter
  const [inStock, setInStock] = useState(false);
  const [preOrder, setPreOrder] = useState(false);
  const [outOfStock, setOutOfStock] = useState(false);

  const [priceFrom, setPriceFrom] = useState('');
  const [priceTo, setPriceTo] = useState('');

  const [brandA, setBrandA] = useState(false);
  const [brandB, setBrandB] = useState(false);
  const [brandC, setBrandC] = useState(false);

  // Function to reset all filters
  const resetFilters = () => {
    setInStock(false);
    setPreOrder(false);
    setOutOfStock(false);
    setPriceFrom('');
    setPriceTo('');
    setBrandA(false);
    setBrandB(false);
    setBrandC(false);
  };

  return (
    <div className="border border-gray-300 rounded p-4 space-y-4">
      <div className="flex justify-between items-center">
        <div className="text-sm font-medium text-gray-700">Filters</div>
        <button
          onClick={resetFilters}
          className="text-xs font-medium text-blue-500 hover:text-blue-700"
        >
          Reset Filters
        </button>
      </div>

      {/* Availability Filter */}
      <details className="overflow-hidden rounded border border-gray-300">
        <summary className="flex cursor-pointer items-center justify-between gap-2 bg-white p-4 text-gray-900 transition">
          <span className="text-sm font-medium">Availability</span>
          <span className="transition group-open:-rotate-180">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-4"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </span>
        </summary>
        <div className="border-t border-gray-300 pt-2">
          <ul className="space-y-1">
            <li>
              <label htmlFor="FilterInStock" className="inline-flex items-center gap-2">
                <input
                  type="checkbox"
                  id="FilterInStock"
                  className="size-5 rounded border-gray-300"
                  checked={inStock}
                  onChange={() => setInStock(!inStock)}
                />
                <span className="text-sm font-medium text-gray-700">In Stock (5+)</span>
              </label>
            </li>
            <li>
              <label htmlFor="FilterPreOrder" className="inline-flex items-center gap-2">
                <input
                  type="checkbox"
                  id="FilterPreOrder"
                  className="size-5 rounded border-gray-300"
                  checked={preOrder}
                  onChange={() => setPreOrder(!preOrder)}
                />
                <span className="text-sm font-medium text-gray-700">Pre Order (3+)</span>
              </label>
            </li>
            <li>
              <label htmlFor="FilterOutOfStock" className="inline-flex items-center gap-2">
                <input
                  type="checkbox"
                  id="FilterOutOfStock"
                  className="size-5 rounded border-gray-300"
                  checked={outOfStock}
                  onChange={() => setOutOfStock(!outOfStock)}
                />
                <span className="text-sm font-medium text-gray-700">Out of Stock (10+)</span>
              </label>
            </li>
          </ul>
        </div>
      </details>

      {/* Price Filter */}
      <details className="overflow-hidden rounded border border-gray-300">
        <summary className="flex cursor-pointer items-center justify-between gap-2 bg-white p-4 text-gray-900 transition">
          <span className="text-sm font-medium">Price</span>
          <span className="transition group-open:-rotate-180">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-4"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </span>
        </summary>
        <div className="border-t border-gray-300 pt-2">
          <div className="flex justify-between gap-4">
            <label htmlFor="FilterPriceFrom" className="flex items-center gap-2">
              <span className="text-sm text-gray-600">$</span>
              <input
                type="number"
                id="FilterPriceFrom"
                placeholder="From"
                value={priceFrom}
                onChange={(e) => setPriceFrom(e.target.value)}
                className="w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
              />
            </label>
            <label htmlFor="FilterPriceTo" className="flex items-center gap-2">
              <span className="text-sm text-gray-600">$</span>
              <input
                type="number"
                id="FilterPriceTo"
                placeholder="To"
                value={priceTo}
                onChange={(e) => setPriceTo(e.target.value)}
                className="w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
              />
            </label>
          </div>
        </div>
      </details>

      {/* Marque Filter */}
      <details className="overflow-hidden rounded border border-gray-300">
        <summary className="flex cursor-pointer items-center justify-between gap-2 bg-white p-4 text-gray-900 transition">
          <span className="text-sm font-medium">Marque</span>
          <span className="transition group-open:-rotate-180">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-4"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </span>
        </summary>
        <div className="border-t border-gray-300 pt-2">
          <ul className="space-y-1">
            <li>
              <label htmlFor="FilterBrandA" className="inline-flex items-center gap-2">
                <input
                  type="checkbox"
                  id="FilterBrandA"
                  className="size-5 rounded border-gray-300"
                  checked={brandA}
                  onChange={() => setBrandA(!brandA)}
                />
                <span className="text-sm font-medium text-gray-700">Brand A</span>
              </label>
            </li>
            <li>
              <label htmlFor="FilterBrandB" className="inline-flex items-center gap-2">
                <input
                  type="checkbox"
                  id="FilterBrandB"
                  className="size-5 rounded border-gray-300"
                  checked={brandB}
                  onChange={() => setBrandB(!brandB)}
                />
                <span className="text-sm font-medium text-gray-700">Brand B</span>
              </label>
            </li>
            <li>
              <label htmlFor="FilterBrandC" className="inline-flex items-center gap-2">
                <input
                  type="checkbox"
                  id="FilterBrandC"
                  className="size-5 rounded border-gray-300"
                  checked={brandC}
                  onChange={() => setBrandC(!brandC)}
                />
                <span className="text-sm font-medium text-gray-700">Brand C</span>
              </label>
            </li>
          </ul>
        </div>
      </details>
    </div>
  );
};

export default Filter;
