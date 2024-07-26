"use client";
import Chart from "./chart";

export default function DemoPage({
  params,
}: {
  params: { emailAddress: string };
}) {
  return (
    <div className="w-full max-w-screen-2xl min-h-screen md:px-8 py-4">
      <Chart params={params} />
    </div>
  );
}
