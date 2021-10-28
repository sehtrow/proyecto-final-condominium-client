import React from "react";
import ExpenseCard from "../cards/ExpenseCard";

const DetailDepartmentForm = ({
  handleSubmit,
  handleChange,
  values,
}) => {

  const {
    commonExpenses,
    tower,
    number,
    mts,
    address,
    updatedAt,
  } = values;

  return (

    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <label>Tower</label>
            <input
              type="text"
              name="tower"
              className="form-control"
              value={tower}
              disabled
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label>Number</label>
            <input
              type="text"
              name="number"
              className="form-control"
              value={number}
              disabled
            />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <label>Address</label>
            <input
              type="text"
              name="address"
              className="form-control"
              value={address}
              disabled
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label>Mts</label>
            <input
              type="number"
              name="mts"
              className="form-control"
              value={mts}
              disabled
            />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <div className="form-group">
            <label>Last Update =  {new Date(updatedAt).toUTCString()}</label>
          </div>
        </div>
      </div>

      <hr />
      {
        commonExpenses.length > 0 ? (
          <>
            <h3>Common Expenses</h3>
            <div className="row">
              {
                commonExpenses.map((e) => (
                  <div className="col-md-3">
                    <ExpenseCard expense={e} />
                  </div>
                ))
              }
            </div>
          </>
        ) : (
          <h3>Dont have common expenses yet!</h3>
        )
      }

    </form>
  );
};

export default DetailDepartmentForm;