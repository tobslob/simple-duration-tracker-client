"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/services/users";
import { Loader } from "@/components";
import { IUSerProps } from "../../../../services/users/index";
import moment from "moment";

function userData(data: IUSerProps[]) {
  let result: { day: string; sleepTime: string }[] = [];

  if (!data) {
    return undefined;
  }

  data.map((x: IUSerProps) => {
    result.push({
      day: moment(x.date).format("dddd"),
      sleepTime: x.sleepTimeDuration,
    });
  });

  return result;
}

function Component({ params }: { params: { emailAddress: string } }) {
  const emailAddress = params.emailAddress;
  const { data, isLoading, error } = useQuery({
    queryKey: ["chart", emailAddress],
    queryFn: () => getUser(emailAddress),
  });

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="h-[100vh] flex items-center justify-center">
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={userData(data)}>
          <XAxis
            dataKey="day"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value} hr`}
          />
          <Bar
            dataKey="sleepTime"
            fill="currentColor"
            radius={[4, 4, 0, 0]}
            className="fill-primary"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Component;
