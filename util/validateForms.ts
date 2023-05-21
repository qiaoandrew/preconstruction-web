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

export const validateSell = (values: any): any => {
  const errors: any = {};

  if (!values.name) {
    errors.name = 'Please enter your name.';
  }

  if (!values.email) {
    errors.email = 'Please enter your email.';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!values.address) {
    errors.address = 'Please enter an address.';
  }

  return errors;
};

export const validateAddListing = (values: any): any => {
  const errors: any = {};

  if (!values.name) {
    errors.name = 'Please enter your name.';
  }

  if (!values.email) {
    errors.email = 'Please enter your email address.';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!values.aboutDevelopment) {
    errors.aboutDevelopment =
      'Please enter some information about the development.';
  }

  return errors;
};

export const validateContact = (values: any): any => {
  const errors: any = {};

  if (!values.name) {
    errors.name = 'Please enter your name.';
  }

  if (!values.email) {
    errors.email = 'Please enter your email address.';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!values.message) {
    errors.message = 'Please enter a message.';
  }

  return errors;
};

export const validateReportProblem = (values: any): any => {
  const errors: any = {};

  if (!values.name) {
    errors.name = 'Please enter your name.';
  }

  if (!values.email) {
    errors.email = 'Please enter your email address.';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!values.problem) {
    errors.problem = 'Please describe the problem.';
  }

  return errors;
};
