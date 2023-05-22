import { useState } from 'react';
import { useFormik } from 'formik';
import SEO from '@/components/SEO/SEO';
import Header from '@/components/navigation/Header';
import AccountContainer from '@/components/layout/AccountContainer';
import TextInput from '@/components/UI/TextInput';
import InputFeedback from '@/components/UI/InputFeedback';
import Button from '@/components/UI/Button';
import { validateChangeEmail } from '@/util/validateForms';
import { changeEmail } from '@/util/firebase/auth';

export default function ChangeEmail() {
  const [changeEmailSuccessful, setChangeEmailSuccessful] = useState(false);

  const formik = useFormik({
    initialValues: {
      currentPassword: '',
      newEmail: '',
    },
    validate: validateChangeEmail,
    onSubmit: async (values) => {
      try {
        await changeEmail(values.newEmail, values.currentPassword);
        setChangeEmailSuccessful(true);
      } catch (error: any) {
        const errorCode = error.code;

        if (errorCode === 'auth/email-already-in-use') {
          formik.setErrors({
            newEmail:
              'Email already in use. Please log in or use another email.',
          });
        } else if (errorCode === 'auth/wrong-password') {
          formik.setErrors({
            currentPassword: 'Incorrect password. Please try again.',
          });
        } else if (errorCode === 'auth/invalid-email') {
          formik.setErrors({
            newEmail: 'Invalid email. Please try again.',
          });
        } else {
          formik.setErrors({
            newEmail: 'Something went wrong. Please try again.',
          });
        }
      }
    },
  });

  return (
    <>
      <SEO title='Change Email | REMAX Metropolis' />
      <Header />
      <AccountContainer>
        <h1 className='mb-8 font-display text-6xl font-[750] text-blue1 md:mb-9 md:text-7xl'>
          <span className='text-gradient'>Change Email</span>
        </h1>
        <form onSubmit={formik.handleSubmit}>
          <div className='mb-16'>
            <TextInput
              id='currentPassword'
              name='currentPassword'
              type='password'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.currentPassword}
              placeholder='Current Password'
            />

            {formik.touched.currentPassword && formik.errors.currentPassword ? (
              <InputFeedback state='error'>
                {formik.errors.currentPassword}
              </InputFeedback>
            ) : null}
          </div>

          <div className='mb-16'>
            <TextInput
              id='newEmail'
              name='newEmail'
              type='text'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.newEmail}
              placeholder='New Email'
            />

            {formik.touched.newEmail && formik.errors.newEmail ? (
              <InputFeedback state='error'>
                {formik.errors.newEmail}
              </InputFeedback>
            ) : null}

            {changeEmailSuccessful ? (
              <InputFeedback state='success'>
                Your email has been updated.
              </InputFeedback>
            ) : null}
          </div>

          <Button
            type='submit'
            hierarchy='primary'
            onClick={formik.handleSubmit}
            font='font-[450]'
            padding='py-3'
            classes='w-full text-center'
          >
            Save
          </Button>
        </form>
      </AccountContainer>
    </>
  );
}
