import React from "react";

export default function AiToolLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="container min-h-screen dark:bg-[#484b6a] mx-auto">
      {children}
    </main>
  );
}
