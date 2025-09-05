import styled from "styled-components";
import rightIcon from "../assets/icons/right_icon.svg";
import { useNavigate } from "react-router-dom";
import AlarmListItem from "../components/Alarm/AlarmListItem.tsx";
import type { AlarmListItemProps } from "../components/Alarm/AlarmListItem.tsx";

const mockAlarms: AlarmListItemProps[] = [
  {
    settlementName: "코스트코",
    alarmText: "입금이 아직 완료되지 않았어요.",
    status: "AWAITING_DEPOSIT",
    read: false,
  },
  {
    settlementName: "휴지 공구!",
    alarmText: "정산이 진행중입니다.",
    status: "IN_PROGRESS",
    read: true,
  },
  {
    settlementName: "감자 한 박스",
    alarmText: "관리자가 확인이 필요하대요.",
    status: "NEEDS_ATTENTION",
    read: false,
  },
  {
    settlementName: "수박 소분",
    alarmText: "정산이 완료되었어요!",
    status: "DONE",
    read: true,
  },
];

const AlarmPage = () => {
  const navigate = useNavigate();
  return (
    <PageWrapper>
      <Header>
        <BackButton onClick={() => navigate(-1)}>
          <BackIcon src={rightIcon} alt="뒤로가기" />
        </BackButton>
        <Title>알림</Title>
        <HeaderRight />
      </Header>
      <ListWrapper>
        {mockAlarms.map((a, idx) => (
          <AlarmListItem key={idx} {...a} />
        ))}
      </ListWrapper>
    </PageWrapper>
  );
};

export default AlarmPage;

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Header = styled.div`
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 14px 10px;
  background: #ffffff;
  border-bottom: 1px solid #f0f0f0;
  z-index: 10;
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  padding: 4px;
  cursor: pointer;
`;

const BackIcon = styled.img`
  width: 22px;
  height: 22px;
  transform: scaleX(-1);
`;

const Title = styled.h2`
  margin: 0;
  font-size: 17px;
  font-weight: 700;
  letter-spacing: -0.5px;
`;

const HeaderRight = styled.div`
  width: 22px; 
  height: 22px;
`;

const ListWrapper = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 4px 14px 20px;
  background: #fafafa;
  margin-top: 10px;
`;
