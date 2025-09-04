import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateLinkPage from "../pages/CreateLinkPage";
import ReviewReceiptPage from "../pages/ReviewReceiptPage";
import FinishSettleupPage from "../pages/FinishSettleupPage";
import Layout from "../components/Layout/Layout";
import StartSettlementPage from "../pages/StartSettlementPage";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/createlink" element={<CreateLinkPage />} />
          <Route path="/startsettlement" element={<StartSettlementPage />} />
          <Route path="/reviewreceipt" element={<ReviewReceiptPage />} />
          <Route path="/finishsettleup" element={<FinishSettleupPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;