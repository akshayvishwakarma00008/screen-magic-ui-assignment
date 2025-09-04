import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, Info } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ListView({
  data,
  page,
  setPage,
  totalPages,
  pageSize,
  setPageSize,
}) {
  return (
    <>
      <Card
        className="mt-4 overflow-hidden rounded-lg border border-gray-200 shadow-sm"
        style={{ padding: "0px" }}
      >
        <Table className="w-full border-collapse">
          <TableHeader>
            <TableRow className="border-b border-gray-200 bg-gray-200">
              <TableHead className="w-[34%] text-slate-700 py-6">
                Campaign Name
              </TableHead>
              <TableHead className="text-slate-700">Message</TableHead>
              <TableHead className="w-[12%] text-slate-700">
                Recipient’s Source
              </TableHead>
              <TableHead className="w-[10%] text-slate-700">
                No. of Recipients
              </TableHead>
              <TableHead className="w-[14%] text-slate-700">Status</TableHead>
              <TableHead className="w-[12%] text-slate-700">
                Created On
              </TableHead>
              <TableHead className="w-[40px]" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((c) => (
              <Row key={c.id} c={c} />
            ))}
          </TableBody>
        </Table>
      </Card>

      <div className="flex items-center justify-between gap-4 bg-background p-3">
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 cursor-pointer"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            aria-label="Previous page"
          >
            ‹
          </Button>

          {Array.from({ length: Math.min(totalPages, 6) }, (_, i) => {
            const start = Math.max(1, Math.min(page - 2, totalPages - 5));
            const n = start + i;
            if (n > totalPages) return null;
            return (
              <Button
                key={n}
                variant={n === page ? "primary" : ""}
                size="sm"
                className={cn(
                  n === page
                    ? "h-8 min-w-8 px-0 bg-blue-100 text-blue-600 cursor-pointer"
                    : "cursor-pointer"
                )}
                onClick={() => setPage(n)}
              >
                {n}
              </Button>
            );
          })}

          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 cursor-pointer"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            aria-label="Next page"
          >
            ›
          </Button>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Select
            value={String(pageSize)}
            onValueChange={(v) => {
              const ps = Number(v);
              setPageSize(ps);
              setPage(1);
            }}
          >
            <SelectTrigger className="h-8 w-[110px] border border-gray-200">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="border border-gray-200">
              {[5, 10, 20, 50].map((n) => (
                <SelectItem key={n} value={String(n)} className="text-gray-400">
                  <span className="text-gray-400">{n} / page </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </>
  );
}

function Row({ c, index }) {
  return (
    <TableRow
      className={cn(
        "align-top border-b border-gray-200",
        index % 2 === 1 ? "bg-gray-50" : "bg-white",
        "hover:bg-gray-50/80 text-gray-600"
      )}
    >
      <TableCell className="px-6 py-3">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10">
            <Info className="h-4 w-4 text-blue-400" />
          </div>
          <div className="min-w-0">
            <div className="truncate font-medium leading-tight text-black">
              {c.name}
            </div>
            <div className="text-xs text-muted-foreground">
              {c.channel} <span className="mx-1">|</span> {c.type}{" "}
              <span className="mx-1">|</span> Edited {c.editedOn}
            </div>
          </div>
        </div>
      </TableCell>

      <TableCell className="text-sm text-muted-foreground">
        {c.message}
      </TableCell>
      <TableCell className="text-sm">{c.source}</TableCell>
      <TableCell className="text-sm">{c.recipients}</TableCell>

      <TableCell>
        <StatusBadge tone={c.status.tone}>{c.status.label}</StatusBadge>
      </TableCell>

      <TableCell className="text-sm">{c.createdOn}</TableCell>

      <TableCell className="text-right">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-44 bg-white border border-gray-200"
          >
            <DropdownMenuItem className="cursor-pointer">
              Rerun campaign
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              View details
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">Edit</DropdownMenuItem>

            <DropdownMenuItem className="text-destructive focus:text-destructive">
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}

function StatusBadge({ tone, children }) {
  const map = {
    warning: "bg-amber-100 text-amber-700 ring-1 ring-amber-200",
    muted: "bg-[#edeff3] text-[#edeff3]-700 ring ring-[#edeff3]",
    info: "bg-blue-100 text-blue-700 ring-1 ring-blue-200",
    destructive: "bg-red-100 text-red-700 ring-1 ring-red-200",
    success: "bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200",
    //draft:"bg-[#edeff3]-100 text-[#edeff3]-700 ring-1 ring-[#edeff3]-200"
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
