import styled from "styled-components";
import hourglassIcon from "../../src/assets/icons/hourglass-icon.svg";

const OCRLoadingPage = () => {
    return (
        <OCRLoadingPageLayout>
            <LoadingImage src={hourglassIcon} alt="로딩 중" />
            <Title>영수증을 추출하고 있어요...</Title>
            <LoadingBar />
        </OCRLoadingPageLayout>
    );
};

export default OCRLoadingPage;

const OCRLoadingPageLayout = styled.div`
  background-color: #F44336;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  overflow: hidden;
`;

const Title = styled.h1`
  font-family: NanumSquare_ac;
  font-weight: 800;
  font-size: 20px;
  line-height: 130%;
  text-align: center;
  color: #FFFFFF;
  margin-top: 0;
`;

const LoadingImage = styled.img`
  width: 39px;
  height: 39px;
  flex-shrink: 0;
  margin-bottom: 30px;
  animation: spin 2s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const LoadingBar = styled.div`
width: 173px;
  height: 7px; 
  background-color: #FFF; /* stroke 대신 background-color 사용 */
  border-radius: 3.5px; 
  flex-shrink: 0;
  margin-top: 20px; 
  margin-bottom: 70px;
  
  /* 로딩 애니메이션 효과 */
  position: relative;
  overflow: hidden;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
    animation: loading 2s infinite;
  }
  
  @keyframes loading {
    0% { left: -100%; }
    100% { left: 100%; }
  }
`;