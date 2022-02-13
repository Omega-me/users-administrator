import React, { useEffect } from 'react';
import Layout from 'src/components/layout/Layout';
import DataTable from 'src/components/Table/DataTable';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useAppDispatch } from 'src/global/store';
import NewAndEditPage from 'src/pages/newandeditpage/NewAndEditPage';
import { getUsers } from 'src/global/slices/usersSlice';

function App() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const location = useLocation() as any;
  const dispatch = useAppDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch(getUsers());
    }, 1000);
  }, [dispatch]);

  return (
    <Layout isForm={location.state !== null ? location.state.isForm : false}>
      <Routes>
        <Route path="/edit/:userId" element={<NewAndEditPage />} />
        <Route path="/new" element={<NewAndEditPage />} />
        <Route path="/" element={<DataTable />} />
        <Route path="*" element={<DataTable />} />
      </Routes>
    </Layout>
  );
}

export default App;
