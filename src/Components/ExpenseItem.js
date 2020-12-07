import React from 'react';
import { MdEdit, MdDelete } from 'react-icons/md'

const ExpenseItem = ({ expense, removeItem, handleEdit }) => {
  const { id, amount, charge } = expense;
  return (
    <li className="item">
      <div className="info">
        <span className="expense">{charge}</span>
        <span className="amount">${amount}</span>
      </div>
      <div>
        <button className="edit-btn"
          aria-label="edit button" onClick={() => handleEdit(id)}><MdEdit /></button>

        <button className="clear-btn"
          aria-label="delete button"><MdDelete onClick={() => removeItem(id)} /></button>
      </div>
    </li>
  );
};

export default ExpenseItem;