import React from 'react';
import { describe, it } from 'mocha';
import chai, { expect } from 'chai';
import { mount } from 'enzyme';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import DayPicker from 'react-day-picker';
import { DatePicker } from '../../app/js/components';
import { weeks } from '../data';

chai.should();
chai.use(sinonChai);

describe('DatePicker', () => {
  const wrapper = mount(
    <DatePicker
      selectedUser={2}
      weeks={weeks}
      fetchWeeks={() => {}}
      setDetails={() => {}}
    />,
  );

  wrapper.setState({
    selectedUser: 2,
    disabled: false,
    times: {
      15: [{ hours: 0, minutes: 0, status: 'approved' }],
      16: [{ hours: 0, minutes: 0, status: 'approved' }],
    },
    dates: [
      new Date('2017-07-15 00:00:00'),
      new Date('2017-07-16 00:00:00'),
    ],
  });

  it('should render', () => {
    expect(wrapper.find(DatePicker)).to.exist;
  });

  it('should render the DayPicker', () => {
    expect(wrapper.find(DayPicker)).to.exist;
  });

  it('should render the days', () => {
    expect(wrapper.find('.DayPicker-Day').length).to.be.at.least(28);
  });

  it('should render 2 hours', () => {
    expect(wrapper.find('.time').length).to.be.equal(2);
  });

  it('should change month in onMonthChange', () => {
    const stubedMethod = sinon.stub(wrapper.instance(), 'handleMonthChange');
    wrapper.find(DayPicker).props().onMonthChange(new Date('2017-01-01 00:00:00'));
    wrapper.find(DayPicker).props().onMonthChange(new Date('2017-01-01 00:00:00'));
    expect(wrapper.instance().state.selectedMonth).to.be.equal(1);
    expect(stubedMethod).to.have.been.calledOnce;
    stubedMethod.restore();
  });
});
