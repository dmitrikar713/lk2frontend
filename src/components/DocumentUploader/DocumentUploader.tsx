import React, { FC, SyntheticEvent, useEffect, useRef, useState } from 'react';
import { UploadedDocument } from 'src/pages/Requests/Request/RequestSlice';
import { DeleteIcon } from 'src/styles/icons/delete';
import { DoubleArrowIcon } from 'src/styles/icons/doubleArrow';
import { PDFIcon } from 'src/styles/icons/pdf';
import { FileUploader } from '../FileUploader/FileUploader';
import cx from 'classnames';

import styles from './DocumentUploader.module.scss';
import { DocumentStatuses } from 'src/entities/Statuses';
import { DownloadIcon } from 'src/styles/icons/download';
import { ThreeDots } from '../ThreeDots/ThreeDots';
import { WordIcon } from 'src/styles/icons/word';
import { ExcelIcon } from 'src/styles/icons/excel';
import { WinrarIcon } from 'src/styles/icons/winrar';
import { XMLIcon } from 'src/styles/icons/xml';

interface DocumentUploaderProps {
  readonly?: boolean;
  documentName: string;
  documentType: string;
  documentUploaded?: UploadedDocument;
  deletable?: boolean;
  extraActions?: boolean;
  isData?: boolean;
  download?: boolean;
  onUpload?: (file: File, uploadAt: string) => void;
  onDelete?: () => void;
  onExtraActions?: () => void;
  onDownload?: () => void;
  hint?: string;
  change?: boolean;
}

interface DocumentCardProps {
  documentName: string;
  documentType: string;
  documentUploaded?: UploadedDocument;
  loaded: boolean;
  modifiedDate: string;
  deletable?: boolean;
  extraActions?: boolean;
  dataDocument?: boolean;
  download?: boolean;
  onDelete?: () => void;
  onExtraActions?: () => void;
  onDownload?: () => void;
  change?: boolean;
}

const DocumentCard: FC<DocumentCardProps> = ({
  documentUploaded,
  documentName,
  documentType,
  loaded,
  modifiedDate,
  deletable,
  extraActions,
  dataDocument,
  download,
  onDelete,
  onExtraActions,
  onDownload,
  change,
}) => {
  const handleDelete = (e: SyntheticEvent) => {
    if (deletable && onDelete) {
      e.preventDefault();
      onDelete();
    }
  };

  const handleExtraActions = (e: SyntheticEvent) => {
    if (extraActions && onExtraActions) {
      e.preventDefault();
      onExtraActions();
    }
  };

  const handleDownload = (e: SyntheticEvent) => {
    if (download && onDownload) {
      e.preventDefault();
      onDownload();
    }
  };

  return (
    <div className={styles.DocumentCard}>
      {loaded ? (
        <div className={styles.DocumentCardWrapper}>
          <div className={styles.DocumentCardContent}>
            <div className={styles.DocumentCardFileName}>
              {documentType === 'pdf' && (
                <PDFIcon className={styles.DocumentCardDocs} />
              )}
              {(documentType === 'doc' || documentType === 'docx') && (
                <WordIcon className={styles.DocumentCardDocs} />
              )}
              {(documentType === 'xls' || documentType === 'xlsx') && (
                <ExcelIcon className={styles.DocumentCardDocs} />
              )}
              {(documentType === 'rar' || documentType === 'zip') && (
                <WinrarIcon className={styles.DocumentCardDocs} />
              )}
              {documentType === 'xml' && (
                <XMLIcon className={styles.DocumentCardDocs} />
              )}

              {`${documentName}.${documentType}`}
            </div>
            <div>
              <div
                className={
                  documentUploaded?.status === DocumentStatuses.NotSigned
                    ? styles.DocumentCardNotSigned
                    : documentUploaded?.status === DocumentStatuses.NotVerified
                    ? styles.DocumentCardNotVerified
                    : styles.DocumentCardVerified
                }
              >
                {documentUploaded?.status === DocumentStatuses.NotSigned &&
                  'Не подписано'}
                {documentUploaded?.status === DocumentStatuses.Signed && (
                  <DoubleArrowIcon />
                )}
                {documentUploaded?.status === DocumentStatuses.Signed &&
                  'Подписано'}
                {documentUploaded?.status ===
                  DocumentStatuses.SentForVerified &&
                  'Отправлен на верификацию'}
                {documentUploaded?.status === DocumentStatuses.Verified &&
                  'Верифицирован'}
                {documentUploaded?.status === DocumentStatuses.NotVerified &&
                  'Не верифицирован'}
              </div>
              {dataDocument && (
                <div className={styles.DocumentCardDate}>
                  {documentUploaded?.uploadedAt || modifiedDate}
                </div>
              )}
            </div>
          </div>
          {deletable && (
            <div onClick={handleDelete}>
              <DeleteIcon className={styles.DocumentCardDelete} />
            </div>
          )}
          {download && (
            <div
              className={cx(styles.DocumentCardExtraActions, {
                [styles.Bottom]: deletable,
              })}
              onClick={handleDownload}
            >
              <DownloadIcon />
            </div>
          )}
          {extraActions && (
            <ThreeDots
              className={
                deletable
                  ? styles.DocumentCardThreeDotsWithOthers
                  : styles.DocumentCardThreeDots
              }
              onClick={handleExtraActions}
            />
          )}
          {change && !documentName.toLowerCase().includes('акт') && (
            <div className={styles.DocumentCardButtonWrapper}>
              <div className={styles.DocumentCardButton}>+</div>
              <span className={styles.DocumentCardButtonLabel}>
                Изменить документ
              </span>
            </div>
          )}
        </div>
      ) : (
        <div className={styles.DocumentCardWrap}>
          <div>
            <div className={styles.DocumentCardPlaceholder}>
              Документ не загружен
            </div>
            <div className={styles.DocumentCardName}>{documentName}</div>
          </div>
          <div className={styles.DocumentCardButtonWrapper}>
            <div className={styles.DocumentCardButton}>+</div>
            <span className={styles.DocumentCardButtonLabel}>
              Загрузить документ
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export const DocumentUploader: FC<DocumentUploaderProps> = ({
  readonly,
  documentName,
  documentType,
  documentUploaded,
  deletable,
  extraActions,
  isData,
  download,
  onUpload,
  onDelete,
  onExtraActions,
  onDownload,
  hint,
  change,
}) => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [modifiedDate, setModifiedDate] = useState('');

  const uploaderRef = useRef<HTMLInputElement>(null);

  const handleDelete = () => {
    if (uploaderRef.current) {
      uploaderRef.current.value = '';
    }
    onDelete && onDelete();
  };

  const handleUpload = (fList: FileList) => {
    const file = fList[0];
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const uploadedAt = `${day <= 9 ? '0' + day : day}.${
      month <= 9 ? '0' + month : month
    }.${year}`;

    setModifiedDate(uploadedAt);
    setLoaded(true);
    onUpload && onUpload(file, uploadedAt);
  };

  useEffect(() => {
    setLoaded(
      Boolean(documentUploaded?.file) || Boolean(documentUploaded?.url)
    );
  }, [documentUploaded]);

  return (
    <FileUploader
      uploaderRef={uploaderRef}
      onUpload={handleUpload}
      hint={hint}
      customRender={
        <DocumentCard
          documentName={documentName}
          documentType={documentType}
          loaded={loaded}
          modifiedDate={modifiedDate}
          documentUploaded={documentUploaded}
          deletable={deletable}
          extraActions={extraActions}
          download={download}
          onDelete={handleDelete}
          dataDocument={isData}
          onExtraActions={onExtraActions}
          onDownload={onDownload}
          change={change}
        />
      }
      disabled={readonly}
    />
  );
};
