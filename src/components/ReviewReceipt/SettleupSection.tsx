import styled from "styled-components";
import SettleupItem from "./SettleupItem";

const SettleupSection = () => {
  return (
    <SettleupSectionLayout>
      <SettleupItem
        name="콜라"
        quantity={2}
        price={1500}
        selectedAmount={0.5}
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
  /* height: 300px; */
  margin: 24px 20px 0 20px;
`;
