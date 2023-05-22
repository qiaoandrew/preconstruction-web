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

export const validateChangeName = (values: any): any => {
  const errors: any = {};

  if (!values.newName) {
    errors.newName = 'Please enter your new name.';
  }

  return errors;
};

export function validateChangeEmail(values: any): any {
  const errors: any = {};

  if (!values.currentPassword) {
    errors.currentPassword = 'Please enter your current password.';
  }

  if (!values.newEmail) {
    errors.newEmail = 'Please enter your email address.';
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.newEmail)
  ) {
    errors.newEmail = 'Please enter a valid email address.';
  }

  return errors;
}

export function validateChangePassword(values: any): any {
  const errors: any = {};

  if (!values.currentPassword) {
    errors.currentPassword = 'Please enter your current password.';
  }

  if (!values.newPassword) {
    errors.newPassword = 'Please enter your new password.';
  } else if (values.newPassword.length < 6) {
    errors.newPassword = 'Your password must be at least 6 characters.';
  }

  if (values.confirmNewPassword !== values.newPassword) {
    errors.confirmNewPassword = 'Your passwords do not match.';
  }

  return errors;
}
