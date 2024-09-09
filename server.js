const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;

// Middleware to handle JSON requests and CORS
app.use(express.json());
app.use(cors());

// Serve static files (HTML, CSS, JS) from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Route to serve the index.html file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Nodemailer function
async function sendMail(toEmail) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'nodemail863@gmail.com',
      pass: 'eznqhpgsjajyjnml',  // Use environment variables for security
    },
  });

  const mailOptions = {
    from: 'nodemail863@gmail.com',
    to: toEmail,  // The recipient's email
    subject: 'Welcome to Dev@deakin',
    text: 'Welcome to Dev@deakin! Stay Up to date !!!.',
  };

  try {
    const result = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', result);
  } catch (error) {
    console.log('Error sending email:', error);
  }
}

// Route to handle subscription
app.post('/subscribe', async (req, res) => {
  const { email } = req.body;
  
  if (!email) {
    return res.status(400).json({ message: 'Email is required.' });
  }

  try {
    await sendMail(email);
    res.json({ message: 'Welcome email sent successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error sending welcome email.' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});