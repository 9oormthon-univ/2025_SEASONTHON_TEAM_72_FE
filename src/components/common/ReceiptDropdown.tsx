import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { useLocation } from "react-router-dom";

interface ReceiptItem {
  name: string;
  quantity: number;
  price: number;
}

interface ReceiptData {
  user: string;
  items: ReceiptItem[];
}

interface ReceiptDropdownProps {
  data: ReceiptData;
  role?: "총괄자" | "참여자"; // 현재 사용자 역할
  myName?: string; 
  initialPaid?: boolean; 
  onStatusChange?: (paid: boolean) => void;
}

const ReceiptDropdown: React.FC<ReceiptDropdownProps> = ({
  data,
  role = "총괄자",
  myName = "내이름",
  initialPaid = false,
  onStatusChange,
}) => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isResultPage = location.pathname === "/result";
  
  // 소유자 판별: data.user 가 myName 과 동일하면 '내 영수증'
  const mine = data.user === myName;
  const [isPaid, setIsPaid] = useState<boolean>(initialPaid);

  const totalQuantity = data.items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );
  const totalPrice = data.items.reduce((sum, item) => sum + item.price, 0);
  // 버튼 클릭 동작 정의
  const togglePaid = () => {
    setIsPaid((prev) => {
      const next = !prev;
      onStatusChange?.(next);
      return next;
    });
  };

  const showEnhancedUI = isResultPage;
  const showManagerControls = showEnhancedUI && role === "총괄자" && !mine; // 참여자 영수증
  const showParticipantSelfButton = showEnhancedUI && role === "참여자" && mine;
  const statusDotColor = isPaid ? "#07A320" : "#f44336";
  let actionBtn: { label: string; color: string; onClick: () => void } | null =
    null;

  if (showManagerControls) {
    // 총괄자: 항상 빨간 버튼, 라벨 토글
    actionBtn = {
      label: isPaid ? "입금 취소하기" : "독촉하기",
      color: "#f44336",
      onClick: () => togglePaid(),
    };
  } else if (showParticipantSelfButton) {
    // 참여자 자신의 영수증: 라벨 & 색상 토글
    actionBtn = {
      label: isPaid ? "입금 취소하기" : "입금 완료하기",
      color: isPaid ? "#f44336" : "#07A320",
      onClick: () => togglePaid(),
    };
  }

  return (
    <ReceiptDropdownLayout>
      <DropdownCard onClick={() => setOpen((prev) => !prev)} isOpen={open}>
        {showManagerControls && (
          <StatusDot aria-hidden $color={statusDotColor} />
        )}
        <span>{mine ? "내 영수증" : data.user}</span>
      </DropdownCard>
      {open && (
        <DropdownContent role="region" aria-label={`${data.user} 영수증 상세`}>
          <table>
            <thead>
              <tr>
                <th>품목명</th>
                <th>수량</th>
                <th>가격</th>
              </tr>
            </thead>
            <tbody>
              {data.items.map((item, idx) => (
                <tr key={idx}>
                  <td>{item.name}</td>
                  <td>{item.quantity} 개</td>
                  <td>{item.price.toLocaleString()} 원</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td style={{ fontWeight: 700, textAlign: "left" }}>총합</td>
                <td style={{ fontWeight: 700 }}>{totalQuantity} 개</td>
                <td style={{ fontWeight: 700 }}>
                  {totalPrice.toLocaleString()}원
                </td>
              </tr>
            </tfoot>
          </table>
          {actionBtn && (
            <ActionButton
              type="button"
              style={{ background: actionBtn.color }}
              onClick={actionBtn.onClick}
            >
              {actionBtn.label}
            </ActionButton>
          )}
        </DropdownContent>
      )}
    </ReceiptDropdownLayout>
  );
};

export default ReceiptDropdown;

const ReceiptDropdownLayout = styled.div`
  padding-bottom: 10px;
`;
const DropdownCard = styled.div<{ isOpen: boolean }>`
  width: 320px;
  height: 38px;
  border-radius: ${({ isOpen }) => (isOpen ? "5px 5px 0 0" : "5px")};
  background: #fff;
  border: ${({ isOpen }) => (isOpen ? "" : "0.5px solid #d9d9d9")};
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 0 16px;
  font-size: 12px;
  font-weight: 800;
  cursor: pointer;
`;

const slideDown = keyframes`
  from { transform: translateY(-4px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const DropdownContent = styled.div`
  width: 320px;
  background: #fff;
  border: 0 1px 1px 1px solid #eee;
  border-radius: 0 0 5px 5px;
  padding: 6px 16px 12px 16px;
  animation: ${slideDown} 0.28s ease;
  transform-origin: top center;
  will-change: transform, opacity;
  table {
    width: 100%;
    border-collapse: collapse;
    border-top: 2px solid black;

    table-layout: fixed;
    font-size: 10px;
    font-weight: 500;

    thead,
    tr {
      background-color: #fff !important;
    }

    th,
    td {
      border-bottom: 1px solid #e0e0e0;
      padding: 4px 8px;
      background: #fff;
      text-align: center;
    }
    th:nth-child(1),
    td:nth-child(1),
    th:nth-child(2),
    td:nth-child(2),
    th:nth-child(3),
    td:nth-child(3) {
      text-align: left;
    }
    th:nth-child(1),
    td:nth-child(1) {
      width: 50%;
    }
    th:nth-child(2),
    td:nth-child(2),
    th:nth-child(3),
    td:nth-child(3) {
      width: 25%;
    }
    th {
      background: #f5f5f5;
      font-weight: 700;
      font-size: 10px;
    }
    tfoot td {
      border-bottom: none;
      background: #fff;
    }
    tfoot tr:first-child td {
      border-top: 1.5px dashed #000;
    }
  }
`;

const StatusDot = styled.span<{ $color: string }>`
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${({ $color }) => $color};
`;

const ActionButton = styled.button`
  width: calc(100% - 40px); /* 좌우 20px 마진 */
  margin: 12px 20px 0 20px;
  height: 40px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 700;
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;
