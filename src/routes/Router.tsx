import { BrowserRouter, Route, Routes } from "react-router-dom";
import OCRLoadingPage from "../pages/OCRLoadingPage";
import Layout from "../components/Layout/Layout";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/ocrloading" element={<OCRLoadingPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
