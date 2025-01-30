import React from "react";
import "./styles/layout.css";
import RecoilRootProvider from "../utils/RecoilRootProvider";
import QueryProvider from "../utils/QueryProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="kr">
      <body>
        <RecoilRootProvider>
          <QueryProvider>{children}</QueryProvider>
        </RecoilRootProvider>
      </body>
    </html>
  );
}
