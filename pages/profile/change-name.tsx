import { useState } from 'react';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import SEO from '@/components/SEO/SEO';
import AccountContainer from '@/components/layout/AccountContainer';
import Header from '@/components/navigation/Header';
import TextInput from '@/components/UI/TextInput';
import InputFeedback from '@/components/UI/InputFeedback';
import Button from '@/components/UI/Button';
import { validateChangeName } from '@/util/validateForms';
import { changeDisplayName } from '@/util/firebase/auth';

export default function ChangeName() {
  const [changeNameSuccessful, setChangeNameSuccessful] = useState(false);

  const user = useSelector((state: RootState) => state.auth.user);

  const formik = useFormik({
    initialValues: {
      newName: user?.name || '',
    },
    validate: validateChangeName,
    onSubmit: async (values) => {
      try {
        await changeDisplayName(values.newName);
        setChangeNameSuccessful(true);
      } catch (error: any) {
        const errorCode = error.code;

        if (errorCode === 'auth/invalid-display-name') {
          formik.setFieldError(
            'newName',
            'Invalid display name. Please try again.'
          );
        } else {
          formik.setFieldError(
            'newName',
            'Something went wrong. Please try again.'
          );
        }
      }
    },
  });

  return (
    <>
      <SEO title='Change Name | REMAX Metropolis' />
      <Header />
      <AccountContainer>
        <h1 className='mb-8 font-display text-6xl font-[750] text-blue1 md:mb-9 md:text-7xl'>
          <span className='text-gradient'>Change Name</span>
        </h1>
        <form onSubmit={formik.handleSubmit}>
          <div className='mb-16 text-left'>
            <TextInput
              id='newName'
              name='newName'
              type='text'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.newName}
              placeholder={user?.name || 'New Name'}
            />

            {formik.touched.newName && formik.errors.newName ? (
              <InputFeedback state='error'>
                {formik.errors.newName}
              </InputFeedback>
            ) : null}

            {changeNameSuccessful ? (
              <InputFeedback state='success'>Name saved!</InputFeedback>
            ) : null}
          </div>

          <Button
            type='submit'
            hierarchy='primary'
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
