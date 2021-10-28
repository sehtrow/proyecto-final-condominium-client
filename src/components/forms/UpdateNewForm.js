import React from "react";

const UpdateNewForm = ({
  handleSubmit,
  handleChange,
  values,
}) => {

  const {
    title,
    content,
  } = values;

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          name="title"
          className="form-control"
          value={title}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Content</label>
        <input
          type="text"
          name="content"
          className="form-control"
          value={content}
          onChange={handleChange}
        />
      </div>

      <button className="btn btn-outline-info">Save</button>
    </form>
  );
};

export default UpdateNewForm;