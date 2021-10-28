import React from "react";
import { Link } from "react-router-dom";

const UserNav = () => (
  <nav>
    <ul className="nav flex-column">
      <li className="nav-item">
        <Link to="/user/history" className="nav-link">
          Profile
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/user/password" className="nav-link">
          Update Password
        </Link>
      </li>

      {/* <li className="nav-item">
        <Link to="/user/common_expenses" className="nav-link">
          Common Expenses
        </Link>
      </li> */}
    </ul>
  </nav>
);

export default UserNav;