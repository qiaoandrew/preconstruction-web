import SEO from '@/components/SEO/SEO';
import FormPage from '@/components/pages/FormPage';
import { validateReportProblem } from '@/util/validateForms';

export default function ReportProblem() {
  return (
    <>
      <SEO title='Report a Problem | REMAX Metropolis' />
      <FormPage
        formId='report-problem'
        title='Found a problem? Report it here.'
        description='Include a link to where the problem occured as well as a description.'
        initialValues={{
          name: '',
          email: '',
          message: '',
        }}
        validate={validateReportProblem}
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
            id: 'problem',
            name: 'problem',
            placeholder: 'About the Problem',
          },
        ]}
      />
    </>
  );
}
