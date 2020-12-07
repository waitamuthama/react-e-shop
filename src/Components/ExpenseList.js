import React from 'react';
import ExpenseItem from './ExpenseItem';
import { MdDelete } from 'react-icons/md'

const ExpenseList = ({ expenses, removeItem, removeItems, handleEdit }) => {
  const expense = expenses.map(expense => {
    return <ExpenseItem
      key={expense.id}
      expense={expense}
      removeItem={removeItem}
      handleEdit={handleEdit}
    />
  });
  return (
    <div>
      <ul className="list">
        {expense}
      </ul>
      {expenses.length > 0 && <button className="btn" onClick={removeItems}>clear expenses <MdDelete className="btn-icon" /> </button>}
    </div>
  );
};

export default ExpenseList;