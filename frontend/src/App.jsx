import { useState } from "react";
import axios from "axios";

function App() {
  const [formData, setFormData] = useState({
    to: "",
    subject: "",
    body: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/send-email", formData);
      alert("Email sent successfully!");
    } catch (error) {
      alert("Error sending email: " + error.response?.data || error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg space-y-6">
        <h1 className="text-2xl font-semibold text-center text-gray-800">Send Email</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-control">
            <label className="label text-gray-700">To:</label>
            <input
              type="email"
              name="to"
              value={formData.to}
              onChange={handleChange}
              required
              className="input input-bordered w-full"
              placeholder="Recipient's email"
            />
          </div>

          <div className="form-control">
            <label className="label text-gray-700">Subject:</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="input input-bordered w-full"
              placeholder="Subject of the email"
            />
          </div>

          <div className="form-control">
            <label className="label text-gray-700">Body:</label>
            <textarea
              name="body"
              value={formData.body}
              onChange={handleChange}
              required
              className="textarea textarea-bordered w-full"
              placeholder="Write your message here"
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="btn btn-primary w-full mt-4"
            >
              Send Email
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
