import { Suspense, useEffect } from "react";
import {
  useRoutes,
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import Home from "./components/home";
import Login from "./components/auth/login";
import FeedPage from "./components/feed/feed-page";
import ProfilePage from "./components/profile/profile-page";
import EditProfile from "./components/profile/edit-profile";
import MessagesPage from "./components/messages/messages-page";
import GroupsPage from "./components/groups/groups-page";
import JobsPage from "./components/jobs/jobs-page";
import routes from "tempo-routes";
import { ThemeProvider } from "./components/theme-provider";

function AuthGuard({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    async function checkAuth() {
      try {
        const { supabase } = await import("@/lib/supabase");
        const { data } = await supabase.auth.getSession();

        if (!data.session && location.pathname !== "/login") {
          localStorage.removeItem("isAuthenticated");
          navigate("/login", { replace: true });
        } else if (data.session) {
          localStorage.setItem("isAuthenticated", "true");
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        // Fallback to localStorage check
        const isAuthenticated =
          localStorage.getItem("isAuthenticated") === "true";
        if (!isAuthenticated && location.pathname !== "/login") {
          navigate("/login", { replace: true });
        }
      }
    }

    checkAuth();
  }, [navigate, location]);

  return <>{children}</>;
}

function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <Suspense fallback={<p className="p-4">Loading...</p>}>
        <>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/feed"
              element={
                <AuthGuard>
                  <FeedPage />
                </AuthGuard>
              }
            />
            <Route
              path="/profile"
              element={
                <AuthGuard>
                  <ProfilePage />
                </AuthGuard>
              }
            />
            <Route
              path="/profile/edit"
              element={
                <AuthGuard>
                  <EditProfile />
                </AuthGuard>
              }
            />
            <Route
              path="/messages"
              element={
                <AuthGuard>
                  <MessagesPage />
                </AuthGuard>
              }
            />
            <Route
              path="/groups"
              element={
                <AuthGuard>
                  <GroupsPage />
                </AuthGuard>
              }
            />
            <Route
              path="/jobs"
              element={
                <AuthGuard>
                  <JobsPage />
                </AuthGuard>
              }
            />
            {import.meta.env.VITE_TEMPO === "true" && (
              <Route path="/tempobook/*" />
            )}
          </Routes>
          {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
        </>
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
