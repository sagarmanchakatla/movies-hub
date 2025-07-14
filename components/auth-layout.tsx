"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { LayoutDashboard } from "lucide-react";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  backTo?: {
    label: string;
    href: string;
  };
}

export function AuthLayout({
  children,
  title,
  subtitle,
  backTo,
}: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="flex flex-1 items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl dark:border-slate-800 dark:bg-slate-950"
        >
          <div className="flex flex-col p-8">
            <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <LayoutDashboard className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-center text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
              {title}
            </h1>
            <p className="mt-2 text-center text-sm text-slate-600 dark:text-slate-400">
              {subtitle}
            </p>
            <div className="mt-6 flex flex-col space-y-4">{children}</div>
            {backTo && (
              <div className="mt-6 text-center text-sm">
                <Link
                  href={backTo.href}
                  className="font-medium text-primary hover:text-primary/80"
                >
                  {backTo.label}
                </Link>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
