import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignInPage from "./features/auth/SignInPage";
import AuthLayout from "./components/layouts/AuthLayout";
import Dashboard from "./components/pages/dashboard/Dashboard";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Teams from "./components/pages/teams/Teams";
import Projects from "./components/pages/projects/Projects";
import ErrorPage from "./components/pages/ErrorPage";
import Users from "./components/pages/users/Users";
import { Toaster } from "react-hot-toast";
import TeamView from "./components/pages/teams/TeamView";
import ProjectView from "./components/pages/projects/ProjectView";

const queryClinet = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false
    }
  }
})

const router = createBrowserRouter([
  {
    path: "/sign-in",
    element: <SignInPage />,
  },
  {
    path: "/",
    element: <AuthLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "users",
        element: <Users />
      },
      {
        path: "teams",
        element: <Teams />
      },
      {
        path: "teams/:teamName",
        element: <TeamView />
      },
      {
        path: "projects",
        element: <Projects />
      },
      {
        path: "projects/:teamSecret",
        element: <ProjectView />
      }
    ]
  }
])

const App = () => {
  return (
    <QueryClientProvider client={queryClinet}>
      <Toaster />
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

export default App;
