import React from 'react';
import { shallow } from 'enzyme';
import WordsList from './component';

describe('MainContainer page', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<WordsList />);
  });
  test('render', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
