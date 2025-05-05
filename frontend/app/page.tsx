import { Button } from "@/components/ui/button";
import { BookOpenText } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center justify-between py-4 px-4">
          <div className="flex items-center gap-2">
            <BookOpenText className="h-6 w-6" />
            <span className="text-xl font-semibold">Notes-App</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/auth/signin">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/auth/signup">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 px-6">
          <div className="px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Your thoughts, organized beautifully
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Capture ideas, organize tasks, and never forget a detail with Notes-App, your modern digital notebook.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/auth/signup">
                    <Button size="lg" className="px-8">Get Started</Button>
                  </Link>
                  <Link href="/auth/signin">
                    <Button size="lg" variant="outline" className="px-8">Sign In</Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative h-[350px] w-full md:h-[450px] lg:h-[500px]">
                  <div className="absolute top-0 left-[10%] h-[300px] w-[80%] rounded-lg bg-card p-6 shadow-xl rotate-[-6deg]">
                    <div className="space-y-2">
                      <div className="h-5 w-2/3 rounded bg-muted"></div>
                      <div className="h-3 w-full rounded bg-muted"></div>
                      <div className="h-3 w-full rounded bg-muted"></div>
                      <div className="h-3 w-4/5 rounded bg-muted"></div>
                    </div>
                  </div>
                  <div className="absolute top-10 left-[20%] h-[300px] w-[80%] rounded-lg bg-card p-6 shadow-xl rotate-[3deg]">
                    <div className="space-y-2">
                      <div className="h-5 w-1/2 rounded bg-muted"></div>
                      <div className="h-3 w-full rounded bg-muted"></div>
                      <div className="h-3 w-full rounded bg-muted"></div>
                      <div className="h-3 w-3/4 rounded bg-muted"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      <footer className="border-t py-6 md:py-0">
        <div className="flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-4">
            <BookOpenText className="h-5 w-5" />
            <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
              © 2025 Notes-App. All rights reserved.{' '}
              <a
                href="https://rithick-portfolio-60029854001.development.catalystserverless.in/app/techno.html"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                Rithick R
              </a>.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}