import React from 'react';

const ExpenseForm = ({
  handleSubmit,
  handleChange,
  values,
}) => {

  const { total, departments } = values;  
  return (
    <form onSubmit={handleSubmit}>

      <div className="form-group">
        <h4>Department Expense </h4>
        <select name="department" className="form-control" onChange={handleChange}>
          <option>Please select department</option>
          {departments.map((d) => (
            <option key={d._id} value={d._id}>
              {d.slug.toUpperCase()}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>$ Total Expense</label>
        <input
          type="number"
          name="total"
          className="form-control"
          value={total}
          onChange={handleChange}
        />
      </div>

      <br />
      <button className="btn btn-outline-info">Save</button>
    </form>
  );
};

export default ExpenseForm;