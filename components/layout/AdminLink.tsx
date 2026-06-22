"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { LayoutDashboard } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function AdminLink() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdmin = async () => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      setIsAdmin(profile?.role === "admin");
    };
    checkAdmin();
  }, []);

  if (!isAdmin) return null;

  return (
    <Link
      href="/admin/dashboard"
      className="flex items-center gap-1.5 text-sm font-medium text-green-700 dark:text-green-300 hover:text-green-900 dark:hover:text-green-100 bg-green-50 dark:bg-green-900/40 hover:bg-green-100 dark:hover:bg-green-900/70 px-3 py-1.5 rounded-lg transition-colors"
    >
      <LayoutDashboard className="size-4" />
      Admin
    </Link>
  );
}
