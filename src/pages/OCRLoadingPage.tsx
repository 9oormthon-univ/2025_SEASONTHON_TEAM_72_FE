import React from 'react';
import styled from 'styled-components';
import hourglassIcon from '../assets/icons/hourglass-icon.svg';
import OCRLoadingContent from '../components/OCRLoading/OCRLoadingContent';
import type { OCRResult } from '../apis/ocrApi';

const OCRLoadingPage: React.FC = () => {
  // 데모용: 더미 이미지 파일 생성 (백엔드/라우팅 없이 화면만 보기)
  const demoFileRef = React.useRef<File | null>(null);
  if (!demoFileRef.current) {
    demoFileRef.current = new File(['demo'], 'demo.png', { type: 'image/png' });
  }

  const handleSuccess = (result: OCRResult) => {
    console.log('OCR 성공 (데모 모드):', result);
    // 화면 이동 없음
  };

  const handleError = (error: string) => {
    console.error('OCR 실패 (데모 모드):', error);
    // 화면 이동 없음
  };

  return (
    <OCRLoadingPageLayout>
      <LoadingImage src={hourglassIcon} alt="로딩 중" />
      <OCRLoadingContent
        imageFile={demoFileRef.current}
        onSuccess={handleSuccess}
        onError={handleError}
      />
    </OCRLoadingPageLayout>
  );
};

export default OCRLoadingPage;

const OCRLoadingPageLayout = styled.div`
  background-color: #F44336;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  overflow: hidden;
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