import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useFormik } from 'formik';
import { logInWithGoogle, signUp } from '@/util/firebase/auth';
import SEO from '@/components/SEO/SEO';
import Header from '@/components/navigation/Header';
import AccountContainer from '@/components/layout/AccountContainer';
import Button from '@/components/UI/Button';
import TextInput from '@/components/UI/TextInput';
import InputFeedback from '@/components/UI/InputFeedback';
import { FcGoogle } from 'react-icons/fc';
import { Eye, EyeOff } from 'react-feather';
import { COLORS } from '@/constants/colors';
import { validateSignUp } from '@/util/validateForms';

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const router = useRouter();

  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user, router]);

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validate: validateSignUp,
    onSubmit: async (values) => {
      try {
        await signUp(values.name, values.email, values.password);
      } catch (error: any) {
        const errorCode = error.code;

        if (errorCode === 'auth/email-already-in-use') {
          formik.setErrors({
            email: 'Email already in use. Please log in instead.',
          });
        } else if (errorCode === 'auth/invalid-email') {
          formik.setErrors({
            email: 'Invalid email. Please enter a valid email.',
          });
        } else if (errorCode === 'auth/weak-password') {
          formik.setErrors({
            password: 'Password must be at least 6 characters.',
          });
        } else {
          formik.setErrors({
            confirmPassword: 'Something went wrong. Please try again.',
          });
        }
      }
    },
  });

  return (
    <>
      <SEO
        title='Sign Up | REMAX Metropolis'
        description='Sign up for a REMAX Metropolis account.'
      />
      <Header />
      <AccountContainer>
        <h1 className='mb-4 font-display text-6xl font-[750] text-blue1 md:text-7xl'>
          <span className='text-gradient'>Sign Up</span>
        </h1>

        <p className='text-base mb-8 font-[450] text-blue1 md:mb-10 md:text-lg'>
          Have an account?{' '}
          <Link href='/log-in'>
            <span className='text-blue3'>Log In</span>
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
          Sign Up With Google
        </Button>

        <form onSubmit={formik.handleSubmit} className='flex flex-col gap-6'>
          <div>
            <TextInput
              id='name'
              name='name'
              type='text'
              placeholder='Name'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />

            {formik.touched.name && formik.errors.name ? (
              <InputFeedback state='error'>{formik.errors.name}</InputFeedback>
            ) : null}
          </div>

          <div>
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
              iconOnClick={() => setShowPassword(!showPassword)}
            />

            {formik.touched.password && formik.errors.password ? (
              <InputFeedback state='error'>
                {formik.errors.password}
              </InputFeedback>
            ) : null}
          </div>

          <div className='mb-8 md:mb-10'>
            <TextInput
              id='confirmPassword'
              name='confirmPassword'
              type={showConfirmPassword ? 'text' : 'password'}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
              placeholder='Confirm Password'
              icon={
                showConfirmPassword ? (
                  <EyeOff size={20} color={COLORS.blue1} />
                ) : (
                  <Eye size={20} color={COLORS.blue1} />
                )
              }
              iconOnClick={() => setShowConfirmPassword(!showConfirmPassword)}
            />

            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <InputFeedback state='error'>
                {formik.errors.confirmPassword}
              </InputFeedback>
            ) : null}
          </div>

          <Button
            type='submit'
            hierarchy='primary'
            font='font-[450]'
            padding='py-3'
            classes='w-full text-center'
          >
            Sign Up
          </Button>
        </form>
      </AccountContainer>
    </>
  );
}
