import React, { useState } from 'react';

import Input from '../../components/Form/Input/Input';
import Button from '../../components/Button/Button';
import { required, length, email } from '../../util/validators';
import Auth from './Auth';

const Login = (props) => {
  const [loginForm, setLoginForm] = useState({
    email: {
      value: '',
      valid: false,
      touched: false,
      validators: [required, email]
    },
    password: {
      value: '',
      valid: false,
      touched: false,
      validators: [required, length({ min: 5 })]
    }
  });
  const [formIsValid, setFormIsValid] = useState(false);

  const inputChangeHandler = (input, value) => {
    let isValid = true;
    for (const validator of loginForm[input].validators) {
      isValid = isValid && validator(value);
    }
    const updatedForm = {
      ...loginForm,
      [input]: {
        ...loginForm[input],
        valid: isValid,
        value: value
      }
    };
    let formValidity = true;
    for (const inputName in updatedForm) {
      formValidity = formValidity && updatedForm[inputName].valid;
    }
    setLoginForm(updatedForm);
    setFormIsValid(formValidity);
  };

  const inputBlurHandler = (input) => {
    setLoginForm(prevForm => ({
      ...prevForm,
      [input]: {
        ...prevForm[input],
        touched: true
      }
    }));
  };

  return (
    <Auth>
      <form
        onSubmit={e =>
          props.onLogin(e, {
            email: loginForm.email.value,
            password: loginForm.password.value
          })
        }
      >
        <Input
          id="email"
          label="Your E-Mail"
          type="email"
          control="input"
          onChange={inputChangeHandler.bind(this, 'email')}
          onBlur={inputBlurHandler.bind(this, 'email')}
          value={loginForm.email.value}
          valid={loginForm.email.valid}
          touched={loginForm.email.touched}
        />
        <Input
          id="password"
          label="Password"
          type="password"
          control="input"
          onChange={inputChangeHandler.bind(this, 'password')}
          onBlur={inputBlurHandler.bind(this, 'password')}
          value={loginForm.password.value}
          valid={loginForm.password.valid}
          touched={loginForm.password.touched}
        />
        <Button design="raised" type="submit" loading={props.loading}>
          Login
        </Button>
      </form>
    </Auth>
  );
};

export default Login;
