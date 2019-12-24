import { SurveyDetailsInterface } from 'utils/interfaces';
import {
  extractInitialValues,
  extractValidationSchema,
} from 'components/SurveyForm/helpers';
import { Field, Form, Formik, FormikValues } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { SurveyQuestion } from './SurveyQuestion';

export interface SurveyFormProps {
  survey: SurveyDetailsInterface;
  onSubmit: (values: FormikValues) => Promise<void>;
}

export const SurveyForm = ({ survey, onSubmit }: SurveyFormProps) => {
  const { t, ready } = useTranslation('survey-details-page');

  if (!ready) return null;

  const initialValues = extractInitialValues(survey.questions_data);
  const validationSchema = extractValidationSchema(survey.questions_data, t);

  return (
    <>
      <h2>{survey.name}</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {formik => (
          <Form>
            {survey.questions_data.map(question => (
              <Field
                key={question.id}
                name={`question_${question.id}`}
                question={question}
                component={SurveyQuestion}
              />
            ))}
            <button type="submit" disabled={formik.isSubmitting}>
              {t('form.button.submit.label', 'Submit')}
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};
