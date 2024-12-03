import { useState } from "react";

export default function UpdatePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/update-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currentPassword, newPassword }),
    });

    const result = await response.json();
    setMessage(result.message);
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "auto",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        Update Password
      </h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label
            style={{ display: "block", marginBottom: "5px" }}
            htmlFor="currentPassword"
          >
            Current Password
          </label>
          <input
            type="password"
            id="currentPassword"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label
            style={{ display: "block", marginBottom: "5px" }}
            htmlFor="newPassword"
          >
            New Password
          </label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
        </div>
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#0095f6",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Update Password
        </button>
      </form>
      {message && (
        <p
          style={{
            marginTop: "20px",
            color: message.includes("success") ? "green" : "red",
          }}
        >
          {message}
        </p>
      )}
    </div>
  );
}
