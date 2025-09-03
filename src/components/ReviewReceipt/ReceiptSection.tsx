import styled from "styled-components";
import { MdNotInterested } from "react-icons/md";
import ReceiptDropdown from "../common/ReceiptDropdown";

interface ReceiptItem {
  name: string;
  quantity: number;
  price: number;
}

interface ReceiptData {
  user: string;
  items: ReceiptItem[];
}

interface ReceiptSectionProps {
  data: ReceiptData[];
}

const ReceiptSection: React.FC<ReceiptSectionProps> = ({ data }) => (
  <ReceiptDiv>
    <TitleWrapper>
      <p style={{ fontSize: "14px", fontWeight: 800 }}>참여자 영수증</p>
      <WarningWrapper>
        <MdNotInterested style={{ fontSize: "16px", color: "#F44336" }} />
        <p style={{ color: "#F44336" }}>확정된 금액 아님</p>
      </WarningWrapper>
    </TitleWrapper>
    <ReceiptWrapper>
      {data.map((it) => (
        <ReceiptDropdown key={it.user} data={it} />
      ))}
    </ReceiptWrapper>
  </ReceiptDiv>
);

export default ReceiptSection;

const ReceiptDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  background-color: #eeeeee;
  width: auto;
  height: 100vh;
  /* height: 300px; */
  margin: 24px 20px 0 20px;
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100vw;
  justify-content: space-around;
  gap: 100px;
`;

const WarningWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  font-weight: bold;
  color: "#F44336";
`;

const ReceiptWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
