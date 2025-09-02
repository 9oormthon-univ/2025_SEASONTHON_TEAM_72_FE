import React, { useState } from "react";
import styled, { keyframes } from "styled-components";

interface SettleupItemProps {
  name: string;
  quantity: number;
  price: number;
  selectedAmount: number;
}

const SettleupItem: React.FC<SettleupItemProps> = ({
  name,
  quantity,
  price,
  selectedAmount,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <ItemWrapper onClick={() => setOpen(true)}>
        <LeftTexts>
          <NameText>{name}</NameText>
          <SubLine>
            <span>{quantity}개</span>
            <Divider />
            <span>₩ {price.toLocaleString()}</span>
          </SubLine>
        </LeftTexts>
        <Circle>{selectedAmount}</Circle>
      </ItemWrapper>
      <DrawerBackdrop open={open} onClick={() => setOpen(false)} />
      <Drawer open={open}>
        <DrawerHandle />
        <DrawerContentPlaceholder>
          <p style={{ fontSize: "14px", fontWeight: 600 }}>추가 내용 예정</p>
          <p style={{ fontSize: "12px", color: "#666" }}></p>
        </DrawerContentPlaceholder>
      </Drawer>
    </>
  );
};

export default SettleupItem;

// Styles
const ItemWrapper = styled.div`
  width: 350px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
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
  font-size: 14px;
  font-weight: 700;
  line-height: 1.1;
`;

const SubLine = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: #555;
`;

const Divider = styled.span`
  width: 1px;
  height: 10px;
  background: #d0d0d0;
  display: inline-block;
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
  font-size: 13px;
  font-weight: 600;
`;

const slideUp = keyframes`
	from { transform: translateY(100%); }
	to { transform: translateY(0); }
`;

const Drawer = styled.div<{ open: boolean }>`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 212px;
  background: #ffffff;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  box-shadow: 0 -4px 16px rgba(0, 0, 0, 0.12);
  transform: translateY(${({ open }) => (open ? "0%" : "110%")});
  transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  animation: ${({ open }) => (open ? slideUp : "none")} 0.35s;
  z-index: 1001;
  display: flex;
  flex-direction: column;
  padding: 16px;
  box-sizing: border-box;
`;

const DrawerHandle = styled.div`
  width: 40px;
  height: 4px;
  background: #d0d0d0;
  border-radius: 2px;
  align-self: center;
  margin-bottom: 12px;
`;

const DrawerBackdrop = styled.div<{ open: boolean }>`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.25);
  opacity: ${({ open }) => (open ? 1 : 0)};
  pointer-events: ${({ open }) => (open ? "auto" : "none")};
  transition: opacity 0.25s;
  z-index: 1000;
`;

const DrawerContentPlaceholder = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
