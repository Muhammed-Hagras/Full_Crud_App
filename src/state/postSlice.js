import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = { records: [], loading: false, error: null, recordInfo: null };

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
  async(data, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        await fetch(`http://localhost:3004/posts/${data}`, {
        method: "DELETE"
      });

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
    }
)

export const insertPosts = createAsyncThunk(
  "posts/insertPosts",
  async(item, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    const { auth } = getState();
    item.userId = auth.id;
    try {
        const res = await fetch("http://localhost:3004/posts", {
        method: "POST",
        body: JSON.stringify(item),
        headers: { "Content-Type": "application/json; charset=UTF-8",}
      });
      const data = await res.json()
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
    }
)

export const getPost = createAsyncThunk(
  "posts/getPost",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await fetch(`http://localhost:3004/posts/${id}`);
      const data = await res.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


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
    //get Post
    [getPost.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getPost.fulfilled]: (state, action) => {
      state.loading = false;
      state.record = action.payload;
    },
    [getPost.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    //create post
    [insertPosts.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    [insertPosts.fulfilled]: (state, action) => {
      state.loading = false;
      state.records.push(action.payload);
    },
    [insertPosts.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    //delete post
    [deletePosts.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    [deletePosts.fulfilled]: (state, action) => {
      state.loading = false;
      state.records = state.records.filter((el)=> el.id !== action.payload)
    },
    [deletePosts.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    //edit post
  },
});

export default postSlice.reducer;
