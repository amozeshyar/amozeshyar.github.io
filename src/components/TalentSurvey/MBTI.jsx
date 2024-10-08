import React, { useEffect } from 'react';
import { questions_mbti } from '../../Data/MbtiData';
import { useState } from 'react';
import MbtiQuestionCard from './MbtiQuestionCard';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import {
  Link,
  useNavigate,
} from 'react-router-dom';
import { mbtiActions } from '../../store/mbti-slice';
import { sendTestResult } from '../../store/haland-slice';

function MBTI() {
  const { user_token } = useSelector(
    (state) => state.auth,
  );
  const { tests } = useSelector(
    (state) => state.profile,
  );
  const dispatch = useDispatch();

  const alreadyExist = tests?.find(
    (test) => test.name === 'mbti',
  );

  useEffect(() => {
    dispatch(mbtiActions.setAns([]));
  }, []);

  const { totalQuestions, ansArray } =
    useSelector((state) => state.mbti);

  const [currentPage, setCurrentPage] =
    useState(1);
  const numQuestions = 6;
  const startIndex =
    (currentPage - 1) * numQuestions;

  const endIndex = currentPage * numQuestions;

  const currentQuestions = questions_mbti.slice(
    startIndex,
    endIndex,
  );

  const backHandler = () => {
    setCurrentPage((prev) => prev - 1);
  };

  const prevHandler = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const isLastPage =
    currentPage === Math.ceil(totalQuestions / 6);

  const navigate = useNavigate();

  const seeTheResultHandler = () => {
    const callbackFunction = () => {
      window.scrollTo(0, 0);
      navigate('/talent-survey/result/mbti');
    };

    const calculateResult = () => {
      const answer = [...ansArray];
      const result = answer.reduce(
        (previewValue, currentValue) => {
          const key = currentValue.value;
          previewValue[key] =
            previewValue[key] + 1;

          return previewValue;
        },
        {
          I: 0,
          E: 0,
          F: 0,
          J: 0,
          P: 0,
          S: 0,
          N: 0,
          T: 0,
        },
      );

      let personality = '';

      personality +=
        result.E > result.I ? 'E' : 'I';
      personality +=
        result.S > result.N ? 'S' : 'N';
      personality +=
        result.T > result.F ? 'T' : 'F';
      personality +=
        result.J > result.P ? 'J' : 'P';

      return personality;
    };

    const resultPersonality = calculateResult();

    const testData = {
      name: 'mbti',
      data: resultPersonality,
    };

    dispatch(
      sendTestResult({
        user_token,
        testData,
        cb: callbackFunction,
        type: resultPersonality,
      }),
    );
  };

  return ansArray.length === totalQuestions ? (
    <div>
      <h2>شما قبلا این آزمون را داده اید</h2>
      <Link to="/talent-survey/result/mbti">
        نتیجه را نمایش بده
      </Link>
    </div>
  ) : (
    <section className="container mx-auto p-7 mt-7">
      <section className="flex flex-col items-center justify-center gap-5">
        <section className="border shadow-lg shadow-blue-500/50 grid  grid-rows-3 grid-cols-2 gap-10 p-10 rounded-3xl">
          {currentQuestions.length > 0 &&
            currentQuestions.map(
              (questionObj, index) => (
                <MbtiQuestionCard
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
              className="text-white bg-primaryColor rounded-3xl p-2 px-3 text-base"
              onClick={seeTheResultHandler}
            >
              {/* <Link to="/talent-survey/result/mbti"> */}
              دیدن نتیجه تست
              {/* </Link> */}
            </button>
          )}
        </section>
      </section>
    </section>
  );
}

export default MBTI;
