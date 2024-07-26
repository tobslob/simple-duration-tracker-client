import React from "react";
import { RiCircleFill } from "@remixicon/react";
import { Badge } from "./badge";
import { cn } from "@/lib";

const getColor = (status: string) => {
  switch (status) {
    case "Pending":
    case "pending":
      return "bg-yellow-300 bg-opacity-40 text-yellow-700";
    case "Completed":
    case "successful":
    case "success":
    case "Delivered":
    case "Approved":
    case "In stock":
      return "bg-green-300 bg-opacity-40 text-green-700";
    case "Failed":
    case "failed":
    case "Rejected":
    case "Exception":
    case "Out of stock":
      return "bg-red-300 bg-opacity-40 text-red-700";
    default:
      return "bg-gray-300 bg-opacity-40 text-gray-700";
  }
};

export const StatusBadge = ({ status }: { status: string }) => {
  return (
    <Badge
      className={cn(
        "flex items-center justify-start space-x-2 shadow-none py-1.5 capitalize font-medium rounded-full pointer-events-none",
        getColor(status)
      )}
    >
      <RiCircleFill className="h-2 w-2" />
      <span>{status}</span>
    </Badge>
  );
};
