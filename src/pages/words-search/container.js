import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactRouterPropTypes from "react-router-prop-types";
import {
  Button,
  ControlsSeparator,
  TextFieldLoading,
  WordPreview
} from "../../components";
import loadingNames from "../../constants/loading-names";
import { joinRoute, parseSearchParams } from "../../helpers/join-url";
import routes from "../../routes";
import composeClassesPropTypes from '../../helpers/compose-classes-prop-types';
import styles from './styles';

const SEARCH_INPUT_TIMEOUT = 500;

const initialState = {
  searchValue: ""
};

const EN = "en";
const UK = "uk";

const composeSearchData = text => {
  const translatingWord = text.trim();
  const from =
    encodeURIComponent(translatingWord) === translatingWord ? EN : UK;
  const to = encodeURIComponent(translatingWord) === translatingWord ? UK : EN;

  return { text: translatingWord, from, to };
};

class SearchWordContainer extends Component {
  static propTypes = {
    foundWord: PropTypes.shape({}),
    history: ReactRouterPropTypes.history.isRequired,
    location: ReactRouterPropTypes.location.isRequired,
    saveWord: PropTypes.func.isRequired,
    searchWord: PropTypes.func.isRequired,
    cleanFoundWord: PropTypes.func.isRequired,
    checkIsLoading: PropTypes.func.isRequired,
    setEditingWord: PropTypes.func.isRequired,
    classes: composeClassesPropTypes(styles),
  };

  static defaultProps = {
    foundWord: {},
    classes: {},
  };

  state = initialState;

  componentDidMount() {
    const { location } = this.props;
    const searchParams = parseSearchParams(location.search);

    if (searchParams.query) {
      this.searchWord(searchParams.query);
    }
  }

  componentDidUpdate(prevProps) {
    const { location } = this.props;
    const searchParams = parseSearchParams(location.search);

    if (this.props.location.search !== prevProps.location.search && searchParams.query) {
      this.searchWord(searchParams.query);
    }
  }

  componentWillUnmount() {
    this.props.cleanFoundWord();
  }

  cleanSearchValue = () => this.setState({ searchValue: "" });

  searchWord = text => {
    clearTimeout(this.inputTimer);
    this.setState({ searchValue: text });
    this.inputTimer = setTimeout(() => {
      this.props.searchWord(composeSearchData(text));
    }, SEARCH_INPUT_TIMEOUT);
  };

  handleOnChangeSearchInput = event => {
    clearTimeout(this.inputTimer);
    const { value } = event.target;

    this.setState({ searchValue: value });

    this.inputTimer = setTimeout(() => {
      this.props.history.push(
        joinRoute({
          pathname: routes.words.search,
          searchParams: { query: value }
        })
      );
    }, SEARCH_INPUT_TIMEOUT);
  };

  handleEditBeforeSaving = () => {
    const { history, setEditingWord, foundWord } = this.props;

    return Promise.resolve(setEditingWord(foundWord)).then(() => {
      this.setState({ ...initialState });
      history.push(routes.words.add);
    });
  };

  handleSaveWord = () => {
    const { saveWord, foundWord, cleanFoundWord } = this.props;

    return saveWord(foundWord).then(() => {
      this.cleanSearchValue();
      return cleanFoundWord();
    });
  };

  render() {
    const { searchValue } = this.state;
    const { foundWord, checkIsLoading, classes } = this.props;
    const isEmpty = !Object.keys(foundWord).length;
    const loading = checkIsLoading(loadingNames.searchWord);

    return (
      <main>
        <div className={classes.searchBlock}>
          <TextFieldLoading
            label="Search a word"
            value={searchValue}
            onChange={this.handleOnChangeSearchInput}
            loading={loading}
          />
          <ControlsSeparator align="right">
            <Button
              onClick={this.handleSaveWord}
              disabled={isEmpty}
              variant="contained"
              color="primary"
            >
              Save to my words
            </Button>
            <Button
              onClick={this.handleEditBeforeSaving}
              disabled={isEmpty}
              variant="contained"
              color="primary"
            >
              Edit before saving
            </Button>
          </ControlsSeparator>
        </div>
        <WordPreview word={foundWord} />
      </main>
    );
  }
}

export default SearchWordContainer;
