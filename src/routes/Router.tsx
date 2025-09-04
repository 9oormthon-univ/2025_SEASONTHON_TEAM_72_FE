import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateLinkPage from "../pages/CreateLinkPage";
import ReviewReceiptPage from "../pages/ReviewReceiptPage";
import ResultMemberPage from "../pages/ResultMemberPage";
import ResultManagerPage from "../pages/ResultManagerPage";
import Layout from "../components/Layout/Layout";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/createlink" element={<CreateLinkPage />} />
          <Route path="/reviewreceipt" element={<ReviewReceiptPage />} />
          <Route path="/result/manager" element={<ResultManagerPage />} />
          <Route path="/result/member" element={<ResultMemberPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
