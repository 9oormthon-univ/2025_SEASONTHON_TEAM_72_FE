import styled from "styled-components";

const SettlementStartContent = () => {
  return (
    <SettlementStartLayout>
      <Title>새로운 정산을 시작해볼까요?</Title>
      <Subtitle>정산할 품목을 어떤 방식으로 가져올지 정해주세요.</Subtitle>
      <ButtonContainer>
        <ActionButton>
          <ButtonText>영수증 불러오기</ButtonText>
        </ActionButton>
        <ActionButton>
          <ButtonText>직접 작성하기</ButtonText>
        </ActionButton>
      </ButtonContainer>
      <ParticipationCode>
        <CodeText>참여코드를 갖고 계신가요?</CodeText>
      </ParticipationCode>
    </SettlementStartLayout>
  );
};

export default SettlementStartContent;

const SettlementStartLayout = styled.div`
  background-color: #FFFFFF;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  padding: 290px 20px;
`;

const Title = styled.h1`
  font-family: NanumSquare_ac;
  font-weight: 800;
  font-size: 20px;
  line-height: 130%;
  text-align: center;
  color: #000000;
  margin-bottom: 16px;
`;

const Subtitle = styled.p`
  font-family: NanumSquare_ac;
  font-weight: 700;
  font-size: 12px;
  line-height: 130%;
  text-align: center;
  color: #000000;
  margin-bottom: 60px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  max-width: 352px;
  margin-top: 180px;
  margin-bottom: 30px;
`;

const ActionButton = styled.button`
  width: 100%;
  height: 50px;
  background-color: #F44336;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background-color: #c0392b;
  }
`;

const ButtonText = styled.span`
  font-family: NanumSquare_ac;
  font-weight: 800;
  font-size: 16px;
  line-height: 130%;
  text-align: center;
`;

const ParticipationCode = styled.div`
  cursor: pointer;
  
  &:hover {
    opacity: 0.8;
  }
`;

const CodeText = styled.span`
  font-family: NanumSquare_ac;
  font-weight: 700;
  font-size: 13px;
  line-height: 130%;
  text-align: center;
  text-decoration: underline;
`;
