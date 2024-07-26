"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { useQuery } from "@tanstack/react-query";
import { getUserByEmail } from "@/services/users";
import { Loader } from "@/components";
import { IUSerProps } from "../../../../services/users/index";
import moment from "moment";

function userData(data: IUSerProps[]) {
  let result: { day: string; sleepTime: string }[] = [];

  data.map((x: IUSerProps) => {
    result.push({
      day: moment(x.createdAt).format("dddd"),
      sleepTime: x.sleepTimeDuration,
    });
  });

  return result;
}

function Component({ params }: { params: { emailAddress: string } }) {
  const email = params.emailAddress;
  const { data, isLoading, error } = useQuery({
    queryKey: ["chart", email],
    queryFn: () => getUserByEmail(email),
  });

  console.log("I AM DATA", data);
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
