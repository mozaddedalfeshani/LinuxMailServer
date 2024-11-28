const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { exec } = require("child_process");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Endpoint to send email
app.post("/send-email", (req, res) => {
  const { to, subject, body } = req.body;
  console.log(to,subject)

  if (!to || !subject || !body) {
    return res.status(400).send("All fields are required.");
  }

  // Construct the mail command
  const command = `echo "${body}" | mail -s "${subject}" ${to}`;

  // Execute the command
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${stderr}`);
      return res.status(500).send("Failed to send email.");
    }
    res.send("Email sent successfully.");
  });
});

// Start the server
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
