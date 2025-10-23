"use client";

import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import useGetAllCustomers from "@/hooks/use-all-customers";
import useAllTotalSales from "@/hooks/use-all-total-sales";
import useTotalSales from "@/hooks/use-total-sales";
import { DollarSign, PackageMinus, User } from "lucide-react";
import useAllTotalOrders from "@/hooks/use-all-orders";

export const description = "A bar chart with a label";

const chartConfig = {
  views: {
    label: "فروش",
  },
  desktop: {
    label: "فروش",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig;

export function Dashboard() {
  const { data } = useTotalSales();
  const { data: TotalPrice } = useAllTotalSales();
  const { data: Customers } = useGetAllCustomers();
  const { data: orders } = useAllTotalOrders();

  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between gap-3">
        <div>
          <Card className="w-[300px]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">فروش کل</CardTitle>
              <div className="bg-primary rounded-full p-2 text-white">
                <DollarSign className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent className="text-right">
              {" "}
              <div className="text-2xl font-bold">
                {Math.round(TotalPrice?.totalSales).toLocaleString()} تومان
              </div>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card className="w-[300px]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">مشتری‌ها </CardTitle>
              <div className="bg-primary rounded-full p-2 text-white">
                <User className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent className="text-right">
              <div className="text-2xl font-bold">{Customers?.length} نفر</div>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card className="w-[300px]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">سفارشات</CardTitle>
              <div className="bg-primary rounded-full p-2 text-white">
                <PackageMinus className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent className="text-right">
              {" "}
              <div className="text-2xl font-bold">{orders?.length} عدد</div>
            </CardContent>
          </Card>
        </div>
      </div>
      <br />
      <Card className="bg-no">
        <CardHeader>
          <CardTitle>نمودار فروش</CardTitle>
          <CardDescription>قیمت ها بر اساس تومان</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <BarChart
              accessibilityLayer
              data={data}
              margin={{
                top: 20,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="_id"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return date.toLocaleDateString("fa-ir", {
                    month: "short",
                    day: "numeric",
                  });
                }}
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    className="w-[150px]"
                    nameKey="views"
                    labelFormatter={(value) => {
                      return new Date(value).toLocaleDateString("fa-ir", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      });
                    }}
                  />
                }
              />
              <Bar dataKey="totalSales" fill="var(--color-desktop)" radius={3}>
                <LabelList position="top" offset={12} className="fill-foreground" fontSize={12} />
              </Bar>
            </BarChart>
          </ChartContainer>
        </CardContent>
        <br />
      </Card>
    </div>
  );
}
