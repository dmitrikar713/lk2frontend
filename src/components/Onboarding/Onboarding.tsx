import { Steps } from 'intro.js-react';
import React, { FC, useEffect, useRef, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { RoutePaths } from 'src/entities/Routes';
import { useAppDispatch, useAppSelector } from 'src/hooks/redux';
import { profileSlice } from 'src/pages/Profile/ProfileSlice';

import styles from './Onboarding.module.scss';

export const Onboarding: FC = memo(() => {
  const navigate = useNavigate();
  const stepsUnmutableContainer = useRef<any>(null);
  const options = {
    nextLabel: 'Далее',
    doneLabel: 'Готово',
    exitOnOverlayClick: false,
    disableInteraction: true,
    hidePrev: true,
    showBullets: false,
    overlayOpacity: 0.9,
    tooltipClass: styles.Tooltip,
  };

  let steps = [
    {
      element: '.root',
      intro: (
        <div className={styles.OnboardingStepWrapper}>
          <div className={styles.OnboardingStepHeader}>
            Добро пожаловать в личный кабинет московского предпринимателя
          </div>
          <div className={styles.OnboardingStepBody}>
            Чтобы познакомиться со всеми функциями нажмите далее
          </div>
        </div>
      ),
      position: 'top',
      tooltipClass: styles.TooltipStep0,
      highlightClass: styles.HighlightStep0,
    },
    {
      element: '.OnboardingStep1',
      intro: (
        <div className={styles.OnboardingStepWrapper}>
          <div className={styles.OnboardingStepHeader}>ЗАЯВКИ</div>
          <div className={styles.OnboardingStepArrow} />
          <div className={styles.OnboardingStepBody}>
            Здесь содержится информация о всех заявках
          </div>
        </div>
      ),
      position: 'top',
      tooltipClass: styles.TooltipStep1,
      highlightClass: styles.HighlightStep1,
    },
    {
      element: '.OnboardingStep2',
      intro: (
        <div className={styles.OnboardingStepWrapper}>
          <div className={styles.OnboardingStepHeader}>ПРОФИЛЬ КОМПАНИИ</div>
          <div className={styles.OnboardingStepArrow} />
          <div className={styles.OnboardingStepBody}>
            В профиле компании содержится:
          </div>
          <li>данные компании и представителя</li>
          <li>документы компании</li>
        </div>
      ),
      position: 'bottom',
      tooltipClass: styles.TooltipStep2,
      highlightClass: styles.HighlightStep2,
    },
  ];

  const profile = useAppSelector((state) => state.profileReducer.profile);

  const dispatch = useAppDispatch();

  const handleBeforeChange = (nextStepIndex: number) => {
    if (nextStepIndex === 1) {
      (steps as any).updateStepElement(nextStepIndex);
    }
    if (nextStepIndex === 2) {
      stepsUnmutableContainer.current = steps;
      navigate(RoutePaths.PROFILE);
      (stepsUnmutableContainer.current as any).updateStepElement(nextStepIndex);
    }
  };

  const handleAfterChange = (nextStepIndex: number) => {
    if (nextStepIndex === 2) {
      (stepsUnmutableContainer.current as any).updateStepElement(nextStepIndex);
    }
  };

  const handleExit = () => {
    dispatch(
      profileSlice.actions.setProfile({ ...profile, onboarding: false })
    );
  };

  useEffect(() => {
    if (profile.onboarding) {
      navigate(RoutePaths.REQUESTS);
    }
  }, [profile.onboarding]);

  return (
    <>
      {steps && (
        <Steps
          enabled={Boolean(profile.onboarding)}
          steps={steps as any}
          initialStep={0}
          onBeforeChange={handleBeforeChange}
          onAfterChange={handleAfterChange}
          onExit={handleExit}
          options={options}
          ref={(newSteps: any) => (steps = newSteps)}
        />
      )}
    </>
  );
});

Onboarding.displayName = 'Onboarding';
