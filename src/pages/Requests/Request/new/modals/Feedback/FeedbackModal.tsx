import React, { FC, useState } from 'react';
import { Button } from 'src/components/Button/Button';
import { Modal } from 'src/components/Modal/Modal';
import { Rating } from 'src/components/Rating/Rating';
import { Textarea } from 'src/components/Textarea/Textarea';
import { useAppDispatch, useAppSelector } from 'src/hooks/redux';
import { configFeadBack, feedbackFields } from './config/config';
import { feedbackSlice, SendFeedback } from './FeedbackSlice';

import styles from './FeedbackModal.module.scss';
import { sendFeedback } from 'src/store/thunks/feedback/SendFeedback';

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
  } = useAppSelector((state) => state.feedbackReducer);

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
    feedback.country = String(findValue(stateInput, feedbackFields.country));
    feedback.contractSumm = Number(
      findValue(stateInput, feedbackFields.contractSumm)
    );
    feedback.buyer = 'Юр. лицо';
    feedback.feedback = textAreaValue;
    dispatch(sendFeedback(feedback));
  };

  return (
    <Modal
      className={styles.FeedbackWrapper}
      isShown={feedbackShown}
      title={`Обратная связь по заявке № ${leadNumber} \n ${leadName}`}
      onHide={() => dispatch(feedbackSlice.actions.feedbackHide(false))}
    >
      <div className={styles.FeedbackRating}>
        {configFeadBack.rating.map((ratingField) => (
          <div key={ratingField.id} className={styles.FeedbackRatingMeasure}>
            {ratingField.title}
            <Rating
              value={ratingField.value}
              onClick={(value: number) => setReting(ratingField.id, value)}
            />
          </div>
        ))}
      </div>
      <div className={styles.FeedbackOtherFields}>
        {feedbackContract &&
          configFeadBack.input.map((inputField) => (
            <input
              className={styles.FeedbackInput}
              key={inputField.id}
              type={inputField.type}
              placeholder={inputField.title}
              onChange={(event) => setInput(inputField.id, event.target.value)}
              onFocus={(event) => (event.target.type = inputField.onFocus)}
            />
          ))}
        <Textarea
          placeholder="Оставьте отзыв об услуге"
          onChange={(event) => {
            const sTarget = event.target as HTMLInputElement;
            textAreaChange(sTarget.value);
          }}
        />
        <Button
          onClick={() => feedbackHandler()}
          className={styles.FeedbackButton}
        >
          Отправить отзыв
        </Button>
      </div>
    </Modal>
  );
};
