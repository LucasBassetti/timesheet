import _ from 'lodash';
import React, { Component } from 'react';

class Loading extends Component {
  renderWeekdays(week, index) {
    const days = week.map((d, i) => (
      <span key={i} className="weekday" />
    ));

    return (
      <div key={index} className="week">
        {days}
      </div>
    );
  }

  renderWeek(week, index) {
    const days = week.map((d, i) => (
      <span key={i} className="day" />
    ));

    return (
      <div key={index} className="week">
        {days}
      </div>
    );
  }

  render() {
    const week = new Array(7).fill(0);
    const weekdays = [week];
    const weeks = [week, week, week, week, week, week];

    return (
      <div className="loading">
        <div className="select" />
        <div className="datepicker">
          <span className="year" />
          {_.map(weekdays, this.renderWeekdays)}
          {_.map(weeks, this.renderWeek)}
        </div>
      </div>
    );
  }
}

export default Loading;
