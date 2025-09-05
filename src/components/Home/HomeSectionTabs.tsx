import styled, { css } from "styled-components";
import { useState, useMemo } from "react";
import HomeData from "../../mocks/homeData.json";
import InProgressItem from "./InProgressItem";
import type { StatusType } from "./InProgressItem";
import { SETTLEMENT_STATUS_LABEL } from "../../constants/status";

const HomeSectionTabs = () => {
  // TODO: 백엔드에서 정산의 내 역할 get
  const [tab, setTab] = useState<"inprogress" | "done">("inprogress");

  const list = useMemo(() => {
    if (tab === "done") return HomeData.filter((d) => d.status === "DONE");
    return HomeData.filter((d) => d.status !== "DONE");
  }, [tab]);

  const formatDate = (value: string | number | Date) => {
    let d =
      typeof value === "string" || typeof value === "number"
        ? new Date(value)
        : new Date(value.getTime());
    if (isNaN(d.getTime()) && typeof value === "string") {
      d = new Date(value.replace(" ", "T"));
    }
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
        {list.map((it) => {
          const label =
            SETTLEMENT_STATUS_LABEL[
              it.status as keyof typeof SETTLEMENT_STATUS_LABEL
            ];
          return (
            <InProgressItem
              key={it.id}
              title={it.title}
              dueDate={formatDate(it.created_at as string)}
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
  display: flex;
  flex-direction: column;
  flex: 1; /* allow to expand within parent */
  min-height: 0; /* enable child overflow scroll */
  border: 1px solid red;
`;

const TabsBar = styled.div`
  position: relative;
  display: flex;
  width: 115px;
  flex: 0 0 auto; /* prevent shrinking so panel below can scroll */
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
  padding-top: 12px;
  flex: 1; /* take remaining height under tabs bar */
  min-height: 0; /* required so overflow works in flex child */
  overflow-y: auto;
  -webkit-overflow-scrolling: touch; /* momentum scrolling on iOS */
  overscroll-behavior: contain;
  padding-bottom: 16px; /* breathing room at bottom */
`;

const EmptyText = styled.div`
  padding: 24px 4px;
  font-size: 13px;
  color: #888;
  text-align: center;
`;
