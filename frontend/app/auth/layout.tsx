import { BookOpenText } from "lucide-react";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex h-16 items-center mx-6">
        <Link href="/" className="flex items-center gap-2">
          <BookOpenText className="h-6 w-6" />
          <span className="text-xl font-semibold">Notes-App</span>
        </Link>
      </div>
      <main className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md p-6 space-y-6">
          {children}
        </div>
      </main>
    </div>
  );
}