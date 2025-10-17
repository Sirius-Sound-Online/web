import { PageHeader } from "@/components/admin/page-header";
import { StatCard } from "@/components/admin/stat-card";
import { getRevenueData } from "@/lib/admin/data";

export default async function RevenuePage() {
  const revenue = await getRevenueData();

  return (
    <div>
      <PageHeader
        title="Revenue Overview"
        subtitle="Financial performance and order breakdown"
      />

      {/* Revenue Overview */}
      <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Revenue"
          value={`$${revenue.total.formatted}`}
          subtitle="All captured orders"
          icon="💰"
        />
        <StatCard
          title="Preorders"
          value={`$${revenue.preorders.formatted}`}
          subtitle={`${revenue.preorders.count} orders`}
          icon="📦"
        />
        <StatCard
          title="Donations"
          value={`$${revenue.donations.formatted}`}
          subtitle={`${revenue.donations.count} donations`}
          icon="❤️"
        />
        <StatCard
          title="Average Order"
          value={`$${revenue.averageOrder}`}
          subtitle="Per transaction"
          icon="📊"
        />
      </div>

      {/* Order Status Breakdown */}
      <div className="mb-8">
        <h2 className="mb-4 text-lg font-semibold text-white">Order Status</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-green-500/30 bg-green-500/5 p-6">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm uppercase tracking-wider text-green-400">Captured</span>
              <span className="text-2xl">✅</span>
            </div>
            <p className="text-3xl font-bold text-white">{revenue.ordersByStatus.captured}</p>
            <p className="mt-1 text-sm text-white/60">
              ${revenue.capturedAmount.formatted}
            </p>
          </div>

          <div className="rounded-2xl border border-yellow-500/30 bg-yellow-500/5 p-6">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm uppercase tracking-wider text-yellow-400">Authorized</span>
              <span className="text-2xl">⏳</span>
            </div>
            <p className="text-3xl font-bold text-white">{revenue.ordersByStatus.authorized}</p>
            <p className="mt-1 text-sm text-white/60">
              ${revenue.authorizedAmount.formatted}
            </p>
          </div>

          <div className="rounded-2xl border border-red-500/30 bg-red-500/5 p-6">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm uppercase tracking-wider text-red-400">Cancelled</span>
              <span className="text-2xl">❌</span>
            </div>
            <p className="text-3xl font-bold text-white">{revenue.ordersByStatus.cancelled}</p>
            <p className="mt-1 text-sm text-white/60">Orders cancelled</p>
          </div>

          <div className="rounded-2xl border border-blue-500/30 bg-blue-500/5 p-6">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm uppercase tracking-wider text-blue-400">Refunded</span>
              <span className="text-2xl">↩️</span>
            </div>
            <p className="text-3xl font-bold text-white">{revenue.ordersByStatus.refunded}</p>
            <p className="mt-1 text-sm text-white/60">
              ${revenue.refundedAmount.formatted}
            </p>
          </div>
        </div>
      </div>

      {/* Revenue Breakdown */}
      <div className="mb-8">
        <h2 className="mb-4 text-lg font-semibold text-white">Revenue Breakdown</h2>
        <div className="grid gap-6 lg:grid-cols-2">
          {/* By Type */}
          <div className="rounded-2xl border border-white/10 bg-[#0C0F13] p-6">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/60">
              By Transaction Type
            </h3>
            <div className="space-y-4">
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm text-white/80">Preorders</span>
                  <span className="text-sm font-semibold text-accent">
                    ${revenue.preorders.formatted}
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full bg-gradient-to-r from-accent to-accent-600"
                    style={{
                      width: `${(revenue.preorders.amount / revenue.total.amount) * 100}%`,
                    }}
                  />
                </div>
                <p className="mt-1 text-xs text-white/50">
                  {Math.round((revenue.preorders.amount / revenue.total.amount) * 100)}% of total
                </p>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm text-white/80">Donations</span>
                  <span className="text-sm font-semibold text-accent">
                    ${revenue.donations.formatted}
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full bg-gradient-to-r from-pink-500 to-pink-600"
                    style={{
                      width: `${(revenue.donations.amount / revenue.total.amount) * 100}%`,
                    }}
                  />
                </div>
                <p className="mt-1 text-xs text-white/50">
                  {Math.round((revenue.donations.amount / revenue.total.amount) * 100)}% of total
                </p>
              </div>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="rounded-2xl border border-white/10 bg-[#0C0F13] p-6">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/60">
              Key Metrics
            </h3>
            <div className="space-y-4">
              <div className="rounded-xl border border-white/5 bg-white/5 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-white/80">Conversion Rate</span>
                  <span className="text-sm font-semibold text-accent">
                    {revenue.conversionRate}%
                  </span>
                </div>
                <p className="mt-1 text-xs text-white/50">
                  Orders to total users
                </p>
              </div>

              <div className="rounded-xl border border-white/5 bg-white/5 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-white/80">Capture Rate</span>
                  <span className="text-sm font-semibold text-accent">
                    {revenue.captureRate}%
                  </span>
                </div>
                <p className="mt-1 text-xs text-white/50">
                  Captured vs total orders
                </p>
              </div>

              <div className="rounded-xl border border-white/5 bg-white/5 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-white/80">Total Transactions</span>
                  <span className="text-sm font-semibold text-accent">
                    {revenue.totalOrders}
                  </span>
                </div>
                <p className="mt-1 text-xs text-white/50">
                  All orders + donations
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Financial Insights */}
      <div className="rounded-2xl border border-accent/30 bg-accent/5 p-6">
        <h2 className="mb-4 text-lg font-semibold text-white">💡 Financial Insights</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <p className="text-sm text-white/80">Total Captured Revenue</p>
            <p className="mt-1 text-2xl font-bold text-accent">
              ${revenue.capturedAmount.formatted}
            </p>
          </div>
          <div>
            <p className="text-sm text-white/80">Pending Authorization</p>
            <p className="mt-1 text-2xl font-bold text-yellow-400">
              ${revenue.authorizedAmount.formatted}
            </p>
          </div>
          <div>
            <p className="text-sm text-white/80">Refunded Amount</p>
            <p className="mt-1 text-2xl font-bold text-red-400">
              ${revenue.refundedAmount.formatted}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
