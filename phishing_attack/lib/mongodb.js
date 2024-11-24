import mongoose from 'mongoose';

const MONGODB_URI =
  'mongodb+srv://hafizbilaltariq360:Ecl7pYd7a9mAYNWA@med-script.0ffsy.mongodb.net/?retryWrites=true&w=majority&appName=med-script';

if (!MONGODB_URI) {
  console.error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
  process.exit(1); // Exit the process if no URI is defined
}

let cachedConnection = null; // No TypeScript annotation

export async function connectToDatabase() {
  if (cachedConnection) {
    return cachedConnection;
  }

  try {
    const connection = await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    cachedConnection = connection.connection;

    console.log('Connected to MongoDB using Mongoose');

    return cachedConnection;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}
