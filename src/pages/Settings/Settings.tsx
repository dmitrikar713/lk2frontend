import React, { FC, useEffect, useState } from 'react';
import styles from './Settings.module.scss';
import { Card } from 'src/components/Card/Card';
import { Checkbox } from 'src/components/Checkbox/Checkbox';
import { Button } from 'src/components/Button/Button';
import { useDispatch } from 'react-redux';
import { updateSettings } from 'src/store/thunks/profile/UpdateSettings';
import { RoutePaths } from 'src/entities/Routes';
import { Breadcrumbs } from 'src/components/Breadcrumbs/Breadcrumbs';
import { useAppSelector } from 'src/hooks/redux';
import { profileSlice } from '../Profile/ProfileSlice';
import Toast from 'src/components/Toast';

export const Settings: FC = () => {
  const { settings } = useAppSelector(
    (state) => state.profileReducer.profile.organization
  );
  const setSettings = (newSettings) => {
    dispatch(profileSlice.actions.setSettings(newSettings));
  };
  const dispatch = useDispatch();

  const save = () => {
    dispatch(updateSettings(settings));
  };

  return (
    <div className={styles.Settings}>
      <Card>
        <Breadcrumbs
          withArrowBack
          breadcrumbList={[{ title: 'Профиль', path: RoutePaths.PROFILE }]}
        />
        <h3>Какие уведомления показывать:</h3>
        <Checkbox
          checked={settings.statusChanges}
          onClick={() =>
            setSettings({
              ...settings,
              statusChanges: !settings.statusChanges,
            })
          }
          label="Изменение статуса заявки"
        />
        <Checkbox
          checked={settings.additionalDocs}
          onClick={() =>
            setSettings({
              ...settings,
              additionalDocs: !settings.additionalDocs,
            })
          }
          label="Необходимость выполнить дополнительное действие, загрузить документы в заявку"
        />
        <Checkbox
          checked={settings.signAct}
          onClick={() =>
            setSettings({
              ...settings,
              signAct: !settings.signAct,
            })
          }
          label="Необходимо подписать акт"
        />
        <Checkbox
          checked={settings.feedback}
          onClick={() =>
            setSettings({
              ...settings,
              feedback: !settings.feedback,
            })
          }
          label="Необходимо оценить услугу"
        />
        <Button onClick={save}>Сохранить</Button>
      </Card>
    </div>
  );
};

// Изменение статуса заявки;
// • Необходимость выполнить дополнительное действие, загрузить документы в
// заявку;
// • Необходимо подписать акт;
// • Необходимо оценить услугу.
