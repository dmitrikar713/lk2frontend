import React, { FC, useEffect, useState } from 'react';
// import cx from 'classnames';

import styles from './Substage.module.scss';
import { DocumentUploader } from '../DocumentUploader/DocumentUploader';
import { RequestSubstages } from 'src/entities/Subjects';
import { RequestStatus } from 'src/entities/Statuses';
import {
  requestSlice,
  UploadedDocuments,
} from 'src/pages/Requests/Request/RequestSlice';
import { useAppDispatch } from 'src/hooks/redux';
import { setDocumentProfile } from 'src/common/utils/setDocumentProfile';
import Toast from '../Toast';

interface SubstageProps {
  substage: RequestSubstages;
  status: string;
  docs: UploadedDocuments;
}

export const Substage: FC<SubstageProps> = ({ substage, status, docs }) => {
  const dispatch = useAppDispatch();
  // eslint-disable-next-line
  console.log('documents', substage);
  const previewDocument = (downloadUrl: string | undefined) => {
    if (downloadUrl) {
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      link.remove();
    } else {
      alert('Пустой документ');
    }
  };

  const activedocs = substage.status === RequestStatus.inWork && docs;

  const [documents, setDocuments] = useState({
    ...activedocs,
  });

  useEffect(() => {
    if (substage.status === RequestStatus.inWork)
      setDocuments({ ...activedocs });
    else setDocuments({ ...activedocs, ...substage.history });
  }, [substage, docs]);
  // // eslint-disable-next-line
  // console.log('substage.status', substage);
  // console.log('substage.history', substage.history);
  // console.log('docs', docs);
  // console.log('documents', documents);
  return (
    <div className={styles.SubstageRequest}>
      <div className={styles.SubstageRequestHeader}>
        <div
          className={
            substage.status === RequestStatus.inWork
              ? styles.SubstageRequestInWork
              : ''
          }
        >
          {substage.title}
          <div>
            {documents &&
              Object.keys(documents).map((doc, index) => (
                <div
                  key={`${index + 1}`}
                  className={styles.RequestWrapperSubstageBody}
                >
                  <div className={styles.RequestWrapperAddComment}>
                    {documents[doc].comment}
                  </div>
                  <DocumentUploader
                    documentName={String(documents[doc].title)}
                    documentType={documents[doc].fileName.substring(
                      documents[doc].fileName.lastIndexOf('.') + 1
                    )}
                    onUpload={async (file, uploadedAt) => {
                      dispatch(
                        requestSlice.actions.setDocument(
                          await setDocumentProfile(
                            doc,
                            file,
                            uploadedAt,
                            documents[doc].title
                          )
                        )
                      );
                      Toast('Документ загружен', {
                        type: 'success',
                      });
                    }}
                    readonly={String(documents[doc].title)
                      .toLowerCase()
                      .includes('акт')}
                    documentUploaded={documents[doc]}
                    change
                    onDownload={() => previewDocument(documents[doc].url)}
                    download
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
      <div className={styles.SubstageRequestFooter}>&nbsp;</div>
    </div>
  );
};
