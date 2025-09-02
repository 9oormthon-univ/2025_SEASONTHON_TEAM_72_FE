import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateLinkPage from "../pages/CreateLinkPage";
import ReviewReceiptPage from "../pages/ReviewReceiptPage";
import Layout from "../components/Layout/Layout";
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/createlink" element={<CreateLinkPage />} />
          <Route path="/reviewreceipt" element={<ReviewReceiptPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
