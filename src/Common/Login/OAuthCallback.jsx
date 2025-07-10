import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

function OAuthCallback() {
  const navigate = useNavigate();
  const effectRan = useRef(false);

  useEffect(() => {
    if (effectRan.current) return; // Fix StrictMode double-mounting
    effectRan.current = true;

    // Skip if already authenticated
    if (localStorage.getItem("accessToken")) {
      navigate("/employees");
      return;
    }

    // Parse token only if on the callback route
    if (window.location.pathname.includes("/oauth/callback")) {
      const params = new URLSearchParams(window.location.search);
      const accessToken = params.get("access_token");

      if (accessToken) {
        localStorage.setItem("accessToken", accessToken);
        window.history.replaceState({}, "", "/employees"); // Clean URL
        navigate("/employees", { replace: true });
      } else {
        navigate("/login", { replace: true });
      }
    }
  }, [navigate]);

  return <div>Processing authentication...</div>;
}

export default OAuthCallback;
