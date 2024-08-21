import {
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import axios from 'axios';
import {
  API_TALENT_TESTS,
  PATCH_CONFIG,
  POST_CONFIG,
} from '../api/configAPI';
import { mbtiActions } from './mbti-slice';
import { notificationActions } from './notification-slice';
import { profileActions } from './profile-slice';

export const sendTestResult = createAsyncThunk(
  'haland/sendTestResult',
  async (
    { user_token, testData, cb },
    { dispatch },
  ) => {
    try {
      const { data, name } = testData;
      await axios.post(
        API_TALENT_TESTS(name),
        JSON.stringify({ type: data }),
        POST_CONFIG(user_token),
      );

      dispatch(profileActions.addTest(testData));

      dispatch(
        notificationActions.changeSuccess({
          exist: true,
          message: 'تست با موفقیت انجام شد.',
        }),
      );

      cb();
    } catch (error) {
      console.log(error);
      dispatch(
        notificationActions.changeError({
          exist: true,
          message:
            'مشکلی در ارسال تست وجود دارد.',
        }),
      );
    }
  },
);

const initialState = {
  totalQuestions: 48,
  ansArray: [], // {id: number, point: number}[]
  isDone: false,
};

const halandSlice = createSlice({
  name: 'haland',
  initialState,
  reducers: {
    setAns(state, action) {
      state.ansArray = action.payload;
    },
    addAns(state, action) {
      const ans = action.payload;

      let existAnsIndex =
        state.ansArray.findIndex(
          (ansInArray) =>
            ansInArray.id === ans.id,
        );
      // // if exist then update else add
      if (existAnsIndex > -1) {
        state.ansArray[existAnsIndex] = ans;
      } else {
        state.ansArray.push(ans);
      }
    },
    setIsDone(state, action) {
      state.isDone = action.payload;
    },
  },
});

export const halandActions = halandSlice.actions;

export default halandSlice.reducer;
