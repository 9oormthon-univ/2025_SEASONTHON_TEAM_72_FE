import { BrowserRouter, Route, Routes } from "react-router-dom";
import InvitationCodePage from "../pages/InvitationCodePage";
import StartSettlementPage from "../pages/StartSettlementPage";
import ReviewReceiptPage from "../pages/ReviewReceiptPage";
import FinishSettleupPage from "../pages/FinishSettleupPage";
import ReceiptConfirmPage from "../pages/ReceiptConfirmPage";
import SelectPeopleCountPage from "../pages/SelectPeopleCountPage";

import Layout from "../components/Layout/Layout";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/invitationcode" element={<InvitationCodePage />} />
          <Route path="/startsettlement" element={<StartSettlementPage />} />
          <Route path="/review" element={<ReviewReceiptPage />} />
          <Route path="/finish" element={<FinishSettleupPage />} />
          <Route path="/receiptconfirm" element={<ReceiptConfirmPage />} />
          <Route path="/selectpeoplecount" element={<SelectPeopleCountPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;