import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Clock3 } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const funnel = [
  { name: "Sent", value: 14017 },
  { name: "Delivered", value: 7572 },
  { name: "Response", value: 2158 },
  { name: "Conversation", value: 1590 },
];

const sideStats = [
  { label: "Valid Number", value: "67%" },
  { label: "Invalid Number", value: "500" },
  { label: "Opt - out", value: "13%" },
  { label: "Response rate", value: "11.35%" },
];

const metaItems = [
  { label: "Total recipients", value: "15,017" },
  { label: "Campaign Type", value: "Broadcast" },
  { label: "Channel", value: "WhatsApp", dot: "#25D366" },
  { label: "Sender ID", value: "98181928198" },
  { label: "Total credits consumed", value: "20,000" },
];

const metaItemsTwo = [
  { label: "Leads", value: "Contacts" },
  { label: "List", value: "Phone field" },
];

export default function CampaignSummary() {
  return (
    <>
      <div className="mb-4 flex items-center gap-3 border-b border-gray-200 py-4 w-full">
        <h1 className="text-2xl font-semibold tracking-tight">Upcoming sale</h1>
        <Badge className="rounded-full bg-emerald-100 px-3 py-1 text-emerald-700 ring-1 ring-emerald-200">
          Completed
        </Badge>
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_380px] mb-4">
        <div>
          <div className="mb-4 rounded-xl bg-blue-50 px-4 py-3 text-sm text-blue-700 ring-1 ring-blue-100">
            Out of <span className="font-semibold">15,017</span> we have found{" "}
            <span className="font-semibold">14,017</span> valid numbers!
          </div>

          <Card className="overflow-hidden p-4 border border-gray-200">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="min-h-[220px]">
                <FunnelAreaChart data={funnel} />
              </div>

              <div className="grid grid-cols-2 gap-4 self-center">
                {sideStats.map((s) => (
                  <div
                    key={s.label}
                    className="rounded-none border-0 border-l-2 bg-white p-3 border-l-gray-200"
                  >
                    <div className="text-xs text-gray-500">{s.label}</div>
                    <div className="mt-1 text-xl font-semibold">{s.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <div className="mt-6 rounded-xl bg-white p-4 border border-gray-200">
            <div className="text-md">
              <span className="font-medium">Campaign description :</span> End of
              the season sale of 2024
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 rounded-md">
              {metaItems.map((m, i) => (
                <MetaBlock
                  key={m.label}
                  label={m.label}
                  value={m.value}
                  dot={m.dot}
                  showSeparator={i !== 0}
                />
              ))}
            </div>
          </div>

          <div className="mt-6 rounded-xl bg-white p-4 border border-gray-200">
            <div className="text-md">
              <span className="font-medium">To </span>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 rounded-md">
              {metaItemsTwo.map((m, i) => (
                <MetaBlock
                  key={m.label}
                  label={m.label}
                  value={m.value}
                  dot={m.dot}
                  showSeparator={false}
                />
              ))}
            </div>
          </div>

          <div className="mt-6 rounded-xl bg-white p-4 border border-gray-200">
            <div className="text-md">
              <span className="font-medium">Compliance Setting </span>
            </div>

            <div className="text-sm">
              <span>Send Only To Opted-in Numbers</span>
            </div>
          </div>

          <div className="mt-6 rounded-xl bg-white p-4 border border-gray-200">
            <div className="text-md">
              <span className="font-medium">When </span>
            </div>

            <div className="flex items-center space-x-2 mb-4 rounded-xl bg-blue-50 px-4 py-3 text-sm text-blue-700 ring-1 ring-blue-100 my-6">
              <div>
                <Clock3 width={14}/>
              </div>
              <div>
                <span className="text-gray-600">The message sent on </span>
                <span className="text-gray-800 font-bold">
                  Jan 23, 2024 at 12:00pm, Pacific Standard time
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden lg:block">
          <PhonePreview />
        </div>
      </div>
    </>
  );
}

function FunnelAreaChart({ data }) {
  const max = Math.max(...data.map((d) => d.value)) * 1.05;

  return (
    <div className="h-full w-full">
      <ResponsiveContainer width="100%" height={240}>
        <AreaChart
          data={data}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="funnelFill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.9} />
              <stop offset="100%" stopColor="#93c5fd" stopOpacity={0.35} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="name"
            tickLine={false}
            axisLine={false}
            tick={{ fill: "#64748b", fontSize: 12 }}
          />
          <YAxis domain={[0, max]} hide />
          <Tooltip
            cursor={false}
            formatter={(v) => [v.toLocaleString(), ""]}
            labelFormatter={(l) => l}
            contentStyle={{ borderRadius: 8, border: "1px solid #e5e7eb" }}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#3b82f6"
            strokeWidth={2}
            fill="url(#funnelFill)"
            activeDot={{ r: 4, fill: "#1d4ed8", strokeWidth: 0 }}
          />
        </AreaChart>
      </ResponsiveContainer>

      <div className="mt-3 grid grid-cols-4 gap-2">
        {data.map((d) => (
          <div key={d.name} className="text-center">
            <div className="text-xl font-semibold">
              {d.value.toLocaleString()}
            </div>
            <div className="text-xs text-gray-500">{d.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MetaBlock({ label, value, dot, showSeparator = true }) {
  return (
    <div className="flex gap-4">
      {showSeparator && (
        <Separator orientation="vertical" className="w-8 bg-gray-200" />
      )}
      <div>
        <div className="text-xs text-gray-500">{label}</div>
        <div className="mt-1 flex items-center gap-2 text-sm font-medium">
          {dot && (
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ background: dot }}
            />
          )}
          {value}
        </div>
      </div>
    </div>
  );
}

function PhonePreview() {
  return (
    <div className="mx-auto w-[320px] rounded-[30px] border bg-[#e8d6c7] p-4 shadow-sm">
      <div className="mb-3 flex items-center gap-2">
        <div className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
        <div className="text-sm font-medium">Company name</div>
        <div className="ml-auto h-2 w-10 rounded-full bg-[#cbb8a8]" />
      </div>

      <div className="rounded-lg bg-white p-3 shadow-sm">
        <div className="aspect-[16/9] w-full overflow-hidden rounded-md bg-gray-100" />
        <div className="mt-2 text-[13px] text-gray-700">
          Recharge with 349 Rs. and get best value for 28 days, 2GB/day +
          Unlimited 5G
        </div>

        <div className="mt-2 space-y-2">
          <div className="flex items-center justify-between rounded-md border px-3 py-2 text-sm">
            <span>↩︎ Recharge with 349 Rs.</span>
          </div>
          <div className="flex items-center justify-between rounded-md border px-3 py-2 text-sm">
            <span>↩︎ More Plans</span>
          </div>
        </div>
      </div>
    </div>
  );
}
