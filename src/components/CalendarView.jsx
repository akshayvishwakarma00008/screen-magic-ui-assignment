import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { calendarEvents } from "@/dummy-data/calendar-events";

function renderEventContent(arg) {
  const tone = arg.event.extendedProps?.status?.tone;
  const label = arg.event.extendedProps?.status?.label || arg.event.title;

  const map = {
    warning: {
      bg: "w-full bg-amber-100 text-amber-700 ring-1 ring-amber-200 mb-2 cursor-pointer",
      dot: "bg-amber-500",
    },
    destructive: {
      bg: "w-full bg-red-100 text-red-700 ring-1 ring-red-200 mb-2 cursor-pointer",
      dot: "bg-red-500",
    },
    success: {
      bg: "w-full bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200 mb-2 cursor-pointer",
      dot: "bg-emerald-500",
    },
    info: {
      bg: "w-full bg-blue-100 text-blue-700 ring-1 ring-blue-200 mb-2 cursor-pointer",
      dot: "bg-blue-500",
    },
    muted: {
      bg: "w-full bg-gray-100 text-gray-700 ring-1 ring-gray-200 mb-2 cursor-pointer",
      dot: "bg-gray-500",
    },
    pending: {
      bg: "w-full bg-violet-100 text-violet-700 ring-1 ring-violet-200 mb-2 cursor-pointer",
      dot: "bg-violet-500",
    },
  };

  const toneClasses = map[tone] || map.muted;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 truncate rounded-sm px-2 py-0.5 text-xs font-medium",
        toneClasses.bg
      )}
    >
      <span className={cn("h-2 w-2 rounded-full", toneClasses.dot)} />
      {label}
    </span>
  );
}

export default function CalendarView() {
  const [selectedEvent, setSelectedEvent] = useState(null);

  return (
    <div className="relative mt-6">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          start: "title",
          center: "",
          end: "dayGridMonth,timeGridWeek,timeGridDay,prev,next",
        }}
        events={calendarEvents}
        eventContent={renderEventContent}
        eventClick={(info) => {
          setSelectedEvent(info.event);
        }}
        height="auto"
      />

      {selectedEvent && (
        <Card className="absolute top-20 left-1/2 -translate-x-1/2 w-[400px] p-4 shadow-xl z-50 bg-white border border-gray-200">
          <div className="flex justify-between items-center">
            <StatusBadge tone={selectedEvent.extendedProps.status.tone}>
              {selectedEvent.extendedProps.status.label}
            </StatusBadge>
            <button onClick={() => setSelectedEvent(null)}>
              <X className="h-5 w-5 text-gray-500 hover:text-gray-700 cursor-pointer" />
            </button>
          </div>

          <div className="flex gap-1">
            <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-sm bg-blue-100">
              <Info className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <p className="font-semibold">{selectedEvent.title}</p>
              <p className="text-xs text-gray-500 ">
                {selectedEvent.extendedProps.channel} |{" "}
                {selectedEvent.extendedProps.type} | Edited{" "}
                {selectedEvent.extendedProps.editedOn}
              </p>
            </div>
          </div>

          {selectedEvent.extendedProps.image && (
            <img
              src={selectedEvent.extendedProps.image}
              alt=""
              className="rounded-lg mt-3"
            />
          )}

          <p className="mt-2 text-sm text-gray-700">
            {selectedEvent.extendedProps.message}
          </p>
        </Card>
      )}
    </div>
  );
}

function StatusBadge({ tone, children }) {
  const map = {
    warning: "bg-amber-100 text-amber-700 ring-1 ring-amber-200",
    destructive: "bg-red-100 text-red-700 ring-1 ring-red-200",
    success: "bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200",
    info: "bg-blue-100 text-blue-700 ring-1 ring-blue-200",
    muted: "bg-[#edeff3] text-[#edeff3]-700 ring ring-[#edeff3]",
  };
  return (
    <Badge
      variant="secondary"
      className={cn(
        "rounded-full px-3 py-1 text-xs font-medium",
        map[tone] || ""
      )}
    >
      {children}
    </Badge>
  );
}
