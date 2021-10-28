import React, { useState, useEffect } from "react";
import AdmNav from "../../../components/navegation/AdmNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {
  createNew,
  removeNew,
  getNewsList,
} from "../../../functions/news";
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import NewForm from "../../../components/forms/NewForm";
import Searcher from "../../../components/forms/Searcher";
import FileUpload from "../../../components/forms/FileUpload";

const initialState = {
  mainPicture: [],
  title: '',
  content: '',
  postedBy: '',
  news: [],
}

const CreateNew = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [values, setValues] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    loadNews();
  }, []);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const loadNews = () =>
    getNewsList().then((c) => setValues({ ...values, news: c.data }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    createNew(user._id, values, user.token)
      .then((res) => {
        toast.success(`"${res.data.title}" is created`);
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
      removeNew(slug, user.token)
        .then((res) => {
          setLoading(false);
          toast.error(`${res.data.title} deleted`);
          loadNews();
        })
        .catch((err) => {
          if (err.response.status === 400) {
            setLoading(false);
            toast.error(err.response.data);
          }
        });
    }
  };

  const searched = (keyword) => (c) => c.title.toLowerCase().includes(keyword);

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
            <h4>Create New</h4>
          )}

          <div className="p-3">
            <FileUpload
              values={values}
              setValues={setValues}
              setLoading={setLoading}
            />
          </div>

          <NewForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            values={values}
          />

          <Searcher keyword={keyword} setKeyword={setKeyword} />

          {values.news.filter(searched(keyword)).map((n) => (

            <div className="alert alert-secondary" key={n._id} >
              {n.title}
              <span
                onClick={() => handleRemove(n.slug)}
                className="btn btn-sm float-right"
              >
                <DeleteOutlined className="text-danger" />
              </span>
              <Link to={`/admin/new/${n.slug}`}>
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

export default CreateNew;