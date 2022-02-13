import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { deleteUser } from 'src/global/slices/usersSlice';
import { useAppDispatch } from 'src/global/store';

import s from './dataRow.module.css';

interface DataRowProps {
  id: number;
  name: string;
  username: string;
  email: string;
  city: string;
}
const DataRow: React.FC<DataRowProps> = ({
  id,
  name,
  username,
  email,
  city,
}) => {
  const [modalShow, setModalShow] = React.useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleDelete = () => {
    setModalShow(true);
  };

  const onDeleteUser = () => {
    dispatch(deleteUser(Number(id)));
    setModalShow(false);
    location.state = {
      time: 2500,
      headingMessage: 'User deleted',
      message: 'succesfully deleted user',
      variant: 'danger',
      active: true,
    };
  };

  const handleEdit = () => {
    navigate(`/edit/${id}`);
  };
  return (
    <tr>
      <td>{id}</td>
      <td>{name}</td>
      <td>{username}</td>
      <td>{email}</td>
      <td>{city}</td>
      <td className={s.btn__data}>
        <Button onClick={handleEdit} variant="warning">
          Edit
        </Button>
      </td>
      <td className={s.btn__data}>
        <Button onClick={handleDelete} variant="danger">
          Delete
        </Button>
        <DeleteUserConfirm
          show={modalShow}
          onHide={() => setModalShow(false)}
          onDelete={() => onDeleteUser()}
        />
      </td>
    </tr>
  );
};

export default DataRow;

interface DeleteUserConfirmProps {
  show: boolean;
  onHide: () => void;
  onDelete: () => void;
}
const DeleteUserConfirm: React.FC<DeleteUserConfirmProps> = (props) => {
  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Delete</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          You are removing this user and this action cannot be undone, <br></br>
          Are you sure you want to do remove it?
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          Cancle
        </Button>
        <Button variant="danger" onClick={props.onDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
