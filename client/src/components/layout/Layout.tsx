import { Outlet } from "react-router";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout() {
  return (
    <div className="min-h-screen bg-background text-on-background font-body-md selection:bg-primary-container selection:text-on-primary-container overflow-x-hidden">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
