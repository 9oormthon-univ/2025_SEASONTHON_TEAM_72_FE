import React from "react";
import styled from "styled-components";

interface DashboardCardProps {
  borderColor: string;
  textColor: string;
  backColor: string;
  num: number | string;
  text: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  borderColor,
  textColor,
  backColor,
  num,
  text,
}) => {
  return (
    <CardWrapper borderColor={borderColor} backColor={backColor}>
      <NumberText textColor={textColor}>{num}</NumberText>
      <LabelText textColor={textColor}>{text}</LabelText>
    </CardWrapper>
  );
};

export default DashboardCard;

const CardWrapper = styled.div<{
  borderColor: string;
  backColor: string;
}>`
  width: 110px;
  height: 70px;
  border-radius: 10px;
  border: 1px solid ${({ borderColor }) => borderColor};
  background: ${({ backColor }) => backColor};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.1);
`;

const NumberText = styled.div<{ textColor: string }>`
  color: ${({ textColor }) => textColor};
  font-size: 20px;
  font-weight: bold;
`;

const LabelText = styled.div<{ textColor: string }>`
  color: ${({ textColor }) => textColor};
  font-size: 12px;
  margin-top: 4px;
`;
