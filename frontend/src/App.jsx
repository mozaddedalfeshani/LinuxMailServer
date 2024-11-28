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
    <div>
      <h1>Send Email</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>To:</label>
          <input type="email" name="to" value={formData.to} onChange={handleChange} required />
        </div>
        <div>
          <label>Subject:</label>
          <input type="text" name="subject" value={formData.subject} onChange={handleChange} required />
        </div>
        <div>
          <label>Body:</label>
          <textarea name="body" value={formData.body} onChange={handleChange} required />
        </div>
        <button type="submit">Send Email</button>
      </form>
    </div>
  );
}

export default App;
