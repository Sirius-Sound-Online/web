import { PageHeader } from "@/components/admin/page-header";
import { StatCard } from "@/components/admin/stat-card";
import { getToneLabStatistics } from "@/lib/admin/data";

export default async function ToneLabStatsPage() {
  const stats = await getToneLabStatistics();

  return (
    <div>
      <PageHeader
        title="Tone Lab Statistics"
        subtitle="Pickup sample ratings and test completion data"
      />

      {/* Overview Stats */}
      <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Tests"
          value={stats.totalTests}
          subtitle="Test sessions created"
          icon="🧪"
        />
        <StatCard
          title="Completed"
          value={stats.completedTests}
          subtitle={`${Math.round(stats.completionRate)}% completion rate`}
          icon="✅"
          trend={{
            value: Math.round(stats.completionRate),
            label: "completion",
          }}
        />
        <StatCard
          title="Total Ratings"
          value={stats.totalRatings}
          subtitle="Individual sample ratings"
          icon="⭐"
        />
        <StatCard
          title="Avg Ratings/Test"
          value={stats.completedTests > 0 ? Math.round(stats.totalRatings / stats.completedTests) : 0}
          subtitle="Per completed test"
          icon="📊"
        />
      </div>

      {/* Sample Ratings */}
      <div className="mb-8">
        <h2 className="mb-4 text-lg font-semibold text-white">Pickup Sample Ratings</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {stats.samples
            .sort((a, b) => b.averageRating - a.averageRating)
            .map((sample) => (
              <div
                key={sample.id}
                className="rounded-2xl border border-white/10 bg-[#0C0F13] p-6 transition hover:border-accent/50"
              >
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white">{sample.name}</h3>
                    <p className="mt-1 text-xs text-white/50">{sample.description}</p>
                  </div>
                  <div className="ml-4 rounded-lg bg-accent/20 px-3 py-1">
                    <span className="text-sm font-bold text-accent">
                      {sample.averageRating.toFixed(1)}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/60">Total Ratings:</span>
                    <span className="font-semibold text-white">{sample.totalRatings}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/60">Display Order:</span>
                    <span className="font-semibold text-white">#{sample.order}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/60">Guitar:</span>
                    <span className="font-semibold text-white">{sample.guitar}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/60">Position:</span>
                    <span className="font-semibold capitalize text-white">{sample.position}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/60">Sirius Pickup:</span>
                    <span className="font-semibold text-white">{sample.isSirius ? "Yes ✨" : "No"}</span>
                  </div>
                </div>

                {/* Rating Bar */}
                <div className="mt-4">
                  <div className="h-2 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full bg-gradient-to-r from-accent to-accent-600 transition-all"
                      style={{ width: `${(sample.averageRating / 10) * 100}%` }}
                    />
                  </div>
                  <div className="mt-1 flex justify-between text-xs text-white/50">
                    <span>0</span>
                    <span>10</span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Insights */}
      <div className="rounded-2xl border border-accent/30 bg-accent/5 p-6">
        <h2 className="mb-4 text-lg font-semibold text-white">📊 Insights</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <p className="text-sm font-semibold text-white">Top Rated Sample</p>
            <p className="mt-1 text-lg text-accent">
              {stats.samples.length > 0
                ? stats.samples.sort((a, b) => b.averageRating - a.averageRating)[0].name
                : "N/A"}
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Most Rated Sample</p>
            <p className="mt-1 text-lg text-accent">
              {stats.samples.length > 0
                ? stats.samples.sort((a, b) => b.totalRatings - a.totalRatings)[0].name
                : "N/A"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
