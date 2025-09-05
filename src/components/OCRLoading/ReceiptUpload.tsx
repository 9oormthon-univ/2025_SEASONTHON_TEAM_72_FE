import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

interface ReceiptUploadProps {
  onUpload: (file: File) => void;
}

const ReceiptUpload: React.FC<ReceiptUploadProps> = ({ onUpload }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const navigate = useNavigate();

  const handleFileSelect = (file: File) => {
    // 파일 유효성 검사 - 실패해도 경고만 로그에 남기고 진행
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/bmp'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!allowedTypes.includes(file.type)) {
      console.warn('지원하지 않는 이미지 형식이지만 처리를 계속합니다:', file.type);
    }

    if (file.size > maxSize) {
      console.warn('이미지 크기가 큽니다:', file.size, 'bytes');
    }

    // 어떤 파일이든 업로드 진행
    onUpload(file);
  };

  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <UploadContainer>
      <UploadArea
        dragActive={dragActive}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileInputChange}
          style={{ display: 'none' }}
        />
        
        <UploadIcon>📷</UploadIcon>
        <UploadTitle>영수증 사진을 업로드하세요</UploadTitle>
        <UploadDescription>
          드래그 앤 드롭하거나 클릭하여 파일을 선택하세요
        </UploadDescription>
        <UploadSubDescription>
          JPG, PNG, GIF, BMP 형식, 최대 5MB
        </UploadSubDescription>
      </UploadArea>

      <ButtonGroup>
        <BackButton onClick={() => navigate(-1)}>
          뒤로가기
        </BackButton>
      </ButtonGroup>
    </UploadContainer>
  );
};

export default ReceiptUpload;

const UploadContainer = styled.div`
   background-color: #F44336;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;

const UploadArea = styled.div<{ dragActive: boolean }>`
  width: 320px;
  height: 220px;
  border: 2px dashed ${props => props.dragActive ? '#F44336' : '#ccc'};
  border-radius: 12px;
  background-color: ${props => props.dragActive ? '#fff5f5' : '#fff'};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 30px;

  &:hover {
    border-color: #F44336;
    background-color: #fff5f5;
  }
`;

const UploadIcon = styled.div`
  font-size: 48px;
  margin-bottom: 16px;
`;

const UploadTitle = styled.h2`
  font-family: NanumSquare_ac;
  font-weight: 800;
  font-size: 20px;
  color: #333;
  margin: 0 0 8px 0;
  text-align: center;
`;

const UploadDescription = styled.p`
  font-family: NanumSquare_ac;
  font-weight: 400;
  font-size: 14px;
  color: #666;
  margin: 0 0 4px 0;
  text-align: center;
`;

const UploadSubDescription = styled.p`
  font-family: NanumSquare_ac;
  font-weight: 400;
  font-size: 12px;
  color: #999;
  margin: 0;
  text-align: center;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
`;

const BackButton = styled.button`
  padding: 12px 24px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-family: NanumSquare_ac;
  font-weight: 600;
  font-size: 14px;
  color: #666;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f5f5f5;
    border-color: #ccc;
  }
`;