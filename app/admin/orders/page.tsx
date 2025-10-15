import { PageHeader } from "@/components/admin/page-header";
import { StatCard } from "@/components/admin/stat-card";
import { getAllOrders } from "@/lib/admin/data";
import { OrdersTable } from "@/components/admin/orders-table";

export default async function OrdersPage() {
  const orders = await getAllOrders();

  const totalRevenue = orders.reduce((sum, order) => sum + order.amount, 0);
  const authorizedOrders = orders.filter((o) => o.status === "authorized");
  const capturedOrders = orders.filter((o) => o.status === "captured");

  return (
    <div>
      <PageHeader
        title="Orders & Revenue"
        subtitle={`${orders.length} total orders`}
      />

      <div className="mb-8 grid gap-6 md:grid-cols-3">
        <StatCard
          title="Total Revenue"
          value={`$${(totalRevenue / 100).toFixed(2)}`}
          icon="💰"
        />

        <StatCard
          title="Authorized Orders"
          value={authorizedOrders.length}
          subtitle={`$${(authorizedOrders.reduce((s, o) => s + o.amount, 0) / 100).toFixed(2)}`}
          icon="🔒"
        />

        <StatCard
          title="Captured Orders"
          value={capturedOrders.length}
          subtitle={`$${(capturedOrders.reduce((s, o) => s + o.amount, 0) / 100).toFixed(2)}`}
          icon="✓"
        />
      </div>

      <OrdersTable orders={orders} />
    </div>
  );
}
