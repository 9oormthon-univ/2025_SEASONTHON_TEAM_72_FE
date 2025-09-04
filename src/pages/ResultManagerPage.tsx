import styled from "styled-components";
import ReceiptDropdown from "../components/common/ReceiptDropdown";
import { dummyData2 } from "./ReviewReceiptPage";

const ResultManagerPage = () => {
  return (
    <SettleupResultPageLayout>
      <TitleWrapper>
        <TitleP>하나로마트 정산</TitleP>
      </TitleWrapper>
      <ReceiptDiv>
        {dummyData2.map((it) => (
          <ReceiptDropdown key={it.user} data={it} />
        ))}
      </ReceiptDiv>
    </SettleupResultPageLayout>
  );
};

export default ResultManagerPage;

export const SettleupResultPageLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #eeeeee;
`;

export const TitleWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  box-sizing: border-box;
  padding-top: 18px;
`;

const TitleP = styled.p`
  font-size: 20px;
  font-weight: 800;
`;

const ReceiptDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  width: auto;
  height: 100vh;
  width: 100%;
  margin: 24px 20px 0 20px;
  padding-top: 20px;
`;
