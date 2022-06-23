import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { appService } from '../services';
import { constants } from '../config';

const { resStatus } = constants;

export const getData = createAsyncThunk(
    'appSlice/getData',
    async ({ page, sort, search }, { dispatch }) => {
        try {
            const data = await appService.getAll(page, sort, search);
            dispatch(setData({ data }));
        } catch (e) {
            alert(e.message);
        }
    }
);

export const getUserDetails = createAsyncThunk(
    'appSlice/getUserDetails',
    async ({ uid }, { dispatch }) => {
        try {
            const person = await appService.getById(uid);
            dispatch(setPerson({ person }));
        } catch (e) {
            alert(e.message);
        }
    }
);

export const createUser = createAsyncThunk(
    'appSlice/createPerson',
    async ({ data }, { dispatch }) => {
        try {
            await appService.create(data);
            dispatch(setPerson({ person: data }));
            alert(`User ${data.name} successfully created`);
        } catch (e) {
            alert(e.message);
        }
    }
);

export const updateUser = createAsyncThunk(
    'appSlice/updateUser',
    async ({ data }, { dispatch }) => {
        try {
            await appService.updateById(data.id, data);
            dispatch(setPerson({ person: data }));
            alert(`User ${data.name} successfully updated`);
        } catch (e) {
            alert(e.message);
        }
    }
);

export const deleteUser = createAsyncThunk(
    'appSlice/deleteUser',
    async ({ data }, { dispatch }) => {
        try {
            await appService.deleteById(data.id);
            dispatch(setPerson({ person: data }));
        } catch (e) {
            alert(e.message);
        }
    }
);

const appSlice = createSlice({
    name: 'appSlice',

    initialState: {
        data: null,
        status: null,
        selectedPerson: null
    },

    reducers: {
        setData: (state, action) => {
            state.data = action.payload.data;
        },

        setPerson: (state, action) => {
            state.selectedPerson = action.payload.person;
        }
    },

    extraReducers: {
        [getData.pending]: (state) => {
            state.status = resStatus.pending;
        },

        [getData.fulfilled]: (state) => {
            state.status = resStatus.fulfilled;
        },

        [getData.rejected]: (state) => {
            state.status = resStatus.reject;
        },

        [getUserDetails.pending]: (state) => {
            state.status = resStatus.pending;
        },

        [getUserDetails.fulfilled]: (state) => {
            state.status = resStatus.fulfilled;
        },

        [getUserDetails.rejected]: (state) => {
            state.status = resStatus.reject;
        }
    }
});

const appReducer = appSlice.reducer;

export default appReducer;

export const { setData, setPerson } = appSlice.actions;
