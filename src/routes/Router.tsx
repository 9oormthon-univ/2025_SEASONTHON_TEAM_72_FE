import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateLinkPage from "../pages/CreateLinkPage";
import Layout from "../components/Layout/Layout";
import ReceiptConfirmPage from "../pages/ReceiptConfirmPage";
import ReceiptEditPage from "../pages/ReceiptEditPage";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/createlink" element={<CreateLinkPage />} />
          <Route path="/receiptconfirm" element={<ReceiptConfirmPage />} />
          <Route path="/receiptedit" element={<ReceiptEditPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
