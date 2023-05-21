import { useState } from 'react';
import { useFormik } from 'formik';
import { resetPassword } from '@/util/firebase/auth';
import { validateForgotPassword } from '@/util/validateForms';
import SEO from '@/components/SEO/SEO';
import Header from '@/components/navigation/Header';
import AccountContainer from '@/components/layout/AccountContainer';
import TextInput from '@/components/UI/TextInput';
import Button from '@/components/UI/Button';
import InputFeedback from '@/components/UI/InputFeedback';

export default function ForgotPassword() {
  const [emailSentSuccessful, setEmailSentSuccessful] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validate: validateForgotPassword,
    onSubmit: async (values) => {
      try {
        await resetPassword(values.email);
        setEmailSentSuccessful(true);
      } catch (error: any) {
        const errorCode = error.code;

        if (errorCode === 'auth/user-not-found') {
          formik.setFieldError(
            'email',
            'Email address not found. Please sign up.'
          );
        } else if (errorCode === 'auth/invalid-email') {
          formik.setFieldError('email', 'Email is invalid. Please try again.');
        } else {
          formik.setFieldError(
            'email',
            'Something went wrong. Please try again.'
          );
        }
      }
    },
  });

  return (
    <>
      <SEO title='Forgot Password | REMAX Metropolis' />
      <Header />
      <AccountContainer>
        <h1 className='mb-4 font-display text-6xl font-[750] text-blue1 md:mb-6 md:text-7xl'>
          <span className='text-gradient'>Forgot Password</span>
        </h1>
        <p className='text-base mb-8 text-left font-[450] leading-relaxed text-blue1 md:mb-10 md:leading-relaxed'>
          We will send you an email with a link to reset your password.
        </p>
        <form onSubmit={formik.handleSubmit}>
          <div className='mb-16'>
            <TextInput
              id='email'
              name='email'
              type='email'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              placeholder='Email'
            />

            {formik.touched.email && formik.errors.email ? (
              <InputFeedback state='error'>{formik.errors.email}</InputFeedback>
            ) : null}

            {emailSentSuccessful ? (
              <InputFeedback state='success'>Email sent!</InputFeedback>
            ) : null}
          </div>

          <Button
            type='onClick'
            onClick={formik.handleSubmit}
            hierarchy='primary'
            font='font-[450]'
            padding='py-3'
            classes='w-full text-center'
          >
            Send Email
          </Button>
        </form>
      </AccountContainer>
    </>
  );
}
