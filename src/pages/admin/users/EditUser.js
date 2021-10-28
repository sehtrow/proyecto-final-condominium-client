import React, { useState, useEffect } from 'react'
import AdmNav from "../../../components/navegation/AdmNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getUser, updateUserProperty } from "../../../functions/users";
import { getDepartments } from "../../../functions/departments";
import UserForm from '../../../components/forms/Userform';

const InitialState = {
    role: '',
    email: '',
    name: '',
    property: [],
    _id: '',
}

const EditUser = ({ history, match }) => {
    const { user } = useSelector((state) => ({ ...state }));
    const [values, setValues] = useState(InitialState);
    const [propertys, setPropertys] = useState([]);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        loadUser();
        loadDepartments();
    }, []);

    const loadUser = () =>
        getUser(match.params._id).then((u) => {
            setValues({ ...values, ...u.data });
        });

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        updateUserProperty(match.params._id, values, user.token)
            .then((res) => {
                setLoading(false);
                toast.success(`"${res.data.name}" is updated`);
                history.push("/admin/users");
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
                if (err.response.status === 400) toast.error(err.response.data);
            });
    };

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const loadDepartments = () =>
        getDepartments().then((d) => {
            setPropertys(d.data);
        });

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-2">
                        <AdmNav />
                    </div>
                    <div className="col">
                        {loading ? (
                            <h4 className="text-danger">Loading...</h4>
                        ) : (
                            <h4>Assign Department</h4>
                        )}

                        <UserForm
                            handleSubmit={handleSubmit}
                            handleChange={handleChange}
                            values={values}
                            propertys={propertys}
                        />

                        <hr />
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditUser;
