import React from "react";
import UserNav from "../../components/navegation/UserNav";
import { useSelector } from "react-redux";

const History = () => {
    const { user } = useSelector((state) => ({ ...state }));
console.log(user)
return (
    <div className="container-fluid">
        <div className="row">
            <div className="col-md-2">
                <UserNav />
            </div>
            <div className="col">
                <h3>My Profile</h3>
                <p><strong>Username : </strong> {user.name}</p>
                <p><strong>Email : </strong> {user.email}</p>
                <p><strong>Role : </strong> {user.role}</p>
                {
                    user.propertys && user.propertys.length > 0 && (
                        user.propertys.map((p) => (
                            <>
                                <p><strong>Owner of department : </strong> {p.tower} {p.number}</p>
                                {
                                    p.commonExpenses && (
                                        <p><strong>Total Expenses : </strong> {p.commonExpenses.length}</p>
                                    )
                                }
                            </>
                        ))
                    )
                }
            </div>
        </div>
    </div>
)};

export default History;