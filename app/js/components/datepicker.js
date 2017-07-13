import moment from 'moment';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DayPicker from 'react-day-picker';

class DatePicker extends Component {
  constructor() {
    super();

    this.state = {
      disabled: true,
      selectedUser: undefined,
      selectedMonth: moment().month() + 1,
      selectedYear: moment().year(),
      dates: undefined,
      times: {},
    };

    this.handleDayClick = this.handleDayClick.bind(this);
    this.handleMonthChange = this.handleMonthChange.bind(this);
    this.renderTime = this.renderTime.bind(this);
    this.renderDay = this.renderDay.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { weeks, selectedUser } = nextProps;
    const { selectedMonth, selectedYear } = this.state;
    const times = {};
    const approvers = {};

    if (this.state.selectedUser !== selectedUser) {
      this.setState({ selectedUser, dates: undefined, disabled: true }, () => {
        this.props.setDetails({});
        this.props.fetchWeeks({ selectedUser, selectedMonth, selectedYear });
      });
    } else {
      for (let i = 0, len = weeks.length; i < len; i += 1) {
        approvers[weeks[i].week_number] = {
          users: weeks[i].approvers,
          days: weeks[i].days_in_week.map((day) => {
            const { hours, minutes } = day;
            times[day.day_number] = [{
              hours,
              minutes,
              week: weeks[i].week_number,
              status: weeks[i].status,
            }];
            return day.day_number;
          }),
        };
      }
      this.setState({ disabled: true }, () => {
        this.setState({ times, approvers, disabled: false });
      });
    }
  }

  handleDayClick(day) {
    const { weeks, selectedUser } = this.props;
    const { disabled, approvers } = this.state;

    if (disabled) return;

    const date = moment(day).isoWeekday(1);
    const dayOfMonth = date.date();
    const weekNumber = date.week();
    const firstDayOfWeek = date.startOf('week').add(1, 'day').format('MMM Do');
    const endDayOfWeek = date.endOf('week').add(1, 'day').format('MMM Do');
    const selectedWeek = weeks.filter(w => w.week_number === weekNumber);
    const details = {
      user: selectedUser,
      day: dayOfMonth,
      formatedDate: `${firstDayOfWeek} to ${endDayOfWeek}`,
    };

    if (approvers[weekNumber]) {
      const isUserApproved = approvers[weekNumber].users.indexOf(selectedUser) >= 0;
      details.isUserApproved = isUserApproved;
    }

    if (selectedWeek.length > 0) {
      const selectedDay = selectedWeek[0].days_in_week.filter(d => d.day_number === dayOfMonth);
      details.weekId = selectedWeek[0].week_id;

      if (selectedDay.length > 0) {
        details.hours = selectedDay[0].hours;
        details.minutes = selectedDay[0].minutes;
      }
    }

    const dates = [];

    for (let i = 1; i < 8; i += 1) {
      const weekDay = moment(day).weekday(i);
      dates.push(new Date(weekDay));
    }

    this.props.setDetails(details);
    this.setState({ dates });
  }

  handleMonthChange(month) {
    const { selectedUser } = this.state;
    const date = moment(month);
    const selectedMonth = date.month() + 1;
    const selectedYear = date.year();

    this.setState({ disabled: true, selectedMonth, selectedYear }, () => {
      this.props.fetchWeeks({ selectedUser, selectedYear, selectedMonth });
    });
  }

  renderTime(time, index) {
    return (
      <div key={index} className={time.status}>
        {time.hours}h
      </div>
    );
  }

  renderDay(day) {
    const { times } = this.state;
    const dayOfMonth = day.getDate();
    const week = moment(day).isoWeekday(1).week();

    return (
      <div>
        {dayOfMonth}
        {
          times[dayOfMonth] &&
          <div className="time">
            {
              times[dayOfMonth].map((time, i) => time.week === week ?
                this.renderTime(time, i) : null)
            }
          </div>
        }
      </div>
    );
  }

  render() {
    const { disabled, dates } = this.state;
    const disabledDays = disabled ? [{
      daysOfWeek: [0, 1, 2, 3, 4, 5, 6],
    }] : [];
    const fromMonth = disabled ? new Date() : new Date(2017, 0);
    const toMonth = disabled ? new Date() : new Date(2017, 11);

    return (
      <div className="datepicker">
        <DayPicker
          enableOutsideDays
          firstDayOfWeek={1}
          selectedDays={dates}
          disabledDays={disabledDays}
          onDayClick={this.handleDayClick}
          onMonthChange={this.handleMonthChange}
          renderDay={this.renderDay}
          fromMonth={fromMonth}
          toMonth={toMonth}
        />
      </div>
    );
  }
}

DatePicker.propTypes = {
  fetchWeeks: PropTypes.func.isRequired,
  selectedUser: PropTypes.number.isRequired,
  setDetails: PropTypes.func.isRequired,
  weeks: PropTypes.array.isRequired,
};

export default DatePicker;
