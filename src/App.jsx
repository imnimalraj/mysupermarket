import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Layout from "./components/layout/Layout";
import Login from "./components/Auth/Login";
import AdminDashboard from "./components/Dashboard/AdminDashboard";
import ShopkeeperDashboard from "./components/Dashboard/ShopkeeperDashboard";
import ProtectedRoute from "./components/Auth/ProtectedRoute";

function App() {
  const [authToken, setAuthToken] = useState(localStorage.getItem("authToken"));
  const [role, setRole] = useState(localStorage.getItem("userRole"));
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  useEffect(() => {
    // Check if the user is logged in by checking for a token in localStorage
    const token = localStorage.getItem("authToken");
    const userRole = localStorage.getItem("userRole");

    if (token) {
      setAuthToken(token);
      setRole(userRole); // Set the role based on the stored userRole
    }

    setIsLoading(false); // Set loading to false after check is complete
  }, []);

  const handleLoginSuccess = (token, userRole) => {
    setAuthToken(token);
    setRole(userRole);
    localStorage.setItem("authToken", token); // Store token in localStorage
    localStorage.setItem("userRole", userRole); // Store user role in localStorage
  };

  if (isLoading) {
    return <div>Loading...</div>; // Optional: Add a loading spinner or message
  }

  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Route */}
          <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />

          {/* Conditionally Render Routes Based on Role */}
          {authToken && role ? (
            <>
              {/* Admin Routes */}
              {role === "ADMIN" && (
                <Route
                  path="/admin/*"
                  element={
                    <ProtectedRoute allowedRoles={["ADMIN"]} authToken={authToken}>
                      <Layout>
                        <Routes>
                          <Route path="dashboard" element={<AdminDashboard />} />
                        </Routes>
                      </Layout>
                    </ProtectedRoute>
                  }
                />
              )}

              {/* Shopkeeper Routes */}
              {role === "SHOPKEEPER" && (
                <Route
                  path="/shopkeeper/*"
                  element={
                    <ProtectedRoute allowedRoles={["SHOPKEEPER"]} authToken={authToken}>
                      <Layout>
                        <Routes>
                          <Route path="dashboard" element={<ShopkeeperDashboard />} />
                        </Routes>
                      </Layout>
                    </ProtectedRoute>
                  }
                />
              )}

              {/* Redirect to appropriate dashboard if authenticated */}
              <Route path="/" element={<Navigate to={`/${role.toLowerCase()}/dashboard`} replace />} />
            </>
          ) : (
            // If not logged in, redirect to login
            <Route path="*" element={<Navigate to="/login" replace />} />
          )}

          {/* Catch-all route for non-existent paths */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
