import { BrowserRouter, Route, Routes } from "react-router-dom";
import ReviewReceiptPage from "../pages/ReviewReceiptPage";
import FinishSettleupPage from "../pages/FinishSettleupPage";
import StartSettlementPage from "../pages/StartSettlementPage";
import HomePage from "../pages/HomePage";
import AlarmPage from "../pages/AlarmPage";
import HistoryPage from "../pages/HistoryPage";
import Layout from "../components/Layout/Layout";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/alarm" element={<AlarmPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/startsettlement" element={<StartSettlementPage />} />
          <Route path="/reviewreceipt" element={<ReviewReceiptPage />} />
          <Route path="/finishsettleup" element={<FinishSettleupPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
