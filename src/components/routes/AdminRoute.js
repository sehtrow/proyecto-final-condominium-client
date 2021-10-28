import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Redirect from "./Redirect";
import { currentAdmin } from "../../functions/auth";

const AdminRoute = ({ children, ...rest }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [validAccess, setValidAccess] = useState(false);

  useEffect(() => {
    if (user && user.token) {
      currentAdmin(user.token)
        .then(() => {
          setValidAccess(true);
        })
        .catch((err) => {
          console.log("Error to route Adm", err);
          setValidAccess(false);
        });
    }
  }, [user]);

  return validAccess ? <Route {...rest} /> : <Redirect />;
};

export default AdminRoute;