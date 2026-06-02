"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const navItems = [
    { href: "/admin", label: "Dashboard", icon: "📊" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-950">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 border-r border-gray-800 p-6 fixed h-screen overflow-y-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-1">Portfolio CMS</h2>
          <p className="text-sm text-gray-400">Manage all your content</p>
        </div>

        <nav className="space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-2 rounded-lg transition font-medium",
                pathname === item.href
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:bg-gray-800"
              )}
            >
              <span className="text-lg">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="mt-8 pt-8 border-t border-gray-800">
          <a
            href="/"
            className="flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-gray-200 transition"
          >
            👁️ View Website
          </a>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-64 p-8 overflow-auto">
        {children}
      </div>
    </div>
  );
}
