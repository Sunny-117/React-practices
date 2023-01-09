import axios from 'axios';

const baseURL = 'http://localhost:3000/';

export default axios.create({
  baseURL: baseURL,
});
