import styles from './Testrouter.module.scss';
import React, { FC, ReactNode, useEffect, useState } from 'react';
import { Breadcrumbs } from 'src/components/Breadcrumbs/Breadcrumbs';
import { Button, ButtonType } from 'src/components/Button/Button';
import { Hint } from 'src/components/Hint/Hint';
import { ProgressBar } from 'src/components/ProgressBar/ProgressBar';
import { Radio } from 'src/components/Radio/Radio';
import { RoutePaths } from 'src/entities/Routes';
import { useAppDispatch, useAppSelector } from 'src/hooks/redux';
import { testrouterSlice } from './TestrouterSlice';
import TestrouterForm from './Form';
import { Question } from './Question';
import { fetchTestrouterQuestions } from 'src/store/thunks/test-router/FetchTestrouterQuestions';
import { Skeleton } from 'src/components/Skeleton/Skeleton';
import { sendTestrouterAnswers } from 'src/store/thunks/test-router/SendTestrouterAnswers';
import { useNavigate } from 'react-router-dom';

const Testrouter: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [nextDisabled, setNextDisabled] = useState<boolean>(false);

  const { survey, stage, activeGroup, form, isLoading } = useAppSelector(
    (state) => state.TestrouterReducer
  );

  function setAnswer(questionGroupId, questionId, answer) {
    dispatch(
      testrouterSlice.actions.setAnswer({ questionGroupId, questionId, answer })
    );
  }
  function handlePrev() {
    if (activeGroup == 0) {
      dispatch(testrouterSlice.actions.setStage('form'));
    } else dispatch(testrouterSlice.actions.setActiveGroup(activeGroup - 1));
  }
  function handleNext() {
    if (activeGroup == survey.length - 1) {
      dispatch(testrouterSlice.actions.setStage('end'));
      dispatch(sendTestrouterAnswers(survey));
    } else dispatch(testrouterSlice.actions.setActiveGroup(activeGroup + 1));
  }

  useEffect(() => {
    dispatch(testrouterSlice.actions.restart());
    dispatch(fetchTestrouterQuestions());
  }, []);

  return isLoading ? (
    <div className={styles.Testrouter}>
      <div className={styles.TestrouterCard}>
        <Skeleton rows={2} />
      </div>{' '}
    </div>
  ) : survey.length < 1 ? (
    <p>Не удалось загрузить вопросы для теста</p>
  ) : (
    <div className={styles.Testrouter}>
      <div className={styles.TestrouterCard}>
        <Breadcrumbs
          withArrowBack
          breadcrumbList={[
            { title: 'Назад к профилю компании', path: RoutePaths.PROFILE },
          ]}
        />
        <div className={styles.TestrouterCardWrapper}>
          <div className={styles.TestrouterCardTest}>
            <div className={styles.TestrouterCardTitle}>
              Маршрутизатор ({String(stage)})
            </div>
            <p>
              Пройдите тест и получите рекомендации подходящей для Вас программы
            </p>
            {stage == 'survey' ? (
              <ProgressBar
                currentStep={activeGroup + 1}
                steps={survey.length}
              />
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
      <div className={styles.TestrouterCard}>
        <div className={styles.TestrouterCardWrapper}>
          <div className={styles.TestrouterCardTest}>
            {stage == 'form' ? <TestrouterForm /> : ''}
            {stage == 'survey' ? (
              <>
                <h6 className={styles.QuestionGroupTitle}>
                  {survey[activeGroup].title}
                </h6>
                <div className={styles.Survey}>
                  {survey[activeGroup].questions.map((question, index) => {
                    return (
                      <Question
                        key={index}
                        order={index}
                        qType={question.qType}
                        options={question.options && question.options}
                        title={question.title}
                        answer={question.answer}
                        answerSetter={(val) => {
                          setAnswer(activeGroup, index, val);
                        }}
                      />
                    );
                  })}
                </div>
              </>
            ) : (
              ''
            )}
            {stage == 'end' ? (
              <div className={styles.TestrouterCardSuccess}>
                <p>Тест пройден 🎉</p>
                <p>Результаты на странице профиля.</p>
                <Button
                  type={ButtonType.Secondary}
                  onClick={() => navigate('/')}
                >
                  В профиль
                </Button>
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
        {stage == 'survey' ? (
          <div className={styles.TestrouterControls}>
            <>
              {activeGroup != 0 && (
                <Button type={ButtonType.Secondary} onClick={handlePrev}>
                  Назад
                </Button>
              )}
              <Button disabled={nextDisabled} onClick={handleNext}>
                Далее
              </Button>
            </>
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default Testrouter;
