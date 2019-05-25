import React from 'react';
import * as yup from 'yup';
import PropTypes from 'prop-types';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import {
  InputPassword,
  BlockSocial,
  ButtonSearch,
  ButtonFacebook,
  ButtonGoogle,
  Form,
  FormWrapper,
  TitleBlock,
} from '../../components';
import LN from '../../constants/loading-names';
import VL from '../../constants/validation-lines';
import config from '../../config';

const initialValues = {
  name: '',
  email: '',
  password: '',
  repeatPassword: '',
};

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .required(VL.required)
    .email(VL.email),
  password: yup
    .string()
    .required(VL.required)
    .min(8, VL.passwordMinLength)
    .oneOf([yup.ref('repeatPassword'), null], VL.match),
  repeatPassword: yup
    .string()
    .required(VL.required)
    .min(8, VL.passwordMinLength)
    .oneOf([yup.ref('password'), null], VL.match),
});

const fields = [
  {
    name: 'name',
    label: 'Name',
  },
  {
    name: 'email',
    label: 'Email',
  },
  {
    name: 'password',
    label: 'Password',
    component: InputPassword,
  },
  {
    name: 'repeatPassword',
    label: 'Repeat password',
    component: InputPassword,
  },
];

const SignUpForm = ({ handleBasicSignUp, handleGoogleSignUp, handleFacebookSignUp, checkIsLoading }) => {
  const isLoading = checkIsLoading(LN.auth.signUp);
  const handleGoogle = ({ accessToken }) => handleGoogleSignUp(accessToken);
  const handleFacebook = ({ accessToken }) => handleFacebookSignUp(accessToken);

  return (
    <>
      <TitleBlock>First here? Create an account now!</TitleBlock>
      <FormWrapper marginTop={3.5}>
        <Form
          isLoading={isLoading}
          validationSchema={validationSchema}
          initialValues={initialValues}
          onSubmit={handleBasicSignUp}
          fields={fields}
          renderSubmit={() => (
            <ButtonSearch type="submit" color="secondary" variant="contained">
              Sign up
            </ButtonSearch>
          )}
        />
        <BlockSocial>
          <FacebookLogin
            appId={config.auth.facebook.appId}
            callback={handleFacebook}
            render={({ onClick }) => <ButtonFacebook onClick={onClick} />}
          />
          <GoogleLogin
            clientId={config.auth.google.clientId}
            onSuccess={handleGoogle}
            render={({ onClick }) => <ButtonGoogle onClick={onClick} />}
          />
        </BlockSocial>
      </FormWrapper>
    </>
  );
};

SignUpForm.propTypes = {
  handleBasicSignUp: PropTypes.func.isRequired,
  handleGoogleSignUp: PropTypes.func.isRequired,
  handleFacebookSignUp: PropTypes.func.isRequired,
  checkIsLoading: PropTypes.func.isRequired,
};
export default SignUpForm;
