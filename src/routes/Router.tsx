import { BrowserRouter, Route, Routes } from "react-router-dom";
import InvitationCodePage from "../pages/InvitationCodePage";
import StartSettlementPage from "../pages/StartSettlementPage";
import ReviewReceiptPage from "../pages/ReviewReceiptPage";
import ResultMemberPage from "../pages/ResultMemberPage";
import ResultManagerPage from "../pages/ResultManagerPage";
import FinishSettleupPage from "../pages/FinishSettleupPage";
import HomePage from "../pages/HomePage";
import AlarmPage from "../pages/AlarmPage";
import HistoryPage from "../pages/HistoryPage";
import ReceiptConfirmPage from "../pages/ReceiptConfirmPage";
import OCRLoadingPage from "../pages/OCRLoadingPage";
import LoginPage from "../pages/LoginPage";
import SelectPeopleCountPage from "../pages/SelectPeopleCountPage";
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
          <Route path="/review" element={<ReviewReceiptPage />} />
          <Route path="/finish" element={<FinishSettleupPage />} />
          <Route path="/receiptconfirm" element={<ReceiptConfirmPage />} />
          <Route path="/ocrloading" element={<OCRLoadingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/selectpeoplecount" element={<SelectPeopleCountPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
