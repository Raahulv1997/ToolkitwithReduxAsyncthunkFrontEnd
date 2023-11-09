import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  CreateUserByAdmin,
  GetUserAPI,
  UserUpdateByID,
  deleteUserByAdmin,
} from "../../api/api";

// create action
export const CreateUser = createAsyncThunk(
  "CreateUser",
  async (data, { rejectWithValue }) => {
    let response = await CreateUserByAdmin(data);
    try {
      if (response) {
        return response;
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// read action
export const showUser = createAsyncThunk(
  "showUser",
  async (_, { rejectWithValue }) => {
    let response = await GetUserAPI();
    try {
      if (response) {
        return response;
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// delete action
export const deleteUser = createAsyncThunk(
  "deleteUser",
  async (id, { rejectWithValue }) => {
    let response = await deleteUserByAdmin(id);
    try {
      if (response) {
        return response;
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

//update action

export const UpdateUser = createAsyncThunk(
  "UpdateUser",
  async (data, { rejectWithValue }) => {
    let response = await UserUpdateByID(data);
    try {
      if (response) {
        return response;
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  users: [],
  loading: false,
  error: null,
};

const userDetails = createSlice({
  name: "userDetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(CreateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(CreateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload);
      })
      .addCase(CreateUser.rejected, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(showUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(showUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(showUser.rejected, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;

        // state.users = action.payload;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(UpdateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(UpdateUser.fulfilled, (state, action) => {
        state.loading = false;

        // state.users = action.payload;
      })
      .addCase(UpdateUser.rejected, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      });
  },
});

// export const {} = userDetails.actions; // Define any other actions if needed

export default userDetails.reducer;
