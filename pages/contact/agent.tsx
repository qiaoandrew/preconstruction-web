import SEO from '@/components/SEO/SEO';
import FormPage from '@/components/pages/FormPage';
import { validateContact } from '@/util/validateForms';

export default function ContactAgent() {
  return (
    <>
      <SEO title='Contact an Agent | REMAX Metropolis' />
      <FormPage
        formId='contact-agent'
        title='Have a question? Our agents are ready to help.'
        description='Enter your name, email, and message into this form, and our agents will respond as soon as possible.'
        initialValues={{
          name: '',
          email: '',
          message: '',
        }}
        validate={validateContact}
        formElements={[
          {
            inputType: 'input',
            id: 'name',
            name: 'name',
            placeholder: 'Name',
            type: 'text',
          },
          {
            inputType: 'input',
            id: 'email',
            name: 'email',
            placeholder: 'Email',
            type: 'email',
          },
          {
            inputType: 'textarea',
            id: 'message',
            name: 'message',
            placeholder: 'Message',
          },
        ]}
      />
    </>
  );
}
