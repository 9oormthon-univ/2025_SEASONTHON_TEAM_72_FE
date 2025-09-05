import styled from "styled-components";
import InProgressItem from "./InProgressItem";
import HomeData from "../../mocks/homeData.json";
import type { StatusType } from "./InProgressItem";
import rightIcon from "../../assets/icons/right_icon.svg";

const formatDate = (ts: number) => {
  const d = new Date(ts);
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${mm}.${dd}`;
};

const InProgressSection = () => {
  return (
    <Wrapper>
      <ArrowDiv>
        <img src={rightIcon} alt="오른쪽 화살표" />
      </ArrowDiv>
      {HomeData.map((it) => {
        return (
          <InProgressItem
            key={it.id}
            title={it.name}
            dueDate={formatDate(it.date as unknown as number)}
            status={it.status as StatusType}
          />
        );
      })}
    </Wrapper>
  );
};

export default InProgressSection;

const Wrapper = styled.div`
  padding: 12px 0 24px;
`;

const ArrowDiv = styled.div`
  display: flex;
  justify-content: end;
  margin-right: 20px;
  padding-bottom: 10px;
  width: 100%;
`;
