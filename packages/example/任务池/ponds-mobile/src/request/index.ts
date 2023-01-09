import task from './task';
import user from './user';
import history from './history';

const Request = {
  ...task,
  ...user,
  ...history,
};

export default Request;
