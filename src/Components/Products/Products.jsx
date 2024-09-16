import React, { useEffect, useState } from "react";
import Filter from "./Filter";
import { useNavigate } from "react-router-dom";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("https://fakestoreapi.com/products");
      let data = await response.json();
      setProducts(data);
      setFilteredProducts(data);
    };
    fetchProducts();
  }, []);

  const handleChange = (category) => {
    const filteredCategory = products.filter((item) => {
      return item.category === category;
    });
    setFilteredProducts(filteredCategory);
  };

  const handleProductClick = (category, id) => {
    let urlEndpoint = category.split(" ").join("-");
    navigate(`/product/${urlEndpoint}/${id}`, { state: id });
  };

  const handleSorting = (sort) => {
    const sortedFilteredArr = filteredProducts.toSorted((a, b) => {
      if (sort === "lowToHigh") {
        return a.price - b.price;
      } else if (sort === "highToLow") {
        return b.price - a.price;
      }
    });
    const sortedProductsArr = products.toSorted((a, b) => {
      if (sort === "lowToHigh") {
        return a.price - b.price;
      } else if (sort === "highToLow") {
        return b.price - a.price;
      }
    });
    setFilteredProducts(sortedFilteredArr);
    setProducts(sortedProductsArr);
  };

  return (
    <div className="mx-4 md:mx-10 mt-10">
      <h1 className="text-3xl font-bold text-center">Products</h1>

      <div className="flex flex-col md:grid grid-flow-col">
        <div className="col-span-6 md:col-span-3 mt-6 text-sm md:text-base">
          <h2 className="font-bold mb-4">Filters</h2>
          <Filter
            products={products}
            handleChange={handleChange}
            handleSorting={handleSorting}
          />
        </div>

        <div className="flex justify-around flex-wrap gap-2 mt-6 col-span-6 md:col-span-9 ml-1 md:ml-2">
          {filteredProducts &&
            filteredProducts.map((product) => {
              return (
                <div
                  key={product.id}
                  className="border border-black/30 rounded-lg w-48 md:w-60 flex flex-col justify-center items-center 
               mb-4 py-2"
                  onClick={() =>
                    handleProductClick(product.category, product.id)
                  }
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
                      <p> Ratings: {product.rating.rate}</p>
                      <p> Count: {product.rating.count}</p>
                    </div>
                    <p className="text-sm">
                      Description: {product.description.slice(0, 60)}...
                    </p>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
