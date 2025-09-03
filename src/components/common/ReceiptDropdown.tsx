import React, { useState } from "react";
import styled, { keyframes } from "styled-components";

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
}

const ReceiptDropdown: React.FC<ReceiptDropdownProps> = ({ data }) => {
  const [open, setOpen] = useState(false);

  const totalQuantity = data.items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );
  const totalPrice = data.items.reduce((sum, item) => sum + item.price, 0);
  const total = data.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <ReceiptDropdownLayout>
      <DropdownCard onClick={() => setOpen((prev) => !prev)} isOpen={open}>
        <span>{data.user}</span>
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
