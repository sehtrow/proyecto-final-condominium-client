import React, { useEffect, useState } from "react";
import { getNews, getNewsCount } from "../../functions/news";
import NewCard from "../cards/NewCard";
import LoadingCard from "../cards/LoadingCard";
import { Pagination } from "antd";

const NewList = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newsCount, setNewsCount] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    loadAllNews();
  }, [page]);

  useEffect(() => {
    getNewsCount().then((res) => setNewsCount(res.data));
  }, []);

  const loadAllNews = () => {
    setLoading(true);
    getNews("createdAt", "desc", page).then((res) => {
      setNews(res.data);
      setLoading(false);   
    });
  };

  return (
    <>
      <div className="container">
        {loading ? (
          <LoadingCard count={3} />
        ) : (
          <div className="row">
            {news.map((notice) => (
              <div key={notice._id} className="col-md-4">
                <NewCard notice={notice} />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="row">
        <nav className="col-md-4 offset-md-4 text-center pt-5 p-3">
          <Pagination
            current={page}
            total={(newsCount / 3) * 10}
            onChange={(value) => setPage(value)}
          />
        </nav>
      </div>
    </>
  );
};

export default NewList;