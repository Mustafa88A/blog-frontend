import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const getUser = createAsyncThunk("user/getUser", async () => {
  const token = localStorage.getItem("Token");
  console.log("usertoken", token);
  try {
    const res = await axios.get(`http://localhost:7500/user/`, {
      headers: { Authorization: `Bearer${token}` },
    });
    const data = res.data;
    // console.log("data", data);
    return data;
  } catch (error) {
    console.log(error.message);
  }

  // try {
  //   const res = await axios.get("http://localhost:7500/user");
  //   const data = res.data;
  //   return data;
  // } catch (error) {
  //   console.log(error.message);
  // }
});

export const fetchUserSingin = createAsyncThunk(
  "user/fetchUserSingin",
  async (userData) => {
    try {
      const res = await axios.post(
        "http://localhost:7500/user/login",
        userData
      );
      const data = res.data;
      console.log("singin", data);
      localStorage.setItem("Token", data.generateToken);
      const decode = jwtDecode(data.generateToken);

      return decode;
    } catch (error) {
      console.log(error.message);
    }
  }
);
export const fetchUserSignUp = createAsyncThunk(
  "user/fetchUserSignUp",
  async (userInfo) => {
    try {
      const formData = new FormData();

      formData.append("userName", userInfo.userName);
      formData.append("password", userInfo.password);
      formData.append("email", userInfo.email);
      formData.append("fullName", userInfo.fullName);
      formData.append("image", userInfo.image[0]);

      const response = await axios.post(
        "http://localhost:7500/user/signup",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const data = response.data;
      localStorage.setItem("Token", data.generateToken);
      const decode = jwtDecode(data.generateToken);

      return decode;
    } catch (error) {
      throw error;
    }
  }
);

const initialState = {
  loading: false,
  data: null,
  error: null,
  user: null,
  isLogged: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    setLogin: (state) => {
      try {
        const token = localStorage.getItem("Token");
        console.log("7777777", token);

        const decoded = jwtDecode(token);
        state.isLogged = true;
        state.data = decoded;
      } catch (error) {
        console.log(error);
      }
    },
  },
  extraReducers: (builder) => {
    //signup new  user
    builder.addCase(fetchUserSignUp.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchUserSignUp.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.isLogged = true;
    });
    builder.addCase(fetchUserSignUp.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    //login
    builder.addCase(fetchUserSingin.pending, (state, action) => {
      state.loading = true;
      state.error = null;
      state.isLogged = true;
    });
    builder.addCase(fetchUserSingin.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchUserSingin.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    // get user
    builder.addCase(getUser.pending, (state, action) => {
      state.loading = true;
      state.error = null;
      // state.isLogged = false;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = null;
    });
    builder.addCase(getUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});
export const { setLogin } = userSlice.actions;
export default userSlice.reducer;
