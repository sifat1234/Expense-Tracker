import { useState } from "react";


export default function CheckboxFilterList({type,setSelectedCategories  }) {
  const incomeCategories = ["Salary", "Outsourcing", "Bond", "Dividend"];
  const expenseCategories = [
    "Education",
    "Food",
    "Health",
    "Bill",
    "Insurance",
    "Tax",
    "Transport",
    "Telephone",
  ];
  const categories = type === "income" ? incomeCategories : expenseCategories;

  const [selectedCategories, setInternalSelectedCategories] = useState([]);

  const handleCheckboxChange = (category) => {
      const newSelectedCategories = selectedCategories.includes(category)
          ? selectedCategories.filter(c => c !== category)
          : [...selectedCategories, category];

      setInternalSelectedCategories(newSelectedCategories);
      setSelectedCategories(newSelectedCategories);
  };

  return (
      <div className="py-1" role="none">
          {categories.map((category, index) => (
              <label key={index} className="inline-flex items-center px-4 py-2 text-sm text-gray-700">
                  <input
                      type="checkbox"
                      className="form-checkbox h-4 w-4 rounded-md text-gray-600"
                      onChange={() => handleCheckboxChange(category)}
                      checked={selectedCategories.includes(category)}
                  />
                  <span className="ml-2">{category}</span>
              </label>
          ))}
      </div>
  );
}
