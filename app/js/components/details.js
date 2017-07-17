import moment from 'moment';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import TimeInput from './time_input';

class Details extends Component {
  constructor() {
    super();

    this.state = {
      hours: 0,
      minutes: 0,
      loading: {},
      status: undefined,
    };

    // this.onHoursChange = this.onHoursChange.bind(this);
    // this.onMinutesChange = this.onMinutesChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { details } = nextProps;
    const { hours = 0, minutes = 0 } = details;

    this.setState({ hours, minutes });
  }

  // onHoursChange(h) {
  //   const hours = h > 12 || h < 0 ? 12 : h;
  //   this.setState({ hours });
  // }
  //
  // onMinutesChange(m) {
  //   const minutes = m > 59 || m < 0 ? 59 : m;
  //   this.setState({ minutes });
  // }

  handleClick(status) {
    const { details } = this.props;
    const { user, weekId } = details;
    const { loading } = this.state;
    loading[status] = true;

    this.setState({ loading }, () => {
      this.props.putWeek({ weekId, user, status }, (week) => {
        loading[status] = false;
        this.setState({ loading, status }, () => {
          details.week = week;
          this.props.setDetails(details);
          setTimeout(() => {
            this.setState({ status: undefined });
          }, 1000);
        });
      });
    });
  }

  render() {
    const { details } = this.props;
    const { formatedDate } = details;
    const { loading, status } = this.state;
    const hasDetails = Object.keys(details).length > 0;
    const disabled = loading.approved || loading.rejected;
    let approveDate;
    let detailStatus;

    if (details.week) {
      approveDate = moment(details.week.approved_by_date).format('MMMM Do YYYY, h:mm:ss a');
      detailStatus = `${details.week.status} on ${approveDate}`;
    }

    if (!hasDetails) {
      return <div className="details" />;
    }

    if (!details.isUserApproved) {
      return (
        <div className="details">
          <p className="format-date">
            {formatedDate}
            <span className="status">
              {detailStatus}
            </span>
          </p>
          <p className="no-approved">
            You are not able to approve/reject this week
          </p>
        </div>
      );
    }

    return (
      <div className="details">
        <p className="format-date">
          {formatedDate}
          <span className="status">
            {detailStatus}
          </span>
          <span className={`result ${status ? 'opened' : ''}`}>
            {status}!
          </span>
        </p>
        {/* <div className="time">
          <TimeInput
            value={hours}
            min="0"
            max="12"
            onValueChange={this.onHoursChange}
          />
          <span className="hours">H</span>
          <TimeInput
            value={minutes}
            min="0"
            max="59"
            onValueChange={this.onMinutesChange}
          />
          <span className="minutes">min</span>
        </div> */}
        <div className="buttons">
          <button
            className="button approve"
            disabled={disabled}
            onClick={() => this.handleClick('approved')}
          >
            { loading.approved ? '...' : 'APPROVE' }
          </button>
          <button
            className="button reject"
            disabled={disabled}
            onClick={() => this.handleClick('rejected')}
          >
            { loading.rejected ? '...' : 'REJECT' }
          </button>
        </div>
      </div>
    );
  }
}

Details.propTypes = {
  details: PropTypes.object.isRequired,
  putWeek: PropTypes.func.isRequired,
  setDetails: PropTypes.func.isRequired,
};

export default Details;
