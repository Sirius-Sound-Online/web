"use client";

import { DataTable } from "@/components/admin/data-table";
import { formatDate } from "@/lib/utils";

type Order = {
  id: string;
  type: string;
  stripeSessionId: string;
  stripeIntentId: string | null;
  amount: number;
  currency: string;
  status: string;
  createdAt: Date;
  user: {
    id: string;
    name: string | null;
    email: string | null;
  } | null;
};

type Props = {
  orders: Order[];
};

export function OrdersTable({ orders }: Props) {
  return (
    <DataTable
      data={orders}
      columns={[
        {
          key: "user",
          label: "Customer",
          render: (order) =>
            order.user ? (
              <div>
                <p className="font-medium text-white">
                  {order.user.name ?? "No name"}
                </p>
                <p className="text-xs text-white/50">{order.user.email}</p>
              </div>
            ) : (
              <span className="text-white/40">Guest</span>
            ),
        },
        {
          key: "type",
          label: "Type",
          render: (order) => (
            <span
              className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                order.type === "preorder"
                  ? "bg-blue-500/20 text-blue-400"
                  : "bg-purple-500/20 text-purple-400"
              }`}
            >
              {order.type}
            </span>
          ),
        },
        {
          key: "amount",
          label: "Amount",
          render: (order) => (
            <span className="font-mono font-medium text-white">
              ${(order.amount / 100).toFixed(2)} {order.currency.toUpperCase()}
            </span>
          ),
        },
        {
          key: "status",
          label: "Status",
          render: (order) => (
            <span
              className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                order.status === "captured"
                  ? "bg-green-500/20 text-green-400"
                  : order.status === "authorized"
                  ? "bg-yellow-500/20 text-yellow-400"
                  : order.status === "cancelled"
                  ? "bg-red-500/20 text-red-400"
                  : "bg-zinc-500/20 text-zinc-400"
              }`}
            >
              {order.status}
            </span>
          ),
        },
        {
          key: "stripeSessionId",
          label: "Stripe ID",
          render: (order) => (
            <a
              href={`https://dashboard.stripe.com/payments/${
                order.stripeIntentId ?? order.stripeSessionId
              }`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-accent hover:underline"
            >
              {order.stripeSessionId.slice(0, 20)}...
            </a>
          ),
        },
        {
          key: "createdAt",
          label: "Date",
          render: (order) => (
            <span className="text-xs">{formatDate(order.createdAt)}</span>
          ),
        },
      ]}
    />
  );
}
