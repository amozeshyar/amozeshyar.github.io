import {
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import axios from 'axios';
import {
  API_CHANGE_FIELD_PROFILE,
  API_GET_CV_ID,
  // API_GET_CV_ID,
  API_GET_PROFILE,
  API_GET_USER_ID,
  API_TALENT_TESTS,
  API_UPLOAD_IMAGE_PROFILE,
  GET_CONFIG,
  PATCH_CONFIG,
  POST_CONFIG,
  POST_CONFIG_FILE,
} from '../api/configAPI';
import { notificationActions } from './notification-slice';
import { resumeActions } from './resume-slice';

const trunkDecmimal = (num) => {
  if (num < 1) {
    return num.substring(0, 4);
  } else return num;
};

const SUCCESS_MESSAGE =
  'تغییرات با موفقیت ثبت شد';

const ERROR_MESSAGE =
  'ثبت تغییرات دچار مشکل شده است';

export const getTalents = createAsyncThunk(
  'profile/getTalents',
  async (
    { user_token, testName },
    { dispatch },
  ) => {
    try {
      const response = await axios.get(
        API_TALENT_TESTS(testName),
        GET_CONFIG(user_token),
      );

      const data = await response.data;

      const validData = {
        name: testName,
        data: data[0].type,
      };

      dispatch(profileActions.addTest(validData));
    } catch (error) {}
  },
);

export const getCVId = createAsyncThunk(
  'profile/getCVId',
  async ({ user_token }, { dispatch }) => {
    try {
      const response = await axios.get(
        API_GET_CV_ID,
        {
          headers: {
            Authorization: user_token,
          },
        },
      );
      const { cv_id } = await response.data;

      dispatch(resumeActions.setCVID(cv_id));
    } catch (error) {
      console.log(error);
    }
  },
);

export const getUserId = createAsyncThunk(
  'profile/getUserId',
  async ({ user_token }, { dispatch }) => {
    try {
      const response = await axios.get(
        API_GET_USER_ID,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${user_token}`,
          },
        },
      );
      const { user_id } = await response.data;
      dispatch(
        profileActions.changeField({
          prop: 'user_id',
          value: user_id,
        }),
      );
    } catch (error) {}
  },
);

export const getProfileInformation =
  createAsyncThunk(
    'profile/getProfileInformation',
    async ({ user_token }, { dispatch }) => {
      try {
        const response = await axios.get(
          API_GET_PROFILE,
          GET_CONFIG(user_token),
        );

        const userData = await response.data;

        const {
          first_name,
          last_name,
          email,
          username,
        } = userData.user;

        dispatch(
          profileActions.saveUserInfo({
            first_name,
            last_name,
            email,
            username,
          }),
        );
      } catch (error) {}
    },
  );

export const changeFieldProfile =
  createAsyncThunk(
    'profile/changeFieldProfile',
    async (
      { dataObj, user_token },
      { dispatch },
    ) => {
      try {
        const response = await axios.patch(
          API_CHANGE_FIELD_PROFILE,
          JSON.stringify(dataObj),
          PATCH_CONFIG(user_token),
        );

        dispatch(
          profileActions.saveUserInfo(dataObj),
        );
        dispatch(
          notificationActions.changeSuccess({
            exist: true,
            message: SUCCESS_MESSAGE,
          }),
        );
      } catch (error) {
        console.log(error);
        dispatch(
          notificationActions.changeError({
            exist: true,
            message: ERROR_MESSAGE,
          }),
        );
      }
    },
  );

export const changeUserImageProfile =
  createAsyncThunk(
    'profile/changeUserImageProfile',
    async (
      { user_token, imageFile, cb },
      { dispatch },
    ) => {
      cb({
        text: 'عکس در حال آپلود...',
        progress: 0,
        isUpload: true,
      });
      try {
        const response = await axios.patch(
          API_UPLOAD_IMAGE_PROFILE,
          { image: imageFile },
          {
            ...POST_CONFIG_FILE(user_token),
            onUploadProgress: ({
              progress,
              ...other
            }) => {
              cb((prev) => {
                const prevProgress =
                  prev.progress;
                if (prevProgress === progress)
                  return prev;
                else
                  return {
                    ...prev,
                    progress: progress.toFixed(2),
                  };
              });
            },
          },
        );

        const { image: url } =
          await response.data;

        dispatch(
          profileActions.changeField({
            prop: 'image',
            value: {
              url,
              changed: Math.random(),
            },
          }),
        );
        dispatch(
          notificationActions.changeSuccess({
            exist: true,
            message:
              'عکس پروفایل با موفقیت تغییر کرد',
          }),
        );
      } catch (error) {
        dispatch(
          notificationActions.changeError({
            exist: true,
            message:
              'تغییر عکس پروفایل با شکست مواجه شد',
          }),
        );
      } finally {
        cb({
          text: 'بارگذاری تصویر',
          progress: 0,
          isUpload: false,
        });
      }
    },
  );

export const getUserImageProfile =
  createAsyncThunk(
    'profile/getUserImageProfile',
    async ({ user_token }, { dispatch }) => {
      try {
        const response = await axios.get(
          API_UPLOAD_IMAGE_PROFILE,
          GET_CONFIG(user_token),
        );

        const { image: url } =
          await response.data;

        dispatch(
          profileActions.changeField({
            prop: 'image',
            value: {
              url,
              changed: Math.random(),
            },
          }),
        );
      } catch (error) {}
    },
  );

const initialState = {
  resume: null,
  user_id: '',
  first_name: '',
  last_name: '',
  email: '',
  username: '',
  cv: [],
  tests: [], // {name: string; data: object<string, any>}
  image: { url: '', changed: '' },
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    saveUserInfo(state, action) {
      const {
        first_name,
        last_name,
        email,
        username,
      } = action.payload;

      state.first_name = first_name;
      state.last_name = last_name;
      state.email = email;
      state.username = username;
    },
    changeField(state, action) {
      const { prop, value } = action.payload;

      state[prop] = value;
    },
    saveResumeArray(state, action) {
      state.resume = action.payload;
    },
    addTest(state, action) {
      const { name, data } = action.payload;
      const testIndex = state.tests.findIndex(
        (test) => test.name === name,
      );
      console.log(testIndex);
      if (testIndex > -1) {
        state.tests[testIndex].data = data;
      } else {
        state.tests.push({ name, data });
      }
    },
  },
});

export const profileActions =
  profileSlice.actions;
export default profileSlice.reducer;
