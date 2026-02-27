import "./app.scss";

import { RouterProvider } from "react-router";
import { router } from "./router";
import Providers from "./providers";

export default function App() {
  return (
    <div className="select-none">
      <Providers>
        <RouterProvider router={router} />
      </Providers>
    </div>
  );
}
