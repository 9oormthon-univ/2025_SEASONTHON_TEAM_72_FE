import styled from "styled-components";
import finishImg from "../assets/images/finish_settleup_img.svg";

const FinishSettleupPage = () => {
  return (
    <FinishSettleupPageLayout>
      <FinishImg src={finishImg} alt="정산완료 아이콘" />
      <FinishP>정산 완료!</FinishP>
    </FinishSettleupPageLayout>
  );
};

export default FinishSettleupPage;

const FinishSettleupPageLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f44336;
`;

const FinishImg = styled.img`
  width: 58%;
  height: auto;
  display: block;
  pointer-events: none;
  margin: 0;
`;

const FinishP = styled.p`
  font-size: 20px;
  color: white;
  line-height: 1.3;
  font-weight: 800;
  margin-top: 5px;
`;
