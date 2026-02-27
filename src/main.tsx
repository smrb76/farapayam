import { createRoot } from "react-dom/client";
import App from "./App.tsx";

document.dir = "rtl";
createRoot(document.getElementById("root")!).render(<App />);
