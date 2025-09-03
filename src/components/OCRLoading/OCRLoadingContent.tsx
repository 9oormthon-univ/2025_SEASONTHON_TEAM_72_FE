import styled from "styled-components";
import hourglassIcon from "../../assets/icons/hourglass-icon.png";

const OCRLoadingContent = () => {
    return (
        <OCRLoadingPageLayout>
            <Title>영수증을 추출하고 있어요...</Title>
            <LoadingImage src={hourglassIcon} alt="로딩 아이콘" />
        </OCRLoadingPageLayout>
    );
};

export default OCRLoadingContent;

const OCRLoadingPageLayout = styled.div`
  background-color: #F44336;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  padding: 280px 20px;
`;

const Title = styled.h1`
  font-family: NanumSquare_ac;
  font-weight: 800;
  font-size: 20px;
  line-height: 130%;
  text-align: center;
  color: #FFFFFF;
  margin-bottom: 16px;
`;

const LoadingImage = styled.img`
  width: 24px;
  height: 24px;
  margin-top: 30px;
  position: relative;
  animation: spin 2s linear infinite; /* 2초 동안 무한 회전 */
  
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;