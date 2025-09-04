import styled from "styled-components";
import TopNav from "../common/TopNav";
import BottomNav from "../common/BottomNav";
import { Receipt } from "../ReceiptConfirm/Receipt";
import receiptData from "../../data/receiptData.json";

const ReceiptConfirm = () => {
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
        {/* 더미데이터 사용 */}
        <Receipt 
          title={receiptData.title}
          date={receiptData.date}
          items={receiptData.items}
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
  justify-content: center;
  flex: 1;
  overflow-y: auto;
  padding-bottom: 30px;
  width: 100%;

   &::-webkit-scrollbar {
    width: 0.1px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
`;

