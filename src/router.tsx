import * as Sentry from '@sentry/react';
import { lazy } from 'react';
import { createBrowserRouter } from 'react-router';

import { LayoutWrapper } from './components/layout/layout-wrapper';

// route level imports
import ErrorComponent from './components/layout/error';
import Home from './routes/home/home';

const createRouter = Sentry.wrapCreateBrowserRouterV7(createBrowserRouter);

export const router = createRouter([
  {
    errorElement: <ErrorComponent />,
    children: [
      {
        element: <LayoutWrapper />,
        errorElement: <ErrorComponent />,
        children: [{ index: true, element: <Home /> }],
      },
    ],
  },
]);
