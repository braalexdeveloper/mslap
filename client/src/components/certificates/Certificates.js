import React, { useEffect, useState } from "react";
import { Certificate } from "./Certificate";

const dataCertificate = {
  name: "",
  expiration: "",
};

export const Certificates = ({ count = 1, setInput, input }) => {
  const [inputsCertificates, setInputsCertificates] = useState(
    Array(count).fill(dataCertificate)
  );

  const handleChange = (e, i) => {
    const name = e.target.name;
    const value = name === "expiration" ? e.target.value : e.target.files[0];
    const newInput = [...inputsCertificates];
    newInput[i] = { ...newInput[i], [name]: value };
    setInputsCertificates(newInput);
  };

  const arrayInput = [];
  for (let index = 0; index < count; index++) {
    arrayInput.push(
      <Certificate key={index} onChange={(e) => handleChange(e, index)} />
    );
  }

  useEffect(() => {
    setInput({
      ...input,
      certificates: inputsCertificates,
    });
  }, [inputsCertificates]);

  return (
    <div className="col">
      <label className="form-label">Certificados</label>
      {arrayInput}
    </div>
  );
};
