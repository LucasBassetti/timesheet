import React from 'react';
import { describe, it } from 'mocha';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Timesheet from '../../app/js/containers/timesheet';
import { DatePicker, Details, SelectUsers } from '../../app/js/components';
import { details, users, weeks } from '../data';

const mockStore = configureStore();

const store = mockStore({
  details,
  users,
  weeks,
});

describe('Timesheet', () => {
  const wrapper = mount(
    <Provider store={store}>
      <Timesheet />
    </Provider>,
  );

  it('should render', () => {
    expect(wrapper.find(Timesheet)).to.exist;
  });

  it('should render SelectUsers', () => {
    expect(wrapper.find(SelectUsers).length).to.be.equal(1);
  });

  it('should render DatePicker', () => {
    expect(wrapper.find(DatePicker).length).to.be.equal(1);
  });

  it('should render Details', () => {
    expect(wrapper.find(Details).length).to.be.equal(1);
  });
});
