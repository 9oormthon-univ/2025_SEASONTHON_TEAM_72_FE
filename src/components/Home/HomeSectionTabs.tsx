import styled, { css } from "styled-components";
import { useState, useMemo } from "react";
import HomeData from "../../mocks/homeData.json";
import InProgressItem from "./InProgressItem";
import type { StatusType } from "./InProgressItem";
import { SETTLEMENT_STATUS_LABEL } from "../../constants/status";
import rightIcon from "../../assets/icons/right_icon.svg";

const HomeSectionTabs = () => {
  const [tab, setTab] = useState<"inprogress" | "done">("inprogress");

  const list = useMemo(() => {
    if (tab === "done") return HomeData.filter((d) => d.status === "DONE");
    return HomeData.filter((d) => d.status !== "DONE");
  }, [tab]);

  const formatDate = (ts: number) => {
    const d = new Date(ts);
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${mm}.${dd}`;
  };

  return (
    <TabsWrapper>
      <TabsBar>
        <TabButton
          $active={tab === "inprogress"}
          onClick={() => setTab("inprogress")}
        >
          진행중
        </TabButton>
        <TabButton $active={tab === "done"} onClick={() => setTab("done")}>
          종료
        </TabButton>
        <Indicator $index={tab === "inprogress" ? 0 : 1} />
      </TabsBar>
      <TabPanel>
        <ArrowRow>
          <img src={rightIcon} alt="오른쪽 화살표" />
        </ArrowRow>
        {list.map((it) => {
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
        {list.length === 0 && <EmptyText>표시할 정산이 없습니다.</EmptyText>}
      </TabPanel>
    </TabsWrapper>
  );
};

export default HomeSectionTabs;

const TabsWrapper = styled.div`
  width: 100%;
  margin-top: 32px;
`;

const TabsBar = styled.div`
  position: relative;
  display: flex;
  width: 115px;
`;

const TabButton = styled.button<{ $active: boolean }>`
  flex: 1;
  background: transparent;
  border: none;
  width: fit-content;
  padding: 6px 5px;
  cursor: pointer;
  font-size: 18px;
  font-weight: 600;
  color: #6b6b6b;
  position: relative;
  transition: color 0.2s;
  ${({ $active }) =>
    $active &&
    css`
      color: #f44336;
      font-weight: 700;
    `}
`;

const Indicator = styled.span<{ $index: number }>`
  position: absolute;
  left: 0;
  bottom: 0;
  height: 3px;
  width: 50%;
  background: #f44336;
  border-radius: 10px;
  transform: translateX(${(p) => p.$index * 100}%);
  transition: transform 0.25s ease;
`;

const TabPanel = styled.div`
  padding-top: 8px;
`;

const EmptyText = styled.div`
  padding: 24px 4px;
  font-size: 13px;
  color: #888;
  text-align: center;
`;
const ArrowRow = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: 20px;
  padding-bottom: 10px;
  width: 100%;
`;
