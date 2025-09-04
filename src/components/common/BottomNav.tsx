import React, { useLayoutEffect, useRef, useState } from "react";
import styled from "styled-components";

type BottomNavProps = {
  description?: string;
  primaryLabel: string;
  onPrimaryClick?: () => void;
  secondaryLabel?: string;
  onSecondaryClick?: () => void;
};

const BottomNav: React.FC<BottomNavProps> = ({
  description,
  primaryLabel,
  onPrimaryClick,
  secondaryLabel,
  onSecondaryClick,
}) => {
  const barRef = useRef<HTMLDivElement>(null);
  const [spacerHeight, setSpacerHeight] = useState<number>(0);

  useLayoutEffect(() => {
    if (barRef.current) {
      setSpacerHeight(barRef.current.offsetHeight);
    }
  }, [description, primaryLabel, secondaryLabel]);

  return (
    <>
      <Spacer style={{ height: spacerHeight }} />
      <BarWrapper ref={barRef}>
        {description && <DescriptionText>{description}</DescriptionText>}
        <ButtonsContainer>
          <PrimaryButton onClick={onPrimaryClick}>{primaryLabel}</PrimaryButton>
          {secondaryLabel && (
            <SecondaryButton onClick={onSecondaryClick}>{secondaryLabel}</SecondaryButton>
          )}
        </ButtonsContainer>
      </BarWrapper>
    </>
  );
};

export default BottomNav;

const Spacer = styled.div``;

const BarWrapper = styled.div`
  position: fixed;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  width: 390px;
  background: #ffffff;
  box-shadow: 2px -2px 15px rgba(0, 0, 0, 0.1);
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  z-index: 10;
  border-radius: 16px 16px 0 0;
`;

const DescriptionText = styled.span`
  color: #6b6b6b;
  font-size: 10px;
  font-family: "NanumSquare", sans-serif;
  font-weight: 700;
  line-height: 13px;
  text-align: center;
  word-wrap: break-word;
  margin-bottom: 4px;
`;

const ButtonsContainer  = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 100%;
`;

const PrimaryButton = styled.button`
width: 350px;
  height: 40px;
  background-color: #f44336;
  color: #fff;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-family: "NanumSquare", sans-serif;
  font-weight: 800;
  font-size: 16px;
  line-height: 130%;
  transition: background-color 0.2s;

  &:hover {
    background-color: #c0392b;
  }
`;

const SecondaryButton = styled.button`
width: 350px;
  height: 40px;
  background-color: #ffffff;
  color: #f44336;
  border: 1px #f44336 solid;
  border-radius: 10px;
  cursor: pointer;
  font-family: "NanumSquare", sans-serif;
  font-weight: 800;
  font-size: 16px;
  line-height: 130%;
  transition: opacity 0.2s;

  &:hover {
    background-color: #e0e0e0bc;
    border-color: #cccccc;
  }
`;


