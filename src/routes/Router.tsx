import { BrowserRouter, Route, Routes } from "react-router-dom";
import ReceiptConfirmPage from "../pages/ReceiptConfirmPage";
import Layout from "../components/Layout/Layout";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/receiptconfirm" element={<ReceiptConfirmPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;