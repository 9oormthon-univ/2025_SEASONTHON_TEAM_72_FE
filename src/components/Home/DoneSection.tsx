import styled from "styled-components";

const DoneSection = () => {
  return (
    <Wrapper>
      <Placeholder>종료된 정산이 여기에 표시됩니다.</Placeholder>
    </Wrapper>
  );
};

export default DoneSection;

const Wrapper = styled.div`
  padding: 12px 0 24px;
`;

const Placeholder = styled.div`
  font-size: 14px;
  color: #444;
`;
