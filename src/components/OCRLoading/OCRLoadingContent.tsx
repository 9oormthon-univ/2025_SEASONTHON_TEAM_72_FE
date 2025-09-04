// src/components/OCR/OCRLoadingContent.tsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ocrApi, type OCRResult } from '../../apis/ocrApi';

interface OCRLoadingContentProps {
  imageFile: File;
  onSuccess: (result: OCRResult) => void;
  onError: (error: string) => void;
}

const OCRLoadingContent: React.FC<OCRLoadingContentProps> = ({
  imageFile,
  onSuccess,
  onError,
}) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const processOCR = async () => {
      try {
        // 파일 유효성 검사
        const validation = ocrApi.validateImageFile(imageFile);
        if (!validation.isValid) {
          onError(validation.error || '이미지 파일이 유효하지 않습니다.');
          return;
        }

        // 진행률 시뮬레이션
        const progressInterval = setInterval(() => {
          setProgress((prev) => {
            if (prev >= 90) {
              clearInterval(progressInterval);
              return 90;
            }
            return prev + Math.random() * 15;
          });
        }, 500);

        // OCR 처리 시작
        const result = await ocrApi.processReceiptImage(imageFile);
        
        // 처리 완료
        clearInterval(progressInterval);
        setProgress(100);
        
        // 성공 콜백 호출
        setTimeout(() => {
          onSuccess(result);
        }, 500);

      } catch (error) {
        setProgress(0);
        const errorMessage = error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.';
        onError(errorMessage);
      }
    };

    processOCR();

    // 컴포넌트 언마운트 시 정리
    return () => {
      setProgress(0);
    };
  }, [imageFile, onSuccess, onError]);

  return (
    <>
      <Title>영수증을 추출하고 있어요...</Title>
      <LoadingBar>
        <LoadingProgress progress={progress} />
        <LoadingShine />
      </LoadingBar>
    </>
  );
};

export default OCRLoadingContent;

const Title = styled.h1`
  font-family: NanumSquare_ac;
  font-weight: 800;
  font-size: 20px;
  line-height: 130%;
  text-align: center;
  color: #FFFFFF;
  margin-top: 0;
  margin-bottom: 20px;
`;

const LoadingBar = styled.div`
  width: 173px;
  height: 7px; 
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 3.5px; 
  flex-shrink: 0;
  margin-bottom: 30px;
  position: relative;
  overflow: hidden;
`;

const LoadingProgress = styled.div<{ progress: number }>`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background-color: #FFF;
  border-radius: 3.5px;
  width: ${props => props.progress}%;
  transition: width 0.3s ease-out;
`;

const LoadingShine = styled.div`
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
  animation: loading 2s infinite;
  
  @keyframes loading {
    0% { left: -100%; }
    100% { left: 100%; }
  }
`;
