import React from "react";
import { Card } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Meta } = Card;

const NewCard = ({ notice }) => {

  const { mainPicture, title, content, slug } = notice;
  return (
    <>
      <Card
        cover={
          <img
            alt="new-card"
            src={mainPicture && mainPicture.length ? mainPicture[0].url : `${process.env.PUBLIC_URL}/static/images/default_new.jpg`}
            style={{ height: "150px", objectFit: "cover" }}
            className="p-1"
          />
        }
        actions={[
          <Link to={`/new/${slug}`}>
            <EyeOutlined className="text-warning" /> <br /> View Notice
          </Link>,
        ]}
      >
        <Meta
          title={title}
          content={`${content && content.substring(0, 40)}...`}
        />
      </Card>
    </>
  );
};

export default NewCard;