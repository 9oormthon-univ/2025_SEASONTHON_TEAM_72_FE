import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import ReceiptConfirmPage from "../pages/ReceiptConfirmPage";

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
