// src/components/OCRLoading/ReceiptResult.tsx
import React from 'react';
import styled from 'styled-components';
import type { ReceiptData } from '../../apis/ocrApi';
import { formatPrice } from '../../apis/ocrUtils';

interface ReceiptResultProps {
  receiptData: ReceiptData;
  onRetry: () => void;
  onConfirm: () => void;
}

const ReceiptResult: React.FC<ReceiptResultProps> = ({
  receiptData,
  onRetry,
  onConfirm,
}) => {
  return (
    <ResultContainer>
      <Header>
        <Title>영수증 분석 결과</Title>
        <Subtitle>아래 정보가 맞는지 확인해주세요</Subtitle>
      </Header>

      <ReceiptInfo>
        <StoreInfo>
          <StoreName>{receiptData.storeName || '상점명 없음'}</StoreName>
        </StoreInfo>

        <PaymentInfo>
          {receiptData.date && (
            <PaymentDate>결제일: {receiptData.date}</PaymentDate>
          )}
        </PaymentInfo>
      </ReceiptInfo>

      <ItemsSection>
        <ItemsTitle>주문 내역</ItemsTitle>
        <ItemsList>
          {receiptData.items.map((item, index) => (
            <ItemRow key={index}>
              <ItemName>{item.name}</ItemName>
              <ItemDetails>
                <ItemCount>{item.count}개</ItemCount>
                <ItemPrice>{formatPrice(item.totalPrice)}</ItemPrice>
              </ItemDetails>
            </ItemRow>
          ))}
        </ItemsList>
        <TotalAmount>
          총 금액: {formatPrice(receiptData.totalAmount)}
        </TotalAmount>
      </ItemsSection>

      <ButtonGroup>
        <RetryButton onClick={onRetry}>
          다시 촬영
        </RetryButton>
        <ConfirmButton onClick={onConfirm}>
          확인
        </ConfirmButton>
      </ButtonGroup>
    </ResultContainer>
  );
};

export default ReceiptResult;

const ResultContainer = styled.div`
   background-color: #ffffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  overflow: hidden;
  box-sizing: border-box;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 20px;
  flex-shrink: 0;
`;

const Title = styled.h1`
  font-family: NanumSquare_ac;
  font-weight: 800;
  font-size: 22px;
  color: #333;
  margin: 0 0 8px 0;
`;

const Subtitle = styled.p`
  font-family: NanumSquare_ac;
  font-weight: 400;
  font-size: 14px;
  color: #666;
  margin: 0;
`;

const ReceiptInfo = styled.div`
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 20px;
  flex-shrink: 0;
`;

const StoreInfo = styled.div`
  margin-bottom: 10px;
`;

const StoreName = styled.h3`
  font-family: NanumSquare_ac;
  font-weight: 700;
  font-size: 18px;
  color: #333;
  margin: 0 0 4px 0;
`;

const PaymentInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const PaymentDate = styled.p`
  font-family: NanumSquare_ac;
  font-weight: 400;
  font-size: 14px;
  color: #666;
  margin: 0;
`;

const ItemsSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  overflow: hidden;
`;

const ItemsTitle = styled.h3`
  font-family: NanumSquare_ac;
  font-weight: 700;
  font-size: 16px;
  color: #333;
  margin: 0 0 12px 0;
  flex-shrink: 0;
`;

const ItemsList = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow-y: auto;
  flex: 1;
  max-height: 400px;
`;

const ItemRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid #f0f0f0;

  &:last-child {
    border-bottom: none;
  }
`;

const ItemName = styled.span`
  font-family: NanumSquare_ac;
  font-weight: 500;
  font-size: 14px;
  color: #333;
  flex: 1;
  margin-right: 10px;
`;

const ItemDetails = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

const ItemCount = styled.span`
  font-family: NanumSquare_ac;
  font-weight: 400;
  font-size: 14px;
  color: #666;
`;

const ItemPrice = styled.span`
  font-family: NanumSquare_ac;
  font-weight: 600;
  font-size: 14px;
  color: #333;
  min-width: 80px;
  text-align: right;
`;

const TotalAmount = styled.div`
  text-align: right;
  padding: 16px;
  background-color: #f8f9fa;
  border-radius: 8px;
  margin-top: 12px;
  font-family: NanumSquare_ac;
  font-weight: 700;
  font-size: 16px;
  color: #333;
  flex-shrink: 0;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  flex-shrink: 0;
`;

const RetryButton = styled.button`
  flex: 1;
  padding: 16px 24px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-family: NanumSquare_ac;
  font-weight: 600;
  font-size: 16px;
  color: #666;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f5f5f5;
    border-color: #ccc;
  }
`;

const ConfirmButton = styled.button`
  flex: 1;
  padding: 16px 24px;
  background-color: #F44336;
  border: none;
  border-radius: 8px;
  font-family: NanumSquare_ac;
  font-weight: 600;
  font-size: 16px;
  color: #fff;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #d32f2f;
  }
`;