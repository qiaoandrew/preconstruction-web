import Header from '../navigation/Header';
import Footer from '../navigation/Footer';
import { useState } from 'react';
import { useFormik } from 'formik';
import { submitForm } from '@/util/formSubmission';
import TextInput from '../UI/TextInput';
import InputFeedback from '../UI/InputFeedback';
import TextArea from '../UI/TextArea';
import Button from '../UI/Button';

type FormElement = {
  inputType: 'input' | 'textarea';
  id: string;
  name: string;
  placeholder: string;
  type?: string;
};

type FormPageProps = {
  formId: string;
  title: string;
  description: string;
  initialValues: any;
  validate: (values: any) => any;
  formElements: FormElement[];
};

export default function FormPage({
  formId,
  title,
  description,
  initialValues,
  validate,
  formElements,
}: FormPageProps) {
  const [submitted, setSubmitted] = useState(false);

  const formik = useFormik({
    initialValues,
    validate,
    onSubmit: async (values, actions) => {
      submitForm(formId, values);
      actions.resetForm();
      setSubmitted(true);
    },
  });

  return (
    <>
      <Header />
      <div className='mx-container-sm mb-24 mt-14 grid gap-8 md:mt-16 lg:grid-cols-2 lg:gap-16 xl:mb-36 2xl:mt-24 2xl:gap-32'>
        <div>
          <h1 className='mb-5 font-display text-4xl font-bold md:mb-6 md:text-6xl 2xl:text-7xl'>
            <span className='text-gradient'>{title}</span>
          </h1>
          <p className='text-base leading-relaxed text-blue1 2xl:text-lg 2xl:leading-relaxed'>
            {description}
          </p>
        </div>
        <form
          name={formId}
          onSubmit={formik.handleSubmit}
          data-netlify='true'
          className='flex flex-col gap-12 lg:mt-3 lg:gap-16'
        >
          <div className='grid gap-6 lg:gap-7'>
            {formElements.map((element: FormElement) =>
              element.inputType === 'input' ? (
                <div key={element.id}>
                  <TextInput
                    id={element.id}
                    name={element.name}
                    type={element.type || 'text'}
                    placeholder={element.placeholder}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values[element.name]}
                  />

                  {formik.touched[element.name] &&
                    formik.errors[element.name] && (
                      <InputFeedback state='error'>
                        <p>{formik.errors[element.name] as string}</p>
                      </InputFeedback>
                    )}
                </div>
              ) : (
                <div key={element.id}>
                  <TextArea
                    id={element.id}
                    name={element.name}
                    placeholder={element.placeholder}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values[element.name]}
                    rows={8}
                  />

                  {formik.touched[element.name] &&
                  formik.errors[element.name] ? (
                    <InputFeedback state='error'>
                      <p>{formik.errors[element.name] as string}</p>
                    </InputFeedback>
                  ) : null}

                  {submitted ? (
                    <InputFeedback state='success'>
                      Success! We will get back to you as soon as possible.
                    </InputFeedback>
                  ) : null}
                </div>
              )
            )}
          </div>

          <Button
            type='submit'
            hierarchy='primary'
            font='font-medium lg:text-lg'
            padding='px-7 py-3 lg:py-3.5'
            classes='w-full text-center lg:w-auto self-start'
          >
            Submit
          </Button>
        </form>
      </div>
      <Footer />
    </>
  );
}
