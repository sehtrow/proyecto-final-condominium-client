import React, { useEffect } from 'react';
import { Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./pages/Home";
import Header from "./components/navegation/Header";
import Register from "./pages/authentication/Register";
import Login from "./pages/authentication/Login";
import ForgotPassword from "./pages/authentication/ForgotPassword";
import RegisterComplete from "./pages/authentication/RegisterComplete";
import AdmDashboard from "./pages/admin/AdmDashboard";
import CreateNew from "./pages/admin/news/CreateNew";
import UpdateNew from "./pages/admin/news/UpdateNew";
import CreateDepartment from "./pages/admin/department/CreateDepartment";
import ListUsers from './pages/admin/users/ListUsers';
import EditUser from './pages/admin/users/EditUser';
import CreateExpense from './pages/admin/commonExpenses/CreateExpense';
import ViewDepartment from './pages/admin/department/ViewDepartment';
import Property from './pages/user/Property';
import DetailExpenseProperty from './pages/DetailExpenseProperty';

import AdminRoute from "./components/routes/AdminRoute";
import UserRoute from "./components/routes/UserRouter";

import New from "./pages/New";
import History from "./pages/user/History";
import Password from "./pages/user/Password";
import CommonExpenses from "./pages/user/CommonExpenses";

import { auth } from "./firebase";

import { useDispatch } from "react-redux";
import { currentUser } from "./functions/auth";


const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                const idTokenResult = await user.getIdTokenResult();
                currentUser(idTokenResult.token).then((res) => {
                    dispatch({
                        type: "LOGGED_IN_USER",
                        payload: {
                            name: res.data.name,
                            email: res.data.email,
                            token: idTokenResult.token,
                            role: res.data.role,
                            propertys: res.data.property,
                            _id: res.data._id
                        }
                    });
                }).catch((err) => console.log(err));
            }
        });
        return () => unsubscribe();
    }, [dispatch]);

    return (
        <>
            <Header />
            <ToastContainer />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/register/complete" component={RegisterComplete} />
                <Route excat path="/forgot/password" component={ForgotPassword} />
                <Route exact path="/new/:slug" component={New} />

                <AdminRoute exact path="/admin/dashboard" component={AdmDashboard} />
                <AdminRoute exact path="/admin/news" component={CreateNew} />
                <AdminRoute exact path="/admin/new/:slug" component={UpdateNew} />
                <AdminRoute exact path="/admin/department" component={CreateDepartment} />
                <AdminRoute exact path="/admin/department/:slug" component={ViewDepartment} />
                <AdminRoute exact path="/admin/users" component={ListUsers} />
                <AdminRoute exact path="/admin/user/:_id" component={EditUser} />
                <AdminRoute exact path="/admin/common-expenses" component={CreateExpense} />

                <UserRoute exact path="/user/history" component={History} />
                <UserRoute exact path="/user/password" component={Password} />
                <UserRoute exact path="/user/common_expenses" component={CommonExpenses} />
                <UserRoute exact path="/property" component={Property} />
                <UserRoute exact path="/property/:slug" component={DetailExpenseProperty} />
            </Switch>
        </>
    )
}

export default App;
