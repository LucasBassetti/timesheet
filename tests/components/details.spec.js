import React from 'react';
import { describe, it } from 'mocha';
import chai, { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Details } from '../../app/js/components';
import { details } from '../data';

chai.should();
chai.use(sinonChai);

describe('Details', () => {
  const wrapper = shallow(
    <Details
      details={details}
      putWeek={() => {}}
    />,
  );

  it('should render', () => {
    expect(wrapper.find(Details)).to.exist;
  });

  it('should render the approve/reject buttons', () => {
    expect(wrapper.find('.buttons')).to.exist;
  });

  it('should call handleClick with click in approve button', () => {
    const stubedMethod = sinon.stub(wrapper.instance(), 'handleClick');
    wrapper.find('.approve').props().onClick();
    expect(stubedMethod).to.have.been.calledOnce;
    expect(stubedMethod).to.have.been.calledWith('approved');
    stubedMethod.restore();
  });

  it('should call handleClick with click in reject button', () => {
    const stubedMethod = sinon.stub(wrapper.instance(), 'handleClick');
    wrapper.find('.reject').props().onClick();
    expect(stubedMethod).to.have.been.calledOnce;
    expect(stubedMethod).to.have.been.calledWith('rejected');
    stubedMethod.restore();
  });
});
