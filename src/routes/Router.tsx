import { BrowserRouter, Route, Routes } from "react-router-dom";
<<<<<<< HEAD
import Layout from "../components/Layout/Layout";
import ReceiptConfirmPage from "../pages/ReceiptConfirmPage";
import ReviewReceiptPage from "../pages/ReviewReceiptPage";
import FinishSettleupPage from "../pages/FinishSettleupPage";
=======
import CreateLinkPage from "../pages/CreateLinkPage";
import ReviewReceiptPage from "../pages/ReviewReceiptPage";
import FinishSettleupPage from "../pages/FinishSettleupPage";
import Layout from "../components/Layout/Layout";
>>>>>>> origin/main

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
<<<<<<< HEAD
          <Route path="/receiptconfirm" element={<ReceiptConfirmPage />} />
=======
          <Route path="/createlink" element={<CreateLinkPage />} />
>>>>>>> origin/main
          <Route path="/reviewreceipt" element={<ReviewReceiptPage />} />
          <Route path="/finishsettleup" element={<FinishSettleupPage/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );

};

export default Router;