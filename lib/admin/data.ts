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
      accounts: {
        select: {
          provider: true,
          createdAt: true,
        },
      },
      waitlistEntries: {
        select: {
          status: true,
          createdAt: true,
        },
      },
      orders: {
        select: {
          type: true,
          amount: true,
          status: true,
        },
      },
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
    throw new Error(`Invalid table name: ${tableName}`);
  }

  const [data, total] = await Promise.all([
    model.findMany({
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
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
