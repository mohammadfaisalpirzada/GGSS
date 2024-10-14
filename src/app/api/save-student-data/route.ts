// const MONGO_URI = 'mongodb+srv://mohammadfaisalpirzada:shazz4001@cluster0.6uyke.mongodb.net/';

// /app/api/save-student-data/route.ts
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/app/utils/db';  // Ensure this path is correct
import Student from '@/models/Student';  // Ensure the model is defined correctly

export async function POST(request: Request) {
  try {
    // Connect to MongoDB
    await connectToDatabase();

    // Parse the JSON data from the request body
    const data = await request.json();
    console.log('Received form data:', data);

    // Create a new student document and save it to the database
    const newStudent = new Student(data);
    await newStudent.save();

    // Return a success response with the saved student data
    return NextResponse.json({ message: 'Data saved successfully!', data: newStudent });
  } catch (error) {
    // Type check for the error object
    if (error instanceof Error) {
      console.error('Error saving data:', error.stack);
      return NextResponse.json({ message: 'Error saving data.', error: error.message }, { status: 500 });
    }

    // In case the error is not of type `Error`
    return NextResponse.json({ message: 'An unknown error occurred.' }, { status: 500 });
  }
}
