import React, { Component, createContext } from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';

const WordFormContext = createContext({});

const initialState = {
  form: {
    en: '',
    ru: '',
    transcription: '',
    examples: [],
  }
};

class WordFormProvider extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  state = initialState;

  handleOnFormItemChange = (event, field) => {
    const { value } = event.target;

    this.setState(prevState => ({
      ...prevState,
      form: {
        ...prevState.form,
        [field]: value
      }
    }));
  };

  handleOnExampleChange = (event, currentId) => {
    const { value } = event.target;

    this.setState(prevState => {
      const updatedExamples = [...prevState.form.examples]
        .map(item => item.id === currentId ? ({ ...item, example: value, }) : item);

      return ({
        ...prevState,
        form: {
          ...prevState.form,
          examples: updatedExamples,
        }
      });
    });
  };

  handleAddNewExample = () =>
    this.setState(prevState => ({
      ...prevState,
      form: {
        ...prevState.form,
        examples: [
          ...prevState.form.examples,
          {
            id: uuid(),
            example: ''
          }
        ]
      }
    }));



  handleRemoveExample = id =>
    this.setState(prevState => ({
      ...prevState,
      form: {
        ...prevState.form,
        examples: [...prevState.form.examples].filter(example => example.id !== id),
      }
    }));

  handleOnFormReset = () =>
    this.setState(prevState => ({
      ...prevState,
      form: {
        ...initialState.form
      }
    }));

  render() {
    const { form } = this.state;
    const { children } = this.props;

    return (
      <WordFormContext.Provider
        value={{
          form,
          onFormItemChange: this.handleOnFormItemChange,
          onExampleChange: this.handleOnExampleChange,
          onAddNewExample: this.handleAddNewExample,
          onRemoveExample: this.handleRemoveExample,
          onResetForm: this.handleOnFormReset,
        }}
      >{children}</WordFormContext.Provider>
    );
  }
}

const withWordForm = Cmp => props =>
  <WordFormContext.Consumer>{value => <Cmp {...value} {...props} />}</WordFormContext.Consumer>;

export { WordFormProvider, withWordForm };
