import React, { useEffect, useState } from "react";
import ExpenseCard from '../components/cards/ExpenseCard';
import { getDetailExpense } from '../functions/expenses';
import { useSelector } from "react-redux";
import { Spin, Space } from 'antd';

const DetailExpenseProperty = ({ match }) => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useSelector((state) => ({ ...state }));
  const { propertys, token } = user;
  const { slug } = match.params;

  useEffect(() => {
    getExpensesProperty();
  }, [slug]);


  const getExpensesProperty = () => {
    setExpenses([]);
    if (propertys.length === 0) {
      setLoading(false);
      return;
    }

    propertys.map(element => {
      if (element.commonExpenses.length === 0) {
        setLoading(false);
        return;
      }
      if (element.slug === slug) {
        element.commonExpenses.map(commonId => {
          getDetailExpense(commonId, token)
            .then((res) => {
              if (res.data === null) return
              setExpenses(expenses => [...expenses, res.data]);

            })
            .then(() => {
              setLoading(false);
            })
        });
      }
    });
  }

  const detailExpense = (
    <>
      <h4 className="text-center pt-4">Expenses</h4>
      <div className="row pt-4">

        {expenses && expenses.length > 0 ? (
          expenses.map((e) => (
            <div className="col-md-3 pl-5">
              <ExpenseCard key={e._id} expense={e} token={token} user={user} />
            </div>
          ))
        ) :
          (<div className="container text-center pt-4"><h4>Don't have common expenses yet.</h4></div>)
        }
      </div>
    </>
  )

  return (
    <>

      {
        loading ? (<div className="container text-center pt-4"><Space size="large" ><Spin size="large" tip="Loading..."></Spin></Space></div>) : detailExpense
      }

    </>
  );
};

export default DetailExpenseProperty;