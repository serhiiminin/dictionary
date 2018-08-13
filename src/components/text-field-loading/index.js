import React  from 'react';
import { Fade, LinearProgress } from '@material-ui/core';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import injectSheet from 'react-jss';
import { classesShape } from '../../defaults/shapes';
import { TextField } from '../../mui-components';
import styles from './styles';

const TextFieldLoading = ({ classes, loading = false, ...restProps }) => (
  <div className={classes.textFieldLoading}>
    <TextField {...restProps} />
    <Fade
      in={loading}
      style={{ transitionDelay: loading ? '300ms' : '' }}
    >
      <LinearProgress color='secondary' />
    </Fade>
  </div>
);

TextFieldLoading.propTypes = {
  classes: classesShape.isRequired,
  loading: PropTypes.bool,
};

TextFieldLoading.defaultProps = {
  loading: false,
};

const enhance = compose(
  injectSheet(styles)
);

export default enhance(TextFieldLoading);
