import { Route, Routes } from "react-router";
import { lazy, Suspense } from "react";
import Layout from "./components/layout/Layout";

const LandingPage = lazy(() => import("./pages/LandingPage"));
const YogaAgentPage = lazy(() => import("./yoga/agent-pane"));

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="flex items-center gap-3">
        <span className="w-3 h-3 rounded-full bg-primary animate-pulse" />
        <span className="text-on-surface-variant">Loading...</span>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<LandingPage />} />
        </Route>
        <Route path="/alexa" element={<YogaAgentPage />} />
      </Routes>
    </Suspense>
  );
}
