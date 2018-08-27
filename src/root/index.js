import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import injectSheet from 'react-jss';
import normalize from 'normalize-jss';
import { compose } from 'recompose';
import { variables } from '../styles/variables';
import { Header, BlocksContainer, Notifications } from '../components';
import { Main, MyWords, AddWord, SearchWord, PageNotFound, LearnWords } from '../pages';
import StateProvider from '../context/index';
import routes from '../routes';
import styles from './styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: variables.colors.block,
      main: variables.colors.text,
      dark: variables.colors.button,
      contrastText: variables.colors.block,
    },
    secondary: {
      light: variables.colors.block,
      main: variables.colors.button,
      dark: variables.colors.button,
      contrastText: variables.colors.block,
    }
  },
});

const Root = () => (
  <MuiThemeProvider theme={theme}>
    <StateProvider>
        <Router>
          <Notifications>
            <BlocksContainer>
              <Header/>
              <Switch>
                <Route exact path={routes.root} component={Main}/>
                <Route exact path={routes.login} render={() => 'login'}/>
                <Route exact path={routes.words.add} component={AddWord}/>
                <Route exact path={routes.words.learn} component={LearnWords}/>
                <Route exact path={routes.words.list} component={MyWords}/>
                <Route exact path={routes.words.search} component={SearchWord}/>
                <Route component={PageNotFound}/>
              </Switch>
            </BlocksContainer>
          </Notifications>
        </Router>
    </StateProvider>
  </MuiThemeProvider>
);

const enhance = compose(
  injectSheet({
    ...normalize,
    ...styles
  }),
);

export default enhance(Root);
