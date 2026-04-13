import { requireAdmin } from "@/lib/auth-helpers";
import { Activity, LayoutDashboard, Users } from "lucide-react";
import Link from "next/link";

const navItems = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/activity", label: "Activity", icon: Activity },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdmin();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          Admin Dashboard
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">
          Manage users and monitor activity
        </p>
      </div>

      <div className="flex gap-2 mb-8 border-b border-slate-200 dark:border-slate-700 pb-4">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <item.icon className="w-4 h-4" />
            {item.label}
          </Link>
        ))}
      </div>

      {children}
    </div>
  );
}
