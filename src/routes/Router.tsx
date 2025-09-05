import { BrowserRouter, Route, Routes } from "react-router-dom";
import ReviewReceiptPage from "../pages/ReviewReceiptPage";
import ResultMemberPage from "../pages/ResultMemberPage";
import ResultManagerPage from "../pages/ResultManagerPage";
import FinishSettleupPage from "../pages/FinishSettleupPage";
import StartSettlementPage from "../pages/StartSettlementPage";
import ReceiptConfirmPage from "../pages/ReceiptConfirmPage";
import Layout from "../components/Layout/Layout";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}> 
          <Route path="/startsettlement" element={<StartSettlementPage />} />
          <Route path="/reviewreceipt" element={<ReviewReceiptPage />} />
          <Route path="/result/manager" element={<ResultManagerPage />} />
          <Route path="/result/member" element={<ResultMemberPage />} />
          <Route path="/finishsettleup" element={<FinishSettleupPage />} />
          <Route path="/receiptconfirm" element={<ReceiptConfirmPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;