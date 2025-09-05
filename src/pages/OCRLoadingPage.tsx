import React, { useState } from 'react';
import styled from 'styled-components';
import hourglassIcon from '../assets/icons/hourglass-icon.svg';
import OCRLoading from '../components/OCRLoading/OCRLoading';
import type { OCRResult, ReceiptData, OCRApiInterface } from '../apis/ocrApi';
import { ocrApi } from '../apis/ocrApi';

type PageState = 'upload' | 'loading' | 'result';

const OCRLoadingPage: React.FC = () => {
  const [pageState, setPageState] = useState<PageState>('upload');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [receiptData, setReceiptData] = useState<ReceiptData | null>(null);

  const handleUpload = (file: File) => {
    setImageFile(file);
    setPageState('loading');
  };

  const handleSuccess = (result: OCRResult) => {
    try {
      const parsedData = (ocrApi as OCRApiInterface).parseReceiptData(result);
      setReceiptData(parsedData);
      setPageState('result');
    } catch (error) {
      // 파싱 실패해도 로그만 남기고 기본 데이터로 결과 페이지 표시
      console.error('영수증 데이터 파싱 실패, 기본 데이터 사용:', error);
      
      const defaultData: ReceiptData = {
        storeName: '상점명 없음',
        date: new Date().toLocaleDateString('ko-KR'),
        items: [
          {
            name: '상품 정보 없음',
            count: 1,
            unitPrice: 0,
            totalPrice: 0,
          }
        ],
        totalAmount: 0,
      };
      
      setReceiptData(defaultData);
      setPageState('result');
    }
  };

  const handleRetry = () => {
    setPageState('upload');
    setImageFile(null);
    setReceiptData(null);
  };

  const handleConfirm = () => {
    // 영수증 데이터를 다음 단계로 전달
    console.log('확인된 영수증 데이터:', receiptData);
    // TODO: 다음 페이지로 이동하거나 데이터 저장
  };

  const renderContent = () => {
    switch (pageState) {
      case 'upload':
        return <ReceiptUpload onUpload={handleUpload} />;
      
      case 'loading':
        return imageFile ? (
          <OCRLoadingPageLayout>
            <LoadingImage src={hourglassIcon} alt="로딩 중" />
            <OCRLoading
              imageFile={imageFile}
              onSuccess={handleSuccess}
            />
          </OCRLoadingPageLayout>
        ) : null;
      
      case 'result':
        return receiptData ? (
          <ReceiptResult
            receiptData={receiptData}
            onRetry={handleRetry}
            onConfirm={handleConfirm}
          />
        ) : null;
      
      default:
        return <ReceiptUpload onUpload={handleUpload} />;
    }
  };

  return renderContent();
};

export default OCRLoadingPage;

const OCRLoadingPageLayout = styled.div`
  background-color: #F44336;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  overflow: hidden;
  box-sizing: border-box;
`;

const LoadingImage = styled.img`
  width: 39px;
  height: 39px;
  flex-shrink: 0;
  margin-bottom: 50px;
  animation: spin 2s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;