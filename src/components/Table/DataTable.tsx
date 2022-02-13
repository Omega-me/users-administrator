import React from 'react';
import { Button, ButtonGroup, Spinner, Table } from 'react-bootstrap';
import {
  getSortedUsersAsc,
  getSortedUsersDesc,
} from 'src/global/slices/usersSlice';
import { useAppDispatch, useAppSelector } from 'src/global/store';
import { User } from 'src/interfaces/User';
import AlertMessage from '../Alert/AlertMessage';
import DataRow from './datarow/DataRow';

import s from './table.module.css';

const DataTable: React.FC = () => {
  const usersData: User[] = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();

  const handleSorting = (sortType: string) => {
    if (sortType === 'ASC') {
      dispatch(getSortedUsersAsc());
    }
    if (sortType === 'DESC') {
      dispatch(getSortedUsersDesc());
    }
  };

  return (
    <div>
      <AlertMessage />
      <div className={s.lodaing}>
        {usersData.length === 0 && (
          <>
            <Spinner animation="grow" variant="primary" />
            <Spinner animation="grow" variant="success" />
            <Spinner animation="grow" variant="danger" />
            <Spinner animation="grow" variant="warning" />
          </>
        )}
      </div>
      {usersData && usersData.length > 0 && (
        <>
          <ButtonGroup className={s.sortButtons} aria-label="Basic example">
            <Button onClick={() => handleSorting('ASC')} variant="secondary">
              Username A-Z
            </Button>
            <Button onClick={() => handleSorting('DESC')} variant="secondary">
              Username Z-A
            </Button>
          </ButtonGroup>
          <Table responsive bordered hover striped>
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Username</th>
                <th>Email</th>
                <th>City</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {usersData.map((user: User) => (
                <DataRow
                  key={user.id}
                  name={user.name}
                  id={user.id}
                  username={user.username !== undefined ? user.username : ''}
                  email={user.email}
                  city={
                    user.address.city !== undefined ? user.address.city : ''
                  }
                />
              ))}
            </tbody>
          </Table>
        </>
      )}
    </div>
  );
};

export default DataTable;
