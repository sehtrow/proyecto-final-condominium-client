import axios from "axios";

export const createCommonExpense = async (expense, authtoken) =>
  await axios.post(`${process.env.REACT_APP_API}/expense`, expense, {
    headers: {
      authtoken,
    },
  });

export const getDetailExpense = async (id, authtoken) =>
  await axios.get(`${process.env.REACT_APP_API}/expense/${id}`, {
    headers: {
      authtoken,
    },
  });

export const getExpenses = async (authtoken) =>
  await axios.post(`${process.env.REACT_APP_API}/expenses`, '', {
    headers: {
      authtoken,
    }
  });

export const removeExpense = async (id, authtoken) =>
  await axios.delete(`${process.env.REACT_APP_API}/delete-expense/${id}`, {
    headers: {
      authtoken,
    },
  });

export const paidExpense = async (id, authtoken, user) =>
  await axios.put(`${process.env.REACT_APP_API}/expense/paid/${id}`, { state: true, paymentDate: new Date(), paidBy: user}, {
    headers: {
      authtoken,
    },
  });