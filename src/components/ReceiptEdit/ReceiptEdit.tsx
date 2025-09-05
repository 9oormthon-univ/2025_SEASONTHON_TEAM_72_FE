import styled from "styled-components";
import TopNav from "../common/TopNav";
import BottomNav from "../common/BottomNav";
import { ItemEditSheet } from "./ItemEdit";

const ReceiptEditContent = () => {
  const handleBackClick = () => {
    // 뒤로가기 로직 구현
  };

  return (
    <ReceiptLayout>
      <TopNav 
        title="추출 편집"
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
            { name: "치즈 스틱", quantity: 1, price: 4000 },
            { name: "디핑 소스", quantity: 3, price: 1500 },
            { name: "샐러드", quantity: 1, price: 6000 },
            { name: "핫소스", quantity: 5, price: 500 },
            { name: "핫소스", quantity: 5, price: 500 },
            { name: "핫소스", quantity: 5, price: 500 },
            { name: "핫소스", quantity: 5, price: 500 },
            { name: "핫소스", quantity: 5, price: 500 },
            { name: "핫소스", quantity: 5, price: 500 },
          ]}
        />
      </ReceiptContainer>
      <BottomContentContainer>
        <ItemEditSheet />
      </BottomContentContainer>
      <BottomNav 
                description="수정된 영수증을 확인해 주세요."
                primaryLabel="정산하러 가기"
            />
    </ReceiptLayout>
  );
};

export default ReceiptEditContent;

const ReceiptLayout = styled.div`
  background-color: #eeeeee;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  padding: 0 20px;
  overflow: hidden;
  position: relative;
`;

const ReceiptContainer = styled.div`
  display: flex;
  justify-content: center;
  flex: 1;
  overflow-y: auto;
  padding-bottom: 10px;
  width: 100%;

   &::-webkit-scrollbar {
    width: 1px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
`;

const BottomContentContainer = styled.div`
  position: absolute;
  bottom: 85px; /* BottomNav의 높이만큼 띄우기 (BottomNav 높이에 따라 조절 필요) */
  left: 0;
  width: 100%;
  z-index: 10; /* BottomNav보다 위에 오도록 z-index 설정 */

  // ItemEditSheet 자체 스타일을 가져와서 적용
  & > div { // ItemEditSheet의 SheetContainer
    width: 100%;
    margin: 0 auto;
    max-width: 390px; // 최대 너비 설정
  }
`;