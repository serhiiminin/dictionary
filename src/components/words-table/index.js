import { compose } from 'recompose';
import injectSheet from 'react-jss';
import { withRouter } from 'react-router-dom';
import { withLoadingNames } from '../../context/loading-names';
import { withWords } from '../../context/words';
import WordsTable from './component';
import styles from './styles';

const enhance = compose(
  injectSheet(styles),
  withRouter,
  withLoadingNames,
  withWords
);

export default enhance(WordsTable);
