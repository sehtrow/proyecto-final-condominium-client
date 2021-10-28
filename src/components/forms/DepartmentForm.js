import React from "react";

const DepartmentForm = ({
  handleSubmit,
  handleChange,
  values,
}) => {

  const { towers, number, mts, address } = values;

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Address</label>
        <input
          type="text"
          name="address"
          className="form-control"
          value={address}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Tower</label>
        <select name="tower" className="form-control" onChange={handleChange}>
          <option>Please select</option>
          {towers.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Number Department</label>
        <input
          type="number"
          name="number"
          className="form-control"
          value={number}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Mts</label>
        <input
          type="number"
          name="mts"
          className="form-control"
          value={mts}
          onChange={handleChange}
        />
      </div>

      <br />
      <button className="btn btn-outline-info">Save</button>
    </form>
  );
};

export default DepartmentForm;