import { NavLink, useLocation } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import {
  Home,
  MessageSquare,
  Users,
  Calendar,
  BarChart3,
  Settings,
  HelpCircle,
  Rocket,
} from "lucide-react";
import chatIcon from "../assets/chat.png";

const primaryNav = [
  { to: "/", label: "Home", icon: Home },
  { to: "/campaigns", label: "Campaigns", icon: Rocket },
  { to: "#", label: "Inbox", icon: MessageSquare },
  { to: "#", label: "Contacts", icon: Users },
  { to: "#", label: "Calendar", icon: Calendar },
  { to: "#", label: "Reports", icon: BarChart3 },
];

const secondaryNav = [
  { to: "#", label: "Settings", icon: Settings },
  { to: "#", label: "Help", icon: HelpCircle },
];

export default function Sidebar({ expanded, onToggle }) {
  const location = useLocation?.();

  return (
    <TooltipProvider delayDuration={150}>
      <aside
        className={cn(
          "h-dvh bg-slate-900 text-slate-200 border-r-0 sticky top-0 flex flex-col",
          expanded ? "w-64" : "w-[72px]"
        )}
      >
        <div className="flex items-center gap-2 p-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
            <img src={chatIcon} alt="Chat Logo" className="h-8 w-8" />
          </div>
        </div>
        <Separator />

        <ScrollArea className="flex-1">
          <nav className="px-2 py-3 grid gap-2">
            {primaryNav.map((item) => (
              <NavItem
                key={item.to}
                to={item.to}
                label={item.label}
                icon={item.icon}
                expanded={expanded}
                active={matchPath(location?.pathname, item.to)}
              />
            ))}

            <Separator className="my-2 bg-white/10" />

            {secondaryNav.map((item) => (
              <NavItem
                key={item.to}
                to={item.to}
                label={item.label}
                icon={item.icon}
                expanded={expanded}
                active={matchPath(location?.pathname, item.to)}
              />
            ))}
          </nav>
        </ScrollArea>

        {/* <div className="p-3 mt-auto">
          <div
            className={cn(
              "flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-accent cursor-pointer",
              expanded ? "justify-start" : "justify-center"
            )}
          >
            <div className="h-8 w-8 rounded-full bg-muted" />
            {expanded && (
              <div className="grid">
                <span className="text-sm font-medium leading-tight">
                  janhavi
                </span>
                <span className="text-xs text-muted-foreground">Admin</span>
              </div>
            )}
          </div>
        </div> */}
      </aside>
    </TooltipProvider>
  );
}

function NavItem({ to, label, icon: Icon, expanded, active }) {
  const baseItem =
    "group flex items-center gap-3 rounded-xl px-3 py-2 transition";

  const content = (
    <div
      className={cn(
        baseItem,
        active
          ? "bg-white/10 text-white ring-1 ring-white/15"
          : "text-slate-300 hover:bg-white/5 hover:text-white"
      )}
    >
      <Icon
        className={cn(
          "h-5 w-5",
          active ? "text-white" : "text-slate-300 group-hover:text-white"
        )}
      />
      {expanded && (
        <span className={cn("text-sm", active && "font-medium")}>{label}</span>
      )}
    </div>
  );

  if (expanded) {
    return (
      <NavLink to={to} className="block">
        {content}
      </NavLink>
    );
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <NavLink to={to} className="block">
          {content}
        </NavLink>
      </TooltipTrigger>
      <TooltipContent side="right" className="py-1 px-2 text-xs">
        {label}
      </TooltipContent>
    </Tooltip>
  );
}

function matchPath(pathname, to) {
  if (!pathname || !to) return false;
  if (to === "/") return pathname === "/";
  return pathname.startsWith(to);
}
