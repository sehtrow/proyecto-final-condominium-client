import React, { useState, useEffect } from 'react';
import { toast } from "react-toastify";
import AdmNav from "../../../components/navegation/AdmNav";
import ExpenseForm from "../../../components/forms/ExpenseForm";
import { useSelector } from "react-redux";
import { getDepartments, addExpenseDepartment } from "../../../functions/departments";
import { createCommonExpense } from "../../../functions/expenses";

const initialState = {
    state: false,
    total: '',
    departments: [],
    department: [],
}

const CreateExpense = () => {

    const { user } = useSelector((state) => ({ ...state }));
    const [values, setValues] = useState(initialState);   

    useEffect(() => {
        loadDepartments();                
    }, []);


    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        createCommonExpense(values, user.token)
            .then((res) => {
                addExpenseDepartment(values.department, { commonExpense: res.data._id }, user.token)
                    .then((res) => {
                        toast.success(`Common Expense is created`);
                        setValues(initialState);
                        loadDepartments();
                    })
                    .catch((err) => {
                        if (err.response.status === 400) toast.error(err.response.data);
                    })
            })
            .catch((err) => {
                if (err.response.status === 400) toast.error(err.response.data);
            })
    }

    const loadDepartments = () =>
    getDepartments().then((d) => setValues({ ...values, departments: d.data }));



    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdmNav />
                </div>
                <div className="col pt-3">
                    <ExpenseForm
                        values={values}
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                    />
                </div>
            </div>
        </div>
    )
}


export default CreateExpense;