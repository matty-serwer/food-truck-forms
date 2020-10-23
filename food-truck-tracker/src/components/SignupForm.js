import React, { useState, useEffect } from "react";
import styled from "styled-components";
import * as yup from "yup";
import axios from "axios";
import { Link } from 'react-router-dom'
import schema from "./SignupFormSchema";
import FormErrors from "./FormErrors.js";

const initFormValues = {
  userType: "",
  userName: "",
  email: "",
  password: "",
};

const initFormErrors = {
  userType: "",
  userName: "",
  email: "",
  password: "",
};

const HOST = "https://food-truck-trackerr.herokuapp.com";
const REG_URL = "/api/auth/register";

const StyledForm = styled.form`
  display: flex;
  /* justify-content: center; */
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 40rem;
  margin: auto;
  padding: 4rem 0 3rem 1rem;
  border-radius: 20px;
  font-size: 1.5rem;
  background-color: rgb(242, 200, 174, .3);
  .form-label {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    /* margin-right: 25%; */
    margin:auto;
  }
  .input-field {
    width: 20rem;
    padding: 0.3rem;
    border: 2px solid #ccc;
    border-radius: 4px;
    margin: 1rem;
    margin-right: 5rem;
    font-size: 1.5rem;
  }
  .form-select {
    font-size: 1.5rem;
    padding: 0.3rem;
    width: 20.75rem;
    margin-right: 5rem;
    margin-bottom: 1rem;
  }
  .submit {
    background-color: #4caf50;
    color: white;
    padding: 12px 20px;
    border: none;
    border-radius: 7px;
    font-size: 1.5rem;
    margin: 1rem 0 .5rem 4rem;
  }
  .submit:disabled {
    background-color: grey;
  }
`;

const SignupForm = () => {
  const [formValues, setFormValues] = useState(initFormValues);
  const [disabled, setDisabled] = useState(true);
  const [formErrors, setFormErrors] = useState(initFormErrors);

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
    setFormValues(initFormValues);
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
      <h1>Sign Up!</h1>
      <StyledForm className='form' onSubmit={onSubmit}>
        <label className='form-label'>
          <select
            className='form-select'
            onChange={onChange}
            value={formValues.userType}
            name='userType'
          >
            <option value=''>--Select User Type--</option>
            <option value='user'>I'm looking for food!</option>
            <option value='operator'>I have a food truck.</option>
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
      <div>
        <p>Already a member? <Link to='/LoginForm'>Sign in here!</Link></p>
      </div>
      <FormErrors errors={formErrors} />
    </div>
  );
};

export default SignupForm;
