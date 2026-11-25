import {useState} from 'react';

function useForm(callback, initState) {
  const [inputs, setInputst] = useState(initState);

  function handleSubmit(event) {
    if (event) {
      event.preventDefault();
    }
    callback(inputs);
  }

  function handleInputChange(event) {
    event.persist();
    setInputst((inputs) => ({
      ...inputs,
      [event.target.name]: event.target.value,
    }));
  }

  return {
    handleSubmit,
    handleInputChange,
    inputs,
  };
}

export default useForm;
