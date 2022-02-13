/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { User } from 'src/interfaces/User';
import httpActions from 'src/services/usersServices';

const initialState: User[] = [];

export const createUser = createAsyncThunk(
  'users/create',
  async (data: User) => {
    const res = await httpActions.create({ ...data });
    return res.data;
  }
);

export const getUsers = createAsyncThunk('users/get', async () => {
  const res = await httpActions.getAll();
  return res.data;
});

export const getSortedUsersAsc = createAsyncThunk('users/getasc', async () => {
  const res = await httpActions.getAll();
  return res.data.sort((a: any, b: any) => (a.username > b.username ? 1 : -1));
});
export const getSortedUsersDesc = createAsyncThunk(
  'users/getdesc',
  async () => {
    const res = await httpActions.getAll();
    return res.data.sort((a: any, b: any) =>
      a.username < b.username ? 1 : -1
    );
  }
);

export const updateUser = createAsyncThunk(
  'users/update',
  async ({ id, data }: { id: number; data: any }) => {
    const res = await httpActions.update(id.toString(), { ...data });
    return { id, data: res.data };
  }
);

export const deleteUser = createAsyncThunk(
  'users/delete',
  async (id: number) => {
    await httpActions.remove(id.toString());
    return { id };
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},

  extraReducers: {
    [createUser.fulfilled as any]: (state, action) => {
      state.push(action.payload);
    },
    [getUsers.fulfilled as any]: (state, action) => {
      return [...action.payload];
    },
    [getSortedUsersAsc.fulfilled as any]: (state, action) => {
      return [...action.payload];
    },
    [getSortedUsersDesc.fulfilled as any]: (state, action) => {
      return [...action.payload];
    },
    [updateUser.fulfilled as any]: (state, action) => {
      const index = state.findIndex(
        ({ id }: { id: number }) => id === action.payload.id
      );
      state[index] = action.payload.data;
    },
    [deleteUser.fulfilled as any]: (state, action) => {
      const index = state.findIndex(
        ({ id }: { id: number }) => id == action.payload.id
      );
      state.splice(index, 1);
    },
  },
});

export default usersSlice.reducer;
