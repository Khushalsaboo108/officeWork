import { authData } from "@/app/types";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState: authData = {
  auth: false,
  status: null,
  message: "",
  loading: false,
  error: null,
};

export const authSlice = createAsyncThunk(
  "auth/login",
  async (data: { auth_userName: string; auth_password: string }, thunkApi) => {
    const request = {
      auth_userName: data.auth_userName,
      auth_password: data.auth_password,
    };
    console.log("data", request);

    try {
      const axiosData = axios.post("http://localhost:7000/authCheck", request);

      console.log("axiosData", axiosData);
      return thunkApi.fulfillWithValue({ ...axiosData, ...data });

    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

const loginSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuth: (state) => initialState,
    //   logOut: (state) => {
    //     state.auth = false;
    //     state.editor = "N";
    //     state.publisher = "N";
    //     state.username = "";
    //     state.status = null;
    //     state.statusMessage = "";
    //   },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authSlice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(authSlice.fulfilled, (state, action) => {
        state.loading = false;
        state.status = action.payload?.status ?? null;
        // state.message = (action.payload as ServerResponse)?.message ?? "";
        if (action.payload?.status === 0) {
          state.auth = true;
        } else {
          state.auth = false;
        }
      })
      .addCase(authSlice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.auth = false;
      });
  },
});


export const { clearAuth } = loginSlice.actions;
export default loginSlice.reducer;