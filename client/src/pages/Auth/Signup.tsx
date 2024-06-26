import React, { useState } from 'react';

import Input from '../../components/Form/Input/Input';
import Button from '../../components/Button/Button';
import Auth from './Auth';
import { AuthPageProps } from '../../components/types';
import { required, length, email } from '../../util/validators';

interface SignupFormState {
  email: {
    value: string;
    valid: boolean;
    touched: boolean;
    validators: ((value: string) => boolean)[];
  };
  password: {
    value: string;
    valid: boolean;
    touched: boolean;
    validators: ((value: string) => boolean)[];
  };
  name: {
    value: string;
    valid: boolean;
    touched: boolean;
    validators: ((value: string) => boolean)[];
  };
}

const Signup: React.FC<Partial<AuthPageProps>> = (props) => {
  const [signupForm, setSignupForm] = useState<SignupFormState>({
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
    },
    name: {
      value: '',
      valid: false,
      touched: false,
      validators: [required]
    }
  });
  const [formIsValid, setFormIsValid] = useState(false);

  const inputChangeHandler = (input: keyof SignupFormState, value: string) => {
    let isValid = true;
    for (const validator of signupForm[input].validators) {
      isValid = isValid && validator(value);
    }
    const updatedForm = {
      ...signupForm,
      [input]: {
        ...signupForm[input],
        valid: isValid,
        value: value
      }
    };
    let formValidity = true;
    for (const inputName in updatedForm) {
      formValidity = formValidity && updatedForm[inputName].valid;
    }
    setSignupForm(updatedForm);
    setFormIsValid(formValidity);
  };

  const inputBlurHandler = (input: keyof SignupFormState) => {
    setSignupForm(prevForm => ({
      ...prevForm,
      [input]: {
        ...prevForm[input],
        touched: true
      }
    }));
  };

  return (
    <Auth>
      { props.onSignup && <form onSubmit={e => props.onSignup!(e, signupForm)}>
        <Input
          id="email"
          label="Your E-Mail"
          type="email"
          control="input"
          onChange={inputChangeHandler.bind(this, 'email')}
          onBlur={inputBlurHandler.bind(this, 'email')}
          value={signupForm.email.value}
          valid={signupForm.email.valid}
          touched={signupForm.email.touched}
        />
        <Input
          id="name"
          label="Your Name"
          type="text"
          control="input"
          onChange={inputChangeHandler.bind(this, 'name')}
          onBlur={inputBlurHandler.bind(this, 'name')}
          value={signupForm.name.value}
          valid={signupForm.name.valid}
          touched={signupForm.name.touched}
        />
        <Input
          id="password"
          label="Password"
          type="password"
          control="input"
          onChange={inputChangeHandler.bind(this, 'password')}
          onBlur={inputBlurHandler.bind(this, 'password')}
          value={signupForm.password.value}
          valid={signupForm.password.valid}
          touched={signupForm.password.touched}
        />
        <Button design="raised" type="submit" loading={props.loading}>
          Signup
        </Button>
      </form>}
    </Auth>
  );
};

export default Signup;
