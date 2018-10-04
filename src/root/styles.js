import { stylesVariables } from '../constants/styles-variables';
import texture from '../images/texture.png';

const styles = {
  '@global body': {
    overflowX: 'hidden',
    backgroundColor: stylesVariables.colors.background,
    backgroundImage: `url(${texture})`,
    background: `${stylesVariables.colors.background} url(${texture}) center repeat`,
    color: stylesVariables.colors.text,
    fontSize: '1rem',
  },
  '@global *': {
    boxSizing: 'border-box',
  },
};

export default styles;
