   
import axios from "axios";

export const removeDepartment = async (slug, authtoken) =>
  await axios.delete(`${process.env.REACT_APP_API}/delete-department/${slug}`, {
    headers: {
      authtoken,
    },
});

export const updateDepartment = async (slug, department, authtoken) =>
  await axios.put(`${process.env.REACT_APP_API}/department/${slug}`, department, {
    headers: {
      authtoken,
    },
});

export const addExpenseDepartment = async (id_department, expense, authtoken) =>
  await axios.put(`${process.env.REACT_APP_API}/department/expense/${id_department}`, expense, {
    headers: {
      authtoken,
    },
});

export const createDepartment = async (department, authtoken) =>
  await axios.post(`${process.env.REACT_APP_API}/department`, department, {
    headers: {
      authtoken,
    },
});

export const getDepartment = async (slug) =>
    await axios.get(`${process.env.REACT_APP_API}/department/${slug}`);

export const getDepartments = async () =>
    await axios.post(`${process.env.REACT_APP_API}/departments`);

