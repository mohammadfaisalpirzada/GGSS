import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Student from '@/models/Student';  // Ensure this path is correct
import { connectToDatabase} from '@/app/utils/db'

export async function POST(request: Request) {
  try {
    // Connect to MongoDB
    await connectToDatabase();

    const data = await request.json();
    console.log('Received form data:', data);

    // Create a new student record
    const newStudent = new Student(data);
    await newStudent.save();

    return NextResponse.json({
      message: 'Data saved successfully!',
      data: newStudent,
    });
  } catch (error: unknown) {
    console.error('Error saving data:', error);

    // Make sure to return a valid JSON response, even when there’s an error
    if (error instanceof Error) {
      return NextResponse.json(
        {
          message: 'Error saving data.',
          error: error.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Unknown error occurred.' },
      { status: 500 }
    );
  }
}
