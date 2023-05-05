import React, { useState } from "react";
import { Certificate } from "./Certificate";

const dataCertificate = {
  name: "",
  expiration: "",
};

export const Certificates = ({ count = 1 }) => {
  const [inputs, setInputs] = useState(Array(count).fill([dataCertificate]));

  const handleChange = (e, i) => {
    const name = e.target.name;
    const value = name === "expiration" ? e.target.value : e.target.files[0];
    const newInput = [...inputs];
    newInput[i] = {...newInput[i], [name]: value};
    setInputs(newInput);
  };

  const arrayInput = [];
  for (let index = 0; index < count; index++) {
    arrayInput.push(
      <Certificate key={index} value={inputs[index].expiration} onChange={(e) => handleChange(e, index)} />
    );
  }

  return (
    <div className="col">
      <label className="form-label">Certificados</label>
      {arrayInput}
    </div>
  );
};
