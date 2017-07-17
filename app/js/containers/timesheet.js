import moment from 'moment';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchUsers } from '../actions/users';
import { fetchWeeks, putWeek } from '../actions/weeks';
import { setDetails } from '../actions/details';
import { Loading, DatePicker, Details, SelectUsers } from '../components';

class Timesheet extends Component {
  constructor() {
    super();

    this.state = {
      selectedUser: -1,
      selectedMonth: moment().month() + 1,
      selectedYear: moment().year(),
    };

    this.selectUser = this.selectUser.bind(this);
  }

  componentWillMount() {
    this.props.fetchUsers();
  }

  selectUser(selectedUser) {
    this.setState({ selectedUser });
  }

  render() {
    const { details, users, weeks } = this.props;
    const { selectedUser } = this.state;

    if (users.length === 0) {
      return (
        <div className="timesheet">
          <Loading />
        </div>
      );
    }

    return (
      <div className="timesheet">
        <SelectUsers
          users={users}
          selectUser={this.selectUser}
        />
        <DatePicker
          weeks={weeks}
          selectedUser={selectedUser}
          fetchWeeks={this.props.fetchWeeks}
          setDetails={this.props.setDetails}
        />
        <Details
          details={details}
          putWeek={this.props.putWeek}
          setDetails={this.props.setDetails}
        />
      </div>
    );
  }
}

Timesheet.propTypes = {
  details: PropTypes.object.isRequired,
  fetchUsers: PropTypes.func.isRequired,
  fetchWeeks: PropTypes.func.isRequired,
  putWeek: PropTypes.func.isRequired,
  setDetails: PropTypes.func.isRequired,
  users: PropTypes.array.isRequired,
  weeks: PropTypes.array.isRequired,
};

function mapStateToProps({ details, users, weeks }) {
  return { details, users, weeks };
}

export default connect(mapStateToProps, {
  fetchUsers,
  fetchWeeks,
  putWeek,
  setDetails,
})(Timesheet);
