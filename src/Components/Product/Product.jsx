import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function Product() {
  const [product, setProduct] = useState({});
  let location = useLocation();
  let productId = location.state;

  useEffect(() => {
    const fetchedProduct = async () => {
      try {
        let response = await fetch(
          `https://fakestoreapi.com/products/${productId}`
        );

        let productData = await response.json();
        console.log(productData);

        setProduct(productData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchedProduct();
  }, []);

  return (
    <div>
      <h1 className="text-4xl text-center font-semibold my-10">Product</h1>
      {product && (
        <div
          className="border border-black/30 rounded-lg w-48 md:w-80 flex mx-auto flex-col justify-center items-center 
        mb-4 py-2"
        >
          <img
            src={product.image}
            alt={product.title}
            className="w-32 md:w-40 h-32 md:h-40 object-contain"
          />
          <div className="mt-2 pb-2 px-2 text-sm md:text-base">
            <p className="font-semibold">{product.title}</p>
            <p>{product.category}</p>
            <p>price: {product.price}</p>
            <div className="flex items-center gap-4 w-full font-semibold">
              <p> Ratings: {product?.rating?.rate}</p>
              <p> Count: {product?.rating?.count}</p>
            </div>
            <p className="text-sm">Description: {product.description}</p>
          </div>
        </div>
      )}
    </div>
  );
}
