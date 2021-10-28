import React from "react";
import { Link } from "react-router-dom";

const AdmNav = () => (
  <nav>
    <ul className="nav flex-column">
      <li className="nav-item">
        <Link to="/admin/dashboard" className="nav-link">
          Dashboard
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/admin/department" className="nav-link">
          Departments
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/admin/common-expenses" className="nav-link">
          Common Expenses
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/admin/news" className="nav-link">
          News
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/user/password" className="nav-link">
          Update Password
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/admin/users" className="nav-link">
          Users
        </Link>
      </li>
    </ul>
  </nav>
);

export default AdmNav;