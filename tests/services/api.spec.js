import { describe, it } from 'mocha';
import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import API from '../../app/js/services/api';

chai.should();
chai.use(sinonChai);

describe('API', function () {
  this.timeout(10000);

  it('should fetch users', (done) => {
    API.fetchUsers().then((users) => {
      expect(users).to.exist;
      expect(users.length).to.be.at.least(1);
      done();
    });
  });

  it('should fetch weeks', (done) => {
    API.fetchWeeks({
      selectedUser: 1,
      selectedMonth: 1,
      selectedYear: 2017,
    }).then((weeks) => {
      expect(weeks).to.exist;
      expect(weeks.length).to.be.at.least(1);
      done();
    });
  });

  it('should approve a week', (done) => {
    const cb = sinon.spy();
    API.putWeek({
      weekId: 97,
      user: 2,
      status: 'approved',
    }, cb).then((week) => {
      expect(week).to.exist;
      expect(week.status).to.be.equal('approved');
      expect(cb).to.have.been.calledOnce;
      done();
    }).catch(() => {
      done();
    });
  });
});
