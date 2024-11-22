import React, { useState } from "react";
import axios from "axios";

function App() {
  const [formData, setFormData] = useState({
    to: "",
    subject: "",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setResponseMessage("");
    setPreviewUrl("");
    setShowModal(false);

    try {
      const response = await axios.post("http://localhost:5000/send", formData);
      setResponseMessage("Email sent successfully!");
      setPreviewUrl(response.data.previewUrl);
    } catch (error) {
      setResponseMessage("Failed to send email. Please try again.");
    } finally {
      setIsLoading(false);
      setShowModal(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-600 flex flex-col items-center">
      {/* Hero Section */}
      <div className="text-center py-10 text-white">
        <h1 className="text-4xl font-bold mb-2">Email Sender</h1>
        <p className="text-lg">Send emails effortlessly with our modern UI.</p>
      </div>

      {/* Form Card */}
      <div className="card w-full max-w-xl bg-white shadow-2xl transform hover:scale-105 transition-all mx-auto">
        <div className="card-body">
          <h2 className="card-title text-center text-xl font-bold">
            Compose Your Email
          </h2>
          <form onSubmit={handleSubmit} className="form-control gap-4">
            {/* To Email */}
            <div className="form-group">
              <label className="label">
                <span className="label-text">Recipient Email</span>
              </label>
              <input
                type="email"
                name="to"
                placeholder="e.g., example@gmail.com"
                value={formData.to}
                onChange={handleChange}
                className="input input-bordered focus:ring focus:ring-blue-300 w-full"
                required
              />
            </div>

            {/* Subject */}
            <div className="form-group">
              <label className="label">
                <span className="label-text">Subject</span>
              </label>
              <input
                type="text"
                name="subject"
                placeholder="e.g., Hello!"
                value={formData.subject}
                onChange={handleChange}
                className="input input-bordered focus:ring focus:ring-blue-300 w-full"
                required
              />
            </div>

            {/* Message */}
            <div className="form-group">
              <label className="label">
                <span className="label-text">Message</span>
              </label>
              <textarea
                name="message"
                placeholder="Type your message here..."
                value={formData.message}
                onChange={handleChange}
                className="textarea textarea-bordered focus:ring focus:ring-blue-300 w-full"
                rows="4"
                required></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className={`btn btn-primary w-full transform transition-all ${
                isLoading ? "loading opacity-75" : "hover:scale-105"
              }`}
              disabled={isLoading}>
              {isLoading ? "Sending..." : "Send Email"}
            </button>
          </form>
        </div>
      </div>

      {/* Modal for Feedback */}
      {showModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3
              className={`font-bold text-lg ${
                responseMessage.includes("successfully")
                  ? "text-green-500"
                  : "text-red-500"
              }`}>
              {responseMessage}
            </h3>
            {previewUrl && (
              <p className="mt-4">
                Preview your email:{" "}
                <a
                  href={previewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link link-primary">
                  Click here
                </a>
              </p>
            )}
            <div className="modal-action">
              <button className="btn" onClick={() => setShowModal(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Dark Mode Toggle */}
      <div className="absolute top-4 right-4">
        <label className="swap swap-rotate">
          <input
            type="checkbox"
            onChange={() => document.body.classList.toggle("dark")}
          />
          <svg
            className="swap-on fill-current w-8 h-8"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24">
            <path d="M5.64 5.64a9 9 0 010 12.72 9 9 0 0012.72-12.72 9 9 0 00-12.72 0z"></path>
          </svg>
          <svg
            className="swap-off fill-current w-8 h-8"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24">
            <path d="M12 3v2M12 19v2M4.22 4.22l1.42 1.42M16.36 16.36l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M16.36 7.64l1.42-1.42"></path>
          </svg>
        </label>
      </div>
    </div>
  );
}

export default App;
