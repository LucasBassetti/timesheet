import React from 'react';
import { describe, it } from 'mocha';
import chai, { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { SelectUsers } from '../../app/js/components';
import { users } from '../data';

chai.should();
chai.use(sinonChai);

describe('SelectUsers', () => {
  const wrapper = shallow(
    <SelectUsers
      users={users}
      selectUser={() => {}}
    />,
  );

  it('should render', () => {
    expect(wrapper.find(SelectUsers)).to.exist;
  });

  it('should render a select element', () => {
    expect(wrapper.find('select')).to.exist;
  });

  it('should render 3 options', () => {
    expect(wrapper.find('option').length).to.be.equal(3);
  });

  it('should select the first user', () => {
    wrapper.instance().selectUser(1);
    expect(wrapper.instance().state.selectedUser).to.be.equal(1);
  });

  it('should select the second user via onChange method', () => {
    wrapper.find('select').props().onChange({
      target: { value: 2 },
    });
    expect(wrapper.instance().state.selectedUser).to.be.equal(2);
  });

  it('should call selectUser method', () => {
    const stubedMethod = sinon.stub(wrapper.instance(), 'selectUser');
    wrapper.find('select').props().onChange({
      target: { value: 1 },
    });
    expect(stubedMethod).to.have.been.calledOnce;
    stubedMethod.restore();
  });
});
