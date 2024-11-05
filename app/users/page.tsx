import { UsersOverview } from "@/components/users/overview";

export default function UsersPage() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Users</h1>
      </div>
      <UsersOverview />
    </div>
  );
}