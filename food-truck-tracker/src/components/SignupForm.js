import React, { useState, useEffect } from "react";
import schema from "./SignupFormSchema";

const initFormValues = {
  userType: "",
  userName: "",
  email: "",
  password: "",
};

const SignupForm = () => {
  const [formValues, setFormValues] = useState(initFormValues);
  const [disabled, setDisabled] = useState(true);

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      userType: formValues.userType,
      userName: formValues.userName,
      email: formValues.email,
      password: formValues.password,
    };
    postNewUser(newUser);
    setFormValues(initFormValues);
  };

  const postNewUser = (newUser) => {
    // axios post goes here
    console.log(newUser);
  };

  // enable submit button when all entries are valid
  useEffect(() => {
    schema.isValid(formValues).then((valid) => {
      setDisabled(!valid);
    });
  }, [formValues]);

  return (
    <div>
      <form className='form' onSubmit={onSubmit}>
        <label className='form-label'>
          <select
            onChange={onChange}
            value={formValues.userType}
            name='userType'
          >
            <option value=''>--Select User Type--</option>
            <option value='user'>I'm looking for food!</option>
            <option value='operator'>I have a food truck.</option>
          </select>
        </label>
        <label>
          Username
          <input
            type='text'
            name='userName'
            value={formValues.userName}
            onChange={onChange}
          />
        </label>
        <label>
          Email
          <input
            type='email'
            name='email'
            value={formValues.email}
            onChange={onChange}
          />
        </label>
        <label>
          Choose a pasword
          <input
            type='password'
            name='password'
            value={formValues.password}
            onChange={onChange}
          />
        </label>
        <button className='submit' disabled={disabled}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
