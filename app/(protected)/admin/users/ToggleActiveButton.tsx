"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ToggleActiveButton({
  userId,
  isActive,
}: {
  userId: string;
  isActive: boolean;
}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const toggle = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !isActive }),
      });

      if (!res.ok) {
        toast.error("Failed to update user");
        return;
      }

      toast.success(`User ${isActive ? "deactivated" : "activated"}`);
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={toggle}
      disabled={loading}
      aria-label={`${isActive ? "Deactivate" : "Activate"} this user`}
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium transition-colors disabled:opacity-50 ${
        isActive
          ? "border-success/25 bg-success/10 text-success hover:bg-success/20"
          : "border-destructive/25 bg-destructive/10 text-destructive hover:bg-destructive/20"
      }`}
    >
      {loading ? "..." : isActive ? "Active" : "Inactive"}
    </button>
  );
}
