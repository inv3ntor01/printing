import React from 'react';
import { createInertiaApp } from '@inertiajs/react';
import { createServer } from '@inertiajs/react/server';
import { renderToString } from 'react-dom/server';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/sonner';
import AppLayout from '@/layouts/app-layout';
import AuthLayout from '@/layouts/auth-layout';
import SettingsLayout from '@/layouts/settings/layout';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createServer((page) =>
  createInertiaApp({
    page,
    render: renderToString,
    title: (title) => (title ? `${title} - ${appName}` : appName),
    resolve: (name) => {
      const pages = import.meta.glob('./pages/**/*.tsx', { eager: true });
      return pages[`./pages/${name}.tsx`];
    },
    layout: (name) => {
      switch (true) {
        case name === 'welcome':
          return null;
        case name.startsWith('auth/'):
          return AuthLayout;
        case name.startsWith('settings/'):
          return [AppLayout, SettingsLayout];
        default:
          return AppLayout;
      }
    },
    setup: ({ App, props }) => (
      <TooltipProvider delayDuration={0}>
        <App {...props} />
        <Toaster />
      </TooltipProvider>
    ),
  }),
);
