import styles from './Testrouter.module.scss';
import React, { FC, ReactNode, useEffect, useState } from 'react';
import { Breadcrumbs } from 'src/components/Breadcrumbs/Breadcrumbs';
import { Button, ButtonType } from 'src/components/Button/Button';
import { Hint } from 'src/components/Hint/Hint';
import { ProgressBar } from 'src/components/ProgressBar/ProgressBar';
import { Radio } from 'src/components/Radio/Radio';
import { RoutePaths } from 'src/entities/Routes';
import { useAppDispatch, useAppSelector } from 'src/hooks/redux';
import { TestrouterSlice } from './TestrouterSlice';
import TestrouterForm from './Form';
import { Question } from './Question';

const Testrouter: FC = () => {
  const dispatch = useAppDispatch();
  const [nextDisabled, setNextDisabled] = useState<boolean>(false);

  const { survey, stage, activeGroup, form } = useAppSelector(
    (state) => state.TestrouterReducer
  );

  function setAnswer(questionGroupId, questionId, answer) {
    console.log('setAnswer');
    console.log(questionGroupId);
    console.log(questionId);
    console.log(answer);
    dispatch(
      TestrouterSlice.actions.setAnswer({ questionGroupId, questionId, answer })
    );
  }
  function handlePrev() {
    if (activeGroup == 0) {
      dispatch(TestrouterSlice.actions.setStage('form'));
    } else dispatch(TestrouterSlice.actions.setActiveGroup(activeGroup - 1));
  }
  function handleNext() {
    if (stage == 'form') {
      dispatch(TestrouterSlice.actions.setStage('survey'));
    } else {
      if (activeGroup == survey.length - 1) {
        dispatch(TestrouterSlice.actions.setStage('end'));
      } else dispatch(TestrouterSlice.actions.setActiveGroup(activeGroup + 1));
    }
  }

  // Выключаем кнопку Далее
  useEffect(() => {
    if (stage == 'survey') {
      let nd = false;
      survey[activeGroup].questions.forEach((element) => {
        if ([null, undefined, ''].includes(element.answer)) nd = true;
      });
      setNextDisabled(nd);
    }
  }, [survey, stage, activeGroup]);

  return (
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
              Пройдите тест и получите рекомендации подходящей для Вас
              e-commerce программы
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
                Тест пройден 🎉
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
        {stage == 'survey' ? (
          <div className={styles.TestrouterControls}>
            <>
              <Button type={ButtonType.Secondary} onClick={handlePrev}>
                Назад
              </Button>
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
