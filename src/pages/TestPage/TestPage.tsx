import React, { FC, ReactNode, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiClient } from 'src/api/client/ApiClient';
import { DocumentUploader } from 'src/components/DocumentUploader/DocumentUploader';
import { useAppDispatch } from 'src/hooks/redux';

const TestPage = () => {
  const [file, setFile] = useState(null);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const storage = localStorage;
  const getFile = async () => {
    try {
      const answers = ['ans1', 'ans2'];
      const response: any = await apiClient.post('/exports/testpdf', answers);
      console.log('resp:');
      console.log(response);

      // if (!response.ok) {
      //   throw new Error('Request failed');
      // }

      // const pdfBlob = await response.buffer();
      setFile(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    getFile();
  }, []);

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
  return <p>test</p>;
};

export default TestPage;
