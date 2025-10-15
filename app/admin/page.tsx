import { PageHeader } from "@/components/admin/page-header";
import { StatCard } from "@/components/admin/stat-card";
import { getDashboardStatistics } from "@/lib/admin/data";

export default async function AdminDashboard() {
  const stats = await getDashboardStatistics();

  return (
    <div>
      <PageHeader
        title="Dashboard Overview"
        subtitle="Welcome to the Sirius Sound admin dashboard"
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Users"
          value={stats.users.total}
          subtitle={`${stats.users.last30Days} new in last 30 days`}
          icon="👥"
        />

        <StatCard
          title="Waitlist Entries"
          value={stats.waitlist.total}
          subtitle={`${stats.waitlist.confirmed} confirmed`}
          icon="📋"
          trend={{
            value: Math.round(stats.waitlist.conversionRate),
            label: "conversion rate",
          }}
        />

        <StatCard
          title="Total Orders"
          value={stats.orders.total}
          subtitle={`${stats.orders.captured} captured, ${stats.orders.authorized} authorized`}
          icon="💳"
        />

        <StatCard
          title="Total Revenue"
          value={`$${stats.revenue.formatted}`}
          subtitle="From orders and donations"
          icon="💰"
        />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-[#0C0F13] p-6">
          <h2 className="mb-4 text-lg font-semibold text-white">Quick Actions</h2>
          <div className="grid gap-3">
            <a
              href="/admin/community"
              className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4 transition hover:border-accent hover:bg-accent/5"
            >
              <span className="text-2xl">👥</span>
              <div>
                <p className="font-medium text-white">View Community</p>
                <p className="text-xs text-white/60">Manage users and accounts</p>
              </div>
            </a>

            <a
              href="/admin/waitlist"
              className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4 transition hover:border-accent hover:bg-accent/5"
            >
              <span className="text-2xl">📋</span>
              <div>
                <p className="font-medium text-white">Manage Waitlist</p>
                <p className="text-xs text-white/60">Approve or reject entries</p>
              </div>
            </a>

            <a
              href="/admin/blog"
              className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4 transition hover:border-accent hover:bg-accent/5"
            >
              <span className="text-2xl">✍️</span>
              <div>
                <p className="font-medium text-white">Create Blog Post</p>
                <p className="text-xs text-white/60">Write and publish content</p>
              </div>
            </a>

            <a
              href="/admin/media"
              className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4 transition hover:border-accent hover:bg-accent/5"
            >
              <span className="text-2xl">🖼️</span>
              <div>
                <p className="font-medium text-white">Upload Media</p>
                <p className="text-xs text-white/60">Manage images and videos</p>
              </div>
            </a>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#0C0F13] p-6">
          <h2 className="mb-4 text-lg font-semibold text-white">Recent Activity</h2>
          <div className="space-y-3">
            <div className="rounded-xl border border-white/5 bg-white/5 p-3">
              <p className="text-sm text-white">System Status: Operational</p>
              <p className="text-xs text-white/50">All services running normally</p>
            </div>

            <div className="rounded-xl border border-white/5 bg-white/5 p-3">
              <p className="text-sm text-white">Database: Connected</p>
              <p className="text-xs text-white/50">SQLite - Ready</p>
            </div>

            <div className="rounded-xl border border-white/5 bg-white/5 p-3">
              <p className="text-sm text-white">Last Backup: N/A</p>
              <p className="text-xs text-white/50">Configure automated backups</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 rounded-2xl border border-accent/30 bg-accent/5 p-6">
        <h2 className="mb-2 text-lg font-semibold text-white">🚀 Admin Tips</h2>
        <ul className="space-y-2 text-sm text-white/80">
          <li>• Use the Community page to export user data to CSV for email campaigns</li>
          <li>• Approve waitlist entries to move users up in the queue</li>
          <li>• Upload blog posts as MDX files for automatic rendering</li>
          <li>• Monitor Tone Lab statistics to understand user preferences</li>
          <li>• Use the Database browser for advanced queries (use caution)</li>
        </ul>
      </div>
    </div>
  );
}
