import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WorkSmart | Dashboard de Gerenciamento do Projetos de Softwares",
  description: "Gestão de Projetos — Gerencie o seus Projetos de Onde Estiver Através do Aplicativo e Software",
  icons: {
    icon: "/favicon.png", // ou /icon.svg
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <ToastContainer />
        {children}
      </body>
    </html>
  );
}
