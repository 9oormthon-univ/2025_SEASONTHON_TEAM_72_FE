import { BrowserRouter, Route, Routes } from "react-router-dom";
import InvitationCodePage from "../pages/InvitationCodePage";
import Layout from "../components/Layout/Layout";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/invitationcode" element={<InvitationCodePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
