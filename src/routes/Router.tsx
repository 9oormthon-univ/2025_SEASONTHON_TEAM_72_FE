import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateLinkPage from "../pages/CreateLinkPage";
import FinishSettleupPage from "../pages/FinishSettleupPage";
import SettleupResultPage from "../pages/SettleupResultPage";
import Layout from "../components/Layout/Layout";
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/createlink" element={<CreateLinkPage />} />
          <Route path="/finishsettleup" element={<FinishSettleupPage />} />
          <Route path="/result" element={<SettleupResultPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
