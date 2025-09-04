import { useMemo, useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Card } from "@/components/ui/card";

import { CalendarDays, List, Filter, Search, Plus } from "lucide-react";
import ListView from "../components/ListView";
import CalendarView from "@/components/CalendarView";
import { campaigns } from "@/dummy-data/campaign-data";

export default function CampaignsPage() {
  const [view, setView] = useState("list");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return campaigns;
    return campaigns.filter((c) =>
      [c.name, c.message, c.source, c.status.label].some((v) =>
        String(v).toLowerCase().includes(q)
      )
    );
  }, [search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const current = filtered.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="min-h-dvh p-6">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-4xl font-semibold tracking-tight">Campaign</h1>
          <p className="text-sm text-gray-400">
            Automate your customer journey with pre build recepies
          </p>
        </div>

        <div className="flex items-center gap-2">
          <ToggleGroup
            type="single"
            value={view}
            onValueChange={(v) => v && setView(v)}
            variant="outline"
            className="border border-gray-200 "
          >
            <ToggleGroupItem
              value="list"
              aria-label="List view"
              className={`h-9 w-9 border border-gray-200 cursor-pointer ${
                view === "list" ? "bg-blue-100" : ""
              }`}
            >
              <List
                className={`h-4 w-4 ${
                  view === "list" ? "text-[#0662f9]" : "text-gray-500"
                }`}
              />
            </ToggleGroupItem>
            <ToggleGroupItem
              value="calendar"
              aria-label="Calendar view"
              className={`h-9 w-9 border border-gray-200 cursor-pointer ${
                view === "calendar" ? "bg-blue-100" : ""
              }`}
            >
              <CalendarDays
                className={`h-4 w-4 ${
                  view === "calendar" ? "text-[#0662f9]" : "text-gray-500"
                }`}
              />
            </ToggleGroupItem>
          </ToggleGroup>
          {/* <Button variant="outline" size="icon" className="h-9 w-9">
            <CalendarDays className="h-4 w-4" />
          </Button> */}
          <Button className="bg-[#0662f9] text-white cursor-pointer">
            <Plus className="h-4 w-4" />
            Create Campaign
          </Button>
        </div>
      </div>

      <div className="flex items-end justify-between gap-4">
        <Tabs defaultValue="all" className="w-full">
          {view === "list" ? (
            <>
              <div className="flex items-center justify-between gap-4">
                <TabsList className="bg-transparent p-0">
                  <TabsTrigger
                    value="all"
                    className=" text-sm data-[state=active]:text-[#0662f9] cursor-pointer"
                  >
                    All Campaigns
                  </TabsTrigger>
                  <TabsTrigger
                    value="activity"
                    className="ml-6 text-sm data-[state=active]:text-[#0662f9] cursor-pointer"
                  >
                    Activity log
                  </TabsTrigger>
                </TabsList>

                <div className="flex items-center gap-2">
                  <div className="relative w-[280px] ">
                    <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <Input
                      value={search}
                      onChange={(e) => {
                        setPage(1);
                        setSearch(e.target.value);
                      }}
                      placeholder="Search"
                      className="pl-9 border border-gray-200"
                    />
                  </div>
                  <Button
                    variant="outline"
                    className="gap-2 border border-gray-200 text-gray-400"
                  >
                    <Filter className="h-4 w-4" />
                    Filter
                  </Button>
                </div>
              </div>

              <Separator className=" bg-gray-200 w-4" />
            </>
          ) : null}

          <TabsContent value="all" className="mt-2">
            {view === "list" ? (
              <ListView
                data={current}
                page={page}
                setPage={setPage}
                totalPages={totalPages}
                pageSize={pageSize}
                setPageSize={setPageSize}
              />
            ) : (
              <CalendarView />
            )}
          </TabsContent>

          <TabsContent value="activity" className="mt-4">
            <Card className="p-8 text-sm text-muted-foreground">
              Activity log coming soon…
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Separator className="mt-2" />
    </div>
  );
}
