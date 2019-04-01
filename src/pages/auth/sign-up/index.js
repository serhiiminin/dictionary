import { compose } from 'recompose';
import { withTheme } from 'styled-components';
import { withRouter } from 'react-router-dom';
import { withAuth } from '../../../context/auth';
import LoginCmp from './container';
import { withErrors } from '../../../context/errors';

const SignUp = compose(
  withTheme,
  withRouter,
  withAuth,
  withErrors
)(LoginCmp);

export default SignUp;
