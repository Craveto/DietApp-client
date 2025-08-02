import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ClerkProvider } from "@clerk/clerk-react";

const clerkFrontendApi = process.env.REACT_APP_CLERK_FRONTEND_API;

ReactDOM.createRoot(document.getElementById("root")).render(
  <ClerkProvider publishableKey={clerkFrontendApi}>
    <App />
  </ClerkProvider>
);
