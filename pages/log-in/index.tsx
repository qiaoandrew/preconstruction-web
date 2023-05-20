import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useFormik } from 'formik';
import { validateLogin } from '@/util/validateForms';
import { logIn, logInWithGoogle } from '@/util/firebase/auth';
import SEO from '@/components/SEO/SEO';
import Header from '@/components/navigation/Header';
import AccountContainer from '@/components/layout/AccountContainer';
import Button from '@/components/UI/Button';
import TextInput from '@/components/UI/TextInput';
import InputFeedback from '@/components/UI/InputFeedback';
import { FcGoogle } from 'react-icons/fc';
import { Eye, EyeOff } from 'react-feather';
import { COLORS } from '@/constants/colors';

export default function LogIn() {
  const [showPassword, setShowPassword] = useState(false);
  const user = useSelector((state: RootState) => state.auth.user);

  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user, router]);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validate: validateLogin,
    onSubmit: async (values) => {
      try {
        await logIn(values.email, values.password);
      } catch (error: any) {
        const errorCode = error.code;

        if (errorCode === 'auth/user-not-found') {
          formik.setFieldError(
            'email',
            'Email address not found. Please sign up.'
          );
        } else if (errorCode === 'auth/wrong-password') {
          formik.setFieldError(
            'password',
            'Incorrect password. Please try again.'
          );
        } else if (errorCode === 'auth/invalid-email') {
          formik.setFieldError('email', 'Email is invalid. Please try again.');
        } else {
          formik.setFieldError(
            'password',
            'Something went wrong. Please try again.'
          );
        }
      }
    },
  });

  return (
    <>
      <SEO
        title='Log In | REMAX Metropolis'
        description='Log in to your REMAX Metropolis account.'
      />
      <Header />
      <AccountContainer>
        <h1 className='mb-4 font-display text-6xl font-[750] text-blue1 md:text-7xl'>
          <span className='text-gradient'>Log In</span>
        </h1>
        <p className='text-base mb-8 font-[450] text-blue1 md:mb-10 md:text-lg'>
          New user?{' '}
          <Link href='/sign-up'>
            <span className='text-blue3'>Create an account</span>
          </Link>
        </p>

        <Button
          type='onClick'
          onClick={() => logInWithGoogle()}
          hierarchy='secondary'
          font='text-base font-[450] text-blue1'
          padding='py-3'
          border='rounded-full'
          icon={<FcGoogle size={24} />}
          classes='w-full text-center mb-9'
        >
          Log In With Google
        </Button>

        <form onSubmit={formik.handleSubmit} className='flex flex-col gap-6'>
          <div>
            <TextInput
              id='email'
              name='email'
              type='email'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              placeholder='Email Address'
            />

            {formik.touched.email && formik.errors.email ? (
              <InputFeedback state='error'>{formik.errors.email}</InputFeedback>
            ) : null}
          </div>

          <div>
            <TextInput
              id='password'
              name='password'
              type={showPassword ? 'text' : 'password'}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              placeholder='Password'
              icon={
                showPassword ? (
                  <EyeOff size={20} color={COLORS.blue1} />
                ) : (
                  <Eye size={20} color={COLORS.blue1} />
                )
              }
              iconOnClick={() =>
                setShowPassword((prevShowPassword) => !prevShowPassword)
              }
            />

            {formik.touched.password && formik.errors.password ? (
              <InputFeedback state='error'>
                {formik.errors.password}
              </InputFeedback>
            ) : null}
          </div>

          <Link href='/forgot-password' className='mb-8 self-end md:mb-10'>
            <p className='text-base font-[450] text-blue3'>Forgot Password?</p>
          </Link>

          <Button
            type='submit'
            hierarchy='primary'
            font='font-[450]'
            padding='py-3'
            classes='w-full text-center'
          >
            Log In
          </Button>
        </form>
      </AccountContainer>
    </>
  );
}
