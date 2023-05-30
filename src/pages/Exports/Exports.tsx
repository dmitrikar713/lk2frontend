import React, { FC, useState } from 'react';
import { Breadcrumbs } from 'src/components/Breadcrumbs/Breadcrumbs';
import { Button, ButtonType } from 'src/components/Button/Button';
import { Hint } from 'src/components/Hint/Hint';
import { ProgressBar } from 'src/components/ProgressBar/ProgressBar';
import { Radio } from 'src/components/Radio/Radio';
import { RoutePaths } from 'src/entities/Routes';
import styles from './Exports.module.scss';

const Exports: FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);

  const questions = [
    {
      question:
        'Как бы Вы оценили масштаб присутствия Вашей компании на внутреннем рынке в Вашем секторе?',
      answers: [
        { value: 1, label: 'Мы – лидер на российском рынке в нашем секторе' },
        {
          value: 2,
          label:
            'Наша компания входит в 3-5 ведущих компаний в своем секторе в России',
        },
        { value: 3, label: 'Мы – лидеры в Москве и одни из лидеров в стране' },
        {
          value: 4,
          label:
            'Имеем достаточное присутствие в Москве, но не представлены в других регионах России',
        },
        {
          value: 5,
          label: 'Пытаемся закрепиться и создать присутствие в нашем секторе',
        },
      ],
    },
    {
      question: 'Годовой оборот компании\n(выручка от реализации без НДС)',
      answers: [
        { value: 1, label: 'Менее 60 млн. ₽' },
        { value: 2, label: '60-120 млн. ₽' },
        { value: 3, label: '120-800 млн. ₽' },
        { value: 4, label: '800-1200 млн. ₽' },
        { value: 5, label: 'Свыше 1,2 млрд. ₽' },
      ],
    },
    {
      question:
        'Насколько выросли продажи Вашей продукции/услуг за последние три года (в среднем в год)?',
      answers: [
        { value: 1, label: 'Более чем на 15%' },
        { value: 2, label: '8-15%' },
        { value: 3, label: '4-7%' },
        { value: 4, label: 'Менее чем на 4%' },
        { value: 5, label: 'Нулевой или отрицательный показатель роста' },
      ],
    },
  ];

  const [answers, setAnswers] = useState<any>({});

  const [currentAnswer, setCurrentAnswer] = useState<number>(1);

  const handleGoBackward = () => {
    const prevStep = currentStep - 1;
    if (answers[prevStep + 1]) {
      setCurrentAnswer(
        questions[prevStep].answers.find(
          (answer) => answer.label === answers[prevStep + 1]
        )!.value
      );
    }
    setCurrentStep(currentStep - 1);
  };

  const handleGoForward = () => {
    setAnswers({
      ...answers,
      [currentStep + 1]: questions[currentStep].answers.find(
        (answer) => answer.value === currentAnswer
      )?.label,
    });
    setCurrentAnswer(1);
    setCurrentStep(currentStep + 1);
  };

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
            <div className={styles.ExportsCardTitle}>
              Тест экспортной готовности
            </div>
            {currentStep < questions.length ? (
              <>
                <ProgressBar
                  currentStep={currentStep}
                  steps={questions.length}
                />
                <div className={styles.ExportsCardQuestion}>
                  {questions[currentStep].question}
                </div>
                <div className={styles.ExportsCardAnswers}>
                  {questions[currentStep].answers.map((answer) => (
                    <Radio
                      key={answer.value}
                      selected={answer.value === currentAnswer}
                      value={answer.value}
                      onClick={() => setCurrentAnswer(answer.value)}
                    >
                      {answer.label}
                    </Radio>
                  ))}
                </div>
              </>
            ) : (
              <div className={styles.ExportsCardSuccess}>Тест пройден 🎉</div>
            )}
          </div>
          {currentStep < questions.length && (
            <Hint>
              Выберите один из вариантов ответа по каждому вопросу, который
              наиболее точно отражаетя фактическю ситуацию, характерную для
              вашей компании
            </Hint>
          )}
        </div>
      </div>
      {currentStep < questions.length && (
        <div className={styles.ExportsControls}>
          {currentStep !== 0 && (
            <Button type={ButtonType.Secondary} onClick={handleGoBackward}>
              Назад
            </Button>
          )}
          <Button onClick={handleGoForward}>
            {currentStep === questions.length - 1 ? 'Завершить' : 'Далее'}
          </Button>
        </div>
      )}
    </div>
  );
};

export default Exports;
