import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
	const response = await axios.get('/posts');

	return response.data;
});

export const fetchPost = createAsyncThunk('posts/fetchPost', async ({ id }) => {
	const response = await axios.get(`/post/${id}`);

	return response.data;
});

export const addPost = createAsyncThunk(
	'post/addPost',
	async ({ title, content, image, price }) => {
		try {
			const response = await axios.post('/post', {
				title,
				content,
				image,
				price
			});
			if (response.data.error) {
				throw response.data.error;
			}

			return response.data;
		} catch (error) {
			return initialState;
		}
	}
);

const initialState = {
	data: []
};

const postsSlice = createSlice({
	name: 'posts',
	initialState,
	reducers: {
		deletePost(state, action) {
			const postId = action.payload.postId;
			axios.delete(`/post/${postId}`);
		}
	},
	extraReducers: (builder) => {
		builder.addCase(fetchPosts.fulfilled, (state, action) => {
			state.data = action.payload;
		});
		builder.addCase(fetchPost.fulfilled, (state, action) => {
			state.data = action.payload;
		});
		builder.addCase(addPost.fulfilled, (state, action) => {
			state.data = action.payload;
		});
	}
});

export const { deletePost } = postsSlice.actions;

export default postsSlice.reducer;
