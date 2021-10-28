import React from "react";
import AdminNav from "../../components/navegation/AdmNav";

const AdmDashboard = () => {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className="col">Dashboard pending</div>
            </div>
        </div>
    );
};

export default AdmDashboard;