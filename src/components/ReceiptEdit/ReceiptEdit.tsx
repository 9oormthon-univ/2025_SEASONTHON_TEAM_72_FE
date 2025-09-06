import styled from "styled-components";
import TopContent from "../ReceiptEdit/TopContent";
import ReceiptItem from "./ReceiptItemButton";
import ItemEditNav from "../ReceiptEdit/ItemEditNav";
import BottomNav from "../common/BottomNav";

const ReceiptEditContent = () => {
  return (
    <ReceiptLayout>
      <TopContent 
        title="새로운 정산"
        showBackButton={false}
        onBackClick={() => {}}
      />

      <BottomContentContainer>
        <ReceiptItem />
      </BottomContentContainer>

      <BottomNav 
        description="수정된 영수증을 확인해 주세요."
        primaryLabel="미리보기"
        secondaryLabel="정산하러 가기"
      />
      <ItemEditNav />

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

const BottomContentContainer = styled.div`
  position: absolute;
  bottom: 85px; /* BottomNav의 높이만큼 띄우기 (BottomNav 높이에 따라 조절 필요) */
  left: 0;
  width: 100%;
  z-index: 10; /* BottomNav보다 위에 오도록 z-index 설정 */
  width: 100%;

  // ItemEditSheet 자체 스타일을 가져와서 적용
  & > div { // ItemEditSheet의 SheetContainer
    width: 100%;
    margin: 0 auto;
    max-width: 390px; // 최대 너비 설정
  }
`;