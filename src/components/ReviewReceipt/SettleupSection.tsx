import styled from "styled-components";
import SettleupItem from "./SettleupItem";
import { type UserSelection } from "./SettleupDrawer";

export interface ItemData {
  status: string;
  name: string;
  quantity: number;
  price: number;
  selections: UserSelection[];
}

const mockData: ItemData[] = [
  {
    status: "완료",
    name: "콜라",
    quantity: 2,
    price: 1500,
    selections: [
      { user: "내이름", amount: 0.2 },
      { user: "사용자1", amount: 0.2 },
      { user: "사용자2", amount: 0.7 },
    ],
  },
  {
    status: "미완료",
    name: "사이다",
    quantity: 3,
    price: 1500,
    selections: [
      { user: "내이름", amount: 0.25 },
      { user: "사용자1", amount: 1 },
      { user: "사용자3", amount: 0.25 },
    ],
  },
  {
    status: "초과",
    name: "양상추",
    quantity: 2,
    price: 1680,
    selections: [
      { user: "내이름", amount: 0.2 },
      { user: "사용자1", amount: 1 },
      { user: "사용자2", amount: 1 },
      { user: "사용자3", amount: 0.5 },],
  },
];

const SettleupSection = () => {
  return (
    <SettleupSectionLayout>
      {mockData.map((item) => (
        <SettleupItem key={item.name} {...item} />
      ))}
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
