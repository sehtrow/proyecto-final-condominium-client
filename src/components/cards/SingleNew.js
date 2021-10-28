import React from "react";
import { Card, Tabs } from "antd";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const { TabPane } = Tabs;

const SingleNew = ({ notice }) => {
  const { title, mainPicture, content } = notice;

  return (
    <>
      <div className="col-md-2">

      </div>
      <div className="col-md-8">
        <h1 className="bg-info p-3">{title}</h1>
        {mainPicture && mainPicture.length ? (
          <Carousel showArrows={true} autoPlay infiniteLoop>
            {mainPicture &&
              mainPicture.map((i) => (
                <img alt="carousel" src={i.url} key={i.public_id} />
              ))}
          </Carousel>
        ) : (
          <Card
            cover={
              <img alt="new__" src="" className="mb-3 card-image" />
            }
          ></Card>
        )}

        <Tabs type="card">
          <TabPane tab="Description" key="1">
            {content && content}
          </TabPane>
        </Tabs>
      </div>

      <div className="col-md-2">

      </div>
    </>
  );
};

export default SingleNew;