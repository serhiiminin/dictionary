import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactRouterPropTypes from "react-router-prop-types";
import { GoogleLogout } from "react-google-login";
import AccountCircle from "@material-ui/icons/AccountCircle";
import styled from "styled-components";
import routes from "../../routes";

const StyledGoogleLogout = styled(GoogleLogout)`
  background: ${props => props.theme.palette.primary.main};
  &:hover {
    cursor: pointer;
  }
`;

class Logout extends Component {
  static propTypes = {
    cleanGoogleToken: PropTypes.func.isRequired,
    history: ReactRouterPropTypes.history.isRequired
  };

  onSuccess = response =>
    Promise.resolve(this.props.cleanGoogleToken(response))
    .then(() => this.props.history.push(routes.login));

  render() {
    return (
      <StyledGoogleLogout
        onLogoutSuccess={this.onSuccess}
      >
        <AccountCircle />
      </StyledGoogleLogout>
    );
  }
}

export default Logout;
