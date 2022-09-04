import { useState } from 'react';

const useForm = (values) => {
  const [form, setForm] = useState(values);

  const onChangeHandler = (e) => {
    setForm((prevFormValues) => ({
      ...prevFormValues,
      [e.target.name]: e.target.value,
    }));
  };

  const resetForm = () => {
    setForm(values);
  };

  return {
    form,
    onChangeHandler,
    resetForm,
  };
};

export default useForm;
