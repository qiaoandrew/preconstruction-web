import { useState } from 'react';
import { useFormik } from 'formik';
import SEO from '@/components/SEO/SEO';
import Header from '@/components/navigation/Header';
import AccountContainer from '@/components/layout/AccountContainer';
import TextInput from '@/components/UI/TextInput';
import InputFeedback from '@/components/UI/InputFeedback';
import Button from '@/components/UI/Button';
import { validateChangePassword } from '@/util/validateForms';
import { changePassword } from '@/util/firebase/auth';

export default function ChangePassword() {
  const [passwordChangeSuccessful, setPasswordChangeSuccessful] =
    useState(false);

  const formik = useFormik({
    initialValues: {
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
    validate: validateChangePassword,
    onSubmit: async (values) => {
      try {
        await changePassword(values.currentPassword, values.newPassword);
        setPasswordChangeSuccessful(true);
      } catch (error: any) {
        const errorCode = error.code;

        if (errorCode === 'auth/wrong-password') {
          formik.setErrors({
            currentPassword:
              'Your current password is incorrect. Please try again.',
          });
        } else if (errorCode === 'auth/weak-password') {
          formik.setErrors({
            newPassword: 'Password must be at least 6 characters.',
          });
        } else {
          formik.setErrors({
            newPassword: 'Something went wrong. Please try again.',
          });
        }
      }
    },
  });

  return (
    <>
      <SEO title='Change Password | REMAX Metropolis' />
      <Header />
      <AccountContainer>
        <h1 className='mb-8 font-display text-6xl font-[750] text-blue1 md:mb-9 md:text-7xl'>
          <span className='text-gradient'>Change Password</span>
        </h1>
        <form onSubmit={formik.handleSubmit}>
          <div className='mb-12'>
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

          <div className='mb-5'>
            <TextInput
              id='newPassword'
              name='newPassword'
              type='password'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.newPassword}
              placeholder='New Password'
            />

            {formik.touched.newPassword && formik.errors.newPassword ? (
              <InputFeedback state='error'>
                {formik.errors.newPassword}
              </InputFeedback>
            ) : null}
          </div>

          <div className='mb-16'>
            <TextInput
              id='confirmNewPassword'
              name='confirmNewPassword'
              type='password'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmNewPassword}
              placeholder='Confirm New Password'
            />

            {formik.touched.confirmNewPassword &&
            formik.errors.confirmNewPassword ? (
              <InputFeedback state='error'>
                {formik.errors.confirmNewPassword}
              </InputFeedback>
            ) : null}

            {passwordChangeSuccessful ? (
              <InputFeedback state='success'>Password changed!</InputFeedback>
            ) : null}
          </div>

          <Button
            type='submit'
            hierarchy='primary'
            font='font-[450]'
            padding='py-3'
            border='rounded-full'
            classes='w-full text-center'
          >
            Change Password
          </Button>
        </form>
      </AccountContainer>
    </>
  );
}
