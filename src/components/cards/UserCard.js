import React from "react";
import { Card } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";


const UserCard = ({ user }) => {

  const { name, email, property, role, createdAt, _id } = user;

  return (
    <>
      <Card
        actions={[
          <Link to={`/admin/user/${_id}`}>
            <EditOutlined className="text-warning" /> <br /> Assign Department
          </Link>,
        ]}
        title={name}
        key={_id}
      >
        <p><strong>Role:</strong> <span className={`badge badge-${(role === "admin") ? 'dark' : 'primary'}`} >{role}</span></p>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>CreatedAt:</strong> {new Date(createdAt).toDateString()}</p>
        <p><strong>Property:</strong> {property.length ? <strong>{property[0].slug.toUpperCase()}</strong> : "Dont have department yet."} </p>
      </Card>
    </>
  );
};

export default UserCard;
