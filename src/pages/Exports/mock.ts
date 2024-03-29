export const questions = [
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
