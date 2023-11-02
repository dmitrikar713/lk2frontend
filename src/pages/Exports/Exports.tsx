import React, { FC, useEffect, useState } from 'react';
import { Breadcrumbs } from 'src/components/Breadcrumbs/Breadcrumbs';
import { Button, ButtonType } from 'src/components/Button/Button';
import { Hint } from 'src/components/Hint/Hint';
import { ProgressBar } from 'src/components/ProgressBar/ProgressBar';
import { Radio } from 'src/components/Radio/Radio';
import { RoutePaths } from 'src/entities/Routes';
import styles from './Exports.module.scss';
import { useDispatch } from 'react-redux';
import { fetchExportsQuestions } from 'src/store/thunks/exports/FetchExportsQuestions';
import { useAppSelector } from 'src/hooks/redux';
import {
  ExportQuestionOption,
  ExportsQuestion,
  exportsSlice,
} from './ExportsSlice';
import { Skeleton } from 'src/components/Skeleton/Skeleton';
import { sendExportsAnswers } from 'src/store/thunks/exports/SendExportsAnswers';
import { useNavigate } from 'react-router-dom';

const Exports: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { questions, isLoading, currentQuestionIndex } = useAppSelector(
    (state) => state.exportsReducer
  );
  function setAnswer(answerIndex: number) {
    dispatch(exportsSlice.actions.setAnswerIndex(answerIndex));
  }
  function setCurrentQuestionIndex(index: number) {
    dispatch(exportsSlice.actions.setCurrentQuestionIndex(index));
  }

  useEffect(() => {
    dispatch(fetchExportsQuestions());
  }, []);

  useEffect(() => {
    if (currentQuestionIndex === questions.length) {
      dispatch(sendExportsAnswers(questions));
    }
  });

  return (
    <div className={styles.Exports}>
      <div className={styles.ExportsCard}>
        <Breadcrumbs
          withArrowBack
          breadcrumbList={[
            { title: 'Назад к профилю компании', path: RoutePaths.PROFILE },
          ]}
        />
        {isLoading ? (
          <Skeleton rows={2} />
        ) : (
          <div className={styles.ExportsCardWrapper}>
            <div className={styles.ExportsCardTest}>
              <div className={styles.ExportsCardTitle}>
                Тест экспортной готовности
              </div>
              {currentQuestionIndex < questions.length ? (
                <>
                  <ProgressBar
                    currentStep={currentQuestionIndex}
                    steps={questions.length}
                  />
                  <div className={styles.ExportsCardQuestion}>
                    {questions[currentQuestionIndex].title}
                  </div>
                  <div className={styles.ExportsCardAnswers}>
                    {questions[currentQuestionIndex].options.map(
                      (option: ExportQuestionOption) => (
                        <Radio
                          key={option.index}
                          selected={
                            option.index ===
                            questions[currentQuestionIndex].answerIndex
                          }
                          value={option.index}
                          onClick={() => setAnswer(option.index)}
                        >
                          {option.name}
                        </Radio>
                      )
                    )}
                  </div>
                </>
              ) : (
                <div className={styles.ExportsCardSuccess}>
                  <p>Тест пройден 🎉</p>
                  <p>Резульат на странице профиля</p>
                  <Button
                    type={ButtonType.Secondary}
                    onClick={() => navigate('/')}
                  >
                    В профиль
                  </Button>
                </div>
              )}
            </div>
            {currentQuestionIndex < questions.length && (
              <Hint>
                Выберите один из вариантов ответа по каждому вопросу, который
                наиболее точно отражаетя фактическю ситуацию, характерную для
                вашей компании
              </Hint>
            )}
          </div>
        )}
      </div>

      {!isLoading && currentQuestionIndex < questions.length && (
        <div className={styles.ExportsControls}>
          {currentQuestionIndex !== 0 && (
            <Button
              type={ButtonType.Secondary}
              onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}
            >
              Назад
            </Button>
          )}
          <Button
            onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
          >
            {currentQuestionIndex === questions.length - 1
              ? 'Завершить'
              : 'Далее'}
          </Button>
        </div>
      )}
    </div>
  );
};

export default Exports;
