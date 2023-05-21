import SEO from '@/components/SEO/SEO';
import FormPage from '@/components/pages/FormPage';
import { validateSell } from '@/util/validateForms';

export default function Sell() {
  return (
    <>
      <SEO title='Sell Your Property | REMAX Metropolis' />
      <FormPage
        formId='sell'
        title='Selling your home? Our agents are ready to help.'
        description='Enter your information here, and REMAX Metropolis agents will get in contact with you.'
        initialValues={{
          name: '',
          email: '',
          address: '',
          message: '',
        }}
        validate={validateSell}
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
            inputType: 'input',
            id: 'address',
            name: 'address',
            placeholder: 'Address',
            type: 'address',
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
