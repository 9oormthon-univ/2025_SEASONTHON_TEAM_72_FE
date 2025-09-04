import styled from "styled-components";
import DashboardCard from "../components/common/DashboardCard";
import ReceiptSection from "../components/ReviewReceipt/ReceiptSection";
import Carousel from "../components/ReviewReceipt/Carousel";
import SettleupSection from "../components/ReviewReceipt/SettleupSection";
import { IoShareSocialOutline } from "react-icons/io5";
import { useState } from "react";
import LinkShareModal from "../components/ReviewReceipt/LinkShareModal";

export const dummyData2 = [
  {
    user: "전체",
    items: [
      { name: "콜라", quantity: 2, price: 1500 },
      { name: "치킨", quantity: 1, price: 18000 },
    ],
  },
  {
    user: "내이름",
    items: [
      { name: "콜라", quantity: 2, price: 1500 },
      { name: "치킨", quantity: 1, price: 18000 },
    ],
  },
  {
    user: "홍길동",
    items: [
      { name: "콜라", quantity: 2, price: 1500 },
      { name: "치킨", quantity: 1, price: 18000 },
    ],
  },
  {
    user: "최마루",
    items: [
      { name: "콜라", quantity: 2, price: 1500 },
      { name: "치킨", quantity: 1, price: 18000 },
    ],
  },
];

const ReviewReceiptPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const shareCode = "ABC123"; // TODO: 실제 공유 코드 값으로 교체

  return (
    <ReviewReceiptPageLayout>
      <TitleWrapper>
        <TitleP>정산명</TitleP>
        <IoShareSocialOutline
          style={{ fontSize: 18, cursor: "pointer" }}
          onClick={() => setIsModalOpen(true)}
        />
      </TitleWrapper>
      <DashboardDiv>
        {/* TODO: api 연결 예정 */}
        <DashboardCard
          borderColor="#F44336"
          textColor="#F44336"
          backColor="#fff"
          num={2}
          text="완료"
        />
        <DashboardCard
          borderColor="rgba(0,0,0,0)"
          textColor="#F44336"
          backColor="#fdd9d7"
          num={2}
          text="미완료"
        />
        <DashboardCard
          borderColor="#F44336"
          textColor="#fff"
          backColor="#F44336"
          num={1}
          text="초과"
        />
      </DashboardDiv>
      <Carousel>
        <ReceiptSection data={dummyData2} />
        <SettleupSection />
      </Carousel>
      <LinkShareModal
        open={isModalOpen}
        code={shareCode}
        onClose={() => setIsModalOpen(false)}
      />
    </ReviewReceiptPageLayout>
  );
};

export default ReviewReceiptPage;

const ReviewReceiptPageLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
  & > svg {
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
  }
`;

export const TitleP = styled.p`
  font-size: 20px;
  font-weight: 800;
`;

const DashboardDiv = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-evenly;
  margin: 0 22px;
`;
