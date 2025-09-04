import { Outlet } from "react-router";

export default function DefaultLayout() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <h1>Default Layout</h1>
      {/* will either be home.tsx or settings.tsx */}
      <Outlet />
    </div>
  );
}
