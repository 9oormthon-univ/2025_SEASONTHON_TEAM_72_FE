import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import rightIcon from "../assets/icons/right_icon.svg";
import HomeData from "../mocks/homeData.json";
import InProgressItem from "../components/Home/InProgressItem";
import type { StatusType } from "../components/Home/InProgressItem";
import { SETTLEMENT_STATUS_LABEL } from "../constants/status";

const HistoryPage = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(search);
  const state = params.get("state");

  const filtered = HomeData.filter((d) => {
    if (state === "done") return d.status === "DONE";
    return d.status !== "DONE";
  });

  const formatDate = (ts: number) => {
    const d = new Date(ts);
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${mm}.${dd}`;
  };

  return (
    <PageWrapper>
      <Header>
        <BackButton onClick={() => navigate("/home")}>
          <BackIcon src={rightIcon} alt="홈으로" />
        </BackButton>
        <Title>히스토리</Title>
        <HeaderRight />
      </Header>
      <Content>
        {filtered.map((it) => {
          const label =
            SETTLEMENT_STATUS_LABEL[
              it.status as keyof typeof SETTLEMENT_STATUS_LABEL
            ];
          return (
            <InProgressItem
              key={it.id}
              title={it.name}
              dueDate={formatDate(it.date as unknown as number)}
              status={label as StatusType}
            />
          );
        })}
        {filtered.length === 0 && (
          <EmptyMsg>표시할 히스토리가 없습니다.</EmptyMsg>
        )}
      </Content>
    </PageWrapper>
  );
};

export default HistoryPage;

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px 10px;
  background: #fff;
  border-bottom: 1px solid #f0f0f0;
`;

const BackButton = styled.button`
  background: transparent;
  border: none;
  padding: 4px;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const BackIcon = styled.img`
  width: 24px;
  height: 24px;
  transform: scaleX(-1);
`;

const Title = styled.h1`
  margin: 0;
  font-size: 20px;
  font-weight: 800;
  color: #000;
`;

const HeaderRight = styled.div`
  width: 24px;
  height: 24px;
`;

const Content = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 8px 16px 24px;
  background: #fafafa;
`;

const EmptyMsg = styled.div`
  padding: 40px 0;
  text-align: center;
  color: #888;
  font-size: 14px;
`;
