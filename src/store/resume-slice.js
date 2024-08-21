import {
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';

import {
  API_ADD_EDU_CV,
  API_ADD_SKILL_CV,
  API_ADD_WORK_CV,
  API_CREATE_CV,
  API_GET_CV,
  API_PATCH_CV,
  GET_CONFIG,
} from '../api/configAPI';
import axios from 'axios';
import { notificationActions } from './notification-slice';
import { profileActions } from './profile-slice';

/* 
interface SelectType {
  value: number,
  label: String,
}

interface CityType {
  value: String,
  label: String,
}

*/

const parseDataResume = (data) => {
  const {
    educations,
    works,
    skills,
    duty_system: nezamVazife,
    martial_status: vaziatTaahol,
    data_of_birth: birthdayDate,
    city,
    address,
    phone_number: phonenumber,
    about_me: nameResume,
    firstname: firstName,
    lastname: lastName,
    gender,
    id,
  } = data;

  const validGender = (gender) => {
    switch (gender) {
      case 'M':
        return {
          value: 'M',
          label: 'مرد',
        };
      case 'F':
        return {
          value: 'F',
          label: 'زن',
        };
      case 'U':
        return {
          value: 'U',
          label: 'تمایلی به اعلام ندارم',
        };
    }
  };

  const validVaziatTaahol = (vaziatTaahol) => {
    switch (vaziatTaahol) {
      case '2':
        return {
          value: '2',
          label: 'مجرد',
        };
      case '1':
        return {
          value: '1',
          label: 'متاهل',
        };
    }
  };

  const validMartialStatus = (ms) => {
    switch (ms) {
      case '3':
        return { value: '3', label: 'مشمول' };
      case '2':
        return {
          value: '2',
          label: 'معافیت دائم',
        };
      case '1':
        return {
          value: '1',
          label: 'معافیت تحصیلی',
        };
      case '0':
        return {
          value: '4',
          label: 'پایان خدمت',
        };
    }
  };

  const validCity = (city) => {
    const cities = [
      { value: 'tehran', label: 'تهران' },
      { value: 'esfahan', label: 'اصفهان' },
      { value: 'mashhad', label: 'مشهد' },
      { value: 'shiraz', label: 'شیراز' },
      { value: 'kermanshah', label: 'کرمانشاه' },
      { value: 'ahvaz', label: 'اهواز' },
      { value: 'tabriz', label: 'تبریز' },
    ];
    const findedCity = cities.find(
      (cityObj) => cityObj.value === city,
    );

    return findedCity;
  };

  const baseInfo = {
    nezamVazife: validMartialStatus(nezamVazife),
    vaziatTaahol: validVaziatTaahol(vaziatTaahol),
    birthdayDate,
    city: validCity(city),
    address,
    phonenumber,
    nameResume,
    firstName,
    lastName,
    generic: validGender(gender),
  };

  return {
    baseInfo,
    education: educations.slice(-1)[0],
    work: works.slice(-1)[0],
    skills,
  };
};

const ERROR_MESSAGE =
  'مشکلی در ذخیره اطلاعات پیش آمده است';
const SUCCESS_MESSAGE = 'تغییرات ذخیره شد.';

export const getResume = createAsyncThunk(
  'resume/getResume',
  async (
    { user_id, user_token },
    { dispatch },
  ) => {
    // we have one resume for now, so cv_id is 1
    try {
      const response = await axios.get(
        API_GET_CV(user_id),
        GET_CONFIG(user_token),
      );

      const data = await response.data;

      const {
        baseInfo,
        education,
        work,
        skills,
        id,
      } = parseDataResume(data);

      dispatch(resumeActions.setCVID(id));

      dispatch(
        resumeActions.setBaseInformation(
          baseInfo,
        ),
      );

      const validEducation = {
        gradeEducation: education.grade,
        fieldOfStudy: education.field_of_study,
        startDate: education.start_date,
        endDate: education.end_date,
        nameUniversity: education.university,
      };

      dispatch(
        resumeActions.setEducation(
          validEducation,
        ),
      );

      const validWork = {
        employmentStatus: work.description,
        employmentTitle: work.title,
        companyName: work.company,
        occupationalGroup: work.industry,
        startDate: work.start_date,
        endDate: work.end_date,
      };

      dispatch(
        resumeActions.setWorkExperience(
          validWork,
        ),
      );

      const validSkills = skills.map((skill) => ({
        name: skill.title,
        id: skill.id,
      }));

      dispatch(
        resumeActions.setSkill(validSkills),
      );
    } catch (error) {}
  },
);

export const createResume = createAsyncThunk(
  'resume/createResume',
  async (data, { dispatch }) => {
    const {
      user_token,
      nameResume: about_me,
      phonenumber: phone_number,
      firstName: firstname,
      lastName: lastname,
      generic: gender,
      vaziatTaahol: martial_status,
      city: city,
      nezamVazife: duty_system,
      birthdayDate: data_of_birth,
      address: address,
      user_id,
      hasAlready,
      cb,
    } = data;

    const valid_obj = {
      about_me,
      phone_number,
      firstname,
      lastname,
      gender: gender.value,
      martial_status: martial_status.value,
      city: city.value,
      duty_system: duty_system.value,
      data_of_birth,
      address,
      user_id,
    };

    try {
      const res = await (hasAlready
        ? axios.patch(
            API_PATCH_CV(user_id),
            JSON.stringify(valid_obj),
            {
              headers: {
                'Content-Type':
                  'application/json',
                Authorization: `Token ${user_token}`,
              },
            },
          )
        : axios.post(
            API_CREATE_CV,
            JSON.stringify(valid_obj),
            {
              headers: {
                'Content-Type':
                  'application/json',
                Authorization: `Token ${user_token}`,
              },
            },
          ));
      const cvId = await res.data.id;
      dispatch(resumeActions.setCVID(cvId));
      dispatch(
        notificationActions.changeSuccess({
          exist: true,
          message: SUCCESS_MESSAGE,
        }),
      );
      cb();
    } catch (error) {
      dispatch(
        notificationActions.changeError({
          exist: true,
          message: ERROR_MESSAGE,
        }),
      );
    }
  },
);

export const sendEducationInfo = createAsyncThunk(
  'resume/sendEducationInfo',
  async (data, { dispatch }) => {
    const {
      gradeEducation: grade,
      fieldOfStudy: field_of_study,
      startDate: start_date,
      endDate: end_date,
      nameUniversity: university,
      cv_id,
      user_token,
      cb,
      hasAlready,
    } = data;

    const valid_obj = {
      grade,
      field_of_study,
      start_date,
      end_date,
      university,
      cv_id,
    };

    try {
      await (hasAlready
        ? axios.post(
            API_ADD_EDU_CV(cv_id),
            JSON.stringify(valid_obj),
            {
              headers: {
                'Content-Type':
                  'application/json',
                Authorization: `Token ${user_token}`,
              },
            },
          )
        : axios.post(
            API_ADD_EDU_CV(cv_id),
            JSON.stringify(valid_obj),
            {
              headers: {
                'Content-Type':
                  'application/json',
                Authorization: `Token ${user_token}`,
              },
            },
          ));
      dispatch(
        notificationActions.changeSuccess({
          exist: true,
          message: SUCCESS_MESSAGE,
        }),
      );
      cb();
    } catch (error) {
      dispatch(
        notificationActions.changeError({
          exist: true,
          message: ERROR_MESSAGE,
        }),
      );
    }
  },
);

export const sendWorkExperienceInfo =
  createAsyncThunk(
    'resume/sendWorkExperienceInfo',
    async (data, { dispatch }) => {
      const {
        employmentStatus: description,
        employmentTitle: title, // String
        occupationalGroup: industry, // String
        companyName: company, // String
        startDate: start_date, // Date
        endDate: end_date, // Date
        cv_id,
        user_token,
        cb,
      } = data;

      const valid_obj = {
        title,
        industry,
        company,
        start_date,
        end_date,
        cv_id,
        description,
      };

      try {
        await axios.post(
          API_ADD_WORK_CV(cv_id),
          JSON.stringify(valid_obj),
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Token ${user_token}`,
            },
          },
        );

        dispatch(
          notificationActions.changeSuccess({
            exist: true,
            message: SUCCESS_MESSAGE,
          }),
        );
        cb();
      } catch (error) {
        dispatch(
          notificationActions.changeError({
            exist: true,
            message: ERROR_MESSAGE,
          }),
        );
      }
    },
  );

export const sendSkills = createAsyncThunk(
  'resume/createResume',
  async (
    { data, user_token, cv },
    { dispatch },
  ) => {
    try {
      const response = await axios.post(
        API_ADD_SKILL_CV(cv),
        JSON.stringify({ ...data, cv_id: cv }),
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${user_token}`,
          },
        },
      );
      const skillObj = response.data;
      dispatch(
        resumeActions.addSkill({
          lvl: 1,
          name: skillObj.title,
          id: skillObj.id,
        }),
      );
      dispatch(
        notificationActions.changeSuccess({
          exist: true,
          message: 'مهارت اضافه شد.',
        }),
      );
    } catch (error) {
      dispatch(
        notificationActions.changeError({
          exist: true,
          message:
            'مشکلی در اضافه شدن مهارت ایجاد شد.',
        }),
      );
    }
  },
);

const initialState = {
  cv_id: '',
  baseInformation: {
    nameResume: '', // String
    phonenumber: '', // String
    firstName: '', // String
    lastName: '', // String
    generic: '', // type: SelectType
    vaziatTaahol: '', // type: SelectType
    city: '', // type: CityType
    nezamVazife: '', // type: SelectType
    birthdayDate: '', // Date
    address: '', // String
    image: null,
  },
  education: {
    gradeEducation: '', // String
    fieldOfStudy: '', // String
    startDate: '', // Date
    endDate: '', // Date
    nameUniversity: '', // String
  },
  workExperience: {
    employmentStatus: '', // String
    employmentTitle: '', // String
    occupationalGroup: '', // String
    companyName: '', // String
    startDate: '', // Date
    endDate: '', // Date
  },
  skill: {
    skills: [], // {name: String, lvl: number, id: number}[]
  },
  furtherInformation: {
    ALittleAboutMe: '', // String
    languages: [], // {id: number, name: String}[]
    certificatesAndCourses: [], // {title: String, issuingInstitution: String, startDate: Date, endDate: Date}[]
    favorites: [], //{id: number, name: String}[]
    contact: [], // {name: String, link: String}[]
  },
};

const resumeSlice = createSlice({
  name: 'resume',
  initialState,
  reducers: {
    setCVID(state, action) {
      state.cv_id = action.payload;
    },
    setBaseInformation(state, action) {
      state.baseInformation = action.payload;
    },
    changeBaseInformation(state, action) {
      const { prop, value } = action.payload;
      state.baseInformation[prop] = value;
    },
    setEducation(state, action) {
      state.education = action.payload;
    },
    changeEducation(state, action) {
      const { prop, value } = action.payload;
      state.education[prop] = value;
    },
    setWorkExperience(state, action) {
      state.workExperience = action.payload;
    },
    changeWorkExperience(state, action) {
      const { prop, value } = action.payload;
      state.workExperience[prop] = value;
    },
    setSkill(state, action) {
      state.skill.skills = action.payload;
    },
    changeSkill(state, action) {
      const { prop, value } = action.payload;
      state.skill[prop] = value;
    },
    addSkill(state, action) {
      const skill = action.payload;
      state.skill.skills.push(skill);
    },
    setFutherInformation(state, action) {
      state.furtherInformation = action.payload;
    },
    changeFutherInformation(state, action) {
      const { prop, value } = action.payload;
      state.furtherInformation[prop] = value;
    },
    addLanguageInFurtherInformation(
      state,
      action,
    ) {
      state.furtherInformation.languages.push(
        action.payload,
      );
    },
    addFavoriteInFurtherInformation(
      state,
      action,
    ) {
      state.furtherInformation.favorites.push(
        action.payload,
      );
    },
    addContactInFurtherInformation(
      state,
      action,
    ) {
      state.furtherInformation.contact.push(
        action.payload,
      );
    },
    deleteSkill(state, action) {
      const skill = action.payload;
      state.skill.skills =
        state.skill.skills.filter(
          (skillItem) => +skillItem.id !== +skill,
        );
    },
  },
});

export const resumeActions = resumeSlice.actions;

export default resumeSlice.reducer;
