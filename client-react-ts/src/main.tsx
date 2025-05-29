import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

async function enableMocking() {
  if (!Boolean(import.meta.env.VITE_ENABLE_MSW)) {
    return;
  }

  const { server: server } = await import("./msw/server.ts");

  return server.listen();
}
enableMocking().then(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
});
