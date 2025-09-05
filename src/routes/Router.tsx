import { BrowserRouter, Route, Routes } from "react-router-dom";
import StartSettlementPage from "../pages/StartSettlementPage";
import ReviewReceiptPage from "../pages/ReviewReceiptPage";
import FinishSettleupPage from "../pages/FinishSettleupPage";
import Layout from "../components/Layout/Layout";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/startsettlement" element={<StartSettlementPage />} />
          <Route path="/review" element={<ReviewReceiptPage />} />
          <Route path="/finish" element={<FinishSettleupPage />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;