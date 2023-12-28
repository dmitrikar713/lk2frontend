import React, { FC, useEffect, useState } from 'react';
import styles from './Settings.module.scss';
import { Card } from 'src/components/Card/Card';
import { Checkbox } from 'src/components/Checkbox/Checkbox';
import { Button } from 'src/components/Button/Button';

export const Settings: FC = () => {
  const [statusChange, setStatusChange] = useState(true);
  const [additional, setAdditional] = useState(true);
  const [act, setAct] = useState(true);
  const [rate, setRate] = useState(true);

  const save = () => {
    console.log('saved');
  };
  return (
    <div className={styles.Settings}>
      <Card>
        <h3>Какие уведомления показывать:</h3>
        <Checkbox
          checked={statusChange}
          onClick={() => setStatusChange(!statusChange)}
          label="Изменение статуса заявки"
        />
        <Checkbox
          checked={additional}
          onClick={() => setAdditional(!additional)}
          label="Необходимость выполнить дополнительное действие, загрузить документы в заявку"
        />
        <Checkbox
          checked={act}
          onClick={() => setAct(!act)}
          label="Необходимо подписать акт"
        />
        <Checkbox
          checked={rate}
          onClick={() => setRate(!rate)}
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
