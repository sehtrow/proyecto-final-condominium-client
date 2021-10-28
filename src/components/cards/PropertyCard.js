import React from "react";
import { Card } from "antd";
import { Link } from "react-router-dom";
import { EyeOutlined } from "@ant-design/icons";

const SingleNew = ({ property }) => {
  const { tower, number, mts, address, slug, _id } = property;

  return (
    <>
      <Card
        actions={[
          <Link to={`/property/${slug}`}>
            <EyeOutlined className="text-warning" /> <br /> Account Statement
          </Link>,
        ]}
        cover={
          <img
            alt="image_condominium_default"
            src={`${process.env.PUBLIC_URL}/static/images/depto_default.jpeg`}
          />
        }
        key={_id}
      >
        <h4 className="text-center"><strong>Condominium San App</strong> </h4>
        <p><strong>Tower:</strong> <span>{tower}</span></p>
        <p><strong>Number:</strong> {number}</p>
        <p><strong>Mts:</strong> {mts}</p>
        <p><strong>{address}</strong> </p>
      </Card>
    </>
  );
};

export default SingleNew;