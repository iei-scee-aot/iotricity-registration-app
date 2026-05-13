import { Navigate, Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import { AppSidebar } from "@/features/Sidebar/AppSidebar";
import { TooltipProvider } from "../ui/tooltip";


const AuthLayout = () => {
  const isAuthenticated = true;
  
  if (!isAuthenticated) {
    return <Navigate to="/sign-in" replace />;
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-muted">
      <SidebarProvider>
        <TooltipProvider>
        <AppSidebar />
        <main>
          <SidebarTrigger />
          <Outlet />
        </main>

        </TooltipProvider>
      </SidebarProvider>
    </div>
  )
}

export default AuthLayout