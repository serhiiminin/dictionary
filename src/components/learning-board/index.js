import { compose } from 'recompose';
import injectSheet from 'react-jss';
import LearningBoard from './component';
import styles from './styles';

const enhance = compose(
  injectSheet(styles)
);

export default enhance(LearningBoard);
