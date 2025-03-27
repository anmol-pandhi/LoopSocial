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
import GroupDetail from "./components/groups/group-detail";
import JobsPage from "./components/jobs/jobs-page";
import TrendingPage from "./components/trending/trending-page";
import EventsPage from "./components/events/events-page";
import routes from "tempo-routes";
import { ThemeProvider } from "./components/theme-provider";

function AuthGuard({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    async function checkAuth() {
      try {
        // First check localStorage for faster response
        const isAuthenticated =
          localStorage.getItem("isAuthenticated") === "true";

        if (!isAuthenticated && location.pathname !== "/login") {
          navigate("/login", { replace: true });
          return;
        }

        // Then verify with Supabase
        const { supabase } = await import("@/lib/supabase");
        const { data } = await supabase.auth.getSession();

        if (!data.session && location.pathname !== "/login") {
          // Clear auth data if session is invalid
          localStorage.removeItem("isAuthenticated");
          localStorage.removeItem("userId");
          navigate("/login", { replace: true });
        } else if (data.session) {
          // Update auth data with valid session
          localStorage.setItem("isAuthenticated", "true");
          localStorage.setItem("userId", data.session.user.id);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        // Fallback to localStorage check
        const is