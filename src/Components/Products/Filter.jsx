import React from "react";
import { categories, sortingData } from "../../utils/constant";

export default function Filter({ products, handleChange, handleSorting }) {
  return (
    <div>
      <h3>Filter by Category</h3>
      <div className="flex flex-col">
        {categories.map((category) => {
          return (
            <label key={category} id="category">
              <input
                type="radio"
                className="mr-2"
                name="category"
                onChange={() => handleChange(category)}
              />
              {category}
            </label>
          );
        })}
      </div>

      <h3 className="mt-6">Sorting</h3>
      <div className="flex flex-col">
        {sortingData.map((sort) => {
          return (
            <label key={sort.name} id="sorting">
              <input
                type="radio"
                className="mr-2"
                name="sorting"
                onChange={() => handleSorting(sort.name)}
              />
              {sort.label}
            </label>
          );
        })}
      </div>
    </div>
  );
}
