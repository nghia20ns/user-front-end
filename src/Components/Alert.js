import React from "react";

const Alert = ({ message }) => {
  return (
    <>
      <div>
        <div className="alert alert-danger" role="alert">
          {message}
        </div>
      </div>
    </>
  );
};

export default Alert;
