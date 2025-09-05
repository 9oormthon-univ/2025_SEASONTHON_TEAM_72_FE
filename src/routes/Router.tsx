import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import ReceiptEditPage from "../pages/ReceiptEditPage";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/receiptedit" element={<ReceiptEditPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
