import React from "react";

const UserForm = ({
  handleSubmit,
  handleChange,
  values,
  propertys
}) => {

  const { role, property, email, name, updatedAt, createdAt } = values;

  const hasProperty = (property.length > 0) ? property[0]._id : '';

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Role</label>
        <input
          type="text"
          name="role"
          className="form-control"
          value={role}
          onChange={handleChange}
          disabled
        />
      </div>
      <div className="form-group">
        <label>Property</label>
        <select name="property" className="form-control" onChange={handleChange}>
          <option>Select property</option>
          {propertys.map((property) => <option value={property._id} selected={hasProperty === property._id}  >{property.slug}</option>)}
        </select>
      </div>
      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={email}
          className="form-control"
          onChange={handleChange}
          disabled
        />
      </div>
      <div className="from-group">
        <label>Name</label>
        <input
          type="text"
          name="name"
          className="form-control"
          onChange={handleChange}
          value={name}
          disabled
        />
      </div>
      <div className="from-group">

        <label>Created At: {createdAt}</label>
        <label>Last Updated: {updatedAt}</label>

      </div>
      <br />
      <button className="btn btn-outline-info">Save</button>
    </form>
  );
};

export default UserForm;