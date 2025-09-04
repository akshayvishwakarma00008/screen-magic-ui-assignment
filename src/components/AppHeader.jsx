import { Button } from "@/components/ui/button";
import { HelpCircle, CreditCard, Menu, User2 } from "lucide-react";

export default function AppHeader({
  onToggleSidebar,
  offsetLeft = 0,
  height = 56,
}) {
  return (
    <header
      className="fixed top-0 right-0 z-50 h-14 border-b border-gray-200 bg-white/95 backdrop-blur"
      style={{ left: offsetLeft, height }}
    >
      <div className="mx-auto flex h-full items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 text-gray-500 cursor-pointer"
            onClick={onToggleSidebar}
            aria-label="Toggle sidebar"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 text-gray-500 cursor-pointer"
          >
            <HelpCircle className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 text-gray-500 cursor-pointer"
          >
            <CreditCard className="h-5 w-5" />
          </Button>
          <div className="ml-2 flex items-center gap-2 rounded-full bg-gray-100 px-2.5 py-1 cursor-pointer">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-400/50">
              <User2 className="h-4 w-4 text-white" />
            </div>
            <div className="leading-tight">
              <div className="text-xs text-gray-500">Admin</div>
              <div className="text-sm font-semibold -mt-0.5">janhavi</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
