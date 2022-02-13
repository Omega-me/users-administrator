/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { User } from 'src/interfaces/User';
import s from './newandeditpage.module.css';
import { useAppDispatch, useAppSelector } from 'src/global/store';
import { createUser, updateUser } from 'src/global/slices/usersSlice';

const NewAndEditPage: React.FC = () => {
  const { users } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { userId } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleUpdate = (userId: number, data: any) => {
    const userData: any = {
      id: Number(userId),
      data: {
        name: data.name,
        email: data.email,
        username: data.username,
        address: {
          city: data.city,
        },
      },
    };
    dispatch(updateUser(userData));
  };

  const handleCreate = (data: any) => {
    const userData: any = {
      id: Number(users.length) + 1,
      name: data.name,
      email: data.email,
      username: data.username,
      address: {
        city: data.city,
      },
    };
    dispatch(createUser(userData));
  };

  const handleGoBack = (type: string) => {
    switch (type) {
      case 'NORMAL':
        return navigate('/');
        break;
      case 'AFTERUPDATE':
        return navigate('/', {
          state: {
            time: 2500,
            headingMessage: 'User updated',
            message: `${users[Number(userId)].name} succesfully updated`,
            variant: 'primary',
          },
        });
        break;
      case 'AFTERINSERT':
        return navigate('/', {
          state: {
            time: 2500,
            headingMessage: 'User created',
            message: 'Succesfuly created user',
            variant: 'success',
          },
        });
        break;
      default:
        return navigate('/');
        break;
    }
  };

  const onSubmit = handleSubmit((data) => {
    userId
      ? handleUpdate(Number(userId), data as User)
      : handleCreate(data as User);

    handleGoBack(userId ? 'AFTERUPDATE' : 'AFTERINSERT');
  });

  return (
    <div>
      {userId ? (
        <>
          <Form onSubmit={onSubmit} className={s.form}>
            <Form.Group className={`mb-3 ${s.form__control}`}>
              <Form.Label className={s.form__label}>
                Name <span className={s.form__required}>*</span>
              </Form.Label>
              <div className={s.form__input}>
                <Form.Control
                  defaultValue={users[Number(userId) - 1].name}
                  className={`${s.form__input} ${
                    errors.name && s.form__erroinput
                  }`}
                  {...register('name', { required: true })}
                  type="text"
                  placeholder="name"
                />
                {errors.name && (
                  <p className={s.form__error}>Name is required!</p>
                )}
              </div>
            </Form.Group>
            <Form.Group className={`mb-3 ${s.form__control}`}>
              <Form.Label className={s.form__label}>
                Email <span className={s.form__required}>*</span>
              </Form.Label>
              <div className={s.form__input}>
                <Form.Control
                  defaultValue={users[Number(userId) - 1].email}
                  className={`${s.form__input} ${
                    errors.email && s.form__erroinput
                  }`}
                  {...register('email', { required: true })}
                  type="email"
                  placeholder="name@example.com"
                />
                {errors.email && (
                  <p className={s.form__error}>Email is required!</p>
                )}
              </div>
            </Form.Group>
            <Form.Group className={`mb-3 ${s.form__control}`}>
              <Form.Label className={s.form__label}>Username</Form.Label>
              <Form.Control
                defaultValue={users[Number(userId) - 1].username}
                {...register('username')}
                type="text"
                placeholder="username"
              />
            </Form.Group>
            <Form.Group className={`mb-3 ${s.form__control}`}>
              <Form.Label className={s.form__label}>City</Form.Label>
              <Form.Control
                defaultValue={users[Number(userId) - 1].address.city}
                {...register('city')}
                type="text"
                placeholder="city"
              />
            </Form.Group>
            <Form.Group className={`mb-3 ${s.form__control}`}>
              <Form.Label className={s.form__label}></Form.Label>
              <div className={s.form__btn}>
                <Button
                  onClick={() => handleGoBack('NORMAL')}
                  variant="secondary"
                >
                  Go back
                </Button>
                <Button type="submit" variant="warning">
                  Update
                </Button>
              </div>
            </Form.Group>
          </Form>
        </>
      ) : (
        <>
          <Form onSubmit={onSubmit} className={s.form}>
            <Form.Group className={`mb-3 ${s.form__control}`}>
              <Form.Label className={s.form__label}>
                Name <span className={s.form__required}>*</span>
              </Form.Label>
              <div className={s.form__input}>
                <Form.Control
                  className={`${s.form__input} ${
                    errors.name && s.form__erroinput
                  }`}
                  {...register('name', { required: true })}
                  type="text"
                  placeholder="name"
                />
                {errors.email && (
                  <p className={s.form__error}>Name is required!</p>
                )}
              </div>
            </Form.Group>
            <Form.Group className={`mb-3 ${s.form__control}`}>
              <Form.Label className={s.form__label}>
                Email <span className={s.form__required}>*</span>
              </Form.Label>
              <div className={s.form__input}>
                <Form.Control
                  className={`${s.form__input} ${
                    errors.name && s.form__erroinput
                  }`}
                  {...register('email', { required: true })}
                  type="email"
                  placeholder="name@example.com"
                />
                {errors.email && (
                  <p className={s.form__error}>Email is required!</p>
                )}
              </div>
            </Form.Group>
            <Form.Group className={`mb-3 ${s.form__control}`}>
              <Form.Label className={s.form__label}>Username</Form.Label>
              <Form.Control
                {...register('username')}
                type="text"
                placeholder="username"
              />
            </Form.Group>
            <Form.Group className={`mb-3 ${s.form__control}`}>
              <Form.Label className={s.form__label}>City</Form.Label>
              <Form.Control
                {...register('city')}
                type="text"
                placeholder="city"
              />
            </Form.Group>
            <Form.Group className={`mb-3 ${s.form__control}`}>
              <Form.Label className={s.form__label}></Form.Label>
              <div className={s.form__btn}>
                <Button
                  onClick={() => handleGoBack('NORMAL')}
                  variant="secondary"
                >
                  Go back
                </Button>
                <Button type="submit" variant="success">
                  Create
                </Button>
              </div>
            </Form.Group>
          </Form>
        </>
      )}
    </div>
  );
};

export default NewAndEditPage;
