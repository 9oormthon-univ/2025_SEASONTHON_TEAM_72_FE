import React, { useState } from "react";
import styled from "styled-components";
import SettleupDrawer, { type UserSelection } from "./SettleupDrawer";

interface SettleupItemProps {
  name: string;
  quantity: number;
  price: number;
  selections: UserSelection[]; // 각 사용자 선택 수량
}

const SettleupItem: React.FC<SettleupItemProps> = ({
  name,
  quantity,
  price,
  selections,
}) => {
  const [open, setOpen] = useState(false);
  const totalSelected = selections.reduce<number>((a, c) => a + c.amount, 0);
  return (
    <>
      <ItemWrapper onClick={() => setOpen(true)}>
        <LeftTexts>
          <NameText>{name}</NameText>
          <SubLine>
            <span>{quantity}개</span>
            <span>{price.toLocaleString()}원</span>
          </SubLine>
        </LeftTexts>
        <Circle>{totalSelected.toFixed(2)} 개</Circle>
      </ItemWrapper>
      <SettleupDrawer
        open={open}
        onClose={() => setOpen(false)}
        name={name}
        quantity={quantity}
        price={price}
        selections={selections}
      />
    </>
  );
};

export default SettleupItem;

const ItemWrapper = styled.div`
  width: 350px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  margin-bottom: 8px;
  box-sizing: border-box;
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.15s;
  &:active {
    background: #f5f5f5;
  }
`;

const LeftTexts = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const NameText = styled.div`
  font-size: 12px;
  font-weight: 800;
  line-height: 1.3;
`;

const SubLine = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 12px;
  font-weight: 500;
`;

const Circle = styled.div`
  min-width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #f44336;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 9px;
  font-weight: 600;
`;

// Drawer 관련 스타일/로직은 SettleupDrawer 컴포넌트로 분리
