/**
 * Database export/import operations
 * Server-side only
 */

import fs from "fs/promises";
import path from "path";

const DB_PATH = path.join(process.cwd(), "prisma", "dev.db");
const BACKUP_DIR = path.join(process.cwd(), "backups");

/**
 * Export the database as a downloadable file
 */
export async function exportDatabase(): Promise<{ buffer: Buffer; filename: string }> {
  try {
    // Read the database file
    const buffer = await fs.readFile(DB_PATH);

    // Generate filename with timestamp
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const filename = `sirius-sound-backup-${timestamp}.db`;

    console.log(`[Database Export] Exported database: ${filename}, Size: ${buffer.length} bytes`);

    return { buffer, filename };
  } catch (error) {
    console.error("[Database Export] Error reading database:", error);
    throw new Error("Failed to read database file");
  }
}

/**
 * Import a database from uploaded file
 * Creates a backup before importing
 */
export async function importDatabase(buffer: Buffer): Promise<void> {
  try {
    // Create backups directory if it doesn't exist
    await fs.mkdir(BACKUP_DIR, { recursive: true });

    // Create backup of current database
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const backupPath = path.join(BACKUP_DIR, `backup-before-import-${timestamp}.db`);

    console.log("[Database Import] Creating backup before import...");
    await fs.copyFile(DB_PATH, backupPath);
    console.log("[Database Import] Backup created:", backupPath);

    // Validate that the uploaded file is a valid SQLite database
    // Check for SQLite header (first 16 bytes should be "SQLite format 3\0")
    const header = buffer.slice(0, 16).toString();
    if (!header.startsWith("SQLite format 3")) {
      throw new Error("Invalid SQLite database file");
    }

    // Write the new database file
    console.log("[Database Import] Writing new database file...");
    await fs.writeFile(DB_PATH, buffer);
    console.log("[Database Import] Database file written successfully");

    // Clean up old backups (keep last 10)
    await cleanupOldBackups();
  } catch (error) {
    console.error("[Database Import] Error:", error);
    throw error;
  }
}

/**
 * Create a manual backup
 */
export async function createBackup(): Promise<{ filename: string; path: string }> {
  try {
    // Create backups directory if it doesn't exist
    await fs.mkdir(BACKUP_DIR, { recursive: true });

    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const filename = `manual-backup-${timestamp}.db`;
    const backupPath = path.join(BACKUP_DIR, filename);

    await fs.copyFile(DB_PATH, backupPath);

    console.log("[Database Backup] Manual backup created:", backupPath);

    return { filename, path: backupPath };
  } catch (error) {
    console.error("[Database Backup] Error:", error);
    throw new Error("Failed to create backup");
  }
}

/**
 * List all available backups
 */
export async function listBackups(): Promise<
  Array<{ filename: string; size: number; created: Date }>
> {
  try {
    await fs.mkdir(BACKUP_DIR, { recursive: true });
    const files = await fs.readdir(BACKUP_DIR);

    const backups = await Promise.all(
      files
        .filter((file) => file.endsWith(".db"))
        .map(async (file) => {
          const filePath = path.join(BACKUP_DIR, file);
          const stats = await fs.stat(filePath);
          return {
            filename: file,
            size: stats.size,
            created: stats.birthtime,
          };
        })
    );

    return backups.sort((a, b) => b.created.getTime() - a.created.getTime());
  } catch (error) {
    console.error("[Database Backup] Error listing backups:", error);
    return [];
  }
}

/**
 * Restore from a backup file
 */
export async function restoreBackup(filename: string): Promise<void> {
  try {
    const backupPath = path.join(BACKUP_DIR, filename);

    // Verify backup exists
    await fs.access(backupPath);

    // Create a backup of current state before restoring
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const preRestoreBackup = path.join(BACKUP_DIR, `before-restore-${timestamp}.db`);
    await fs.copyFile(DB_PATH, preRestoreBackup);

    // Restore the backup
    await fs.copyFile(backupPath, DB_PATH);

    console.log("[Database Restore] Restored from backup:", filename);
  } catch (error) {
    console.error("[Database Restore] Error:", error);
    throw new Error("Failed to restore backup");
  }
}

/**
 * Delete old backups, keeping only the most recent N
 */
async function cleanupOldBackups(keepCount: number = 10): Promise<void> {
  try {
    const backups = await listBackups();

    if (backups.length <= keepCount) {
      return;
    }

    const toDelete = backups.slice(keepCount);

    for (const backup of toDelete) {
      const filePath = path.join(BACKUP_DIR, backup.filename);
      await fs.unlink(filePath);
      console.log("[Database Cleanup] Deleted old backup:", backup.filename);
    }
  } catch (error) {
    console.error("[Database Cleanup] Error:", error);
  }
}
