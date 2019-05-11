import React from 'react';
import { shallow } from 'enzyme';
import Header from '../../components/Header';

let wrapper;

beforeEach(() => {
  wrapper = shallow(<Header isLoggedIn={false} />);
});

test('Should render Header correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('Should handle toggle', () => {
  wrapper.find('NavbarToggler').simulate('click');
  expect(wrapper.state('isOpen')).toBe(true);
});

test('Should render Header with AppNav content', () => {
  wrapper.setProps({ isLoggedIn: true });
  expect(wrapper).toMatchSnapshot();
});