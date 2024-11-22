import React, { useState } from "react";
import axios from "axios";

function App() {
  const [formData, setFormData] = useState({
    to: "",
    subject: "",
    message: "",
  });

  const [responseMessage, setResponseMessage] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/send", formData);
      setResponseMessage(response.data.message);
      setPreviewUrl(response.data.previewUrl); // Get Ethereal preview URL
    } catch (error) {
      setResponseMessage("Failed to send email. Please try again.");
      console.error(error);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1 className="bg-green-50">Email Sender</h1>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <input
          type="email"
          name="to"
          placeholder="Recipient Email"
          value={formData.to}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={formData.subject}
          onChange={handleChange}
          required
        />
        <textarea
          name="message"
          placeholder="Your message"
          value={formData.message}
          onChange={handleChange}
          rows="4"
          required></textarea>
        <button
          type="submit"
          style={{ padding: "10px 20px", cursor: "pointer" }}>
          Send Email
        </button>
      </form>

      {responseMessage && <p>{responseMessage}</p>}

      {previewUrl && (
        <p>
          Preview your email{" "}
          <a href={previewUrl} target="_blank" rel="noopener noreferrer">
            here
          </a>
          .
        </p>
      )}
    </div>
  );
}

export default App;
