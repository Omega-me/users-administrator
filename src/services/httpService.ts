import axios from 'axios';
export default axios.create({
  baseURL: `${process.env.REACT_APP_USERS}`,
  headers: {
    'Content-type': 'application/json',
  },
});
