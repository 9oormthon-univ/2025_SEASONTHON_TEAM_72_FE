import { BrowserRouter, Route, Routes } from "react-router-dom";
import InvitationCodePage from "../pages/InvitationCodePage";
import StartSettlementPage from "../pages/StartSettlementPage";
import ReviewReceiptPage from "../pages/ReviewReceiptPage";
import ResultMemberPage from "../pages/ResultMemberPage";
import ResultManagerPage from "../pages/ResultManagerPage";
import FinishSettleupPage from "../pages/FinishSettleupPage";
import StartSettlementPage from "../pages/StartSettlementPage";
import HomePage from "../pages/HomePage";
import AlarmPage from "../pages/AlarmPage";
import HistoryPage from "../pages/HistoryPage";
import ReceiptConfirmPage from "../pages/ReceiptConfirmPage";
import Layout from "../components/Layout/Layout";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/alarm" element={<AlarmPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/invitationcode" element={<InvitationCodePage />} />
          <Route path="/startsettlement" element={<StartSettlementPage />} />
          <Route path="/reviewreceipt" element={<ReviewReceiptPage />} />
          <Route path="/result/manager" element={<ResultManagerPage />} />
          <Route path="/result/member" element={<ResultMemberPage />} />
          <Route path="/finishsettleup" element={<FinishSettleupPage />} />
          <Route path="/review" element={<ReviewReceiptPage />} />
          <Route path="/finish" element={<FinishSettleupPage />} />
          <Route path="/receiptconfirm" element={<ReceiptConfirmPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
