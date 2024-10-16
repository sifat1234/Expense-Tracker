import { useState } from "react";

export default function SubmitForm({ onSubmit, isEditMode, entryToEdit }) {
  const [formData, setFormData] = useState({
    id: null,
    type: "expense", // Default to 'expense'
    category: "",
    amount: "",
    date: "",
  });

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

  const [categoryLists, setCategoryLists] = useState(expenseCategories);



    if (isEditMode && entryToEdit && entryToEdit.id !== formData.id) {
      setFormData({
        ...entryToEdit,
        date: new Date(entryToEdit.date).toISOString().split('T')[0], 
      });
      setCategoryLists(entryToEdit.type === "income" ? incomeCategories : expenseCategories);

    }

  const handleChange = (e) => {

    const { name, value } = e.target;

    // Prevent negative value for income
    if (name === "amount" && formData.type === "income") {
      const numericValue = Number(value);
      if (numericValue < 0) {
        return; // Do not update state if negative value
      }
    }

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleTypeChange = (type) => {
    setFormData({
      ...formData,
      type: type,
      amount: "",
      category: "", // Reset category when switching types
      date: ""
    });
    setCategoryLists(type === "income" ? incomeCategories : expenseCategories);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

   
    if (!formData.category || !formData.amount || !formData.date) {
      alert('Please fill out both fields.');
      return;
    }



//  Format the date
 const date = new Date(formData.date);
 const options = { day: 'numeric', month: 'long', year: 'numeric' };
 const formattedDate = date.toLocaleDateString('en-US', options);

 

 // Call the onSubmit function with formatted date
 onSubmit({
   ...formData,
   id: Date.now(),
   date: formattedDate, // Set the formatted date
 });

      if(formData.type === 'expense') {
    setFormData({ id: null, type: 'expense', category: '', amount: '', date: '' });
    setCategoryLists(expenseCategories)
  } else {
    setFormData({ id: null, type: 'income', category: '', amount: '', date: '' });
    setCategoryLists(incomeCategories)
  }
  }

  return (
    <div className="p-6 py-8 bg-[#F9FAFB] border rounded-md">
      <h2 className="text-3xl font-semibold leading-7 text-gray-800 text-center">
        Expense Tracker
      </h2>

      <form>
        <div className="flex divide-x divide-slate-400/20 overflow-hidden rounded-md bg-white text-[0.8125rem] font-medium leading-5 text-slate-700 shadow-sm ring-1 ring-slate-700/10 mt-6">
          <div className={`cursor-pointer text-center flex-1 px-4 py-2 hover:bg-slate-50 hover:text-slate-900 ${formData.type==='expense'? 'active': ''}`}
            onClick={() => handleTypeChange('expense')}
          >
            Expense
          </div>
          <div className={`cursor-pointer text-center flex-1 px-4 py-2 hover:bg-slate-50 hover:text-slate-900 ${formData.type==='income'? 'active': ''}`}
            onClick={() => handleTypeChange('income')}
          >
            Income
          </div>
        </div>

        <div className="mt-3">
          <label htmlFor="category" className="block text-sm font-medium leading-6 text-gray-900">
            Category
          </label>
          <div className="mt-2">
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
              required
            >
              <option value="" disabled>Select a category</option>
              {categoryLists.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-3">
          <label htmlFor="amount" className="block text-sm font-medium leading-6 text-gray-900">
            Amount
          </label>
          <div className="mt-2">
            <input
              type="number"
              name="amount"
              id="amount"
              value={formData.amount}
              onChange={handleChange}
              autoComplete="off"
              placeholder="12931"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="mt-3">
          <label htmlFor="date" className="block text-sm font-medium leading-6 text-gray-900">
            Date
          </label>
          <div className="mt-2">
            <input
              type="date"
              name="date"
              id="date"
              value={formData.date}
              onChange={handleChange}
              autoComplete="off"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 rounded-md bg-teal-600 px-8 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 w-full"
          onClick={handleSubmit}
        >
          Save
        </button>
      </form>
    </div>
  );
}
