// import * as React from 'react';
// import * as Sentry from '@sentry/react';

// Sentry.init({
//   dsn: process.env.SENTRY_DNS,
//   integrations: [
//     Sentry.reactRouterV7BrowserTracingIntegration({
//       useEffect: React.useEffect,
//       useLocation,
//       useNavigationType,
//       createRoutesFromChildren,
//       matchRoutes,
//     }),
//     Sentry.replayIntegration(),
//   ],
//   tracesSampleRate: 1.0,
//   tracePropagationTargets: ['localhost', /^https:\/\/([a-zA-Z0-9-]+\.)?footballi\.net\/api/],
//   replaysSessionSampleRate: 0.1,
//   replaysOnErrorSampleRate: 0.5,
// });

import { createRoot } from 'react-dom/client';
import App from './App.tsx';
// import ReactGA from 'react-ga4';
// import { GA4_ID } from './utils/ga.ts';
// import { registerSW } from 'virtual:pwa-register';

// import {
//   createRoutesFromChildren,
//   matchRoutes,
//   useLocation,
//   useNavigationType,
// } from 'react-router';

// ReactGA.initialize(GA4_ID!);

// registerSW({
//   onRegistered(r) {
//     if (r) {
//       setInterval(
//         () => {
//           console.log('Checking for SW update');
//           r.update();
//         },
//         60 * 60 * 1000,
//       );
//     }
//   },
//   onNeedRefresh() {
//     console.log('SW update available, needs refresh!');
//   },
//   onOfflineReady() {
//     console.log('Offline ready!');
//   },
//   onRegisterError(error) {
//     console.error('SW registration failed:', error);
//   },
// });

document.dir = 'rtl';
createRoot(document.getElementById('root')!).render(<App />);
