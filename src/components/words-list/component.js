import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import urljoin from 'url-join';
import { Checkbox, Fade, LinearProgress } from '@material-ui/core';
import Delete from '@material-ui/icons/Delete';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp';
import Edit from '@material-ui/icons/Edit';
import { Link } from 'react-router-dom';
import { classesDefaultProps } from '../../constants/default-props';
import loadingNames from '../../constants/loading-names';
import { classesShape } from '../../constants/shapes';
import { joinSearchParams, parseSearchParams } from '../../helpers/search-params';
import routes from '../../routes';
import { Button, Select, MenuItem } from '../../components-mui';
import { ButtonWithRouter, Pagination } from '..';

class WordsList extends Component {
  static propTypes = {
    classes: classesShape,
    history: ReactRouterPropTypes.history.isRequired,
    location: ReactRouterPropTypes.location.isRequired,
    words: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string,
        en: PropTypes.string,
        ua: PropTypes.string,
        transcription: PropTypes.string,
        dateCreated: PropTypes.string,
      })),
    wordsCount: PropTypes.number,
    deleteWord: PropTypes.func.isRequired,
    currentLoadingNames: PropTypes.arrayOf(PropTypes.string),
  };

  static defaultProps = {
    classes: classesDefaultProps,
    words: null,
    wordsCount: null,
    currentLoadingNames: null,
  };

  state = {
    checked: [],
    sortBy: 'dateCreated',
    sortDirection: 'descend',
    pagination: 1,
    countPerPage: 10,
  };

  componentDidMount() {
    const { location } = this.props;
    const parsedParams = parseSearchParams(location.search);

    this.setState(prevState => ({
      ...prevState,
      ...parsedParams,
    }));
    this.pushSearchParams();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.countPerPage !== this.state.countPerPage ||
      prevState.sortBy !== this.state.sortBy ||
      prevState.sortDirection !== this.state.sortDirection ||
      prevState.pagination !== this.state.pagination
    ) {
      this.pushSearchParams();
    }
  }

  pushSearchParams = () => {
    const { sortBy, sortDirection, pagination, countPerPage } = this.state;
    const searchQuery = joinSearchParams({ sortBy, sortDirection, pagination, countPerPage });

    this.props.history.push(`${routes.words.list.all}?${searchQuery}`);
  };

  handleOnCheck = id => this.setState(prevState => ({
    ...prevState,
    checked: prevState.checked.find(wordId => wordId === id)
      ? prevState.checked.filter(wordId => wordId !== id)
      : [...prevState.checked, id]
  }));

  handleOnAll = () => this.setState(prevState => ({
    ...prevState,
    checked: prevState.checked.length !== this.props.words.length
      ? [...this.props.words.map(word => word._id)]
      : []
  }));

  handleDeleteWord = () => this.state.checked.length > 0 && Promise.all([
    ...this.state.checked.map(id => this.props.deleteWord(id))
  ])
    .then(() => this.setState({ checked: [] }));

  handleOnChangeSelect = (event, field) => this.setState({
    pagination: 1,
    [field]: event.target.value
  });

  handleOnChangeDirection = () => this.setState(prevState => ({
    ...prevState,
    sortDirection: prevState.sortDirection === 'descend' ? 'ascend' : 'descend',
  }));

  handleOnChangePage = pageNumber => this.setState({
    pagination: pageNumber,
  });

  render() {
    const { checked, countPerPage, sortBy, sortDirection, pagination } = this.state;
    const { classes, words, wordsCount, currentLoadingNames } = this.props;
    const loading = currentLoadingNames.includes(loadingNames.wordsList);
    const isCheckedAll = checked.length === words.length && checked.length > 0;

    return (
      <main className={classes.myWords}>
        <Fade
          in={loading}
          style={{ transitionDelay: loading ? '300ms' : '' }}
        >
          <LinearProgress color='secondary'/>
        </Fade>
        <div className={classes.wordsList}>
          <div className={classes.toolbar}>
            <div>
              <Checkbox
                onChange={() => this.handleOnAll()}
                checked={isCheckedAll}
              />
            </div>
            <div className={classes.toolbarButtons}>
              <div>
                <Button
                  onClick={this.handleOnChangeDirection}
                  title='Sort direction'
                  variant="raised"
                  mini
                >
                  {sortDirection === 'descend'
                    ? <KeyboardArrowDown/>
                    : <KeyboardArrowUp/>}
                </Button>
              </div>
              <div className={classes.countPerPage}>
                <Select
                  value={sortBy}
                  label='Sort by'
                  onChange={event => this.handleOnChangeSelect(event, 'sortBy')}
                >
                  <MenuItem value='en'>English</MenuItem>
                  <MenuItem value='ua'>Ukrainian</MenuItem>
                  <MenuItem value='dateCreated'>Was added</MenuItem>
                  <MenuItem value='timesLearnt'>Was learnt times</MenuItem>
                  <MenuItem value='dateLastLearnt'>Was learnt last time</MenuItem>
                </Select>
              </div>
              <Button title='Delete' variant="fab" mini>
                <Delete onClick={this.handleDeleteWord}/>
              </Button>
            </div>
          </div>
          {words
            .map(word => {
              const { _id, en, ua, transcription, dateCreated } = word;
              const linkToWord = urljoin(routes.words.list.root, _id);
              const isChecked = checked.includes(_id);

              return (
                <div className={`${classes.word} ${isChecked ? classes.wordChosen : ''}`} key={_id}>
                  <div>
                    <Checkbox
                      onChange={() => this.handleOnCheck(_id)}
                      checked={isChecked}
                    />
                  </div>
                  <div className={classes.wordText}>
                    <span>
                      {en && <Link className={classes.linkToWord} to={linkToWord}>{en}</Link>}
                    </span>
                    {transcription && ` - ${transcription}`}
                    {ua && ` - ${ua}`}
                  </div>
                  <div className={classes.wordTime}>
                    {moment(dateCreated)
                      .fromNow()}
                  </div>
                  <div>
                    <ButtonWithRouter
                      to={urljoin(routes.words.list.root, _id, 'edit')}
                      title='Edit'
                      variant="fab"
                      mini
                    >
                      <Edit/>
                    </ButtonWithRouter>
                  </div>
                </div>
              );
            })}

          <div className={classes.paginationPanel}>
            <div className={classes.countPerPage}>
              <Select
                value={Number(countPerPage)}
                label='Words per page'
                onChange={event => this.handleOnChangeSelect(event, 'countPerPage')}
              >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={20}>20</MenuItem>
                <MenuItem value={50}>50</MenuItem>
                <MenuItem value={100}>100</MenuItem>
              </Select>
            </div>
            <Pagination
              pageNumber={pagination}
              maxPageCount={Math.ceil(wordsCount/countPerPage)}
              onChangePage={this.handleOnChangePage}
            />
          </div>
        </div>
      </main>
    );
  }
}

export default WordsList;
