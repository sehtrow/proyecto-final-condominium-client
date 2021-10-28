import React, { useState, useEffect } from "react";
import AdmNav from "../../../components/navegation/AdmNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {
  createDepartment,
  removeDepartment,
  getDepartments,
} from "../../../functions/departments";

import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import DepartmentForm from "../../../components/forms/DepartmentForm";
import Searcher from "../../../components/forms/Searcher";


const initialState = {
  towers: ["A", "B", "C", "D", "F"],
  tower: '',
  number: '',
  mts: '',
  commonExpenses: [],
  address: '',
  property: [],
  departments: [],
}

const CreateDepartment = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [values, setValues] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState("");


  useEffect(() => {
    loadDepartments();
    console.log(values)
  }, []);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const loadDepartments = () =>
    getDepartments().then((d) => setValues({ ...values, departments: d.data }));



  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    createDepartment(values, user.token)
      .then((res) => {
        toast.success(`"${res.data.slug}" is created`);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  const handleRemove = async (slug) => {
    if (window.confirm(`Are you sure to delete ${slug} ?`)) {
      setLoading(true);
      removeDepartment(slug, user.token)
        .then((res) => {
          setLoading(false);
          toast.error(`${res.data.title} deleted`);
          loadDepartments();
        })
        .catch((err) => {
          if (err.response.status === 400) {
            setLoading(false);
            toast.error(err.response.data);
          }
        });
    }
  };

  const searched = (keyword) => (c) => c.tower.toLowerCase().includes(keyword);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdmNav />
        </div>
        <div className="col pt-3">
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h4>Create Department</h4>
          )}

          <DepartmentForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            values={values}
          />

          <Searcher keyword={keyword} setKeyword={setKeyword} />

          {values.departments.filter(searched(keyword)).map((n) => (

            <div className="alert alert-secondary" key={n._id} >
              {n.slug.toUpperCase()}
              <span
                onClick={() => handleRemove(n.slug)}
                className="btn btn-sm float-right"
              >
                <DeleteOutlined className="text-danger" />
              </span>
              <Link to={`/admin/department/${n.slug}`}>
                <span className="btn btn-sm float-right">
                  <EditOutlined className="text-warning" />
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CreateDepartment;