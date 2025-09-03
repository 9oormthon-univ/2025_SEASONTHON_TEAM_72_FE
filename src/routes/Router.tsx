import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateLinkPage from "../pages/CreateLinkPage";
import Layout from "../components/Layout/Layout";
import StartSettlementPage from "../pages/StartSettlementPage";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/createlink" element={<CreateLinkPage />} />
          <Route path="/startsettlement" element={<StartSettlementPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
