import React, { useState, useEffect } from "react";
import AdmNav from "../../../components/navegation/AdmNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getNew, updateNew } from "../../../functions/news";
import UpdateNewForm from "../../../components/forms/UpdateNewForm";
import FileUpload from "../../../components/forms/FileUpload";

const initialState = {
  mainPicture: [],
  title: '',
  content: '',
  postedBy: '',
}

const UpdateNew = ({ history, match }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [values, setValues] = useState(initialState);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadNew();
  }, []);

  const loadNew = () =>
    getNew(match.params.slug).then((n) => {
      setValues({ ...values, ...n.data });
    });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    updateNew(match.params.slug, values, user.token)
      .then((res) => {
        setLoading(false);
        toast.success(`"${res.data.title}" is updated`);
        history.push("/admin/news");
      })
      .catch((err) => {
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
            <h4>Update new</h4>
          )}

          <div className="p-3">
            <FileUpload
              values={values}
              setValues={setValues}
              setLoading={setLoading}
            />
          </div>
          <UpdateNewForm
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

export default UpdateNew;