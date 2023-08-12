import React, { useState } from "react";

const Test = () => {
  const [textValue, setValue] = useState([]);
  const [selectedOptions, setselectedOptions] = useState('');
  const values = ["india", "iraq", "israil"];

  const searchFcn = (e) => {
    if(e.target.value === '') {
        setValue([])
        setselectedOptions('')
    }
    const newValue = values.filter((vl) => vl.includes(e.target.value));
    setValue(newValue);
    setselectedOptions(e.target.value);

    // console.log(newValue)
    // if(textValue === []) {
    //     console.log('empty')
    //     setselectedOptions('')
    // }

    if(e.target.value === '') {
        setselectedOptions('')
        setValue([])
    }
    
  };

  const handleSelect = (e) => {
    console.log("hello")
    console.log(e.target.value)
    setselectedOptions(e.target.value);
  };

  return (
    <>
      <input
        type="text"
        value={selectedOptions}
        onChange={searchFcn}
      />
      <select value={selectedOptions} onChange={handleSelect}>
        {textValue.map((vl) => (
          <option value={vl}>{vl}</option>
        ))}
      </select>
    </>
  );
};

export default Test;
