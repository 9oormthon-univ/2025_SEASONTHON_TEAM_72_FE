import styled from "styled-components";
import StartSettlementImage from "../../assets/images/start_settlement_img.svg";

const StartSettlementContent = () => {
  return (
    <StartSettlementLayout>
      <TopSection>
        <Title>새로운 정산을 시작해볼까요?</Title>
        <Subtitle>정산할 품목을 어떤 방식으로 가져올지 정해주세요.</Subtitle>
        <ImageContainer>
          <img src={StartSettlementImage} />
        </ImageContainer>
      </TopSection>
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
    </StartSettlementLayout>
  );
};

export default StartSettlementContent;

const StartSettlementLayout = styled.div`
  background-color: #FFFFFF;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;

const TopSection = styled.div`
margin-top: 100px;
display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;


const Title = styled.h1`
  color: #000;
  text-align: center;
  font-family: NanumSquare_ac;
  font-size: 20px;
  font-style: normal;
  font-weight: 800;
  line-height: 130%;
`;

const Subtitle = styled.p`
  color: #000;
  text-align: center;
  font-family: NanumSquare_ac;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: 130%; 
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 70px;
  margin-bottom: 180px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  max-width: 352px;
  margin-bottom: 20px;
`;

const ActionButton = styled.button`
  width: 100%;
  height: 50px;
  background-color: #F44336;
  color: #fff;
  border: none;
  border-radius: 5px;
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
  color: #FFF;
  text-align: center;
  font-family: NanumSquare_ac;
  font-size: 16px;
  font-style: normal;
  font-weight: 800;
  line-height: 130%; 
`;

const ParticipationCode = styled.div`
  cursor: pointer;
  
  &:hover {
    opacity: 0.8;
  }
`;

const CodeText = styled.span`
  color: #6B6B6B;
  text-align: center;
  font-family: NanumSquare_ac;
  font-size: 13px;
  font-style: normal;
  font-weight: 700;
  line-height: 130%; 
  text-decoration: underline;
`;