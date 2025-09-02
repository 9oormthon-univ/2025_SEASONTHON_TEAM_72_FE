import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import styled, { keyframes } from "styled-components";

export interface UserSelection {
  user: string;
  amount: number; // 선택한 수량 (부분 가능)
}

export interface SettleupDrawerProps {
  open: boolean;
  name: string;
  quantity: number;
  price: number;
  selections: UserSelection[];
  onClose: () => void;
}

const SettleupDrawer: React.FC<SettleupDrawerProps> = ({
  open,
  name,
  quantity,
  price,
  selections,
  onClose,
}) => {
  const [portalEl, setPortalEl] = React.useState<HTMLElement | null>(null);

  useEffect(() => {
    let el = document.getElementById(
      "drawer-portal-root"
    ) as HTMLElement | null;
    if (!el) {
      el = document.createElement("div");
      el.id = "drawer-portal-root";
      document.body.appendChild(el);
    }
    setPortalEl(el);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!portalEl) return null;

  const totalSelected = selections.reduce((acc, cur) => acc + cur.amount, 0);
  const unitPrice = price / quantity; // 단가 (부분 수량 금액 계산용)
  return createPortal(
    <>
      {open && <TransparentOverlay aria-hidden onClick={onClose} />}
      <DrawerContainer
        role="dialog"
        aria-modal="true"
        aria-label={`${name} 정산 상세`}
        open={open}
        onClick={onClose}
      >
        <Inner onClick={(e) => e.stopPropagation()}>
          <HeaderRow>
            <Title>{name}</Title>
            <Meta>
              {quantity}개 · {price.toLocaleString()}원
            </Meta>
          </HeaderRow>
          <Divider />
          <List>
            {selections.map((sel) => {
              const pricePortion = sel.amount * unitPrice;
              return (
                <ListItem key={sel.user}>
                  <UserName>{sel.user}</UserName>
                  <Amounts>
                    <span>{sel.amount.toFixed(2)}개</span>
                    <span>{Math.round(pricePortion).toLocaleString()}원</span>
                  </Amounts>
                </ListItem>
              );
            })}
          </List>
          <TotalBar>
            <span>합계 선택: {totalSelected.toFixed(2)}개</span>
            <span>
              {Math.round(totalSelected * unitPrice).toLocaleString()}원 /{" "}
              {price.toLocaleString()}원
            </span>
          </TotalBar>
        </Inner>
      </DrawerContainer>
    </>,
    portalEl
  );
};

export default SettleupDrawer;

// Styles
const slideUp = keyframes`
  from { transform: translateY(100%); }
  to { transform: translateY(0); }
`;

const DrawerContainer = styled.div<{ open: boolean }>`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  max-width: 480px;
  margin: 0 auto;
  background: #ffffff;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  box-shadow: 0 -4px 16px rgba(0, 0, 0, 0.12);
  transform: translateY(${({ open }) => (open ? "0%" : "100%")});
  transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  animation: ${({ open }) => (open ? slideUp : "none")} 0.35s;
  z-index: 1001;
  display: flex;
  flex-direction: column;
  padding: 0 16px 16px;
  box-sizing: border-box;
  height: 260px; /* 기존 212 + 내부 영역 확장 */
`;

const Inner = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 12px;
  padding-top: 14px;
`;

const HeaderRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Title = styled.h3`
  font-size: 14px;
  font-weight: 700;
  margin: 0;
`;

const Meta = styled.div`
  font-size: 11px;
  font-weight: 500;
  color: #666;
`;

const Divider = styled.div`
  height: 1px;
  background: #eee;
`;

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const ListItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;
  background: #fafafa;
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 8px 12px;
`;

const UserName = styled.span`
  font-weight: 600;
`;

const Amounts = styled.div`
  display: flex;
  gap: 12px;
  font-weight: 500;
`;

const TotalBar = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 11px;
  font-weight: 600;
  background: #f5f5f5;
  padding: 8px 12px;
  border-radius: 10px;
`;

const TransparentOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: transparent; /* no dim */
  z-index: 1000;
`;
