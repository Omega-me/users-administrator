import React from 'react';
import { Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

import s from './layout.module.css';

interface LayoutProps {
  isForm?: boolean | null;
}
const Layout: React.FC<LayoutProps> = ({ children, isForm }) => {
  const navigate = useNavigate();

  const handleAddNew = () => {
    navigate('/new', {
      state: {
        isForm: true,
      },
    });
  };

  return (
    <div className={s.layout}>
      <div className={s.layout__container}>
        <Link to="/" state={{ isForm: false }}>
          <h1 className={s.layout__title}>Dashboard</h1>
        </Link>
        <div className={s.layout__table}>
          <div className={s.layout__tablemode}>
            <h3>{isForm ? 'Form' : 'Users list'}</h3>
            {!isForm && (
              <Button onClick={handleAddNew} variant="primary">
                Add new
              </Button>
            )}
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
