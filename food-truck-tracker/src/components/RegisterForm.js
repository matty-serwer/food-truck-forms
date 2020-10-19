// Import all needed outside components
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import * as yup from "yup";
import axios from "axios";
import schema from "./RegisterFormSchema";
import FormErrors from "./FormErrors.js";

// create empty state of form
const initialFormValues = {
    userName = '',
    email = '',
    password = '',
    userType = '',
};

// create error if forms not filled

const initialFormErrors = {
    userName = '',
    email = '',
    password = '',
    userType = '',
};
// API where data lives
const HOST = "https://food-truck-trackerr.herokuapp.com";
const REG_URL = "/api/auth/register";
// Style of form
const StyledForm = styled.form`
  display: flex;
  /* justify-content: center; */
  flex-direction: column;
  align-items: center;
  width: 75%;
  margin: auto;
  font-size: 1.5rem;
  .form-label {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-right: 15rem;
  }
  .input-field {
    width: 24rem;
    padding: 0.3rem;
    border: 2px solid #ccc;
    border-radius: 4px;
    margin: 1rem;
    font-size: 1.5rem;
  }
  .form-select {
    font-size: 1.5rem;
    padding: 0.3rem;
    width: 24.75rem;
    margin-right: 1rem;
    margin-bottom: 1rem;
  }
  .submit {
    background-color: #4caf50;
    color: white;
    padding: 12px 20px;
    border: none;
    border-radius: 7px;
    font-size: 1.5rem;
    margin: 1rem 0 0 4rem;
  }
  .submit:disabled {
    background-color: grey;
  }
`;

const RegisterForm = () => {
  const [formValues, setFormValues] = useState(initialFormValues);
  const [disabled, setDisabled] = useState(true);
  const [formErrors, setFormErrors] = useState(initialFormErrors);

  const onChange = (e) => {
    const { name, value } = e.target;
    yup
      .reach(schema, name)
      .validate(value)
      .then(() => {
        setFormErrors({
          ...formErrors,
          [name]: "",
        });
      })
      .catch((err) => {
        setFormErrors({
          ...formErrors,
          [name]: err.errors[0],
        });
      });
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
    setFormValues(initialFormValues);
  };

  const postNewUser = (newUser) => {
    axios
      .post(`${HOST}${REG_URL}`)
      .then((res) => {
        // do something
        console.log(`${newUser.userName} has been posted`);
      })
      .catch((err) => {
        alert("Network Error.");
      });
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
      <StyledForm className='form' onSubmit={onSubmit}>
        <label className='form-label'>
          <select
            className='form-select'
            onChange={onChange}
            value={formValues.userType}
            name='userType'
          >
            <option value=''>--Select User Type--</option>
            <option value='user'>Register as a customer</option>
            <option value='operator'>Register as a food truck owner</option>
          </select>
        </label>
        <label className='form-label'>
          Username
          <input
            className='input-field'
            type='text'
            name='userName'
            value={formValues.userName}
            onChange={onChange}
          />
        </label>
        <label className='form-label'>
          Email
          <input
            className='input-field'
            type='email'
            name='email'
            value={formValues.email}
            onChange={onChange}
          />
        </label>
        <label className='form-label'>
          Choose a password
          <input
            className='input-field'
            type='password'
            name='password'
            value={formValues.password}
            onChange={onChange}
          />
        </label>
        <button className='submit' disabled={disabled}>
          Submit
        </button>
      </StyledForm>
      <FormErrors errors={formErrors} />
    </div>
  );
};

export default SignupForm;
