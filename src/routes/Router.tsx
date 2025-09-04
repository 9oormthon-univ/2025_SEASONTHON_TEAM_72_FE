import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateLinkPage from "../pages/CreateLinkPage";
import OCRLoadingPage from "../pages/OCRLoadingPage";
import Layout from "../components/Layout/Layout";

const Router = () => {
  return (
    <BrowserRouter future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/createlink" element={<CreateLinkPage />} />
          <Route path="/ocrloading" element={<OCRLoadingPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
