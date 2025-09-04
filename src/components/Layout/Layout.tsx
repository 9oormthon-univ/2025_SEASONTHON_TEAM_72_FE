import { Outlet } from "react-router-dom";
import styled from "styled-components";

const Layout = () => {
  return (
    <LayoutWrapper>
      <Main>
        <Outlet />
      </Main>
    </LayoutWrapper>
  );
};

export default Layout;

const LayoutWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: #fffafa;
  overflow: hidden;
`;
const Main = styled.div`
  width: 390px;
  height: 100vh;
  background-color: white;
  overflow: hidden;
  position: relative;
`;
