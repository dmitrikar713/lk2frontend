import styles from './Testrouter.module.scss';
import React, { ReactNode } from 'react';
import { DropDownItem } from 'src/components/DropDownItem/DropDownItem';
import { Input, InputType } from 'src/components/Input/Input';
import { Radio } from 'src/components/Radio/Radio';
import { Select } from 'src/components/Select/Select';

export const Question: any = (props: {
  order: number;
  qType: string;
  title: string;
  answer: string;
  answerSetter: (str: string) => void;
  options?: string[];
  children?: ReactNode[];
  activeGroup?: number;
  questionId?: number;
}) => {
  const {
    activeGroup,
    questionId,
    qType,
    title,
    answer,
    answerSetter,
    options,
    order,
  } = props;
  switch (qType) {
    case 'bullet': {
      return (
        <div className={styles.Question}>
          <span className={styles.QuestionOrder}>{order + 1} </span>
          <div className={styles.QuestionContent}>
            <p className={styles.QuestionText}>{title}</p>
            <div className={styles.QuestionBullets}>
              {' '}
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
          </div>
        </div>
      );
    }
    case 'text': {
      return (
        <div className={styles.Question}>
          <span className={styles.QuestionOrder}>{order + 1} </span>
          <div className={styles.QuestionContent}>
            <p className={styles.QuestionText}>{title}</p>

            <div className={`${styles.Question}, ${styles.mw328}`}>
              <input
                type="text"
                placeholder="Введите данные"
                name=""
                id=""
                value={answer}
                onChange={(event) => answerSetter(event.target.value)}
              />
            </div>
          </div>
        </div>
      );
    }
    case 'select': {
      return (
        <div className={styles.Question}>
          <span className={styles.QuestionOrder}>{order + 1} </span>
          <div className={styles.QuestionContent}>
            <p className={styles.QuestionText}>{title}</p>

            <div className={`${styles.Question}, ${styles.mw328}`}>
              <Select
                className={styles.QuestionSelect}
                value={answer}
                style={{ padding: '10px 0' }}
                onChange={(value) => {
                  answerSetter(value);
                }}
                renderInputValue={(value) => (
                  <div className={styles.SelectWrapper}>
                    {value ? (
                      <div className={styles.SelectValue}>{answer}</div>
                    ) : (
                      <span className={styles.SelectPlaceholder}>{title}</span>
                    )}
                  </div>
                )}
              >
                {options.map((opt: any, index) => {
                  return (
                    <DropDownItem role="option" value={opt} key={index}>
                      {opt}
                    </DropDownItem>
                  );
                })}
              </Select>
            </div>
          </div>
        </div>
      );
    }
    default: {
      return 'default Question switch';
    }
  }
};

export default Question;
