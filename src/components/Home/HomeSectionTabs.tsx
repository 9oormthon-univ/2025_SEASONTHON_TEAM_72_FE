import styled, { css } from "styled-components";
import { useState } from "react";
import InProgressSection from "./InProgressSection";
import DoneSection from "./DoneSection";

const HomeSectionTabs = () => {
  const [tab, setTab] = useState<"inprogress" | "done">("inprogress");

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
        {tab === "inprogress" ? <InProgressSection /> : <DoneSection />}
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
