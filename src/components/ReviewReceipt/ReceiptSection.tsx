import styled from "styled-components";
import { MdNotInterested } from "react-icons/md";
import ReceiptDropdown from "../common/ReceiptDropdown";
import {
  dummyData2,
  dummyDataMe,
  dummyDataEntire,
} from "../../pages/ReviewReceiptPage";

// export interface ReceiptItem {
//   name: string;
//   quantity: number;
//   price: number;
// }

// export interface ReceiptData {
//   user: string;
//   items: ReceiptItem[];
// }

// export interface ReceiptSectionProps {
//   data: ReceiptData[];
// }

const ReceiptSection = () => (
  <ReceiptDiv>
    <TitleWrapper>
      <TitleP>참여자 영수증</TitleP>
      <WarningWrapper>
        <MdNotInterested style={{ fontSize: "16px", color: "#F44336" }} />
        <p style={{ color: "#F44336" }}>확정된 금액 아님</p>
      </WarningWrapper>
    </TitleWrapper>
    <ReceiptWrapper>
      <ReceiptDropdown data={dummyDataMe} />
      <ReceiptDropdown data={dummyDataEntire} />
      {dummyData2.map((it) => (
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
  margin: 24px 20px 0 20px;
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100vw;
  justify-content: space-around;
  align-items: end;
  gap: 120px;
  padding-top: 15px;
  padding-bottom: 2px;
  p {
    height: fit-content;
  }
`;

const TitleP = styled.p`
  font-size: 14px;
  font-weight: 800;
  margin: 0;
`;

const WarningWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  font-weight: bold;
  color: "#F44336";
  height: 30px;
`;

const ReceiptWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
