import { createBrowserRouter } from "react-router";
import { lazy } from "react";
import { MainLayout } from "./layouts/MainLayout";

// Lazy load admin components for faster initial load
const AdminLogin = lazy(() => import("./components/admin/AdminLogin").then(m => ({ default: m.AdminLogin })));
const AdminPanel = lazy(() => import("./components/admin/AdminPanel").then(m => ({ default: m.AdminPanel })));
const ProtectedRoute = lazy(() => import("./components/admin/ProtectedRoute").then(m => ({ default: m.ProtectedRoute })));

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
  },
  {
    path: "/admin/login",
    Component: AdminLogin,
  },
  {
    path: "/admin",
    Component: ProtectedRoute,
    children: [
      {
        index: true,
        Component: AdminPanel,
      },
    ],
  },
]);
