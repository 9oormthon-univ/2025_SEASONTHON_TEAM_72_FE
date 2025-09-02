import styled from "styled-components";
import SettleupItem from "./SettleupItem";
import { type UserSelection } from "./SettleupDrawer";

const mockSelections: Record<string, UserSelection[]> = {
  콜라: [
    { user: "사용자1", amount: 0.2 },
    { user: "사용자2", amount: 0.7 },
  ],
  사이다: [
    { user: "사용자1", amount: 1 },
    { user: "사용자3", amount: 0.5 },
  ],
  양상추: [{ user: "사용자2", amount: 0.4 }],
};

const SettleupSection = () => {
  return (
    <SettleupSectionLayout>
      <SettleupItem
        name="콜라"
        quantity={2}
        price={1500}
        selections={mockSelections["콜라"]}
      />
      <SettleupItem
        name="사이다"
        quantity={3}
        price={1500}
        selections={mockSelections["사이다"]}
      />
      <SettleupItem
        name="양상추"
        quantity={1}
        price={1680}
        selections={mockSelections["양상추"]}
      />
    </SettleupSectionLayout>
  );
};

export default SettleupSection;

const SettleupSectionLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  background-color: #eeeeee;
  width: auto;
  height: 100vh;
  margin-top: 24px;
  padding: 24px 20px 0 20px;
`;
