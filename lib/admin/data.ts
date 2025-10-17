import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

/**
 * Data Access Layer for Admin Dashboard
 * All database queries should go through this module
 */

// ============================================
// COMMUNITY & USERS
// ============================================

export type UserWithRelations = Prisma.UserGetPayload<{
  include: {
    accounts: true;
    waitlistEntries: true;
    orders: true;
  };
}>;

export async function getAllUsers() {
  return prisma.user.findMany({
    include: {
      accounts: true,
      waitlistEntries: true,
      orders: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getUserById(id: string) {
  return prisma.user.findUnique({
    where: { id },
    include: {
      accounts: true,
      sessions: true,
      waitlistEntries: true,
      orders: true,
    },
  });
}

export async function updateUser(
  id: string,
  data: Prisma.UserUpdateInput
) {
  return prisma.user.update({
    where: { id },
    data,
  });
}

export async function deleteUser(id: string) {
  return prisma.user.delete({
    where: { id },
  });
}

// ============================================
// WAITLIST
// ============================================

export async function getAllWaitlistEntries() {
  return prisma.waitlistEntry.findMany({
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function updateWaitlistEntry(
  id: string,
  data: Prisma.WaitlistEntryUpdateInput
) {
  return prisma.waitlistEntry.update({
    where: { id },
    data,
  });
}

export async function deleteWaitlistEntry(id: string) {
  return prisma.waitlistEntry.delete({
    where: { id },
  });
}

// ============================================
// ORDERS
// ============================================

export async function getAllOrders() {
  return prisma.order.findMany({
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function updateOrder(
  id: string,
  data: Prisma.OrderUpdateInput
) {
  return prisma.order.update({
    where: { id },
    data,
  });
}

// ============================================
// TONE LAB
// ============================================

export async function getToneLabStatistics() {
  const [
    totalTests,
    completedTests,
    totalRatings,
    pickupSamples,
  ] = await Promise.all([
    prisma.toneLabTest.count(),
    prisma.toneLabTest.count({
      where: { completed: true },
    }),
    prisma.toneLabRating.count(),
    prisma.pickupSample.findMany({
      include: {
        ratings: {
          select: {
            rating: true,
          },
        },
        _count: {
          select: {
            ratings: true,
          },
        },
      },
    }),
  ]);

  const samplesWithStats = pickupSamples.map((sample) => ({
    ...sample,
    averageRating:
      sample.ratings.length > 0
        ? sample.ratings.reduce((acc, r) => acc + r.rating, 0) / sample.ratings.length
        : 0,
    totalRatings: sample._count.ratings,
  }));

  return {
    totalTests,
    completedTests,
    completionRate: totalTests > 0 ? (completedTests / totalTests) * 100 : 0,
    totalRatings,
    samples: samplesWithStats,
  };
}

export async function getAllPickupSamples() {
  return prisma.pickupSample.findMany({
    include: {
      ratings: true,
      _count: {
        select: {
          ratings: true,
        },
      },
    },
    orderBy: {
      order: "asc",
    },
  });
}

export async function updatePickupSample(
  id: string,
  data: Prisma.PickupSampleUpdateInput
) {
  return prisma.pickupSample.update({
    where: { id },
    data,
  });
}

export async function deletePickupSample(id: string) {
  return prisma.pickupSample.delete({
    where: { id },
  });
}

// ============================================
// ANALYTICS
// ============================================

export async function getAnalyticsData() {
  const now = new Date();
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  const [
    totalUsers,
    usersLast7Days,
    usersLast30Days,
    usersWithOAuth,
    oauthProviders,
    waitlistEntries,
    confirmedWaitlist,
    toneLabTests,
    completedTests,
    totalOrders,
    capturedOrders,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.user.count({ where: { createdAt: { gte: sevenDaysAgo } } }),
    prisma.user.count({ where: { createdAt: { gte: thirtyDaysAgo } } }),
    prisma.user.count({ where: { accounts: { some: {} } } }),
    prisma.account.groupBy({
      by: ["provider"],
      _count: { provider: true },
    }),
    prisma.waitlistEntry.count(),
    prisma.waitlistEntry.count({ where: { status: "confirmed" } }),
    prisma.toneLabTest.count(),
    prisma.toneLabTest.count({ where: { completed: true } }),
    prisma.order.count(),
    prisma.order.count({ where: { status: "captured" } }),
  ]);

  return {
    users: {
      total: totalUsers,
      last7Days: usersLast7Days,
      last30Days: usersLast30Days,
      withOAuth: usersWithOAuth,
    },
    oauthProviders: oauthProviders.map((p) => ({
      provider: p.provider,
      count: p._count.provider,
    })),
    engagement: {
      waitlistEntries,
      confirmedWaitlist,
      toneLabTests,
      completedTests,
      totalOrders,
      capturedOrders,
    },
  };
}

export async function getRevenueData() {
  const [
    totalUsers,
    allOrders,
    ordersByStatus,
    preorders,
    donations,
    capturedOrders,
    authorizedOrders,
    refundedOrders,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.order.findMany(),
    prisma.order.groupBy({
      by: ["status"],
      _count: { status: true },
      _sum: { amount: true },
    }),
    prisma.order.findMany({ where: { type: "preorder" } }),
    prisma.order.findMany({ where: { type: "donation" } }),
    prisma.order.aggregate({
      _sum: { amount: true },
      where: { status: "captured" },
    }),
    prisma.order.aggregate({
      _sum: { amount: true },
      where: { status: "authorized" },
    }),
    prisma.order.aggregate({
      _sum: { amount: true },
      where: { status: "refunded" },
    }),
  ]);

  const totalRevenue = capturedOrders._sum.amount || 0;
  const preorderRevenue = preorders
    .filter((o) => o.status === "captured")
    .reduce((sum, o) => sum + o.amount, 0);
  const donationRevenue = donations
    .filter((o) => o.status === "captured")
    .reduce((sum, o) => sum + o.amount, 0);

  const statusCounts = {
    captured: 0,
    authorized: 0,
    cancelled: 0,
    refunded: 0,
  };

  ordersByStatus.forEach((group) => {
    if (group.status in statusCounts) {
      statusCounts[group.status as keyof typeof statusCounts] = group._count.status;
    }
  });

  return {
    total: {
      amount: totalRevenue,
      formatted: (totalRevenue / 100).toFixed(2),
    },
    preorders: {
      amount: preorderRevenue,
      formatted: (preorderRevenue / 100).toFixed(2),
      count: preorders.length,
    },
    donations: {
      amount: donationRevenue,
      formatted: (donationRevenue / 100).toFixed(2),
      count: donations.length,
    },
    averageOrder: allOrders.length > 0 ? ((totalRevenue / allOrders.length) / 100).toFixed(2) : "0.00",
    ordersByStatus: statusCounts,
    capturedAmount: {
      amount: capturedOrders._sum.amount || 0,
      formatted: ((capturedOrders._sum.amount || 0) / 100).toFixed(2),
    },
    authorizedAmount: {
      amount: authorizedOrders._sum.amount || 0,
      formatted: ((authorizedOrders._sum.amount || 0) / 100).toFixed(2),
    },
    refundedAmount: {
      amount: refundedOrders._sum.amount || 0,
      formatted: ((refundedOrders._sum.amount || 0) / 100).toFixed(2),
    },
    totalOrders: allOrders.length,
    conversionRate: totalUsers > 0 ? Math.round((allOrders.length / totalUsers) * 100) : 0,
    captureRate: allOrders.length > 0 ? Math.round((statusCounts.captured / allOrders.length) * 100) : 0,
  };
}

// ============================================
// STATISTICS
// ============================================

export async function getDashboardStatistics() {
  const [
    totalUsers,
    usersLast30Days,
    totalWaitlist,
    confirmedWaitlist,
    totalOrders,
    authorizedOrders,
    capturedOrders,
    totalRevenue,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.user.count({
      where: {
        createdAt: {
          gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        },
      },
    }),
    prisma.waitlistEntry.count(),
    prisma.waitlistEntry.count({
      where: { status: "confirmed" },
    }),
    prisma.order.count(),
    prisma.order.count({
      where: { status: "authorized" },
    }),
    prisma.order.count({
      where: { status: "captured" },
    }),
    prisma.order.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        status: {
          in: ["authorized", "captured"],
        },
      },
    }),
  ]);

  return {
    users: {
      total: totalUsers,
      last30Days: usersLast30Days,
    },
    waitlist: {
      total: totalWaitlist,
      confirmed: confirmedWaitlist,
      conversionRate: totalWaitlist > 0 ? (confirmedWaitlist / totalWaitlist) * 100 : 0,
    },
    orders: {
      total: totalOrders,
      authorized: authorizedOrders,
      captured: capturedOrders,
    },
    revenue: {
      total: totalRevenue._sum.amount || 0,
      formatted: ((totalRevenue._sum.amount || 0) / 100).toFixed(2),
    },
  };
}

// ============================================
// DATABASE OPERATIONS
// ============================================

export type TableName = keyof typeof prisma;

export async function getTableSchema(tableName: string) {
  // This would require introspection - for now return empty
  // In production, you'd use Prisma's DMMF or direct SQL queries
  return {
    name: tableName,
    fields: [],
  };
}

export async function getTableData(tableName: TableName, page = 1, limit = 50) {
  const model = prisma[tableName] as any;

  if (!model || typeof model.findMany !== "function") {
    throw new Error(`Invalid table name: ${String(tableName)}`);
  }

  // Determine orderBy field based on table structure
  // Account, Session, and VerificationToken don't have createdAt
  const getOrderBy = (table: string) => {
    switch (table) {
      case "account":
        return { provider: "asc" }; // Order by provider for accounts
      case "session":
        return { expires: "desc" }; // Order by expiry for sessions
      case "verificationToken":
        return { expires: "desc" }; // Order by expiry for tokens
      case "pickupSample":
        return { order: "asc" }; // Use the order field for samples
      default:
        return { createdAt: "desc" }; // Default to createdAt for tables that have it
    }
  };

  const [data, total] = await Promise.all([
    model.findMany({
      skip: (page - 1) * limit,
      take: limit,
      orderBy: getOrderBy(String(tableName)),
    }),
    model.count(),
  ]);

  return {
    data,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
}

export async function getTableCount(tableName: TableName) {
  const model = prisma[tableName] as any;

  if (!model || typeof model.count !== "function") {
    return 0;
  }

  return model.count();
}
