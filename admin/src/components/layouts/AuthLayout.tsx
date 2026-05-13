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
    <div className="flex min-h-screen w-full bg-[#0a0a0a]">
      <SidebarProvider>
        <TooltipProvider>
        <AppSidebar />
        <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
          <div className="absolute top-4 left-4 z-50">
            <SidebarTrigger className="text-gray-400 hover:text-white" />
          </div>
          <Outlet />
        </main>
        </TooltipProvider>
      </SidebarProvider>
    </div>
  )
}

export default AuthLayout