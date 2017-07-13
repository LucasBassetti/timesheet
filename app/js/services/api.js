import axios from 'axios';

const API_URL = 'https://timesheet-staging-aurity.herokuapp.com/api';

const fetchUsers = () => axios.get(`${API_URL}/users`).then(user => user.data);

const fetchWeeks = ({ selectedUser, selectedMonth, selectedYear }) => {
  const url = `${API_URL}/training/weeks/${selectedMonth}/${selectedYear}/${selectedUser}`;
  return axios.get(url).then((result) => {
    const { weeks, year, owner_id } = result.data.data;

    const resultWeeks = weeks.map((week) => {
      week.year = year;
      week.owner_id = owner_id;
      return week;
    });

    return resultWeeks;
  });
};

const putWeek = ({ weekId, user, status }, callback) => {
  const url = `${API_URL}/training/weeks/${weekId}/users/${user}`;
  const data = new FormData();

  data.append('action', 'ADD');
  data.append('status', status);

  return axios.put(url, data).then((result) => {
    const week = result.data;

    if (callback) callback();

    return week;
  });
};

export default {
  fetchUsers,
  fetchWeeks,
  putWeek,
};
