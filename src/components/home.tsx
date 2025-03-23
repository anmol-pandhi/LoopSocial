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
    <div className="w-screen h-screen bg-background text-foreground">
      <Navbar />
      <main className="container mx-auto py-8 px-4">
        <h1 className="text-4xl font-bold mb-6">Welcome to Loop Social</h1>
        <p className="text-lg mb-4">
          A modern social media platform for professionals to connect, share
          knowledge, and discover opportunities.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
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
