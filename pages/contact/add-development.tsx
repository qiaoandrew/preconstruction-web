import SEO from '@/components/SEO/SEO';
import FormPage from '@/components/pages/FormPage';
import { validateAddListing } from '@/util/validateForms';

export default function AddDevelopent() {
  return (
    <>
      <SEO title='Add Development | REMAX Metropolis' />
      <FormPage
        formId='add-development'
        title='Have a development? Request to have it added here.'
        description="Include the development's name, developer, address, as well as a link to a Google Drive folder containing assets to showcase the development."
        initialValues={{
          name: '',
          email: '',
          aboutDevelopment: '',
        }}
        validate={validateAddListing}
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
            id: 'aboutDevelopment',
            name: 'aboutDevelopment',
            placeholder: 'About the Development',
          },
        ]}
      />
    </>
  );
}
