import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import { Receipt } from "../ReceiptConfirm/Receipt";
import TopNav from "../../components/common/TopNav";
import BottomNav from "../../components/common/BottomNav";
import React from "react";
import type { ReceiptData } from "../../apis/ocrApi";

const ReceiptConfirm: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // location.state에서 데이터 추출
  const state = location.state as {
    receiptData?: ReceiptData;
    originalImage?: File;
    ocrError?: boolean;
    errorMessage?: string;
  } | null;

  const {
    receiptData,
    originalImage,
  } = state || {};


  // 데이터가 없는 경우 기본값 설정
  const defaultReceiptData: ReceiptData = {
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

  const finalReceiptData = receiptData || defaultReceiptData;

  const handleEditClick = () => {
    navigate("/receiptedit", {
      state: {
        receiptData: finalReceiptData,
        originalImage: originalImage
      }
    });
  };

  const handleSettlementClick = () => {
    navigate("/selectpeoplecount", {
      state: {
        receiptData: finalReceiptData
      }
    });
  };

  // Receipt 컴포넌트에 전달할 데이터 변환
  const receiptItems = finalReceiptData.items.map(item => ({
    name: item.name,
    quantity: item.count,
    price: item.totalPrice
  }));

  return (
    <ReceiptLayout>
      <TopNav
        title="영수증 미리보기"
        showBackButton={false}
        onBackClick={() => {}}
      />
      <ReceiptContainer>
        <Receipt
          title={finalReceiptData.storeName}
          date={finalReceiptData.date}
          items={receiptItems}
        />
      </ReceiptContainer>
      
      <BottomNav
        description="추출된 영수증을 확인해 주세요."
        primaryLabel="편집하기"
        onPrimaryClick={handleEditClick}
        secondaryLabel="정산하러 가기"
        onSecondaryClick={handleSettlementClick}
      />
    </ReceiptLayout>
  );
};

export default ReceiptConfirm;

const ReceiptLayout = styled.div`
  background-color: #eeeeee;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  overflow: hidden;
`;

const ReceiptContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  padding-bottom: 30px;
  width: 100%;
  max-width: 400px;
  
  &::-webkit-scrollbar {
    width: 0.1px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }
`;
