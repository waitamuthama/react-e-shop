import React, { useState } from 'react';
import Alert from './Components/Alert'
import ExpenseForm from './Components/ExpenseForm'
import ExpenseList from './Components/ExpenseList'
import './App.css';
import uuid from 'uuid/dist/v4';

const initialExpenses = [
  { id: uuid(), charge: "rent", amount: 2500 },
  { id: uuid(), charge: "electricity", amount: 500 },
  { id: uuid(), charge: "wifi", amount: 2000 }
]

const App = () => {
  // **************state values ******
  const [expenses, setExpenses] = useState(initialExpenses);
  const [charge, setCharge] = useState('');
  const [amount, setAmount] = useState('');
  const [alert, setAlert] = useState({ show: false });
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState(0);

  //*******functionality */
  const handleCharge = (event) => {
    setCharge(event.target.value);

  }
  //handle Amount
  const handleAmount = (event) => {
    setAmount(event.target.value);
  }

  //handle alert
  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text });
    setTimeout(() => {
      setAlert({ show: false });
    }, 3000);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (charge !== "" && amount > 0) {
      if (edit) {
        let tempExpenses = expenses.map(item => {
          return item.id == id ? { ...item, charge, amount } : item
        });
        setExpenses(tempExpenses)
        setEdit(false);
      } else {
        const newExpense = { id: uuid(), charge, amount };
        setExpenses([newExpense, ...expenses]);
        handleAlert({ type: 'success', text: 'item added successfully' });

      }
      setCharge("");
      setAmount("");
    }
    else {
      //handle alert
      handleAlert({
        type: 'danger', text: `charge can't be empty 
      and amount value has to be bigger than zero ` });
    }
  }

  // //get single expense
  // const getExpense = (id) => {
  //   const singleExpense = expenses.map(expense => expense.id === id);
  //   return singleExpense;
  // }

  //remove single item
  const removeItem = (id) => {
    const tempExpenses = [...expenses]
    const removeItem = tempExpenses.filter(item => item.id !== id);
    tempExpenses.shift(removeItem);
    setExpenses(tempExpenses);
    handleAlert({ type: 'danger', text: 'item removed' });
  }

  //edit item
  const handleEdit = id => {
    const expense = expenses.find(item => item.id === id);
    let { charge, amount } = expense;
    setCharge(charge);
    setAmount(amount);
    setEdit(true);
    setId(id);
  }
  //remove all items
  const removeItems = () => {
    setExpenses([]);
    handleAlert({ type: 'danger', text: 'all expenses cleared' });
  }



  return (
    <>
      {alert.show && <Alert type={alert.type} text={alert.text} />}
      <h1>Budget Calculator</h1>
      <main className="App">
        <ExpenseForm
          charge={charge}
          amount={amount}
          handleCharge={handleCharge}
          handleAmount={handleAmount}
          handleSubmit={handleSubmit}
          edit={edit}

        />
        <ExpenseList
          expenses={expenses}
          removeItem={removeItem}
          removeItems={removeItems}
          handleEdit={handleEdit}

        />
      </main>
      <h1>
        Total spending: <span className="total">
          ${expenses.reduce((prev, curr) => {
        return (prev += parseInt(curr.amount));
      }, 0)}
        </span>
      </h1>

    </>
  );
};

export default App;