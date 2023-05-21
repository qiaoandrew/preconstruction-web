export const validateLogIn = (values: any): any => {
  const errors: any = {};

  if (!values.email) {
    errors.email = 'Please enter your email address.';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!values.password) {
    errors.password = 'Please enter your password.';
  }

  return errors;
};

export const validateSignUp = (values: any): any => {
  const errors: any = {};

  if (!values.name) {
    errors.name = 'Please enter your name.';
  }

  if (!values.email) {
    errors.email = 'Please enter your email address.';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!values.password) {
    errors.password = 'Please enter a password.';
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = 'Please confirm your password.';
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match. Please try again.';
  }

  return errors;
};

export const validateForgotPassword = (values: any): any => {
  const errors: any = {};

  if (!values.email) {
    errors.email = 'Please enter your email address.';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Please enter a valid email address.';
  }

  return errors;
};
