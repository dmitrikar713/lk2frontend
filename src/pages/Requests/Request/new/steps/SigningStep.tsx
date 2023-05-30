import React, { FC, Fragment } from 'react';
import { Button, ButtonType, Type } from 'src/components/Button/Button';
import { Card } from 'src/components/Card/Card';
import { DocumentUploader } from 'src/components/DocumentUploader/DocumentUploader';
import { useAppSelector } from 'src/hooks/redux';
import { Skeleton } from 'src/components/Skeleton/Skeleton';

import styles from '../NewRequest.module.scss';

interface SigningStepProps {
  onSubmit: (data: any) => void;
  onClick: (data: any) => void;
  submitTitle?: string;
  buttonDisabled?: boolean;
}

export const SigningStep: FC<SigningStepProps> = ({
  onSubmit,
  onClick,
  submitTitle,
  buttonDisabled = false,
}) => {
  const {
    request: {
      uploadedDocuments,
      formConfig: { dictionary },
    },
    isLoading,
  } = useAppSelector((state) => state.requestReducer);

  const previewDocument = (data: string | null, fileName: string | null) => {
    const link = document.createElement('a');
    link.download = fileName ? fileName : '';
    link.href = data ? data : '';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    link.remove();
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
                  documentName={dictionary[key]}
                  download
                  onDownload={() =>
                    previewDocument(
                      uploadedDocuments[key].file,
                      uploadedDocuments[key].fileName
                    )
                  }
                  documentType={uploadedDocuments[key].type}
                  readonly
                  documentUploaded={uploadedDocuments[key]}
                />
              )}
            </Fragment>
          ))}
        </div>
      </Card>
      <div className={styles.RequestControls}>
        <Button
          disabled={buttonDisabled}
          onClick={() => onSubmit('sign docs')}
          checkMobile
        >
          {submitTitle}
        </Button>
        <Button
          type={ButtonType.Secondary}
          buttonType={Type.Button}
          onClick={() => onClick(-2)}
        >
          Изменить
        </Button>
      </div>
    </>
  );
};
