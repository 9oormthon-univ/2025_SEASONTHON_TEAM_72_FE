import styled from "styled-components";
import ReceiptDropdown from "../components/common/ReceiptDropdown";
import { dummyData2 } from "./ReviewReceiptPage";
import { useLocation } from "react-router-dom";

const SettleupResultPage = () => {
  const location = useLocation();
  const isResultPage = location.pathname === "/result";
  const price = 10000;
  const role = "참여자"; // TODO: api로 데이터 핸들링
  const amountText =
    role === "참여자"
      ? `${price.toLocaleString()}원 입금하기`
      : `${price.toLocaleString()}원`;
  return (
    <SettleupResultPageLayout>
      <TitleWrapper>
        <TitleP>하나로마트 정산</TitleP>
      </TitleWrapper>
      <DashboardDiv>
        <MyAmountDiv>{amountText}</MyAmountDiv>
      </DashboardDiv>
      <ReceiptDiv>
        {isResultPage && role === "참여자" && (
          <WarningDiv>
            ❗입금 시 입금자명은 참여 닉네임으로 해주세요.
          </WarningDiv>
        )}{" "}
        {dummyData2.map((it) => (
          <ReceiptDropdown key={it.user} data={it} />
        ))}
      </ReceiptDiv>
    </SettleupResultPageLayout>
  );
};

export default SettleupResultPage;

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

const WarningDiv = styled.div`
  width: 350px;
  padding: 4px 0 4px 3px;
  margin-bottom: 5px;
  background-color: #ffffd0;
  color: #f44336;
  font-size: 12px;
  font-weight: 800;
`;
