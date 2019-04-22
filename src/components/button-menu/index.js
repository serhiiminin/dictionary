import React from 'react';
import styled from 'styled-components';
import ButtonWithRouter from '../button-with-router';

const ButtonMenu = styled(props => <ButtonWithRouter {...props} />)`
  && {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.85);
    padding: 15px 45px;
    background: rgba(216, 216, 216, 0.0001);
    &:hover {
      background: rgba(216, 216, 216, 0.0001);
    }
  }
`;

export default ButtonMenu;
