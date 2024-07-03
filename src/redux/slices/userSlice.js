import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchUser = createAsyncThunk(
	'user/fetchUser',
	async ({ login, password }) => {
		try {
			const response = await axios.post('/login', { login, password });
			if (response.data.error) {
				throw response.data.error;
			}
			sessionStorage.setItem('userData', JSON.stringify(response.data.user));
			return response.data.user;
		} catch (error) {
			return initialState;
		}
	}
);

export const registerUser = createAsyncThunk(
	'user/registerUser',
	async ({ login, password }) => {
		try {
			const response = await axios.post('/register', { login, password });
			if (response.data.error) {
				throw response.data.error;
			}
			sessionStorage.setItem('userData', JSON.stringify(response.data.user));
			return response.data.user;
		} catch (error) {
			return initialState;
		}
	}
);

export const patchUser = createAsyncThunk('user/patchUser', async (data) => {
	try {
		const response = await axios.patch('/patchUser', data);
		if (response.data.error) {
			throw response.data.error;
		}
		sessionStorage.setItem('userData', JSON.stringify(response.data.user));
		return response.data.user;
	} catch (error) {
		return initialState;
	}
});

const initialState = {
	user: {
		id: null,
		login: null,
		roleId: 3
	}
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		logoutUser(state) {
			axios.post('/logout');
			state.user = initialState;
			sessionStorage.setItem('userData', JSON.stringify(initialState));
		}
	},
	extraReducers: (builder) => {
		builder.addCase(fetchUser.fulfilled, (state, action) => {
			state.user = action.payload;
		});

		builder.addCase(registerUser.fulfilled, (state, action) => {
			state.user = action.payload;
		});

		builder.addCase(patchUser.fulfilled, (state, action) => {
			state.user = action.payload;
		});

		builder.addCase('updateUserFromSessionStorage', (state, action) => {
			const userData = sessionStorage.getItem('userData');
			if (userData) {
				state.user = JSON.parse(userData);
			}
		});
	}
});

export const { logoutUser } = userSlice.actions;

export default userSlice.reducer;
