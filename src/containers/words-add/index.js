import injectSheet from 'react-jss';
import { compose } from 'recompose';
import { withWords } from '../../context/words';
import AddWord from './component';
import styles from './styles';

const enhance = compose(
  injectSheet(styles),
  withWords,
);

export default enhance(AddWord);
