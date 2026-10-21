import React from "react";
import ProductCurds from "./ProductCurds";

const ProductList = ({ data = [] }) => {
  if (!data?.length) return null;

  return (
    <ul className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 xl:grid-cols-4">
      {data.map((product) => (
        <li key={product.documentId ?? product.id} className="h-full">
          <ProductCurds Product={product} />
        </li>
      ))}
    </ul>
  );
};

export default ProductList;
