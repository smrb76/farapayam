import './app.scss';

import { useEffect } from 'react';
import { RouterProvider } from 'react-router';
import { router } from './router';
// import UpdatePrompt from './components/pwa/update-prompt';
import Providers from './providers';
// import InstallationPrompt from './components/pwa/installation-prompt';

// test change for commit message test
export default function App() {
  useEffect(() => {
    const setVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    setVH();
    window.addEventListener('resize', setVH);
    console.log('running effect of app.tsx');

    window.addEventListener('raychat_ready', function () {
      console.log('RAYCHAT IS READY TO USE!💬');
    });

    return () => window.removeEventListener('resize', setVH);
  }, []);

  return (
    <div className="select-none">
      <Providers>
        {/* <UpdatePrompt />
        <InstallationPrompt /> */}
        <RouterProvider router={router} />
      </Providers>
    </div>
  );
}
