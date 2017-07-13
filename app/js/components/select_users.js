import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SelectUsers extends Component {
  constructor() {
    super();

    this.state = {
      selectedUser: undefined,
    };
  }

  selectUser(selectedUser) {
    this.setState({ selectedUser }, () => {
      this.props.selectUser(selectedUser);
    });
  }

  renderUserOption(user) {
    const { id, username } = user;

    return (
      <option
        className="user"
        key={id}
        value={id}
      >
        {username}
      </option>
    );
  }

  render() {
    const { users } = this.props;

    return (
      <select
        id="users"
        className="users"
        defaultValue=""
        onChange={e => this.selectUser(Number(e.target.value))}
      >
        <option value="" disabled>Select user</option>
        {_.map(users, this.renderUserOption)}
      </select>
    );
  }
}

SelectUsers.propTypes = {
  users: PropTypes.array.isRequired,
  selectUser: PropTypes.func.isRequired,
};

export default SelectUsers;
