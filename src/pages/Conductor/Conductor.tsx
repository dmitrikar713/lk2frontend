import React, { FC, ReactNode, useEffect, useState } from 'react';
import { Breadcrumbs } from 'src/components/Breadcrumbs/Breadcrumbs';
import { Button, ButtonType } from 'src/components/Button/Button';
import { Hint } from 'src/components/Hint/Hint';
import { ProgressBar } from 'src/components/ProgressBar/ProgressBar';
import { Radio } from 'src/components/Radio/Radio';
import { RoutePaths } from 'src/entities/Routes';
import styles from './Conductor.module.scss';
import { useAppDispatch, useAppSelector } from 'src/hooks/redux';
import ConductorForm from './Form';

const Question: any = (props: {
  Qtype: string;
  title: string;
  answer: string;
  answerSetter: (str: string) => void;
  options?: string[];
  children?: ReactNode[];
}) => {
  const { Qtype, title, answer, answerSetter, options } = props;
  switch (Qtype) {
    case 'bullet': {
      return (
        <div>
          <p>{title}</p>
          {options.map((option: any, index: any) => {
            return (
              <Radio
                key={index}
                selected={answer === option}
                value={option}
                onClick={() => answerSetter(option)}
              >
                {option}
              </Radio>
            );
          })}
        </div>
      );
    }
    case 'text': {
      return (
        <div>
          <p>{title}</p>
          <input
            type="text"
            name=""
            id=""
            value={answer}
            onChange={(event) => answerSetter(event.target.value)}
          />
        </div>
      );
    }
    case 'select': {
      return (
        <div>
          <p>{title}</p>
          <select
            name=""
            id=""
            value={answer}
            onChange={(event) => answerSetter(event.target.value)}
          >
            {options.map((option: any, index: any) => {
              return (
                <option key={index} value={option}>
                  {option}
                </option>
              );
            })}
          </select>
        </div>
      );
    }
    default: {
      return '';
    }
  }
};

const Conductor: FC = () => {
  const dispatch = useAppDispatch();

  const qwe: any = useAppSelector((state) => state.profileReducer.profile);

  const stage: any = useAppSelector((state) => state.conductorReducer.stage);
  const survey: any = useAppSelector((state) => state.conductorReducer.survey);
  const activeGroup: any = useAppSelector(
    (state) => state.conductorReducer.activeGroup
  );
  const form = useAppSelector((state) => state.conductorReducer);

  const [currentGroup, setCurrentGroup] = useState<number>(0);

  const [answers, setAnswers] = useState<any>(null);

  const handlePrev = () => {
    setCurrentGroup(currentGroup - 1);
  };

  const handleNext = () => {
    setCurrentGroup(currentGroup + 1);
  };

  useEffect(() => {
    console.log('useeffect22');
    console.log(qwe);
    console.log(stage);
    console.log(survey);
    console.log(activeGroup);
  });
  // useEffect(() => {
  //   if (answers == null) {
  //     const withAnswers = JSON.parse(JSON.stringify(questionGroups)).map(
  //       (qstgr) => {
  //         return {
  //           title: qstgr.title,
  //           questions: qstgr.questions.map((qst) => {
  //             const newqst = { ...qst };
  //             console.log(newqst);
  //             if (qst.options) {
  //               newqst.chosen = qst.options[0];
  //             } else {
  //               newqst.chosen = '';
  //             }
  //             return newqst;
  //           }),
  //         };
  //       }
  //     );
  //     setAnswers(JSON.parse(JSON.stringify(withAnswers)));
  //   }
  // }, []);

  return (
    <div className={styles.Exports}>
      <div className={styles.ExportsCard}>
        <Breadcrumbs
          withArrowBack
          breadcrumbList={[
            { title: 'Назад к профилю компании', path: RoutePaths.PROFILE },
          ]}
        />
        <div className={styles.ExportsCardWrapper}>
          <div className={styles.ExportsCardTest}>
            <div className={styles.ExportsCardTitle}>Маршрутизатор</div>
            <p>{String(stage)}</p>
            {String(stage) == 'form' ? <ConductorForm /> : String(stage)}
            {stage == 'survey' && (
              <>
                <ProgressBar
                  currentStep={currentGroup}
                  steps={answers.length}
                />
                <p>{answers[currentGroup].title}</p>

                {survey[currentGroup].questions.map((question, index) => {
                  return (
                    <Question
                      key={index}
                      Qtype={question.qType}
                      options={question.options && question.options}
                      title={question.title}
                      answer={question.answer}
                      answerSetter={(val) => {
                        setAnswers((prev) => {
                          return [
                            ...prev,
                            (answers[currentGroup].questions[index].chosen =
                              val),
                          ];
                        });
                      }}
                    ></Question>
                  );
                })}
              </>
            )}
            {stage == 'end' && (
              <div className={styles.ExportsCardSuccess}>Тест пройден 🎉</div>
            )}
          </div>
        </div>
      </div>
      <div className={styles.ExportsControls}>
        <Button type={ButtonType.Secondary} onClick={handlePrev}>
          Назад
        </Button>
        <Button onClick={handleNext}>Далее</Button>
      </div>
    </div>
  );
};

export default Conductor;
