
import AuthApi from "@/app/api/api/serverApi";
import { authData } from "@/app/types";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState: authData = {
  auth: false,
  status: null,
  message: "",
  loading: false,
  error: null,
  tocken : "",
};

export const authSlice = createAsyncThunk(
  "auth/login",
  async (data: { userName: string; password: string }, thunkApi) => {

    const request = {
      userName: data.userName,
      password: data.password,
    };
    
    console.log("data", request);

    try {
      const axiosData = await AuthApi.login(request)
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
        state.message = action.payload?.message ?? "";
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