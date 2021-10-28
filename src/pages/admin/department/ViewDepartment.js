import React, { useState, useEffect } from "react";
import AdmNav from "../../../components/navegation/AdmNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getDepartment, updateDepartment } from "../../../functions/departments";
import DetailDepartmentForm from "../../../components/forms/DetailDepartmentForm";


const initialState = {
  commonExpenses: [],
  tower: '',
  number: '',
  mts: '',
  address: '',
  updatedAt: '',
}

const ViewDetailDepartment = ({ history, match }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [values, setValues] = useState(initialState);
  const [loading, setLoading] = useState(false);
  console.log(values, 'VALORES')
  useEffect(() => {
    loadDepartment();
  }, []);

  const loadDepartment = () =>
    getDepartment(match.params.slug).then((d) => {
      setValues({ ...values, ...d.data });      
    });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    updateDepartment(match.params.slug, values, user.token)
      .then((res) => {
        setLoading(false);
        toast.success(`"${res.data.title}" is updated`);
        history.push("/admin/departments");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdmNav />
        </div>

        <div className="col">
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h4>View Detail Department</h4>
          )}

          <DetailDepartmentForm
            handleSubmit={handleSubmit}
            values={values}
            setValues={setValues}
            handleChange={handleChange}
            
          />
        </div>
      </div>
    </div>
  );
};

export default ViewDetailDepartment;