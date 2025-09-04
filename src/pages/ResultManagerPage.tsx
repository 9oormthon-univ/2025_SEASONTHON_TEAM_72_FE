import styled from "styled-components";
import ReceiptDropdown from "../components/common/ReceiptDropdown";
import { dummyData2 } from "./ReviewReceiptPage";

const ResultManagerPage = () => {
  const price = 10000;
  return (
    <SettleupResultPageLayout>
      <TitleWrapper>
        <TitleP>하나로마트 정산</TitleP>
      </TitleWrapper>
      <DashboardDiv>
        <MyAmountDiv>{price.toLocaleString()}원</MyAmountDiv>
      </DashboardDiv>
      <ReceiptDiv>
        {dummyData2.map((it) => (
          <ReceiptDropdown key={it.user} data={it} />
        ))}
      </ReceiptDiv>
    </SettleupResultPageLayout>
  );
};

export default ResultManagerPage;

const SettleupResultPageLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
  & > svg {
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
  }
`;

const TitleP = styled.p`
  font-size: 20px;
  font-weight: 800;
`;

const DashboardDiv = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-evenly;
  margin: 0 22px;
`;

const MyAmountDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 350px;
  height: 70px;
  color: white;
  background-color: #f44336;
  border-radius: 10px;
  font-size: 17px;
  font-weight: 800;
`;

const ReceiptDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  background-color: #eeeeee;
  width: auto;
  height: 100vh;
  width: 100%;
  margin: 24px 20px 0 20px;
  padding-top: 20px;
`;
