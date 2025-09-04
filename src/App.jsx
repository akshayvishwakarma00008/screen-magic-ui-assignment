import { Routes, Route } from "react-router-dom";
import AppLayout from "@/layouts/AppLayout";
import CampaignsPage from "@/pages/CampaignsPage";

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<CampaignsPage />} />      
        <Route path="campaigns" element={<CampaignsPage />} />
      </Route>
    </Routes>
  );
}
