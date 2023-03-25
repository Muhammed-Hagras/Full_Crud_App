import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = { records: [], loading: false, error: null };

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await fetch("http://localhost:3004/posts");
      const data = await res.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deletePosts = createAsyncThunk(
  "posts/deletePosts",
  async(id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        await fetch(`http://localhost:3004/posts/${id}`, {
        method: "DELETE"
      });

      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
    }
)

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: {
    //fetch posts
    [fetchPosts.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.loading = false;
      state.records = action.payload;
    },
    [fetchPosts.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    //create post

    //delete post
    [deletePosts.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
      console.log(action)
    },
    [deletePosts.fulfilled]: (state, action) => {
      state.loading = false;
      state.records = state.records.filter((el)=> el.id !== action.payliad)
      console.log(action)
    },
    [deletePosts.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      console.log(action)
    },
    //edit post
  },
});

export default postSlice.reducer;
