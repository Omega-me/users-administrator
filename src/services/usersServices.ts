import { User } from 'src/interfaces/User';
import http from './httpService';

const getAll = () => {
  return http.get('/');
};

const create = (data: User) => {
  return http.post('/', data);
};

const update = (id: string, data: User) => {
  return http.patch(`/${id}`, data);
};

const remove = (id: string) => {
  return http.delete(`/${id}`);
};

const TutorialService = {
  getAll,
  create,
  update,
  remove,
};
export default TutorialService;
