import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import AdmNav from "../../../components/navegation/AdmNav";
import { getUsers } from "../../../functions/users";
import UserCard from "../../../components/cards/UserCard";

const ListUsers = () => {

    const { user } = useSelector((state) => ({ ...state }));
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    console.log({ user })
    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = () => {
        setLoading(true);
        getUsers(user.token).then((u) => {
            setUsers(u.data);
            setLoading(false);
        });
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdmNav />
                </div>
                {loading ? (
                    <div className="col"><p>Loading...</p> </div>
                ) : (
                    <>
                        {users.map((user) => (
                            <div className="col-md-3 pt-3">
                                <UserCard key={user._id} user={user} />
                            </div>
                        ))}
                    </>
                )}
            </div>
        </div>
    )
}

export default ListUsers;
