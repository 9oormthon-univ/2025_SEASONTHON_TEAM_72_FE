import React from "react";
import styled from "styled-components";

// 아이콘 SVG는 별도의 파일로 분리하거나 유틸리티 함수로 관리하면 더 좋습니다.
const DeleteIcon = () => (
    <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* 삭제 아이콘 경로 */}
        <path d="M1 16C1 17.1 1.9 18 3 18H13C14.1 18 15 17.1 15 16V4H1V16ZM16 1H12.5L11.5 0H4.5L3.5 1H0V3H16V1Z" fill="black"/>
    </svg>
);

const CloseIcon = () => (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* 닫기 아이콘 경로 */}
        <path d="M1 11L11 1M1 1L11 11" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const EditIcon = () => (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* 수정 아이콘 경로 */}
        <path d="M7.25 2.5L9.5 4.75L4.75 9.5H2.5V7.25L7.25 2.5Z" stroke="#6B6B6B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M6.5 3.25L8.75 5.5" stroke="#6B6B6B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const ChevronRightIcon = () => (
    <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* 화살표 아이콘 경로 */}
        <path d="M1 13L7 7L1 1" stroke="#6B6B6B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);


export const ItemEditSheet = () => {
  return (
    <SheetContainer>
      {/* 상단 아이콘 영역 */}
      <IconContainer>
        <DeleteIcon />
        <CloseIcon />
      </IconContainer>

      {/* 품목명 영역 */}
      <FieldRow>
        <Label>품목명</Label>
        <ValueContainer>
          <Value>품목 1</Value>
          <EditIcon />
        </ValueContainer>
      </FieldRow>
      <Divider />

      {/* 수량 영역 */}
      <FieldRow>
        <Label>수량</Label>
        <ValueContainer>
          <Value>2 개</Value>
          <ChevronRightIcon />
        </ValueContainer>
      </FieldRow>
      <Divider />

      {/* 가격 영역 */}
      <FieldRow>
        <Label>가격</Label>
        <ValueContainer>
          <Value>8,000 원</Value>
          <ChevronRightIcon />
        </ValueContainer>
      </FieldRow>
    </SheetContainer>
  );
};

const SheetContainer = styled.div`
  width: 100%;
  height: 167px;
  background: white;
  box-shadow: 2px 4px 15px rgba(0, 0, 0, 0.10);
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  padding: 18px 24px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 16px;
  margin-bottom: 8px;
  height: 18px; /* 아이콘 높이 고정 */
`;

const FieldRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 10px 0;
`;

const Label = styled.span`
  color: #6B6B6B;
  font-size: 12px;
  font-family: NanumSquare_ac, sans-serif;
  font-weight: 800;
`;

const ValueContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Value = styled.span`
  color: black;
  font-size: 17px;
  font-family: NanumSquare_ac, sans-serif;
  font-weight: 800;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #F0F0F0;
`;