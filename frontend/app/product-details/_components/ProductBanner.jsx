import React from 'react';

function ProductBanner({ imageUrl }) {
  return (
    <div>
      <img
        src={imageUrl}
        alt="Product"
        className="h-64 w-full object-cover rounded-lg"
      />
    </div>
  );
}

export default ProductBanner;
