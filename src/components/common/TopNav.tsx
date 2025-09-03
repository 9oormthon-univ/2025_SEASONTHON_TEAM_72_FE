import React from "react";
import styled from "styled-components";

interface TopNavProps {
  title: string;
  showBackButton?: boolean;
  onBackClick?: () => void;
}

const TopNav: React.FC<TopNavProps> = ({ 
  title, 
  showBackButton = true, 
  onBackClick 
}) => {
  return (
    <TopNavContainer>
      {showBackButton ? (
        <BackButton onClick={onBackClick}>
          <svg xmlns="http://www.w3.org/2000/svg" width="9" height="14" viewBox="0 0 9 14" fill="none">
            <path d="M8 1L2 7L8 13" stroke="#6B6B6B" strokeWidth="2" strokeLinecap="round"/> 
          </svg>
        </BackButton>
      ) : (
        <div />
      )}
      <Title>{title}</Title>
      <div /> {/* 오른쪽 공간을 위한 빈 div */}
    </TopNavContainer>
  );
};

export default TopNav;

const TopNavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  flex-shrink: 0;
  margin-top: 45px;
  margin-bottom: 20px;
  position: relative;
`;

const BackButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 8px;
  
  &:hover {
    opacity: 0.7;
  }
`;

const Title = styled.h1`
  position: absolute; 
  left: 50%; 
  transform: translateX(-50%);

  color: #000;
  text-align: center;
  font-family: NanumSquare_ac;
  font-size: 20px;
  font-style: normal;
  font-weight: 800;
  line-height: 130%;
  margin: 0;
`;