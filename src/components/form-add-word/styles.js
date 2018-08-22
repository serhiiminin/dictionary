import { variables } from '../../styles/variables';

const styles = {
  formAdd: {
    display: 'grid',
    gridTemplateColumns: '3fr 5fr',
    rowGap: '1rem',
    columnGap: '1rem',
  },
  addExample: {
    display: 'grid',
    padding: `${variables.padding.medium} 0`,
    justifyContent: 'end',
    alignItems: 'center',
  }
};

export default styles;