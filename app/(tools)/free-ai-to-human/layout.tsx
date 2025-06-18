import React from "react";

export default function AiToolLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="container dark:bg-slate-700 mx-auto">{children}</main>
  );
}
