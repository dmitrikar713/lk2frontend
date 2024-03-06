import React, { FC, useState } from 'react';
import { Button } from 'src/components/Button/Button';
import { Modal } from 'src/components/Modal/Modal';
import { Rating } from 'src/components/Rating/Rating';
import { Textarea } from 'src/components/Textarea/Textarea';
import { useAppDispatch, useAppSelector } from 'src/hooks/redux';
import { configFeadBack, feedbackFields } from './config/config';
import { feedbackSlice, SendFeedback } from './FeedbackSlice';
import { Checkbox, CheckboxSize } from 'src/components/Checkbox/Checkbox';

import styles from './FeedbackModal.module.scss';
import { sendFeedback } from 'src/store/thunks/feedback/SendFeedback';
import { FileUploader } from 'src/components/FileUploader/FileUploader';
import { DocumentUploader } from 'src/components/DocumentUploader/DocumentUploader';
import { fileToBase64 } from 'src/common/utils/fileToBase64';
import { DropDownItem } from 'src/components/DropDownItem/DropDownItem';
import { Select } from 'src/components/Select/Select';
import { Skeleton } from 'src/components/Skeleton/Skeleton';

export const FeedbackModal: FC = () => {
  const dispatch = useAppDispatch();

  const [stateRating, setStateRating] = useState(configFeadBack.rating);
  const [stateInput, setStateInput] = useState(configFeadBack.input);
  const [textAreaValue, textAreaChange] = useState('');

  const {
    feedbackShown,
    feedbackContract,
    leadId,
    accountId,
    activityId,
    leadName,
    leadNumber,
    sending,
  } = useAppSelector((state) => state.feedbackReducer);
  // const sending = false;

  const setReting = (id: number, value: number) => {
    const alteredState = [...stateRating];
    alteredState.map((ratingField) => {
      if (ratingField.id === id) ratingField.value = value;
    });
    setStateRating(alteredState);
  };

  const setInput = (id: number, value: string) => {
    const alteredState = [...stateInput];
    alteredState.map((inputField) => {
      if (inputField.id === id) inputField.value = value;
    });
    setStateInput(alteredState);
  };
  interface RatingState {
    id: number;
    title: string;
    value: number;
  }

  interface InputState {
    id: number;
    title: string;
    value: string;
    type?: string;
    onFocus?: string;
  }
  const findValue = (
    state: Array<RatingState | InputState>,
    title: string
  ): string | number => {
    const desiredField = state.find((stateItem) => stateItem.title === title);
    if (desiredField) return desiredField.value;
    return '';
  };

  const feedbackHandler = async () => {
    const feedback = {} as SendFeedback;
    dispatch(feedbackSlice.actions.setSending(true));

    feedback.leadId = leadId;
    feedback.accountId = accountId;
    feedback.activityId = activityId;

    feedback.serviceStar = Number(
      findValue(stateRating, feedbackFields.serviceStars)
    );
    feedback.workStar = Number(
      findValue(stateRating, feedbackFields.workStars)
    );
    feedback.MECStar = Number(findValue(stateRating, feedbackFields.MECStars));
    feedback.feedback = textAreaValue;

    if (contr) {
      feedback.contractNumber = String(
        findValue(stateInput, feedbackFields.contractNumber)
      );
      feedback.contractWith = String(
        findValue(stateInput, feedbackFields.contractWith)
      );
      feedback.contractItem = String(
        findValue(stateInput, feedbackFields.contractItem)
      );
      feedback.contractDate = String(
        findValue(stateInput, feedbackFields.contractDate)
      );
      // feedback.country = String(findValue(stateInput, feedbackFields.country));
      feedback.country = country;
      feedback.msp = msp;

      feedback.contractSumm = Number(
        findValue(stateInput, feedbackFields.contractSumm)
      );
      feedback.buyer = clientType;

      // const fileBuff = (await fileToBase64(document)) as string;
      feedback.documentExt = document.name.substring(
        document.name.lastIndexOf('.') + 1
      );
      feedback.document = document
        ? ((await fileToBase64(document)) as string)
        : '';
      feedback.documentName = document.name;
    } else {
      feedback.contractNumber = null;
      feedback.contractWith = null;
      feedback.contractItem = null;
      feedback.contractDate = null;
      feedback.country = null;
      feedback.msp = null;
      feedback.contractSumm = null;
      feedback.buyer = null;
      feedback.feedback = null;
      feedback.documentExt = null;
      feedback.document = null;
      feedback.documentName = null;
    }

    dispatch(sendFeedback(feedback));
  };

  const countries = [
    'Австралия',
    'Австрия',
    'Азербайджан',
    'Албания',
    'Алжир',
    'Ангола',
    'Андорра',
    'Антигуа и Барбуда',
    'Аргентина',
    'Армения',
    'Афганистан',
    'Багамы',
    'Бангладеш',
    'Барбадос',
    'Бахрейн',
    'Белиз',
    'Белоруссия',
    'Бельгия',
    'Бенин',
    'Болгария',
    'Боливия',
    'Босния и Герцеговина',
    'Ботсвана',
    'Бразилия',
    'Бруней',
    'Буркина-Фасо',
    'Бурунди',
    'Бутан',
    'Вануату',
    'Великобритания',
    'Венгрия',
    'Венесуэла',
    'Восточный Тимор',
    'Вьетнам',
    'Габон',
    'Гаити',
    'Гайана',
    'Гамбия',
    'Гана',
    'Гватемала',
    'Гвинея',
    'Гвинея-Бисау',
    'Германия',
    'Гондурас',
    'Гренада',
    'Греция',
    'Грузия',
    'Дания',
    'Джибути',
    'Доминика',
    'Доминикана',
    'Египет',
    'Замбия',
    'Зимбабве',
    'Израиль',
    'Индия',
    'Индонезия',
    'Иордания',
    'Ирак',
    'Иран',
    'Ирландия',
    'Исландия',
    'Испания',
    'Италия',
    'Йемен',
    'Кабо-Верде',
    'Казахстан',
    'Камбоджа',
    'Камерун',
    'Канада',
    'Катар',
    'Кения',
    'Кипр',
    'Кирибати',
    'Китай',
    'Колумбия',
    'Коморы',
    'Республика Конго',
    'ДР Конго',
    'КНДР',
    'Корея',
    'Коста-Рика',
    'Кот-д’Ивуар',
    'Куба',
    'Кувейт',
    'Кыргызстан',
    'Лаос',
    'Латвия',
    'Лесото',
    'Либерия',
    'Ливан',
    'Ливия',
    'Литва',
    'Лихтенштейн',
    'Люксембург',
    'Маврикий',
    'Мавритания',
    'Мадагаскар',
    'Малави',
    'Малайзия',
    'Мали',
    'Мальдивы',
    'Мальта',
    'Марокко',
    'Маршалловы Острова',
    'Мексика',
    'Микронезия',
    'Мозамбик',
    'Молдавия',
    'Монако',
    'Монголия',
    'Мьянма',
    'Намибия',
    'Науру',
    'Непал',
    'Нигер',
    'Нигерия',
    'Нидерланды',
    'Никарагуа',
    'Новая Зеландия',
    'Норвегия',
    'ОАЭ',
    'Оман',
    'Пакистан',
    'Палау',
    'Панама',
    'Папуа — Новая Гвинея',
    'Парагвай',
    'Перу',
    'Польша',
    'Португалия',
    'Россия',
    'Руанда',
    'Румыния',
    'Сальвадор',
    'Самоа',
    'Сан-Марино',
    'Сан-Томе и Принсипи',
    'Саудовская Аравия',
    'Северная Македония',
    'Сейшелы',
    'Сенегал',
    'Сент-Винсент и Гренадины',
    'Сент-Китс и Невис',
    'Сент-Люсия',
    'Сербия',
    'Сингапур',
    'Сирия',
    'Словакия',
    'Словения',
    'США',
    'Соломоновы Острова',
    'Сомали',
    'Судан',
    'Суринам',
    'Сьерра-Леоне',
    'Таджикистан',
    'Таиланд',
    'Танзания',
    'Того',
    'Тонга',
    'Тринидад и Тобаго',
    'Тувалу',
    'Тунис',
    'Туркменистан',
    'Турция',
    'Уганда',
    'Узбекистан',
    'Украина',
    'Уругвай',
    'Фиджи',
    'Филиппины',
    'Финляндия',
    'Франция',
    'Хорватия',
    'ЦАР',
    'Чад',
    'Черногория',
    'Чехия',
    'Чили',
    'Швейцария',
    'Швеция',
    'Шри-Ланка',
    'Эквадор',
    'Экваториальная Гвинея',
    'Эритрея',
    'Эсватини',
    'Эстония',
    'Эфиопия',
    'ЮАР',
    'Южный Судан',
    'Ямайка',
    'Япония',
  ];

  const yesOrNo = ['Да', 'Нет'];
  const clientTypes = ['Юр. лицо', 'Физ. лицо'];
  const [document, setDocument] = useState<File | null>(null);
  const [country, setCountry] = useState(countries[0]);
  const [clientType, setClientType] = useState('Юр. лицо');
  const [msp, setMsp] = useState('Да');

  const [contr, setContr] = useState(false);

  const allFilled = contr
    ? !findValue(stateRating, feedbackFields.serviceStars) ||
      !findValue(stateRating, feedbackFields.workStars) ||
      !findValue(stateRating, feedbackFields.MECStars) ||
      !findValue(stateInput, feedbackFields.contractNumber) ||
      !findValue(stateInput, feedbackFields.contractWith) ||
      !findValue(stateInput, feedbackFields.contractItem) ||
      !findValue(stateInput, feedbackFields.contractDate) ||
      !findValue(stateInput, feedbackFields.contractSumm) ||
      !document
      ? false
      : true
    : !findValue(stateRating, feedbackFields.serviceStars) ||
      !findValue(stateRating, feedbackFields.workStars) ||
      !findValue(stateRating, feedbackFields.MECStars)
    ? false
    : true;

  return (
    <Modal
      className={styles.FeedbackWrapper}
      isShown={feedbackShown}
      // isShown={true}
      title={`Обратная связь по заявке № ${leadNumber} \n ${leadName}`}
      onHide={() => dispatch(feedbackSlice.actions.feedbackHide(false))}
    >
      {' '}
      {sending ? (
        <Skeleton rows={3} withTitle />
      ) : (
        <>
          {' '}
          <div className={styles.FeedbackRating}>
            {configFeadBack.rating.map((ratingField) => (
              <div
                key={ratingField.id}
                className={styles.FeedbackRatingMeasure}
              >
                {ratingField.title}
                <Rating
                  value={ratingField.value}
                  onClick={(value: number) => setReting(ratingField.id, value)}
                />
              </div>
            ))}
            <Textarea
              placeholder="Оставьте отзыв об услуге"
              onChange={(event) => {
                const sTarget = event.target as HTMLInputElement;
                textAreaChange(sTarget.value);
              }}
            />{' '}
          </div>
          <Checkbox
            label="Благодаря услуге удалось заключить контракт"
            name="Благодаря услуге удалось заключить контракт."
            checked={contr}
            onClick={() => setContr(!contr)}
          />
          <div className={styles.FeedbackOtherFields}>
            {contr && (
              <>
                {configFeadBack.input.map((inputField) => (
                  <input
                    className={styles.FeedbackInput}
                    key={inputField.id}
                    type={inputField.type}
                    placeholder={inputField.title}
                    onChange={(event) =>
                      setInput(inputField.id, event.target.value)
                    }
                    onFocus={(event) =>
                      (event.target.type = inputField.onFocus)
                    }
                  />
                ))}
                <p style={{ marginTop: '10px', color: 'grey' }}>Страна:</p>
                <Select
                  value={country}
                  onChange={(value) => {
                    setCountry(value);
                  }}
                  renderInputValue={(value) => (
                    <p className={styles.Select}>{value}</p>
                  )}
                >
                  {countries.map((dic: any) => (
                    <DropDownItem role="option" value={dic} key={dic}>
                      {dic}
                    </DropDownItem>
                  ))}
                </Select>
                <p style={{ marginTop: '20px', color: 'grey' }}>Тип клиента:</p>
                <Select
                  value={clientType}
                  onChange={(value) => {
                    setClientType(value);
                  }}
                  renderInputValue={(value) => (
                    <p className={styles.Select}>{value}</p>
                  )}
                >
                  {clientTypes.map((dic: any) => (
                    <DropDownItem role="option" value={dic} key={dic}>
                      {dic}
                    </DropDownItem>
                  ))}
                </Select>
                <p style={{ marginTop: '20px', color: 'grey' }}>
                  Наличие в реестре МСП:
                </p>
                <Select
                  value={msp}
                  onChange={(value) => {
                    setMsp(value);
                  }}
                  renderInputValue={(value) => (
                    <p className={styles.Select}>{msp}</p>
                  )}
                >
                  {yesOrNo.map((dic: any) => (
                    <DropDownItem role="option" value={dic} key={dic}>
                      {dic}
                    </DropDownItem>
                  ))}
                </Select>
                <p style={{ marginTop: '20px' }}></p>
                <DocumentUploader
                  documentName={document ? document.name : 'Загрузите контракт'}
                  // download={document ? true : false}
                  onUpload={async (file, uploadedAt) => {
                    setDocument(file);
                  }}
                  deletable
                  onDelete={async () => setDocument(null)}
                  documentType={''}
                />
              </>
            )}
          </div>
          {!allFilled ? (
            <p style={{ color: 'red' }}>
              Пожалуйста, заполните все поля и оценки
            </p>
          ) : (
            ''
          )}
          <Button
            onClick={() => feedbackHandler()}
            className={styles.FeedbackButton}
            disabled={!allFilled}
          >
            Отправить отзыв
          </Button>
        </>
      )}
    </Modal>
  );
};
