import { useState } from "react";
import BalanceStat from "./BalanceStat.jsx";
import ExpenseLists from "./ExpenseLists.jsx";
import IncomeLists from "./IncomeLists.jsx";
import SubmitForm from "./SubmitFrom.jsx";


export default function TrackerBoard() {
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [balance, setBalance] = useState(0);
  const [incometasklists, setIncomeTaskLists] = useState([]);
  const [expensetasklists, setExpenseTaskLists] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [entryToEdit, setEntryToEdit] = useState(null);

  const [selectedIncomeCategories, setSelectedIncomeCategories] = useState([]);
  const [selectedExpenseCategories, setSelectedExpenseCategories] = useState([]);

  // Filtered income tasks
  const filteredIncomeTasks = selectedIncomeCategories.length === 0
      ? incometasklists
      : incometasklists.filter(task => selectedIncomeCategories.includes(task.category));

  // Filtered expense tasks
  const filteredExpenseTasks = selectedExpenseCategories.length === 0
      ? expensetasklists
      : expensetasklists.filter(task => selectedExpenseCategories.includes(task.category));




  const handleSaveTask = (task) => {
    console.log(task);
    if (entryToEdit) {
      // Update the existing task
      const updatedIncomeTasks = incometasklists.map((t) =>
        t.id === entryToEdit.id ? task : t
      );
      console.log(updatedIncomeTasks);
      const updatedExpenseTasks = expensetasklists.map((t) =>
        t.id === entryToEdit.id ? task : t
      );

      // Update income and expense accordingly
      if (task.type === "income") {
        setIncomeTaskLists(updatedIncomeTasks);
        const amountDifference = task.amount - (entryToEdit?.amount || 0);
        setIncome((prev) => prev + amountDifference);
        setBalance((prev) => prev + amountDifference);
      } else {
        setExpenseTaskLists(updatedExpenseTasks);
        const amountDifference = task.amount - (entryToEdit?.amount || 0);
        console.log(amountDifference);
        setExpense((prev) => prev + amountDifference);
        setBalance((prev) => prev - amountDifference);
      }

      // Reset edit mode and entry to edit
      setIsEditMode(false);
      setEntryToEdit(null);
    } else {
      // Add a new task
      if (task.type === "income") {
        setIncomeTaskLists((prev) => [...prev, task]);
        setIncome((prev) => prev + Number(task.amount));
        setBalance((prev) => prev + Number(task.amount));
      } else {
        setExpenseTaskLists((prev) => [...prev, task]);
        setExpense((prev) => prev + Number(task.amount));
        setBalance((prev) => prev - Number(task.amount));
      }
    }
  };

  const handleEdit = (task) => {
    setEntryToEdit(task);
    setIsEditMode(true);
  };

  const handleIncomeSort = (sortOrder) => {
    if (sortOrder === "lowToHigh") {
      setIncomeTaskLists([
        ...incometasklists.sort((a, b) => Number(a.amount) - Number(b.amount)),
      ]);
    } else if (sortOrder === "highToLow") {
      // Logic to sort data from high to low
      setIncomeTaskLists([
        ...incometasklists.sort((a, b) => Number(b.amount) - Number(a.amount)),
      ]);
    }
  };

  const handleExpenseSort = (sortOrder) => {
    if (sortOrder === "lowToHigh") {
      setExpenseTaskLists([
        ...expensetasklists.sort((a, b) => Number(a.amount) - Number(b.amount)),
      ]);
    } else if (sortOrder === "highToLow") {
      // Logic to sort data from high to low
      setExpenseTaskLists([
        ...expensetasklists.sort((a, b) => Number(b.amount) - Number(a.amount)),
      ]);
    }
  };



  function handleDeleteForIncome(id) {
    const taskToDelete = incometasklists.find((task) => task.id === id); // Find the task to delete
    const updatedTasks = incometasklists.filter((task) => task.id !== id); // Filter out the task

    if (taskToDelete) {
        const amountValue = parseFloat(taskToDelete.amount); // Get the amount of the task to be deleted
        setIncomeTaskLists(updatedTasks); // Update the income entries
        setIncome(income - amountValue); // Update the income
        setBalance(balance - amountValue); // Update the total income
    }
}


function handleDeleteForExpense(id) {
    const taskToDelete = expensetasklists.find((task) => task.id === id); // Find the task to delete
    const updatedTasks = expensetasklists.filter((task) => task.id !== id); // Filter out the task

    if (taskToDelete) {
        const amountValue = parseFloat(taskToDelete.amount); // Get the amount of the task to be deleted
        setExpenseTaskLists(updatedTasks); // Update the expense entries
        setExpense(expense - amountValue); // Update the expense
        setBalance(balance + amountValue); // Update the total income
    }
}


  return (
    <main className="relative mx-auto mt-10 w-full max-w-7xl">
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <SubmitForm
          onSubmit={handleSaveTask}
          isEditMode={isEditMode}
          entryToEdit={entryToEdit}
        />

        <div className="lg:col-span-2">
          <BalanceStat income={income} expense={expense} balance={balance} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-8">
         
            <IncomeLists
              incometasklists={filteredIncomeTasks}
              onSort={handleIncomeSort}
              onEdit={handleEdit}
              onDelete={handleDeleteForIncome}
              setSelectedCategories={setSelectedIncomeCategories}
            />
            <ExpenseLists
              expensetasklists={filteredExpenseTasks}
              setSelectedCategories={setSelectedExpenseCategories}
              onSort={handleExpenseSort}
              onDelete={handleDeleteForExpense}
              onEdit={handleEdit}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
