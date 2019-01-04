import { compose } from "recompose";
import injectSheet from 'react-jss';
import { withRouter } from "react-router-dom";
import { withUser } from "../../context/user";
import LoginCmp from "./container";
import styles from './styles';
import { withErrors } from "../../context/errors";

const Login = compose(
  injectSheet(styles),
  withRouter,
  withUser,
  withErrors,
)(LoginCmp);

export default Login;
