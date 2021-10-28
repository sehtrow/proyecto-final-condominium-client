import React from "react";
import Resizer from "react-image-file-resizer";
import axios from "axios";
import { useSelector } from "react-redux";
import { Avatar, Badge } from "antd";

const FileUpload = ({ values, setValues, setLoading }) => {

  const { user } = useSelector((state) => ({ ...state }));

  const fileUploadResize = (e) => {
    let files = e.target.files;
    let allUploadedFiles = values.mainPicture;

    if (files) {
      setLoading(true);
      for (let i = 0; i < files.length; i++) {
        Resizer.imageFileResizer(
          files[i],
          720,
          720,
          "JPEG",
          100,
          0,
          (uri) => {
            axios
              .post(
                `${process.env.REACT_APP_API}/uploadimage`,
                { image: uri },
                {
                  headers: {
                    authtoken: user ? user.token : "",
                  },
                }
              )
              .then((res) => {
                setLoading(false);
                allUploadedFiles.push(res.data);

                setValues({ ...values, mainPicture: allUploadedFiles });
              })
              .catch((err) => {
                setLoading(false);
              });
          },
          "base64"
        );
      }
    }
  };

  const handleImageRemove = (public_id) => {
    setLoading(true);
    axios
      .post(
        `${process.env.REACT_APP_API}/removeimage`,
        { public_id },
        {
          headers: {
            authtoken: user ? user.token : "",
          },
        }
      )
      .then((res) => {
        setLoading(false);
        const { mainPicture } = values;
        let filteredImages = mainPicture.filter((item) => {
          return item.public_id !== public_id;
        });
        setValues({ ...values, mainPicture: filteredImages });
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  return (
    <>
      <div className="row">
        {values.mainPicture &&
          values.mainPicture.map((image) => (
            <Badge
              count="X"
              key={image.public_id}
              onClick={() => handleImageRemove(image.public_id)}
              style={{ cursor: "pointer" }}
            >
              <Avatar
                src={image.url}
                size={100}
                shape="square"
                className="ml-3"
              />
            </Badge>
          ))}
      </div>
      <div className="row">
        <label className="btn btn-primary btn-raised mt-3">
          Choose File
          <input
            type="file"
            multiple
            hidden
            accept="images/*"
            onChange={fileUploadResize}
          />
        </label>
      </div>
    </>
  );
};

export default FileUpload;