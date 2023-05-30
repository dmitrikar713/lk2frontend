import React, { FC, Fragment, useState } from 'react';
import { Button, ButtonType, Type } from 'src/components/Button/Button';
import { Card } from 'src/components/Card/Card';
import { DocumentUploader } from 'src/components/DocumentUploader/DocumentUploader';
import { useAppDispatch, useAppSelector } from 'src/hooks/redux';
import { requestSlice } from '../../RequestSlice';
import { Skeleton } from 'src/components/Skeleton/Skeleton';

import styles from '../NewRequest.module.scss';
import { setDocumentProfile } from 'src/common/utils/setDocumentProfile';

interface SendStepProps {
  onSubmit: (data: any) => void;
  submitTitle?: string;
}

export const SendStep: FC<SendStepProps> = ({ onSubmit, submitTitle }) => {
  const dispatch = useAppDispatch();
  const {
    request: {
      uploadedDocuments,
      formConfig: { dictionary },
    },
    isLoading,
  } = useAppSelector((state) => state.requestReducer);

  const [btnDisabled, setBtnDisabled] = useState(false);

  const handleSubmitForm = () => {
    setBtnDisabled(true);
    onSubmit('sign docs');
  };

  return isLoading ? (
    <>
      <Skeleton rows={3} withTitle />
    </>
  ) : (
    <>
      <Card title="Документы" collapsible styleWithBorder>
        <div className={styles.Grid}>
          {Object.keys(uploadedDocuments).map((key) => (
            <Fragment key={key}>
              {dictionary[key] && uploadedDocuments[key].type !== 'xml' && (
                <DocumentUploader
                  readonly
                  documentName={dictionary[key]}
                  documentType={uploadedDocuments[key].type}
                  onUpload={async (file, uploadedAt) =>
                    dispatch(
                      requestSlice.actions.setDocument(
                        await setDocumentProfile(key, file, uploadedAt)
                      )
                    )
                  }
                  documentUploaded={uploadedDocuments[key]}
                />
              )}
            </Fragment>
          ))}
        </div>
      </Card>
      <div className={styles.RequestControls}>
        <Button disabled={btnDisabled} onClick={() => handleSubmitForm()}>
          {submitTitle}
        </Button>
        <Button
          type={ButtonType.Secondary}
          buttonType={Type.Button}
          onClick={() => onSubmit(-3)}
        >
          Изменить
        </Button>
      </div>
    </>
  );
};
