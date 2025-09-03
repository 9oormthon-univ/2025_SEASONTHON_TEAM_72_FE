import React, { useState } from "react";
import styled from "styled-components";
import SettleupDrawer from "./SettleupDrawer";
import type { ItemData } from "../../mocks/settleupData";

interface SettleupItemProps extends ItemData {
  onUpdateMyAmount: (amount: number) => void;
}

const SettleupItem: React.FC<SettleupItemProps> = ({
  status,
  name,
  quantity,
  price,
  selections,
  onUpdateMyAmount,
}) => {
  const MYNAME = "내이름";
  const [open, setOpen] = useState(false);
  const myAmount = selections
    .filter((s) => s.user === MYNAME)
    .reduce<number>((a, c) => a + c.amount, 0);
  const formatAmount = (v: number) => {
    if (Number.isInteger(v)) return v.toString();
    return v.toFixed(2).replace(/0+$/, "").replace(/\.$/, "");
  };
  const displayAmount = formatAmount(myAmount);
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
        <Circle $status={status}>{displayAmount}개</Circle>
      </ItemWrapper>
      <SettleupDrawer
        open={open}
        onClose={() => setOpen(false)}
        name={name}
        quantity={quantity}
        price={price}
        selections={selections}
        onSave={(val: number) => onUpdateMyAmount(val)}
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

const Circle = styled.div<{ $status: string }>`
  min-width: 38px;
  min-height: 38px;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 9px;
  font-weight: 600;
  box-sizing: border-box;
  padding: 0 4px;
  ${({ $status }) => {
    switch ($status) {
      case "완료":
        return `background:#ffffff;color:#f44336;border:1px solid #f44336;`;
      case "미완료":
        return `background:#fdd9d7;color:#f44336;border:1px solid #fdd9d7;`;
      case "초과":
        return `background:#f44336;color:#ffffff;border:1px solid #f44336;`;
      default:
        return `background:#e0e0e0;color:#333;border:1px solid #ccc;`;
    }
  }}
`;
