import styled from "styled-components";
import React, { useRef } from "react";
import StartSettlementImage from "../../assets/images/start_settlement_img.svg";

const StartSettlementContent = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLoadReceiptClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
    const selectedFile = files[0];
    
    // 파일 크기 검증 (5MB 제한)
    if (selectedFile.size > 5 * 1024 * 1024) {
      alert('파일 크기가 너무 큽니다. 5MB 이하의 파일을 선택해주세요.');
      return;
    }
    
    // 파일 타입 검증
    if (!selectedFile.type.startsWith('image/')) {
      alert('이미지 파일만 업로드 가능합니다.');
      return;
    }
    
    console.log("선택된 파일:", selectedFile);
    }
  };

  return (
    <StartSettlementLayout>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileSelect}
        style={{ display: "none" }} 
        aria-label="영수증 이미지 선택"
      />

      <TopSection>
        <Title>새로운 정산을 시작해볼까요?</Title>
        <Subtitle>정산할 품목을 어떤 방식으로 가져올지 정해주세요.</Subtitle>
        <ImageContainer>
          <img src={StartSettlementImage} alt="정산 시작 이미지" />
        </ImageContainer>
      </TopSection>
      <ButtonContainer>
        <ActionButton onClick={handleLoadReceiptClick}>
          <ButtonText>영수증 불러오기</ButtonText>
        </ActionButton>
        <ActionButton>
          <ButtonText>직접 작성하기</ButtonText>
        </ActionButton>
      </ButtonContainer>
      <ParticipationCode>
        <CodeText>참여코드를 갖고 계신가요?</CodeText>
      </ParticipationCode>
    </StartSettlementLayout>
  );
};

export default StartSettlementContent;

const StartSettlementLayout = styled.div`
  background-color: #FFFFFF;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;

const TopSection = styled.div`
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

const Title = styled.h1`
  color: #000;
  text-align: center;
  font-family: "NanumSquare", sans-serif;
  font-size: 20px;
  font-style: normal;
  font-weight: 800;
  line-height: 130%;
  margin-bottom: 20px;
`;

const Subtitle = styled.p`
  color: #000;
  text-align: center;
  font-family: "NanumSquare", sans-serif;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: 130%;
  margin: 0; /* 기본 마진 제거 */
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 70px;
  margin-bottom: 160px;
  
  img {
    max-width: 100%;
    height: auto;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  max-width: 352px;
  margin-bottom: 20px;
  box-sizing: border-box;
`;

const ActionButton = styled.button`
  width: 100%;
  height: 50px;
  background-color: #F44336;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background-color: #c0392b;
  }
  
  &:active {
    transform: translateY(1px);
  }
`;

const ButtonText = styled.span`
  color: #FFF;
  text-align: center;
  font-family: "NanumSquare", sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 800;
  line-height: 130%;
`;

const ParticipationCode = styled.div`
  cursor: pointer;
  padding: 10px;
  
  &:hover {
    opacity: 0.8;
  }
`;

const CodeText = styled.span`
  color: #6B6B6B;
  text-align: center;
  font-family: "NanumSquare", sans-serif;
  font-size: 13px;
  font-style: normal;
  font-weight: 700;
  line-height: 130%;
  text-decoration: underline;
`;