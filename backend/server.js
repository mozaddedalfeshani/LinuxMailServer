const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Nodemailer transporter configuration for Ethereal
const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "allen66@ethereal.email", // Replace with your Ethereal email
    pass: "8mFWpZRKn7qSDtYc9c", // Replace with your Ethereal password
  },
});

// Email API endpoint
app.post("/send", async (req, res) => {
  const { to, subject, message } = req.body;

  try {
    const mailOptions = {
      from: '"Test Server" <allen66@ethereal.email>', // Sender address
      to, // Recipient address
      subject, // Email subject
      text: message, // Plain text body
    };

    const info = await transporter.sendMail(mailOptions);

    res.status(200).json({
      success: true,
      message: "Email sent successfully!",
      previewUrl: nodemailer.getTestMessageUrl(info), // Preview URL
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
