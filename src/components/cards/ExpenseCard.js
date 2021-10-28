import React from "react";
import { Card } from "antd";
import { DollarCircleTwoTone } from "@ant-design/icons";
import { paidExpense } from "../../functions/expenses";

const ExpenseCard = ({ expense, user }) => {
  const { createdAt, total, state, _id } = expense;
  console.log({expense})
  const paidExpenseDeparment = (id) => {
    paidExpense(id, user.token, user)
      .then((res) => {
        alert(`Expense payed`);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 400) alert(err.response.data);
      });
  }

  const pay = (!state) ?

    <span
      onClick={() => paidExpenseDeparment(_id)}
      className="float-center"
    >
      <DollarCircleTwoTone /><br />Pay
    </span> : <></>


  return (
    <>
      <Card
        title={`${new Date(createdAt).toDateString()}`}
        actions={[
          pay,
        ]}
      >
        <p><strong>Status : </strong>  {(state) ? 'Paid out!' : 'pending payment :('}</p>
        <p><strong>Total: </strong>${total}</p>
        {
          expense.paidBy && (
            <><p><strong>Paid by :</strong> {expense.paidBy.name.toUpperCase()}</p>
              <p><strong>Payment date : {new Date(expense.paymentDate).toDateString()}</strong></p></>
          )
        }
      </Card>
    </>
  );
};

export default ExpenseCard;