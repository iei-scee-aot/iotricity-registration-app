import { useRouteError, isRouteErrorResponse, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileQuestion, AlertCircle, Home, ArrowLeft } from "lucide-react";

export default function ErrorPage() {
  const error = useRouteError();
  const navigate = useNavigate();

  // Handle 404 Not Found specific errors
  if (isRouteErrorResponse(error) && error.status === 404) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center bg-background px-4 text-center">
        <div className="rounded-full bg-muted p-6 mb-6">
          <FileQuestion className="h-12 w-12 text-muted-foreground" />
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-2">
          404 - Page Not Found
        </h1>
        <p className="text-muted-foreground mb-8 max-w-[500px]">
          Oops! It looks like you've wandered off the map. The page you are looking for doesn't exist or has been moved.
        </p>
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => navigate(-1)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>
          <Button onClick={() => navigate("/")}>
            <Home className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  // Handle General Application Crashes (500s, syntax errors, etc.)
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-background px-4 text-center">
      <div className="rounded-full bg-destructive/10 p-6 mb-6">
        <AlertCircle className="h-12 w-12 text-destructive" />
      </div>
      <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-2">
        Oops! Something went wrong.
      </h1>
      <p className="text-muted-foreground mb-8 max-w-[500px]">
        An unexpected error has occurred in the admin panel. Our team has been notified.
      </p>
      {/* Optional: Show the actual error message in development */}
      <div className="bg-muted text-muted-foreground rounded-md p-4 mb-8 max-w-[600px] text-sm font-mono text-left overflow-auto">
        {error instanceof Error ? error.message : "Unknown Error"}
      </div>
      
      <Button onClick={() => window.location.assign("/")}>
        <Home className="mr-2 h-4 w-4" />
        Reload Application
      </Button>
    </div>
  );
}