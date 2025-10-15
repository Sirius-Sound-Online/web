import { PageHeader } from "@/components/admin/page-header";
import { getAllUsers } from "@/lib/admin/data";
import { ExportUsersButton } from "@/components/admin/export-users-button";
import { CommunityTable } from "@/components/admin/community-table";

export default async function CommunityPage() {
  const users = await getAllUsers();

  return (
    <div>
      <PageHeader
        title="Community Members"
        subtitle={`${users.length} total members`}
        action={<ExportUsersButton users={users} />}
      />

      <CommunityTable users={users} />
    </div>
  );
}
