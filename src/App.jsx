import { Routes, Route } from "react-router-dom";
import AppLayout from "@/layouts/AppLayout";
import CampaignsPage from "@/pages/CampaignsPage";
import CampaignDetails from "./pages/CampaignDetails";

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<CampaignsPage />} />      
        <Route path="campaigns" element={<CampaignsPage />} />
        <Route path="/campaign-details" element={<CampaignDetails />} />
      </Route>
    </Routes>
  );
}
