import styled from "styled-components";
import BottomNav from "../../common/BottomNav";

const ReceiptEditContent = () => {
    return (
        <ReceiptLayout>
            <TopNav>
                <Title>추출 편집</Title>
            </TopNav>
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
  min-height: 100vh;
`;

const TopNav = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Title = styled.h1`
  color: #000;
  text-align: center;
  font-family: NanumSquare_ac;
  font-size: 20px;
  font-style: normal;
  font-weight: 800;
  line-height: 130%; /* 26px */
  margin-top: 44px;
`;
