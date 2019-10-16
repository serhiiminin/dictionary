import React, { useEffect, useContext } from 'react';
import InfoBlock from './info-block';
import { AuthContext } from '../context/auth';

const CheckSignUp = (): JSX.Element => {
  const { removeEmailConfirmation } = useContext(AuthContext);
  useEffect((): (() => void) => {
    return removeEmailConfirmation;
  }, []);
  return <InfoBlock title="Success" description="Check your email to confirm registration!" />;
};

export default CheckSignUp;
