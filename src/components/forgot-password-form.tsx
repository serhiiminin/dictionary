import React, { useContext } from 'react';
import { compose } from 'recompose';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import * as yup from 'yup';
import { ButtonSearch, Form, FormWrapper, TitleBlock } from './index';
import LN from '../constants/loading-names';
import VL from '../constants/validation-lines';
import { AuthContext, AI } from '../context/auth';
import { LoadingContext, LI } from '../context/loading';

const initialValues = { email: '' };

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .required(VL.required)
    .email(VL.email),
});

const fields = [{ name: 'email', label: 'Email' }];

type Props = RouteComponentProps & AI & LI;

const ForgotPasswordForm = (): JSX.Element => {
  const { handleBasicForgotPassword } = useContext(AuthContext);
  const { checkIsLoading } = useContext(LoadingContext);
  const isLoading = checkIsLoading(LN.auth.logIn);

  return (
    <>
      <TitleBlock>Your email</TitleBlock>
      <FormWrapper marginTop={3.5}>
        <Form
          validateOnBlur
          isLoading={isLoading}
          validateOnChange={false}
          onSubmit={handleBasicForgotPassword}
          initialValues={initialValues}
          validationSchema={validationSchema}
          fields={fields}
          renderSubmit={(): JSX.Element => (
            <ButtonSearch type="submit" color="secondary" variant="contained">
              Send
            </ButtonSearch>
          )}
        />
      </FormWrapper>
    </>
  );
};

export default compose<Props, {}>(withRouter)(ForgotPasswordForm);
