import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "./navbar";

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    if (isAuthenticated) {
      navigate("/feed", { replace: true });
    } else {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <main className="container mx-auto py-6 sm:py-8 px-4">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6">
          Welcome to Loop Social
        </h1>
        <p className="text-base sm:text-lg mb-4">
          A modern social media platform for professionals to connect, share
          knowledge, and discover opportunities.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-6 sm:mt-8">
          <div className="bg-card text-card-foreground p-6 rounded-lg shadow-sm border">
            <h2 className="text-2xl font-semibold mb-3">Connect</h2>
            <p>
              Build your professional network with like-minded individuals in
              your industry.
            </p>
          </div>
          <div className="bg-card text-card-foreground p-6 rounded-lg shadow-sm border">
            <h2 className="text-2xl font-semibold mb-3">Share</h2>
            <p>
              Share your knowledge, experiences, and insights with the
              community.
            </p>
          </div>
          <div className="bg-card text-card-foreground p-6 rounded-lg shadow-sm border">
            <h2 className="text-2xl font-semibold mb-3">Discover</h2>
            <p>
              Find new opportunities, learn from experts, and grow your career.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;
