//utils/db.ts
import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://mohammadfaisalpirzada:shazz4001@cluster0.6uyke.mongodb.net/';

if (!MONGO_URI) {
  throw new Error('Please add your Mongo URI to .env.local');
}

let isConnected = false;

export async function connectToDatabase() {
  if (isConnected) {
    return;
  }

  try {
    await mongoose.connect(MONGO_URI, {
      connectTimeoutMS: 30000, // 30 seconds
      serverSelectionTimeoutMS: 30000, // 30 seconds
    });
    isConnected = true;
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw new Error('Failed to connect to MongoDB');
  }
}
