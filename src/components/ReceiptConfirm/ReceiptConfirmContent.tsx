import styled from "styled-components";
import TopNav from "../common/TopNav";
import BottomNav from "../common/BottomNav";
import { SettlementReceipt } from "../common/Receipt";

const ReceiptConfirmContent = () => {
  const handleBackClick = () => {
    // 뒤로가기 로직 구현
  };

  return (
    <ReceiptLayout>
      <TopNav 
        title="추출 결과"
        showBackButton={true}
        onBackClick={handleBackClick}
      />
      <ReceiptContainer>
        {/* 연동 예정  */}
        <SettlementReceipt 
          title="피자 정산"
          date="2024-01-15"
          items={[
            { name: "페퍼로니 피자", quantity: 2, price: 15000 },
            { name: "콜라", quantity: 4, price: 2000 },
            { name: "콜라", quantity: 4, price: 2000 },
            { name: "콜라", quantity: 4, price: 2000 },
            { name: "콜라", quantity: 4, price: 2000 },
            { name: "콜라", quantity: 4, price: 2000 },
            { name: "콜라", quantity: 4, price: 2000 },
            { name: "콜라", quantity: 4, price: 2000 },
            { name: "콜라", quantity: 4, price: 2000 },
            { name: "콜라", quantity: 4, price: 2000 },
            { name: "콜라", quantity: 4, price: 2000 },
            { name: "콜라", quantity: 4, price: 2000 },
            { name: "콜라", quantity: 4, price: 2000 },
            { name: "콜라", quantity: 4, price: 2000 },
            { name: "콜라", quantity: 4, price: 2000 },
            { name: "콜라", quantity: 4, price: 2000 },
            { name: "콜라", quantity: 4, price: 2000 }
          ]}
        />
      </ReceiptContainer>
      <BottomNav 
        description="추출된 영수증을 확인해 주세요."
        primaryLabel="편집하기"
        secondaryLabel="정산하러 가기"
      />
    </ReceiptLayout>
  );
};

export default ReceiptConfirmContent;

const ReceiptLayout = styled.div`
  background-color: #eeeeee;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  padding: 0 20px;
  overflow: hidden;
`;

const ReceiptContainer = styled.div`
  display: flex;
  justify-content: center;
  flex: 1;
  overflow-y: auto;
  padding-bottom: 10px;
  width: 100%;

   &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
`;

