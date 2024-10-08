import {
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import Cookies from 'universal-cookie';
import {
  API_CHANGE_PASSWORD,
  API_FORGOT_PASSWORD,
  API_LOGIN,
  API_REGISTER,
} from '../api/configAPI';
import { notificationActions } from './notification-slice';
import axios from 'axios';

const cookies = new Cookies();
const token_id = '1234_qwe_3435_jkier_hello';

const retrieveStoredToken = () => {
  const storedToken = cookies.get(token_id);
  return {
    token: storedToken,
  };
};

const retrieveStoredRole = () => {
  const storedRole = localStorage.getItem('role');
  return {
    role: storedRole,
  };
};

const tokenData = retrieveStoredToken();
const roleData = retrieveStoredRole();

let initialToken, initialRole;

if (tokenData.token) {
  initialToken = tokenData.token;
}

if (roleData.role) {
  initialRole = roleData.role;
}

let initialState = {
  user_token: initialToken,
  isLoggedIn: !!initialToken,
  email: '',
  number: '',
  isMoshaver: initialRole
    ? initialRole === 2
    : null,
};

export const registerUser = createAsyncThunk(
  'auth/login',
  async ({ data, cb }, { dispatch }) => {
    try {
      const response = await axios.post(
        API_REGISTER,
        data,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      dispatch(
        notificationActions.changeSuccess({
          exist: true,
          message:
            'ساختن اکانت با موافقیت انجام شد دوست من.',
        }),
      );
      cb();

      return response.data;
    } catch (error) {
      dispatch(
        notificationActions.changeError({
          exist: true,
          message:
            'ساختن اکانت با مشکل مواجه شد دوست من.',
        }),
      );
      throw Error('error');
    }
  },
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ data, cb }, { dispatch }) => {
    console.log('@#@#', data);
    try {
      const response = await axios.post(
        API_LOGIN,
        JSON.stringify(data),
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      const result = await response.data;

      dispatch(authActions.loginHandler(result));

      dispatch(
        notificationActions.changeSuccess({
          exist: true,
          message: 'خوش آمدی دوست من.',
        }),
      );
      cb();
    } catch (error) {
      dispatch(
        notificationActions.changeError({
          exist: true,
          message:
            'ایمیل با پسورد سازگار نیست دوست من.',
        }),
      );
    }
  },
);

export const forgetPassword = createAsyncThunk(
  'auth/forgetPassword',
  async ({ email, cb }, { dispatch }) => {
    console.log(email);
    try {
      const response = await axios.post(
        API_FORGOT_PASSWORD,
        { email },
        {
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      const { random_number } =
        await response.data;

      let number = random_number.split('');

      dispatch(authActions.setNumber(number));

      dispatch(
        notificationActions.changeSuccess({
          exist: true,
          message: 'ایمیل فراموشی رمز فرستاده شد',
        }),
      );
      cb();
    } catch (error) {
      const statusCode = error.response.status;

      if (statusCode === 400) {
        dispatch(
          notificationActions.changeError({
            exist: true,
            message:
              'کاربری با همچین ایمیلی وجود ندارد',
          }),
        );
      } else {
        dispatch(
          notificationActions.changeError({
            exist: true,
            message: 'مشکلی در ارسال ایمیل است',
          }),
        );
      }
    }
  },
);

export const changePassword = createAsyncThunk(
  'auth/changePassword',
  async (
    { email, cb, password, password2 },
    { dispatch },
  ) => {
    try {
      const response = await axios.patch(
        API_CHANGE_PASSWORD,
        { email, password, password2 },
        {
          method: 'PATCH',
        },
      );

      dispatch(
        notificationActions.changeSuccess({
          exist: true,
          message: 'گذرواژه با موفقیت تغییر کرد.',
        }),
      );
      cb();
    } catch (error) {
      const statusCode = error.response.status;

      if (statusCode === 400) {
        dispatch(
          notificationActions.changeError({
            exist: true,
            message: 'عدد نادرست است، دوست من',
          }),
        );
      } else {
        dispatch(
          notificationActions.changeError({
            exist: true,
            message:
              'مشکلی در تغییر گذرواژه پیش آمده است',
          }),
        );
      }
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setEmail(state, action) {
      state.email = action.payload;
    },
    setNumber(state, action) {
      state.number = action.payload;
    },
    logoutHandler(state) {
      state.isLoggedIn = false;
      state.user_token = null;
      cookies.remove(token_id);
      localStorage.removeItem('role');
    },
    loginHandler(state, action) {
      // need to check user is moshaver or not
      const data = action.payload;
      const { token: user_token, role } = data;
      state.user_token = user_token;
      state.isLoggedIn = true;
      state.isMoshaver = role === 2;
      const nextYear = new Date(
        new Date().setFullYear(
          new Date().getFullYear() + 1,
        ),
      );
      localStorage.setItem(
        'role',
        role.toString(),
      );
      cookies.set(
        token_id,
        user_token.toString(),
        {
          path: '/',
          expires: nextYear,
        },
      );
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
