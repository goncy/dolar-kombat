import type {Metadata} from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Dolar Kombat",
  description: "Precio del dólar en Argentina en la torre de Mortal Kombat",
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
