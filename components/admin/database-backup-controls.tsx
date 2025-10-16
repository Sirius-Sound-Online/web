"use client";

import { useState } from "react";

export function DatabaseBackupControls() {
  const [isExporting, setIsExporting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [showImportWarning, setShowImportWarning] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleExport = async () => {
    setIsExporting(true);
    setMessage(null);

    try {
      const response = await fetch("/api/admin/database/export");

      if (!response.ok) {
        throw new Error("Failed to export database");
      }

      // Get the filename from Content-Disposition header
      const contentDisposition = response.headers.get("Content-Disposition");
      const filenameMatch = contentDisposition?.match(/filename="(.+)"/);
      const filename = filenameMatch ? filenameMatch[1] : "database-backup.db";

      // Download the file
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      setMessage({ type: "success", text: `Database exported successfully: ${filename}` });
    } catch (error) {
      console.error("Export error:", error);
      setMessage({ type: "error", text: "Failed to export database" });
    } finally {
      setIsExporting(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setShowImportWarning(true);
    }
  };

  const handleImportConfirm = async () => {
    if (!selectedFile) return;

    setIsImporting(true);
    setMessage(null);
    setShowImportWarning(false);

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await fetch("/api/admin/database/import", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to import database");
      }

      setMessage({
        type: "success",
        text: "Database imported successfully! The application will restart automatically."
      });

      // Reload the page after a short delay
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error("Import error:", error);
      setMessage({
        type: "error",
        text: error instanceof Error ? error.message : "Failed to import database"
      });
    } finally {
      setIsImporting(false);
      setSelectedFile(null);
    }
  };

  const handleImportCancel = () => {
    setShowImportWarning(false);
    setSelectedFile(null);
  };

  return (
    <div className="mt-8 rounded-2xl border border-white/10 bg-[#0C0F13] p-6">
      <h3 className="mb-4 text-lg font-semibold text-white">
        Database Backup & Restore
      </h3>

      <div className="mb-6 rounded-xl border border-blue-500/30 bg-blue-500/5 p-4">
        <p className="text-sm text-white/80">
          💡 <strong>Export</strong> creates a backup file you can download.
          <strong> Import</strong> replaces the current database (a backup is created automatically before import).
        </p>
      </div>

      {message && (
        <div
          className={`mb-4 rounded-xl border p-4 ${
            message.type === "success"
              ? "border-green-500/30 bg-green-500/10 text-green-400"
              : "border-red-500/30 bg-red-500/10 text-red-400"
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        {/* Export */}
        <div className="rounded-xl border border-white/5 bg-white/5 p-4">
          <h4 className="mb-2 font-semibold text-white">Export Database</h4>
          <p className="mb-4 text-sm text-white/60">
            Download a complete backup of your database
          </p>
          <button
            onClick={handleExport}
            disabled={isExporting}
            className="w-full rounded-lg bg-accent px-4 py-2 font-semibold text-black transition hover:bg-accent/90 disabled:opacity-50"
          >
            {isExporting ? "Exporting..." : "Download Backup"}
          </button>
        </div>

        {/* Import */}
        <div className="rounded-xl border border-white/5 bg-white/5 p-4">
          <h4 className="mb-2 font-semibold text-white">Import Database</h4>
          <p className="mb-4 text-sm text-white/60">
            Restore database from a backup file
          </p>
          <label className="block">
            <input
              type="file"
              accept=".db,.sqlite,.sqlite3"
              onChange={handleFileSelect}
              disabled={isImporting}
              className="w-full cursor-pointer rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-sm text-white transition file:mr-4 file:cursor-pointer file:rounded file:border-0 file:bg-accent file:px-3 file:py-1 file:text-sm file:font-semibold file:text-black hover:bg-white/10 disabled:opacity-50"
            />
          </label>
        </div>
      </div>

      {/* Import Warning Modal */}
      {showImportWarning && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <div className="max-w-md rounded-2xl border border-red-500/30 bg-[#0C0F13] p-6">
            <h3 className="mb-2 text-xl font-bold text-red-400">
              ⚠️ Warning: Database Import
            </h3>
            <p className="mb-4 text-white/80">
              This will replace your current database with the uploaded file. A backup of the current database will be created automatically.
            </p>
            <p className="mb-6 text-sm text-white/60">
              File: <span className="font-mono text-white">{selectedFile?.name}</span>
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleImportCancel}
                className="flex-1 rounded-lg border border-white/20 px-4 py-2 font-semibold text-white transition hover:bg-white/10"
              >
                Cancel
              </button>
              <button
                onClick={handleImportConfirm}
                disabled={isImporting}
                className="flex-1 rounded-lg bg-red-500 px-4 py-2 font-semibold text-white transition hover:bg-red-600 disabled:opacity-50"
              >
                {isImporting ? "Importing..." : "Confirm Import"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
