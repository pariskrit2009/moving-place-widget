import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { Providers } from "./providers";
import { BootstrapGate } from "@/features/bootstrap";
import "@daypicker/react/style.css";

function App() {
  return (
    <Providers>
      <BootstrapGate>
        <RouterProvider router={router} />
      </BootstrapGate>
    </Providers>
  );
}

export default App;
