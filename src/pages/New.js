import React, { useEffect, useState } from "react";
import { getNew } from "../functions/news";
import SingleNew from "../components/cards/SingleNew";

const New = ({ match }) => {
  const [notice, setNotice] = useState({});
  const { slug } = match.params;

  useEffect(() => {
    loadSingleNew();
  }, [slug]);


  const loadSingleNew = () => {
    getNew(slug).then((res) => {
      setNotice(res.data);
    });
  };

  return (
    <div className="container-fluid">
      <div className="row pt-3">
        <SingleNew
          notice={notice}
        />
      </div>
    </div>
  );
};

export default New;