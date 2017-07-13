const details = {
  user: 2,
  weekId: 97,
  formatedDate: 'Jul 10th to Jul 16th',
  isUserApproved: true,
};

const users = [
  {
    username: 'User_1',
    id: 1,
    email: 'user_1@aurity.co',
  },
  {
    username: 'User_2',
    id: 2,
    email: 'user_2@aurity.co',
  },
];

const weeks = {
  data: {
    year: 2017,
    weeks: [
      {
        week_number: 28,
        week_id: 97,
        status: 'rejected',
        days_in_week: [
          {
            minutes: 0,
            id: 679,
            hours: 0,
            day_number: 16,
          },
          {
            minutes: 0,
            id: 678,
            hours: 0,
            day_number: 15,
          },
        ],
      },
    ],
  },
};

export {
  details,
  users,
  weeks,
};
