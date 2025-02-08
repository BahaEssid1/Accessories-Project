import React from 'react'
import ProductItem from './ProductItem'

function ProductList({ productList }) {
  return (
    <div className="w-full min-h-screen px-0 flex justify-center">
      <div className="grid grid-cols-3 gap-4 w-full">
        {productList.map(item => (
          <ProductItem product={item} key={item.id} />
        ))}
      </div>
    </div>
  );
}

export default ProductList;
