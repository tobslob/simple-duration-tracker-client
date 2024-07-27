"use client";

import { ColumnDef } from "@tanstack/react-table";
import {
  DataTableColumnHeader,
  DataTableHeaderCheckbox,
  DataTableRowCheckbox,
} from "@/components/ui/grid/elements";
import moment from "moment";

export interface IUser {
  id: number;
  name: string;
  gender: string;
  count: number;
  date: string;
}

export const columns: ColumnDef<IUser>[] = [
  {
    id: "select",
    header: ({ table }) => <DataTableHeaderCheckbox table={table} />,
    cell: ({ row }) => <DataTableRowCheckbox row={row} />,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
  },
  {
    accessorKey: "gender",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Gender" />
    ),
  },
  {
    accessorKey: "count",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Count" />
    ),
    cell: ({ row }) => <div>{row.original.count}</div>,
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
    cell: ({ row }) => (
      <div>{moment(row.original.date).format("YYYY-MM-DD")}</div>
    ),
  },
];
