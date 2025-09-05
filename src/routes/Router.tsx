import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "../components/Layout/Layout";

import ReceiptConfirmPage from "../pages/ReceiptConfirmPage";
import ReviewReceiptPage from "../pages/ReviewReceiptPage";
import FinishSettleupPage from "../pages/FinishSettleupPage";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/receiptconfirm" element={<ReceiptConfirmPage />} />
          <Route path="/reviewreceipt" element={<ReviewReceiptPage />} />
          <Route path="/finishsettleup" element={<FinishSettleupPage/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );

};

export default Router;