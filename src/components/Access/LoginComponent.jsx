import { useRef, useState } from 'react';
import InputLabel from '../UI/InputLabel';
import { useDispatch } from 'react-redux';
import { loginByEmailPass } from '../../api/authAPI';
import {
  Link,
  Navigate,
  useNavigate,
} from 'react-router-dom';
import { loginUser } from '../../store/auth-slice';

const LoginComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [error, setError] = useState(null);

  const callbackFunction = () => {
    navigate('/');
    window.scrollTo(0, 0);
  };

  const loginHandler = (e) => {
    e.preventDefault();
    const email_value = emailRef.current.value;
    const password_value =
      passwordRef.current.value;

    // simple validation
    if (
      email_value.trim().length < 5 ||
      password_value.trim().length < 5
    ) {
      setError(
        'ایمیل و پسورد باید حداقل ۵ کاراکتر داشته باشد',
      );
      return;
    } else if (
      !email_value.includes('@') ||
      !email_value.includes('.')
    ) {
      setError('اینکه اصلا ایمیل نیست!');
      return;
    }
    setError(null);

    const data = {
      email: email_value,
      password: password_value,
    };

    dispatch(
      loginUser({ data, cb: callbackFunction }),
    );
  };

  return (
    <div className="shadow-lg lg:w-1/2  lg:flex-col  lg:flex w-full  flex-col text-right ">
      <p className="bg-primaryColor text-white p-5 text-center text-lg font-bold">
        ورود به حساب کاربری
      </p>
      <form onSubmit={loginHandler}>
        <div className="flex flex-col gap-4 p-6 px-8">
          <InputLabel
            text="پست الکترونیک"
            type="email"
            name="username"
            placeholder="Info@example.com"
            innerRef={emailRef}
            role="username"
          />

          <InputLabel
            text="گذرواژه"
            name="password"
            type="password"
            placeholder="********"
            innerRef={passwordRef}
            autoComplete="off"
            role="password"
          />
          {/* <Link
            to="/access/forgot"
            className="font-bold text-primaryColor text-[11px]"
          >
            رمز عبور خود را فراموش کرده اید؟
          </Link> */}

          <div className="flex flex-col gap-3  justify-between">
            <button
              className="bg-secondaryColor p-1 rounded-full text-sm"
              onClick={loginHandler}
              type="submit"
              role="submitButton"
            >
              ورود به سایت
            </button>
            <span className="flex items-center">
              <p className="text-[13px]">
                حساب کاربری ندارید؟
              </p>
              <Link
                className="mr-2 text-primaryColor font-bold cursor-pointer text-[13px]"
                to="/register"
              >
                ورود به عضویت
              </Link>
            </span>
          </div>
          {error && (
            <p className="flex items-center">
              خطا:{' '}
              <span className="text-red-500 text-xs mr-2">
                {error}
              </span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default LoginComponent;
