import { withRouter } from 'react-router-dom';
import injectSheet from 'react-jss';
import { compose } from 'recompose';
import { withLoadingNames } from '../../context/loading-names';
import Main from './container';
import styles from './styles';

const enhance = compose(
  injectSheet(styles),
  withRouter,
  withLoadingNames
);

export default enhance(Main);
