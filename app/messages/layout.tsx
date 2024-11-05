import { Header } from "@/components/dashboard/header";
import { Sidebar } from "@/components/dashboard/sidebar";

export default function MessagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar className="hidden md:block" />
      <main className="flex-1 overflow-hidden">
        <Header />
        {children}
      </main>
    </div>
  );
}