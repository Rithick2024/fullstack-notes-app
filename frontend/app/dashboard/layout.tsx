"use client";

import { Header } from "@/components/header";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {

    const user = localStorage.getItem("user");
    if (!user) {
      router.push("/auth/signin");
    } else {
      setLoading(false);
    }
  }, [router]);
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="py-6 md:py-10 px-6">
          {children}
        </div>
      </main>
    </div>
  );
}