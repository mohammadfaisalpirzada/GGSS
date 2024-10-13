// const MONGO_URI = 'mongodb+srv://mohammadfaisalpirzada:shazz4001@cluster0.6uyke.mongodb.net/';


// /app/api/save-student-data/route.ts
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/app/utils/db';
import Student from '@/models/Student';

export async function POST(request: Request) {
  try {
    await connectToDatabase();

    const data = await request.json();
    console.log('Received form data:', data);

    const newStudent = new Student(data);
    await newStudent.save();

    return NextResponse.json({ message: 'Data saved successfully!', data: newStudent });
  } catch (error: any) {
    console.error('Error saving data:', error.stack);
    return NextResponse.json({ message: 'Error saving data.', error: error.message }, { status: 500 });
  }
}
