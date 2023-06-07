import React from "react";

export const Certificate = ({ value, onChange }) => {
  return (
    <div className="d-flex col-12">
      <div className="col-8 me-1 mb-2">
        <input
          type="file" 
          accept=".jpg,.pgn,.pdf,.bmp"
          className="form-control"
          name="name"
          onChange={onChange}
        />
      </div>
      <div className="col-4">
        <input
          type="date"
          className="form-control"
          name="expiration"
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
};
