import { PageHeader } from "@/components/admin/page-header";
import { StatCard } from "@/components/admin/stat-card";
import { getAnalyticsData } from "@/lib/admin/data";

export default async function AnalyticsPage() {
  const analytics = await getAnalyticsData();

  return (
    <div>
      <PageHeader
        title="Analytics"
        subtitle="User growth, engagement, and platform statistics"
      />

      {/* User Growth */}
      <div className="mb-8">
        <h2 className="mb-4 text-lg font-semibold text-white">User Growth</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Users"
            value={analytics.users.total}
            subtitle="All registered users"
            icon="👥"
          />
          <StatCard
            title="Last 7 Days"
            value={analytics.users.last7Days}
            subtitle="New signups"
            icon="📅"
          />
          <StatCard
            title="Last 30 Days"
            value={analytics.users.last30Days}
            subtitle="Monthly growth"
            icon="📈"
          />
          <StatCard
            title="With OAuth"
            value={analytics.users.withOAuth}
            subtitle={`${Math.round((analytics.users.withOAuth / analytics.users.total) * 100)}% of total`}
            icon="🔐"
          />
        </div>
      </div>

      {/* Engagement Metrics */}
      <div className="mb-8">
        <h2 className="mb-4 text-lg font-semibold text-white">Engagement</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <StatCard
            title="Waitlist Entries"
            value={analytics.engagement.waitlistEntries}
            subtitle={`${analytics.engagement.confirmedWaitlist} confirmed`}
            icon="📋"
            trend={{
              value: Math.round((analytics.engagement.confirmedWaitlist / analytics.engagement.waitlistEntries) * 100),
              label: "confirmation rate",
            }}
          />
          <StatCard
            title="Tone Lab Tests"
            value={analytics.engagement.toneLabTests}
            subtitle={`${analytics.engagement.completedTests} completed`}
            icon="🎸"
            trend={{
              value: Math.round((analytics.engagement.completedTests / analytics.engagement.toneLabTests) * 100),
              label: "completion rate",
            }}
          />
          <StatCard
            title="Total Orders"
            value={analytics.engagement.totalOrders}
            subtitle={`${analytics.engagement.capturedOrders} captured`}
            icon="💳"
          />
        </div>
      </div>

      {/* Platform Statistics */}
      <div className="mb-8">
        <h2 className="mb-4 text-lg font-semibold text-white">Platform Activity</h2>
        <div className="grid gap-6 lg:grid-cols-2">
          {/* OAuth Providers */}
          <div className="rounded-2xl border border-white/10 bg-[#0C0F13] p-6">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/60">
              OAuth Providers
            </h3>
            <div className="space-y-3">
              {analytics.oauthProviders.map((provider) => (
                <div key={provider.provider} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10">
                      <span className="text-xl">
                        {provider.provider === "google" && "G"}
                        {provider.provider === "facebook" && "f"}
                        {provider.provider === "twitter" && "𝕏"}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium capitalize text-white">
                        {provider.provider}
                      </p>
                      <p className="text-xs text-white/50">
                        {Math.round((provider.count / analytics.users.withOAuth) * 100)}% of OAuth users
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-accent">{provider.count}</p>
                    <p className="text-xs text-white/50">accounts</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity Timeline */}
          <div className="rounded-2xl border border-white/10 bg-[#0C0F13] p-6">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/60">
              Activity Breakdown
            </h3>
            <div className="space-y-4">
              <div className="rounded-xl border border-white/5 bg-white/5 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-white/80">Users to Orders Ratio</span>
                  <span className="text-sm font-semibold text-accent">
                    {Math.round((analytics.engagement.totalOrders / analytics.users.total) * 100)}%
                  </span>
                </div>
              </div>
              <div className="rounded-xl border border-white/5 bg-white/5 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-white/80">Users to Waitlist Ratio</span>
                  <span className="text-sm font-semibold text-accent">
                    {Math.round((analytics.engagement.waitlistEntries / analytics.users.total) * 100)}%
                  </span>
                </div>
              </div>
              <div className="rounded-xl border border-white/5 bg-white/5 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-white/80">Tone Lab Participation</span>
                  <span className="text-sm font-semibold text-accent">
                    {Math.round((analytics.engagement.toneLabTests / analytics.users.total) * 100)}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
