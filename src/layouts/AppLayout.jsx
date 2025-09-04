import { useState, useMemo } from "react";
import AppHeader from "@/components/AppHeader";
import Sidebar from "@/components/Sidebar";
import { Outlet } from "react-router-dom";

export default function AppLayout() {
  const HEADER_H = 56;
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const SIDEBAR_W = useMemo(() => (sidebarOpen ? 256 : 72), [sidebarOpen]);

  return (
    <div className="min-h-dvh">
      <AppHeader
        onToggleSidebar={() => setSidebarOpen((v) => !v)}
        context={[{ label: "Workspace", value: "SaaS" }]}
        offsetLeft={SIDEBAR_W}
        height={HEADER_H}
      />

      <div className="flex">
        <div className="shrink-0" style={{ width: SIDEBAR_W }}>
          <Sidebar
            expanded={sidebarOpen}
            onToggle={() => setSidebarOpen((v) => !v)}
          />
        </div>

        <main
          className="flex-1 overflow-auto px-6"
          style={{ paddingTop: HEADER_H }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}
