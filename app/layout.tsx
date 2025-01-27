import React from "react";
import "./styles/layout.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="kr">
      <body>{children}</body>
    </html>
  );
}
