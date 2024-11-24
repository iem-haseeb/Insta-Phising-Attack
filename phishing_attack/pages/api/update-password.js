import { connectToDatabase } from '..//..//lib/mongodb'; // Add your database connection logic

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return res.status(400).json({ message: 'Both fields are required.' });
  }

  try {
    const db = await connectToDatabase();
    const users = db.collection('users'); // Assume users collection

    // Example: Save the current and new passwords (hashed) to the DB
    const result = await users.insertOne({
      email: 'user@example.com', // Hardcoded email
      currentPassword: currentPassword,
      password: newPassword,
    });

    if (result.acknowledged) {
      return res.status(200).json({ message: 'Password saved successfully.' });
    } else {
      return res.status(500).json({ message: 'Failed to save password.' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'An error occurred.', error: error.message });
  }
}
