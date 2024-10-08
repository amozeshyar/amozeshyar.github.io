import React, { useEffect } from 'react';
import { questions_holland } from '../../Data/HalandData';
import { useState } from 'react';
import QuestionCard from './QuestionCard';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import {
  Link,
  useNavigate,
} from 'react-router-dom';
import axios from 'axios';
import {
  halandActions,
  sendTestResult,
} from '../../store/haland-slice';
import { calculateHalandTest } from '../../functions/calculateResultTest';
import { profileActions } from '../../store/profile-slice';

function Haland() {
  const { user_token, isLoggedIn } = useSelector(
    (state) => state.auth,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoggedIn) {
      // axios
      //   .get(API_TALENT, {
      //     method: 'GET',
      //     headers: {
      //       'Content-Type': 'application/json',
      //       Authorization: `Token ${user_token}`,
      //     },
      //   })
      //   .then((res) => {
      //     const data = res.data;
      //     if (data) {
      //       const resultObj = JSON.parse(data);
      //       dispatch(
      //         halandActions.setAns(resultObj),
      //       );
      //     }
      //   });
      const talentObj = JSON.parse(
        localStorage.getItem('talent-survey'),
      );
      if (talentObj)
        dispatch(halandActions.setAns(talentObj));
    }
  }, []);

  const { totalQuestions, ansArray } =
    useSelector((state) => state.haland);
  const [currentPage, setCurrentPage] =
    useState(1);

  const numQuestions = 6;
  const startIndex =
    (currentPage - 1) * numQuestions;

  const endIndex = currentPage * numQuestions;

  const currentQuestions =
    questions_holland.slice(startIndex, endIndex);

  const calculateResult = (ansArray) => {
    return calculateHalandTest(ansArray);
  };

  const backHandler = () => {
    setCurrentPage((prev) => prev - 1);
  };

  const prevHandler = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const isLastPage =
    currentPage ===
    Math.floor(totalQuestions / 6);

  const navigate = useNavigate();

  const seeTheResultHandler = () => {
    const testData = {
      name: 'haland',
      data: calculateResult(ansArray),
    };

    const callbackFunction = () => {
      navigate('/talent-survey/result/haland');
      window.scrollTo(0, 0);
    };
    dispatch(
      sendTestResult({
        user_token,
        testData,
        cb: callbackFunction,
      }),
    );
  };

  return ansArray.length === totalQuestions ? (
    <div>
      <h2>شما قبلا این آزمون را داده اید</h2>
      <Link to="/talent-survey/result">
        نتیجه را نمایش بده
      </Link>
    </div>
  ) : (
    <section className="container mx-auto p-7 mt-7">
      <section className="flex flex-col items-center justify-center gap-5">
        <section className="border shadow-lg shadow-blue-500/50 grid  grid-rows-3 grid-cols-2 gap-10 justify-items-center p-10 content-center rounded-3xl">
          {currentQuestions.length > 0 &&
            currentQuestions.map(
              (questionObj, index) => (
                <QuestionCard
                  key={index}
                  questionObj={{
                    ...questionObj,
                    id:
                      (currentPage - 1) * 6 +
                      index +
                      1,
                  }}
                />
              ),
            )}
        </section>
        <section className="flex self-end gap-5">
          {currentPage > 1 && (
            <button
              onClick={backHandler}
              className="bg-[#F5AF2B] rounded-xl p-2 px-3 text-base"
            >
              قبل
            </button>
          )}

          {!isLastPage && (
            <button
              onClick={prevHandler}
              className="bg-[#F5AF2B] rounded-xl p-2 px-3 text-base"
            >
              سوالات بعدی
            </button>
          )}
          {isLastPage && (
            <button
              className="text-white bg-primaryColor rounded-3xl text-base"
              onClick={seeTheResultHandler}
            >
              <Link className="py-3 px-6">
                دیدن نتیجه تست
              </Link>
            </button>
          )}
        </section>
      </section>
    </section>
  );
}

export default Haland;
