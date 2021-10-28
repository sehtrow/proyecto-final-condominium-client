import React from "react";
import { Input } from "antd";
const { TextArea } = Input;

const NewForm = ({
  handleSubmit,
  handleChange,
  values,
}) => {

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          name="title"
          className="form-control"
          value={values.title}
          onChange={handleChange}
          maxLength="32"
        />
      </div>

      <div className="form-group">
        <label>Content</label>
        <TextArea
          name="content"
          value={values.content}
          autoSize={{ minRows: 3, maxRows: 5 }}
          onChange={handleChange}
        />
      </div>

      <br />
      <button className="btn btn-outline-info">Save</button>
    </form>
  );
};

export default NewForm;