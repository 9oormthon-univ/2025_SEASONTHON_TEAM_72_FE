import { BrowserRouter, Route, Routes } from "react-router-dom";
import ReviewReceiptPage from "../pages/ReviewReceiptPage";
import FinishSettleupPage from "../pages/FinishSettleupPage";
import StartSettlementPage from "../pages/StartSettlementPage";
import Layout from "../components/Layout/Layout";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}> 
          <Route path="/startsettlement" element={<StartSettlementPage />} />
          <Route path="/reviewreceipt" element={<ReviewReceiptPage />} />
          <Route path="/finishsettleup" element={<FinishSettleupPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;